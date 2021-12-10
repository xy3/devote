import React, { Component } from 'react';
import firebase from './firebase'
import Loader from './Loader'

class VotingForm extends Component {

	db = firebase.firestore()

	constructor(props) {
		super(props)
		this.state = {
			votedFor: null,
		}
	}

	async componentWillMount() {
		const electionsRef = this.db.collection('users').doc(this.props.account)
		await electionsRef.get().then(doc => {
			if (doc.data().votedFor != null && doc.data().votedFor[this.props.electionId] != null) this.setState({ votedFor: doc.data().votedFor[this.props.electionId].toString()})
		})
	}

	render() {
		const { candidates, electionId, addVote } = this.props
		var closed;
		var hasVoted;
		if (this.props.hasVoted[this.props.account] != null && this.props.hasVoted[this.props.account][this.props.electionId] != null) hasVoted = this.props.hasVoted[this.props.account][this.props.electionId]
		else hasVoted = false;
		console.log(hasVoted)
		
		return (
			<div className="">	
				<div className="votingForm">
					<form id="votingForm" onSubmit={async (event) => {
						event.preventDefault()
						await this.props.addVote(this.candidateId.value, this.props.electionId)
						this.setState({votedFor: this.props.candidates[this.candidateId.value-1].name})
					}}>
					{ this.props.electionStatus == "Active" && hasVoted == false &&
						<div> 
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
							<button type="submit" form="votingForm" id="submitVote"><span>Vote</span></button>
						</div> }
					{ hasVoted == true &&
						<div id="votedFor">Your voted for <span id="votedColor">{this.state.votedFor}</span></div>  }
					</form>		        
				</div>
				<br/>
			</div>
		)}
	}

export default VotingForm;