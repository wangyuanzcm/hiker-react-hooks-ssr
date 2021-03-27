import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "../pages/About/about";
import Home from "../pages/Home/home";
import {getData} from '../pages/About/about'
export const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/about",
    exact: true,
    component: About,
    loadData:getData
  },
];

export const Routes = () => 
  <Switch>
      {routes.map((r, index) => {
        const { path, exact, component } = r;
        return <Route key={index} exact={exact} path={path} component={component}></Route>;
      })}
      {/* <route component={404组件}></route> */}
  </Switch>
