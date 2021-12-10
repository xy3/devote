import React, { Component } from 'react';
import firebase from './firebase'
import Loader from './Loader'


class VotingForm extends Component {
	db = firebase.firestore()

	constructor(props) {
		super(props)
		this.state = {
			votedFor: null,
			winner: ''
		}
	}

	async componentWillMount() {
		const userRef = this.db.collection('users').doc(this.props.account)
		await userRef.get().then(doc => {
			if (doc.data().votedFor != null && doc.data().votedFor[this.props.electionId] != null) this.setState({ votedFor: doc.data().votedFor[this.props.electionId].toString()})
		})

		const electionsRef = this.db.collection('elections').doc(this.props.electionId.toString())
		await electionsRef.get().then(doc => {
			this.setState({winner: doc.data().winner})
		})
	}

	render() {
		const { candidates, electionId, addVote } = this.props
		var closed;
		var hasVoted;
		if (this.props.hasVoted[this.props.account] != null && this.props.hasVoted[this.props.account][this.props.electionId] != null) hasVoted = this.props.hasVoted[this.props.account][this.props.electionId]
		else hasVoted = false;

		var win;
		if (this.props.winners != null) win = this.props.winners
		
		return (
			<div className="">	
				<div className="votingForm">
					<form id="votingForm" onSubmit={(event) => {
						event.preventDefault()
						this.props.addVote(this.candidateId.value, this.props.electionId)
						this.setState({votedFor: this.props.candidates[this.candidateId.value-1].name})
					}}>
					{ this.props.electionStatus == "Active" && hasVoted == false &&
						<div> 
							<div className="row" id="votingFormInput">
								<label htmlFor="name" className="col-sm-3 col-form-label">Candidate name</label>
								<div className="col-sm-9">
									<select id="deleteSelect" ref={(input) => this.candidateId = input}>
										<option disabled selected>Select a Candidate</option>
										{candidates.map((candidate, key) => {
											if (candidate.electionId == electionId) return <option key={key} value={candidate.id}>{candidate.name}</option>
										})}	
									</select>
								</div>
							</div>
							<button type="submit" form="votingForm" className="full-width"><span>Vote</span></button>
						</div>
					}
					{ this.props.electionStatus == "Closed" &&
						<div id="electionWinner">Election Winner:    <span id="activeWinner"><i className="fa fa-trophy"></i>{win}</span></div> 
					}
					{ hasVoted == true &&
						<div id="electionVoted">You voted for: <span id="awaitingVote"><i className="fa fa-check-square"></i>{this.state.votedFor}</span></div> 
					}
				
					</form>		        
				</div>
				<br/>
			</div>
		)}
	}

export default VotingForm;