import React, { Component } from 'react'

import SessionInfo from './SessionInfo'
import Navbar from './Navbar'
import YourElections from './YourElections'
import Loader from './Loader'
import ElectionForm from './ElectionForm'
import NewUser from './NewUser'
import NewSocietyForm from './NewSocietyForm'
import SocsYouManage from './SocsYouManage'
import SocsMemberships from './SocsMemberships'



class UserPage extends Component {
	render() {
		const page_loaded = this.props.loadingPage ? '' : 'hide'
		// Prevent scrollbar from popping in and out while loading
		const preventScrollbar = this.props.loadingPage ? 'preventScrollbar' : ''
		
		
		
		return (
			<div>
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
							: <SessionInfo
								user={this.props.user}
								account={this.props.account} 
								networkID={this.props.network}
							/>
						}
						</div>
						<div className="row">
							<div className="col-md-7">
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
									/>
								}
								</div>
							</div>
							<div className="col">
								<ElectionForm 
									addElection={this.props.addElection} 
								/>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<SocsMemberships
									memberships={this.props.memberships}
									leaveSoc={this.props.leaveSoc}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<SocsYouManage
									yourSocs={this.props.yourSocs}
									removeSoc={this.props.removeSoc}
								/>
							</div>
							<div className="col">
								<NewSocietyForm 
									addNewSociety={this.props.addNewSociety}
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