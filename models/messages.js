var messagesDB = require('./messages/messages-db.js');
var MessageModel = messagesDB.MessageModel;

function Message() {
    
    
Message.prototype.create = function(properties, callback){
    var self = this;

    var message = new MessageModel(properties);
                message.save(function(err, record){
                    if(err) {
                        callback(err);
                    }else{
                        callback(record !== null ? record.toJSON() : null);  
                    }
                });

};




Message.prototype.findById = function(id, callback) {  
        // Access Right: Everybody there own record
        MessageModel.findOne({_id : id}).populate('messageby').lean().exec(function(err, record) {   
            if (err) {
                callback(err);
            }else {
                callback(record);
            }
            
        });
        
    };



  Message.prototype.delete = function(id, callback){
        
        MessageModel.remove({'_id':id}, function(err, record) {
          
          if(err){
              callback(err);
          }else{
              callback(record);
          }
          
      });
    };

 Message.prototype.findAllMsgUsers = function(callback){
    //   MessageModel.find({messageby: members._id}, function(err, record) {
          
    //       if(err){
    //           callback(err);
    //       }else{
    //           callback(record);
    //       }
          
    //   });
    MessageModel.find().populate({'path':'messageby'}).exec(function(err, record) {
    //console.log(groups[0][0].name)
     if(err){
               callback(err);
           }else{
               callback(record);
           }
    });
 };


//  yourRecord.find({}).populate(branch.$id).exec(function(err, data){
//   console.log(data)
//});

 Message.prototype.findAll = function(callback){
        
        // Access Right: Super User Only
        
        MessageModel.find({}, function(err, record) {
          
          if(err){
              callback(err);
          }else{
              callback(record);
          }
          
      });
    };


}
module.exports.Messages = Message;
