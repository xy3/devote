import React, { Component } from 'react';
import Web3 from 'web3'
import Election from '../abis/Election.json'

import '../scss/style.scss';
import logo from '../img/logo.png'

import Navbar from './Navbar'
import SessionInfo from './SessionInfo'
import Elections from './Elections'
import ElectionForm from './ElectionForm'
import VotingResults from './VotingResults'
import Instructions from './Instructions'
import ViewElection from './ViewElection'
import VotingForm from './VotingForm'



class App extends Component {
	async componentWillMount() {
		await this.loadWeb3()
		await this.fetchAccount()
		await this.loadContracts()
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
			window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
		}
		
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

			await this.getCandidates()
			await this.getElections()
			await this.renderElection()
			this.setState({loading: false})

		}

		//election.methods.addCandidate("Ciaran Palmer", "Guardian").send({from: this.state.account});
	}

	async getElections() {
		// Get all elections
		this.setState({ loading: true })
		
		const electionCount = await this.state.election.methods.electionCount().call()
		var elections = []

		for (var i = 1; i <= electionCount; i++) {
			const election = await this.state.election.methods.elections(i).call()
			elections = [...elections, election]
		}

		this.setState({elections: elections})
	}

	async changeElection(electionId) {
		this.setState({ displayedElection: electionId});
	}

	async getCandidates() {
		// Get all candidates
		this.setState({ loading: true })
		
		const candidateCount = await this.state.election.methods.candidatesCount().call()
		var candidates = []

		for (var i = 1; i <= candidateCount; i++) {
			const candidate = await this.state.election.methods.candidates(i).call()
			candidates = [...candidates, candidate]
			// this.setState({ 
			// 	candidates: [...this.state.candidates, candidate]
			// })
		}

		this.setState({candidates: candidates})
	}

	async renderElection() {
		// Get all candidates
		this.setState({displayedCandidates: []})
		
		const candidateCount = await this.state.election.methods.candidatesCount().call()
		var candidates = []

		for (var i = 1; i <= candidateCount; i++) {
			const candidate = await this.state.election.methods.candidates(i).call()
			if (candidate.electionId.toNumber() == this.state.displayedElection) {
				this.state.displayedCandidates = [...this.state.displayedCandidates, candidate]
			}
		}

		this.setState({displayedCandidates: this.state.displayedCandidates})
	}

	addCandidate(candidateName, candidatePosition) {
		this.state.election.methods.addCandidate(candidateName, candidatePosition).send({ from: this.state.account })
		.once('receipt', (receipt) => {
			this.getCandidates()
			this.setState({loading: false})
		})
		return true
	}
	
	addElection(electionName, initialCandidate) {
		this.state.election.methods.addElection(electionName, initialCandidate).send({ from: this.state.account })
		.once('receipt', (receipt) => {
			this.getElections()
			this.setState({loading: false})
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
			loading: true,
			displayedElection: 1,
			displayedCandidates: []
		}

		this.addElection = this.addElection.bind(this)
		this.addCandidate = this.addCandidate.bind(this)	
		this.changeElection = this.changeElection.bind(this)
		this.renderElection = this.renderElection.bind(this)
		this.addVote = this.addVote.bind(this)
	}

	render() {
		return (
			<div>
				<Navbar logo={logo} />
				<section className="section">
					<div className="container main-body">
						<div className="row">
							<SessionInfo 
								account={this.state.account} 
								network={this.state.networkID}
							/>
						</div>
						<div className="row" id="electionsList">
							{ this.state.loading 
								? <div className="col-md-7">Loading Election...</div>
								: <ViewElection 
									candidates={this.state.displayedCandidates}
									displayedElection={this.state.displayedElection}
									elections={this.state.elections} 
									renderElection={this.renderElection}
								/>
							}
							<div className="votingForm">
								<VotingForm 
									candidates={this.state.displayedCandidates}
									addVote={this.addVote}
								/>
							</div>
						</div>
						<div className="row">
							{ this.state.loading 
								? <div className="col-md-7">Loading Election List...</div>
								: <Elections 
									elections={this.state.elections} 
									changeElection={this.changeElection}
									renderElection={this.renderElection}
								/>
							}
							<ElectionForm addElection={this.addElection} />
						</div>
						
						{/*<div className='row'>
							<Instructions />
						</div>*/}
					</div>
				</section>
			</div>
		);
	}
}

export default App;