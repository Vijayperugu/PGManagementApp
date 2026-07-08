import { z } from 'zod';

export const roomSchema = z.object({
  roomNumber: z
    .string()
    .trim()
    .min(1, 'Room number is required'),

  floor: z
    .string()
    .trim()
    .min(1, 'Floor is required')
    .refine(value => {
      const floor = Number(value);
      return Number.isInteger(floor) && floor >= 0;
    }, 'Enter a valid floor number'),

  capacity: z
    .string()
    .trim()
    .min(1, 'Capacity is required')
    .refine(value => {
      const capacity = Number(value);
      return (
        Number.isInteger(capacity) &&
        capacity >= 1 &&
        capacity <= 50
      );
    }, 'Capacity must be between 1 and 50'),

  rent: z
    .string()
    .trim()
    .min(1, 'Rent is required')
    .refine(value => {
      const rent = Number(value);
      return Number.isFinite(rent) && rent > 0;
    }, 'Enter a valid rent'),
});

export type RoomDataForm = z.infer<typeof roomSchema>;