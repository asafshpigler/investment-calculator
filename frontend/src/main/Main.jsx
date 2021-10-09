
import React from 'react';
import Paper from '@mui/material/Paper';
import ChartCard from './chart-card/ChartCard';
import './Main.css';
import ExpensesForm from './expenses-card/ExpensesCard';

const AVG_ANNUAL_INCOME = 18000;
const AVG_ANNUAL_EXPENSE = 9000;
const AVG_ANNUAL_PROFIT = AVG_ANNUAL_INCOME - AVG_ANNUAL_EXPENSE;

const propertyNumbers = [
  {
    txt: 'Avg Annual Income',
    number: AVG_ANNUAL_INCOME,
    className: 'income',
  },
  {
    txt: 'Avg Annual Expense',
    number: AVG_ANNUAL_EXPENSE,
    className: 'expense',
  },
  {
    txt: 'Avg Annual Profit',
    number: AVG_ANNUAL_PROFIT,
    className: 'profit',
  }
]


function Main() {
  return (
    <main className="main">
      <div className="chart-and-numbers-container">
        <ChartCard />

        <div className="property-numbers-container">
          {propertyNumbers.map(data => (
            <Paper key={data.txt} className={`property-number ${data.className}`}>
              {data.txt} <br />
              <span className="number">{data.number}</span>
            </Paper>
          ))}
        </div>
      </div>

      <ExpensesForm />
    </main>
  );
}

export default Main