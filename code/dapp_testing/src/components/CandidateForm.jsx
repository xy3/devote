import React, { Component } from 'react';

class CandidateForm extends Component {
  render() {
	return (
		<div className="">
			<h2>Add a Candidate</h2>
			<hr />
			<div className="newCandidateForm">
				<form id="newCandidateForm" onSubmit={(event) => {
					event.preventDefault()
					const candidateName = this.candidateName.value
					const candidatePosition = this.candidatePosition.value
					const electionId = this.electionId.value
					if (this.props.addCandidate(candidateName, candidatePosition, electionId)) {
						event.target.reset()
					}
				}}>
					<div className="form-group row">
						<label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
						<div className="col-sm-9">
							<input
								id="candidateName"
								type="text"
								ref={(input) => {this.candidateName = input}}
								placeholder='Joe Bloggs'
							/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="position" className="col-sm-3 col-form-label">Position</label>
						<div className="col-sm-9">
							<input 
								id="candidatePosition"
								type="text"
								ref={(input) => {this.candidatePosition = input}}
								placeholder='e.g. Chair'
							/>
						</div>
					</div>
					<div className="row">
						<label htmlFor="election" className="col-sm-3 col-form-label">Election</label>
						<div className="col-sm-9">
				            <select ref={(input) => this.electionId = input}>
				            	<option value="-1" selected disabled>Select an Election</option>
				            	{this.props.elections.map((election, key) => {
				            		return <option key={key} value={election.electionId}>{election.name}</option>
				            	})}
				            </select>
		                </div>
					</div>
				</form>
				<button type="submit" form="newCandidateForm"><span>Submit</span></button>
			</div>
		</div>
	);
  }
}

export default CandidateForm;