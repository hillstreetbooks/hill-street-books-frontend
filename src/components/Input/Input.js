import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({
  label,
  type,
  name,
  disabled,
  value,
  handleChange,
  handleBlur,
  handleFocus,
  handleKeyup
}) => {
  return (
    <div className={`input-wrapper ${value !== '' ? 'active' : null}`}>
      <input
        type={type}
        className="input-field"
        value={value}
        name={name}
        disabled={disabled}
        onChange={handleChange}
        onKeyUp={handleKeyup}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label htmlFor="username">{label}</label>
    </div>
  );
};

Input.defaultProps = {
  label: 'Username',
  type: 'text',
  name: 'username',
  disabled: false,
  value: '',
  handleChange: () => {
    return;
  },
  handleBlur: () => {
    return;
  },
  handleFocus: () => {
    return;
  },
  handleKeyup: () => {
    return;
  }
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleFocus: PropTypes.func,
  handleKeyup: PropTypes.func
};

export default Input;
