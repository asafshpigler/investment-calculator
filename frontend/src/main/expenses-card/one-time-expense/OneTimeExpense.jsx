import React from "react";
import { useSelector } from "react-redux";
import { addOneTimeExpense, setOneTimeExpenses, selectMortgageAmount, selectMortgagePaymentPeriods, selectMortgageStartDate, selectOneTimeExpenses, setMortgageAmount, setMortgageDuration, setMortgageLoanRate, setMortgagePaymentPeriods, setMortgageStartDate } from "store/charts";
import { useDispatch } from "react-redux";
import DateInput from "main/expenses-card/inputs/DateInput";
import NumberInput from "main/expenses-card/inputs/NumberInput";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { clone } from "helpers";

function OneTimeExpense() {
  const dispatch = useDispatch();

  const oneTimeExpenses = useSelector(selectOneTimeExpenses);

  function handleOnChangePaymentDate(i, date) {
    const nextPeriods = clone(oneTimeExpenses);
    nextPeriods[i].paymentDate = date;
    console.log({i, date, nextPeriods});
    dispatch(setOneTimeExpenses(nextPeriods));
  }

  function handleOnChangePaymentAmount(i, amount) {
    const nextPeriods = clone(oneTimeExpenses);
    nextPeriods[i].amount = amount;
    dispatch(setOneTimeExpenses(nextPeriods));
  }

  function handleOnClickDelete(i) {
    const nextPeriods = clone(oneTimeExpenses);
    nextPeriods.splice(i, 1);
    dispatch(setOneTimeExpenses(nextPeriods));
  }

  function handleOnClickAdd() {
    dispatch(addOneTimeExpense());
  }

  return (
    <>
      {oneTimeExpenses && oneTimeExpenses.map((expense, i) => (
        <Card className="expenses-list-card" key={i} elevation={3}>
          {i !== 0 &&
            <IconButton onClick={handleOnClickDelete.bind(null, i)} className="delete-btn" aria-label="delete" color="error">
              <DeleteIcon />
            </IconButton>}

          <DateInput value={expense.paymentDate} onChange={handleOnChangePaymentDate.bind(null, i)} title="Payment Date" />
          <NumberInput value={expense.amount} onChange={handleOnChangePaymentAmount.bind(null, i)} title="Amount" adornment="$" />

          {i === oneTimeExpenses.length - 1 &&
            <Button onClick={handleOnClickAdd} variant="contained" endIcon={<AddCircleIcon />}>Add One Time Expense</Button>}
        </Card>
      ))}
    </>
  );
}

export default OneTimeExpense;