import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../img/logo.png'


class Navbar extends Component {
  render() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark">
			<div className="container">
				<a className="navbar-brand" href="/">
				<img src={logo} alt="Devote Logo" width="200" />
				</a>
				<div className="nav-btns">
					<Link to="/account" id='user-btn'>
						<i className="fa fa-user"></i>
						<div id="account_tip" className="nav_tip">
							<span>Your Account</span>
						</div>
					</Link>
					<Link to="/settings" id='menu-btn'>
						<i className="fa fa-cog"></i>
						<div id="settings_tip" className="nav_tip">
							<span>Settings</span>
						</div>
					</Link>
				</div>
			</div>
		</nav>
	)
  }
}

export default Navbar;


