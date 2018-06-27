import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';

import store from './store';
import Router from './Router';

import { fetchChits } from './actions/actions_chits';
import { fetchUsers } from './actions/actions_users';

class App extends Component {
  componentWillMount() {
    store.dispatch(fetchChits());
    store.dispatch(fetchUsers());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router />
        </div>
      </Provider>
    );
  }
}

export default App;
