const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const {connectDB} = require("./config/database")
const cors = require("cors");
const http = require('http');
const issueRouter = require('../routes/issueRouter');
require('dotenv').config();


app.use(cookieParser());
app.use(express.json());

app.use("/",issueRouter);

//TESTING API
app.get('/hello', (req, res) => {
    try{
    res.send('hello');
    }catch(err){
        res.send(err.message);
    }
  });
  

 connectDB()
.then(()=>{    
    // console.log("successfully connected to the database");
    //appp.listen to => server.listen to make sockets work
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:`);
      });
    })
    .catch((err)=>{
    console.log("An error occured :/");
    })