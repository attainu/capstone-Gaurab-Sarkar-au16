import React from "react";
import propTypes from "prop-types";

const Input = ({ type, name, placeholder, value, onChange, style }) => {
  return (
    <div style={{textAlign:"center"}}>
      <div className="form-group">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={style}
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
