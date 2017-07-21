'use strict'

const UserServices = require('./user.service'),
	l = require('./../../components/logger').root.child({'module': __filename.substring(__dirname.length + 1, __filename.length - 3)});

exports.createCtrl = async function(ctx, next){
	try{

		let reqBody = ctx.request.fields;
		if(!reqBody)
			ctx.throw('Invalid Request', 400);

		l.info('Request to create new user: ', reqBody);
		let newUser = await create(reqBody);
		if(!newUser)
			ctx.throw('Internal Server Error', 500);

		l.info('user Added, user -->', newUser);
		ctx.body = {
			success: true,
			user: newUser
		}
	} catch(err){
		
		ctx.status = err.status || 500;
		ctx.body = {
			success: false,
			error: err.message || 'Internal Server Error'
		},
		l.error('File: User.Controller --> createCtrl --> Error --> ', err);
		ctx.app.emit(err, 'error', ctx);	
	}
}

let create = async function(userData){
	try{

		return await UserServices.create(userData);
	} catch(err){
		l.error('File: User.Controller --> create --> Error --> ', err);
		throw(err);
	}
}