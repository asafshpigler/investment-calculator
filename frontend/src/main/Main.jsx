
import React from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ChartCard from './chart-card/ChartCard';
import ExpensesForm from './expenses-card/ExpensesCard';
import { selectCurrentChart } from 'store/charts';
import './Main.css';

function Main() {
  const currentChart = useSelector(selectCurrentChart);
  const { avgAnnualIncome, avgAnnualExpense, avgAnnualProfit } = currentChart;
  
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
              <Typography variant="h5">
                {data.txt} <br />
                <span className="number">{data.number}</span>
              </Typography>
            </Paper>
          ))}
        </div>
      </div>

      <ExpensesForm />
    </main>
  );
}

export default Main