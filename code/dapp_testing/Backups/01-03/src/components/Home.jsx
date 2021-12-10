import React, { Component } from 'react';

import SessionInfo from './SessionInfo'
import Elections from './Elections'
import ElectionForm from './ElectionForm'
import ViewElection from './ViewElection'
import VotingForm from './VotingForm'
import Loader from './Loader'
import CompletedElections from './CompletedElections'
import Navbar from './Navbar'
import Instructions from './Instructions'

class Home extends Component {
  render() {
    const { account, network, elections, changeElection, renderElections, renderCandidates, displayedElection,
        addElection, addVote, loadingElections, loadingCandidates, candidates } = this.props

	return (
        <div>
            <Navbar />
            <section>
                <div className="container main-body">
                    <div className="row">
                        <SessionInfo 
                            account={account} 
                            networkID={network}
                        />
                    </div>
                    <div className="row">
                        { loadingElections
                            ? <Loader />
                            : <Elections 
                                electionCount={this.props.electionCount}
                                elections={elections} 
                                changeElection={changeElection}
                                renderCandidates={renderCandidates}
                                renderElections={renderElections}
                            />
                        }
                        <div className="col-md-5">
                            <ElectionForm
                                addElection={addElection} 
                                electionCount={this.props.electionCount}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <CompletedElections />
                        <div className="col-md-5">
                            <Instructions />
                        </div>
                    </div>
                    {/*<div className="row">
                        { loadingCandidates 
                            ? <Loader />
                            : <ViewElection 
                                candidates={candidates}
                                displayedElection={displayedElection}
                                elections={elections} 
                                renderCandidates={renderCandidates}
                            />
                        }*
                        <div className="col-md-5">
                            <VotingForm 
                                candidates={candidates}
                                displayedElection={displayedElection}
                                addVote={addVote}
                            />
                            <CandidateForm
                                elections={elections}
                                addCandidate={addCandidate}
                            />
                        </div>
                    </div>*/}
                    
                </div>
            </section>
            <footer>
                <p>Made by Morgan & Palmer</p>
            </footer>
        </div>
	)
  }
}

export default Home;


