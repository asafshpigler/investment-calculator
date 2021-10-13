import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';
import { preventPageRefresh } from '../helpers';
import './LoginSignup.css';
import { useHistory } from 'react-router';
import { userLogin, signup } from 'api-state-logic';

const LOGIN = 'LOGIN';
const SIGN_UP = 'SIGN_UP';

function LoginSignup() {
  const [userMode, setUserMode] = useState(LOGIN);
  const [userName, setUserName] = useState('');
  const [showBadLoginMsg, setShowBadLogin] = useState(false);
  const history = useHistory();

  function handleSubmit(event) {
    preventPageRefresh(event);

    switch (userMode) {
      case LOGIN:
        userLogin(userName)
          .then(() => {
            history.push("/");
          })
          .catch((e) => {
            setShowBadLogin(true);
          });

        break;

      case SIGN_UP:
        signup(userName)
          .then(() => {
            history.push('/');
          });

        break;
      default:
        throw new Error('code error, invalid userMode')
    }
  }

  function toggleUserMode() {
    setUserMode(userMode === LOGIN ? SIGN_UP : LOGIN);
  }

  function handleChange(event) {
    setUserName(event.target.value);

    if (showBadLoginMsg) {
      setShowBadLogin(false);
    }
  }

  return (
    <div className="login-signup">
      <Typography className="title" variant="h4">
        {userMode === LOGIN ? 'Login' : 'Sign up'}
      </Typography>

      <form className="form" onSubmit={handleSubmit}>
        <TextField onChange={handleChange} value={userName} className="form-input" required label="User Id" />

        <div className="btn-container">
          <Button onClick={toggleUserMode}>
            {userMode === LOGIN ? 'Sign up' : 'Login'}
          </Button>
          <Button variant="contained" type="submit">Go!</Button>
        </div>
      </form>

      {showBadLoginMsg && (
        <div className="error-container">
          <span className="error-msg">User Doesn't Exist</span>
          <WarningIcon />
        </div>
      )}
    </div>
  )
}

export default LoginSignup