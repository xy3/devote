import React, { Component, useState } from 'react'
import firebase from './firebase'
import autoBind from 'react-autobind'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class StartElection extends Component {
	db = firebase.firestore()
	
	constructor(props) {
		super(props)
		this.state = {
			startDate: new Date(),
			endDate: new Date(),
			invalidInput: 0,
			specificStart: false
		}
		autoBind(this)
	}

	addElectionDates () {
		const electionDates = {
			startDate: this.state.startDate,
			endDate: this.state.endDate
		}

		if (this.state.nowSelected) {
			this.db.collection('elections').doc(this.props.electionId).update({electionStatus: "Active"})
		} else {
			this.db.collection('elections').doc(this.props.electionId).update({electionStatus: "Pending Start"})
		}

		this.db.collection('elections').doc(this.props.electionId).update(electionDates)
		this.props.refreshElectionDetails()
	}

	setStart = startDate => this.setState({ startDate })
	setEnd = endDate => this.setState({ endDate })

	startChange = () => {
		if (this.startSelect.value == 'specific')
			this.setState({ specificStart: true })
		else
			this.setState({ specificStart: false })
	}

	render () { 
		return (
			<div>
				<div className="col-md-7">
				<h2>Set Election Start & End Dates</h2>	
				<hr />
				<form id="startElectionForm" onSubmit={(event) => { 
					event.preventDefault()

					}}>
					
					<div className="row">
						<div className="col-md-6 form-group">
							<label htmlFor="startElection">Start Election</label>
							<select id="startSelect" ref={(input) => this.startSelect = input} onChange={this.startChange}>
								<option value="now">Now</option>
								<option value="specific">Specific Time</option>
							</select>
							{ this.state.specificStart &&
								<DatePicker
							      selected={this.state.startDate}
							      onChange={this.setStart}
							      minDate={new Date()}
								  showTimeSelect
								  timeFormat="HH:mm"
								  timeIntervals={10}
								  timeCaption="Time"
								  dateFormat="d MM, yyyy h:mm aa"
								/>
							}
						</div>

						<div className="form-group col-md-6">
							<div className="row">
								<label id="endElection">End Election</label>
							</div>
							<div className="row">
								<DatePicker
							      selected={this.state.endDate}
							      onChange={this.setEnd}
							      minDate={new Date()}
								  showTimeSelect
								  timeFormat="HH:mm"
								  timeIntervals={10}
								  timeCaption="Time"
								  dateFormat="d MM, yyyy h:mm aa"
								/>
							</div>
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
									<h5><span>Start Date:</span></h5>
									<h5><span>Start Time:</span></h5>
								</div>
								<div className="col">
									<h5><span>End Date:</span></h5>
									<h5><span>End Time:</span></h5>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button data-dismiss="modal"><span>Cancel</span></button>
							<button data-dismiss="modal" onClick={this.addElectionDates}><span>Confirm</span></button>
						</div>
						<div className="backModal">
							<button data-dismiss="modal"><span>Back</span></button>
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