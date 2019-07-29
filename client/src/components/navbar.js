import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap';

const TopNav = () => {

    // State
    const [isOpen, setIsOpen] = useState(false);

    // Navbar Toggle
    const toggle = () => {
        if (!isOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }

        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavLink className="navbar-brand" to="/">
                        <img src="http://www.sclance.com/pngs/human-brain-png/human_brain_png_687202.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                        Brain
                    </NavLink>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="nav nav-fill" navbar>
                            <NavLink onClick={toggle} className={window.location.pathname === "/" ? "nav-item nav-link active" : "nav-item nav-link"} activeStyle={{ fontWeight: "bold" }} exact to="/">Home</NavLink>
                            <NavLink onClick={toggle} className={window.location.pathname === "/signup" ? "nav-item nav-link active" : "nav-item nav-link"} activeStyle={{ fontWeight: "bold" }} exact to="/signup">Sign Up</NavLink>
                            <NavLink onClick={toggle} className={window.location.pathname === "/login" ? "nav-item nav-link active" : "nav-item nav-link"} activeStyle={{ fontWeight: "bold" }} exact to="/login">Log In</NavLink>
                            <NavLink onClick={toggle} className={window.location.pathname === "/chat" ? "nav-item nav-link active" : "nav-item nav-link"} activeStyle={{ fontWeight: "bold" }} exact to="/chat">Chat</NavLink>
                            <NavLink onClick={toggle} className={window.location.pathname === "/logout" ? "nav-item nav-link active" : "nav-item nav-link"} activeStyle={{ fontWeight: "bold" }} exact to="/logout">Log Out</NavLink>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }

export default TopNav;