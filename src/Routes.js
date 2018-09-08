import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/HomePage/HomePage";
import UserHomePage from "./containers/UserHomePage/UserHomePage";
import Orders from "./containers/Orders/Orders";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/UserHomePage" exact component={UserHomePage} />
    <Route path="/Orders" exact component={Orders} />
  </Switch>;