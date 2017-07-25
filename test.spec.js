let Chai = require('chai');
let chaitThings = require('chai-things');
let expect = require('co-request');
chai.use(chaiThings);
let url = 'http://127.0.0.1:9000/v1/user'
describe('Create New User', function(){
it(' returns Error 500', async function(){
let result = request({
url: url, 
method: 'post'
})
expect( result.statusCode).to.equal(500)
expect( result.statusCode).to.equal(500)
})
it(' returns Error 400', async function(){
let result = request({
url: url, 
method: 'post'
})
expect( result.statusCode).to.equal(400)
expect( result.statusCode).to.equal(400)
})
it(' returns Error 404', async function(){
let result = request({
url: url, 
method: 'post'
})
expect( result.statusCode).to.equal(404)
expect( result.statusCode).to.equal(404)
})
})