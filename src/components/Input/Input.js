import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({
  label,
  hasError,
  errorMessage,
  type,
  name,
  disabled,
  value,
  handleChange,
  handleBlur,
  handleFocus,
  handleKeyup,
  hints
}) => {
  return (
    <>
      <div className={`input-wrapper ${value !== '' ? 'active' : ''}`}>
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
        <div className="label-wrapper">
          <label htmlFor="username">{label}</label>
          {hints.length > 0 ? (
            <div className="hints-wrapper">
              <span className="hints">?</span>
              <ul className="hint-message-wrapper">
                {hints.map((hint, index) => {
                  return (
                    <li key={index} className="hint-message">
                      {hint}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      {hasError ? (
        <div className="error-message-wrapper">
          {errorMessage.map((error, index) => {
            return (
              <div key={index} className="error-message">
                {error}
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

Input.defaultProps = {
  label: 'Username',
  hasError: false,
  hints: [],
  errorMessage: ['Please fill this field'],
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
  hasError: PropTypes.bool,
  errorMessage: PropTypes.array,
  hints: PropTypes.array,
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
