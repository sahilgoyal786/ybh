import * as yup from 'yup';

export const SignupValidationSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email Address is Required'),
  name: yup.string().required('Username is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const LoginValidationSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email Address is Required'),
  password: yup.string().required('Password is required'),
});

export const SetPasswordValidationSchema = yup.object({
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const UpdatePasswordValidationSchema = yup.object({
  current_password: yup.string().required('Password is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const UpdateProfileValidationSchema = yup.object({
  username: yup.string().required('Name is required'),
  email: yup.string().required('Email is required'),
});
