import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import cookie from "react-cookies";
import "../styles/Login.css";

/**
 * Component that take care of user login.
 */
export default class Login extends Component {
  /**
   *
   * @param {Props} props
   */
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  /**
   * Handles form's onChange event
   * @param {Event} event onChange event
   */
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  /**
   * Handles the server's response for login
   * @param {JSON} data server's response data
   */
  handleLoginResponse(data) {
    if (data.code === 0 && data.status === "OK") {
      // get the time one day from now
      const expires = new Date(Date.now());
      expires.setDate(expires.getDate() + 1);

      // save cookie
      cookie.save("token", data.token, { path: "/", expires });

      this.props.onLogin();
    } else {
      // alert error
      alert(data.status);
    }
  }

  /**
   * Handles form's onSubmit event
   * @param {Event} event onSubmit event
   */
  handleSubmit = async event => {
    // prevent default action to be taken
    event.preventDefault();

    // prepares the login data to be sent
    const loginData = {
      username: this.state.username,
      password: this.state.password
    };

    // prepares axios request config
    const options = {
      method: "POST",
      url: "https://api.stya.net/nim/login",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(loginData)
    };

    // sending the request
    axios(options)
      .then(res => this.handleLoginResponse(res.data))
      .catch(error => {
        alert(error);
        console.log(error);
      });
  };

  /**
   * React render method
   */
  render() {
    // redirect user if already logged in
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="Login">
        <h3 id="login-header">Login</h3>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username">
            <FormLabel>Username</FormLabel>
            <FormControl
              autoFocus
              type="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button block type="submit" variant="dark">
            Login
          </Button>
          <p>
            or, <Link to="/register">register</Link>.
          </p>
        </form>
      </div>
    );
  }
}
