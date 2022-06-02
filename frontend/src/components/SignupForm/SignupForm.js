import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Stack,
  Typography,
  Button,
  Alert,
  Link,
  CircularProgress,
} from '@mui/material';
import { validationSchema, defaultValues } from './schema';
import { FormTextField } from '../FormTextField';

const SignupForm = ({ signup, loading, error }) => {
  const { control, handleSubmit } = useForm({
    mode: 'onChange', // validations will run onChange of the fields
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = ({ firstName, lastName, email, password }) => {
    signup({
      variables: { formData: { firstName, lastName, email, password } },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate={true}>
      <Stack spacing={1} alignItems="center">
        <Typography variant="h5" gutterBottom={true}>
          Signup Form
        </Typography>

        <FormTextField name="firstName" label="First Name" control={control} />
        <FormTextField name="lastName" label="Last Name" control={control} />
        <FormTextField name="email" label="Email" control={control} />
        <FormTextField
          name="password"
          label="Password"
          control={control}
          type="password"
        />
        <FormTextField
          name="confirmPassword"
          label="Confirm Password"
          control={control}
          type="password"
        />

        {loading && <CircularProgress />}

        {error && <Alert severity="error">{error.message}</Alert>}

        <Stack direction="row" spacing={1} alignItems="center">
          <Button type="submit" variant="contained" disabled={loading}>
            Signup
          </Button>

          <Typography variant="subtitle2" gutterBottom={true}>
            or
          </Typography>

          <Link component={RouterLink} variant="body2" to="/signin">
            signin
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SignupForm;
