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

import {IS_MOBILE, LOAN_TYPES} from 'const';
import { updateExpenses } from 'controller';
import { preventPageRefresh } from 'helpers';
import { selectMortgageType, setMortgageType } from 'store/charts';
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
    console.log({ newValue });
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

  function ExpenseForm(props) {
    return (
      <form onSubmit={handleOnSubmit}>
        {props.children}

        <footer className="submit-btn-container">
          <Button variant="contained" endIcon={<SendIcon />} size="large" type="submit">Submit</Button>
        </footer>
      </form>
    )
  }

  function TabPanel(props) {
    return (
      <div style={{ display: (tab === props.index ? 'initial' : 'none') }}>
        {props.children}
      </div>
    )
  }

  return (
    <Card elevation={3} className="expenses-card">
      <Tabs className="tabs" value={tab} onChange={handleChangeTab}>
        <Tab label={IS_MOBILE ? "One Time" : "One Time Expenses"} />
        <Tab label={IS_MOBILE ? "Monthly" : "Monthly Expenses"} />
        <Tab label="Mortgage" />
      </Tabs>

      <TabPanel index={0}>
        <ExpenseForm>
          <OneTimeExpense />
        </ExpenseForm>
      </TabPanel>

      <TabPanel index={1}>
        <ExpenseForm>
          <MonthlyExpense />
        </ExpenseForm>
      </TabPanel>

      <TabPanel index={2}>
        <ExpenseForm>
          {renderTypeSelect()}

          {type === LOAN_TYPES.SPITZER ?
            <SpitzerLoanForm /> :
            <NormalLoanForm />}
        </ExpenseForm>
      </TabPanel>

    </Card >
  )
}

export default ExpensesCard;