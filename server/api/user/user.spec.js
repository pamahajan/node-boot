const Chai = require('chai'),
	Expect = Chai.expect,
	ChaiThings = require('chai-things'),
	Request = require('co-request');

Chai.use(ChaiThings);

describe('Create New User API : ', function(){
	let url = 'http://127.0.0.1:9000/v1/user';
	let json = {
		name: {
			first: 'Parth',
			last: 'Mahajan'
		}, contactInfo: {
			email: 'pm1494@gmail.com'
		}, role: 4
	};
	it('returns 400 in case of no data sent via post request', async function(){
		

		let result = await Request({
			url: url,
			method: 'POST'
		})

		Expect(result.statusCode).to.equal(400);
	});
});