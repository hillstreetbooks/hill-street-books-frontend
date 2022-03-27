import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, FormContent, Loader, PopupModal } from '../../components';
import { RESET_PASSWORD } from '../../constants/Strings';
import ForgotPasswordBanner from '../../assets/library.jpeg';
import { useForm, useModal } from '../../hooks';
import { AuthorService } from '../../services';
import { signOut } from '../../store';
import './ForgotPassword.scss';

const ResetPassword = () => {
  const [errors, setErrors] = useState({});
  const { userId, uniqueString } = useParams();
  const [isLoading, updateLoader] = useState(false);
  const dispatch = useDispatch();

  const resetPassword = () => {
    const { password, confirm_password } = inputs;
    let validationResult = validate();
    setErrors(validationResult);
    if (validationResult && Object.keys(validationResult).length === 0) {
      updateLoader(true);
      AuthorService.resetPassword(
        userId,
        uniqueString,
        password,
        confirm_password
      )
        .then((response) => {
          dispatch(signOut());
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
    RESET_PASSWORD.FIELDS,
    resetPassword
  );

  return (
    <div className="forgot-password-wrapper">
      <Form
        image={ForgotPasswordBanner}
        content={RESET_PASSWORD.CONTENT}
        handleSubmit={handleSubmit}
      >
        <FormContent
          fields={RESET_PASSWORD.CONTENT.fields}
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

export default ResetPassword;
