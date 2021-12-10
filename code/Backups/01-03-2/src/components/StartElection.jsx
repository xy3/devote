import React, { Component, useState } from 'react'
import DatePicker from 'react-datetime'
import firebase from './firebase'
import autoBind from 'react-autobind';

class StartElection extends Component {
    db = firebase.firestore()
    
    constructor(props) {
        super(props)

        this.state = {
            loadDatePickerStart: false,
            loadDatePickerEnd: false,
            nowSelected: true,
            currentDate: new Date(),
            extraEndTime: 12,
            startDate: null,
            endDate: null,
            invalidInput: 2, 
            storedDate: null,
            storedTime: null,
            storedEndDate: null,
            storedEndTime: null,
        }
        autoBind(this)
    }
    
    updateFormStart (event) {
        var loadDatePickerStart = false
        if (event.target.value == "true") {
            loadDatePickerStart = true
            this.setState({nowSelected: false})
        }
        else {
            loadDatePickerStart = false
            this.setState({nowSelected: true})
        }

        this.setState({loadDatePickerStart : loadDatePickerStart})
        console.log("event", event.target.value)
    }

    updateFormEnd (event) {
        var loadDatePickerEnd = false
        if (event.target.value == "24") this.setState({extraEndTime: "24"})
        if (event.target.value == "48") this.setState({extraEndTime: "48"})
        if (event.target.value == "72") this.setState({extraEndTime: "72"})
        if (event.target.value == "true") {
            this.setState({extraEndTime: "Custom"})
            loadDatePickerEnd = true
        } else {loadDatePickerEnd = false}
        this.setState({loadDatePickerEnd : loadDatePickerEnd})
    }

    storeTime (event) {
        if (event._i != null) {
            this.setState({storedTime: event._i})
            this.setState({invalidInput: 0})
        }
        else this.setState({invalidInput: 1})
    }

    storeDate (event) {
        if (event._d != null) {
            this.setState({storedDate: event._d})
            this.setState({invalidInput: 0})
        }
        else this.setState({invalidInput: 2})
    }

    storeEndTime (event) {
        if (event._i != null) {
            this.setState({storedEndTime: event._i})
            this.setState({invalidInput: 0})
        }
        else this.setState({invalidInput: 3})
    }

    storeEndDate (event) {
        if (event._d != null) {
            this.setState({storedEndDate: event._d})
            this.setState({invalidInput: 0})
        }
        else this.setState({invalidInput: 4})
    }

    addElectionDates () {
        var election;
        var electionDates;

        electionDates = {
			startDate: new Date(this.state.startDate),
			endDate: new Date(this.state.endDate)
        }

        if (this.state.nowSelected) {
            election =  {electionStatus: "Active"}
            this.db.collection('elections').doc(this.props.electionId).set(election, {merge: true})
        } else {
            election =  {electionStatus: "Pending Start"}
            this.db.collection('elections').doc(this.props.electionId).set(election, {merge: true})
        }

        this.db.collection('elections').doc(this.props.electionId).set(electionDates, {merge: true})
        this.props.refreshElectionDetails()

    }

    render () { 
        return (
            <div>
                <div>
                <h2>Set Election Start & End Dates</h2>	
                <hr />
                <form id="startElectionForm" className="col-md-12" onSubmit={(event) => { 
                    event.preventDefault()
                    var storedDate, storedEndDate, storedTime, storedEndTime;

                    if (this.state.storedDate != null) storedDate = new Date(this.state.storedDate)
                    if (this.state.storedEndDate != null) storedEndDate = new Date(this.state.storedEndDate)
                    if (this.state.storedTime != null) storedTime = this.state.storedTime
                    if (this.state.storedEndTime != null) storedEndTime = this.state.storedEndTime

                    // Start now with preset election length
                    if (this.state.nowSelected && this.state.extraEndTime != "Custom") {
                        this.setState({invalidInput: 0})
                        var endDate;
                        if(this.state.extraEndTime == "12") endDate = new Date().setHours(new Date().getHours()+12)
                        if(this.state.extraEndTime == "24") endDate = new Date().setHours(new Date().getHours()+24)
                        if(this.state.extraEndTime == "48") endDate = new Date().setHours(new Date().getHours()+48)
                        if(this.state.extraEndTime == "72") endDate = new Date().setHours(new Date().getHours()+72)

                        if (this.props.elections[this.props.electionId-1].totalValidCandidates.toNumber() <= 1) this.setState({invalidInput: 7})
                            
                        this.setState({
                            startDate: new Date(),
                            endDate: new Date(endDate),
                        })
                    }
                    // Start with custom date and preset election length
                    if (!this.state.nowSelected && this.state.extraEndTime != "Custom" && this.state.invalidInput == 0) {
                        var startHour, startMinute, startDate, endDate;

                        startHour = storedTime.substring(0,2)
                        startMinute = storedTime.substring(3,5)
                        startDate = new Date(storedDate).setHours(startHour, startMinute, 0, 0)
                        
                        if (this.state.extraEndTime == "12") endDate = new Date(startDate).setHours(new Date(startDate).getHours()+12)
                        if (this.state.extraEndTime == "24") endDate = new Date(startDate).setHours(new Date(startDate).getHours()+24)
                        if (this.state.extraEndTime == "48") endDate = new Date(startDate).setHours(new Date(startDate).getHours()+48)
                        if (this.state.extraEndTime == "72") endDate = new Date(startDate).setHours(new Date(startDate).getHours()+72)

                        if (new Date(startDate).setHours(0,0,0,0) >= new Date(this.state.currentDate).setHours(0,0,0,0)) {
                            if (new Date(startDate) < new Date(this.state.currentDate)) this.setState({invalidInput: 8})
                        } else this.setState({invalidInput: 5})
                        if (this.props.elections[this.props.electionId-1].totalValidCandidates.toNumber() <= 1) this.setState({invalidInput: 7})

                        this.setState({startDate: startDate})
                        this.setState({endDate: endDate})       
                    }

                    // Start with custom date and custom end date
                    if (!this.state.nowSelected && this.state.extraEndTime == "Custom" && this.state.invalidInput == 0) {
                        var startHour, startMinute, startDate, endHour, endMinute, endDate;
                        
                        startHour = storedTime.substring(0,2)
                        startMinute = storedTime.substring(3,5)
                        startDate = new Date(storedDate).setHours(startHour, startMinute, 0, 0)

                        endHour = storedEndTime.substring(0,2)
                        endMinute = storedEndTime.substring(3,5)
                        endDate = new Date(storedEndDate).setHours(endHour, endMinute, 0, 0)

                        if (new Date(startDate).setHours(0,0,0,0) >= new Date(this.state.currentDate).setHours(0,0,0,0)) {
                            if (new Date(startDate) < new Date(this.state.currentDate)) this.setState({invalidInput: 8})
                        } else this.setState({invalidInput: 5})
                        
                        if (new Date(endDate) < new Date(startDate).setHours(new Date(startDate).getHours()+12)) this.setState({invalidInput: 6})
                        if (this.props.elections[this.props.electionId-1].totalValidCandidates.toNumber() <= 1) this.setState({invalidInput: 7})
                        
                        
                        this.setState({startDate: startDate})
                        this.setState({endDate: endDate}) 
                    }

                    // Start now with custom end date
                    if (this.state.nowSelected && this.state.extraEndTime == "Custom" && this.state.invalidInput == 0) {
                        var startDate, endHour, endMinute, endDate;
                        startDate = new Date()
                        endHour = storedEndTime.substring(0,2)
                        endMinute = storedEndTime.substring(3,5)
                        endDate = new Date(storedEndDate).setHours(endHour, endMinute, 0, 0)

                        if (new Date(endDate) < new Date(startDate).setHours(new Date(startDate).getHours()+12)) this.setState({invalidInput: 6})
                        if (this.props.elections[this.props.electionId-1].totalValidCandidates.toNumber() <= 1) this.setState({invalidInput: 7})
                        console.log("endHour", endHour)
                        console.log("endMinute",endMinute)
                        console.log("endDate",endDate)
                        this.setState({startDate: startDate})
                        this.setState({endDate: endDate}) 
                    }           
                    }}>         
                    <div className="row">
                        <div className="col-md-6">
                            <label id="startElection">Start Election</label>
                            <select ref={(input) => this.candidateId = input} onChange={this.updateFormStart}>              
                                <option value="false">Now</option>
                                <option value="true">Specific Time</option>
                            </select>
                            {this.state.loadDatePickerStart &&
                            <div className="datePicker">
                                <DatePicker
                                    defaultValue={"Start Date    (DD/MM/YYYY)"}
                                    dateFormat="DD-MM-YYYY"
                                    timeFormat={false}
                                    onChange={this.storeDate}
                                    locale="en"
                                />
                                <DatePicker
                                    defaultValue={"Start Time    (HH:MM 24hrs)"}
                                    timeFormat="HH:mm"
                                    dateFormat={false}
                                    onChange={this.storeTime}
                                    locale="en"
                                />
                            </div>}
                        </div>

                        <div className="col-md-6">
                            <label id="endElection">End Election</label>
                            <select ref={(input) => this.candidateId = input} onChange={this.updateFormEnd}>  
                                <option value="12">12 hrs</option>            
                                <option value="24">24 hrs</option>
                                <option value="48">48 hrs</option>
                                <option value="72">72 hrs</option>
                                <option value="true">Specific Date</option>
                            </select>
                            {this.state.loadDatePickerEnd &&
                            <div className="datePicker">
                                <DatePicker
                                    defaultValue={"End Date    (DD/MM/YYYY)"}
                                    dateFormat="DD-MM-YYYY"
                                    timeFormat={false}
                                    onChange={this.storeEndDate}
                                />
                                <DatePicker
                                    defaultValue={"End Time    (HH:MM 24hrs)"}
                                    timeFormat="HH:mm"
                                    dateFormat={false}
                                    onChange={this.storeEndTime}
                                />
                            </div>
                            }
                        </div>
                    </div>
                    <button type="submit" form="startElectionForm" id="submitStartEndDates" data-toggle="modal" data-target="#staticBackdrop"><span>Set Election Dates</span></button>
                </form>
            </div>
                
            {/* confirm notification */}
            <div className="dateConfirmation">
                <div className="modal fade" id="staticBackdrop" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Election Date Confirmation</h5>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <h5><span id="darkened">Start Date:</span>   {new Date(this.state.startDate).toDateString('en-GB')}</h5>
                                    <h5><span id="darkened">Start Time:</span>   {new Date(this.state.startDate).toLocaleString('en-GB').substring(12, 17)}</h5>
                                </div>
                                <div className="col">
                                    <h5><span id="darkened">End Date:</span>   {new Date(this.state.endDate).toDateString('en-GB')}</h5>
                                    <h5><span id="darkened">End Time:</span>   {new Date(this.state.endDate).toLocaleString('en-GB').substring(12, 17)}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="dateErrors">
                                    { this.state.invalidInput == 1 && !this.state.nowSelected &&
                                    <h5><i className="fa fa-exclamation-circle"></i>   Start time invalid, use format HH:MM 24hrs.</h5> }
                                    { this.state.invalidInput == 2 && !this.state.nowSelected &&
                                    <h5><i className="fa fa-exclamation-circle"></i>   Start date invalid, use format DD-MM-YYYY.</h5> }
                                    { this.state.invalidInput == 3 && this.state.extraEndTime == "Custom" &&
                                    <h5><i className="fa fa-exclamation-circle"></i>   End time invalid, use format HH:MM 24hrs.</h5> }
                                    { this.state.invalidInput == 4 && this.state.extraEndTime == "Custom" &&
                                    <h5><i className="fa fa-exclamation-circle"></i>   End date invalid, use format DD-MM-YYYY.</h5> }
                                    { this.state.invalidInput == 5 && !this.state.nowSelected &&
                                    <h5><i className="fa fa-exclamation-circle"></i>   The start date must be later than the current date.</h5> }
                                    { this.state.invalidInput == 6 && this.state.extraEndTime == "Custom" &&
                                    <h5><i className="fa fa-exclamation-circle"></i>   The end date/time must be at least 12 hours after the start date.</h5> }
                                    { this.state.invalidInput == 7 &&
                                    <h5><i className="fa fa-exclamation-circle"></i>   There must be atleast <span id="bold">two</span> candidates before the election can be started.</h5> }
                                    { this.state.invalidInput == 8 &&
                                    <h5><i className="fa fa-exclamation-circle"></i>   The start time must be later than the current time.</h5> }
                                </div>
                            </div>
                        </div>
                        { this.state.invalidInput == 0 
                            ? <div className="modal-footer">
                                <button type="button" data-dismiss="modal"><span>Cancel</span></button>
                                <button type="button" data-dismiss="modal" onClick={this.addElectionDates}><span>Confirm</span></button>
                            </div>
                            : <div className="backModal">
                                <button type="button" data-dismiss="modal" ><span>Back</span></button>
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default StartElection