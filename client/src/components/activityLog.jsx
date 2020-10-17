import React, {useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../hooks/UserContextProvider';
toast.configure();


const ActivityLog = ({name, calorie, _id, setValue}) => {

  const {state} = useContext(UserContext);
  const deleteLog = () => {
    fetch('/activity/',{
      method:"DELETE",
      mode: 'cors',
      headers: {
      'Content-Type':'application/json',
      'authorization':`Bearer Bearer ${state.accessToken}`
      },
      body:JSON.stringify({
        _id
      })
    }
    ).then(async(res)=>{
      const response = await res.json();
      if(res.status===200){
        toast.error(response.success,{
          autoClose:1000
        })
        setValue(true);

      }else{
        toast.error(response.error,{
          autoClose:1000
        })
      }
    }).catch(e => {
      console.log(e);
    })
  }
  // styling
  var background ="#80ffdb"
  if(calorie > 300)background="#ffd166";
  if(calorie > 500)background="#f77f00";
  if(calorie > 700)background="#e63946";

  var style = {
    background
  }
  return (
    <div className="activity-log row-flex"style={style}>
      <h4><i onClick={deleteLog} className="fa fa-trash-o"/>   {name}</h4><h4>{calorie}</h4>
    </div>
  );
}
 
export default ActivityLog;