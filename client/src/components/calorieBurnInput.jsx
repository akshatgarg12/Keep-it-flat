import React, { useContext, useState } from 'react';
import ActivityInput from './activityInput';
import ActivityButton from './activityButton';
import { UserContext } from '../hooks/UserContextProvider';
import {postActivity} from '../utils/postActivity.js';


const CalorieBurnInput = ({setValue}) => {
  const [activity, setActivity]=useState('');
  const [calorie_burned, setCalorie] = useState('');
  const {state} = useContext(UserContext);
  const SubmitCalorie = (e) =>{
    e.preventDefault();
    setValue(true)
    postActivity(activity,"0",calorie_burned,state.accessToken);
  }
  return (
    <form className="row-flex" onSubmit={SubmitCalorie}>
        <ActivityInput
          icon="dumbbell"
          placeholder="exercise name"
          value={activity}
          setValue={setActivity}
          />
        <ActivityInput
          icon="sort-amount-down"
          placeholder="calorie-burned"
          value={calorie_burned}
          setValue={setCalorie}
          />
        <ActivityButton 
          title="+"
        />
    </form>
  );
}
 
export default CalorieBurnInput;