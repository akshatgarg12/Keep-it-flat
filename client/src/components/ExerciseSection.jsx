import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../hooks/UserContextProvider';
import { postActivity } from '../utils/postActivity';
import Heading from './heading';
import SubHeading from './subHeading';


const Exercise = ({title, photo, content, calorie_burned}) =>{
  const {state} = useContext(UserContext);
  const onClickHandler = ()=>{
      if(!state){
        return;
      }
      const {accessToken} = state;
      postActivity(`${title} workout`,"0",calorie_burned,accessToken);

  }

  return <div className="exercise">
    <img className="exercise-img" src={photo} alt="img" />
    <SubHeading 
      title={title}
    />
    
    <h4><span>Total Calories burned:  </span>{calorie_burned}</h4>
    {content.map((c)=>{
      return <div 
      key={c._id}
      className="exercise-content">
        <div className="col-flex">
          <p>{c.name}</p>
          <p><span>Reps:</span>{c.reps}</p>
        </div>
        <img src= {c.photo} alt="img"/>
      </div>
    })}
    <span>(Be truthful for actual progress)  </span>
    <button className="exercise-btn" onClick={onClickHandler}>I did this!</button>
  </div>
}

const ExerciseSection = () => {
  const {state} = useContext(UserContext);
  const [data, setData]= useState([]);
  useEffect(()=>{
    if(!state){
      return;
    }
    const {accessToken} = state;

    fetch('/exercise/', {
      method:"GET",
      mode:"cors",
      headers:{
        "Content-type":"application/json",
        "authorization":`Bearer Bearer ${accessToken}`
      }
    }).then(async response=>{
      let d = await response.json();
      if(response.status===200){
        setData(d.exercises);
      }else{
        console.log(d.error);
      }
    })
  },[]);
  return (
    <>
    <Heading 
      title="Powerful Home Workouts"
    />
    <div className="exercises-div">
    {data.map((d)=>{
      return <Exercise 
        key={d._id}
        title={d.title}
        photo = {d.photo}
        calorie_burned={d.calorie_burned}
        content={d.content}
      />
    })}
    </div>

    </>
  );
}
 
export default ExerciseSection;