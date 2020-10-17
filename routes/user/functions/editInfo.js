const User = require('../../../util/database/model/user');
const {cloudinary} = require('./../../../util/middleware/cloudinary/cloudinary');
const EditInfo = async(req,res) =>{
  const {_id} = req.user;
  const {photo, height, weight, goal}= req.body;
  
  User.findOne({_id},async(err,user)=>{
    if(err){
      return res.status(400).json({error:"error! Try again"});
    }
    if(photo){
      const uploadedResponse = await cloudinary.uploader.upload(photo,{
        upload_preset:"keepitflat"
      })
      user.photo = uploadedResponse.secure_url;
    }
    if(weight){
      user.weight = weight;
    }
    if(height){
      user.height = height;
    }
    if(goal){
      user.goal = goal;
    }
    user.save();
    return res.status(200).json({success:"User updated!", user:user});
  })
}

module.exports = {EditInfo}