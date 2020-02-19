import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import logo from '../img/logo.png'

import SessionInfo from './SessionInfo'
import Elections from './Elections'
import ElectionForm from './ElectionForm'
import VotingResults from './VotingResults'
import Instructions from './Instructions'
import ViewElection from './ViewElection'
import VotingForm from './VotingForm'
import CandidateForm from './CandidateForm'
import Loader from './Loader'
import Navbar from './Navbar'

class Home extends Component {
  render() {
    const { account, networkID, elections, changeElection, renderElection, renderElectionList, displayedCandidates,
            displayedElection, addCandidate, addElection, addVote, loadingElections, loadingCandidates } = this.props

	return (
        <div>
            <Navbar logo={logo} />
            <section className="section">
                <div className="container main-body">
                    <div className="row">
                        <SessionInfo 
                            account={account} 
                            network={networkID}
                        />
                    </div>
                    <div className="row">
                        { loadingElections
                            ? <Loader />
                            : <Elections 
                                elections={elections} 
                                changeElection={changeElection}
                                renderElection={renderElection}
                                renderElectionList={renderElectionList}
                            />
                        }
                        <div className="col-md-5">
                            <ElectionForm addElection={addElection} />
                        </div>
                    </div>
                    <div className="row">
                        { loadingCandidates 
                            ? <Loader />
                            : <ViewElection 
                                candidates={displayedCandidates}
                                displayedElection={displayedElection}
                                elections={elections} 
                                renderElection={renderElection}
                            />
                        }
                        <div className="col-md-5">
                            <VotingForm 
                                candidates={displayedCandidates}
                                addVote={addVote}
                            />
                            {/*}
                            <CandidateForm
                                elections={elections}
                                addCandidate={addCandidate}
                            />*/}
                        </div>
                    </div>
                    
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


