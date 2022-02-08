import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '../../components';
import './Form.scss';

const Form = ({
  inputs,
  image,
  content,
  handleInputChange,
  handleSubmit,
  errors
}) => {
  const { heading, subHeading, redirectText, redirectLink, fields } = content;
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
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => {
            return (
              <Input
                type={field.type}
                name={field.name}
                label={field.label}
                value={inputs[field.name]}
                hasError={errors[field.name]?.hasError || null}
                errorMessage={errors[field.name]?.errorMessage || null}
                key={index}
                handleChange={handleInputChange}
              />
            );
          })}
          <Button buttonText="Create" />
        </form>
      </div>
    </div>
  );
};

export default Form;
