import { z } from 'zod';

export const UserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters long"),
  age: z
    .string()
    .trim()
    .min(1, "Age is required")
    .refine(value => {
      const age = Number(value);
      return Number.isInteger(age) && age > 0 && age <= 120;
    }, "Please enter a valid age"),
  PhoneNumber: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10 digit phone number"),
  Address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .min(10, "Please enter a full, detailed address"),
  occupation: z
    .string()
    .trim()
    .min(1, "Occupation is required")
    .min(2, "Occupation must be at least 2 characters long"),
  joiningDate: z
    .string()
    .trim()
    .min(1, "Joining date is required"),
  photoUri: z
    .string().optional()
});
export type UserDataForm = z.infer<typeof UserSchema>;
