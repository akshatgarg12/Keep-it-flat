const User = require('../../../util/database/model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = (req,res) => {
  const {email,password} = req.body;
  console.log(email,password);
  if(!email || !password){
    return res.status(401).json({error:"Please fill all the required fields"});    
  }else{
    return _loginMiddleware(email,password,res);
  }
}

const _loginMiddleware = (email,password,res) => {
  User.findOne({email},(error,user)=>{
    if(error){
      console.log(error);
      return res.status(401).json({error:"Wrong credentials provided."});  
    }
    if(user){
      bcrypt.compare(password,user.password,(err,match)=>{
        if(err){
          console.log(err);
          return res.status(401).json({error:"Wrong credentials provided."});  
        }
        if(match){
          const accessToken = jwt.sign(user.toJSON(),process.env.ACCESSTOKEN_SECRET, {expiresIn:"2h"});
          // const refreshToken = jwt.sign({user},process.env.REFRESHTOKEN_SECRET, {expiresIn:"1 days"});
          // user.refreshToken = refreshToken; user.save();
          user.password=undefined;
          return res.status(200).json({accessToken,user});
        }else{
          return res.status(401).json({error:"Wrong credentials provided."});  
        }
      });
    }else{
      return res.status(401).json({error:"Wrong credentials, User doesn't exists."});  
    }
  }).catch(e => {
    console.log(e);
    return res.status(500).json({error:"Server error, please try again later."});
  })
}



module.exports = {login};