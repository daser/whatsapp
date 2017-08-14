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



  // trust the proxy to get true IP addresses
    app.enable('trust proxy');
    app.use(logger('dev'));
    //app.use(cors.allowCrossDomain);
    app.use(cors());
    app.use(compress());
    app.use(methodOverride('X-HTTP-Method-Override'));
//    app.use(bodyParser.text({ type: 'text/html' }));
    app.use(bodyParser.json());
    app.use(cookieParser());


    var port = process.env.PORT || 8080;
    var ip = process.env.IP;


    // START APPLICATION
    app.listen(port, ip);

    app.get('/', function(req, res) { res.send('Hello from WhatsappClone'); });
    router.route(app);

    console.log('WhatsappClone started. Listening on port ' + port);


// CATASTROPHIC ERROR
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.json(500, {status : 'error', message : 'Something broke in our WhatsappClone! (' + err.message + ')'});
  
});
