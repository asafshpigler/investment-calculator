import React, { useEffect, useState } from 'react';
import LoginSignup from './login-signup/LoginSignup';
import Main from './main/Main';
import Context from './context';

import { getCharts } from './services/api';

const isLoggedIn = true;

function App() {
  const [charts, setCharts] = useState({});
  
  useEffect(() => {
    getCharts().then(data => {
      setCharts(data);
    });
  }, [])

  return (
    <Context.Provider value={{charts}}>
      {isLoggedIn ? <Main /> : <LoginSignup />}
    </Context.Provider>
  );
}

export default App;
