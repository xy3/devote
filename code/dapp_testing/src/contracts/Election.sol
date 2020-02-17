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
        //addElection("Test Election", "Phil Swift");

        addCandidate("John Todd", "Executive", 1);
        addCandidate("Rebecca Wilson", "Executive", 1);
        addCandidate("Jen Keogh", "Executive", 1);
        addCandidate("Jack Parker", "Executive", 1);
    }

    function addElection(string memory _name, string memory _firstCandidate) public {
        electionCount++;
        elections[electionCount] = Elections(electionCount, _name, 0, "Open");
        addCandidate(_firstCandidate, "", electionCount);
    }

    function addCandidate(string memory _name, string memory _position, uint _election) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _position, 0, "Open", _election);
        elections[_election].totalCandidates++;
        emit CandidateAdded(candidatesCount, _name, _position, msg.sender);
    }

    function vote(uint _candidateId) public {
        // Require that they haven't voted before
        require(!voters[msg.sender], "");

        // Require a valid candidate to vote on
        require(_candidateId > 0 && _candidateId <= candidatesCount, "");

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote count
        candidates[_candidateId].voteCount++;
    }
}