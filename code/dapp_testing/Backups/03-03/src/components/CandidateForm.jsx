import React, { Component } from 'react';

class CandidateForm extends Component {
  render() {
	return (
		<div className="">
			<h2>Add Candidate</h2>
			<hr/>
			<div className="newCandidateForm">
				<form id="newCandidateForm" onSubmit={(event) => {
					event.preventDefault()
					const candidateName = this.candidateName.value
					const candidatePosition = this.candidatePosition.value
					if (this.props.addCandidate(candidateName, candidatePosition, this.props.electionId)) event.target.reset()
					
				}}>
					<div className="form-group row">
						<label htmlFor="name" id="addCandidateInput">Name</label>
						<div className="col-sm-10">
							<input
								id="candidateName"
								type="text"
								ref={(input) => {this.candidateName = input}}
								placeholder='Jack Black'
							/>
						</div>
					</div>
					<div className="form-group row" id="addCandidatePosition">
						<label htmlFor="position" id="addCandidateInput">Position</label>
						<div className="col-sm-10">
							<input 
								id="candidatePosition"
								type="text"
								ref={(input) => {this.candidatePosition = input}}
								placeholder='e.g. Chairman'
							/>
						</div>
					</div>
                    <button type="submit" form="newCandidateForm" id="addCandidateButton">
                    	<span><i className="fa fa-plus"></i>   Add Candidate</span>
                    </button>
				</form>
			</div>
		</div>
	);
  }
}

export default CandidateForm;