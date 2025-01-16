import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {z } from 'zod';

const SCHEMA = z.object({
  phoneNumber: z.string().refine((value) => isValidPhoneNumber(value), "Invalid!")
});

function NumberInput() {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm({
    resolver: zodResolver(SCHEMA)
  });

  const onSubmit = (formData) => {
    console.log('formData', formData);
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h2>Phone Number Input</h2>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { value, onChange }}) => (
          <PhoneInput
            defaultCountry="AE"
            placeholder="Enter phone number"
            value={value}
            onChange={onChange}
            limitMaxLength
            international
          />
        )}
      />

      {errors && <p style={{ color: 'red' }}>{errors?.phoneNumber?.message}</p>}

      <button type="button" style={{ marginTop: '1rem' }} disabled={!isValid} onClick={handleSubmit(onSubmit)}>
        Submit
      </button>

      <p style={{ marginTop: '1rem' }}>
      </p>
    </div>
  );
}

export default NumberInput;
