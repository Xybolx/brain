import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

const TopNav = () => {

    // State
    const [isOpen, setIsOpen] = useState(false);

    // Navbar Toggle
    const toggle = () => {
        setIsOpen(!isOpen)
    };

    const isActiveHome = () => {
        if (window.location.pathname === "/") {
            return true;
        } else {
            return false;
        }
    };

    const isActiveSignUp = () => {
        if (window.location.pathname === "/signup") {
            return true;
        } else {
            return false;
        }
    };

    const isActiveLogIn = () => {
        if (window.location.pathname === "/login") {
            return true;
        } else {
            return false;
        }
    };

    const isActiveReviews = () => {
        if (window.location.pathname === "/reviews") {
            return true;
        } else {
            return false;
        }
    };

    const isActiveLogOut = () => {
        if (window.location.pathname === "/logout") {
            return true;
        } else {
            return false;
        }
    };

    return (
        <Navbar color="dark" dark expand="md">
            <NavLink className="navbar-brand" to="/logout">
                <span className="fa-stack d-inline-block align-top">
                    <span>
                        <i className="fas fa-film fa-stack-2x" />
                        <i className="fas fa-brain fa-stack-1x" />
                    </span>
                </span>
                <span id="brandSpan">FilmBrains</span>
            </NavLink>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav
                    className="navbar-nav"
                    style={{ textAlign: "center" }}
                    navbar
                >
                    <NavItem>
                        <NavLink
                            className="nav-link"
                            onClick={toggle}
                            activeStyle={{ fontWeight: "bold", textShadow: "1px 1px 1px gold" }}
                            isActive={isActiveHome}
                            exact to="/"
                        >
                            <i className="fas fa-home fa-fw" /> Home
                            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="nav-link"
                            onClick={toggle}
                            activeStyle={{ fontWeight: "bold", textShadow: "1px 1px 1px gold" }}
                            isActive={isActiveSignUp}
                            exact to="/signup"
                        >
                            <i className="fas fa-user-plus fa-fw" /> Sign Up
                            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="nav-link"
                            onClick={toggle}
                            activeStyle={{ fontWeight: "bold", textShadow: "1px 1px 1px gold" }}
                            isActive={isActiveLogIn}
                            exact to="/login"
                        >
                            <i className="fas fa-sign-in-alt fa-fw" /> Log In
                            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="nav-link"
                            onClick={toggle}
                            activeStyle={{ fontWeight: "bold", textShadow: "1px 1px 1px gold" }}
                            isActive={isActiveReviews}
                            exact to="/reviews"
                        >
                            <i className="fas fa-theater-masks" /> Reviews
                            </NavLink>
                    </NavItem>
                    <NavItem style={ window.location.pathname === "/reviews" ? { display: "inline-block" } : { display: "none" }}>
                        <NavLink
                            className="nav-link"
                            onClick={toggle}
                            activeStyle={{ fontWeight: "bold", textShadow: "1px 1px 1px gold" }}
                            isActive={isActiveLogOut}
                            exact to="/logout"
                        >
                            <i className="fas fa-sign-out-alt fa-fw" /> Log Out
                            </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default TopNav;