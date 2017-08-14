var MembersDB = require('./messages/members-db.js');
var MemberModel = MembersDB.MemberModel;

function Member() {


Member.prototype.create = function(properties, callback){
    var self = this;

    var member = new MemberModel(properties);
                member.save(function(err, record){
                    if(err) {
                        callback(err);
                    }else{
                        callback(record !== null ? record.toJSON() : null);
                    }
                });

};




Member.prototype.findById = function(id, callback) {
        // Access Right: Everybody there own record
        MemberModel.findOne({_id : id}).lean().exec(function(err, record) {
            if (err) {
                callback(err);
            }else {
                callback(record);
            }

        });

    };



  Member.prototype.delete = function(id, callback){

        MemberModel.remove({'_id':id}, function(err, record) {

          if(err){
              callback(err);
          }else{
              callback(record);
          }

      });
    };


 Member.prototype.findAll = function(callback){

        // Access Right: Super User Only

        MemberModel.find({}, function(err, record) {

          if(err){
              callback(err);
          }else{
              callback(record);
          }

      });
    };


}
module.exports.Members = Member;
