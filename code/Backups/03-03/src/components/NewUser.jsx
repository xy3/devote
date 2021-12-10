import React, { Component } from 'react'

class NewUser extends Component {
	render() {
		return (
			<div className="new_user">
				<div className="fadeIn col-md-6 new_user_form">
					<h1 className="">Hello!</h1>
					<p>It seems you're new here. What can we call you?</p>
					
					<form 
						id="newUserForm"
						onSubmit={(event) => {
							event.preventDefault()
							const username = this.username.value
							if (this.props.addNewUser(username)) {
							    event.target.reset();
							}
						}
					}>
						<input 
							type="text"
							id="username"
							placeholder="Your name"
							ref={(input) => {this.username = input}}
						/>
						<button type="submit"><span>Submit</span></button>
					</form>
				</div>
			</div>
		)
	}
}


export default NewUser