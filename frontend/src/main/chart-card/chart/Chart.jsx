

import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import Context from 'context';

const MultiType = () => {
  const context = useContext(Context);

  const { labels, incomes, oneTimeExpenses, netRevenues } = context && context.charts;

  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Net Revenue',
        data: netRevenues,
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 2,
      },
      {
        label: 'income',
        data: incomes,
        backgroundColor: 'lightgreen',
      },
      {
        label: 'expense',
        data: oneTimeExpenses,
        backgroundColor: 'lightcoral',
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