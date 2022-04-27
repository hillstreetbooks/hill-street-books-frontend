import React, { memo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, FormContent, Loader, PopupModal } from '../../components';
import { REGISTRATION } from '../../constants/Strings';
import RegistrationBanner from '../../assets/reading-space.jpeg';
import { useForm, useModal } from '../../hooks';
import { AuthorService } from '../../services';
import './Registration.scss';

const Registration = () => {
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();
  const [isLoading, updateLoader] = useState(false);

  useEffect(() => {
    if (searchParams.get('message')) {
      toggleVisibility(!show);
      setModalMessage(searchParams.get('message'));
    }
  }, [searchParams]);

  const registerUser = () => {
    let validationResult = validate();

    setErrors(validationResult);
    if (validationResult && Object.keys(validationResult).length === 0) {
      updateLoader(true);
      const { username, name, password, confirm_password } = inputs;
      AuthorService.registerAuthor(
        username,
        name,
        password,
        confirm_password,
        false
      )
        .then((response) => {
          toggleVisibility(!show);
          setModalMessage(response);
          updateLoader(false);
        })
        .catch((error) => {
          console.log(error);
          updateLoader(false);
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
      {isLoading ? <Loader /> : null}
    </div>
  );
};

export default memo(Registration);
