import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './components/dashboard';
import Login from './components/login';
import Messages from './components/messages';
import DirMessage from './components/directMessage';
import Thread from './components/thread';
import NavBar from './components/navbar';
import Signup from './components/signUp';

function App() {
  const [state, updateState] = useState({
    userId: '',
    status: false,
  });

  return (
    <div>
      <NavBar/>
      <Switch>
        <Route exact path='/'>
          <Dashboard />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route exact path='/messages'>
          <Messages user={userId}/>
        </Route>
        <Route path='/messages/:id'>
          <DirMessage />
        </Route>
        <Route path='/thread/:id'>
          <Thread />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
