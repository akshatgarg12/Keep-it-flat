const User = require('../../../util/database/model/user');
const uuid = require('uuid').v4;
const createPasswordResetMessage = require('../../../util/middleware/auth/passwordResetMessage');
const bcrypt = require('bcrypt');

const initialisePasswordReset = (req,res) =>{
  const {email} = req.body;
  if(!email){
    return res.status(401).json({error:"please send the email address of user."});
  }
  User.findOne({email},(error,user)=>{
    if(error){
      return res.status(401).json({error:"Wrong credentials provided."});
    }
    if(user){
      const passwordToken = uuid();
      createPasswordResetMessage(passwordToken,email,res);
      user.passwordToken = passwordToken;
      user.refreshToken = null;
      user.save();
      return res.status(200).json({success:"Password reset initiated successfully, please check your mail."});
    }
    else{
      return res.status(401).json({error:"User doesn't exists."});
    }
  })
}

const passwordResetVerify = (req,res) => { 
  const {email,passwordToken, password,re_password} = req.body;
  if(!email || !passwordToken || !password || !re_password){
    return res.status(401).json({error:"Please fill all the fields to move further."});
  }
  if(password !== re_password){
    return res.status(401).json({error:"Passwords don't match."});
  }
  User.findOne({email},(error,user)=>{
    if(error){
      return res.status(401).json({error:"Wrong credentials provided."});
    }
    if(user){
      if(user.passwordToken === passwordToken){
        
        bcrypt.hash(password,10,(error,password)=>{
          if(error){
            console.log(error);
            return res.status(401).json({error:"Wrong credentials provided."});
          }
          user.password = password;
          user.passwordToken = null; 
          user.refreshToken = null;
          user.save();
          return res.status(200).json({success:"Password reset success, try logging in with new password."});
        });
        
      }
      else{
        return res.status(401).json({error:"Wrong credentials provided."});
      }
    }
    else{
      return res.status(401).json({error:"User doesn't exists."});
    }
  })
}



module.exports = {
  initialisePasswordReset,
  passwordResetVerify,
}