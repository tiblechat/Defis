import React, { Component } from "react";
//import Identicon from "identicon.js"; //user profile
import dtube from "../images/dtube.png"; //logo

class NavbarUnused extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace">
        {/* <a
          className="navbar-brand ml-1 col-sm-3 col-md-2 mr-0"
          href="/"
          rel="noopener noreferrer"
        >
          <img
            src={dtube}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="DTube logo"
          />
          &nbsp;Voting Dapp
        </a> */}
        <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
        {/* <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap h5 d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
            {this.props.account ? (
            //   <img
            //     className="ml-2"
            //     width="30"
            //     height="30"
            //     src={`data:image/png;base64,${new Identicon(
            //       this.props.account,
            //       30
            //     ).toString()}`}
            //     alt="voting app account address"
            //   />
            <img
            className="ml-2"
            width="30"
            height="30"
            src={dtube}
            alt="voting app account address"
          />
            ) : (
              <span></span>
            )}
          </li>
        </ul> */}
      </nav>
    );
  }
}

export default NavbarUnused;