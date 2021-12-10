import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard'

class SocsYouManage extends Component {

	render() {
		return (
			<div>
				<h2>Societies You Manage</h2>
				<hr/>

				{ this.props.yourSocs.map((soc, key) => {
				
				const inviteLink = this.props.getInviteLink(soc.id)

				return (
					<div className="society" key={key}>
						<div>
							<span className="socName">{soc.name}</span>
							
							<CopyToClipboard text={inviteLink}
								onCopy={() => this.props.linkCopied(inviteLink)}>
								
								<span className="socInvite">
									<i className="fa fa-link"> </i>
								</span>
							</CopyToClipboard>
							
							<span className="socRemove" onClick={() => this.props.removeSoc(soc.id)}>
								<i className="fa fa-times"> </i>
							</span>
						</div>
					</div>
					)
				})
				}
			</div>
		)
	}
}

export default SocsYouManage;