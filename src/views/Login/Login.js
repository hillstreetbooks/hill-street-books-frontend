import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, FormContent, PopupModal } from '../../components';
import { LOGIN } from '../../constants/Strings';
import LoginBanner from '../../assets/kid-reading.png';
import { useForm, useModal } from '../../hooks';
import { AuthorService } from '../../services';
import { setInfo } from '../../store';
import './Login.scss';

const Login = () => {
  const [errors, setErrors] = useState({});
  const [remainLoggedIn, isRemainLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerUser = () => {
    let validationResult = validate();
    setErrors(validationResult);
    if (validationResult && Object.keys(validationResult).length === 0) {
      const { username, password } = inputs;
      AuthorService.login({ username, password, remainLoggedIn })
        .then((response) => {
          if (response && response._id) {
            dispatch(setInfo(response));
            navigate(`/author/${response._id}`);
          } else {
            toggleVisibility(!show);
            setModalMessage(
              response ||
                'Oops, Something went wrong! Please contact the administrator.'
            );
          }
        })
        .catch((error) => {
          toggleVisibility(!show);
          setModalMessage(
            'Oops, Something went wrong! Please contact the administrator.'
          );
          console.log(error);
        });
    }
  };

  const { show, toggleVisibility, modalMessage, setModalMessage } = useModal();

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
        >
          <div className="remain-loggedin-wrapper">
            <input
              type="checkbox"
              checked={remainLoggedIn}
              onChange={() => {
                console.log(remainLoggedIn);
                isRemainLoggedIn(!remainLoggedIn);
              }}
            />
            Remain Signed In
          </div>
        </FormContent>
      </Form>
      <PopupModal
        show={show}
        toggleVisibility={() => toggleVisibility(!show)}
        message={modalMessage}
      />
    </div>
  );
};

export default Login;
