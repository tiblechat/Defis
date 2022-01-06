
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Mainpage from './Mainpage';
import Menu from './Menu';
import NavbarSimple from './NavbarSimple';
import MainpageSelector from "./MainpageSelector";
import VotingContract from "../contracts/Voting.json";
import getWeb3Click from "./getWeb3";

import "./debugbs.css";
class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentpage: 0,
            currentAccount: "",
            currentAmount: "",
            currentBlockchain: "",
            connectStatus: 0,
            thewhitelist: [], 
            theproposals: [],
            theweb3: null,
            theaccounts: null,
            thecontract: null,
            currentStep:0,
            currentProposal:0
        };
      
        this.runInit=this.runInit.bind(this);
        this.accountChanged=this.accountChanged.bind(this);
        this.loadWeb3=this.loadWeb3.bind(this);

    }

    componentDidMount = async () => {

    };

    loadWeb3 = async () => {

        console.log("load web called 111");
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3Click();
            console.log("load web called 222");
            console.log(web3);
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);

            const networkId = await web3.eth.net.getId();
            console.log("network id is: " + networkId);
            const deployedNetwork = VotingContract.networks[networkId];
            const instance = new web3.eth.Contract(
                VotingContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            
            console.log("instance is: " + instance);
            console.log("deployedNetwork is: " + deployedNetwork);
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ theweb3:web3, theaccounts:accounts, thecontract: instance }, this.runInit);

            // if we are here and chain id is ok
            // set this state
            // currentAccount: "",
            // currentAmount: "",
            // currentBlockchain: "",
            // connectStatus: 0,
            const bal = await web3.eth.getBalance(accounts[0]);
            var chainname = "undefined";
            if (networkId === 1)
                chainname = "mainnet";
            if (networkId === 5777)
                chainname = "ganache";
                // TODO: others if necessayry (if deployed)

            // contract should be dployed here
            if (deployedNetwork != null)
            {
            this.setState({ currentAccount:accounts[0].toString(), currentAmount:bal.toString(),
                 currentBlockchain: chainname,
                connectStatus: 1 });
            }
            else
            {
                this.setState({ currentAccount:accounts[0].toString(), currentAmount:bal.toString(),
                    currentBlockchain: chainname,
                   connectStatus: 2 });
            }


            window.ethereum.on('accountsChanged', (accounts) => 
            {
                this.accountChanged(accounts);
            });

            window.ethereum.on('chainChanged', (chainId) => {
                // Handle the new chain.
                // Correctly handling chain changes can be complicated.
                // We recommend reloading the page unless you have good reason not to.
                console.log("chain id is: " + chainId);
 
                window.location.reload();
            });


        }
        catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            this.setState({ 
               connectStatus: 2 });
            console.error(error);
        }
    };

    async accountChanged(newaccounts) {
        console.log('accountsChanges', newaccounts);
        //this.setState({ accounts: newaccounts });
        await this.loadWeb3();
    }
    runInit = async() => {
        const contract  = this.state.thecontract;
      
        // récupérer la liste des comptes autorisés
        const whitelist = await contract.methods.getAdresses().call();
        console.log("from contract "+whitelist);
        // Mettre à jour le state 
        this.setState({ thewhitelist: whitelist });
        const status = await contract.methods.getStatus().call();

        this.setState({ currentStep: parseInt(status,10) });
        console.log(status);


        // proposals
        const props = await contract.methods.getProposals().call();
        // Mettre à jour le state 
        this.setState({ theproposals: props });
        console.log(props);
        console.log("************");
        console.log(props[0]);
      };

      //function registerProposal(string memory proposalDescription) public 


    registerProposalTransaction = async (proposalDescription) => {
        const contract = this.state.thecontract;
        const account = this.state.theaccounts[0];



        try {

            console.log(proposalDescription);

            console.log("startProposalsRegistration");
            await contract.methods.registerProposal(proposalDescription).send({ from: account });

            await this.runInit();

        }
        catch (error) {

            // rpc error for example
            // reload everything 
            window.location.reload();
        }


    }


      nextStepTransaction = async () => {
        const contract  = this.state.thecontract;
        const account = this.state.theaccounts[0];
       
        const isowner = await contract.methods.isOwner().call({ from: account });

        var nextStep = this.state.currentStep + 1;
      
        if (isowner) {
            try {
                console.log("ownership ok, try to change status");
                console.log(nextStep);
                if (nextStep === 1)
                {
                    console.log("startProposalsRegistration");
                    await contract.methods.startProposalsRegistration().send({ from: account });
                }
                else if (nextStep === 2)
                {
                    await contract.methods.endProposalsRegistration().send({ from: account });

                } 
                else if (nextStep === 3)
                {
                    await contract.methods.startVotingSession().send({ from: account });

                } 
                else if (nextStep === 4)
                {
                    await contract.methods.endVotingSession().send({ from: account });

                } 
                else if (nextStep === 5)
                {
                    await contract.methods.CountVotes().send({ from: account });

                } 
                await this.runInit();

            }
            catch (error) 
            {
                
                // rpc error for example
                // reload everything 
                window.location.reload();
            }
        }
        else {
         
            console.log("not auhorized to this action");
        }
        
    }
    //function Vote(uint proposalId) public
    VoteTransaction = async (proposalId) => {
        const contract = this.state.thecontract;
        const account = this.state.theaccounts[0];



        try {

           
            await contract.methods.Vote(proposalId).send({ from: account });

            await this.runInit();

        }
        catch (error) {

            // rpc error for example
            // reload everything 
            window.location.reload();
        }


    }



    whitelist = async (addressFromForm) => {
        const contract  = this.state.thecontract;
        const account = this.state.theaccounts[0];
        const address = addressFromForm.value;

        const isowner = await contract.methods.isOwner().call({ from: account });

        if (isowner) {
            try {
                // Interaction avec le smart contract pour ajouter un compte 
                await contract.methods.register(address).send({ from: account });
                // Récupérer la liste des comptes autorisés
                this.runInit();
            }
            catch (error) 
            {
                // rpc error for example
                // reload everything 
                window.location.reload();
            }
        }
        else {
            console.log("not auhorized to this action")
        }
    }


    handleLinkClicked = (linkNumber,proposalNumber) => {
        this.setState({
            currentpage: linkNumber,
            currentProposal:proposalNumber
        });
    };


    handleConnect = async() => {
        console.log("before laod web3");
        await this.loadWeb3();
        console.log("after laod web3");
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <div class="row">
                        <div class="col bg-color1"><NavbarSimple
                            connectStatus={this.state.connectStatus}
                            account={this.state.currentAccount}
                            blockchain={this.state.currentBlockchain}
                            amount={this.state.currentAmount}
                            onConnect={this.handleConnect}></NavbarSimple></div>
                    </div>

                    <div class="row">
                        <div class="col-sm-3 bg-color2">  <Menu onLinkClicked={this.handleLinkClicked}></Menu></div>
                        <div class="col-sm-9 bg-color3">
                            <div class="container p-5 my-5 border">
                                <MainpageSelector onRegisterProposal={this.registerProposalTransaction} currentStep  ={this.state.currentStep} onNextStep={this.nextStepTransaction} onWhitelist={this.whitelist}
                                 whitelist = {this.state.thewhitelist} onPageChangedClicked={this.handleLinkClicked} proposals = {this.state.theproposals} 
                                 curPage={this.state.currentpage}
                                 curProposal={this.state.currentProposal}
                                 onVote={this.VoteTransaction}>
                                 </MainpageSelector>
                            </div>
                        </div>
                    </div>



                    {/* <NavbarSimple></NavbarSimple>
                    <Menu onLinkClicked={this.handleLinkClicked}></Menu>
                    <MainpageSelector onPageChangedClicked={this.handleLinkClicked} curPage = {this.state.currentpage}></MainpageSelector> */}
                </div>
            </Router >
        );
    }
}

export default Main;
