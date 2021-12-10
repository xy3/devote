import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Elections extends Component {
	
	openElection = (election) => {
		this.props.changeElection(election.electionId.toNumber())
		this.props.renderCandidates()

	}

	reloadTable = () => {
		this.props.renderElection()
	}
	
	render() {
    	return (
    	<div className="col-md-7">
    		<h2>Elections in Progress</h2>
    		<hr />
    		<table className="table text-light main-table">
    			<thead>
    				<tr>
    					<th scope="col">#</th>
    					<th scope="col">Name</th>
    					<th scope="col">Candidates</th>
    					<th scope="col">Status</th>
						<th scope="col" className="viewElectionButton">View</th>
    				</tr>
    			</thead>
    			<tbody>
					{this.props.elections.map((election, key) => {
					return (
						<tr key={key}>
							<td>{election.electionId.toNumber()}</td>
							<td>{election.name}</td>
							<td>{election.totalCandidates.toNumber()}</td>
							<td>{election.electionStatus.toString()}</td>
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
    		{/*<button type="submit"><span>See all</span></button>*/}
    	</div>
    );
  }
}

export default Elections;