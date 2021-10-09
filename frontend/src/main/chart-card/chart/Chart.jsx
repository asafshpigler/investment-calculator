

import React from 'react';
import { Bar } from 'react-chartjs-2';

const rand = () => Math.round(Math.random() * 20 - 10)

const SHORTHAND_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec', 'Nov', 'Dec']

const INCOME_DATASET = {
  type: 'line',
  label: 'Income',
  borderColor: 'rgb(54, 162, 235)',
  borderWidth: 2,
  fill: false,
  data: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
}

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

const data = {
  labels: SHORTHAND_MONTHS,
  datasets: [
    INCOME_DATASET,
    EXPENSES_DATASET,
    NET_REVENUE_DATASET
  ]
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

const MultiType = () => (
  <Bar data={data} options={options} />
)

export default MultiType;