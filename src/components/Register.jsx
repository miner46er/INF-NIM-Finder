import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import { Redirect } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import "../styles/Register.css";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            registerSuccessful: false
        };
    }

    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }

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

    handleSubmit = async event => {
        event.preventDefault();

        const registerData = {
            username: this.state.username,
            password: this.state.password,
        };

        const options = {
            method: "POST",
            url: "https://api.stya.net/nim/register",
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(registerData),
        }

        axios(options)
            .then(res => this.handleLoginResponse(res.data));
    }
    
    render() {
        if (this.props.isLoggedIn) {
            return(
                <Redirect to="/" />
            );
        }

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
                        or, <a href="/login">login</a>.
                    </p>
                </form>
            </div>
        );
    }
}