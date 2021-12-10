import React, { Component } from 'react';
import Identicon from 'identicon.js'
import userLogo from '../img/userLogo.png'

class SessionInfo extends Component {
	render() {
		var options = {
			  background: [0, 0, 0, 255],
			  foreground: [242, 10, 138, 255],
			  size: 200
		}

		var socs = [];
		this.props.yourSocs.forEach(soc => {
			socs.push(soc.name)
		})
		var socString = socs.join(', ');

		return (
			<div>
				<h2> Account Information</h2>
				<hr/>
				<div className="textbox">
					<div className="row">
						<div className="avatar">
							{ this.props.account &&
								<img 
									id="userIcon" 
									width='150' 
									height='150' 
									//src={`data:npm,${new Identicon(this.props.account, options).toString()}`}
									src={userLogo}
								/>
							}
						</div>
						<div className="userinfo">
							<p><span><i className="fa fa-user"></i> User: </span> {this.props.user.username}</p>
							<p><span><i className="fa fa-calendar-check-o"></i> Joined: </span> {new Date(this.props.joinedDate).toLocaleDateString('en-GB')}</p>
							{  this.props.yourSocs[0] != null
								? <p><span><i className="fa fa-group"></i>Societies: </span> {socString.substring(0,25)}</p>
								: <p><span><i className="fa fa-group"></i> Societies: </span> None</p>
							}
							{/*<p><span><i className="fa fa-globe"></i> Network: </span> {this.props.networkId}</p>*/}
							<p><span><i className="fa fa-hashtag"></i> Account: </span> {this.props.account.substring(0,25)}...</p>
						</div>
					</div>
				</div>
			</div>
			)
	}
}

export default SessionInfo;
