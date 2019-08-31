import React from "react";
import PropTypes from "prop-types";

const TextInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  type
}) => {
  let errorClass = "form-group";
  if (error && error.length > 0) {
    errorClass += " " + "has-error";
  }

  return (
    <div className={errorClass}>
      <label htmlFor={name}>{label}</label>
      <div className="input-field">
        <input
          type={type}
          name={name}
          className="form-control "
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger ">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string
};

export default TextInput;
