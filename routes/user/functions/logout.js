const User = require('../../../util/database/model/user');


const logout = (req,res) => {
  const {refreshToken} = req.body;
  
  if(!refreshToken){
    return res.status(401).json({error:"Please provide with the refreshToken"});
  }  
  console.log(typeof(refreshToken))
  User.findOne({refreshToken},(err,user)=>{
    if(err){
      console.log(err);
      return res.status(401).json({error:"Wrong credentials provided."});
    }
    if(user){
      console.log("user logged out");
      user.refreshToken = null;
      user.save();
      return res.status(200).json({success:"Successfully logged out."});
    }else{
      return res.status(401).json({error:"Wrong credentials provided."});
    }
  });
}

module.exports = {logout};