import React, { Component } from 'react';
import Web3 from 'web3';
import firebase from './firebase'
import md5 from 'md5'
import Election from '../abis/Election.json';
import autoBind from 'react-autobind';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import history from './history';


import Home from './Home';
import ElectionPage from './ElectionPage'
import UserPage from './UserPage';
import SocietiesPage from './SocietiesPage';
import Error404 from './error404'


class App extends Component {

	db = firebase.firestore()

	async componentWillMount() {
		var web3_loaded = await this.loadWeb3()
		if (web3_loaded) {
			await this.fetchAccount()
			await this.loadContracts()
			await this.getUserInfo()
			this.getYourSocs()
		}
		this.setState({ loadingPage: false })
	}

	async loadWeb3() {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum, undefined, { transactionConfirmationBlocks: 1 })
			await window.ethereum.enable()
		}
		else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider, undefined, { transactionConfirmationBlocks: 1 })
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
			await this.refreshElectionDetails()
			await this.updateElections()
		}
	}

	async changeElection(electionId) {
		this.setState({ loadingCandidates: true })
		this.setState({ displayedElection: electionId })
		this.setState({ loadingCandidates: false })
	}

	// New
	async refreshElectionDetails() {
		this.setState({ refreshingElections: true })
		var electionStatus;
		var electionStart;
		var electionEnd;

		const electionsRef = this.db.collection('elections')
		await electionsRef.get().then(results => {
			results.forEach(doc => {
				const electionId = doc.data().electionId
				electionStatus = { ...electionStatus, [electionId]: doc.data().electionStatus.toString() }

				if (doc.data().startDate != null) {
					electionStart = { ...electionStart, [electionId]: doc.data().startDate.seconds * 1000 }
					this.setState({ electionStartDates: electionStart })
				}

				if (doc.data().endDate != null) {
					electionEnd = { ...electionEnd, [electionId]: doc.data().endDate.seconds * 1000 }
					this.setState({ electionEndDates: electionEnd })
				}
			})
		})

		this.setState({ electionStatus: electionStatus })
		this.setState({ refreshingElections: false })
	}

	async getWinner(electionId) {
		var candidates = [];
		var highestVote = 0;
		var winners = [];
		var win = this.state.winners;

		const candidateCount = await this.state.election.methods.candidatesCount().call()

		for (var i = 0; i <= candidateCount - 1; i++) {
			if (this.state.candidates[i].electionId.toNumber() == electionId) {
				candidates.push(this.state.candidates[i])
				if (this.state.candidates[i].voteCount.toNumber() > highestVote) highestVote = this.state.candidates[i].voteCount.toNumber()
			}
		}

		for (var candidate of candidates) {
			if (candidate.voteCount.toNumber() == highestVote) winners.push(candidate.name)
		}

		const electionsRef = this.db.collection('elections').doc(electionId.toString())
		electionsRef.set({ winner: winners.join(', ') }, { merge: true })

		win = { ...win, [electionId]: winners.join(', ') }
		this.setState({ winners: win })

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
		var winners = {};

		const electionsRef = this.db.collection('elections')
		const userRef = this.db.collection('users').doc(this.state.account)
		await electionsRef.get().then(results => {
			results.forEach(doc => {
				const electionId = doc.data().electionId
				electionStatus = doc.data().electionStatus

				if (doc.data().startDate != null) {
					startDate = doc.data().startDate.seconds * 1000
					endDate = doc.data().endDate.seconds * 1000
					winners = { ...winners, [electionId]: doc.data().winner }

					// Start Elections if startDate > Current Date
					if ((new Date(startDate) < new Date()) && (electionStatus == "Pending Start" || electionStatus == "Awaiting Start")) {
						electionsRef.doc(electionId.toString()).update({ electionStatus: "Active" })
						electionStatusMap = { [electionId]: "Active" }
						this.setState({ electionStatus: electionStatusMap })
					}

					// End Elections if EndDate < Current Date
					if (new Date(endDate) < new Date() && electionStatus == "Active") {
						electionsRef.doc(electionId.toString()).set({ electionStatus: "Closed" }, { merge: true })
						electionStatusMap = { [electionId]: "Closed" }
						this.getWinner(electionId)
						this.setState({ winners: winners })
						this.setState({ electionStatus: electionStatusMap })
					}
				}

				electionStart = { ...electionStart, [electionId]: startDate }
				electionEnd = { ...electionEnd, [electionId]: endDate }
				this.setState({ electionStartDates: electionStart })
				this.setState({ electionEndDates: electionEnd })
			})

		})

		await userRef.get().then(doc => {
			if (doc.data() != null) {
				for (var vote in doc.data().votedFor) {
					votes = { ...votes, [vote]: true }
				}
				allVotes = { [this.state.account]: votes }
			}
		})

		this.setState({ hasVoted: allVotes })
		this.setState({ startingElections: false })
	}

	async renderCandidates() {
		// Get all candidates
		this.setState({ loadingCandidates: true })

		const candidateCount = await this.state.election.methods.candidatesCount().call()
		var candidates = []

		for (var i = 1; i <= candidateCount; i++) {
			const candidate = await this.state.election.methods.candidates(i).call()
			if (!candidate.deleted) candidates = [...candidates, candidate]
		}

		this.setState({ candidates: candidates })
		this.setState({ loadingCandidates: false })
	}

	async renderElections() {
		// Get all elections
		this.setState({ loadingElections: true })
		this.setState({ elections: [] })
		var electionStatus = {}
		var electionBool = {}
		var elections = []
		var closedElections = []
		var openElections = []

		const electionCount = await this.state.election.methods.electionCount().call()
		this.setState({ electionCount: electionCount })

		const electionsRef = this.db.collection('elections')
		await electionsRef.get().then(results => {
			results.forEach(doc => {
				electionStatus = { ...electionStatus, [doc.data().electionId]: doc.data().electionStatus.toString() }
				if (doc.data().electionStatus.toString() == "Closed") {
					electionBool = { ...electionBool, [doc.data().electionId]: true }
				} else electionBool = { ...electionBool, [doc.data().electionId]: false }
			})
		})

		for (var i = 1; i <= electionCount; i++) {
			const election = await this.state.election.methods.elections(i).call()

			if (electionBool[i]) closedElections = [...closedElections, election]
			else openElections = [...openElections, election]
			elections = [...elections, election]
		}

		this.setState({ electionStatus: electionStatus })
		this.setState({ elections: elections })
		this.setState({ openElections: openElections })
		this.setState({ closedElections: closedElections })
		this.setState({ loadingElections: false })
	}

	async getYourElections() {
		this.setState({ loadingYourElections: true })

		const electionCount = await this.state.election.methods.electionCount().call()

		var yourElections = { ...this.state.yourElections }

		for (var i = 1; i <= electionCount; i++) {
			const election = await this.state.election.methods.elections(i).call()
			const admin = election.admin

			if (admin == this.state.account) {
				yourElections = { ...yourElections, [i]: this.state.account }
			}
		}

		this.setState({ yourElections: yourElections })
		this.setState({ loadingYourElections: false })
	}

	async addCandidate(candidateName, candidatePosition, electionId) {
		await this.state.election.methods.addCandidate(candidateName, candidatePosition, electionId).send({ from: this.state.account })
			.once('receipt', (receipt) => {
				this.renderCandidates()
				this.renderElections()
			})
	}

	async deleteCandidate(candidateId) {
		await this.state.election.methods.deleteCandidate(candidateId).send({ from: this.state.account })
			.once('receipt', (receipt) => {
				this.renderCandidates()
				this.renderElections()
			})
	}

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
					electionName: electionName,
					winner: ""
				}
				this.db.collection('elections').doc(electionCount.toString()).set(election)
				this.renderElections()
				this.getYourElections()
				this.refreshElectionDetails()
			})
	}

	async editElectionName(_electionName, _electionId) {
		const receipt = await this.state.election.methods.editElectionName(_electionName, _electionId).send({ from: this.state.account })
		await this.db.collection('elections').doc(_electionId).update({ electionName: _electionName })

		this.renderCandidates()
		this.renderElections()
	}

	async addVote(candidateId, electionId) {
		var electionStatus;
		const electionRef = await this.db.collection('elections').doc(electionId).get().then(results => {
			if (results.data().electionStatus == "Active") electionStatus = true
			else electionStatus = false
		})

		if (electionStatus) {
			this.state.election.methods.vote(candidateId, electionId).send({ from: this.state.account })
				.once('receipt', (receipt) => {
					const vote = { votedFor: { [electionId]: this.state.candidates[candidateId - 1].name } }
					this.db.collection('users').doc(this.state.account).set(vote, { merge: true })

					const hasVoted = { [electionId]: true }
					const result = { [this.state.account]: hasVoted }
					this.setState({ ...this.state.hasVoted, hasVoted: result })

					this.refreshElectionDetails()
					this.renderCandidates()
					this.renderElections()
				})
		}
	}

	async getUserInfo() {
		this.setState({ loadingUserInfo: true })

		if (this.state.account) {
			const user = await this.db.collection('users').doc(this.state.account).get()
			if (user.exists) {
				this.setState({
					user: user.data(),
					userExists: true,
					joinedDate: user.data().date_joined.seconds * 1000
				})
			} else {
				this.setState({ userExists: false })
			}
			this.setState({ loadingUserInfo: false })
			// else, ask them for a name

			await this.getYourMemberships()
		}
	}

	addNewUser(_username) {
		this.setState({ loadingUserInfo: true })

		if (this.state.account) {
			const user = {
				date_joined: firebase.firestore.Timestamp.now(),
				member_of: {},
				username: _username,
				votedFor: {}
			}

			this.db.collection('users').doc(this.state.account).set(user)

			this.setState({
				user: user,
				userExists: true,
			})
		}

		this.setState({ loadingUserInfo: false })
	}

	// 
	// Society methods
	//

	async addNewSociety(_societyName, _adminEmail) {
		if (this.state.account) {
			const newSocRef = this.db.collection('societies').doc()

			await newSocRef.set({
				date_added: firebase.firestore.Timestamp.now(),
				isVerified: false,
				adminEmail: _adminEmail,
				name: _societyName,
				owner: this.state.account,
				memberTotal: 0,
				inviteCode: this.hashSocId(newSocRef.id)
			})

			await this.joinSoc(this.hashSocId(newSocRef.id))
			await this.getYourSocs()
			await this.getYourMemberships()
		}

		// Here we can send an email to admins requesting the society to be verified.
		// e.g. sendVerificationRequest()
		// For development purposes, we will skip this step and have societies verified by default.

		return true
	}

	changePage(page) {
		this.setState({ page: page })
	}

	hashSocId(_socId) {
		const hash = md5(_socId)
		return hash.slice(0, 8)
	}

	getInviteLink(_socId) {
		var url = window.location.href.split("/");
		var site_url = url[0] + "//" + url[2] + "/join/"
		const code = site_url + this.hashSocId(_socId)
		return code
	}

	getYourSocs() {
		this.setState({ loadingYourSocs: true })
		var socs = []

		if (this.state.account) {
			const societiesRef = this.db.collection('societies')
			societiesRef.where("owner", "==", this.state.account).get().then((results) => {
				results.forEach((society) => {
					socs.push({ ...society.data(), id: society.id })
				})

				this.setState({ yourSocs: socs })
				this.setState({ loadingYourSocs: false })
			})
		}
	}

	async getYourMemberships() {
		this.setState({ loadingMemberships: true })
		const socRef = this.db.collection('societies')

		var memberships = []

		if (this.state.userExists) {
			const res = await socRef.get()

			res.forEach((soc) => {
				if (soc.id in this.state.user.member_of) {
					memberships.push({ ...soc.data(), id: soc.id })
				}
			})

			this.setState({ memberships: memberships })
			this.setState({ loadingMemberships: false })
		}
	}

	async joinSoc(_inviteCode) {
		if (this.state.user.member_of) {
			const socsRef = this.db.collection('societies')
			const res = await socsRef.where('inviteCode', '==', _inviteCode).get()

			const soc = res.docs[0]
			if (soc) {
				const userRef = this.db.collection('users').doc(this.state.account)

				this.state.user.member_of[soc.id] = {
					name: soc.data().name,
					joined_soc_date: firebase.firestore.Timestamp.now()
				}

				await userRef.update({ member_of: this.state.user.member_of })
				this.setState({ joinedSocName: soc.data().name })
				// Updating state while on the same page will just resend the join request
			}
		}
	}

	async leaveSoc(_socId) {
		if (this.state.user.member_of) {
			const userRef = this.db.collection('users').doc(this.state.account)

			if (_socId in this.state.user.member_of) {
				delete this.state.user.member_of[_socId]
			}

			await userRef.update({ member_of: this.state.user.member_of })
			await this.getUserInfo()
		}
	}

	removeSoc(_socId) {
		const socRef = this.db.collection("societies").doc(_socId)

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
			user: {},
			account: '',
			networkID: '',
			candidates: [],
			elections: [],
			electionStatus: {},
			closedElections: [],
			openElections: [],
			winners: {},
			election: null,
			electionCount: 0,
			loadingElections: true,
			loadingYourElections: true,
			joinedDate: null,
			loadingCandidates: true,
			loadingPage: true,
			displayedElection: 1,
			yourElections: {},
			yourSocs: [],
			memberships: [],
			userExists: true,
			loadingUserInfo: true,
			joinedSocName: '',
			page: 0,
			// New
			hasVoted: {},
			electionStartDates: {},
			electionEndDates: {},
			electionStatus: {},
			refreshingElections: true,
			startingElections: true,

			loadingMemberships: true,
			loadingYourSocs: true
		}

		autoBind(this)
	}

	render() {
		const homeProps = (props) => {
			return (
				<Home
					{...props}
					account={this.state.account}
					elections={this.state.elections}
					openElections={this.state.openElections}
					closedElections={this.state.closedElections}
					electionStatus={this.state.electionStatus}
					user={this.state.user}
					changePage={this.changePage}
					page={this.state.page}

					loadingElections={this.state.loadingElections}
					loadingUserInfo={this.state.loadingUserInfo}
					electionCount={this.state.electionCount}

					// Functions
					addElection={this.addElection}
					changeElection={this.changeElection}
					renderElections={this.renderElections}
					renderCandidates={this.renderCandidates}

				// //Socs
				// yourSocs={this.state.yourSocs}
				// removeSoc={this.state.removeSoc}
				// getInviteLink={this.getInviteLink}
				/>
			);
		}

		const userPageProps = (props) => {
			return (
				<UserPage
					{...props}
					user={this.state.user}
					account={this.state.account}
					networkId={this.state.networkID}
					joinedDate={this.state.joinedDate}
					userExists={this.state.userExists}

					elections={this.state.elections}
					electionStatus={this.state.electionStatus}
					loadingYourElections={this.state.loadingYourElections}
					yourElections={this.state.yourElections}
					loadingPage={this.state.loadingPage}
					yourSocs={this.state.yourSocs}
					changePage={this.changePage}
					memberships={this.state.memberships}
					electionCount={this.state.electionCount}
					page={this.state.page}

					// Functions
					addElection={this.addElection}
					getYourElections={this.getYourElections}
					addNewUser={this.addNewUser}
				/>
			);
		}

		const societyPageProps = (props) => {
			return (
				<SocietiesPage
					{...props}
					user={this.state.user}

					loadingYourSocs={this.state.loadingYourSocs}
					loadingMemberships={this.state.loadingMemberships}
					userExists={this.state.userExists}
					yourSocs={this.state.yourSocs}
					memberships={this.state.memberships}
					joinedSocName={this.state.joinedSocName}
					changePage={this.changePage}
					page={this.state.page}

					// Functions
					addNewSociety={this.addNewSociety}
					leaveSoc={this.leaveSoc}
					removeSoc={this.removeSoc}
					getInviteLink={this.getInviteLink}
					addNewUser={this.addNewUser}
				/>
			);
		}


		// Page Routing
		return (
			<Router history={history}>
				<div>
					<Switch>
						<Route path="/" exact render={homeProps} />
						<Route path="/account" exact render={userPageProps} />
						<Route path="/societies" exact render={societyPageProps} />


						<Route path="/join/:inviteCode" render={({ match }) => societyPageProps({
							match: match,
							joining: true,
							joinSoc: this.joinSoc
						})} />

						<Route path="/elections/:id" render={({ match }) =>
							<ElectionPage
								account={this.state.account}
								elections={this.state.elections}
								closedElections={this.state.closedElections}
								candidates={this.state.candidates}
								loadingCandidates={this.state.loadingCandidates}
								displayedElection={this.state.displayedElection}
								yourElections={this.state.yourElections}
								electionCount={this.state.electionCount}

								// Functions
								renderCandidates={this.renderCandidates}
								match={match}
								addVote={this.addVote}
								addCandidate={this.addCandidate}
								deleteCandidate={this.deleteCandidate}
								editElectionName={this.editElectionName}

								// New
								electionStartDates={this.state.electionStartDates}
								winners={this.state.winners}
								electionEndDates={this.state.electionEndDates}
								startingElections={this.state.startingElections}
								hasVoted={this.state.hasVoted}
								electionStatus={this.state.electionStatus}
								updateElections={this.updateElections}
								refreshElectionDetails={this.refreshElectionDetails}
								refreshingElections={this.state.refreshingElections}
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

