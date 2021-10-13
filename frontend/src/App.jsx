import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from 'header/Header';
import LoginSignup from './login-signup/LoginSignup';
import Main from './main/Main';
import { selectSession } from 'store/session';

function App() {
  const isUserLoggedIn = useSelector(selectSession);

  function renderMainIfLoggedIn() {
    return isUserLoggedIn === true ? <Main /> : <Redirect to='/login' />
  }

  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/login"><LoginSignup /></Route>
        <Route path="/" render={renderMainIfLoggedIn}></Route>
      </Switch>
    </Router>
  );
}

export default App;
