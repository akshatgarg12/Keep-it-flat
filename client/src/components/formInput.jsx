import React from 'react';

const FormInput = ({icon,type,placeholder,value,setValue}) => {
  return (
    <div className="form-input-div">
      <i className={`fas fa-${icon}`} />
      <input 
        className="form-input"
        autoComplete="none"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => {
          setValue(e.target.value)
        }}
      />
    </div>
  );
}
 
export default FormInput;