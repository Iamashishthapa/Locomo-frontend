import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SignUp from "./Containers/SignUp/SignUp";
import Login from "./Containers/Login/Login";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Mapi from "./Components/Map/map";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Layout />
        <Switch>
          <Route path="/map" exact component={Mapi} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
