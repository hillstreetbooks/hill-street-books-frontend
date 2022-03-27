import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StepOne, StepTwo, StepThree, StepFour } from './Steps';
import { Loader, MultiStep } from '../../components';
import { AuthorContentService } from '../../services';
import { updateAuthorContent } from '../../store';
import { Navigate } from 'react-router-dom';

const AuthorEdit = () => {
  const stepOne = useRef(null);
  const stepTwo = useRef(null);
  const stepThree = useRef(null);
  const stepFour = useRef(null);

  const userInfo = useSelector((state) => state.user.info);
  const authorContent = useSelector((state) => state.authorContent);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, updateLoader] = useState(false);

  const steps = [
    {
      name: 'Personal Details',
      component: <StepOne ref={stepOne} />
    },
    { name: 'Social Media', component: <StepTwo ref={stepTwo} /> },
    { name: 'Your Work', component: <StepThree ref={stepThree} /> },
    {
      name: 'Video and Downloadable Content',
      component: <StepFour />
    }
  ];

  const updateAuthorDetails = () => {
    console.log('called');
    const { username, _id, token } = userInfo;
    const { author_details, social_links, books, videos } = authorContent;
    updateLoader(true);
    AuthorContentService.updateContent(
      username,
      author_details,
      social_links,
      books,
      videos,
      token
    )
      .then((response) => {
        console.log(response);
        updateLoader(false);
        navigate(`/author/${_id}`);
      })
      .catch((error) => {
        console.log(error);
        updateLoader(false);
      });
  };

  useEffect(() => {
    let { username, token } = userInfo;
    updateLoader(true);
    AuthorContentService.fetchContent(username, token)
      .then((response) => {
        if (response && Object.keys(response).length > 0) {
          console.log(response);
          dispatch(updateAuthorContent(response));
        }
        setTimeout(() => {
          updateLoader(false);
        }, 1000);
      })
      .catch((error) => {
        updateLoader(false);
        console.log(error);
      });
  }, []);

  return (
    <div className="author-edit-wrapper">
      <MultiStep
        activeStep={0}
        showNavigation={true}
        steps={steps}
        handleSubmit={updateAuthorDetails}
      />
      {isLoading ? <Loader /> : null}
    </div>
  );
};

export default React.memo(AuthorEdit);
