import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Loader from './Loader'
import autoBind from 'react-autobind';
 
class Elections extends Component {
	constructor(props) {
		super(props)
		this.state = {
			electionStatus: {},
			loadingElectionStatus: true,
			tableStatus: false,
			searchFilter: true
		}
		autoBind(this)
	}

	searchFunction() {
		var input, filter, table, tr, td, i, txtValue;
		input = document.getElementById("search");
		filter = input.value.toUpperCase();
		table = document.getElementById("elections");
		tr = table.getElementsByTagName("tr");

		for (i = 0; i < tr.length; i++) {
			if (this.state.searchFilter == true) td = tr[i].getElementsByTagName("td")[1];
			else td = tr[i].getElementsByTagName("td")[0];
			if (td) {
				txtValue = td.textContent || td.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) tr[i].style.display = "";
				else tr[i].style.display = "none";
			}       
		}
	}

	openElection = (election) => {
		this.props.changeElection(election.electionId.toNumber())
		this.props.renderCandidates()
	}

	reloadTable = () => {
		this.props.renderElections()
	}

	tableStatus = () => {
		this.setState({tableStatus: !this.state.tableStatus})
	}

	changeFilter = () => {
		this.setState({searchFilter: !this.state.searchFilter})
	}
	
	render() {
    	return (
		<div>
			{!this.props.loadingElections
   			? <div>
	    		<h2>Elections in Progress</h2>
	    		<hr />
				<div className="searchElections">
					<i className="fa fa-search"></i>
					<div className="searchType">
						<div className="searchFilter">
							<p>Search Filter:</p>
							{ this.state.searchFilter
								? <p id="filter">Name</p>
								: <p id="filter">ID</p>
							}
						</div>
						<div className="filterChange">
							<button onClick={this.changeFilter}><i className="fa fa-retweet"></i></button>
						</div>
					</div>
					{ this.state.searchFilter
					 ? <input type="text" id="search" onKeyUp={this.searchFunction} placeholder="Search Election Name"/>
					 : <input type="text" id="search" onKeyUp={this.searchFunction} placeholder="Search Election ID"/>
					}
					<button type="submit" id="refresh" onClick={this.reloadTable}><span><i className="fa fa-refresh"></i>   Refresh</span></button>
					{ this.state.tableStatus 
						? <button type="button" className="tableSwitch" onClick={this.tableStatus} data-toggle="collapse" data-target="#collapseTable">
							<span><i className="fa fa-caret-square-o-down"></i>   Expand</span>
						</button>
						:<button type="button" className="tableSwitch" onClick={this.tableStatus} data-toggle="collapse" data-target="#collapseTable">
							<span><i className="fa fa-caret-square-o-up"></i>   Hide</span>
						</button>
					}
				</div>
				<div className="panel-collapse collapse show" id="collapseTable">
					<table className="table text-light main-table" id="elections">
						<thead>
							<tr>
								<th scope="col" width="5%">#</th>
								<th scope="col" width="15%">Name</th>
								<th scope="col" width="15%">Society</th>
								<th scope="col" width="10%">Candidates</th>
								<th scope="col" width="10%">Status</th>
								<th scope="col" width="20%" className="viewElectionButton">View</th>
							</tr>
						</thead>
						<tbody>
							{this.props.openElections.map((election, key) => {
							return (
								<tr key={key}>
									<td>{election.electionId.toNumber()}</td>
									<td>{election.name}</td>
									<td>society here</td>
									<td>{election.totalCandidates.toNumber()}</td>
									<td>{this.props.electionStatus[election.electionId]}</td>
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
			</div>
			: <Loader />
	    }
    	</div>
    )
  }
}

export default Elections;