import React, { useEffect, useState } from 'react';
import LoginSignup from './login-signup/LoginSignup';
import Main from './main/Main';
import Context from './context';
import _get from 'lodash/get';

import { getCharts } from './services/api';

const isLoggedIn = true;

function App() {
  const [charts, setCharts] = useState({});
  const [expenses, setExpenses] = useState({});
  
  useEffect(() => {
    getCharts().then(chart => {
      setCharts(chart);
    });
  }, [])

  return (
    <Context.Provider value={{charts}}>
      {isLoggedIn ? <Main /> : <LoginSignup />}
    </Context.Provider>
  );
}

export default App;
