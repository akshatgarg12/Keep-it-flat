import React from 'react';

const ActivityButton = ({title, onSubmit}) => {

  return (
    <div className="activity-button-div" >
      <button className="activity-button" type="submit" onSubmit={onSubmit}>
        {title}
      </button>
    </div>
  );
}
 
export default ActivityButton;