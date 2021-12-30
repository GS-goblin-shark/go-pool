/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Messages from './components/Messages';

function App() {
  const [state, updateState] = useState({
    userId: '',
    status: false,
  });

  return (
    <Switch>
      <Route exact path='/'>
        <Dashboard />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      {/* <Route path='/signup'>
        <Signup />
      </Route> */}
      <Route path='/messages'>
        <Messages />
      </Route>
    </Switch>
  );
}

export default App;
