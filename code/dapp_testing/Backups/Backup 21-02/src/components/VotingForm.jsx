import React, { Component } from 'react';

class VotingForm extends Component {
  render() {
	const { candidates, displayedElection, addVote } = this.props
	
	return (
		<div className="">
		    <h2>Vote for a Candidate</h2>
		    <hr />
		    <div className="votingForm">
		        <form id="votingForm" onSubmit={(event) => {
					event.preventDefault()
					addVote(this.candidateId.value, displayedElection)
		        }}>
		            <div className="row" id="votingFormInput">
		                <label htmlFor="name" className="col-sm-3 col-form-label">Candidate name</label>
		                <div className="col-sm-9">
				            <select ref={(input) => this.candidateId = input}>
								{candidates.map((candidate, key) => {
									if(candidate.electionId.toNumber() == displayedElection) {
										return <option key={key} value={candidate.id}>{candidate.name}</option>
									}
								})}
				            </select>
		                </div>
		            </div>
					<button type="submit" id="submitVote" form="votingForm"><span>Vote</span></button>
		        </form>
		        
		    </div>
		    <br/>
		</div>
	)}
}

export default VotingForm;