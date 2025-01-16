import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const formSchema = z.object({
  phone: z
    .string()
    .nonempty("Phone number is required")
    .refine(
      (val) => isValidPhoneNumber(val),
      "Invalid phone number"
    )
});
