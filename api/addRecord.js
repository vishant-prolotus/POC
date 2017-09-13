require('dotenv').load()
var University = require('../mongoConfig')
var contract = require('truffle-contract');
var university_artifacts = require('../build/contracts/University.json');
var axios = require('axios')

var web3_extended = require('web3_extended');

var options = {
	host: process.env.RPC,
	ipc: true,
	personal: true,
	admin: false,
	debug: true
};

var web3 = web3_extended.create(options);
var Uni = contract(university_artifacts);

module.exports = {
	add: function (req, res, next) {

		var record;
		var self = this;
		var roll = req.body.roll;
		var email = req.body.email;
		var name = req.body.name;
		var fname = req.body.fname;
		var datepicker = req.body.datepicker;
		var year = parseInt(req.body.year);
		var marks = parseInt(req.body.marks);
		var course = req.body.course;

		var account = req.session.address;
		var phrase;

		University.findOne({ address: account })
		.then(function (response) {
			phrase = response.phrase;

			axios.post(process.env.API + 'account/unlock', {
				address: account,
				password: phrase
			})
			.then(function (re) {
				console.log('UNLOCKED')
				Uni.setProvider(web3.currentProvider);
				Uni.deployed()
				.then(function (instance) {
					record = instance;
console.log(web3.eth.coinbase)
					record.addRecord(account, name, marks, year, true, fname, email, datepicker, year, { from:web3.eth.coinbase , gas: 2000000 }).then(function(tx){
						console.log('add record')
						res.json({ status: "Success", university: account, name: name, roll: year, marks: marks, status: true })
					});
				})
			})
		})
		.catch(function (e) {
			res.json({ error: e })
		})
	},
	get: function (req, res, next) {

		var record;
		var self = this;

		var account = req.session.address;
		var phrase;

		University.findOne({ address: account })
		.then(function (response) {
			Uni.setProvider(web3.currentProvider);
			Uni.deployed()
			.then(function (instance) {
				record = instance;
				record.getUniversity.call(account, {from: account}).then(function(tx){
					console.log(tx);
					return tx;
				}).then(function(re){
					console.log(re[2]);
					records = [];
					count = 0
					for(i = 0; i < re[2]; i++) {
						record.getRecord.call(account, i, {from:account}).then(function(rec){
							count++;
							rec.push(i)
							records.push(rec);
							if(count == re[2]) {
								res.json({ status: "Success", university: re, records: records })
							}
						})
					}
					if(re[2] == 0){
						res.json({ status: "Success", university: re, records: records })
					}
				});
			})
		})
		.catch(function (e) {
			res.json({ error: e })
		})
	}
}
