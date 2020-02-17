import React, { Component } from 'react';

class ElectionForm extends Component {
  render() {
    return (
        <div className="col-md-5">
            <h2>Create Election</h2>
            <hr />
            <div className="electionform">
                <form id="newCandidateForm" onSubmit={(event) => {
                    event.preventDefault()
                    const electionName = this.electionName.value;
                    const initialCandidate = this.initialCandidate.value;
                    if (this.props.addElection(electionName, initialCandidate)) {
                        event.target.reset();
                    }
                }}>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
                        <div className="col-sm-9">
                            <input
                                id="electionName"
                                type="text"
                                ref={(input) => {this.electionName = input}}
                                placeholder="Election name"
                            />
                        </div>
                    </div>
                    {/*<div className="form-group row">
                        <label htmlFor="position" className="col-sm-3 col-form-label">Position</label>
                        <div className="col-sm-9">
                            <input 
                                id="candidatePosition"
                                type="text"
                                ref={(input) => {this.candidatePosition = input}}
                                placeholder="Position"
                            />
                        </div>
                    </div>*/}
                    <div className="form-group row">
                        <label htmlFor="inintialCandidate" className="col-sm-3 col-form-label">First Candidate</label>
                        <div className="col-sm-9">
                            <input 
                                id="initialCandidate"
                                type="text"
                                ref={(input) => {this.initialCandidate = input}}
                                placeholder="First candidate"
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9">
                            <textarea name="description" cols="30" rows="5" placeholder="Election description"></textarea>
                        </div>
                    </div>
                </form>
                <button type="submit" form="newCandidateForm"><span>Submit</span></button>
            </div>
        </div>
    );
  }
}

export default ElectionForm;