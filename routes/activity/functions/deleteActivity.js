const Activity = require('../../../util/database/model/activity');

const deleteActivity = (req,res)=>{
  const {_id} = req.body;
  if(!_id){
    return res.status(400).json({error:"Please provide the id of the activity to delete"});
  }
  Activity.deleteOne({_id},(err)=>{
    if(err){
      return res.status(400).json({error:err});
    }else{
      return res.status(200).json({suucess:"Activity deleted."});
    }
  });
}

module.exports = {deleteActivity};