import React from "react";
import PropTypes from "prop-types";

const Select = ({
  label,
  onChange,
  options,
  defaultOption,
  value,
  error,
  name
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="select-field">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="form-control "
        >
          <option value="">{defaultOption}</option>
          {options.map(option => {
            return (
              <option
                key={option.value}
                value={option.value}
                className="select-option"
              >
                {option.text}
              </option>
            );
          })}
        </select>
        {error && <div className="alert alert-danger ">{error}</div>}
      </div>
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  defaultOption: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string
};

export default Select;
