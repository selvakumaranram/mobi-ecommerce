const express= require('express');
const cors = require('cors');
const mongoose= require('mongoose');

const brandRouter= require('./route/admin/brand.route');
//const smartphone= require('./route/admin/smartphone.route');
const upload = require('./route/upload.route');
require('dotenv').config();

const app=express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  })
app.use(cors());
app.use(express.json());

const uri =process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true,useFindAndModify:false});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("mongodb connection established");
})


app.use('/api/admin/brand',brandRouter);
//app.use('/admin/smartphone',smartphone);

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
});