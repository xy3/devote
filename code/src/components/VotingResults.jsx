import React, { Component } from 'react';

class Instructions extends Component {
  render() {
	return (
		<div className="col-md-7">
			<h2>Voting Results</h2>
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
					<tr>
						<th scope="row">1</th>
						<td>Treasurer</td>
						<td>Joe Bloggs</td>
						<td>11</td>
						<td>Elected</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Chair</td>
						<td>Joe Bloggs</td>
						<td>11</td>
						<td>Not Elected</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>Designer</td>
						<td>Joe Bloggs</td>
						<td>11</td>
						<td>Not Elected</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
  }
}

export default Instructions;
