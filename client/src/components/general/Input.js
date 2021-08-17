import React from "react";
import propTypes from "prop-types";

const Input = ({ type, name, placeholder, value, onChange }) => {
  return (
    <div>
      <div className="form-group">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

Input.propTypes = {
  type: propTypes.string.isRequired,
  name: propTypes.string, 
  placeholder: propTypes.string, 
  value: propTypes.string.isRequired, 
  onChange: propTypes.func.isRequired,
}

export default Input;
