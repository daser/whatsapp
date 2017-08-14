var db = global.db;
var Schema = db.Schema;

var memberSchema = new Schema({

	fullname: {
		type: String,
		required: true
	},

	shortname:{ type: String, required:true},
	phone:String,
	createdAt: { type: Date, default: Date.now}
    
});
	
	
module.exports.MemberModel = db.model("members", memberSchema);
