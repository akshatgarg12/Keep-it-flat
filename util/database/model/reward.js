const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  photo:{
    type:String,
    required:true,
    default:""
  },
  points:{
    type:Number,
    required:true,
    default:0
  }
}, {timestamps:true});


module.exports = new mongoose.model('Reward', RewardSchema);