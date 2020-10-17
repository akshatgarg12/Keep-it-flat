import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


export const ACTIONS = {
  login:"login",
  logout:"logout",
  status:"status"
}

export const reducer = (state, action) =>{
  switch (action.type) {
    case ACTIONS.login:
      return LoginFunction();
    case ACTIONS.logout:
      return LogoutFunction(state);
    case ACTIONS.status:
      return StatusFunction(state);
    default:
      return state;
  }
}
  const LoginFunction =() => {
    const accessToken = localStorage.getItem('accessToken');
    const user  = JSON.parse(localStorage.getItem('user'));
    return {
      accessToken,
      user
    }
  }

  const LogoutFunction = ()=>{
      toast.success('logged out!',{
        autoClose:1500
      })
      localStorage.clear();
      return null;
  }

  const StatusFunction = (state) => {
    if(!state && (!(localStorage.getItem('accessToken')) || !(localStorage.getItem('user')))){
      localStorage.clear();
      return null;
    }
    else{
      const accessToken = localStorage.getItem('accessToken');
      const user = localStorage.getItem('user');
      return {
        accessToken,
        user
      }
    }
  }