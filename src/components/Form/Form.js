import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image } from '../../components';
import './Form.scss';

const Form = ({ image, children, content, handleSubmit }) => {
  const { heading, subHeading, redirectText, redirectLink } = content;
  return (
    <div className="form-wrapper">
      <div className="form-image-wrapper">
        <Image source={image} />
      </div>
      <div className="form-content-wrapper">
        <div className="heading">{heading}</div>
        <div className="sub-heading">
          {subHeading} <Link to={redirectLink}>{redirectText}</Link>
        </div>
        <form onSubmit={handleSubmit}>{children}</form>
      </div>
    </div>
  );
};

Form.propTypes = {
  image: PropTypes.string,
  children: PropTypes.element,
  content: PropTypes.object
};

export default memo(Form);
