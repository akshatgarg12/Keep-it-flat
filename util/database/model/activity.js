const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ActivitySchema = new mongoose.Schema({
  activity:{
    type:String,
    required:true,
  },
  calorie_intake:{
    type:Number,
    required:true,
    default:0
  },
  calorie_burned:{
    type:Number,
    required:true,
    default:0
  },
  logger:{
    type:ObjectId,
    ref:'User'
  }
}, {timestamps:true});

module.exports = new mongoose.model('Activity', ActivitySchema);