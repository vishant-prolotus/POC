require('dotenv').load()
var address = require('../address.js');
var contract = require('truffle-contract');
var record_artifacts = require('../build/contracts/Record.json');
var web3_extended = require('web3_extended');
var University = require('../mongoConfig')
var axios = require('axios')

var Record = contract(record_artifacts);

var account = web3.eth.coinbase;

module.exports = {
	add: function (req, res, next) {

		Record.setProvider(web3.currentProvider);
		var record;
		var self = this;

		var address = req.body.address;
		var id = req.body.id;

		axios.post(process.env.API + 'account/unlock', {
			address: account,
			password: 'adonis2115'
		})
			.then(function () {
				Record.deployed()
					.then(function (instance) {
						record = instance;
						return record.addUniversity(address, id, { from: account, gas: 200000 });
					})
					.then(function () {
						axios.post(process.env.API + 'transfer/eth', {
							addressTo: address
						})
						University.findOneAndUpdate({ address: req.body.address }, { $set: { status: true } }, { new: true })
							.then(function (response) {
								console.log(`${address} Approved & 10 Ether Transfered`);
							})
							.catch(function (e) {
								console.log('update error' + e);
							})
						res.json({ status: "Success", university: address, id: id })
					})
					.catch(function (e) {
						res.json({ message: "Failed", Error: e })
					});
			})
			.catch(function (e) {
				res.json({ status: "Failure", Error: e })
			})
	}
}