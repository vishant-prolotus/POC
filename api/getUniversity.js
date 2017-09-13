require('dotenv').load()
var contract = require('truffle-contract');
var record_artifacts = require('../build/contracts/University.json');
var web3_extended = require('web3_extended');

var options = {
	host: process.env.RPC,
	ipc: true,
	personal: true,
	admin: false,
	debug: false
};

var web3 = web3_extended.create(options);

var Record = contract(record_artifacts);

module.exports = {
	get: function (req, res, next) {

		Record.setProvider(web3.currentProvider);
		var record;
		var self = this;

		var address = req.body.address;

		var account = address;
		console.log(address)

		Record.deployed()
			.then(function (instance) {
				record = instance;
				console.log(record)
				console.log(record.getUniversity.call(address, { from: web3.eth.coinbase }));
				return record.getUniversity.call(address, { from: web3.eth.coinbase });
			})
			.then(function (response) {
				res.json({ status: "Success", account: response[0], email: response[1], numRecords: response[2] })
			})
			.catch(function (e) {
				res.json({ message: "Failed", error: e })
			});
	}
}