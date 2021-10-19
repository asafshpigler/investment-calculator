
import React from 'react';
import ChartCard from './chart-card/ChartCard';
import ExpensesForm from './expenses-card/ExpensesCard';
import PropertyAnnualFigures from './property-annual-figures/PropertyAnnualFigures';
import './Main.css';

function Main() {

  
  return (
    <main className="main">
      <div className="chart-and-figures-container">
        <ChartCard />
        <PropertyAnnualFigures />
      </div>

      <ExpensesForm />
    </main>
  );
}

export default Main