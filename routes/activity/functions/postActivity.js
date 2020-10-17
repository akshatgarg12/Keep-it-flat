const Activity = require('../../../util/database/model/activity');


const postActivity = (req,res)=>{
  const {activity, calorie_intake, calorie_burned} = req.body;
  console.log(req.body);
  if(!activity || !calorie_burned || !calorie_intake){
    return res.status(400).json({error:`Fill all the fields.`});
  }
  const _acti = new Activity({
    activity,
    calorie_burned,
    calorie_intake,
    logger:req.user._id
  });
  _acti.save((err)=>{
    if(err){
      console.log(err);
      return res.status(400).json({error:`try again later.`});

    }
    else{
      return res.status(200).json({success:`activity by ${req.user.name} logged.`});
    }
  });

}


module.exports = {postActivity}