import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import "../styles/MainNavbar.css";

/**
 * Main navbar of the site.
 * Contains site's brand and login and register option
 */
export default class MainNavbar extends Component {
  /**
   * Callback for logout event
   */
  onLogout = () => {
    this.props.onLogout();
  };

  /**
   * Renders login and register option if not logged in
   */
  renderLoginOption() {
    if (!this.props.isLoggedIn) {
      return (
        <Nav>
          <LinkContainer to="/register">
            <Nav.Link>Register</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <Nav.Link eventKey={0} onSelect={this.onLogout}>
            Logout
          </Nav.Link>
        </Nav>
      );
    }
  }

  /**
   * React render method
   */
  render() {
    return (
      <div className="MainNavbar">
        <Navbar expand="sm" bg="dark" variant="dark">
          <Navbar.Brand href={process.env.PUBLIC_URL + "/"}>
            INF NIM Finder
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            {this.renderLoginOption()}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
