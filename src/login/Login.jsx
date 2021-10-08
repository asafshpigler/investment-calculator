import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './Login.css';

function Login() {
  return (
    <div className="login">
      <Typography className="title" variant="h4">
        Login
      </Typography>

      <form className="form" onSubmit={handleOnSubmit}>
        <TextField className="form__input" required label="User Id" variant="filled" />
        <Button variant="contained" type="submit">Go!</Button>
      </form>
    </div>
  )
}

function handleOnSubmit(event) {
// prevent default page refresh on form submission
  event.preventDefault();
}

export default Login