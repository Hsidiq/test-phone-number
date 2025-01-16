import React, { useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function NumberInput() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleOnChange = (value) => {
    setPhone(value);
    setError(''); 
  };

  const handleSubmit = () => {
    if (phone && isValidPhoneNumber(phone)) {
      console.log('Phone number is valid!');
    } else {
      setError('Please enter a valid phone number.');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h2>Phone Number Input</h2>
      
      <PhoneInput
        placeholder="Enter phone number"
        value={phone}
        onChange={handleOnChange}
        defaultCountry="US"
        limitMaxLength
        international
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="button" onClick={handleSubmit} style={{ marginTop: '1rem' }}>
        Submit
      </button>

      <p style={{ marginTop: '1rem' }}>
        <strong>Current Value:</strong> {phone || 'None'}
      </p>
    </div>
  );
}

export default NumberInput;
