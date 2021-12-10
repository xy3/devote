import React, { Component } from 'react';
import Web3 from 'web3';
import firebase from './firebase'
import Election from '../abis/Election.json';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import ElectionPage from './ElectionPage'
import UserPage from './UserPage';
import Error404 from './error404'

class App extends Component {

	db = firebase.firestore()

	async componentWillMount() {
		var web3_loaded = await this.loadWeb3()
		if (web3_loaded) {
			await this.fetchAccount()
			await this.loadContracts()
			this.getUserInfo()
			this.getYourSocs()
		}
		this.setState({loadingPage: false})
	}

	async loadWeb3() {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum, undefined, {transactionConfirmationBlocks: 1})
			await window.ethereum.enable()
		}
		else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider, undefined, {transactionConfirmationBlocks: 1})
		}
		else {
			window.alert('Non-Ethereum browser detected. You must install MetaMask to use Devote')
			return false
		}
		return true
	}

	async fetchAccount() {
		const web3 = window.web3
		const accounts = await web3.eth.getAccounts()
		this.setState({ account: accounts[0] })
	}

	async loadContracts() {
		const web3 = window.web3
		const networkID = await web3.eth.net.getId()
		const networkData = Election.networks[networkID]
		
		if (!networkData) {

			alert("You're not on the right network! Read the voting instructions below.")

		} else {

			// Load the election contract & network ID
			const election = web3.eth.Contract(Election.abi, networkData.address)
			this.setState({ election })
			this.setState({ networkID })

			await this.renderElections()
			await this.renderCandidates()
			await this.getYourElections()
			this.updateElections()
		}
	}

	async changeElection(electionId) {
		this.setState({ loadingCandidates: true })
		this.setState({ displayedElection: electionId})
		this.setState({ loadingCandidates: false })
	}

	async refreshElectionDetails() {
		var electionStatus;
		var electionStart;
		var electionEnd;

		const electionsRef = this.db.collection('elections')
		await electionsRef.get().then(results => {
			results.forEach(doc => {
				const electionId = doc.data().electionId
				electionStatus = {...electionStatus, [electionId]: doc.data().electionStatus.toString()}

				if (doc.data().startDate != null) {
					electionStart =  {...electionStart, [electionId]: doc.data().startDate.seconds * 1000}
					this.setState({ electionStartDates: electionStart })
				}
		
				if (doc.data().endDate != null) {
					electionEnd =  {...electionEnd, [electionId]: doc.data().endDate.seconds * 1000}
					this.setState({ electionEndDates: electionEnd })
				}
			})
		})

		this.setState({ electionStatus: electionStatus })
	}

	async updateElections() {
		this.setState({ startingElections: true })

		var electionStart = {};
		var electionEnd = {};
		var electionStatusMap;
		var electionStatus;
		var startDate = null;
		var endDate = null;
		var allVotes = {};
		var votes;

		const electionsRef = this.db.collection('elections')
		const userRef = this.db.collection('users')
		await electionsRef.get().then(results => {
			results.forEach(doc => {
				const electionId = doc.data().electionId
				electionStatus = doc.data().electionStatus

				if (doc.data().startDate != null) {
					startDate = doc.data().startDate.seconds * 1000
					endDate = doc.data().endDate.seconds * 1000

					// Start Elections if startDate > Current Date
					if ((new Date(startDate) < new Date()) && (electionStatus == "Pending Start" || electionStatus == "Awaiting Start")) {
					electionsRef.doc(electionId.toString()).set({electionStatus: "Active"}, {merge: true}) } 

					// End Elections if EndDate < Current Date
					if (new Date(endDate) < new Date() && electionStatus == "Active") {
					electionsRef.doc(electionId.toString()).set({electionStatus: "Closed"}, {merge: true}) }
				}
				
				electionStart =  {...electionStart, [electionId]: startDate}
				electionEnd = {...electionEnd, [electionId]: endDate}
				electionStatusMap = {...electionStatusMap, [electionId]: doc.data().electionStatus.toString()}
				this.setState({ electionStartDates: electionStart })
				this.setState({ electionEndDates: electionEnd })
			})		
		})	

		await userRef.get().then(results => {
			results.forEach(doc => {
				for (var vote in doc.data().votedFor) {
					votes = {...votes, [vote]: true}
					
				}
				allVotes = {...allVotes, [this.state.account]: votes}
			})
		})
		
		this.setState({ hasVoted: allVotes })
		this.setState({ electionStatus: electionStatusMap })
		this.setState({ startingElections: false })
		console.log(this.state.hasVoted)
	}

	async renderCandidates() {
		// Get all candidates
		this.setState({ loadingCandidates: true })
		
		const candidateCount = await this.state.election.methods.candidatesCount().call()
		var candidates = []

		for (var i = 1; i <= candidateCount; i++) {
			const candidate = await this.state.election.methods.candidates(i).call()
			candidates = [...candidates, candidate]
		}

		this.setState({ candidates: candidates })
		this.setState({ loadingCandidates: false })
	}

	async renderElections() {
		// Get all elections
		this.setState({ loadingElections: true })
		this.setState({ elections: [] })
		
		const electionCount = await this.state.election.methods.electionCount().call()
		this.setState({ electionCount: electionCount })
		var elections = []

		for (var i = 1; i <= electionCount; i++) {
			const election = await this.state.election.methods.elections(i).call()
			elections = [...elections, election]
		}

		this.setState({elections: elections})
		this.setState({loadingElections: false})
	}

	async getYourElections() {
		this.setState({ loadingYourElections: true })
		
		const electionCount = await this.state.election.methods.electionCount().call()
		
		var yourElections = {...this.state.yourElections}

		for (var i = 1; i <= electionCount; i++) 
		{
			const election = await this.state.election.methods.elections(i).call()
			const admin = election.admin

			if (admin == this.state.account) {
				yourElections = {...yourElections, [i]: this.state.account}
			}
		}

		this.setState({ yourElections: yourElections })
		this.setState({loadingYourElections: false})
	}

	addCandidate(candidateName, candidatePosition, electionId) {
		this.state.election.methods.addCandidate(candidateName, candidatePosition, electionId).send({ from: this.state.account })
		.once('receipt', (receipt) => {
			this.renderCandidates()
		})
		return true
	}

	async deleteCandidate(candidateId) {
		await this.state.election.methods.deleteCandidate(candidateId).send({ from: this.state.account })
		.once('receipt', (receipt) => {
			this.renderCandidates()
		})
		return true
	}

	// -------------------------------------------------------------------------------------- ^^^^^^^^^^^^^^^^^^ merge vvvvvvvvvvvvvvvvvvvv
	
	async addElection(electionName) {
		var electionCount = await this.state.election.methods.electionCount().call()
		electionCount = electionCount.toNumber() + 1
		this.state.election.methods.addElection(electionName).send({ from: this.state.account })
		.once('receipt', (receipt) => {
			const election = {
				startDate: null,
				endDate: null,
				electionId: electionCount,
				electionStatus: "Awaiting Start",
				electionName: electionName
			}
			this.db.collection('elections').doc(electionCount.toString()).set(election)
			this.renderElections()
			this.getYourElections()
			this.refreshElectionDetails()
		})
		return true
	}

	editElectionName(_electionName, _electionId) {
		this.state.election.methods.editElectionName(_electionName, _electionId).send({ from: this.state.account })
		.once('receipt', (receipt) => {
			this.renderCandidates()
			this.renderElections()
		})
		return true
	}

	async addVote(candidateId, electionId) {
		this.state.election.methods.vote(candidateId, electionId).send({ from: this.state.account })
		.once('receipt', (receipt) => {
			const vote = {votedFor: {[electionId]: this.state.candidates[candidateId-1].name}}
			this.db.collection('users').doc(this.state.account).set(vote, {merge: true})

			const hasVoted = {[electionId]: true}
			const result = {[this.state.account]: hasVoted}
			this.setState({hasVoted: result})

			this.refreshElectionDetails()
			this.renderCandidates()
		})
		return true
	}

	getUserInfo() {
		this.setState({loadingUserInfo: true})
		
		if (this.state.account) {
			this.db.collection('users').doc(this.state.account).get().then((user) => {
				if (user.exists) {
					this.setState({
						user: user.data(),
						userExists: true
					})
				} else {
					this.setState({ userExists: false })
				}
				this.setState({loadingUserInfo: false})
				// else, ask them for a name
				
				this.getYourMemberships()				
			})
		}
	}

	addNewUser(_username) {
		this.setState({loadingUserInfo: true})
		
		if (this.state.account) {
			const user = {
				date_joined: firebase.firestore.Timestamp.now(),
				member_of: [{}],
				username: _username,
				votedFor: null,
			}

			this.db.collection('users').doc(this.state.account).set(user)
	
			this.setState({
				user: user,
				userExists: true,
			})
		}

		this.setState({ loadingUserInfo: false })
	}

	addNewSociety(_societyName, _adminEmail) {
		if (this.state.account) {
			this.db.collection('societies').add({
				date_added: firebase.firestore.Timestamp.now(),
				isVerified: false,
				adminEmail: _adminEmail,
				name: _societyName,
				owner: this.state.account,
				memberTotal: 0
			}).then((soc) => {
				this.joinSoc(soc.id)
				this.getYourSocs()
			})
		}

		// Here we can send an email to admins requesting the society to be verified.
		// e.g. sendVerificationRequest()
		// For development purposes, we will skip this step and have societies verified by default.
		
		return true
	}

	getYourSocs() {
		this.setState({loadingYourSocs: true})
		var socs = []

		if (this.state.account) {
			const societiesRef = this.db.collection('societies')
			societiesRef.where("owner", "==", this.state.account).get().then((results) => 
			{
				results.forEach((society) => {
					socs.push( {...society.data(), id: society.id} )
				})
		
				this.setState({yourSocs: socs})
				this.setState({loadingYourSocs: false})				
			})
		}
	}

	getYourMemberships() {
		this.setState({loadingMemberships: true})
		const socRef = this.db.collection('societies')

		var memberships = []

		if (this.state.userExists) {
			socRef.get().then((res) => {
				res.forEach((soc) => {
					if (this.state.user.member_of.includes(soc.id)) {
						memberships.push({...soc.data(), id: soc.id})
					}
				})
				this.setState({ memberships: memberships })
				this.setState({loadingMemberships: false})
			})
		}	
	}

	joinSoc(_soc_id) {
		if (this.state.account) {
			const userRef = this.db.collection('users').doc(this.state.account)
			var mbs = this.state.user.member_of
			mbs.push(_soc_id)
			
			userRef.update({
				member_of: mbs
			}).then(() => {
				this.getUserInfo()
			})
		}
	}

	leaveSoc(_soc_id) {
		if (this.state.account) {
			const userRef = this.db.collection('users').doc(this.state.account)
			const mbs = this.state.user.member_of
			const index = mbs.indexOf(_soc_id)
			if (index > -1) {
				mbs.splice(index, 1)
			}
			userRef.update({
				member_of: mbs
			}).then(() => {
				this.getUserInfo()
			})
		}
	}

	removeSoc(_soc_id) {
		const socRef = this.db.collection("societies").doc(_soc_id)
		
		if (this.state.account) {
			socRef.get().then((soc) => {
				if (soc.exists) {
					if (soc.data().owner == this.state.account) {
						socRef.delete().then(() => {
						    this.getYourSocs()
						})
					}
				}
			})
		}
	}

	constructor(props) {
        super(props)
        this.state = {
            account: '',
            networkID: '',
            candidates: [],
            elections: [],
			election: null,
			electionCount: 0,
			electionStatus: {},
			startingElections: true,
			loadingElections: true,
			loadingYourElections: true,
            loadingCandidates: true,
            loadingPage: true,
			displayedElection: 1,
			yourElections: {},
			yourSocs: [],
			memberships: [],
			user: {},
			hasVoted: {},
			electionStartDates: {},
			electionEndDates: {},
			userExists: true,
			loadingUserInfo: true,
        }

        this.addElection = this.addElection.bind(this)
        this.addCandidate = this.addCandidate.bind(this)	
        this.changeElection = this.changeElection.bind(this)
        this.renderCandidates = this.renderCandidates.bind(this)
        this.renderElections = this.renderElections.bind(this)
		this.addVote = this.addVote.bind(this)
		this.getYourElections = this.getYourElections.bind(this)
		this.editElectionName = this.editElectionName.bind(this)
		this.deleteCandidate = this.deleteCandidate.bind(this)
		this.addNewUser = this.addNewUser.bind(this)
		this.addNewSociety = this.addNewSociety.bind(this)
		this.getYourSocs = this.getYourSocs.bind(this)
		this.leaveSoc = this.leaveSoc.bind(this)
		this.removeSoc = this.removeSoc.bind(this)
		this.updateElections = this.updateElections.bind(this)
		this.refreshElectionDetails = this.refreshElectionDetails.bind(this)
    }

	render() {
		const homeProps = (props) => {
			return (
				<Home 
					account={this.state.account} 
					network={this.state.networkID}
					elections={this.state.elections} 
					changeElection={this.changeElection}
					renderElections={this.renderElections}
					renderCandidates={this.renderCandidates}
					displayedElection={this.state.displayedElection}
					//addCandidate={this.addCandidate}
					addElection={this.addElection}
					addVote={this.addVote}
					loadingElections={this.state.loadingElections}
					loadingCandidates={this.state.loadingCandidates}
					candidates={this.state.candidates}
					loadingUserInfo={this.state.loadingUserInfo}
					electionCount={this.state.electionCount}
				/>
			);
		}

		const userPageProps = (props) => {
			return (
				<UserPage 
					account={this.state.account} 
					network={this.state.networkID}
					elections={this.state.elections}
					loadingYourElections={this.state.loadingYourElections}
					loadingYourSocs={this.state.loadingYourSocs}
					addElection={this.addElection}
					addCandidate={this.addCandidate}
					yourElections={this.state.yourElections}
					loadingPage={this.state.loadingPage}
					getYourElections={this.getYourElections}
					user={this.state.user}
					userExists={this.state.userExists}
					addNewUser={this.addNewUser}
					addNewSociety={this.addNewSociety}
					yourSocs={this.state.yourSocs}
					leaveSoc={this.leaveSoc}
					removeSoc={this.removeSoc}
					memberships={this.state.memberships}
				/>
			);
		}

		// Page Routing
		return (
			<Router>
				<div>
					<Switch>
						<Route path="/" exact render={homeProps}/>
						<Route path="/account" exact render={userPageProps} />
						<Route path="/elections/:id" render={({match}) => 
						<ElectionPage 
							candidates={this.state.candidates}
							loadingCandidates={this.state.loadingCandidates}
							elections={this.state.elections}
							renderCandidates={this.renderCandidates}
							match={match} 
							displayedElection={this.state.displayedElection}
							addVote={this.addVote}
							changeElection={this.changeElection}
							addCandidate={this.addCandidate}
							deleteCandidate={this.deleteCandidate}
							editElectionName={this.editElectionName}
							yourElections={this.state.yourElections}
							account={this.state.account}
							electionCount={this.state.electionCount}
							electionStartDates={this.state.electionStartDates}
							electionEndDates={this.state.electionEndDates}
							startingElections={this.state.startingElections}
							hasVoted={this.state.hasVoted}
							electionStatus={this.state.electionStatus}
							updateElections={this.updateElections}
							refreshElectionDetails={this.refreshElectionDetails}
						/>} />
						{/* If no other routes match, route to 404 page */}
						<Route render={Error404} />
					</Switch>
				</div>
			</Router>
		);
	}
}


export default App;

