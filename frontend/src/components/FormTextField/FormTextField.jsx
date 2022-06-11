import { Controller } from 'react-hook-form';
import { FormControl, TextField } from '@mui/material';
import propTypes from './propTypes';

const FormTextField = ({ name, label, type = 'text', control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl sx={{ minWidth: { xs: '280px', sm: '320px' } }}>
            <TextField
              label={label}
              variant="standard"
              inputProps={{ ...field, type }}
              error={fieldState.isTouched && Boolean(fieldState.error)}
              helperText={fieldState.isTouched && fieldState.error?.message}
            />
          </FormControl>
        );
      }}
    />
  );
};

FormTextField.propTypes = propTypes;

export default FormTextField;
