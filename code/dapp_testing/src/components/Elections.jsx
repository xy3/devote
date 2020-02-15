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
    					<th scope="col">#</th>
    					<th scope="col">Position</th>
    					<th scope="col">Candidate</th>
    					<th scope="col">Votes</th>
    					<th scope="col">Status</th>
    				</tr>
    			</thead>
    			<tbody>
    					{ this.props.candidates.map((candidate, key) => {
    						return (
		    					<tr key={key}>
    								<th scope="row">{key}</th>
    								<td>{candidate.position}</td>
    								<td>{candidate.name}</td>
    								<td>{ window.web3.utils.fromWei(candidate.voteCount.toString()) }</td>
    								<td>{candidate.status}</td>
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