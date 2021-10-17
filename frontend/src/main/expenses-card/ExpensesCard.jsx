import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { updateExpenses } from 'api-state-logic';
import { preventPageRefresh } from 'helpers';
import { LOAN_TYPES, selectMortgageType, setMortgageType } from 'store/charts';
import NormalLoanForm from './mortgage-expense/normal-loan-form/NormalLoanForm';
import SpitzerLoanForm from './mortgage-expense/spitzer-loan-form/SpitzerLoanForm';
import OneTimeExpense from './one-time-expense/OneTimeExpense';
import MonthlyExpense from './monthly-expense/MonthlyExpense';
import './ExpensesCard.css';


function ExpensesCard() {
  const dispatch = useDispatch();
  const type = useSelector(selectMortgageType);
  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    console.log({newValue});
    setTab(newValue);
  };

  function handleTypeChange(event) {
    dispatch(setMortgageType(event.target.value))
  }

  async function handleOnSubmit(event) {
    preventPageRefresh(event);

    await updateExpenses();
    console.log('expenses updated');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderMortgage() {
    return (
      <form onSubmit={handleOnSubmit}>
        {renderTypeSelect()}

        {type === LOAN_TYPES.SPITZER ?
          <SpitzerLoanForm /> :
          <NormalLoanForm />}

        <footer className="submit-btn-container">
          <Button variant="contained" endIcon={<SendIcon />} size="large" type="submit">Submit</Button>
        </footer>
      </form>
    )
  }

  function renderTypeSelect() {
    return (
      <div className="input-container">
        <Typography variant="h6" className="input-label">
          Loan Type:
        </Typography>

        <RadioGroup value={type} onChange={handleTypeChange} row aria-label="loan-type" name="row-radio-buttons-group">
          <FormControlLabel value={LOAN_TYPES.NORMAL} control={<Radio />} label="Normal" />
          <FormControlLabel value={LOAN_TYPES.SPITZER} control={< Radio />} label="Spitzer" />
        </RadioGroup>
      </div>
    )
  }

  return (
    <Card elevation={3} className="expenses-card">
      <Tabs className="tabs" value={tab} onChange={handleChangeTab} aria-label="basic tabs example">
        <Tab label="One Time Expenses" />
        <Tab label="Monthly Expenses" />
        <Tab label="Mortgage" />
      </Tabs>

      <div style={{display: (tab === 0 ? 'initial' : 'none')}}>
        <form onSubmit={handleOnSubmit}>
          <OneTimeExpense />

          <footer className="submit-btn-container">
            <Button variant="contained" endIcon={<SendIcon />} size="large" type="submit">Submit</Button>
          </footer>
        </form>
      </div>

      <div style={{display: (tab === 1 ? 'initial' : 'none')}}>
        <form onSubmit={handleOnSubmit}>
          <MonthlyExpense />

          <footer className="submit-btn-container">
            <Button variant="contained" endIcon={<SendIcon />} size="large" type="submit">Submit</Button>
          </footer>
        </form>
      </div>

      <div style={{display: (tab === 2 ? 'initial' : 'none')}}>
        {renderMortgage()}
      </div>

    </Card>
  )
}

export default ExpensesCard;