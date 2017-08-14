/**
 * @module Library
 * */
var mongoose = require('mongoose');
//var pureautoinc = require("mongoose-pureautoinc");
//var url = require('url');



var CONN_DISCONNECTED = 0,
    CONN_DISCONNECTING = 3,
    CONN_CONNECTED = 1;

//mongodb://openedu:kinky1289@ds145138.mlab.com:45138/openedu
//var MONGOHQ_URI = 'mongodb://openedu:kinky1289@ds145138.mlab.com:45138/openedu';
var MONGOHQ_URI = 'mongodb://whatuser:1234567@ds133428.mlab.com:33428/whatsapp';
//var MONGOHQ_URI = 'mongodb://cvbankuser:kinky1289@paulo.mongohq.com:10060/cvbank';
//The modifications I made to this file are expected, if the connection is closed, to connect to the database if everytime.
//var MONGOHQ_URI = 'mongodb://daser:admin@ds045157.mongolab.com:45157/cvbank';
var openConnection = function(callback) {

    if (mongoose.connection === undefined ||
                    mongoose.connection.readyState === CONN_DISCONNECTED ||
                    mongoose.connection.readyState === CONN_DISCONNECTING) {
        
        mongoose.connection.on('connected', function() {

            console.log('Db connected');
            
            if (callback) {
                callback(true);
            }
        });

        mongoose.connection.on('error', function(e) {
            console.log('Db connection error');
            if (callback) {
                callback(e);
            }else {
                console.log(e);
            }
        });
        
        mongoose.connect(MONGOHQ_URI);
    }else {
        if (callback) {
            callback(true);
        }
    }
    
};

var closeConnection = function () {
    if (mongoose.connection && mongoose.connection.readyState === CONN_CONNECTED) {
        mongoose.disconnect();
        
        mongoose.connection.removeAllListeners('connected');
        
        mongoose.connection.removeAllListeners('error');
    }
};

/**
 * core database class exposing Mongoose object after making connection
 * @class Db
 * */
function Db(callback) {
    this.close = function() {
        closeConnection();
    };
    
    this.open = function(callback) {
        openConnection(callback);
        return mongoose;
    };
    
    //Let mongoose open and close the connection as we like.
    mongoose.open  = function(callback) {
        openConnection(callback);
        return mongoose;
    };
    
    mongoose.close = function() {
      closeConnection();  
    };
    
    openConnection(callback);
    
    return mongoose;
}

/***
 * dragintcore-test-db | { _id: ObjectId("51c8a1d73111c7409510fc7f"), user: "draguser", pwd: "10c4577030475b1ae417d28bdd22b7fa", readOnly: false }
 * dragintweb-test-db | { _id: ObjectId("51c8a20d9232add66627da6c"), user: "draguser", pwd: "10c4577030475b1ae417d28bdd22b7fa", readOnly: false }
 * */
//Just export the function and do not initialize so that 
//I have to explicitly do that in order to be a able to plug a callback
module.exports = Db;
