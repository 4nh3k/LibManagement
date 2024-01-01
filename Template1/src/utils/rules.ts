import * as yup from 'yup';

export const schema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
    .min(5, 'The length of email should be 5 - 255 characters')
    .max(255, 'The length of email should be 5 - 255 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(10, 'The length of password should be 10 - 255 characters')
    .max(255, 'The length of password should be 10 - 255 characters'),
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'The length of username should be 5 - 100 characters')
    .max(100, 'The length of username should be 5 - 100 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password confirmation must match')
    .required('Password confirmation is required')
    .min(10, 'The length of password should be 10 - 255 characters')
    .max(255, 'The length of password should be 10 - 255 characters')
});

export type Schema = yup.InferType<typeof schema>;
