import React, { Component } from 'react';

class SessionInfo extends Component {
  render() {
    return (
    	<div className="col">
    		<h1>{this.props.society}</h1>
			<p>
				<strong>Connected on network:</strong> {this.props.network}
				<br />
				<strong>Your account:</strong> {this.props.account}
			</p>
    	</div>
    );
  }
}

export default SessionInfo;
