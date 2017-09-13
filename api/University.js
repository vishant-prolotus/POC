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
	active: function (req, res, next) {
		var self = this;
		University.find({ status: true })
			.then(function (response) {
				res.json({ message: "SUCCESS", response: response })
			})
			.catch(function (e) {
				res.json({ message: "Failure", Error: e})
			})
	},
	inactive: function (req, res, next) {
		var self = this;
		University.find({ status: false })
			.then(function (response) {
				res.json({ message: "SUCCESS", response: response })
			})
			.catch(function (e) {
				res.json({ message: "Failure", Error: e})
			})
	},
	activate: function (req, res, next) {
		var self = this;
		var uni;
		University.findOne({ email: req.body.email, address: req.body.address }).then(function (response) {

			axios.post('http://localhost:3000/api/account/unlock',{address: web3.eth.coinbase,password:'adonis2115'})
			.then(function(res){
				console.log(res.data.status)
			}).then(function(){
				Uni.setProvider(web3.currentProvider);
				Uni.deployed().then(function(instance){
					uni=instance;
					uni.addUniversity(response.address, response.email, {from: web3.eth.coinbase, gas: 2000000}).then(function(txid){
						console.log(txid)
						response.status = true;
						response.save();
						res.json({ status: "SUCCESS", message: "Successfully added."})
					})
				})
			})
		}).catch(function(e){
			res.json({ error: e })
		})
	}
}
