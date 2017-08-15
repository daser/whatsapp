var util = require('util');
var mongoose = require('mongoose');

function toObjectId(id) {
	return mongoose.Types.ObjectId(id);
}

function route(app) {
    
    app.get('/api/accounts/all', function (req, res, next) {
        
        var Member = require("../models/members.js").Members;   
        var c = new Member();

        c.findAll(function(data) {
          res.json(data);
        });
        
    });
    
    app.get('/api/accounts/:id', function (req, res, next) {
       
        var Member = require("../models/members.js").Members;   
        var c = new Member();
        
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
    
    app.post('/api/accounts/create', function (req, res, next) {
        
        var postData = {
            fullname: req.body.message, 
            shortname: req.body.shortname,
            phone: toObjectId(req.body.messageby) 
        };
        var Member = require("../models/members.js").Members;

        var c = new Member();
        c.create(postData, function(data){
            if (util.isError(data)){
                res.json({"status":"-101", "info":data.message});

            } else {
            //res.json(data);
            res.json({"status":"100", "info" : data});
    
            }
        });
    });
    
    app.delete('/api/accounts/:id', function (req, res, next) {
        
        if(req.params.id === "") {
             res.json({"status":"-102", "info":"(id) parameter is required"});
            return;
        }
        
        var Member = require("../models/members.js").Members;
        var c = new Member();
        
        
        var id = req.params.id;
        var memberid = toObjectId(id);
        c.delete(memberid, function(data) {
          if (util.isError(data)) {
            res.json({"status":"-101", "info":data.message});
          } else {
            res.json({"status":"100", "info" : data});
          }
        });
        
    });
}

module.exports.route = route;