import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../hooks/UserContextProvider';
import Graph from './graph';
import Heading from '../components/heading';
import SubHeading from '../components/subHeading';


const GraphSection = () => {
  const {state}= useContext(UserContext);
  const [todayData, setTodayData] = useState([]);
  const [weekData, setWeekData] = useState([]);

  const chartTodayData = () => {
    if(!state){
      return;
    }
    const {accessToken} = state;
    fetch('/activity/today', {
      method:"GET",
      mode: 'cors',
      headers: {
      'Content-Type':'application/json',
      'authorization':`Bearer Bearer ${accessToken}`
      }
    }).then(async(response)=>{
      let data = await response.json();
      if(response.status===200){
        const arr  = data.activity;
        let frequency = [];
        frequency[0] = {
          calorie:arr[0].calorie_intake - arr[0].calorie_burned,
          time:arr[0].createdAt.slice(12,16)
        };
        for(let i=1;i<arr.length;i++){
          frequency[i] = {
           calorie: frequency[i-1].calorie +arr[i].calorie_intake - arr[i].calorie_burned,
           time:arr[i].createdAt.slice(12,16)
          } 
        }
       setTodayData(frequency);
      }else{
        console.log(data);
      }
    }).catch(e =>{
      console.log(e);
    })
  }
  const chartWeekData = () => {
    if(!state){
      return;
    }
    const {accessToken} = state;
    fetch('/activity/week', {
      method:"GET",
      mode: 'cors',
      headers: {
      'Content-Type':'application/json',
      'authorization':`Bearer Bearer ${accessToken}`
      }
    }).then(async(response)=>{
      let data = await response.json();
      if(response.status===200){
        const arr  = data.activity;
        let frequency = [];
        frequency[0] = {
          calorie:arr[0].calorie_intake - arr[0].calorie_burned,
          time:arr[0].createdAt.slice(12,16)
        };
        for(let i=1;i<arr.length;i++){
          frequency[i] = {
           calorie: frequency[i-1].calorie +arr[i].calorie_intake - arr[i].calorie_burned,
           time:arr[i].createdAt.slice(0,10)
          } 
        }
       setWeekData(frequency);
      }else{
        console.log(data);
      }
    }).catch(e =>{
      console.log(e);
    })
  }
  useEffect(()=>{
    chartTodayData();
    chartWeekData();
  },[])
  return (
    <div className="graph-section">
        <Heading
          title="Graphs keeping Track of your calories:"
         />
         <div className="row-flex">
           <SubHeading 
             title="daily"
           />
           <SubHeading 
             title="weekly"
           />
         </div>
        <div className="second-section row-flex">
            <Graph data={todayData} />
            <Graph data={weekData} />
        </div>
        <SubHeading 
          title={"try keeping the curve with 800-1000 calories at the end of the day to maintain your shape."}
        />
        <SubHeading 
          title={"try keeping the curve with 400-700 calories at the end of the day to lose weight."}
        />
        <SubHeading 
          title={"try keeping the curve with 1200-1500 calories at the end of the day to gain weight."}
        />
         <SubHeading 
          title={"Below or above these scenarios is not healthy!"}
        />
    </div>
  );
}
 
export default GraphSection;