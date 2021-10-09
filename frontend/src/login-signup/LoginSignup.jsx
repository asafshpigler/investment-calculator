import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { preventPageRefresh } from '../helpers';
import './LoginSignup.css';

const LOGIN = 'LOGIN';
const SIGN_UP = 'SIGN_UP';

function LoginSignup() {
  const [userMode, setUserMode] = useState(LOGIN);

  function onSubmit(event) {
    preventPageRefresh(event);

    switch (userMode) {
      case LOGIN:
        handleUserLogin();
        break;
      case SIGN_UP:
        handleUserSignUp();
        break;
      default:
        throw new Error('code error, invalid userMode')
    }
  }

  function handleUserLogin() { }

  function handleUserSignUp() { }

  function toggleUserMode() {
    setUserMode(userMode === LOGIN ? SIGN_UP : LOGIN);
  }


  return (
    <div className="login-signup">
      <Typography className="title" variant="h4">
        {userMode === LOGIN ? 'Login' : 'Sign up'}
      </Typography>

      <form className="form" onSubmit={onSubmit}>
        <TextField className="form-input" required label="User Id" />

        <div className="btn-container">
          <Button onClick={toggleUserMode}>
            {userMode === LOGIN ? 'Sign up' : 'Login'}
          </Button>
          <Button variant="contained" type="submit">Go!</Button>
        </div>
      </form>
    </div>
  )
}

export default LoginSignup