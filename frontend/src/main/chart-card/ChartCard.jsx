
import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Chart from './chart/Chart';
import './ChartCard.css';

function ChartCard() {
  return (
    <Card className="chart-card" elevation={3}>
      <Typography className="title" variant="h4">
        Property {'{'}ID{'}'} in
      </Typography>

      <Chart />
    </Card>
  )
}

export default ChartCard;