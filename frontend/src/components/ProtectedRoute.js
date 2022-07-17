import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = (props) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? props.children : <Redirect to="./sign-in" />
      }
    </Route>
  );
};