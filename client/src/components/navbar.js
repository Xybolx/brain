import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap';

class TopNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    };

    toggleNavbar = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="danger" dark expand="md">
                    <NavLink className="navbar-brand" to="/">
                        <img src="http://www.sclance.com/pngs/human-brain-png/human_brain_png_687202.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                            Brain    
                    </NavLink>
                        <NavbarToggler onClick={this.toggleNavbar} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="nav nav-fill" navbar>
                                <NavLink className="nav-item nav-link" activeStyle={{ fontWeight: "bold" }} exact to="/">Home</NavLink>
                                <NavLink className="nav-item nav-link" activeStyle={{ fontWeight: "bold" }} exact to="/signup">Sign Up</NavLink>
                                <NavLink className="nav-item nav-link" activeStyle={{ fontWeight: "bold" }} exact to="/login">Log In</NavLink>
                                <NavLink className="nav-item nav-link" activeStyle={{ fontWeight: "bold" }} exact to="/chat">Chat</NavLink>
                                <NavLink className="nav-item nav-link" activeStyle={{ fontWeight: "bold" }} exact to="/logout">Log Out</NavLink>
                            </Nav>
                        </Collapse>
                </Navbar>
            </div>
                );
            }
        }
        
export default TopNav;