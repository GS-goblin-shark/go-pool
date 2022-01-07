import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './components/dashboard';
import Login from './components/login';
import Messages from './components/messages';
import DirMessage from './components/directMessage';
import Thread from './components/thread';
import NavBar from './components/navbar';
import Signup from './components/signUp';
import Home from './components/Home'

function App() {

  const loggedIn = sessionStorage.getItem('loggedIn')

  if(!loggedIn){
    return(
      <div>
        <NavBar/>
        <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route><Login/></Route>
        </Switch>
      </div>
    )
  }
  else{
    return(
      <div>
        <NavBar/>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route exact path='/messages'>
          <Messages />
        </Route>
        <Route path='/messages/:id'>
          <DirMessage />
        </Route>
        <Route path='/thread/:id'>
          <Thread />
        </Route>
      </div>
    )
  }
}

export default App;
