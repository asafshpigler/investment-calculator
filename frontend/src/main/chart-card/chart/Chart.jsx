

import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import Context from 'context';

const MultiType = () => {
  const context = useContext(Context);

  const { labels, incomes, oneTimeExpenses, netRevenues, monthlyExpenses, mortgageExpenses } = context && context.charts;

  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Net Revenue',
        data: netRevenues,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
      },
      {
        label: 'Income',
        data: incomes,
        backgroundColor: 'lightgreen',
      },
      {
        label: 'Mortgage',
        data: mortgageExpenses,
        backgroundColor: '#931A25',
      },
      {
        label: 'Monthly',
        data: monthlyExpenses,
        backgroundColor: '#E97171',
      },
      {
        label: 'One Time',
        data: oneTimeExpenses,
        backgroundColor: '#FFCB8E',
      }
    ]
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value) {
            return value + '$';
          }
        }
      }
    },
  }

  return (
    <Bar data={data} options={options} />
  )
}

export default MultiType;