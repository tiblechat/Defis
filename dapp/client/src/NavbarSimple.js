import React, { useState } from "react";
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem,Container } from 'react-bootstrap';
//import "./Navbar.css";
import Connect from "./Connect";
//import img from "./images/dtube.png"; //OK
import img from "./images/Ethereum_logo_2014.svg"; //OK


const NavbarSimple = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  // return (
  //   <nav className="navbar">
  //     <h1 className="navbar-logo">
  //       Voting app<i className="fab fa-react"></i>
  //     </h1>
  //     <div className="menu-icon" onClick={handleClick}>
  //       <i className={active ? "fas fa-times" : "fas fa-bars"}></i>
  //     </div>
  //     <h1 className="navbar-logo">
  //       Blockchain <i className="fab fa-react"></i>
  //     </h1>
  //   </nav>
  // );

  return (


  //   <nav className="navbar">
  //   <h1 className="navbar-logo">
  //     Voting app <i className="fab fa-react"></i>
  //   </h1>
  //   <div className="menu-icon" onClick={handleClick}>
  //     <i className={active ? "fas fa-times" : "fas fa-bars"}></i>
  //   </div>
  //   <ul className={active ? "nav-menu active" : "nav-menu"}>
  //   coucou
  //   </ul>
  //   <Connect />
  // </nav>
  //<Navbar bg="dark" variant="dark">
  <Navbar>
      <Navbar.Brand href="#home" className="ml-auto">
        <img
          alt=""
         // src="/images/Ethereum_logo_2014.svg"
          src={img}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      Voting app
      </Navbar.Brand>
      <Nav className="ms-auto"><Connect /></Nav>
      
  </Navbar>

  );
};

export default NavbarSimple;
