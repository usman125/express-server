var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormSchema = new Schema({
	name: String,
	smeRef: String,
	components: String,
	type: String,
	page: {
		type: Number,
		value: 0
	},
	numPages: {
		type: Number,
		value: 0
	},
	created_at: {
		type: Date,
		default: new Date
	}
});

module.exports = mongoose.model('forms', FormSchema);