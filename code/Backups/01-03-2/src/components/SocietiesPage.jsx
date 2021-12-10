import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';

import Navbar from './Navbar'
import Loader from './Loader'
import NewUser from './NewUser'
import NewSocietyForm from './NewSocietyForm'
import SocsYouManage from './SocsYouManage'
import SocsMemberships from './SocsMemberships'
import JoinedSociety from './JoinedSociety'
import InviteLinkForm from './InviteLinkForm'



class SocietiesPage extends Component {

	linkCopied = (_link) => {
		this.setState({ 
			linkCopied: true,
			inviteLink: _link
		})
		setTimeout(() => { 
			this.setState({ linkCopied: false }) 
		}, 7000)
	}

	closeBox = () => {
		this.setState({ joining: false })
	}

	constructor(props) {
		super(props)
		this.state = {
			linkCopied: false,
			inviteLink: '',
			joining: this.props.joining
		}
	}

	async runJoinRequest() {
		if (this.props.joining) {
			const inviteCode = this.props.match.params.inviteCode
			await this.props.joinSoc(inviteCode)
		}
	}


	render() {
		const page_loaded = this.props.loadingPage ? '' : 'hide'
		// Prevent scrollbar from popping in and out while loading
		var preventScrollbar =  ''
		if (!this.props.userExists || this.props.loadingPage)
			preventScrollbar = 'preventScrollbar'

		this.runJoinRequest()


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
							<div className="col">
							{ this.props.loadingMemberships 
								? <Loader/>
								: <SocsMemberships
									memberships={this.props.memberships}
									leaveSoc={this.props.leaveSoc}
								/>

							}
							</div>
							<div className="col">
							{ this.props.loadingYourSocs 
								? <Loader/>
								: <SocsYouManage
									yourSocs={this.props.yourSocs}
									removeSoc={this.props.removeSoc}
									getInviteLink={this.props.getInviteLink}
									linkCopied={this.linkCopied}
								/>
							}
							</div>
						</div>


						<div className="row">
							<div className="col">
								<NewSocietyForm 
									addNewSociety={this.props.addNewSociety}
								/>
							</div>
							<div className="col">
								<InviteLinkForm 
									yourSocs={this.props.yourSocs}
									getInviteLink={this.props.getInviteLink}
									addNewSociety={this.props.addNewSociety}
								/>
							</div>
						</div>
					
					</div>
				</section>
				<footer>
					<p>Made by Morgan & Palmer</p>
				</footer>
				
				<Slide bottom when={this.state.linkCopied}>
					<div className="notification bottom">
						<p>Link copied to your clipboard! <span className="link">{this.state.inviteLink}</span></p>
					</div>
				</Slide>


				{ this.state.joining
						? <JoinedSociety
							closeBox={this.closeBox}
							socName={this.props.joinedSocName}
						/>
						: ""
				}
			</div>
		);
	}
}

export default SocietiesPage;