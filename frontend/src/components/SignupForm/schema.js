import * as yup from 'yup';

export const validationSchema = yup
  .object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Minimum 8 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .min(8, 'Minimum 8 characters')
      .required('Confirm Password is required')
      .oneOf([yup.ref('password'), null], 'Passwords should match'),
  })
  .required();

export const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
