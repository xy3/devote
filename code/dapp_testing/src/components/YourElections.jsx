import React, { Component } from 'react';
import Web3 from 'web3'
import Election from '../abis/Election.json'
import logo from '../img/logo.png'

import SessionInfo from './SessionInfo'
import Navbar from './Navbar'

class YourElections extends Component {
    editElection = (election) => {
        console.log("To be implemented")
    }
    
    render() {
		return (
            <table className="table text-light main-table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Candidates</th>
                        <th scope="col">Status</th>
                        <th scope="col" className="viewElectionButton">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.elections.map((election, key) => {
                    return (
                        <tr key={key}>
                            <td>{election.electionId.toNumber()}</td>
                            <td>{election.name}</td>
                            <td>{election.totalCandidates.toNumber()}</td>
                            <td>{election.electionStatus.toString()}</td>
                            <td className="viewElectionButton">
                                <button onClick={() => this.editElection(election)} className="editElection">Edit</button>
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        );
    }
}

export default YourElections