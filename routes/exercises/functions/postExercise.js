const Exercise = require('../../../util/database/model/exercise');

const postExercise = (req,res)=>{
  if(req.admin){
    const {title, photo, calorie_burned,content} = req.body;
    if(!title || !photo || !calorie_burned || !content){
      res.status(400).json({error:"Fill in all the fields"});
    }else{
      const _exec = new Exercise({
        title,
        photo,
        calorie_burned,
        content
      });
      _exec.save();
      Exercise.find({},(err,exercise)=>{
        if(err){
          return res.status(500).json({error:"Server error, try again later."});
        }
        return res.status(200).json({message:"exercise added",exercises:exercise});
      })
    }
  }else{
    res.status(401).json({error:"You're unauthorised."})
  }
}

module.exports = {postExercise};