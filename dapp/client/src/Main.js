
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Mainpage from './Mainpage';
import Menu from './Menu';
import NavbarSimple from './NavbarSimple';
import MainpageSelector from "./MainpageSelector";
import "./debugbs.css";
class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentpage: 0,
        };

    }

    componentDidMount = async () => {

    };

    handleLinkClicked = (linkNumber) => {
        this.setState({
            currentpage: linkNumber,
        });
    };


    render() {
        return (
            <Router>
                <div className="App">
                    <div class="row">
                        <div class="col bg-color1"><NavbarSimple></NavbarSimple></div>
                    </div>

                    <div class="row">
                        <div class="col-sm-3 bg-color2">  <Menu onLinkClicked={this.handleLinkClicked}></Menu></div>
                        <div class="col-sm-9 bg-color3">
                            <div class="container p-5 my-5 border">
                                <MainpageSelector onPageChangedClicked={this.handleLinkClicked} curPage={this.state.currentpage}></MainpageSelector>
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
