import React, { Component } from 'react'
import Navbar from './Navbar'
import logo from '../img/logo.png'
import Loader from './Loader'

import EditElection from './EditElection'
import CandidateForm2 from './CandidateForm2'
import Error404 from './error404'
import VotingForm from './VotingForm'

class ElectionDetails extends Component {
	reloadTable = () => {
		this.props.renderCandidates()
	}
	
	render() {
		return (
			<div>
				{ this.props.match.params.id <= this.props.electionCount
				? <div>
					{!this.props.loadingCandidates 
					? <div>
						<Navbar logo={logo} />
						<section className="section">
							<div className="container main-body" id='electionDetails'>
								<div className="row">
									<div className="col-md-7">
									{ !this.props.elections.length
										? <h2>Loading election title...</h2>
										: <div>
											<h2>{this.props.elections[this.props.match.params.id-1].name}</h2>
										</div>
										
									}
									<hr />
									{ this.props.loadingCandidates
										? <Loader />
										: <table className="table text-light main-table">
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
													if(candidate.electionId.toNumber() == this.props.match.params.id) {
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
									}
									<button type="submit" onClick={this.reloadTable}><span>Refresh</span></button>
									<button type="submit"><span>See all</span></button>
									</div>
									<div className="col-md-5">
										<VotingForm 
											candidates={this.props.candidates}
											displayedElection={this.props.match.params.id}
											addVote={this.props.addVote}
										/>
									</div>
								</div>
								{ this.props.permissions[this.props.match.params.id] == this.props.account
								? <div>
									<div id="longBar"/>
									<div className="row">
										<div className="col-md-7">
											<EditElection
												electionId={this.props.match.params.id}
												editElectionName={this.props.editElectionName}
												candidates={this.props.candidates}
												displayedElection={this.props.match.params.id}
												deleteCandidate={this.props.deleteCandidate}
											/>
										</div>
										<div className="col-md-5">
											<CandidateForm2
												elections={this.props.elections}
												displayedElection={this.props.match.params.id}
												addCandidate={this.props.addCandidate}
											/>
										</div>
									</div>
								</div>
								: <span></span>
								}
							</div>
						</section>
					</div>
					: <Loader />
					}
				</div>
				: <div>
					{ this.props.loadingCandidates
						? <Loader />
						: <Error404 />
					}
				</div>
				}
			</div>
		)
	}  
}

export default ElectionDetails;