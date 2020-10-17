import React, { useContext, useEffect, useState } from 'react';
import CalorieIntakeInput from './calorieIntakeInput';
import CalorieBurnInput from './calorieBurnInput';
import ActivityLog from './activityLog';
import ActivityLoggerNavbar from './activityLoggerNav';
import { UserContext } from '../hooks/UserContextProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


const ActivityLogger = () => {

  const [activityIntake , setActivityIntake ] = useState([]);
  const [activityBurned , setActivityBurned ] = useState([]);
  const [newCall , setNewCall] = useState(false);
  const {state } = useContext(UserContext);
  useEffect(()=>{
    if(!state){
      return;
    }
    setNewCall(false);
    fetch('/activity/',{
      method:"GET",
      mode: 'cors',
      headers: {
      'Content-Type':'application/json',
      'authorization':`Bearer Bearer ${state.accessToken}`
      }
    }
    ).then(async(res)=>{
      const response = await res.json();
      // console.log(response);
      if(res.status===200){
        const array = response.activity;
        setActivityIntake([]); setActivityBurned([]);
        array.forEach((ele)=>{
          if(ele.calorie_intake===0){
            setActivityBurned((prev) => [ele,...prev]);
          }else{
            setActivityIntake((prev) => [ele,...prev,]);
          }
        });
      }else{
        toast.error(response.error,{
          autoClose:1000
        })
      }
    }).catch(e => {
      console.log(e);
    })
  },[newCall]);

  function mapActivityIntake(a){
    return  <ActivityLog 
    key={a._id}
    _id = {a._id}
    name={a.activity}
    calorie={a.calorie_intake}
    setValue = {setNewCall}
  />
    

   
  }
  function mapActivityBurned(a){
    return <ActivityLog 
      key={a._id}
      _id = {a._id}
      name={a.activity}
      calorie={a.calorie_burned}
      setValue = {setNewCall}
    />
  }

  return (
      <div className="card col-flex activity-logger">
       <ActivityLoggerNavbar />
        <div className="row-flex activity-logger-div">
          <div className="calorie_intake col-flex">
              <div className="activity-logger-logs">
                {activityIntake ? activityIntake.map(mapActivityIntake):null}
              </div>
              <div className="activity-logger-input">
                <CalorieIntakeInput setValue={setNewCall} />
              </div>
          </div>
          <div className="calorie_burn col-flex">
              <div className="activity-logger-logs">
              {activityBurned ? activityBurned.map(mapActivityBurned):null}
              </div>
              <div className="activity-logger-input">
                <CalorieBurnInput setValue={setNewCall} />
              </div>
          </div>
        </div>
      </div>
  );
}
 
export default ActivityLogger;