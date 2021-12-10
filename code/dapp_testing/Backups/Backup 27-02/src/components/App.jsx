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

	async startElection(electionId) {
		console.log("SUCCESS:", electionId)
	}

	async updateElections() {
		this.setState({ startingElections: true })
		var electionStart = {}
		var electionEnd = {}
		var electionActive 
		var electionClosed
		var electionPending
		var startDate = null
		var endDate = null

		const electionsRef = this.db.collection('elections')
		await electionsRef.get().then(results => {
			results.forEach(doc => {
				const electionId = doc.data().electionId

				if (doc.data().startDate != null) startDate = doc.data().startDate.seconds * 1000
				else startDate = new Date(9999999999999)
				if (doc.data().endDate != null) endDate = doc.data().endDate.seconds * 1000
				else endDate = new Date(9999999999999)
				
				electionStart =  {...electionStart, [electionId]: startDate}
				electionEnd = {...electionEnd, [electionId]: endDate}

				if (doc.data().electionClosed == true) electionClosed = {...electionClosed, [electionId]: true}
				else electionClosed = {...electionClosed, [electionId]: false}
				if (doc.data().electionActive == true) electionActive = {...electionActive, [electionId]: true}
				else electionActive = {...electionActive, [electionId]: false}

				this.setState({ electionStartDates: electionStart })
				this.setState({ electionEndDates: electionEnd })

				if (new Date(startDate) < new Date()) {
					//this.startElection(electionId)
					if (doc.data().electionActive == false) {
						const electionStart = {
							electionActive: true,
							electionStatus: "Active"
						}
				
						electionsRef.doc(electionId.toString()).set(electionStart, {merge: true})
					}	
				} 

				if (new Date(startDate) > new Date() && doc.data().electionActive == false) {
					const electionPen = {electionStatus: "Pending Start"}
					electionsRef.doc(electionId.toString()).set(electionPen, {merge: true})
					electionPending = {...electionPending, [electionId]: true}
				} else electionPending = {...electionPending, [electionId]: false}


				if (new Date(endDate) < new Date()) {
					if (doc.data().electionActive == true) {
						const electionEnd = {
							electionStatus: "Closed",
							electionClosed: true
						}
				
						electionsRef.doc(electionId.toString()).set(electionEnd, {merge: true})
					} 
				}
			})			
		})	
	
		this.setState({ electionStatus: electionActive })
		this.setState({ electionClosed: electionClosed })	
		this.setState({ electionPending: electionPending })	
		this.setState({ startingElections: false })
			//console.log(election.electionStatus)
	}

	//const test = results.data().startDate.seconds * 1000
	//const election = {...this.state.electionStartDates, [electionId]: test }
	//this.setState({ electionStartDates: election })


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

	deleteCandidate(candidateId) {
		this.state.election.methods.deleteCandidate(candidateId).send({ from: this.state.account })
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
			this.renderElections()
			this.getYourElections()
	
			const election = {
				startDate: null,
				endDate: null,
				electionId: electionCount,
				electionActive: false,
				electionStatus: "Awaiting Start",
				electionClosed: false
			}

			this.db.collection('elections').doc(electionCount.toString()).set(election)
		})
		return true
	}

	addElectionDates(startDate, endDate, electionId) {
		if (electionId <= this.state.electionCount) {
			const election = {
				startDate: startDate,
				endDate: endDate
			}

			this.db.collection('elections').doc(electionId).set(election, {merge: true})
		}
	}

	editElectionName(_electionName, _electionId) {
		this.state.election.methods.editElectionName(_electionName, _electionId).send({ from: this.state.account })
		.once('receipt', (receipt) => {
			this.renderCandidates()
			this.renderElections()
		})
		return true
	}

	addVote(candidateId, electionId) {
		this.state.election.methods.vote(candidateId, electionId).send({ from: this.state.account })
		.once('receipt', (receipt) => {
			const vote = {
				voted: {[electionId]: this.state.candidates[candidateId-1].name},
				hasVoted: {[electionId]: true}
			}

			this.setState({hasVoted: true})
			this.db.collection('users').doc(this.state.account).set(vote, {merge: true})
			
		})

		this.renderCandidates()
		this.renderElections()
		this.updateElections()
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

	/*getElectionStartTime(electionId) {
		if (electionId <= this.state.electionCount) {
			const electionsRef = this.db.collection('elections').doc(electionId.toString())
			electionsRef.get().then(results => {
				const test = results.data().startDate.seconds * 1000
				const election = {...this.state.electionStartDates, [electionId]: test }
				this.setState({ electionStartDates: election })
			})
		}
	}*/

	addNewUser(_username) {
		this.setState({loadingUserInfo: true})
		
		if (this.state.account) {
			const user = {
				date_joined: firebase.firestore.Timestamp.now(),
				member_of: [{}],
				username: _username,
				voted: null,
				hasVoted: null
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
			electionClosed: {},
			electionPending: {},
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
			hasVoted: false,
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
		this.addElectionDates = this.addElectionDates.bind(this)
		this.updateElections = this.updateElections.bind(this)
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
							addElectionDates={this.addElectionDates}
							electionStartDates={this.state.electionStartDates}
							electionEndDates={this.state.electionEndDates}
							electionClosed={this.state.electionClosed}
							startingElections={this.state.startingElections}
							hasVoted={this.state.hasVoted}
							electionPending={this.state.electionPending}
							electionStatus={this.state.electionStatus}
							updateElections={this.updateElections}
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

