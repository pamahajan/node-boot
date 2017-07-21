'use strict'

require('./user.model');

const Mongoose = require('mongoose'),
	User = Mongoose.model('User'),
	l = require('./../../components/logger').root.child({'module': __filename.substring(__dirname.length + 1, __filename.length - 3)});

exports.create = async function(user){
	try{

		return await new User(user).save();
	} catch(err){
		l.error('File: User.Service --> create --> Error -->', err);
		throw(err);
	}
}