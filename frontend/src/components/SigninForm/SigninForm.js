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

const SigninForm = ({ signin, loading, error }) => {
  const { control, handleSubmit } = useForm({
    mode: 'onChange', // validations will run onChange of the fields
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (formData) => {
    signin({
      variables: { formData },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate={true}>
      <Stack spacing={1} alignItems="center">
        <Typography variant="h5" gutterBottom={true}>
          Signin Form
        </Typography>

        <FormTextField name="email" label="Email" control={control} />
        <FormTextField
          name="password"
          label="Password"
          control={control}
          type="password"
        />

        {loading && <CircularProgress />}

        {error && <Alert severity="error">{error.message}</Alert>}

        <Stack direction="row" spacing={1} alignItems="center">
          <Button type="submit" variant="contained" disabled={loading}>
            Signin
          </Button>

          <Typography variant="subtitle2" gutterBottom={true}>
            or
          </Typography>

          <Link component={RouterLink} variant="body2" to="/signup">
            signup
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SigninForm;
