import { z } from 'zod';

export const createUserValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(3)
    .max(255),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6)
    .max(255),
  role: z.enum(['admin', 'user']).default('user'),
  isBlocked: z.boolean(),
});

export const UserValidation = {
  createUserValidationSchema,
};
