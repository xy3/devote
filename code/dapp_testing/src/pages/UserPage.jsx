import React, { Component } from 'react';
import Web3 from 'web3'
import Election from '../abis/Election.json'

import Loader from '../components/Loader'
import SessionInfo from '../components/SessionInfo'



class UserPage extends Component {
	async componentWillMount() {
		var x = await this.loadWeb3()
		if (x) {
			await this.fetchAccount()
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

			return false;
		}

		return true;
		
	}

	async fetchAccount() {
		const web3 = window.web3
		const accounts = await web3.eth.getAccounts()
		this.setState({ account: accounts[0] })
	}


	constructor(props) {
		super(props)
		this.state = {
			account: '',
			networkID: ''
		}
	}

	render() {
		return (
			<div>
				<section className="section">
					<div className="container main-body">
						<div className="row">
							<SessionInfo 
								account={this.state.account} 
								network={this.state.networkID}
							/>
						</div>
						<div className="row">
							<div className="col">
								<h2>Profile settings</h2>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<h2>Societies</h2>
							</div>
						</div>
					</div>
				</section>
				<footer>
					<p>Made by Morgan & Palmer</p>
				</footer>
			</div>
		);
	}
}

export default UserPage;