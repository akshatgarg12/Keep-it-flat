const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  photo:{
    type:String,
    required:true,
    default:"https://cdn1.vectorstock.com/i/thumb-large/82/55/anonymous-user-circle-icon-vector-18958255.jpg"
  },
  weight:{
    type:Number,
    required:true,
    default:70
  },
  height:{
    type:Number,
    required:true,
    default:175
  },
  goal:{
    type:Number,
    required:true,
    default:70
  },
  nickname:{
    type:String,
    required:true,
    default:"super mario"
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  passwordToken:{
    type:String,
    default:null
  },
  emailToken:{
    type:String,
    default:null
  },
  verified:{
    type:Boolean,
    required:true,
    default:false
  },
  badges:[{
    type:ObjectId,
    ref:'Reward'
  }],
  activity:[{
    type:ObjectId,
    ref:'Activity'
  }],
  height:{
    type:Number,
    required:true,
    default:0
  },
  weight:{
    type:Number,
    required:true,
    default:0
  },
  goal:{
    type:Number,
    default:0
  }
}, {timestamps:true});


module.exports = new mongoose.model('User', UserSchema);