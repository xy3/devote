import React, { Component } from 'react';

class Instructions extends Component {
  render() {
	return (
		<div className="col-md-5">
			<h2>Voting Instructions</h2>
			<hr />
			<div className="textbox">
				<ul>
					<li>Make sure Ganache is running on port 8545</li>
					<li>Have Metamask running on localhost:8545</li>
					<li>Refresh this page</li>
				</ul>
			</div>
		</div>
	);
  }
}

export default Instructions;
