
import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Chart from './chart/Chart';
import './ChartCard.css';
import Context from 'context';

function ChartCard() {
  const context = useContext(Context);

  const { propertyId } = context && context.charts;

  return (
    <Card className="chart-card" elevation={3}>
      <Typography className="title" variant="h4">
        Property {propertyId}
      </Typography>

      <Chart />
    </Card>
  )
}

export default ChartCard;