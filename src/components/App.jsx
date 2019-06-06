import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import cookie from "react-cookies";
import MainNavbar from "./MainNavbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // checks whether there is already a login cookie
    const token = cookie.load("token");

    this.state = {
      token: token,
      isLoggedIn: token!==undefined&&token!==null,
    };

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogin() {
    const token = cookie.load("token");

    this.setState({
      token: token,
      isLoggedIn: true,
    });
  }

  onLogout() {
    cookie.remove("token", { path: '/' });

    this.setState({
      token: undefined,
      isLoggedIn: false,
    });
  }

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
            render={(props) =>
              <Home {...props}
                isLoggedIn={this.state.isLoggedIn}
                token={this.state.token}
                onLogin={this.onLogin}
              />
            }
          />
          <Route
            path="/login"
            exact
            render={(props) =>
              <Login {...props}
                isLoggedIn={this.state.isLoggedIn}
                onLogin={this.onLogin}
              />
            }
          />
          <Route
            path="/register"
            exact
            render={(props) =>
              <Register {...props}
                isLoggedIn={this.state.isLoggedIn}
              />
            }
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
