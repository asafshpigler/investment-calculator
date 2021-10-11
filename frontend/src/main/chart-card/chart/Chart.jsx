

import React, { useContext, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Context from 'context';

const rand = () => Math.round(Math.random() * 20 - 10)

const EXPENSES_DATASET = {
  type: 'line',
  label: 'Expenses',
  backgroundColor: 'rgb(75, 192, 192)',
  data: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
}

const NET_REVENUE_DATA = [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()]
const NET_REVENUE_COLORS = createRevenueColors(NET_REVENUE_DATA)
const NET_REVENUE_DATASET = {
  type: 'bar',
  label: 'Net Revenue',
  backgroundColor: NET_REVENUE_COLORS,
  data: NET_REVENUE_DATA,
  borderColor: 'white',
  borderWidth: 2,
}

function createRevenueColors(nums) {
  return nums.map(num => num > 0 ? 'green' : 'red');
}

const options = {
  scales: {
    y: {
      ticks: {
          // Include a dollar sign in the ticks
          callback: function(value) {
              return value + '$';
          }
      }
    }
  }
}

const MultiType = () => {
  const context = useContext(Context);

  console.log(context);

  const INCOME_DATASET = {
    type: 'line',
    label: 'Income',
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 2,
    fill: false,
    data: context && context.charts && context.charts.incomes,
  }

  const data = {
    labels: context && context.charts && context.charts.labels,
    datasets: [
      INCOME_DATASET,
      EXPENSES_DATASET,
      NET_REVENUE_DATASET
    ]
  }

  return (
    <Bar data={data} options={options} />
  )
}

export default MultiType;