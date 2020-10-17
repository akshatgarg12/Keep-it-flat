import React, {createContext, useReducer} from 'react';
import {reducer} from '../hooks/userReducer';


export const UserContext = createContext();
const UserContextProvider = (props) => {

  let accessToken  = localStorage.getItem('accessToken')
  let user = localStorage.getItem('user')
  let initialState = null
  if(accessToken && user){
    initialState = {
      accessToken,user
    }
  }
  const [state, dispatch] = useReducer(reducer,initialState);

  return (
    <UserContext.Provider value={{state, dispatch}}>
      {props.children}
    </UserContext.Provider>
  );
}
 
export default UserContextProvider;