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
    
        // whitelist persisted?
        const adresses = await votingInstance.getAdresses.call();
        
        
        assert.equal(adresses.length, 3, "whitelisted adresses still OK between calls");


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


      // it("...check dbg", async () => {
      //   const votingInstance = await Voting.deployed();
    
      //   // whitelist persisted?
      //   const adresses = await votingInstance.getAdresses.call();
        
        
      //   assert.equal(adresses.length, 3, "whitelisted adresses still OK between calls");


      //   assert.equal(adresses[0], accounts[0], "account 0 added OK");
      //   assert.equal(adresses[1], accounts[1], "account 1 added OK");
      //   assert.equal(adresses[2], accounts[2], "account 2 added OK");


      //   const voter0 = await votingInstance.whitelist.call(accounts[0]);
      //   const voter1 = await votingInstance.whitelist.call(accounts[1]);
      //   const voter2 = await votingInstance.whitelist.call(accounts[2]);

      //   assert.equal(voter0.isRegistered, true, "account 0 registered");
      //   assert.equal(voter1.isRegistered, true, "account 1 registered");
      //   assert.equal(voter2.isRegistered, true, "account 2 registered");

      //   assert.equal(voter0.hasVoted, false, "account 0 not voted");
      //   assert.equal(voter1.hasVoted, false, "account 1 not voted");
      //   assert.equal(voter2.hasVoted, false, "account 2 not voted");

      // });
    // - proposals/check proposals


    it("...should add proposals ok", async () => {
      const votingInstance = await Voting.deployed();
      // add one proposal per account
      const prop0 = "proposition 0";
      const prop1 = "proposition 1";
      const prop2 = "proposition 2";
      try{
        await votingInstance.registerProposal(prop0,{ from: accounts[0] });
        await votingInstance.registerProposal(prop1,{ from: accounts[1] });
        await votingInstance.registerProposal(prop2,{ from: accounts[2] });
      }
      catch(e){
       
        assert.equal(1, 0, "we should not have an exception here");
      }

      // check that proposals are here and associated with 
      const proposals = await votingInstance.getProposals.call();
      assert.equal(proposals.length, 3, "proposals should be 3");


      assert.equal(proposals[0].description, prop0, "proposal 0 added OK");
      assert.equal(proposals[1].description, prop1, "proposal 1 added OK");
      assert.equal(proposals[2].description, prop2, "proposal 2 added OK");

      assert.equal(proposals[0].voteCount, 0, "proposal 0 added OK");
      assert.equal(proposals[1].voteCount, 0, "proposal 1 added OK");
      assert.equal(proposals[2].voteCount, 0, "proposal 2 added OK");
 
    });
    // - change status/checkstatus end proposal
    it("...should change status to end proposal registration", async () => {
      const votingInstance = await Voting.deployed();
  

      // should not work
      try{
          await votingInstance.endProposalsRegistration({ from: accounts[1] });
        }
        catch(e){
          const status0 = await votingInstance.getStatus.call();
          assert.equal(status0, 1, "Init status should still be start registering");
        }



      // should work
      await votingInstance.endProposalsRegistration({ from: accounts[0] });

      const status1 = await votingInstance.getStatus.call();

      assert.equal(status1, 2, "Init status should be end proposal registration");



    });
    // - change status/checkstatus start voting
    // - votes/check votes and check that voters have voted
    // - change status/checkstatus end voting 
    // - change status/checkstatus count votes
    // - check results


});
