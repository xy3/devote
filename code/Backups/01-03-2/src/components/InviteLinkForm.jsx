import React, { Component } from 'react';

class InviteLinkForm extends Component {
	render() {
		return (
			<div>
				<h2>Create an Invite Link</h2>
				<hr />
				
				<div>
					
					<form id="newInviteLink" onSubmit={(e) => {
						e.preventDefault()
						const societyName = this.societyName.value;
						const adminEmail = this.adminEmail.value;
						
						if (this.props.addNewSociety(societyName, adminEmail)) {
							e.target.reset();
						}
					
					}}>

						<p className="message">You can quickly copy a non-expiry invite by clicking on the chain icon for your society above.</p>
						
						<div className="form-group row">
							<label htmlFor="name" className="col-sm-3 col-form-label">Society</label>
							
							<div className="col-sm-9">
								<select ref={(input) => this.societyId = input}>
									{ this.props.yourSocs.map((soc, key) => {
											return <option key={key} value={soc.id}>{soc.name}</option>
										})
									}
								</select>
							</div>
						
						</div>
						<div className="row">
							<label htmlFor="society" className="col-sm-3 col-form-label">Expires</label>
							<div className="col-sm-9">
								<select ref={(input) => this.expiry = input}>
									<option value="never">Never</option>
									<option value="1h">1 Hour</option>
									<option value="1d">1 Day</option>
									<option value="1w">1 Week</option>
								</select>
							</div>
						</div>
					</form>
					<button type="submit" form="newSocietyForm">
						<span><i className="fa fa-plus"></i> Create</span>
					</button>
				</div>
			</div>
		);
	}
}

export default InviteLinkForm;