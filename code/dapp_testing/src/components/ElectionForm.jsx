import React, { Component } from 'react';

class ElectionForm extends Component {
  render() {
    const { addElection } = this.props

    return (
        <div className="col-md-20">
            <h2>Create an Election</h2>
            <hr />
            <div className="electionform">
                <form id="newElectionForm" onSubmit={(event) => {
                    event.preventDefault()
                    const electionName = this.electionName.value;
                    if (addElection(electionName)) {
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
                    <div className="row">
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
                </form>
                <button type="submit" form="newElectionForm"><span>Submit</span></button>
            </div>
        </div>
    );
  }
}

export default ElectionForm;