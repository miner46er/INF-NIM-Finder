import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import cookie from "react-cookies";
import MainNavbar from "./MainNavbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import "../styles/App.css";

/**
 * Main App class.
 * Handle site's routes.
 */
class App extends Component {
  /**
   *
   * @param {Props} props
   */
  constructor(props) {
    super(props);

    /** Token login pengguna */
    const token = cookie.load("token");

    this.state = {
      token: token,
      isLoggedIn: token !== undefined && token !== null
    };

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  /**
   * Callback for login event
   */
  onLogin() {
    const token = cookie.load("token");

    this.setState({
      token: token,
      isLoggedIn: true
    });
  }

  /**
   * Callback for logout event
   */
  onLogout() {
    cookie.remove("token", { path: "/" });

    this.setState({
      token: undefined,
      isLoggedIn: false
    });
  }

  /**
   * React render method
   */
  render() {
    return (
      <div className="App">
        <MainNavbar
          isLoggedIn={this.state.isLoggedIn}
          onLogout={this.onLogout}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Home
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                token={this.state.token}
                onLogin={this.onLogin}
              />
            )}
          />
          <Route
            path="/login"
            exact
            render={props => (
              <Login
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                onLogin={this.onLogin}
              />
            )}
          />
          <Route
            path="/register"
            exact
            render={props => (
              <Register {...props} isLoggedIn={this.state.isLoggedIn} />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
