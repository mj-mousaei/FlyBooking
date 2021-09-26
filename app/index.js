const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
const morgan = require('morgan');
const winston = require("winston");
const UserRoutes = require("./routes/UserRoutes");
const RequestRoutes = require("./routes/RequestRoutes");
const Errorss = require("./http/middleware/Error");


const app = express();

class Application {
    constructor(){

      this.setupExpressServer();
      this.setupMongoose();
      this.setupRoutesAndMiddlware();
      this.setupConfigs();
  
    }
  
    setupConfigs(){
      winston.add(new winston.transports.File({filename : 'error-log.log'}));
  
      process.on("uncaughtException", (err) =>{
      console.log(err);
      winston.error(err.message);
      });
      process.on("unhandleRejection", (err) =>{
      console.log(err);
      winston.error(err.message);
      });
    }
  
    setupRoutesAndMiddlware(){
      //Middleware
  
      app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      next();
      });
  

  
      app.use(morgan("tiny"));
      app.use(express.json());
      app.use(express.static('uploads'));
      app.use(express.static('css'));
  
      //routes
      app.use(UserRoutes);
      app.use(RequestRoutes);  

 
      app.use(Errorss);
    }
  
    setupMongoose(){
      mongoose
      .connect('mongodb://localhost/maam', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify : false,
      useCreateIndex : true,
      })
      .then(() => console.log('Connected to MongoDB...'))
      .catch((err) => console.error('Could not connect to MongoDB...', err));
  
    
    }


  
  
    setupExpressServer(){
      const port = 5001;
      app.listen(port, (err) => {
      if (err) console.log(err)
      else console.log(`app listen to port ${port}`);
      })
    }
  }
  
  module.exports = Application;
  