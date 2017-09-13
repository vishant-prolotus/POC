require('dotenv').load()
var address = require('../address.js');
var contract = require('truffle-contract');
var record_artifacts = require('../build/contracts/Record.json');
var web3_extended = require('web3_extended');
var University = require('../mongoConfig')
var axios = require('axios')

var Record = contract(record_artifacts);

module.exports = {
	get: function (req, res, next) {

		Record.setProvider(web3.currentProvider);
		var record;
		var self = this;

		var address = req.body.address;
		var roll = req.body.roll;

		var account = address;

		Record.deployed()
			.then(function (instance) {
				record = instance;
				return record.getStudent.call(address, roll, { from: account });
			})
			.then(function (response) {
				res.json({ status: "Success", university: address, name: response[1], roll: response[0].c[0], marks: response[2].c[0], pass: response[3] })
			})
			.catch(function (e) {
				res.json({ message: "Failed", Error: e })
			});
	}
}