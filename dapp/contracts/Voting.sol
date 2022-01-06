// SPDX-License-Identifier: MIT
pragma solidity 0.6.11;
pragma experimental ABIEncoderV2;


//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.3/contracts/access/Ownable.sol";

// note: npm i @openzeppelin/contracts@3.3.0 
// https://www.npmjs.com/package/@openzeppelin/contracts/v/3.3.0
import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {  

    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }
    
    struct Proposal
    {
        string description;
        uint voteCount;
    }
    
    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

   address[] public whitelistAdresses;
   mapping(address=> Voter) public whitelist;
   Proposal[] public proposals;
   


   WorkflowStatus private votingStatus = WorkflowStatus.RegisteringVoters;
   uint private winningProposalId = 0;
  
   event VoterRegistered(address voterAddress);
   event ProposalsRegistrationStarted();
   event ProposalsRegistrationEnded();
   event ProposalRegistered(uint proposalId);
   event VotingSessionStarted();
   event VotingSessionEnded();
   event Voted (address voter, uint proposalId);
   event VotesTallied();
   event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);


   function isOwner() public view returns (bool result)
   {
       return (msg.sender == owner());
   }


   function getProposals() public view returns (Proposal[] memory)
   {
      return proposals;
   }

   function getAdresses() public view returns (address[] memory)
   {
      return whitelistAdresses;
   }

   function getStatus() public view returns (WorkflowStatus)
   {
      return votingStatus;
   }
   function changeStatus(WorkflowStatus newStatus) internal onlyOwner
   {
       WorkflowStatus oldStatus = votingStatus;
       votingStatus = newStatus;
       emit WorkflowStatusChange(oldStatus,newStatus);
   }

    //  enregistrement de la liste blanche d'électeurs identifiés par leur adresse Ethereum.
   function register(address _address) public onlyOwner
   {
       require(votingStatus == WorkflowStatus.RegisteringVoters);
       // proposal index 0 means no proposal
       whitelist[_address] =  Voter(true, false,0);
       whitelistAdresses.push(_address);
       emit VoterRegistered(_address);
   }
   function startProposalsRegistration() public onlyOwner
   {
       require(votingStatus == WorkflowStatus.RegisteringVoters);
       changeStatus(WorkflowStatus.ProposalsRegistrationStarted);
       emit ProposalsRegistrationStarted();
   }

   function registerProposal(string memory proposalDescription) public 
   {
       require(votingStatus == WorkflowStatus.ProposalsRegistrationStarted); 
       require(whitelist[msg.sender].isRegistered == true);

       
       // create a proposal with 0 vote
       proposals.push(Proposal(proposalDescription, 0));

       emit ProposalRegistered(proposals.length);
      
   }

   function endProposalsRegistration() public onlyOwner
   {
       require(votingStatus == WorkflowStatus.ProposalsRegistrationStarted);
       changeStatus(WorkflowStatus.ProposalsRegistrationEnded);
       emit ProposalsRegistrationEnded();
   }


   function startVotingSession() public onlyOwner
   {
       require(votingStatus == WorkflowStatus.ProposalsRegistrationEnded);
       changeStatus(WorkflowStatus.VotingSessionStarted);
       emit VotingSessionStarted();
   }

   function endVotingSession() public onlyOwner
   {
       require(votingStatus == WorkflowStatus.VotingSessionStarted);
       changeStatus(WorkflowStatus.VotingSessionEnded);
       emit VotingSessionEnded();
   }


   
   function Vote(uint proposalId) public 
   {
       require(votingStatus == WorkflowStatus.VotingSessionStarted);
       require(whitelist[msg.sender].isRegistered == true);
       require(!(whitelist[msg.sender].hasVoted));

       // If 'proposal' is out of the range of the array,
       // this will throw automatically and revert all
       // changes.
       proposals[proposalId].voteCount += 1;
       whitelist[msg.sender].hasVoted = true;
       whitelist[msg.sender].votedProposalId = proposalId;

       emit Voted(msg.sender, proposalId);
       
      
      
   }


   function CountVotes() public onlyOwner
   {
       require(votingStatus == WorkflowStatus.VotingSessionEnded);
       require(proposals.length > 0);
       uint nbVotesMax = 0;
       uint winningProposal = 0;

       for (uint i = 0; i < proposals.length; i++) 
       {    
           Proposal memory p = proposals[i];
           if (p.voteCount > nbVotesMax)
           {
               nbVotesMax = p.voteCount;
               winningProposal = i;
           }
       }
       winningProposalId = winningProposal;
       changeStatus(WorkflowStatus.VotesTallied);
       emit VotesTallied();
   }

   function GetWinningProposal() public view returns (string memory)
   {

       require((winningProposalId >= 0) && (winningProposalId < proposals.length));
       require(votingStatus == WorkflowStatus.VotesTallied);
       return proposals[winningProposalId].description;
   }


   function GetVoteFromAddress(address _address) public view returns (string memory)
   {
       // must be a registered voter
       require(whitelist[_address].isRegistered == true);
       // user must have voted already
       require(whitelist[_address].hasVoted == true);
      
       return proposals[whitelist[_address].votedProposalId].description;
   }


}