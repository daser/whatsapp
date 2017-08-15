var util = require("util");
var mongoose = require("mongoose");


function toObjectId(id) {
	return mongoose.Types.ObjectId(id);
}


function route(app) {
  
  app.get('/api/message/all', function (req, res, next){
    var Message = require("../models/messages.js").Messages;   
    var c = new Message();
    c.findAll(function(data) {
      res.json(data);
    });
  });
    
     // get financial data
    app.get('/api/test', function (req, res, next) {
        res.send("Hello World from the APi Endpoint");
    });
    
    
    
    //get By Employee Id
  app.get('/api/message/:id', function (req, res, next) {
    
    var Message = require("../models/messages.js").Messages;   
    var c = new Message();
    
    if(req.params.id === ""){
        res.json({"status":"-102", "info":"(id) parameter is required"});
        return;
    }
    
    var id = req.params.id;
    id = toObjectId(id);
    c.findById(id,function(data) {
      if (util.isError(data)) {
        res.json({"status":"-101", "info":data.message});
      } else {
        res.json({"status":"100", "info" : data});
      }
    });
    
  });
  
  
  
  
  app.post('/api/message/new', function(req, res, next){

       var options = {
            message: req.body.message, //it means we would require 'message' in the request structure from the frontend
            messageby: toObjectId(req.body.messageby) //it means we would require 'messageby' in the request structure from the frontend
        };

        var Message = require("../models/messages.js").Messages;
    
    var c = new Message();
    c.create(options, function(data){
      if (util.isError(data)){
          res.json({"status":"-101", "info":data.message});

        //res.json(500, data.message);
      } else {
        //res.json(data);
        res.json({"status":"100", "info" : data});

      }
    });
    });
      
      


   //app.delete('/message/:id', function (req, res, next) 
   //Usman, do you prefer the delete verb abi make i leave am as post
  // i prefer the delete verb
      
   app.post('/api/message/delete/:id', function (req, res, next) {
    
    var Message = require("../models/messages.js").Messages;   
    var c = new Message();
    
    if(req.params.id=== ""){
        res.json({"status":"-102", "info":"(id) parameter is required"});
        return;
    }
    
    var id = req.params.id;
    var msgid = toObjectId(id);
    c.delete(msgid,function(data) {
      if (util.isError(data)) {
        res.json({"status":"-101", "info":data.message});
      } else {
        res.json({"status":"100", "info" : data});
      }
    });
    
  });  

    
}

module.exports.route = route;
