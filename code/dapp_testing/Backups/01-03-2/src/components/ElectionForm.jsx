import React, { Component } from 'react';

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
                        if (this.props.addElection(electionName)) {
                            event.target.reset();
                        }
                    }}>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-1 col-form-label" id="electionLabel">Name</label>
                            <div className="col-sm-10">
                                <input
                                    id="electionName"
                                    type="text"
                                    ref={(input) => {this.electionName = input}}
                                    placeholder="Election name"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="society" className="col-sm-1 col-form-label" id="electionLabel">    Society</label>
                            <div className="col-sm-9">
                                <select ref={(input) => this.Society = input}>
                                    <option>None</option>
                                    { this.props.yourSocs.map((soc, key) => {
                                            return <option key={key} value={soc.id}>{soc.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="societyInfo">
                                <i className="fa fa-question-circle-o"></i>
                                <span className="tooltiptext">
                                    You can set the voting permissions of this election
                                    to only allow members of a society to vote. To create a society, click
                                    the society tab on the navigation bar.
                                </span>
                            </div> 
                        </div>
                        <button type="submit" form="newElectionForm" id="createElectionButton"><span><i className="fa fa-plus"></i>   Create</span></button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ElectionForm;