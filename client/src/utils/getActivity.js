import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


export const getActivity = (accessToken ,setValue) => {
  fetch('/activity/today',{
      method:"GET",
      mode: 'cors',
      headers: {
      'Content-Type':'application/json',
      'authorization':`Bearer Bearer ${accessToken}`
      }
    }
    ).then(async(res)=>{
      const response = await res.json();
      if(res.status===200){
        console.log(response.actvity);
        setValue(response.activity);
      }else{
        toast.error(response.error,{
          autoClose:1000
        })
      }
    }).catch(e => {
      console.log(e);
    })
}