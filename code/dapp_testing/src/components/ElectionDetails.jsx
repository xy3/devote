import React, { Component } from 'react'
import Navbar from './Navbar'
import logo from '../img/logo.png'
import Loader from './Loader'

class ElectionDetails extends Component {
    reloadTable = () => {
        this.props.renderElection()
    }
    
    render() {
        return (
            <div>
                <Navbar logo={logo} />
                <section className="section">
                    <div className="container main-body" id='electionDetails'>
                        { this.props.elections.length
                            ? <h2>[{this.props.match.params.id}] {this.props.elections[this.props.match.params.id-1].name}</h2> 
                            : <h2>Loading title...</h2>
                        }
                        <hr />
                        { this.props.loadingCandidates === false
                            ? <table className="table text-light main-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Votes</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.candidates.map((candidate, key) => {
                                        if(candidate.electionId == this.props.match.params.id) {
                                            return (
                                                <tr key={key}>
                                                    <td>{candidate.name}</td>
                                                    <td>{candidate.position.toString()}</td>
                                                    <td>{candidate.voteCount.toNumber()}</td>
                                                    <td>{candidate.status.toString()}</td>
                                                </tr> 
                                                )
                                            }
                                        })
                                    }
                                </tbody>
                            </table>
                            : <Loader />
                        }
                        <button type="submit" onClick={this.reloadTable}><span>Refresh</span></button>
                        <button type="submit"><span>See all</span></button>
                    </div>
                </section>
            </div>
        )
    }  
}

export default ElectionDetails;