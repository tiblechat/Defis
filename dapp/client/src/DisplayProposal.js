
import React, { Component } from "react";


class DisplayProposal extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount = async () => {

    };


    render() {
        return (
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Proposal 1</h4>
                    <p class="card-text">Some example text. Some example text. Some example text. Some example text.</p>
                    {/* <a href="#" class="card-link">Go to proposal</a> */}
                    <button type="button" class="btn btn-primary">Vote</button>
                </div>
            </div>
        );
    }
}

export default DisplayProposal;
