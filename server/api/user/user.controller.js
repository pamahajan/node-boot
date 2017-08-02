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
		await incrUserCount();
		ctx.body = {
			success: true,
			user: newUser
		}
		ctx.status = 200;
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

exports.getUserCtrl = async function(ctx, next){
	try{

		let userId = ctx.params.id;
		let q = {};
		if(userId)
			q._id = userId;

		let params = {
			filter: q
		};

		let users = await get(params);
		if(userId)
			users = users[0];

		ctx.body = {
			success: true,
			user: users
		}

		ctx.status = 200;
	} catch(err){

		ctx.status = err.status || 500;
		ctx.body = {
			success: false,
			error: err.message || 'Internal Server Error'
		},
		l.error('File: User.Controller --> getUserCtrl --> Error --> ', err);
		ctx.app.emit(err, 'error', ctx);
	}
}

exports.getUserCount = async function(ctx, next){
		try{

			let userCount = await UserServices.getUserCount();

			ctx.body = {
				success: true,
				count: userCount
			};
			ctx.status = 200;
		} catch(err){

			ctx.status = err.status || 500;
			ctx.body = {
				success: false,
				error: err.message || 'Internal Server Error'
			},
			l.error('File: User.Controller --> getUserCount --> Error --> ', err);
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

let get = async function(params){
	try{

		return await UserServices.get(params);
	} catch(err){
		l.error('File: user.controller --> get --> Error --> ', err);
		throw(err);
	}
}

let incrUserCount = async function(){
	try{

		return await UserServices.incrUserCount();
	} catch(err){

		l.error('File: user.controller --> incrUserCount --> Error', err);
		throw(err);
	}
}
