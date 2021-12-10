import React, { Component, useState } from 'react'
import DatePicker from 'react-datetime'

class StartElection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loadDatePickerStart: false,
            loadDatePickerEnd: false,
            nowSelected: true,
            currentDate: new Date(),
            extraEndTime: 12,
            startDate: null,
            endDate: null
        }

        this.updateFormEnd = this.updateFormEnd.bind(this)
        this.updateFormStart = this.updateFormStart.bind(this)
        this.storeTime = this.storeTime.bind(this)
        this.storeDate = this.storeDate.bind(this)
        this.storeEndDate = this.storeEndDate.bind(this)
        this.storeEndTime = this.storeEndTime.bind(this)
        this.addElectionDates = this.addElectionDates.bind(this)
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
        var current;
        if (this.storedDate == null) {current = new Date()} else {current = new Date(this.storedDate)}

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
            this.storedTime = event._i
            this.invalidTimeInput = false;
        }
        else this.invalidTimeInput = true;
    }

    storeDate (event) {
        if (event._d != null) {
            this.storedDate = event._d
            this.invalidDateInput = false;
        }
        else this.invalidDateInput = true;
    }

    storeEndTime (event) {
        if (event._i != null) {
            this.storedEndTime = event._i
            this.invalidTimeInput = false;
        }
        else this.invalidTimeInput = true;
    }

    storeEndDate (event) {
        if (event._d != null) {
            this.storedEndDate = event._d
            this.invalidDateInput = false;
        }
        else this.invalidDateInput = true;
    }

    addElectionDates () {
        this.props.addElectionDates(this.state.startDate, this.state.endDate, this.props.electionId)
        this.props.updateElections()
    }

    render () { 
        var storedDate;
        var storedTime;
        var storedEndTime;
        var storedEndDate;
        var startConfirm;
        var endConfirm;
        var invalidDateInput = false;
        var invalidTimeInput = false;

        return (
            <div>
                <div>
                <h2>Set Election Start & End Dates</h2>	
                <hr />
                <form id="startElectionForm" className="col-md-12" onSubmit={(event) => { 
                    event.preventDefault()
                    var startHour;
                    var startMinute;

                    if (this.invalidDateInput) return console.log("The date entered is not a valid date (DD/MM/YYYY)")
                    if (this.invalidTimeInput) return console.log("The time entered is not a valid time (HH:MM)")

                    if (this.state.nowSelected) {
                        this.storedDate = new Date()
                        if (this.state.extraEndTime == "12") this.storedEndDate = new Date(this.storedDate).setHours(this.storedDate.getHours()+12)
                        if (this.state.extraEndTime == "24") this.storedEndDate = new Date(this.storedDate).setHours(this.storedDate.getHours()+24)
                        if (this.state.extraEndTime == "48") this.storedEndDate = new Date(this.storedDate).setHours(this.storedDate.getHours()+48)
                        if (this.state.extraEndTime == "72") this.storedEndDate = new Date(this.storedDate).setHours(this.storedDate.getHours()+72)
                        this.setState({
                            startDate: this.storedDate,
                            endDate: new Date(this.storedEndDate)
                        })
                        this.props.addElectionDates(this.storedDate, new Date(this.storedEndDate), this.props.electionId)
                    }

                    if (this.storedEndDate == null) {
                        this.storedEndDate = new Date(this.storedDate).setHours(this.storedDate.getHours()+12)
                        this.storedEndTime = new Date(this.storedEndDate).toString('en-GB').substring(16, 21)
                    }

                    if (this.storedTime == null) this.storedTime = new Date().toString('en-GB').substring(16, 21)
                    startHour = this.storedTime.substring(0, 2);
                    startMinute = this.storedTime.substring(3, 5);
                    this.storedDate.setHours(startHour, startMinute, 0, 0)

                    if (this.state.extraEndTime == "12") this.storedEndDate = new Date(this.storedDate).setHours(this.storedDate.getHours()+12)
                    if (this.state.extraEndTime == "24") this.storedEndDate = new Date(this.storedDate).setHours(this.storedDate.getHours()+24)
                    if (this.state.extraEndTime == "48") this.storedEndDate = new Date(this.storedDate).setHours(this.storedDate.getHours()+48)
                    if (this.state.extraEndTime == "72") this.storedEndDate = new Date(this.storedDate).setHours(this.storedDate.getHours()+72)
                     
                    if (this.state.extraEndTime == "Custom") {
                        var endHour = this.storedEndTime.substring(0, 2);
                        var endMinute = this.storedEndTime.substring(3, 5); 
                        this.storedEndDate.setHours(endHour, endMinute, 0, 0);
                    }

                    if (!this.state.nowSelected) {
                        if (this.storedEndDate >= new Date(this.storedDate).setHours(this.storedDate.getHours()+12)) {
                            startHour = this.storedTime.substring(0, 2);
                            startMinute = this.storedTime.substring(3, 5);
                            this.storedDate.setHours(startHour, startMinute, 0, 0)
                            if (this.storedDate > new Date()) {
                                this.setState({
                                    startDate: this.storedDate,
                                    endDate: new Date(this.storedEndDate)
                                })                           }
                            else console.log("The start date must be later than the current date.")
                        } else console.log("The end date must be at least 12 hours after the start date.")
                    }}}>         
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
                                    defaultValue={"Start Date    (DD/MM/YYYY)"}
                                    dateFormat="DD-MM-YYYY"
                                    timeFormat={false}
                                    onChange={this.storeEndDate}
                                />
                                <DatePicker
                                    defaultValue={"Start Time    (HH:MM 24hrs)"}
                                    timeFormat="HH:mm"
                                    dateFormat={false}
                                    onChange={this.storeEndTime}
                                />
                            </div>}
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
                        </div>
                        <div className="modal-footer">
                            <button type="button" data-dismiss="modal"><span>Cancel</span></button>
                            <button type="button" data-dismiss="modal" onClick={this.addElectionDates}><span>Confirm</span></button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default StartElection