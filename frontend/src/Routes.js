import React from "react";
import { Route, Switch } from "react-router-dom";

import SignUp from "./components/signup";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/signup" component={SignUp} />

        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
