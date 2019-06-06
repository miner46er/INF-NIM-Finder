import React, { Component } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../styles/MainNavbar.css";

export default class MainNavbar extends Component {
    onLogout = () => {
        this.props.onLogout();
    }

    renderLoginOption() {
        if(!this.props.isLoggedIn) {
            return (
                <Nav>
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            );
        }
        else {
            return (
                <Nav>
                    <Nav.Link
                        eventKey={0}
                        onSelect={this.onLogout}
                    >
                        Logout
                    </Nav.Link>
                </Nav>
            );
        }
    }

    render() {
        return (
            <div className="MainNavbar">
                <Navbar expand="sm" bg="dark" variant="dark">
                    <Navbar.Brand href={process.env.PUBLIC_URL + "/"}>INF NIM Finder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse className="justify-content-end">
                        {this.renderLoginOption()}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
