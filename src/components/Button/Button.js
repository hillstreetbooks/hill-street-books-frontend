import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ buttonText, disabled, handleClick }) => {
  return (
    <button className="button" onClick={handleClick} disabled={disabled}>
      {buttonText}
    </button>
  );
};

Button.defaultProps = {
  buttonText: 'Search',
  disabled: false,
  handleClick: () => {
    return;
  }
};

Button.propTypes = {
  buttonText: PropTypes.string,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func
};

export default Button;
