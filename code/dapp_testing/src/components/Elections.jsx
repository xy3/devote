import React, { Component } from 'react';

class Elections extends Component {
  render() {
    return (
    	<div className="col-md-7">
    		<h2>Elections in Progress</h2>
    		<hr />
    		<table className="table text-light main-table">
    			<thead>
    				<tr>
    					<th scope="col">Election ID</th>
    					<th scope="col">Name</th>
    					<th scope="col">Candidates</th>
    					<th scope="col">Status</th>
						<th scope="col" class="viewElectionButton">View</th>
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
							<td class="viewElectionButton"><button class="viewElection">View</button></td>
						</tr>
					)
					})}

    			</tbody>
    		</table>
    		<button type="submit"><span>Refresh</span></button>
    		<button type="submit"><span>See all</span></button>
    	</div>
    );
  }
}

export default Elections;

// Election.deployed().then(function(i) {app=i;})

/*
    					{ this.props.candidates.map((candidate, key) => {
    						return (
		    					<tr key={key}>
    								<th scope="row">{candidate.id.toNumber()}</th>
    								<td>{candidate.position}</td>
    								<td>{candidate.name}</td>
    								<td>{ window.web3.utils.fromWei(candidate.voteCount.toString()) }</td>
    								<td>{candidate.status}</td>
								</tr>
    						)
    					})}
 */