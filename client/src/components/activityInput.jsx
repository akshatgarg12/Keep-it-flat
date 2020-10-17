import React from 'react';

const ActivityInput = ({icon , placeholder, type, value, setValue}) => {
  return (
    <div className="activity-input-div">
      <i className={`fas fa-${icon}`} />
      <input 
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
      />
    </div>
  );
}
 
export default ActivityInput;