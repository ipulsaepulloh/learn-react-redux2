import React, { Component, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import UserList from "./pages/UserList";

class App extends Component {
  state = {
    isAuthenticated: false
  };

  componentDidMount() {
    const token = Cookies.get("token");

    if (token) {
      this.setState({ isAunthenticated: true });
    }
  }

  updateAuthStatus = value => {
    this.setState({ isAuthenticated: value });
  };

  render() {
    return (
      <Fragment>
        <Route path="/" exact component={Home} />
        <Route
          path="/signup"
          render={props => {
            if (!this.state.isAuthenticated) {
              return <SignUp {...props} />;
            } else {
              return <Redirect to="/users" />;
            }
          }}
        />
        <Route
          path="/signin"
          render={props => {
            if (!this.state.isAuthenticated) {
              return <SignIn {...props} login={this.updateAuthStatus} />;
            } else {
              return <Redirect to="/users" />;
            }
          }}
        />
        <Route
          path="/users"
          render={props => {
            if (this.state.isAuthenticated) {
              return (
                <UserList
                  {...props}
                  logout={() => this.updateAuthStatus(false)}
                />
              );
            } else {
              return <Redirect to="/signin" />;
            }
          }}
        />
      </Fragment>
    );
  }
}

export default App;
