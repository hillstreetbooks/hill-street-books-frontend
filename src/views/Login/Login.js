import React, { useState } from 'react';
import { Form, FormContent } from '../../components';
import { LOGIN } from '../../constants/Strings';
import LoginBanner from '../../assets/kid-reading.png';
import { useForm } from '../../hooks';
import { AuthorService } from '../../services';
import './Login.scss';

const Login = () => {
  const [errors, setErrors] = useState({});

  const registerUser = () => {
    let validationResult = validate();
    setErrors(validationResult);
    if (validationResult && Object.keys(validationResult).length === 0) {
      AuthorService.login(inputs)
        .then((response) => {
          alert(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const { inputs, handleInputChange, handleSubmit, validate } = useForm(
    LOGIN.FIELDS,
    registerUser
  );

  return (
    <div className="login-wrapper">
      <Form
        image={LoginBanner}
        content={LOGIN.CONTENT}
        handleSubmit={handleSubmit}
      >
        <FormContent
          fields={LOGIN.CONTENT.fields}
          values={inputs}
          handleInputChange={handleInputChange}
          errors={errors}
          buttonText="Sign In"
        ></FormContent>
      </Form>
    </div>
  );
};

export default Login;
