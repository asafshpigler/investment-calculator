
import React, { useContext } from 'react';
import Paper from '@mui/material/Paper';
import ChartCard from './chart-card/ChartCard';
import './Main.css';
import ExpensesForm from './expenses-card/ExpensesCard';
import Context from 'context';


function Main() {
  const context = useContext(Context);
  const { avgAnnualIncome, avgAnnualExpense, avgAnnualProfit } = context && context.charts;
  
  const propertyNumbers = [
    {
      txt: 'Avg Annual Income',
      number: (avgAnnualIncome || '').toLocaleString(),
      className: 'income',
    },
    {
      txt: 'Avg Annual Expense',
      number: (avgAnnualExpense || '').toLocaleString(),
      className: 'expense',
    },
    {
      txt: 'Avg Annual Profit',
      number: (avgAnnualProfit || '').toLocaleString(),
      className: 'profit',
    }
  ]
  
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