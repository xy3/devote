import React, { Component } from 'react';

class VotingForm extends Component {
  render() {
	const { candidates, addVote } = this.props
	
	return (
		<div className="">
		    <h2>Vote for a Candidate</h2>
		    <hr />
		    <div className="votingForm">
		        <form id="votingForm" onSubmit={(event) => {
					event.preventDefault()
					addVote(this.candidateId.value)
		        }}>
		            <div className="row">
		                <label htmlFor="name" className="col-sm-3 col-form-label">Candidate name</label>
		                <div className="col-sm-9">
				            <select ref={(input) => this.candidateId = input}>
				            	{candidates.map((candidate, key) => {
				            		return <option key={key} value={candidate.id}>{candidate.name}</option>
				            	})}
				            </select>
		                </div>
		            </div>
		        </form>
		        <button type="submit" form="votingForm"><span>Vote</span></button>
		    </div>
		    <br/>
		</div>
	)}
}

export default VotingForm;