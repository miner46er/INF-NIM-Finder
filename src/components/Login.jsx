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

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }

    handleLoginResponse(data) {
        if (data.code === 0 && data.status === "OK") {
            const expires = new Date(Date.now());
            expires.setDate(expires.getDate() + 1);

            cookie.save("token", data.token, { path: '/', expires });

            this.props.onLogin();
        }
        else {
            alert(data.status);
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const loginData = {
            username: this.state.username,
            password: this.state.password,
        };

        const options = {
            method: "POST",
            url: "https://api.stya.net/nim/login",
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(loginData),
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

        return(
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
                    <Button
                        block
                        type="submit"
                        variant="dark"
                    >
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