const Voting = artifacts.require("./Voting.sol");

contract("Voting", accounts => {


    // - check status nd other initializations
    
  it("...should start at whitelisting status.", async () => {
    const votingInstance = await Voting.deployed();

    // Get stored value
    const status = await votingInstance.getStatus.call();

    assert.equal(status, 0, "Init status should be whitelisting");
  });

    // - whitelisting/check whitelist
    it("...should whitelist owner, 2nd account, 3rd account.", async () => {
        const votingInstance = await Voting.deployed();
    
        // TODO: sortir votinginstance, vori si chaque it est indépendant

       
        await votingInstance.register(accounts[0], { from: accounts[0] });
        await votingInstance.register(accounts[1], { from: accounts[0] });
        await votingInstance.register(accounts[2], { from: accounts[0] });

        const adresses = await votingInstance.getAdresses.call();
        
        
        assert.equal(adresses.length, 3, "whitelisted adresses OK");

        assert.equal(adresses[0], accounts[0], "account 0 added OK");
        assert.equal(adresses[1], accounts[1], "account 1 added OK");
        assert.equal(adresses[2], accounts[2], "account 2 added OK");


        const voter0 = await votingInstance.whitelist.call(accounts[0]);
        const voter1 = await votingInstance.whitelist.call(accounts[1]);
        const voter2 = await votingInstance.whitelist.call(accounts[2]);

        assert.equal(voter0.isRegistered, true, "account 0 registered");
        assert.equal(voter1.isRegistered, true, "account 1 registered");
        assert.equal(voter2.isRegistered, true, "account 2 registered");

        assert.equal(voter0.hasVoted, false, "account 0 not voted");
        assert.equal(voter1.hasVoted, false, "account 1 not voted");
        assert.equal(voter2.hasVoted, false, "account 2 not voted");

        // check an account not whitelisted
        const voterNotWL = await votingInstance.whitelist.call(accounts[3]);

        assert.equal(voterNotWL.isRegistered, false, "voterNotWL not registered");

      });

      
    // - change status/checkstatus
    it("...should change status to start proposal registration", async () => {
        const votingInstance = await Voting.deployed();
    
        // TODO: exception

        // should not work
        try{
            await votingInstance.startProposalsRegistration({ from: accounts[1] });
          }
          catch(e){
            const status0 = await votingInstance.getStatus.call();
            assert.equal(status0, 0, "Init status should still be whitelisting");
          }



        // should work
        await votingInstance.startProposalsRegistration({ from: accounts[0] });

        const status1 = await votingInstance.getStatus.call();

        assert.equal(status1, 1, "Init status should be start proposal registration");



      });
    // - proposals/check proposals
    // - change status/checkstatus en proposal
    // - change status/checkstatus start voting
    // - votes/check votes
    // - change status/checkstatus end voting 
    // - change status/checkstatus count votes
    // - check results


});
