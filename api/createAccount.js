var University = require('../mongoConfig')
var web3_extended = require('web3_extended');
require('dotenv').load()

var options = {
	host: process.env.RPC,
	ipc: true,
	personal: true,
	admin: false,
	debug: false
};

var web3 = web3_extended.create(options);

module.exports = {
	create: function (req, res, next) {
		var email = req.body.email;
		var id = req.body.id;
		var password = req.body.password;
		var pub = '';
		var phrase = Math.random().toString(36).substring(7);
		var status = false;
		web3.personal.newAccount(phrase, function (error, result) {
			if (!error) {
				web3.personal.getListAccounts(function (er, re) {
					if (!er && re.length > 0) {
						var pub = re[re.length - 1];
						var college = new University({
							"email": email,
							"id": id,
							"password": password,
							"address": pub,
							"phrase": phrase,
							"status": status
						});
						college.save()
							.then(function (response) {
								res.send({ status: 'SUCCESS', address: pub, Active: status });
							})
							.catch(function (e) {
								res.json({ status: "Failure", Error: e, message: "Can not create new account." })
							});
					}
				});
			} else {
				console.log("ERROR NEW acc", error)
			}
		});
	},
}