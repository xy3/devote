import React, { Component } from 'react';

class Loader extends Component {
	render() {
		return (
			<div className="spinner">
			  <div className="dot1"></div>
			  <div className="dot2"></div>
			</div>
		);
	}
}

export default Loader;