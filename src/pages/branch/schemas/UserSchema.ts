import { z } from 'zod';

export const UserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters'),

  age: z
    .string()
    .trim()
    .min(1, 'Age is required')
    .refine(value => {
      const age = Number(value);
      return Number.isInteger(age) && age >= 1 && age <= 120;
    }, 'Enter a valid age'),

  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10 digit phone number'),

  occupation: z
    .string()
    .trim()
    .min(2, 'Occupation is required'),

  address: z
    .string()
    .trim()
    .min(10, 'Please enter a complete address'),

  joiningDate: z
    .string()
    .trim()
    .min(1, 'Joining date is required'),
  photoUri: z.string().optional().or(z.literal(''))
});

export type UserDataForm = z.infer<typeof UserSchema>;