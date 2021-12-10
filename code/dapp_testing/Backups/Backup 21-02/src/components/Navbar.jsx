import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark">
			<div className="container">
				<a className="navbar-brand" href="/">
				<img src={this.props.logo} alt="Devote Logo" width="200" />
				</a>
				<div className="nav-btns">
					<Link to="/account" id='user-btn'><i className="fa fa-user"></i></Link>
					<Link to="/settings" id='menu-btn'><i className="fa fa-plus"></i></Link>
				</div>
			</div>
		</nav>
	)
  }
}

export default Navbar;


