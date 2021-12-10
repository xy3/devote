import React, { Component } from 'react';

class SessionInfo extends Component {
	render() {
		return (
			<div className="col">
				<h1>Welcome back {this.props.username}</h1>
				<hr/>
				<p>
					<strong>Connected on network:</strong> {this.props.networkID}
					<br />
					<strong>Your account:</strong> {this.props.account}
				</p>
			</div>
		);
	}
}

export default SessionInfo;
