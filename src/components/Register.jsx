import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import "../styles/Register.css";

/**
 * Component that take care of user registration.
 */
export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            registerSuccessful: false
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
    }

    /**
     * Handles the server's response for registration
     * @param {JSON} data server's response data
     */
    handleLoginResponse(data) {
        if (data.code === 0 && data.status === "OK") {
            this.setState({
                registerSuccessful: true
            });
        }
        else {
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

        // prepares the registration data to be sent
        const registerData = {
            username: this.state.username,
            password: this.state.password,
        };

        // prepares axios request config
        const options = {
            method: "POST",
            url: "https://api.stya.net/nim/register",
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(registerData),
        }

        // sending the request
        axios(options)
            .then(res => this.handleLoginResponse(res.data))
            .catch(error => {alert(error); console.log(error)});
    }
    
    render() {
        // redirect user if already logged in
        if (this.props.isLoggedIn) {
            return(
                <Redirect to="/" />
            );
        }

        // redirect user if registration is successful
        if (this.state.registerSuccessful) {
            return(
                <Redirect to="/login" />
            );
        }
        
        return(
            <div className="Register">
                <h3 id="register-header">Register</h3>
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
                    <Button
                        block
                        type="submit"
                        variant="dark"
                    >
                        Register
                    </Button>
                    <p>
                        or, <Link to="/login">login</Link>.
                    </p>
                </form>
            </div>
        );
    }
}