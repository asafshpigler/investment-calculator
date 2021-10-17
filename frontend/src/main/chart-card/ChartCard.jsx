
import React from 'react';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { setChartByPropertyId } from 'api-state-logic';
import { selectCurrentChart, selectPropertyIds } from 'store/charts';
import Chart from './chart/Chart';
import './ChartCard.css';

function ChartCard() {
  const currentChart = useSelector(selectCurrentChart);
  const propertyIds = useSelector(selectPropertyIds);
  
  function handleOnChange(event) {
    setChartByPropertyId(event.target.value);
  }

  return (
    <Card className="chart-card" elevation={3}>
      <Typography className="title" variant="h4">
        Property
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="select-property-id">Property ID</InputLabel>
        <Select
          labelId="select-property-id"
          id="select-id"
          label="PropertyId"
          value={currentChart.propertyId || ''}
          onChange={handleOnChange}
        >
          {propertyIds.map(id => (
            <MenuItem key={id} value={id}>{id}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Chart />
    </Card>
  )
}

export default ChartCard;
