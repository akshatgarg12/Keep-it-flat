const mongoose = require('mongoose');

const _exercise = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  photo:{
    type:String,
  },
  reps:{
    type:Number,
    required:true
  }
}) 

const ExerciseSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  photo:{
    type:String,
    required:true,
  },
  calorie_burned:{
    type:Number,
    required:true,
    default:0
  },
  content:{
    type:[_exercise],
    required:true,
  },
}, {timestamps:true});


module.exports = new mongoose.model('Exercise', ExerciseSchema);