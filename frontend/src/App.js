import React from 'react';
import LoginSignup from './login-signup/LoginSignup';
import Main from './main/Main';

import { getUsers } from './services/api';

const isLoggedIn = true;
getUsers();

function App() {
  return (
    <>
      {isLoggedIn ? <Main /> : <LoginSignup />}
    </>
  );
}

export default App;
