import React from "react";
import { useSelector } from "react-redux";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { selectMortgageAmount, selectMortgageDuration, selectMortgageLoanRate, selectMortgageStartDate, setMortgageAmount, setMortgageDuration, setMortgageLoanRate, setMortgageStartDate } from "store/charts";
import './SpitzerLoanForm.css';
import { useDispatch } from "react-redux";
import DateInput from "main/expenses-card/inputs/DateInput";
import NumberInput from "main/expenses-card/inputs/NumberInput";

const LOAN_RATE_TICKS = [
  { value: 0, label: '0' },
  { value: 1, label: '1%' },
  { value: 2, label: '2%' },
  { value: 3, label: '3%' },
  { value: 4, label: '4%' },
  { value: 5, label: '5%' },
]

function SpitzerLoanForm() {
  const dispatch = useDispatch();

  const startDate = useSelector(selectMortgageStartDate);
  const amount = useSelector(selectMortgageAmount);
  const duration = useSelector(selectMortgageDuration);
  const loanRate = useSelector(selectMortgageLoanRate);

  function handleOnChangeDate(date) {
    dispatch(setMortgageStartDate(date));
  }

  function handleOnChangeAmount(amount) {
    dispatch(setMortgageAmount(amount));
  }

  function handleOnChangeDuration(duration) {
    dispatch(setMortgageDuration(duration));
  }

  function handleOnChangeLoanRate(event) {
    dispatch(setMortgageLoanRate(event.target.value));
  }

  function renderLoanRate() {
    return (
      <div className="input-container loan-rate-container">
        <Typography variant="h6" className="input-label loan-rate-label">
          Loan Rate (Percentage):
        </Typography>

        <Slider
          className="loan-rate-slider"
          value={loanRate}
          onChange={handleOnChangeLoanRate}
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
    <>
      <DateInput value={startDate} onChange={handleOnChangeDate} title="Start Date" label="Loan Start Date" />
      <NumberInput value={amount} onChange={handleOnChangeAmount} title="Amount" adornment="$" />
      <NumberInput value={duration} onChange={handleOnChangeDuration} title="Duration (Months)" />
      {renderLoanRate()}
    </>
  );
}

export default SpitzerLoanForm;