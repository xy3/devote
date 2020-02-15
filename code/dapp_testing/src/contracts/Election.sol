pragma solidity ^0.5.0;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        string position;
        uint voteCount;
        string status;
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


    // Voters mapping (who has voted)
    mapping(address => bool) public voters;

    // Candidate mapping
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    // Constructor
    constructor() public {
        // addCandidate("Candidate 1", "Chair");
        // addCandidate("Candidate 2", "Helpdesk");
    }

    function addCandidate(string memory _name, string memory _position) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _position, 0, "Open");
        emit CandidateAdded(candidatesCount, _name, _position, msg.sender);
    }


    function vote(uint _candidateId) public {
        // Require that they haven't voted before
        require(!voters[msg.sender]);
        
        // Require a valid candidate to vote on
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        
        // record that voter has voted
        voters[msg.sender] = true;
        // update candidate vote count
        candidates[_candidateId].voteCount++;
    }
}