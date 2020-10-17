const User = require('../../../util/database/model/user');
const bcrypt = require('bcrypt');
const quickemailverification = require('quickemailverification').client(process.env.MAILVERIFY_API_KEY).quickemailverification();
const uuid = require('uuid').v4;
const createVerificationMessage = require('../../../util/middleware/auth/emailVerificationMessage');


const register = (req, res) => {
  const {name, email, nickname, password, re_password, height, weight} = req.body;
  if(!name || !email || !password || !re_password || !height || !weight){
    return res.status(401).json({error:"Please fill all the required fields."});
  }
  else{
    // check password match.
    if(password !== re_password){
      return res.status(401).json({error:"passwords don't match"});
    }
    User.findOne({email}, (err, user)=>{
      if(err){
        return res.status(500).json({error:"Server error, try again later."});
      }
      if(user){
        // console.log(user);
        return res.status(401).json({error:"Account with this email, already exists."});
      }else{
        bcrypt.hash(password,10,(err, password)=>{
          if(err) { 
            console.log(err);
            return res.status(500).json({error:"Server error, try again later."});
          }
          // now verify users email
          const user = new User({
            name,
            email,
            nickname,
            password,
            height,
            weight
          });
          quickemailverification.verify(email, function (err, response) { 
              if(err){
                return res.status(500).json({error:"Server error, try again later."});
              }
              else{
                if(response.body.result === "valid"){
                  const emailToken = uuid();
                  user.emailToken =emailToken;
                  createVerificationMessage(req,emailToken,email,res);
                  user.save().then((succ, err)=>{
                    if(err){
                      return res.status(500).json({error:"Server error, try again later."});
                    }
                    console.log(`user with ${email} created.`);
                    return res.status(200).json({success:"User successfully registered, please verify your email to login."});
                  }).catch(e => {
                    console.log(e);
                    return res.status(500).json({error:"Server error, try again later."});
                  })
                }else{
                  return res.status(401).json({error:"The email id provided is not valid."});
                }
              }
            });
        });
      }
    })
  }
  
}



module.exports = {register};