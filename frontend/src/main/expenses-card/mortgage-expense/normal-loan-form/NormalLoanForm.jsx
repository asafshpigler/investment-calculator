import React from "react";
import { useSelector } from "react-redux";
import { addPaymentPeriod, selectMortgageAmount, selectMortgagePaymentPeriods, selectMortgageStartDate, setMortgageAmount, setMortgageDuration, setMortgageLoanRate, setMortgagePaymentPeriods, setMortgageStartDate } from "store/charts";
import { useDispatch } from "react-redux";
import DateInput from "main/expenses-card/inputs/DateInput";
import NumberInput from "main/expenses-card/inputs/NumberInput";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { clone } from "helpers";

function NormalLoanForm() {
  const dispatch = useDispatch();

  const startDate = useSelector(selectMortgageStartDate);
  const amount = useSelector(selectMortgageAmount);
  const paymentPeriods = useSelector(selectMortgagePaymentPeriods);

  function handleOnChangeDate(date) {
    dispatch(setMortgageStartDate(date));
  }

  function handleOnChangeAmount(amount) {
    dispatch(setMortgageAmount(amount));
  }

  function handleOnChangePaymentPeriods(paymentPeriods) {
    dispatch(setMortgagePaymentPeriods(paymentPeriods));
  }

  function handleOnChangePaymentDuration(i, duration) {
    const nextPeriods = clone(paymentPeriods);
    nextPeriods[i].duration = duration;
    dispatch(setMortgagePaymentPeriods(nextPeriods));
  }

  function handleOnChangePaymentAmount(i, amount) {
    const nextPeriods = clone(paymentPeriods);
    nextPeriods[i].amount = amount;
    dispatch(setMortgagePaymentPeriods(nextPeriods));
  }

  function handleOnClickDelete(i) {
    const nextPeriods = clone(paymentPeriods);
    nextPeriods.splice(i, 1);
    dispatch(setMortgagePaymentPeriods(nextPeriods));
  }

  function handleOnClickAdd() {
    dispatch(addPaymentPeriod());
  }

  return (
    <>
      <DateInput value={startDate} onChange={handleOnChangeDate} title="Start Date" label="Loan Start Date" />
      <NumberInput value={amount} onChange={handleOnChangeAmount} title="Amount" />

      {paymentPeriods && paymentPeriods.map((period, i) => (
        <Card className="expenses-list-card" key={i} elevation={3}>
          {i !== 0 &&
            <IconButton onClick={handleOnClickDelete.bind(null, i)} className="delete-btn" aria-label="delete" color="error">
              <DeleteIcon />
            </IconButton>}

          <NumberInput value={period.duration} onChange={handleOnChangePaymentDuration.bind(null, i)} title="Duration (Months)" />
          <NumberInput value={period.amount} onChange={handleOnChangePaymentAmount.bind(null, i)} title="Amount" adornment="$" />
          {i === paymentPeriods.length - 1 &&
            <Button onClick={handleOnClickAdd} variant="contained" endIcon={<AddCircleIcon />}>Add Payment Period</Button>}
        </Card>
      ))}
    </>
  );
}

export default NormalLoanForm;