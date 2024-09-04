import { z } from 'zod';

// Full schema for user data
export const fullUserSchema = z.object({
  user_id: z.string().min(1, "User ID is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z.string().min(6, "Phone number must be at least 6 digits long"),
  birthDate: z.string().min(1, "Birthdate is required"),
  avatar: z.string().optional(),
});

// Partial schema for user data
export const partialUserSchema = fullUserSchema.partial();

export type PartialUserKeys = keyof typeof partialUserSchema.shape;
