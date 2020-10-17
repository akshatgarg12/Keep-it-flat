const User = require('../../../util/database/model/user');


const emailVerify = (req,res) =>{
  var {emailToken} = req.params;
  console.log(req.params);
  // emailToken = emailToken.
  User.findOne({emailToken},(error,user)=>{
    if(error){
      console.log(error);
      return res.status(401).json({error:"Wrong credentials provided."});   
    }
    if(user){
      user.emailToken = null;
      user.verified = true;
      user.save();
      // redirect somewhere.
      return res.status(200).json({success:`User ${user.name}, email verified.`})
    }else{
      return res.status(401).json({error:"Wrong credentials provided."});  
    }
  })

}

module.exports = {emailVerify};