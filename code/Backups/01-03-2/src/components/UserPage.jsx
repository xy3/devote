import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';

import SessionInfo from './SessionInfo'
import Navbar from './Navbar'
import YourElections from './YourElections'
import Loader from './Loader'
import ElectionForm from './ElectionForm'
import NewUser from './NewUser'



class UserPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			linkCopied: false,
			inviteLink: ''
		}
	}


	render() {
		const page_loaded = this.props.loadingPage ? '' : 'hide'
		// Prevent scrollbar from popping in and out while loading
		var preventScrollbar =  ''
		if (!this.props.userExists || this.props.loadingPage)
			preventScrollbar = 'preventScrollbar'

		return (
			<div >
				{ this.props.userExists
						? ""
						: <NewUser addNewUser={this.props.addNewUser} />
				}
				<Navbar />
				<div id="pageloader" className={page_loaded}>
					<Loader/>
				</div>
								
				<section className={preventScrollbar}>
					<div className="container main-body">
						<div className="row">
							{ this.props.loadingUserInfo 
								? <Loader />
								: <div className="col">
									<SessionInfo 
										user={this.props.user}
										account={this.props.account}
										joinedDate={this.props.joinedDate}
										networkId={this.props.networkId}
										yourSocs={this.props.yourSocs}
									/>
								</div>
							}
							<div className="col">
								<ElectionForm 
									addElection={this.props.addElection} 
									yourSocs={this.props.yourSocs}
								/>
							</div>
						</div>
						
						<div className="row">
							<div className="col">
								<h2>Your Elections</h2>
								<hr />
								<div className="yourElections">
								{ this.props.loadingYourElections
									? <Loader />
									: <YourElections
										elections={this.props.elections}
										getYourElections={this.props.getYourElections} 
										yourElections={this.props.yourElections}
										account={this.props.account}
										electionCount={this.props.electionCount}
										electionStatus={this.props.electionStatus}
									/>
								}
								</div>
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