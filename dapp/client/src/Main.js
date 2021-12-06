
import React, { Component } from "react";
import Mainpage from './Mainpage';
import Menu from './Menu';
import Navbar from './Navbar';

class Main extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount = async () => {

    };


    render() {
        return (
            <div className="App">
                <Navbar></Navbar>
                <Menu></Menu>
                <Mainpage></Mainpage>
            </div>
        );
    }
}

export default Main;
