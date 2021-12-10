import React, { Component } from 'react';
import logo from '../img/logo.png'

import SessionInfo from './SessionInfo'
import Navbar from './Navbar'
import YourElections from './YourElections'
import Loader from './Loader'
import ElectionForm from './ElectionForm'

class UserPage extends Component {
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
								{ this.props.loadingYourElections
									? <Loader />
									: <YourElections
										elections={this.props.elections}
										getYourElections={this.props.getYourElections} 
										permissions={this.props.permissions}
										account={this.props.account}
									/>
								}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<ElectionForm 
									addElection={this.props.addElection} 
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