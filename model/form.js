var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormSchema = new Schema({
	id: String,
	name: String,
	components: [{}],
	created_at: {
		type: Date,
		default: new Date
	}
});

module.exports = mongoose.model('forms', FormSchema);