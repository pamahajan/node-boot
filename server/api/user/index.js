/**
 * User Crud Main Index File
 */

let Router = require('koa-router'),
	userRouter = Router(),
	parse = require('koa-better-body'),
	userController = require('./user.controller'),
	convert = require('koa-convert');

/**
 * @api {post} /v1/user Create New User
 * @apiName Create New User
 * @apiGroup User
 *
 * @apiParam {Object} name 
 * @apiParam {String} name.first User's first name
 * @apiParam {String} name.last user's last name
 * @apiParam {Object} contactInfo
 * @apiParam {String} contactInfo.email User's Email ID
 * @apiParam {Number} role
 *
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} user
 * @apiSuccess {String} name.first User's first name
 * @apiSuccess {String} name.last user's last name
 * @apiSuccess {Object} contactInfo
 * @apiSuccess {String} contactInfo.email User's Email ID
 * @apiSuccess {Number} role
 * 
 * @apiError (Error 400) {Boolean} success
 * @apiError (Error 400) {String} error 'Invalid Request'
 * 
 * @apiError (Error 404) {Boolean} success
 * @apiError (Error 404) {String} error 'Not Found'
 * 
 * @apiError (Error 500) {Boolean} success
 * @apiError (Error 500) {Boolean} error 'Internal Server Error'
 */ 
 
userRouter.post('/', convert(parse()), userController.createCtrl);
userRouter.get('/', userController.getUserCtrl);
userRouter.get('/:id', userController.getUserCtrl);

exports.router = userRouter;