import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap';

const TopNav = () => {

    // State
    const [isOpen, setIsOpen] = useState(false);

    // Navbar Toggle
    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavLink className="navbar-brand" to="/">
                    <span className="fa-stack fa-1x d-inline-block align-top">
                        <span>
                            <i className="fas fa-film fa-stack-2x" />
                            <i className="fas fa-brain fa-stack-1x" style={{ color: "pink" }} />
                        </span>
                    </span>
                    <span id="brandSpan">FilmBrain.com</span>
                </NavLink>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="navbar-nav" style={{ textAlign: "center" }} navbar>
                        <NavLink className="nav-item nav-link" onClick={toggle} activeStyle={{ fontWeight: "bold" }} exact to="/"><i className="fas fa-home fa-fw" /> Home</NavLink>
                        <NavLink className="nav-item nav-link" onClick={toggle} activeStyle={{ fontWeight: "bold" }} exact to="/signup"><i className="fas fa-user-plus fa-fw" /> Sign Up</NavLink>
                        <NavLink className="nav-item nav-link" onClick={toggle} activeStyle={{ fontWeight: "bold" }} exact to="/login"><i className="fas fa-sign-in-alt fa-fw" /> Log In</NavLink>
                        <NavLink
                            className="nav-item nav-link"
                            onClick={toggle}
                            activeStyle={{ fontWeight: "bold" }}
                            exact to="/chat"
                        >
                            <i className="fas fa-theater-masks" /> Reviews
                            </NavLink>
                        <NavLink className="nav-item nav-link" onClick={toggle} activeStyle={{ fontWeight: "bold" }} exact to="/logout"><i className="fas fa-sign-out-alt fa-fw" /> Log Out</NavLink>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default TopNav;