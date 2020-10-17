const Exercise = require('../../../util/database/model/exercise');

const getExercise = (req,res) =>{
  Exercise.find({},(err,exercise)=>{
    if(err){
      return res.status(500).json({error:"Server error, try again later."});
    }
    return res.status(200).json({exercises:exercise});
  })
}

module.exports = {getExercise};