import React from 'react';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectSession } from 'store/session';
import { logout } from 'api-state-logic';
import { useHistory } from 'react-router';
import { IS_MOBILE } from 'const';

function Header() {
  const isLoggedIn = useSelector(selectSession);
  const history = useHistory();

  function handleLogout() {
    logout().then(() => {
      history.push('/login');
    })
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {IS_MOBILE ? 'I-Calc' : 'Investment Calculator'}
        </Typography>

        {isLoggedIn && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  )
}

export default Header;