
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import Chart from './chart/Chart';
import './ChartCard.css';

const PROPERTY_YEARS = [2018, 2019, 2020]

function ChartCard() {
  const [chartYear, setChartYear] = useState(PROPERTY_YEARS[0]);

  const handleChange = (event) => {
    setChartYear(event.target.value);
  };

  return (
    <Card className="chart-card" elevation={3}>
      <header className="header">
        <Typography className="title" variant="h4">
          Property {'{'}ID{'}'} in
        </Typography>

        <FormControl>
          <InputLabel id="select-year-label">Year</InputLabel>
          <Select
            label="Year"
            labelId="select-year-label"
            id="select-yeear"
            onChange={handleChange}
            value={chartYear}
          >
            {PROPERTY_YEARS.map((year, i) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </header>

      <Chart />
    </Card>
  )
}

export default ChartCard;