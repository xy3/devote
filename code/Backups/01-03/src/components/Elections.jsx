import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import firebase from './firebase'
import Loader from './Loader'

class Elections extends Component {

	constructor(props) {
		super(props)
		this.state = {
			electionStatus: {},
			loadingElectionStatus: true
		}
	}

	async componentDidMount() {
		this.setState({loadingElectionStatus: true})
		var electionStatus = {}
		for (var i = 1; i <= this.props.electionCount; i++) {
			const electionsRef = this.db.collection('elections').doc(i.toString())
			await electionsRef.get().then(results => {
				if(results.data() != null) {
					electionStatus = {...electionStatus, [results.data().electionId]: results.data().electionStatus.toString()}
				}
			})
		}
		this.setState({electionStatus: electionStatus})
		this.setState({loadingElectionStatus: false})
	}

	db = firebase.firestore()
	
	openElection = (election) => {
		this.props.changeElection(election.electionId.toNumber())
		this.props.renderCandidates()

	}

	reloadTable = () => {
		this.props.renderElections()
	}

	render() {
		//console.log(this.state.electionStatus)
    	return (
    	<div className="col-md-7">
			{ !this.state.loadingElectionStatus && !this.props.loadingElections
    		? <div>
				<h2>Elections in Progress</h2>
    			<hr />
				<table className="table text-light main-table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Candidates</th>
							<th scope="col">Status</th>
							<th scope="col">View</th>
						</tr>
					</thead>
					<tbody>
						{this.props.elections.map((election, key) => {
						return (
							<tr key={key}>
								<td>{election.electionId.toNumber()}</td>
								<td>{election.name}</td>
								<td>{election.totalCandidates.toNumber()}</td>
								<td>{this.state.electionStatus[election.electionId]}</td>
								<td className="viewElectionButton">
									<Link to={`/elections/${election.electionId}`}>
										<button className="viewElection">View</button>
									</Link>
								</td>
							</tr>
						)
						})}
					</tbody>	
				</table> 
				<button type="submit" onClick={this.reloadTable}><span>Refresh</span></button>
			</div>
			: <Loader /> }
    		{/*<button type="submit"><span>See all</span></button>*/}
    	</div>
    );
  }
}

export default Elections;