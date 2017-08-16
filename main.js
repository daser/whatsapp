global.db =  require("./libs/data/db.js")();
//var cors = require("./lib/api_cors/cors.js");

var cors = require("cors");
var logger = require('morgan');
var express = require('express');
var app = express(); //i can see your cursor here
var methodOverride = require('method-override');
var compress = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = require('./controllers/router.js');

var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require("mongoose");


function toObjectId(id) {
	return mongoose.Types.ObjectId(id);
}

  // trust the proxy to get true IP addresses
    app.enable('trust proxy');
    app.use(logger('dev'));
    //app.use(cors.allowCrossDomain);
    app.use(cors());
    app.use(compress());
    app.use(methodOverride('X-HTTP-Method-Override'));
//    app.use(bodyParser.text({ type: 'text/html' }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());


    var port = process.env.PORT || 8080;
    var ip = process.env.IP;


    // START APPLICATION
   // app.listen(port, ip);
    http.listen(port, function() {
    console.log('Server Started. Listening on *:' + port);
});

    app.get('/', function(req, res) { res.send('Hello from WhatsappClone'); });
    router.route(app);

    console.log('WhatsappClone started. Listening on port ' + port);

io.on('connection', function(socket){
  console.log('a user connected');
});


io.on('newmessage', function(data) {
console.log("i got here");
        var options = {
            message: data.message, //it means we would require 'message' in the request structure from the frontend
            messageby: toObjectId('507f191e810c19729de860ea')//data.messageby //it means we would require 'messageby' in the request structure from the frontend
        };

        var Message = require("models/messages.js").Messages;
    
    var c = new Message();
    c.create(options, function(data){
            // res.json({"status":"100", "info" : data});
             io.emit('messagecreated', data)
    });

  });

 io.on('connection', function (socket) {
     socket.emit('message', { message: 'welcome to the chat' });
 });
 
 io.on('fetchUsers', function(socket){
    socket.emit("fetchUsers", "welcome here"); 
 });

// CATASTROPHIC ERROR
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.json(500, {status : 'error', message : 'Something broke in our WhatsappClone! (' + err.message + ')'});
  
});
