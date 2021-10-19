import React from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { selectPropertyAnnualFigures } from 'store/charts';
import './PropertyAnnualFigures.css';

function PropertyAnnualFigures() {
  const annualFigures = useSelector(selectPropertyAnnualFigures);
  const { avgAnnualIncome, avgAnnualExpense, avgAnnualProfit } = annualFigures;

  const propertyNumbers = [
    {
      txt: 'Avg Annual Income',
      number: (avgAnnualIncome || '').toLocaleString(),
      backgroundColor: 'aquamarine',
    },
    {
      txt: 'Avg Annual Expense',
      number: (avgAnnualExpense || '').toLocaleString(),
      backgroundColor: 'lightcoral',
    },
    {
      txt: 'Avg Annual Profit',
      number: (avgAnnualProfit || '').toLocaleString(),
      backgroundColor: 'lightskyblue',
    }
  ]

  return (
    <div className="property-figures-container">
      {propertyNumbers.map(data => (
        <Paper
          key={data.txt}
          className="property-figure"
          style={{ backgroundColor: data.backgroundColor }}
        >
          <Typography variant="h5" className="txt">
            <span>{data.txt}</span>
            <span className="number">{data.number}</span>
          </Typography>
        </Paper>
      ))}
    </div>
  );
}

export default PropertyAnnualFigures;