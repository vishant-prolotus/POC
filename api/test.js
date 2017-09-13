var University = require('../mongoConfig')
require('dotenv').load()

module.exports = {
	test: function (req, res, next) {

		University.find({} , function(er, uni){

			uni.forEach(function(u){
				u.bcrypt = u.password + 'RAvi';
				u.save();
			})
		});
	},
}