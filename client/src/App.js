import React, { useContext, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MainPage from './pages/Main';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import UserContextProvider, {UserContext} from './hooks/UserContextProvider';
import {ACTIONS} from './hooks/userReducer';
import Footer from './components/footer';


const ProtectedRoute = () => {
  const history = useHistory();
  const {state, dispatch} = useContext(UserContext);
  useEffect(()=>{
    if(localStorage.getItem('user')){
      return history.push('/')
    }
  },[state]);
  // if user logged in push to /, else to /login
  return (
    <>
        <Route exact path="/">
          <Navbar 
            link="logout" 
            onClick = {()=>{
               dispatch({type:ACTIONS.logout});
               setTimeout(()=>{
                history.push('/login');
               },2000);
            }}
          />
          <MainPage />
          <Footer />

        </Route>

        <Route path="/login">
          <Navbar 
            link="register"
            onClick = {()=>{
              return history.push('/register');
            }}
          />
          <LoginPage />
        </Route>

        <Route path="/register">
          <Navbar 
            link="login"
            onClick = {()=>{
              return history.push('/login');
            }}
          />
          <RegisterPage />
       </Route>

    </>
  );
}

function App() {
  return (
      <Router>
        <UserContextProvider>
          <div className="App">
          <Switch>
              <ProtectedRoute />
          </Switch>
          </div>
      </UserContextProvider>
      </Router>

  );
}

export default App;
