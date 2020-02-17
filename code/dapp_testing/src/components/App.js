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

	constructor(props) {
		super(props)
		this.state = {
			account: '',
			networkID: '',
			candidates: [],
			elections: [],
			election: null,
			loading: true
		}
		this.addElection = this.addElection.bind(this)
		this.addCandidate = this.addCandidate.bind(this)	
	}

	render() {
		return (
			<div>
				<Navbar logo={logo} />
				<section>
					<div className="container main-body">
						<div className="row">
							<SessionInfo 
								society={"Society Title"} 
								account={this.state.account} 
								network={this.state.networkID}
							/>
						</div>
						<div className="row">
							{ this.state.loading 
								? <div className="col-md-7">Loading....</div>
								: <Elections 
									elections={this.state.elections}
								/>
							}
							<ElectionForm 
								addElection={this.addElection}
								
							/>
						</div>
						<div className="row">
							<VotingResults />
							<Instructions />
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default App;

/*
		Election.deployed().then((electionInstance) => {
			this.electionInstance = electionInstance
			this.watchEvents()
			this.electionInstance.candidatesCount().then((candidatesCount) => {
				for (var i = 1; i <= candidatesCount; i++) {
				  this.electionInstance.candidates(i).then((candidate) => {
					const candidates2 = [...this.state.candidates]
					candidates2.push({
					  id: candidate[0],
					  name: candidate[1],
					  voteCount: candidate[2],
					  electionId: candidate[3]
					});
					this.setState({ candidates2: candidates2 })
				  });
				}
			  })
			this.electionInstance.electionCount().then((electionCount) => {
				for (var i = 1; i <= electionCount; i++) {
					this.electionInstance.elections(i).then((election) => {
					const elections = [...this.state.elections]
					elections.push({
						id: election[0],
						name: election[1],
						totalCandidates: election[2]
					});
					this.setState({ elections: elections })
					});
				}
			})
		})
* */