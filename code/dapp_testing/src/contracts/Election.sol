pragma solidity ^0.5.0;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }


    // Voters mapping (who has voted)
    mapping(address => bool) public voters;

    // Candidate mapping
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    // Constructor
    constructor() public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate(string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
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