import React, { Component, useState } from 'react'
import DatePicker from 'react-datetime'

class EndElection extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loadDatePicker: false
        }

        this.updateForm = this.updateForm.bind(this)
    }
    
    updateForm (event) {
        var loadDatePicker = false
        if (event.target.value == "true") {loadDatePicker = true} else {loadDatePicker = false}
        this.setState({loadDatePicker : loadDatePicker})
    }

    render () {      
        return (
            <div>
                <form id="endElectionForm" onSubmit={(event) => {
                    /*const candidateName = this.candidateName.value
                    const candidatePosition = this.candidatePosition.value
                    if (this.props.addCandidate(candidateName, candidatePosition, this.props.displayedElection)) {
                        event.target.reset()
                    }*/
                    }}>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <select ref={(input) => this.candidateId = input} onChange={this.updateForm}>
                                {/*this.props.candidates.map((candidate, key) => {
                                    if(candidate.electionId.toNumber() == this.props.displayedElection) {
                                        return <option key={key} value={candidate.id}>{candidate.name}</option>
                                    }
                                })*/}
                                <option value="false">Now</option>
                                <option value="true">Specific Time</option>
                            </select>
                        </div>
                    </div>
                    {this.state.loadDatePicker && 
                        <div className="datePicker">
                            <DatePicker
                                defaultValue={Date.now()}
                                dateFormat="DD-MM-YYYY"
                                timeFormat={false}
                            />
                            <DatePicker
                                defaultValue={Date.now()}
                                timeFormat="HH:mm"
                                dateFormat={false}
                            />
                        </div>
                    }
                    <button type="submit" form="endElectionForm" id="submitCandidateForm"><span>End Election</span></button>
                </form>
            </div>
        )
    }
}

export default EndElection