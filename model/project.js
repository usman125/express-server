var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	name: String,
    url: String,  
    users: [{ type: Schema.Types.ObjectId, ref: 'users' }],  
  	created_at: {
		type: Date,
		default: new Date
	}
});

module.exports = mongoose.model('projects', ProjectSchema);