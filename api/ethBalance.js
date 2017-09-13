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

var errorMessage = "";
module.exports = {
	balance: function (req, res, next) {
		var self = this;
		var address = req.body.address;
		web3.eth.getBalance(address, function (err, response) {
			if (!err)
				res.send({ status: 'SUCCESS', address: address, balance: web3.fromWei(response, "ether") });
			else
				res.send({ status: 'Failure', message: err });
		})
	},
}