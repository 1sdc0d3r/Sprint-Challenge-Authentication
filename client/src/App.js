import React from "react";
import "./App.css";
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";

import Register from "./components/register";
import Login from "./components/login";
import Jokes from "./components/jokes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/jokes" component={Jokes} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
