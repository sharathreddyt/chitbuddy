import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

import './App.css';

import UserForm from './components/userForm';
import ChitForm from './components/chitForm';
import Users from './components/Users';
import Chits from './components/chits';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="nav">
            <ul>
              <li className="App-nav">
                <NavLink
                  activeClassName="App-nav-active"
                  className="App-nav"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="App-nav">
                <NavLink
                  activeClassName="App-nav-active"
                  className="App-nav"
                  to="/chits"
                >
                  chits
                </NavLink>
              </li>
              <li className="App-nav">
                <NavLink
                  activeClassName="App-nav-active"
                  className="App-nav"
                  to="/users"
                >
                  Users
                </NavLink>
              </li>
            </ul>
          </div>
          <Switch>
            <Route exact path="/" component={UserForm} />
            <Route path="/user" component={UserForm} />
            <Route path="/chit" component={ChitForm} />
            <Route exact path="/user/:id" component={UserForm} />
            <Route exact path="/chit/:id" component={ChitForm} />
            <Route path="/users" component={Users} />
            <Route path="/chits" component={Chits} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
