import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class YourElections extends Component {
    reloadTable = () => {
		this.props.getYourElections()
	}
    
    render() {
        console.log(this.props.permissions)
		return (
        <div>
            <table className="table text-light main-table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Candidates</th>
                        <th scope="col">Status</th>
                        <th scope="col" className="viewElectionButton">View</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.elections.map((election, key) => {
                        if(this.props.permissions[election.electionId.toNumber()] == this.props.account) {
                        return (
                            <tr key={key}>
                                <td>{election.electionId.toNumber()}</td>
                                <td>{election.name}</td>
                                <td>{election.totalCandidates.toNumber()}</td>
                                <td>{election.electionStatus.toString()}</td>
                                <td className="viewElectionButton">
                                    <Link to={`/elections/${election.electionId}`}>
                                        <button className="editElection">View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                        }
                    })}
                </tbody>
            </table>
            <button type="submit" onClick={this.reloadTable}><span>Refresh</span></button>
        </div>
        );
    }
}

export default YourElections