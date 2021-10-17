import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';

function NumberInput(props) {
  function handleOnChange(event) {
    props.onChange(+event.target.value);
  }

  return (
    <div className="input-container">
    <Typography variant="h6" className="input-label">
      {props.title}:
    </Typography>

    <OutlinedInput
      type="number"
      value={props.value}
      onChange={handleOnChange}
      startAdornment={props.adornment && <InputAdornment position="start">{props.adornment}</InputAdornment>}
    />
  </div>
  )
}

export default NumberInput;