import React, { useEffect, useState } from 'react';
import LoginSignup from './login-signup/LoginSignup';
import Main from './main/Main';
import Context from './context';

import { getCharts, getPropertyExpenses } from './services/api';

const isLoggedIn = true;

function App() {
  const [charts, setCharts] = useState({});
  const [expenses, setExpenses] = useState({});
  
  useEffect(() => {
    getCharts().then(data => {
      setCharts(data);
    });

    console.log('getting property expenses');
    getPropertyExpenses().then(data => {
      setExpenses(data);
      console.log({data});
    })
  }, [])

  return (
    <Context.Provider value={{charts}}>
      {isLoggedIn ? <Main /> : <LoginSignup />}
    </Context.Provider>
  );
}

export default App;
