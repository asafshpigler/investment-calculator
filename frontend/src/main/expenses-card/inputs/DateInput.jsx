import React from 'react';
import Typography from '@mui/material/Typography';
import AdapterDateMoment from '@mui/lab/AdapterMoment';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from "@mui/material/TextField";

function DateInput(props) {
  function handleOnChange(dateMomentFormat) {
    const date = dateMomentFormat.format('YYYY-MM-DD');
    props.onChange(date);
  }

  return (
    <div className="input-container">
      <Typography variant="h6" className="input-label">
        {props.title}:
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateMoment}>
        <DatePicker
          label={props.label}
          value={props.value}
          onChange={handleOnChange}
          inputFormat="DD/MM/YYYY"
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  )
}

export default DateInput;