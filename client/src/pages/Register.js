import React, { useState } from 'react';
import FormInput from './../components/formInput';
import FormButton from './../components/formButton.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [re_password, setRe_password] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const SubmitForm = (e) =>{
    e.preventDefault();
    if(!name || !email || !password || !re_password || !height || !weight){
      return toast.error('fill all the fields',{
        autoClose:1500
      })
    }
    fetch('/user/register',{
      method:"POST",
      mode: 'cors',
      headers: {
      'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name,
        nickname,
        height,
        weight,
        email,
        password,
        re_password
      })
    }).then(async(res)=>{
        const response = await res.json();
        if(res.status===200){
          return toast.success(response.success,{
            autoClose:1500
          });
        }else{
          return toast.error(response.error,{
            autoClose:1500
          });
        }
      }).catch(e =>{
        return toast.error(e)
      })
  }

  return (  
    <div className="form-div" onSubmit={SubmitForm}>
      <form>
        <FormInput 
          icon="user"
          type="text"
          placeholder="name"
          value={name}
          setValue={setName}
        />
        <FormInput 
          icon="signature"
          type="text"
          placeholder="nickname"
          value={nickname}
          setValue={setNickname}
        />
        <FormInput 
          icon="weight"
          type="text"
          placeholder="weight (in kg)"
          value={weight}
          setValue={setWeight}
        />
        <FormInput 
          icon="arrow-up"
          type="text"
          placeholder="height (in cm)"
          value={height}
          setValue={setHeight}
        />
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
          setValue={setPassword}
        />
        <FormInput 
          icon="key"
          type="password"
          placeholder="re-type password"
          value={re_password}
          setValue={setRe_password}
        />
        <FormButton 
          title="Register"
        />
      </form>
  </div>
  );
}
 
export default RegisterPage;