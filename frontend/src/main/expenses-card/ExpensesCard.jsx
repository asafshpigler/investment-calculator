import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { updateExpenses } from 'api-state-logic';
import { preventPageRefresh } from 'helpers';
import { LOAN_TYPES, selectMortgageType, setMortgageType } from 'store/charts';
import './ExpensesCard.css';
import NormalLoanForm from './mortgage-expense/normal-loan-form/NormalLoanForm';
import SpitzerLoanForm from './mortgage-expense/spitzer-loan-form/SpitzerLoanForm';

function ExpensesCard() {
  const dispatch = useDispatch();
  const type = useSelector(selectMortgageType);

  async function handleOnSubmit(event) {
    preventPageRefresh(event);

    await updateExpenses();
    console.log('expenses updated');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleTypeChange(event) {
    dispatch(setMortgageType(event.target.value))
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
      <Typography variant="h4" className="title">
        Expenses
      </Typography>

      <form onSubmit={handleOnSubmit}>
        {renderTypeSelect()}

        {type === LOAN_TYPES.SPITZER ?
          <SpitzerLoanForm /> :
          <NormalLoanForm />}

        <footer className="submit-btn-container">
          <Button variant="contained" endIcon={<SendIcon />} size="large" type="submit">Submit</Button>
        </footer>
      </form>
    </Card>
  )
}

export default ExpensesCard;