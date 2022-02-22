import React, { memo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, FormContent, PopupModal } from '../../components';
import { REGISTRATION } from '../../constants/Strings';
import RegistrationBanner from '../../assets/reading-space.jpeg';
import { useForm, useModal } from '../../hooks';
import { AuthorService } from '../../services';
import './Registration.scss';

const Registration = () => {
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();

  const passwordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );

  useEffect(() => {
    if (searchParams.get('message')) {
      toggleVisibility(!show);
      setModalMessage(searchParams.get('message'));
    }
  }, [searchParams]);

  const registerUser = () => {
    let validationResult = validate();

    //Validate Password
    if (inputs.password !== '' && !passwordRegex.test(inputs.password)) {
      validationResult.password = {
        hasError: true,
        errorMessage: [
          `Password requirements are not met. Please hover (?) to check the requirements.`
        ]
      };
      //Validate Confirm Password
      if (inputs.password.localeCompare(inputs.confirm_password)) {
        validationResult.confirm_password = {
          hasError: true,
          errorMessage: ['Passwords do not match!']
        };
      }
    }
    setErrors(validationResult);
    if (validationResult && Object.keys(validationResult).length === 0) {
      AuthorService.registerAuthor(inputs)
        .then((response) => {
          toggleVisibility(!show);
          setModalMessage(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const { show, toggleVisibility, modalMessage, setModalMessage } = useModal();

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
      <PopupModal
        show={show}
        toggleVisibility={() => toggleVisibility(!show)}
        message={modalMessage}
      />
      ;
    </div>
  );
};

export default memo(Registration);
