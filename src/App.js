import React from "react";
import "./App.css";
import M from "materialize-css";
import { Navbar, NavItem, Icon } from "react-materialize";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Rating from "./routes/Rating";
import Statistics from "./routes/Statistics";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    M.AutoInit();
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Navbar
          alignLinks="right"
          brand={
            <a className="brand-logo" href="/#">
              WeAreHappy
            </a>
          }
          id="mobile-nav"
          menuIcon={<Icon>menu</Icon>}
          options={{
            draggable: true,
            edge: "left",
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 200,
            preventScrolling: true,
          }}
        >
          <NavItem href="/#">rating</NavItem>
          <NavItem href="/statistics">statistics</NavItem>
        </Navbar>
        <Switch>
          <Route path="/statistics">
            <Statistics />
          </Route>
          <Route path="/">
            <Rating />
          </Route>
        </Switch>
      </Router>
    );
  }
}
