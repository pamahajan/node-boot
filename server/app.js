'use strict'

let config = require('./config/environment'),
	logger = require('./components/logger');

logger.init(config);

let koa = require('koa'),
	mongoose = require('mongoose'),
	co = require('co');

mongoose.Promise = require('bluebird');

let l = logger.root.child({'module': __filename.substring(__dirname.length + 1, __filename.length - 3)});

process.on('uncaughtException', ( err ) => {
	l.error(err, "Uncaught Exception");
});

process.on('uncaughtRejection', (err) => {
	l.error(err, "uncaughtRejection");
});

/**
 * Connect To MongoDB
 */

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', err => {
	l.error('MongoDB connection error: ', err);
	process.exit(-1);
});

mongoose.set('debug', true);

/**
 * Setup Server
 */

let app = new koa(),
	Router = require('koa-router');

let appRouter = Router(app);
require('./config/koa').default(app);
require('./routes').default(appRouter);

app.use(appRouter.routes());

app.init = co.wrap(async () => {
	l.info('Initializing server in Ip: %s on port %d in %s mode', config.ip, config.port, config.env);
	app.server = app.listen(config.port, config.ip);
});


app.init();

exports = module.exports = app;
