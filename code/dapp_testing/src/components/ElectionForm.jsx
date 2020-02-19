import React, { Component } from 'react';

class ElectionForm extends Component {
  render() {
    return (
        <div className="col-md-5">
            <h2>Create an Election</h2>
            <hr />
            <div className="electionform">
                <form id="newCandidateForm" onSubmit={(event) => {
                    event.preventDefault()
                    const electionName = this.electionName.value;
                    if (this.props.addElection(electionName)) {
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
                    <div className="form-group row">
                        <label htmlFor="society" className="col-sm-3 col-form-label">Society</label>
                        <div className="col-sm-9">
                            <input 
                                id="electionSociety"
                                type="text"
                                ref={(input) => {this.Society = input}}
                                placeholder="Election Society"
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