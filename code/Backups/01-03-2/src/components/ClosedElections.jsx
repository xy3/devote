import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Loader from './Loader'
 
class ClosedElections extends Component {

	constructor(props) {
		super(props)
		this.state = {
			electionStatus: {},
			loadingElectionStatus: true,
			tableStatus: false
		}
	}

	openElection = (election) => {
		this.props.changeElection(election.electionId.toNumber())
		this.props.renderCandidates()
	}

	tableStatus = () => {
		this.setState({tableStatus: !this.state.tableStatus})
	}
	
	render() {
    	return (
		<div>
			{ !this.props.loadingElections
   			? <div>
	    		<h2>Closed Elections</h2>
	    		<hr />
				<div className="panel-collapse collapse show" id="collapseTable2">
					<table className="table text-light main-table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Name</th>
								<th scope="col">Society</th>
								<th scope="col">Candidates</th>
                                <th scope="col">Winner</th>
								<th scope="col" className="viewElectionButton">View</th>
							</tr>
						</thead>
						<tbody>
							{this.props.closedElections.map((election, key) => {
							return (
								<tr key={key}>
									<td>{election.electionId.toNumber()}</td>
									<td>{election.name}</td>
									<td>society here</td>
									<td>{election.totalCandidates.toNumber()}</td>
                                    <td>Ciaran Palmer</td>
									<td className="viewElectionButton">
										<Link to={`/elections/${election.electionId}`}>
										<button id="viewButton"><span><i className="fa fa-eye"></i>   View</span></button>
										</Link>
									</td>
								</tr>
							)
							})}
						</tbody>	
					</table> 
				</div>
				{ this.state.tableStatus 
					? <button type="button" onClick={this.tableStatus} data-toggle="collapse" data-target="#collapseTable2">
						<span><i className="fa fa-caret-square-o-down"></i>   Expand Table</span>
					</button>
					:<button type="button" onClick={this.tableStatus} data-toggle="collapse" data-target="#collapseTable2">
						<span><i className="fa fa-caret-square-o-up"></i>   Hide Table</span>
					</button>
				}
			</div>
			: <Loader />
	    }
    	</div>
    )
  }
}

export default ClosedElections;