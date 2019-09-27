import React, { useState } from 'react';

const useForm = callback => {
  const [inputs, setInputs] = useState({
    go: 30,
    mo: 30000,
    ms: 5
  });
  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
  };
  const handleInputChange = event => {
    event.persist();

    switch (event.target.name) {
      case 'go':
        setInputs(inputs => ({
          ...inputs,
          [event.target.name]: event.target.value,
          mo: event.target.value * 1000
        }));
        break;

      case 'mo':
        setInputs(inputs => ({
          ...inputs,
          [event.target.name]: event.target.value,
          go: event.target.value / 1000
        }));
        break;

      default:
        setInputs(inputs => ({
          ...inputs,
          [event.target.name]: event.target.value
        }));
        break;
    }
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};
export default useForm;
