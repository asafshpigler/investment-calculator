import React from 'react';
import Login from './login/Login';
import Main from './main/Main';

const isLoggedIn = true;

function App() {
  return (
    <>
      {isLoggedIn ? <Main /> : <Login />}
    </>
  );
}

export default App;
