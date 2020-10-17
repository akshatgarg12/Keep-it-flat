const Activity = require('../../../util/database/model/activity');
const moment  = require('moment');
const getTodaysData = (req,res) =>{ 
  const today = moment().startOf('day')
  Activity.find({
    logger:req.user._id,
    createdAt:{
      $gte: today.toDate(),
      $lte: moment(today).endOf('day').toDate()
    }
  }, (err, activities)=>{
    if(err){
      return res.status(400).json({error:"Something went wrong."})
    }
    console.log(today.toDate(), moment(today).endOf('day').toDate());
    return res.status(200).json({activity : activities});
  })

}

const getWeeksData = (req,res) => {
  var currentDate = moment();
  var weekStart = currentDate.clone().startOf('isoWeek');
  var weekEnd = currentDate.clone().endOf('isoWeek');


  Activity.find({
    logger:req.user._id,
    createdAt:{
      $gte: weekStart.toDate(),
      $lt: weekEnd.toDate()
    }
  }, (err, activities)=>{
    if(err){
      return res.status(400).json({error:"Something went wrong."})
    }
    return res.status(200).json({activity : activities});
}
  )
}

module.exports = {
  getTodaysData,
  getWeeksData
}