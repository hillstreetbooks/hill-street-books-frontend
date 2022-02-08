import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form } from '../../components';
import { REGISTRATION } from '../../constants/Strings';
import RegistrationBanner from '../../assets/registration-banner.jpeg';
import { useForm } from '../../hooks';
import './Registration.scss';

const Registration = () => {
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('message')) alert(searchParams.get('message'));
  }, [searchParams]);

  const registerUser = () => {
    let validationResult = validate();
    if (inputs.password.localeCompare(inputs.confirm_password)) {
      validationResult.confirm_password = {
        hasError: true,
        errorMessage: ['Passwords do not match!']
      };
    }
    setErrors(validationResult);
  };

  const { inputs, handleInputChange, handleSubmit, validate } = useForm(
    REGISTRATION.FIELDS,
    registerUser
  );

  return (
    <div className="registration-wrapper">
      <Form
        inputs={inputs}
        image={RegistrationBanner}
        handleClick={registerUser}
        content={REGISTRATION.CONTENT}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
};

export default Registration;
