import React from 'react';

import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const formSchema = z.object({
  phone: z
    .string()
    .nonempty('Phone number is required')
    .refine(
      (value) => isValidPhoneNumber(value),
      'Please enter a valid phone number'
    ),
});

export default function HookFormZodPhone() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form submitted successfully:', data);
  };

  const phoneValue = watch('phone');

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 300, margin: '0 auto' }}>
      <h2>Phone Number Form (react-hook-form + Zod)</h2>

      <PhoneInput
        defaultCountry="US"
        placeholder="Enter phone number"
        value={phoneValue}
        onChange={(val) =>
          setValue('phone', val || '', {
            shouldValidate: true, 
          })
        }
      />
      <input
        type="hidden"
        {...register('phone')}
      />
      {errors.phone && (
        <p style={{ color: 'red' }}>{errors.phone.message}</p>
      )}

      <button type="submit" style={{ marginTop: '1rem' }}>
        Submit
      </button>
    </form>
  );
}
