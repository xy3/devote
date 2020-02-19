import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'


class Navbar extends Component {
  render() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark">
			<div className="container">
				<a className="navbar-brand" href="/">
				<img src={this.props.logo} alt="Devote Logo" width="200" />
				</a>
				<div className="nav-btns">
					<Link to="/user" id='user-btn'><i className="fa fa-user"></i></Link>
					<a id='menu-btn' href="#"><i className="fa fa-plus"></i></a>
				</div>
			</div>
		</nav>
	)
  }
}

export default Navbar;


