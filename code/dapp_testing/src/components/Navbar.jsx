import React, { Component } from 'react';

class Navbar extends Component {
  render() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark">
			<div className="container">
				<a className="navbar-brand" href="/">
					<img src={this.props.logo} alt="Devote Logo" width="200" />
				</a>
				<div className="nav-btns">
					<a id='add-btn' href="#"><i className="fa fa-bars"></i></a>
					<a id='menu-btn' href="#"><i className="fa fa-plus"></i></a>
				</div>
			</div>
		</nav>
	);
  }
}

export default Navbar;


