import { toast } from 'react-toastify';
import { z } from 'zod';
import { partialUserSchema, PartialUserKeys } from '@/types/validation';

export function useValidation(formData: Record<string, any>, user: any) {
  const validate = () => {
    // Filter out unchanged fields
    const updatedFields = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== (user as any)[key])
    );

    // Set of keys to pick from the schema
    const updatedKeys = Object.keys(updatedFields) as PartialUserKeys[];

    // Validate only provided fields
    const validationSchema = partialUserSchema.pick(
      updatedKeys.reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<PartialUserKeys, true>)
    );

    const parsedData = validationSchema.safeParse(updatedFields);

    if (!parsedData.success) {
      parsedData.error.errors.forEach((error) => {
        toast.error(error.message);
      });
      return false;
    }

    return true;
  };

  return { validate };
}
