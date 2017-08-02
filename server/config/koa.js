'use strict'

let fs = require('fs'),
	path = require('path'),
	config = require('./environment'),
	morgan = require('koa-morgan'),
  l = require('./../components/logger').root.child({'module': __filename.substring(__dirname.length + 1, __filename.length - 3)});

module.exports.default = function(app){
	l.info('Defining Middlewares');

	let accessLogStream = fs.createWriteStream(config.log.accessLogPath, {falgs: 'a'});
	app.use(morgan('combined', {stream: accessLogStream}));
}
