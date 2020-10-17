import React, { useContext, useState } from 'react';
import ActivityInput from './activityInput';
import ActivityButton from './activityButton';
import { UserContext } from '../hooks/UserContextProvider';
import {postActivity} from '../utils/postActivity.js';


const CalorieIntakeInput = ({setValue}) => {
  const [activity, setActivity]=useState('');
  const [calorie_intake, setCalorie] = useState('');
  const {state} = useContext(UserContext);
  const SubmitCalorie = (e) =>{
    e.preventDefault();
    setValue(true);
    postActivity(activity,calorie_intake,"0",state.accessToken);
  }
  return (
    <form className="row-flex" onSubmit={SubmitCalorie}>
        <ActivityInput
          icon="utensils"
          placeholder="meal name"
          value={activity}
          setValue={setActivity}
          />
        <ActivityInput
          icon="sort-amount-up"
          placeholder="calorie-intake"
          value={calorie_intake}
          setValue={setCalorie}
          />
        <ActivityButton 
          title="+"
        />
    </form>
  );
}
 
export default CalorieIntakeInput;