import React, { Component } from 'react';
import { Link, matchPath } from 'react-router-dom'
import logo from '../img/logo.png'


class Navbar extends Component {
  render() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark">
			<div className="container">
				<Link to="/" id='user-btn' className="navbar-brand">
					<img src={logo} alt="Devote Logo" width="200" />
				</Link>
				<div className="nav-btns">
					<Link to="/" id="account-btn">
							<i className="fa fa-home"></i>
						<div id="account_tip" className="nav_tip">
							<span>Home</span>
						</div>
					</Link>
					<Link to="/account" id="account-btn">
						<i className="fa fa-user"></i>
						<div id="account_tip" className="nav_tip">
							<span>Your Account</span>
						</div>
					</Link>
					<Link to="/societies" id="societies-btn">
						<i className="fa fa-users"></i>
						<div id="societies_tip" className="nav_tip">
							<span>Societies</span>
						</div>
					</Link>
				</div>
			</div>
		</nav>
	)
  }
}

export default Navbar;


