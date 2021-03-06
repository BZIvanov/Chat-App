import * as yup from 'yup';

export const validationSchema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

export const defaultValues = {
  email: '',
  password: '',
};
