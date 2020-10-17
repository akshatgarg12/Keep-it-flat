import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


export const postActivity = (activity, calorie_intake,calorie_burned, accessToken) => {
  fetch('/activity/',{
    method:"POST",
    mode: 'cors',
    headers: {
    'Content-Type':'application/json',
    'authorization':`Bearer Bearer ${accessToken}`
    },
    body:JSON.stringify({
      activity, calorie_intake, calorie_burned
      })
    }
    ).then(async(res)=>{
      const response = await res.json();
      if(res.status===200){
        toast.success(response.success,{
          autoClose:1000
        })
      }else{
        toast.error(response.error,{
          autoClose:1000
        })
      }
    }).catch(e => {
      console.log(e);
    })
}