import React, { Component } from 'react';

import Loader from '../components/Loader'
import SessionInfo from '../components/SessionInfo'



class Notfound extends Component {
	render() {
		return (
			<div>
				<section className="section">
					<div className="container main-body">
						<div className="row">
							<SessionInfo 
							/>
						</div>
					</div>
				</section>
				<footer>
					<p>Made by Morgan & Palmer</p>
				</footer>
			</div>
		);
	}
}

export default Notfound;