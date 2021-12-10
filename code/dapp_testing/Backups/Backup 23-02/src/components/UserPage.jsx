import React, { Component } from 'react'
import firebase from './firebase'

import SessionInfo from './SessionInfo'
import Navbar from './Navbar'
import YourElections from './YourElections'
import Loader from './Loader'
import ElectionForm from './ElectionForm'

class UserPage extends Component {
	_isMounted = false
	
	async componentWillMount() {
		const account = await this.fetchAccount()
	}
	
	componentDidMount() {
		this._isMounted = true
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	async fetchAccount() {
		const web3 = window.web3
		const accounts = await web3.eth.getAccounts()
		if (this._isMounted) { 
			this.setState({ account: accounts[0] })
			return this.getUserInfo()
		}
		return false
	}
	
	async getUserInfo() {
		this.setState({loadingUserInfo: true})
		
		if (this._isMounted) { 
			const db = firebase.firestore()

			const user = await db.collection('users').doc(this.state.account).get()
			
			if (user.exists) {
				this.setState({username: user.data().username})
			}
			// else, ask them for a name
		}
		
		this.setState({loadingUserInfo: false})
	}


	constructor(props) {
		super(props)
		this.state = {
			account: '',
			username: '',
			loadingUserInfo: true,
			pageLoading: true
		}
	}

	render() {
		const page_loaded = this.state.loadingUserInfo ? '' : 'hide'
		
		return (
			<div>
				<Navbar />
				<section className="section">
						<div id="pageloader" className={page_loaded}>
							<Loader/>
						</div>
					<div className="container main-body">
						<div className="row">
						{ this.state.loadingUserInfo
							? <Loader />
							: <SessionInfo
								username={this.state.username}
								account={this.state.account} 
								networkID={this.props.network}
							/>
						}
						</div>
						<div className="row">
							<div className="col-md-12">
								<h2>Account Elections</h2>
								<hr />
								<div className="yourElections">
								{ this.props.loadingYourElections
									? <Loader />
									: <YourElections
										elections={this.props.elections}
										getYourElections={this.props.getYourElections} 
										permissions={this.props.permissions}
										account={this.props.account}
									/>
								}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<ElectionForm 
									addElection={this.props.addElection} 
								/>
							</div>
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

export default UserPage;