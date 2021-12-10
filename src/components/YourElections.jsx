import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class YourElections extends Component {

	constructor (props) {
		super(props)
		this.state = {
			tableStatus: false
		}
	}

	reloadTable = () => {
		this.props.getYourElections()
	}
	
	tableStatus = () => {
		this.setState({tableStatus: !this.state.tableStatus})
	}
	
	render() {
		return (
		<div>
			<div className="panel-collapse collapse show" id="collapseTable">
				<table className="table text-light main-table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Society</th>
							<th scope="col">Candidates</th>
							<th scope="col">Status</th>
							<th scope="col" className="viewElectionButton">View / Setup</th>
						</tr>
					</thead>
					<tbody>
						{this.props.elections.map((election, key) => {
							if(this.props.yourElections[election.electionId.toNumber()] == this.props.account) {
							return (
								<tr key={key}>
									<td>{election.electionId.toNumber()}</td>
									<td>{election.name}</td>
									<td>Redbrick</td>
									<td>{election.totalCandidates.toNumber()}</td>
									<td>{this.props.electionStatus[election.electionId]}</td>
									<td className="viewElectionButton">
										<Link to={`/elections/${election.electionId}`}>
											<button className="editElection" id="viewButton">
												{ this.props.electionStatus[election.electionId] == "Awaiting Start"
													? <span><i className="fa fa-pen"></i> Setup</span>
													: <span><i className="fa fa-eye"></i> View</span>
												}
											</button>
										</Link>
									</td>
								</tr>
							)
							}
						})}
					</tbody>
				</table>
			</div>
			<button type="submit" onClick={this.reloadTable}><span><i className="fa fa-refresh"></i>   Refresh</span></button>
			{ this.state.tableStatus 
					? <button type="button" onClick={this.tableStatus} data-toggle="collapse" data-target="#collapseTable">
						<span><i class="fa fa-caret-square-o-down"></i>   Expand Table</span>
					</button>
					:<button type="button" onClick={this.tableStatus} data-toggle="collapse" data-target="#collapseTable">
						<span><i className="fa fa-caret-square-o-up"></i>   Hide Table</span>
					</button>
				}
		</div>
		);
	}
}

export default YourElections