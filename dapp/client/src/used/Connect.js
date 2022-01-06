
import React, { Component } from "react";
import { Button } from 'react-bootstrap';

// component that displays: 
// bouton connect
// ou
// amount + account + blockchain
// ou 
// "bad network change to XXX"
// TODO: display account, blockchain
// TODO: gerer le mauvais network
class Connect extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount = async () => {


    };

    handleClick() {
        this.props.onConnect();
    }



    render() {


        if (this.props.connectStatus === 0) {
            // NOT CONNECTED
            return (
                <Button onClick={() => this.handleClick()}>Connect</Button>
            );

        }
        else if (this.props.connectStatus === 1) {
            // CONNECTED
            return ( 
                <div class="container">
                    <div class="row">
                        <div class="col">
                        
                            <div class="card">
                                <div class="card-body">


                                    <p >{this.props.blockchain}</p>
                                </div>
                              
                            </div>
                        </div>
                        <div class="col">
                            <div class="card">
                                <div class="card-body">


                                <p >{this.props.amount+ " ETH"} </p>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card">
                                <div class="card-body">


                                <p >{this.props.account}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );

        }
        else if (this.props.connectStatus === 2) {
            // CONNECTION ISSUE
            return (
                <h3>invalid network</h3>
            );

        }
        else {
            // CONNECTION ISSUE
            return (
                <h3>invalid network</h3>
            );

        }






    }
}

export default Connect;
