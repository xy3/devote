import React, { Component } from 'react';
import Web3 from 'web3'
import Election from '../abis/Election.json'
import logo from '../img/logo.png'

import SessionInfo from './SessionInfo'
import Navbar from './Navbar'
import YourElections from './YourElections'
import Loader from './Loader'
import ElectionForm from './ElectionForm'
import CandidateForm from './CandidateForm'

class UserPage extends Component {
	reloadTable = () => {
		this.props.getYourElections()
	}

	render() {
		return (
			<div>
				<Navbar logo={logo} />
				<section className="section">
					<div className="container main-body">
						<div className="row">
							<SessionInfo 
								account={this.props.account} 
								network={this.props.networkID}
							/>
						</div>
						<div className="row">
							<div className="col">
								<h1>Account Elections</h1>
								<hr />
								<div className="yourElections">
								{ this.props.loadingElections
									? <Loader />
									: <YourElections elections={this.props.elections}/>
								}
								</div>
								<button type="submit" onClick={this.reloadTable}><span>Refresh</span></button>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<ElectionForm addElection={this.props.addElection} />
							</div>
							<div className="col">
								<CandidateForm 
									elections={this.props.elections}
									addCandidate={this.props.addCandidate}
								/>
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