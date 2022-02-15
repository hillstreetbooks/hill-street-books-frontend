import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '../../components';

const FormContent = ({
  fields,
  values,
  handleInputChange,
  errors,
  buttonText,
  children
}) => {
  return (
    <>
      {fields.map((field, index) => {
        return (
          <Input
            type={field.type}
            name={field.name}
            label={field.label}
            value={values[field.name]}
            hints={field.hints ? field.hints : []}
            hasError={errors[field.name]?.hasError || null}
            errorMessage={errors[field.name]?.errorMessage || null}
            key={index}
            handleChange={handleInputChange}
          />
        );
      })}
      {children}
      <Button buttonText={buttonText} />
    </>
  );
};

FormContent.defaultProps = {
  fields: [],
  values: {},
  errors: {},
  buttonText: 'Create'
};

FormContent.propTypes = {
  fields: PropTypes.array,
  values: PropTypes.object,
  handleInputChange: PropTypes.func,
  errors: PropTypes.object,
  buttonText: PropTypes.string
};

export default memo(FormContent);
