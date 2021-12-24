
import React, { Component } from "react";


class NewProposal extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount = async () => {

    };


    render() {
        return (
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">New proposal</h4>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Title</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>

                        <label for="exampleFormControlTextarea2">Proposal</label>
                        <textarea class="form-control" id="exampleFormControlTextarea2" rows="10"></textarea>
                    </div>
                    <button type="button" class="btn btn-primary">Save proposal</button>
                </div>
            </div>
        );
    }
}

export default NewProposal;
