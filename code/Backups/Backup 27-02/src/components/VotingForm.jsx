import React, { Component } from 'react';
import firebase from './firebase'
import Loader from './Loader'

class VotingForm extends Component {

	db = firebase.firestore()

	constructor(props) {
		super(props)
		this.state = {
			votedFor: null,
			hasVoted: null,
		}
	}

	async componentWillMount() {
		const electionsRef = this.db.collection('users').doc(this.props.account)
		await electionsRef.get().then(doc => {
			///hererererere
			if (doc.data().voted != null && doc.data().voted[this.props.electionId] != null) this.setState({ votedFor: doc.data().voted[this.props.electionId].toString() })
			if (doc.data().hasVoted != null && doc.data().hasVoted[this.props.electionId] != null) this.setState({ hasVoted: doc.data().hasVoted[this.props.electionId]} )
		})
	}

	render() {
		const { candidates, electionId, addVote } = this.props
		var closed;

		if (this.props.electionClosed[this.props.electionId] != null) closed = this.props.electionClosed[this.props.electionId]
		else closed = true;

		return (
			<div className="">	
				{ !this.state.loadingVotedFor
				? <div className="votingForm">
					<form id="votingForm" onSubmit={async (event) => {
						event.preventDefault()
						console.log(this.candidateId.value)
						console.log(this.props.candidates)
						console.log(this.props.candidates[this.candidateId.value-1].name)
						await addVote(this.candidateId.value, electionId)
						this.setState({votedFor: this.props.candidates[this.candidateId.value-1].name})
						}}>

						{ this.state.hasVoted || this.props.hasVoted || closed
						? <div>
							{ this.state.hasVoted &&
								<div id="votedFor">Your voted for <span id="votedColor">{this.state.votedFor}</span></div>}
							</div>
						: <div> 
							<div className="row" id="votingFormInput">
								<label htmlFor="name" className="col-sm-3 col-form-label">Candidate name</label>
								<div className="col-sm-9">
									<select ref={(input) => this.candidateId = input}>
										{candidates.map((candidate, key) => {
											if (candidate.electionId == electionId) return <option key={key} value={candidate.id}>{candidate.name}</option>
										})}	
									</select>
								</div>
							</div>
							<button type="submit" id="submitVote" form="votingForm"><span>Vote</span></button>
							<button type="submit" form="startElectionForm" id="submitStartEndDates" data-toggle="modal" data-target="#staticBackdrop"><span>Set Election Dates</span></button>
						</div>}
					</form>		        
				</div>
				:<Loader />}
				<br/>

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
		)}
	}

export default VotingForm;