import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(20, 'Name must be at most 20 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email')
    .max(64, 'Email must be at most 64 characters')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is required'),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .max(64, 'Email must be at most 64 characters')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is required'),
});

export const bookLessonSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be at most 50 characters')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Invalid email')
    .max(64, 'Email must be at most 64 characters')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(
      /^\+?[0-9]{10,15}$/,
      'Invalid phone number (e.g., +380XXXXXXXXX, 0XXXXXXXXX)'
    )
    .max(20, 'Phone number must be at most 20 characters')
    .required('Phone number is required'),
  reason: yup.string().required('Please select a reason'),
});
