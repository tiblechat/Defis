
import React, { Component } from "react";


class DisplayProposal extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount = async () => {

    };

    handleClick() {
        if (this.props.proposalId >= 0)
        {
            //console.log(this.props);
            this.props.onVote(this.props.proposalId);
        }
       
        //event.preventDefault();
    }



    render() {
        var proposalTxt = '';
        var proposalVoteCount = 0;
        if (this.props.proposalId >= 0)
        {
            proposalTxt = this.props.proposals[this.props.proposalId].description;
            proposalVoteCount = this.props.proposals[this.props.proposalId].voteCount;
        }
        return (
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Proposal</h4>
                    <p class="card-text">{proposalTxt}</p>
                    <p class="card-text">{proposalVoteCount}</p>
                    {/* <a href="#" class="card-link">Go to proposal</a> */}
                    <button type="button" onClick={() => this.handleClick()} class="btn btn-primary">Vote</button>
                </div>
            </div>
        );
    }
}

export default DisplayProposal;
