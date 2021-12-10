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
        bool active;
        mapping(address => bool) voters;
        address admin;
    }

    // Elections mapping
    mapping(uint => Elections) public elections;
    uint public electionCount;

    // Election Admins
    // mapping(uint => address) public admins;

    // Candidate mapping
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    // Constructor
    constructor() public {
        addElection("Test Election 1");
        addElection("Test Election 2");

        addCandidate("Test Candidate 1", "NA", 1);
        addCandidate("Test Candidate 2", "NA", 1);
        addCandidate("Test Candidate 3", "NA", 1);

        addCandidate("Test Candidate 4", "NA", 2);
        addCandidate("Test Candidate 5", "NA", 2);
    }

    function addElection(string memory _name) public {
        electionCount++;
        elections[electionCount] = Elections(electionCount, _name, 0, "Awaiting Start", false, msg.sender);
        // admins[electionCount] = msg.sender;
    }

    function editElectionName(string memory _name, uint _electionId) public {
        require(elections[_electionId].admin == msg.sender, "You do not have permissions to change this election");
        elections[_electionId].name = _name;
    }

    function addCandidate(string memory _name, string memory _position, uint _electionId) public {
        require(elections[_electionId].admin == msg.sender, "You do not have permissions to add candidates to this election.");

        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _position, 0, "Running", _electionId);
        elections[_electionId].totalCandidates++;
        emit CandidateAdded(candidatesCount, _name, _position, msg.sender);
    }

    function deleteCandidate(uint _candidateId) public {
        require(elections[candidates[_candidateId].electionId].admin == msg.sender, "You do not have permissions to delete candidates.");
        elections[candidates[_candidateId].electionId].totalCandidates --;
        delete candidates[_candidateId];
        candidatesCount --;
    }

    function vote(uint _candidateId, uint _electionId) public {
        // Require that they haven't voted before
        //require(!voters[msg.sender], "You have already cast a vote in this election");
        require(!elections[_electionId].voters[msg.sender], "You have already voted in this election.");

        // Require a valid candidate to vote on
        require(_candidateId > 0 && _candidateId <= candidatesCount, "The candidate you tried to vote for doesn't exist.");

        // record that voter has voted
        //voters[msg.sender] = true;
        // update candidate vote count
        candidates[_candidateId].voteCount++;
        elections[_electionId].voters[msg.sender] = true;
    }
}