import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import SessionInfo from './SessionInfo'
import Elections from './Elections'
import ElectionForm from './ElectionForm'
import ViewElection from './ViewElection'
import VotingForm from './VotingForm'
import Loader from './Loader'
import ClosedElections from './ClosedElections'
import SocsYouManage from './SocsYouManage'
import Navbar from './Navbar'
import Instructions from './Instructions'
import { NavItem } from 'react-bootstrap';

class Home extends Component {

	linkCopied = (_link) => {
		this.setState({ 
			linkCopied: true,
			inviteLink: _link
		})
		setTimeout(() => { 
			this.setState({ linkCopied: false }) 
		}, 7000)
	}
	
  render() {
	return (
	<div>
		<Navbar />
		<section>
			<div className="container main-body">
				<div className="row">
					<div className="col">	
						<Elections 
							elections={this.props.elections}
							electionCount={this.props.electionCount}
							changeElection={this.props.changeElection}
							renderCandidates={this.props.renderCandidates}
							renderElections={this.props.renderElections}
							openElections={this.props.openElections}
							electionStatus={this.props.electionStatus}
						/>
					</div>
				</div>
				<div className="row">
					{ this.props.loadingElections
						? <Loader />
						: <div className="col">
							<ClosedElections 
							closedElections={this.props.closedElections}
							/>
						</div>
					}
					<div className="col-md-5">
						<Instructions />
					</div>
				</div>
			</div>
		</section>
		<footer>
			<p>Made by Morgan & Palmer</p>
		</footer>
	</div>
	)
  }
}

export default Home;


