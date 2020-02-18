import React, { Component } from 'react';

class VotingForm extends Component {
  render() {
    return (
        <table className="table text-light main-table">
            <thead>
                <tr>
                    <th>Select a Candidate and click Vote</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        if (this.props.addVote(this.candidateId.value)) {
                            event.target.reset();
                        }
                        }}>
                        <div className='form-group'>
                        <select ref={(input) => this.candidateId = input} className='form-control'>
                            {this.props.candidates.map((candidate, key) => {
                            return <option key={key} value={candidate.id}>{candidate.name}</option>
                            })}
                        </select>
                        </div>
                        <button type='submit' id="voteSubmit" className='btn btn-primary'>Vote</button>
                    </form>
                    </td></tr>
            </tbody>
        </table>
    )}
}

export default VotingForm;