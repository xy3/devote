import React, { Component } from 'react';
import logo from '../img/logo.png'

import SessionInfo from './SessionInfo'
import Elections from './Elections'
import ElectionForm from './ElectionForm'
import ViewElection from './ViewElection'
import VotingForm from './VotingForm'
import Loader from './Loader'
import Navbar from './Navbar'

class Home extends Component {s
  render() {
    const { account, network, elections, changeElection, renderElection, renderCandidates, displayedElection,
        addElection, addVote, loadingElections, loadingCandidates, candidates } = this.props

	return (
        <div>
            <Navbar logo={logo} />
            <section className="section">
                <div className="container main-body">
                    <div className="row">
                        <SessionInfo 
                            account={account} 
                            networkID={network}
                        />
                    </div>
                    <div className="row" id="homePageBlankSpace">
                        { loadingElections
                            ? <Loader />
                            : <Elections 
                                elections={elections} 
                                changeElection={changeElection}
                                renderCandidates={renderCandidates}
                                renderElection={renderElection}
                            />
                        }
                        <div className="col-md-5">
                            <ElectionForm
                                addElection={addElection} 
                            />
                        </div>
                    </div>
                    {/*
                    <div className="row">
                        { loadingCandidates 
                            ? <Loader />
                            : <ViewElection 
                                candidates={candidates}
                                displayedElection={displayedElection}
                                elections={elections} 
                                renderCandidates={renderCandidates}
                            />
                        }
                        <div className="col-md-5">
                            <VotingForm 
                                candidates={candidates}
                                displayedElection={displayedElection}
                                addVote={addVote}
                            />
                            {/*}
                            <CandidateForm
                                elections={elections}
                                addCandidate={addCandidate}
                            />
                        </div>
                    </div>*/}
                    
                    {/*<div className='row'>
                        <Instructions />
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


