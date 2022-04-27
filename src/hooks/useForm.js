import { useState } from 'react';
import * as EmailValidator from 'email-validator';

const useForm = (inputFields, callback) => {
  const [inputs, setInputs] = useState(inputFields);
  const passwordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const validate = () => {
    let errors = {};
    let inputArray = Object.keys(inputs);
    inputArray.forEach((input) => {
      if (inputs[input] === '') {
        errors[input] = {
          hasError: true,
          errorMessage: [`This field cannot be empty`]
        };
      } else if (
        input === 'username' &&
        !EmailValidator.validate(inputs.username)
      ) {
        errors[input] = {
          hasError: true,
          errorMessage: [`Please enter a valid Email ID`]
        };
      }
      //Validate Password
      else if (input === 'password' && !passwordRegex.test(inputs.password)) {
        errors[input] = {
          hasError: true,
          errorMessage: [
            `Password requirements are not met. Please hover (?) to check the requirements.`
          ]
        };
      }
      //Validate Confirm Password
      else if (
        input === 'confirm_password' &&
        inputs.password.localeCompare(inputs.confirm_password)
      ) {
        errors[input] = {
          hasError: true,
          errorMessage: ['Passwords do not match!']
        };
      }
    });
    return errors;
  };

  return {
    inputs,
    handleInputChange,
    handleSubmit,
    validate
  };
};

export default useForm;
