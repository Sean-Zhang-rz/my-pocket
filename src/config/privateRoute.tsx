import { Component } from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '', state: { from: props.location } }} />
      )
    }
  />
)