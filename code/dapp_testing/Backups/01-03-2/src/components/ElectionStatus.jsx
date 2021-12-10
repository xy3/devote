import React, { Component } from 'react'
import firebase from './firebase'

class ElectionStatus extends Component {
    db = firebase.firestore()

    constructor (props) {
        super(props)
        this.state = {
            electionStatus: ""
        }
    }
    
    render () {
        var startDate;
        var startTime;
        var endDate;
        var endTime;

        if (this.props.electionStartDate != null) {
            startDate = new Date(this.props.electionStartDate).toDateString()
            startTime = new Date(this.props.electionStartDate).toString().substring(16, 21)
        }
        
        if (this.props.electionEndDate != null){
            endDate = new Date(this.props.electionEndDate).toDateString()
            endTime = new Date(this.props.electionEndDate).toString().substring(16, 21)
        }

        return (
            <div className="electionStatusBG">
                <div className="electionStatus">
                    { this.props.electionStatus == "Awaiting Start" &&
                        <div>
                            <label id="electionStatusTitle">Election:    <span id="awaiting">{this.props.electionStatus}</span></label>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-group list-group-flush" id="electionStatus">
                                        {/*<li className="list-group-item">Election Status: <span id="active">{status}</span></li>*/}
                                        
                                        <li className="list-group-item"><span id="lightText">Start date: </span>Not Specified</li>
                                        <li className="list-group-item"><span id="lightText">Start time: </span>Not Specified</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="list-group list-group-flush" id="electionStatus">
                                        <li className="list-group-item"><span id="lightText">End date: </span>Not Specified</li>
                                        <li className="list-group-item"><span id="lightText">End time: </span>Not Specified</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    }
                    { this.props.electionStatus == "Pending Start" &&
                        <div>
                            <label id="electionStatusTitle">Election:    <span id="pending">{this.props.electionStatus}</span></label>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-group list-group-flush" id="electionStatus">
                                        
                                        <li className="list-group-item"><span id="lightText">Start date:</span>    {startDate}</li>
                                        <li className="list-group-item"><span id="lightText">Start time:</span>    {startTime}</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="list-group list-group-flush" id="electionStatus">
                                        <li className="list-group-item"><span id="lightText">End date:</span>    {endDate}</li>
                                        <li className="list-group-item"><span id="lightText">End time:</span>    {endTime}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    }

                    { this.props.electionStatus == "Active" &&
                        <div>
                            <label id="electionStatusTitle2">Election:    <span id="active">{this.props.electionStatus}</span></label>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-group list-group-flush" id="electionStatus">
                                        
                                        <li className="list-group-item"><span id="lightText">Start date:</span>    {startDate}</li>
                                        <li className="list-group-item"><span id="lightText">Start time:</span>    {startTime}</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="list-group list-group-flush" id="electionStatus">
                                        <li className="list-group-item"><span id="lightText">End date:</span>    {endDate}</li>
                                        <li className="list-group-item"><span id="lightText">End time:</span>    {endTime}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    }

                    { this.props.electionStatus == "Closed" &&
                        <div>
                            <label id="electionStatusTitle3">Election:    <span id="inactive">{this.props.electionStatus}</span></label>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-group list-group-flush" id="electionStatus">
                                        
                                        <li className="list-group-item"><span id="lightText">Start date:</span>    {startDate}</li>
                                        <li className="list-group-item"><span id="lightText">Start time:</span>    {startTime}</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="list-group list-group-flush" id="electionStatus">
                                        <li className="list-group-item"><span id="lightText">End date:</span>    {endDate}</li>
                                        <li className="list-group-item"><span id="lightText">End time:</span>    {endTime}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    }
                    <div>
                    </div> 
                </div>
            </div>
        )
    }
}

/*
                        <div>
                            <label id="electionStatusTitle">Election:    <span id="pending">{this.state.electionStatus}</span></label>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-group list-group-flush" id="electionStatus">
                                        
                                        <li className="list-group-item"><span id="lightText">Start date:</span>    {startDate}</li>
                                        <li className="list-group-item"><span id="lightText">Start time:</span>    {startTime}</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="list-group list-group-flush" id="electionStatus">
                                        <li className="list-group-item"><span id="lightText">End date:</span>    {endDate}</li>
                                        <li className="list-group-item"><span id="lightText">End time:</span>    {endTime}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
*/

export default ElectionStatus