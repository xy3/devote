import React, { Component } from 'react';
import Web3 from 'web3';
import Election from '../abis/Election.json';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import ElectionDetails from './ElectionDetails'
import UserPage from './UserPage';

class App extends Component {
	async componentWillMount() {
		var x = await this.loadWeb3()
		if (x) {
			await this.fetchAccount()
			await this.loadContracts()
		}
	}

	async loadWeb3() {
		const options = {transactionConfirmationBlocks: 1}

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

		const election = web3.eth.Contract(Election.abi, networkData.address)
		
		if (!networkData) {

			alert("You're not on the right network! Read the voting instructions below.")

		} else {

			// Load the election contract & network ID
			const election = web3.eth.Contract(Election.abi, networkData.address)
			this.setState({ election })
			this.setState({ networkID })

			// await this.getCandidates()
			await this.renderElectionList()
			await this.renderElection()
			await this.getYourElections()
			this.setState({loading: false})

		}
	}

	async changeElection(electionId) {
		this.setState({ loadingCandidates: true })
		this.setState({ displayedElection: electionId})
		this.setState({ loadingCandidates: false })
	}

	async renderElection() {
		// Get all candidates
		this.setState({ loadingCandidates: true })
		this.setState({ displayedCandidates: [] })
		
		const candidateCount = await this.state.election.methods.candidatesCount().call()
		var candidates = []
		
		for (var i = 1; i <= candidateCount; i++) {
			const candidate = await this.state.election.methods.candidates(i).call()
			if (candidate.electionId.toNumber() == this.state.displayedElection) {
				this.state.displayedCandidates = [...this.state.displayedCandidates, candidate]
			}
		}

		for (var j = 1; j <= candidateCount; j++) {
			const candidate = await this.state.election.methods.candidates(j).call()
			this.state.candidates = [...this.state.candidates, candidate]
		}

		this.setState({ displayedCandidates: this.state.displayedCandidates })
		this.setState({ loadingCandidates: false })
	}

	async renderElectionList() {
		// Get all elections
		this.setState({ loadingElections: true })
		this.setState({ elections: [] })
		
		const electionCount = await this.state.election.methods.electionCount().call()
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
		this.setState({ yourElections: [] })
		
		const electionCount = await this.state.election.methods.electionCount().call()
		
		var yourElections = []

		for (var i = 1; i <= electionCount; i++) {
			const election = await this.state.election.methods.elections(i).call()
			const admin = await this.state.election.methods.admins(election.electionId.toNumber()).call()
			if(admin == this.state.account) {
				yourElections = [...yourElections, election]
			}
		}

		this.setState({yourElections: yourElections})
		this.setState({loadingYourElections: false})
	}

	addCandidate(candidateName, candidatePosition, electionId) {
		this.state.election.methods.addCandidate(candidateName, candidatePosition, electionId).send({ from: this.state.account })
		.once('receipt', (receipt) => {
			this.renderElection()
		})
		return true
	}
	
	addElection(electionName) {
		this.state.election.methods.addElection(electionName).send({ from: this.state.account })
		.once('receipt', (receipt) => {
			this.renderElectionList()
		})
		return true
	}

	addVote(candidateId) {
		this.state.election.methods.vote(candidateId, this.state.displayedCandidates[0].electionId.toNumber()).send({ from: this.state.account })
		.once('receipt', (receipt) => {
			this.renderElection()
		})
		return true
	}

	constructor(props) {
        super(props)
        this.state = {
            account: '',
            networkID: '',
            candidates: [],
            elections: [],
			election: null,
			yourElections: [],
			loadingElections: true,
			loadingYourElections: true,
            loadingCandidates: true,
            displayedElection: 1,
            displayedCandidates: []
        }

        this.addElection = this.addElection.bind(this)
        this.addCandidate = this.addCandidate.bind(this)	
        this.changeElection = this.changeElection.bind(this)
        this.renderElection = this.renderElection.bind(this)
        this.renderElectionList = this.renderElectionList.bind(this)
		this.addVote = this.addVote.bind(this)
		this.getYourElections = this.getYourElections.bind(this)
    }

	render() {
		const homeProps = (props) => {
			return (
				<Home 
					account={this.state.account} 
					network={this.state.networkID}
					elections={this.state.elections} 
					changeElection={this.changeElection}
					renderElection={this.renderElection}
					renderElectionList={this.renderElectionList}
					displayedCandidates={this.state.displayedCandidates}
					displayedElection={this.state.displayedElection}
					//addCandidate={this.addCandidate}
					addElection={this.addElection}
					addVote={this.addVote}
					loadingElections={this.state.loadingElections}
					loadingCandidates={this.state.loadingCandidates}
				/>
			);
		}

		const userPageProps = (props) => {
			return (
				<UserPage 
					account={this.state.account} 
					network={this.state.networkID}
					elections={this.state.yourElections}
					loadingElections={this.state.loadingElections}
					addElection={this.addElection}
					addCandidate={this.addCandidate}
					getYourElections={this.getYourElections}
				/>
			);
		}

		// Page Routing
		return (
			<Router>
				<div>
					<Switch>
						<Route path="/" exact render={homeProps}/>
						<Route path="/account" exact component={userPageProps} />
						<Route path="/elections/:id" render={({match}) => 
						<ElectionDetails 
							candidates={this.state.candidates}
							loadingCandidates={this.state.loadingCandidates}
							elections={this.state.elections}
							renderElection={this.renderElection}
							match={match} 
						/>} />
					</Switch>
				</div>
			</Router>
		);
	}
}


export default App;