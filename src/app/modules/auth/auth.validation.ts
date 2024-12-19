import { z } from 'zod';

// User registration schema
export const registerUserSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z.string({
    required_error: 'Password is required',
  }),
});

// User login schema
export const loginUserSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
});

export const AuthValidation = {
  registerUserSchema,
  loginUserSchema,
};
