require('dotenv').load()
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB + 'Record');

var schema = new mongoose.Schema({
	email: String,
	id: String,
	address: String,
	phrase: String,
	password: String,
	status: Boolean,
	bcrypt: String
});

var University = mongoose.model('University', schema);

module.exports = University;