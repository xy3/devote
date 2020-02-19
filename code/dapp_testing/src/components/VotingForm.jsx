import React, { Component } from 'react';

class VotingForm extends Component {
  render() {
	return (
		<div className="">
		    <h2>Vote for a Candidate</h2>
		    <hr />
		    <div className="votingForm">
		        <form id="votingForm" onSubmit={(event) => {
					event.preventDefault()
					if (this.props.addVote(this.candidateId.value)) {
						event.target.reset();
					}
		        }}>
		            <div className="row">
		                <label htmlFor="name" className="col-sm-3 col-form-label">Candidate name</label>
		                <div className="col-sm-9">
				            <select ref={(input) => this.candidateId = input}>
				            	{this.props.candidates.map((candidate, key) => {
				            		return <option key={key} value={candidate.id}>{candidate.name}</option>
				            	})}
				            </select>
		                </div>
		            </div>
		        </form>
		        <button type="submit" form="votingForm"><span>Vote</span></button>
		    </div>
		</div>
	)}
}

export default VotingForm;