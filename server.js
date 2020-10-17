const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const db_connection = require('./util/database/config/connect')
const PORT = 5000 || process.env.PORT;
const path = require('path');

// middleware
app.use(cors());
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb', extended: true}));


// routes
const userRoutes = require('./routes/user/all');
const exerciseRoutes = require('./routes/exercises/all');
const activityRoutes = require('./routes/activity/all');

app.use('/user',userRoutes);
app.use('/exercise',exerciseRoutes);
app.use('/activity',activityRoutes);


if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'));

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}


app.listen(PORT,()=> console.log(`${PORT}:active`));