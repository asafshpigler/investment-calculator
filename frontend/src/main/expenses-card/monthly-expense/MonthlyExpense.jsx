import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import { clone } from "helpers";
import DateInput from "main/expenses-card/inputs/DateInput";
import NumberInput from "main/expenses-card/inputs/NumberInput";
import { addMonthlyExpense, selectMonthlyExpenses, setMonthlyExpenses } from "store/charts";

function MonthlyExpense() {
  const dispatch = useDispatch();

  const monthlyExpenses = useSelector(selectMonthlyExpenses);

  function handleOnChangePaymentDate(i, date) {
    const nextPeriods = clone(monthlyExpenses);
    nextPeriods[i].startDate = date;
    dispatch(setMonthlyExpenses(nextPeriods));
  }

  function handleOnChangePaymentAmount(i, amount) {
    const nextPeriods = clone(monthlyExpenses);
    nextPeriods[i].amount = amount;
    dispatch(setMonthlyExpenses(nextPeriods));
  }

  function handleOnChangePaymentDuration(i, duration) {
    const nextPeriods = clone(monthlyExpenses);
    nextPeriods[i].duration = duration;
    dispatch(setMonthlyExpenses(nextPeriods));
  }

  function handleOnClickDelete(i) {
    const nextPeriods = clone(monthlyExpenses);
    nextPeriods.splice(i, 1);
    dispatch(setMonthlyExpenses(nextPeriods));
  }

  function handleOnClickAdd() {
    dispatch(addMonthlyExpense());
  }

  return (
    <>
      {monthlyExpenses && monthlyExpenses.map((expense, i) => (
        <Card className="expenses-list-card" key={i} elevation={3}>
          {i !== 0 &&
            <IconButton onClick={handleOnClickDelete.bind(null, i)} className="delete-btn" aria-label="delete" color="error">
              <DeleteIcon />
            </IconButton>}

          <DateInput value={expense.startDate} onChange={handleOnChangePaymentDate.bind(null, i)} title="Payment Date" />
          <NumberInput value={expense.amount} onChange={handleOnChangePaymentAmount.bind(null, i)} title="Amount" adornment="$" />
          <NumberInput value={expense.duration} onChange={handleOnChangePaymentDuration.bind(null, i)} title="Duration" />

          {i === monthlyExpenses.length - 1 &&
            <Button onClick={handleOnClickAdd} variant="contained" endIcon={<AddCircleIcon />}>Add Monthly Expense</Button>}
        </Card>
      ))}
    </>
  );
}

export default MonthlyExpense;