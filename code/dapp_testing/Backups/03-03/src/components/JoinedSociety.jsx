import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class JoinedSociety extends Component {
	render() {
		return (
			<div className="alert-box">
				<div className="alert-box-content">
					<div>
						<h1>Success!</h1>
						<hr/>
						<p>
							You have successfully joined <strong>{this.props.socName}</strong>.
							You can now vote in <strong>{this.props.socName}</strong> society elections, and manage your societies below.
						</p>
						<Link to='/societies'><button onClick={() => this.props.closeBox()}><span>Close</span></button></Link>
					</div>
				</div>
			</div>
		)
	}
}


export default JoinedSociety