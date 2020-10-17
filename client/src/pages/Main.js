import React, { useEffect, useState } from 'react';
import UserCard from './../components/UserCard';
import ActivityLogger from './../components/ActivityLogger';
import { useHistory } from 'react-router-dom';
import GraphSection from '../components/GraphSection';
import ExerciseSection from '../components/ExerciseSection';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EditProfile from './Edit';


const MainPage = () => {
  const [user,setUser] = useState({});
  const history = useHistory();
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('user'));
    if(userData){
      setUser(userData);
    }else{
      return history.push('/login');
    }
  },[]); 
  
  return (
    <>
      <div className="first-section row-flex">
        <UserCard
          photo={user.photo}
          name={user.name}
          nickname={user.nickname}
          gender="Male"
          height={user.height}
          weight={user.weight}
          goal={user.goal || 75} 
          progress="------"
        />
        <ActivityLogger />
    </div>
        <EditProfile />
        <GraphSection />
        <ExerciseSection />
  </>
  );
}
 
export default MainPage;