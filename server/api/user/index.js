/**
 * User Crud Main Index File
 */

let Router = require('koa-router'),
	userRouter = Router(),
	parse = require('koa-better-body'),
	userController = require('./user.controller'),
	convert = require('koa-convert');

userRouter.post('/', convert(parse()), userController.createCtrl);
userRouter.get('/', userController.getUserCtrl);
userRouter.get('/:id', userController.getUserCtrl);

exports.router = userRouter;