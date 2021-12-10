import React, { Component } from 'react';

class FullElection extends Component {
	render() {
    	return (
    	<div>
    		<h2>{this.props.electionName}</h2>
    		<hr />
			<table className="table text-light main-table">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Position</th>
						<th scope="col">Votes</th>
						<th scope="col">Status</th>
					</tr>
				</thead>
				<tbody>
					{this.props.candidates.map((candidate, key) => {
						if(candidate.electionId.toNumber() == this.props.match.params.id) {
							return (
								<tr key={key}>
									<td>{candidate.name}</td>
									<td>{candidate.position.toString()}</td>
									<td>{candidate.voteCount.toNumber()}</td>
									<td>{candidate.status.toString()}</td>
								</tr> 
								)
							}
						})
					}
				</tbody>
			</table>
    		<button onClick={this.props.reloadTable}><span>Refresh</span></button>
    	</div>
    );
  }
}

export default FullElection;