import { z } from 'zod';

export const createParentSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .min(1, 'Name cannot be empty')
    .transform((val) => val.toLowerCase().trim()),
  age: z
    .number({ message: 'Age is required and must be a number' })
    .int('Age must be a whole number')
    .min(0, 'Age must be at least 0')
    .max(150, 'Age must be at most 150'),
  gender: z.enum(['male', 'female', 'other'], {
    message: 'Gender must be male, female, or other',
  }),
});

export type CreateParentInput = z.infer<typeof createParentSchema>;
