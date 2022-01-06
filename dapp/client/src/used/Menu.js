import React from "react";
import { Link } from "react-router-dom";

//import "./styles.css";
class Menu extends React.Component {
    //state = { active: !this.props.open || true };


    constructor(props) {
        super(props);
        // When defining custom methods on our React component classes, we must perform the
        // binding pattern inside constructor() so that this references our component.
        // this is defined in react functions like render, componentDidMount, etc... but if we want to access it from a custom method, this is needed
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(linkNumber) {
        //e.preventDefault();
        console.log(linkNumber);
        this.props.onLinkClicked(linkNumber,-1);
    }





    render = () => {
        // const { open } = this.props;
        // const active = !open;

        return (
            <div id="wrapper" className="toggled">
                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">
                            {" "}
                            <a href="#" onClick={() => this.handleClick(0)}> Home </a>{" "}
                        </li>
                        <li>
                            {" "}
                            <a href="#" onClick={() => this.handleClick(1)}>Proposals</a>{" "}
                        </li>
                        <li>
                            {" "}
                            <a href="#" onClick={() => this.handleClick(2)}>Admin</a>{" "}
                        </li>

                    </ul>
                </div>
            </div>
        );
    };
}

export default Menu;
