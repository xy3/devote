import React, { Component } from 'react'
import Navbar from './Navbar'
import Loader from './Loader'

import EditElection from './EditElection'
import CandidateForm from './CandidateForm'
import Error404 from './error404'
import VotingForm from './VotingForm'
import FullElection from './FullElection'
import StartElection from './StartElection'
import EndElection from './EndElection'
import ElectionStatus from './ElectionStatus'

class ElectionPage extends Component {
	reloadTable = () => {
		this.props.renderCandidates()
	}

	render() {
		//console.log(this.props.electionStartDates)
		const election_id = this.props.match.params.id
		const electionDate = this.props.electionStartDates[this.props.match.params.id]
		
		// If loadingCandidates is done and election_id is not a valid ID, return 404 page
		if (!this.props.loadingCandidates) {
			if (election_id > this.props.electionCount) {
				return ( <Error404 /> )
			} 
		}

		return (
			<div>
				<Navbar />
				<section className="section">
				<div className="container main-body" id='electionDetails'>
					<div className="row">
						<div className="col-md-7">
							{ this.props.loadingCandidates
								? <Loader />
								: <FullElection
									electionName={this.props.elections[election_id-1].name}
									candidates={this.props.candidates}
									reloadTable={this.reloadTable}
									match={this.props.match}
								  />
							}
						</div>
						{ !this.props.startingElections
						? <div className="col-md-5" id="addVoteSpacing">
							
							<ElectionStatus 
								electionStartDate={this.props.electionStartDates[election_id]}
								electionEndDate={this.props.electionEndDates[election_id]}
								electionId={election_id}
							/>
							{ this.props.electionStatus[election_id] &&
							<VotingForm 
								candidates={this.props.candidates}
								electionId={this.props.match.params.id}
								addVote={this.props.addVote}
								votedFor={this.props.votedFor}
								getVotedFor={this.props.getVotedFor}
								account={this.props.account}
								hasVoted={this.props.hasVoted}
								startingElections={this.props.startingElections}
								electionClosed={this.props.electionClosed}
							/>}	
						</div>
						: <Loader />}
					
					</div> 

					{(this.props.yourElections[election_id] == this.props.account) && !this.props.electionStatus[election_id] &&
					<div>
						<div className="row" id="electionEdit">
							<div className="col-md-7">
								<EditElection
									electionId={election_id}
									editElectionName={this.props.editElectionName}
									candidates={this.props.candidates}
									displayedElection={election_id}
									deleteCandidate={this.props.deleteCandidate}
								/>
							</div>
							<div className="col-md-5">
								<CandidateForm
									elections={this.props.elections}
									displayedElection={election_id}
									addCandidate={this.props.addCandidate}
								/>
							</div>
						</div>
						{ !this.props.electionStatus[election_id] && !this.props.electionPending[election_id] &&
						<div className="row" id="startEndElection">
							<div className="col md-8">
								<StartElection
									electionId={election_id}
									updateElections={this.props.updateElections}
									addElectionDates={this.props.addElectionDates}
								/>
							</div>
						</div>
						}
					</div>
					}
				</div>
				</section>
			</div>
		)
	}
}

export default ElectionPage