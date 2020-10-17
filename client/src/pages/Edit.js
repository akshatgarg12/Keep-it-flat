import React, { useContext, useState } from 'react'
import FormInput from './../components/formInput';
import FormButton from './../components/formButton';
import { UserContext } from '../hooks/UserContextProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function EditProfile() {
  
  const [height, setHeight] = useState(''); 
  const [weight, setWeight] = useState(''); 
  const [goal, setGoal] = useState(''); 
  const [photo, setPhoto] = useState(); 
  const {state} = useContext(UserContext);
  function onUpload(e){
    if(e.target.files[0]){
      console.log(e.target.files[0]);
      var reader = new FileReader();
      reader.onload = function(event){
      setPhoto(event.target.result)
      }            
      reader.readAsDataURL(e.target.files[0])
  }
}
  function submitForm(){
    if(!state) return;

    const {accessToken} = state;
    fetch('/user/edit/',{
      method:"POST",
      mode:"cors",
      headers:{
        "Content-type":"application/json",
        "authorization":`Bearer Bearer ${accessToken}`
      },
      body:JSON.stringify({
        photo,
        height,
        weight,
        goal
      })
    }).then(async(res)=>{
      const data = await res.json();
      console.log(data);

      if(res.status === 200){
       toast.success('User updated! login again to see results.');
      }else{
        toast.error(res.success);
        // toast the error
      }
    })
  
  }

  return (
    <div className="form-div hidden" id="edit">
      <form onSubmit={(e)=>{
            e.preventDefault();
            submitForm();
        }}>
        <div className="form-input-div">
          <i className={`fas fa-user`} />
        <input 
          className="form-input"
          autoComplete="none"
          type="file"
          placeholder="profile pic"
          onChange={onUpload}
        />
      </div>
        <FormInput 
          icon="arrow-up"
          type="text"
          placeholder="height"
          value={height}
          setValue={setHeight}
        />
        <FormInput 
          icon="weight"
          type="text"
          placeholder="current weight(in kg)"
          value={weight}
          setValue = {setWeight}
        />
        <FormInput 
          icon="goal"
          type="text"
          placeholder="goal weight(in kg)"
          value={goal}
          setValue = {setGoal}
        />
        <FormButton 
          title="I have changed."
        />
    </form>
  </div>
  )
}
