const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.DB_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
},(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("db connected successfully.")
  }
});