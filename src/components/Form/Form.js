import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Form.scss';

const Form = ({ image, children, content, handleSubmit }) => {
  const { heading, subHeading, redirectText, redirectLink } = content;
  return (
    <div className="form-wrapper">
      <div
        className="form-image-wrapper"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
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

export default Form;
