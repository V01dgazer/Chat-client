import * as React from "react";
import { Router, Switch, Route } from "react-router";
import { Container } from "semantic-ui-react";
import history from "../../history";

import Login from "../Login";
import Room from "../Room";
import { GlobalStyle } from "./GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container fluid style={{ height: "100vh" }}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/room/:id" exact component={Room} />
          </Switch>
        </Router>
      </Container>
    </>
  );
};

export default App;
