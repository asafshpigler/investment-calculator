
import React, {useState} from 'react';

import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Chart from './chart/Chart';
import './main.css';

function Main() {
  const [chartYear, setChartYear] = useState('');

  const handleChange = (event) => {
    setChartYear(event.target.value);
  };

  const PROPERTY_YEARS = [2018, 2019, 2020]

  return (
    <>
      <header className="header">
        <Typography className="title" variant="h4">
          Property {'{'}ID{'}'} in 2018
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="select-year-label">Year</InputLabel>
          <Select
            label="Year"
            labelId="select-year-label"
            id="select-yeear"
            onChange={handleChange}
            value={chartYear}
          >
            {PROPERTY_YEARS.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </header>

      <Chart />
    </>
  );
}

export default Main

// export default function BasicSelect() {
//   const [age, setAge] = React.useState('');

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };

//   return (
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Age</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={age}
//           label="Age"
//           onChange={handleChange}
//         >
//           <MenuItem value={10}>Ten</MenuItem>
//           <MenuItem value={20}>Twenty</MenuItem>
//           <MenuItem value={30}>Thirty</MenuItem>
//         </Select>
//       </FormControl>
//   );
// }
