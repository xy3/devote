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
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable()
		}
		else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider)
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
		
		if (networkData) {
			console.log(networkID)
			const election = web3.eth.Contract(Election.abi, networkData.address)
			this.setState({ election })
			this.setState({ networkID })
		} else {
			alert("You're not on the right network! Read the voting instructions below.")
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			account: '',
			networkID: ''
		}
	}

	render() {
		// let body

		// body = <Home account={this.state.account} />

		return (
			<div>
				<Navbar logo={logo} />
				<section>
					<div className="container main-body">
						<div className="row">
							<SessionInfo society={"Society Title"} account={this.state.account} network={this.state.networkID}/>
						</div>
						<div className="row">
							<Elections />
							<ElectionForm />
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
