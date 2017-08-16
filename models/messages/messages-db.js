var db = global.db;
var Schema = db.Schema;

var MessageSchema = new Schema({

	messageby: {
	    type: Schema.ObjectId,
        ref:'members'
	},

	message: { type: String, required:true, default:"."},
	
	createdAt: { type: Date, default: Date.now}
    
});
	
module.exports.MessageModel = db.model('messages', MessageSchema);