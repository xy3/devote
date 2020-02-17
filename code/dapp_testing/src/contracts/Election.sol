pragma solidity ^0.5.0;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        string position;
        uint voteCount;
        string status;
        uint electionId;
        // uint election_id;
        // string election_status; // open or closed
        // string election_result; // elected or not
    }

    event CandidateAdded(
        uint id,
        string name,
        string position,
        address payable author
    );

    struct Elections {
        uint electionId;
        string name;
        uint totalCandidates;
        string electionStatus;
    }

    // Elections mapping
    mapping(uint => Elections) public elections;
    uint public electionCount;

    // Voters mapping (who has voted)
    mapping(address => bool) public voters;

    // Candidate mapping
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    // Constructor
    constructor() public {
        addElection("Ciaran's Election", "Ciaran Palmer");
        addElection("Engineering Society", "Paul Smith");
        //addElection("Test Election", "Phil Swift");

        addCandidate("John Todd", "NA", 1);
        addCandidate("Rebecca Wilson", "NA", 1);
        addCandidate("Jen Keogh", "NA", 1);

        addCandidate("Will Parker", "NA", 2);
        addCandidate("Jack Black", "NA", 2);
    }

    function addElection(string memory _name, string memory _firstCandidate) public {
        electionCount++;
        elections[electionCount] = Elections(electionCount, _name, 0, "Open");
        addCandidate(_firstCandidate, "NA", electionCount);
    }

    function addCandidate(string memory _name, string memory _position, uint _election) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _position, 0, "Running", _election);
        elections[_election].totalCandidates++;
        emit CandidateAdded(candidatesCount, _name, _position, msg.sender);
    }

    function vote(uint _candidateId) public {
        // Require that they haven't voted before
        require(!voters[msg.sender], "You have already cast a vote in this election");

        // Require a valid candidate to vote on
        require(_candidateId > 0 && _candidateId <= candidatesCount, "The candidate you tried to vote for doesn't exist");

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote count
        candidates[_candidateId].voteCount++;
    }
}