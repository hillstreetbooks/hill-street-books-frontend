import React, { useState } from 'react';
import { Form, FormContent, Loader, PopupModal } from '../../components';
import { FORGOT_PASSWORD } from '../../constants/Strings';
import ForgotPasswordBanner from '../../assets/library.jpeg';
import { useForm, useModal } from '../../hooks';
import { AuthorService } from '../../services';
import './ForgotPassword.scss';

const ForgotPassword = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, updateLoader] = useState(false);

  const retrievePassword = () => {
    const { username } = inputs;
    let validationResult = validate();
    setErrors(validationResult);
    if (validationResult && Object.keys(validationResult).length === 0) {
      updateLoader(true);
      AuthorService.retrievePassword(username)
        .then((response) => {
          toggleVisibility(!show);
          setModalMessage(
            response ||
              'Oops, Something went wrong! Please contact the administrator.'
          );
          updateLoader(false);
        })
        .catch((error) => {
          toggleVisibility(!show);
          setModalMessage(
            'Oops, Something went wrong! Please contact the administrator.'
          );
          console.log(error);
          updateLoader(false);
        });
    }
  };

  const { show, toggleVisibility, modalMessage, setModalMessage } = useModal();

  const { inputs, handleInputChange, handleSubmit, validate } = useForm(
    FORGOT_PASSWORD.FIELDS,
    retrievePassword
  );

  return (
    <div className="forgot-password-wrapper">
      <Form
        image={ForgotPasswordBanner}
        content={FORGOT_PASSWORD.CONTENT}
        handleSubmit={handleSubmit}
      >
        <FormContent
          fields={FORGOT_PASSWORD.CONTENT.fields}
          values={inputs}
          errors={errors}
          handleInputChange={handleInputChange}
          buttonText="Reset Password"
        ></FormContent>
      </Form>
      <PopupModal
        show={show}
        toggleVisibility={() => toggleVisibility(!show)}
        message={modalMessage}
      />
      {isLoading ? <Loader /> : null}
    </div>
  );
};

export default ForgotPassword;
