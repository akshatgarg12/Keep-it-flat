import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';







const UserCard = ({photo,name,nickname,gender,height,weight,goal}) => {

  const BMI = (weight/((height/100)*(height/100))).toPrecision(4);
  let color= "#80ffdb";
  if(BMI > 18 && BMI<25){
    color= "#80ffdb";
  }
  else{
    color="#e63946"
  }
  const bmiColor = {
    color:color
  }
  return (
    <>
    <div className="card user-card">
    <i className="fa fa-pencil" onClick={
      ()=>{
        const edit = document.querySelector('#edit');
        edit.classList.toggle('hidden');
      }
    }></i>
     <div className="row-flex">
        <img src={photo} alt="user-img" className="user-avatar" />
        <div className="col-flex">
          <h4>{name}</h4>
          <h4><span>{nickname}</span></h4>
        </div>
        
     </div>
    
     <div className="row-flex"> 
        <h4><span>gender:</span>{gender}</h4>
        <h4><span>height(cm):</span>{height}</h4>
        <h4><span>weight(kg):</span>{weight}</h4>
     </div>

     <div className="row-flex">
        <h4><span>goal(kg):</span>{goal}</h4>
        <h4 style={bmiColor}><span>BMI:</span>{BMI}</h4>
     </div>
    </div>
    </>

  );
}
 



export default UserCard;