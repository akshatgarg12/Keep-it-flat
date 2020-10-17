const User = require('../../database/model/user');
const jwt = require('jsonwebtoken');
// for protected routes.

const userAuth = (req,res,next) =>{
  var accessToken = req.headers["authorization"];
  if(!accessToken){
    return res.status(401).send({error:"You must be logged in to access this"}) 
  }
  accessToken = accessToken.split(' ')[2];
    // console.log(accessToken); 
  jwt.verify(accessToken,process.env.ACCESSTOKEN_SECRET,(err, payload)=>{
    if(err){
      console.log(err)
      return res.status(401).json({error:"You must be logged in to access this"});
    }else{
      // console.log(payload)
      const {_id} = payload;
      User.findById(_id).then(userData =>{;
        req.user = userData;
        next();
      })
    }
  })
}

module.exports = {userAuth}