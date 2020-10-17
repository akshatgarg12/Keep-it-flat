const Activity = require('../../../util/database/model/activity');

const getActivity = (req,res)=>{
  const {_id} = req.user;
  Activity.find({logger:_id},(err,activities)=>{
    if(err){
      console.log(err);
      return res.status(500).json({error:`try again later.`});
    }
    else{
      return res.status(200).json({activity:activities});
    }
  })
}


module.exports = {getActivity}