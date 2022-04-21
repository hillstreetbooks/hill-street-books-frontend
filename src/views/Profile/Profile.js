import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, FormContent, Loader, PopupModal } from '../../components';
import { PROFILE } from '../../constants/Strings';
import ProfileBanner from '../../assets/profile-banner.jpg';
import { useForm, useModal } from '../../hooks';
import { AuthorService } from '../../services';
import { setInfo } from '../../store';
import './Profile.scss';

const Profile = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, updateLoader] = useState(false);
  const userInfo = useSelector((state) => state.user.info);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { show, toggleVisibility, modalMessage, setModalMessage } = useModal();

  const updateAuthorInfo = () => {
    let validationResult = validate();
    setErrors(validationResult);
    if (validationResult && Object.keys(validationResult).length === 0) {
      const { username, name } = inputs;
      updateLoader(true);
      AuthorService.updateAuthorInfo(username, name, userInfo.token)
        .then((response) => {
          updateLoader(false);
          if (response && response.username) {
            dispatch(setInfo(response));
            toggleVisibility(!show);
            setModalMessage('Updated Profile Information');
          } else {
            toggleVisibility(!show);
            setModalMessage(
              response ||
                'Oops, Something went wrong! Please contact the administrator.'
            );
          }
        })
        .catch((error) => {
          updateLoader(false);
          toggleVisibility(!show);
          setModalMessage(
            'Oops, Something went wrong! Please contact the administrator.'
          );
          console.log(error);
        });
    }
  };

  const { inputs, handleInputChange, handleSubmit, validate } = useForm(
    PROFILE.FIELDS,
    updateAuthorInfo
  );

  useEffect(() => {
    updateLoader(true);
    AuthorService.fetchAuthorInfo(userInfo.username, userInfo.token)
      .then((response) => {
        updateLoader(false);
        if (response && response.username) {
          console.log(response);
          Object.keys(inputs).forEach((key) => {
            handleInputChange({
              persist: () => {},
              target: { name: key, value: response[key] }
            });
          });
        } else {
          toggleVisibility(!show);
          setModalMessage(
            response ||
              'Oops, Something went wrong! Please contact the administrator.'
          );
        }
      })
      .catch((error) => {
        updateLoader(false);
        toggleVisibility(!show);
        setModalMessage(
          'Oops, Something went wrong! Please contact the administrator.'
        );
        console.log(error);
      });
  }, []);

  return (
    <div className="profile-wrapper">
      <Form
        image={ProfileBanner}
        content={PROFILE.CONTENT}
        handleSubmit={handleSubmit}
      >
        <FormContent
          fields={PROFILE.CONTENT.fields}
          values={inputs}
          handleInputChange={handleInputChange}
          errors={errors}
          buttonText="Update Info"
        >
          <span onClick={() => navigate('/forgot-password')}>
            Reset Password
          </span>
        </FormContent>
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

export default Profile;
