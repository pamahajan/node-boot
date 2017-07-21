'use strict'

let path = require('path');
let _ = require('lodash');

function requiredProcessEnv(name){
	if(!process.env[name]) {
		throw new Error('You must set the ' + name + ' environment variable'); 
	}
	return process.env[name];
}

let all = {
	env: process.env.NODE_ENV,

	root: path.normalize(__dirname + '/../../../'),

	port: process.env.PORT || 9000,

	ip: process.env.IP || '127.0.0.1',

	seedDb: false,

	secrets: {
		session: 'pocket-pill-secret'
	},

	userRoles: ['guest', 'user', 'admin'],

	mongo: {
		options: {
			useMongoClient: true
		}
	},

	log: {
		path: path.join(__dirname, './../../logs', process.env.NODE_ENV, 'base-project.' + process.env.NODE_ENV + '.log'),
		accessLogPath: path.join(__dirname, './../../logs/', process.env.NODE_ENV, 'base-project.' + process.env.NODE_ENV + '.access.log')
	}
}

module.exports = _.merge(
	all,
	require('./' + process.env.NODE_ENV + '.js') || {});