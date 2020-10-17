import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FormButton from '../components/formButton';
import FormInput from '../components/formInput';
import {UserContext} from './../hooks/UserContextProvider';
import {ACTIONS} from './../hooks/userReducer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const LoginPage = () => {
  const {state, dispatch} = useContext(UserContext);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const history = useHistory();

  useEffect(()=>{
    if(dispatch({type:ACTIONS.status})){
      return history.push('/home');
    }else{
      return history.push('/login');
    }
  },[state])
  
  const Login = () =>{
    fetch('/user/login', {
      method:"POST",
      mode: 'cors',
      headers: {
      'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    }).then(async (response)=>{
      const res = await response.json();
      if(response.status===200){
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('user', JSON.stringify(res.user));
          toast.success("successfully logged in!.",{
            autoClose:1500
          });
          dispatch({type:ACTIONS.login});
          setTimeout(()=>{
            return history.push('/home');
          },2000)
      } 
      else{
        toast.error(res.error,{
            autoClose:1500
          });
        }
      }
    ).catch(e => {
      toast.error(e,{
        autoClose:1500
      });
      }) 
  }

  return (
    <div className="form-div">
      <form onSubmit={(e)=>{
            e.preventDefault();
            Login();
          }}>
        <FormInput 
          icon="envelope"
          type="email"
          placeholder="email"
          value={email}
          setValue={setEmail}
        />
        <FormInput 
          icon="key"
          type="password"
          placeholder="password"
          value={password}
          setValue = {setPassword}
        />
        <FormButton 
          title="Login"
        />
      </form>
    </div>
  );
}
 
export default LoginPage;