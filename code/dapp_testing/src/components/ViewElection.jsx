import React, { Component } from 'react';

class ViewElection extends Component {
    reloadTable = () => {
        this.props.renderElection()
    }
    
    render() {
        const {candidates, displayedElection, elections} = this.props
        return (
            <div className="col-md-7">
                <h2>[{displayedElection}] {elections[displayedElection-1].name}</h2> 
                <hr />
                <table className="table text-light main-table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Position</th>
                            <th scope="col">Votes</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate, key) => {
                            return (
                                <tr key={key}>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.position.toString()}</td>
                                    <td>{candidate.voteCount.toNumber()}</td>
                                    <td>{candidate.status.toString()}</td>
                                </tr> 
                                )
                            })
                        }
                    </tbody>
                </table>
                <button type="submit" onClick={this.reloadTable}><span>Refresh</span></button>
    		    <button type="submit"><span>See all</span></button>
            </div>
        );
    }
}

export default ViewElection;