import React, { Component } from 'react';

class EditElection extends Component {
    render() {
        return (
            <div className="col-md-20">
                <h2>Edit Election Details</h2>
                <hr />
                <div className="editElectionForm">
                    <form className="form-inline" id="editElectionForm" onSubmit={(event) => {
                        event.preventDefault()
                        const electionName = this.electionName.value;
                        if (this.props.editElectionName(electionName.toString(), this.props.electionId)) {
                            event.target.reset();
                        }
                        }}>
                        <div className="form-group col-sm-2">
                            <label htmlFor="electionName" className="col-sm-13 col-form-label">Change Name</label>
                        </div>
                        <div className="form-group col-sm-8">
                            <div className="col-sm-12">
                                <input 
                                    id="electionName"
                                    type="text"
                                    ref={(input) => {this.electionName = input}}
                                    placeholder="New election name"
                                />
                            </div>
                        </div>
                        <button type="submit" form="editElectionForm"><span>Change</span></button>
                    </form>
                </div>
                <form className="form-inline" id="deleteCandidateForm" onSubmit={(event) => {
                    event.preventDefault()
                        this.props.deleteCandidate(this.candidateId.value)
                    }}>
                    <div className="form-group col-sm-2">
                        <label htmlFor="name" className="col-sm-13 col-form-label">Delete Candidate</label>
                    </div>
                    <div className="form-group col-sm-8">
                        <div className="col-sm-12">
                            <select ref={(input) => this.candidateId = input}>
                                {this.props.candidates.map((candidate, key) => {
                                    if(candidate.electionId.toNumber() == this.props.displayedElection) {
                                        return <option key={key} value={candidate.id}>{candidate.name}</option>
                                    }
                                })}
                            </select>
                        </div>
                    </div>
                    <button type="submit" form="deleteCandidateForm"><span>Delete</span></button>
                </form>

            </div>
        );
    }
}

export default EditElection;