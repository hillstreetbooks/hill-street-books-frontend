import React, { memo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, FormContent } from '../../components';
import { REGISTRATION } from '../../constants/Strings';
import RegistrationBanner from '../../assets/reading-space.jpeg';
import { useForm } from '../../hooks';
import { AuthorService } from '../../services';
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
    if (validationResult && Object.keys(validationResult).length === 0) {
      AuthorService.registerAuthor(inputs)
        .then((response) => {
          alert(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const { inputs, handleInputChange, handleSubmit, validate } = useForm(
    REGISTRATION.FIELDS,
    registerUser
  );

  return (
    <div className="registration-wrapper">
      <Form
        image={RegistrationBanner}
        content={REGISTRATION.CONTENT}
        handleSubmit={handleSubmit}
      >
        <FormContent
          fields={REGISTRATION.CONTENT.fields}
          values={inputs}
          handleInputChange={handleInputChange}
          errors={errors}
          buttonText="Create"
        ></FormContent>
      </Form>
    </div>
  );
};

export default memo(Registration);
