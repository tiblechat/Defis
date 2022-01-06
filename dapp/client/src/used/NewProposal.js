
import React, { Component } from "react";


class NewProposal extends Component {

    constructor(props) {
        super(props);

        this.state = {value: 'ceci est une proposition incroyable'};


        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {

    };



    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleClick(event) {
        this.props.onRegisterProposal(this.state.value);
       
        //event.preventDefault();
    }



    render() {
        return (
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">New proposal</h4>
                    <div class="form-group">
                        {/* <label for="exampleFormControlTextarea1">Title</label> */}
                        {/* <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea> */}

                        <label for="exampleFormControlTextarea2">Proposal</label>
                        {/* <textarea  ref={(input) => { this.proposalContent = input }} class="form-control" id="exampleFormControlTextarea2" rows="10"></textarea> */}
                        <textarea value={this.state.value} onChange={this.handleChange} class="form-control" id="exampleFormControlTextarea2" rows="10"></textarea>
                    </div>
                    <button  onClick={() => this.handleClick()} type="button" class="btn btn-primary">Save proposal</button>
                </div>
            </div>
        );
    }
}

export default NewProposal;


