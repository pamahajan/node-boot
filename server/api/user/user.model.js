'use strict'

let Mongoose = require('mongoose'),
	Schema = Mongoose.Schema;

let userSchema = new Schema({
	name: {
		first: {
			type: String,
			required: true
		}, last: {
			type: String,
			required: true
		}
	}, contactInfo: {
		email: {
			type: String,
			required: true,
			unique: true
		}, 
	}, role: {
		type: String,
		required: true
	}

});

Mongoose.model('User', userSchema);