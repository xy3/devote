import React, { Component } from 'react';

class CompletedElections extends Component {
    render () {
        return (
            <div className="col-md-7">
                <h2>Completed Elections</h2>
    		    <hr />
                <table className="table text-light main-table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Election Name</th>
                            <th scope="col">Candidates</th>
                            <th scope="col">Status</th>
                            <th scope="col">Winner</th>
                            <th scope="col" className="viewElectionButton">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>9</td>
                        <td>Example Completed Election</td>
                        <td>10</td>
                        <td>Closed</td>
                        <td>Ciaran Palmer</td>
                        <td className="viewElectionButton"><button className="viewElection">View</button></td>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CompletedElections