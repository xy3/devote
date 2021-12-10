import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ElectionForm extends Component {
    render() {
        return (
            <div>
                <h2>Create an Election</h2>
                <hr />
                <div className="electionform">
                    <form id="newElectionForm" onSubmit={(event) => {
                        event.preventDefault()
                        const electionName = this.electionName.value;
                        this.props.addElection(electionName);
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