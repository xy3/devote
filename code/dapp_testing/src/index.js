import React from 'react';
import ReactDOM from 'react-dom';
import './scss/style.scss';


import App from './components/App.jsx';
import UserPage from './pages/UserPage.jsx';
import Navbar from './components/Navbar.jsx';
import Notfound from './pages/Notfound.jsx';

import logo from './img/logo.png'

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'


import * as serviceWorker from './serviceWorker';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
serviceWorker.register();



const routing = (
	<Router>
		<Navbar logo={logo} />
		<Switch>
			<Route exact path="/" component={App} />
			<Route path="/user" component={UserPage} />
			<Route component={Notfound} />
		</Switch>
	</Router>
)


// ReactDOM.render(<App />, document.getElementById('root'));)
ReactDOM.render(routing, document.getElementById('root'))
