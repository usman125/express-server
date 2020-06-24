var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
	name: String,
	author: String,
	publish: String,
	userRef: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	exchange: Boolean,
	reading: Boolean,
	completed: Boolean,
	wishlist: Boolean,
	created_at: {
		type: Date,
		default: new Date
	}
});

module.exports = mongoose.model('books', BookSchema);