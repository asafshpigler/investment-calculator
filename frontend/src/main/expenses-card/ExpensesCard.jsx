import React, { useState } from "react";

import { v4 as uuidv4 } from 'uuid';
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AdapterDateMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { preventPageRefresh } from "../../helpers";
import './ExpensesCard.css';

const LOAN_TYPES = {
  NORMAL: 'NORMAL',
  SPITZER: 'SPITZER',
}

const LOAN_RATE_TICKS = [
  { value: 0, label: '0' },
  { value: 1, label: '1%' },
  { value: 2, label: '2%' },
  { value: 3, label: '3%' },
  { value: 4, label: '4%' },
  { value: 5, label: '5%' },
]

const DEFAULT_PAYMENT_PERIODS = [
  { duration: 3, loanRate: 4.5 },
  { duration: 1, loanRate: 1.2 },
]

function ExpensesCard() {
  const [loanType, setLoanType] = useState(LOAN_TYPES.SPITZER);
  // const [startDate, setStartDate] = useState();
  // const [amount, setAmount] = useState(0);

  // normal loan state
  const [paymentPeriods, setPaymentPeriods] = useState(DEFAULT_PAYMENT_PERIODS);

  // spitzer loan state
  // const [monthsDuration, setMonthsDuration] = useState(48);
  // const [interestRate, setInterestRate] = useState(0.5);

  function handleLoanTypeChange(event) {
    setLoanType(event.target.value);
  }

  function renderLoanType() {
    return (
      <div className="input-container">
        <Typography variant="h6" className="input-label">
          Loan Type:
        </Typography>

        <RadioGroup value={loanType} onChange={handleLoanTypeChange} row aria-label="loan-type" name="row-radio-buttons-group">
          <FormControlLabel value={LOAN_TYPES.NORMAL} control={<Radio />} label="Normal" />
          <FormControlLabel value={LOAN_TYPES.SPITZER} control={< Radio />} label="Spitzer" />
        </RadioGroup>
      </div>
    )
  }

  function renderDatePicker() {
    return (
      <div className="input-container">
        <Typography variant="h6" className="input-label">
          Start Date:
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDateMoment}>
          <DatePicker
            // label="Loan Start Date"
            // value={value}
            // onChange={(newValue) => {
            //   setValue(newValue);
            // }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    )
  }

  function renderAmount() {
    return (
      <div className="input-container">
        <Typography variant="h6" className="input-label">
          Amount:
        </Typography>

        <OutlinedInput
          // id="outlined-adornment-amount"
          type="number"
          // value={values.amount}
          // onChange={handleChange('amount')}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        // label="Amount"
        />
      </div>
    )
  }

  function renderCustomInputs() {
    switch (loanType) {
      case LOAN_TYPES.NORMAL:
        return renderNormalLoanInputs();
      case LOAN_TYPES.SPITZER:
        return renderSpitzerLoanInputs();
      default:
        throw new Error('unexpected loan type, invalid value');
    }
  }

  function addPaymentPeriod() {
    setPaymentPeriods([...paymentPeriods, { duration: 3, loanRate: 1.5 }])
  }

  function renderNormalLoanInputs() {
    return (
      <>
        {paymentPeriods.map(({ duration, loanRate }) => (
          <Card key={uuidv4()} className="payment-period">
            {renderDuration()}
            {renderLoanRate()}
          </Card>
        ))}

        <Button onClick={addPaymentPeriod} variant="contained" endIcon={<AddCircleIcon />}>Add Payment Period</Button>
      </>
    )
  }

  function renderSpitzerLoanInputs() {
    return (
      <>
        {renderDuration()}
        {renderLoanRate()}
      </>
    )
  }

  function renderDuration() {
    return (
      <div className="input-container">
        <Typography variant="h6" className="input-label">
          Duration (Months):
        </Typography>

        <OutlinedInput
          type="number"
        // id="outlined-adornment-amount"
        // value={values.amount}
        // onChange={handleChange('amount')}
        // label="Amount"
        />

      </div>
    )
  }

  function renderLoanRate() {
    return (
      <div className="input-container loan-rate-container">
        <Typography variant="h6" className="input-label loan-rate-label">
          Loan Rate (Percentage):
        </Typography>

        <Slider
          className="loan-rate-slider"
          defaultValue={1.5}
          step={0.1}
          min={0}
          max={5}
          marks={LOAN_RATE_TICKS}
          valueLabelDisplay="on"
        />
      </div>
    )
  }

  return (
    <Card elevation={3} className="expenses-card">
      <Typography variant="h4" className="title">
        Expenses
      </Typography>

      <form onSubmit={preventPageRefresh}>
        {/* shared inputs across loan types */}
        {renderLoanType()}
        {renderDatePicker()}
        {renderAmount()}

        {/* custom inputs per loan type */}
        {renderCustomInputs()}

        <footer className="submit-btn-container">
          <Button variant="contained" endIcon={<SendIcon />} size="large" type="submit">Submit</Button>
        </footer>
      </form>
    </Card>
  );
}

export default ExpensesCard;