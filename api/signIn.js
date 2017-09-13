var University = require('../mongoConfig')
require('dotenv').load()

module.exports = {
	signin: function (req, res, next) {
		var self = this;

		University.findOne({ email: req.body.email, password: req.body.password })
			.then(function (response) {
				console.log(response)
				if (response !== null) {
					req.session.email = response.email;
					req.session.id = response.id;
					req.session.address = response.address;
					req.session.isLogged = true;
					res.send({ status: 'SUCCESS', message: 'Successfully logged in.', isLogged: req.session.isLogged })
				} else {
					req.session.destroy()
					res.send({ status: 'FAILED', message: 'Failed login attempt. Please retry.' })
				}
			})
			.catch(function (e) {
				console.log('update error' + e);
				res.json({ "Error": e })
			})
	}
}