import React from 'react';

const FormButton = ({title}) => {

  return (
    <div className="form-button-div" >
      <button className="form-button" type="submit">
        {title}
      </button>
    </div>
  );
}
 
export default FormButton;