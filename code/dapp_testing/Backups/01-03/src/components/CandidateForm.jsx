import React, { Component } from 'react';

class CandidateForm2 extends Component {
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
					if (this.props.addCandidate(candidateName, candidatePosition, this.props.displayedElection)) {
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
                    <button type="submit" form="newCandidateForm" id="submitCandidateForm"><span>Add Candidate</span></button>
				</form>
			</div>
		</div>
	);
  }
}

export default CandidateForm2;