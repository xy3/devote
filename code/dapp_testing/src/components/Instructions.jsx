import React, { Component } from 'react';

class Instructions extends Component {
  render() {
	return (
		<div>
			<h2>Instructions</h2>
			<hr/>
			<div className="textbox">
				<ol>
					<li>Make sure Ganache is running on port 8545</li>
					<li>Have Metamask running on localhost:8545</li>
					<li>Refresh this page</li>
				</ol>
			</div>
			
		</div>
	);
  }
}

export default Instructions;
