var express = require('express');
var router = express.Router();

var auth = function (req, res, next) {
	if (req.session && req.session.isLogged)
		return next();
	else
		return res.redirect('/login');
};

var addUniversity = require('../api/addUniversity');
var unlockAccount = require('../api/unlockAccount');
var ethBalance = require('../api/ethBalance');
var ethTransfer = require('../api/ethTransfer');
var createAccount = require('../api/createAccount');
var University = require('../api/University');
var addRecord = require('../api/addRecord');
var getRecord = require('../api/getRecord');
var getUniversity = require('../api/getUniversity');
var signIn = require('../api/signIn');
var test = require('../api/test');

router.post('/university/add', addUniversity.add);
router.post('/account/unlock', unlockAccount.unlock);
router.post('/balance/eth', ethBalance.balance);
router.post('/transfer/eth', ethTransfer.ethTransfer);
router.post('/account/create', createAccount.create);
router.post('/record/add',auth, addRecord.add);
router.get('/record/get',auth, addRecord.get);
router.post('/university/get', getUniversity.get);
router.post('/university/signin', signIn.signin);

router.get('/university/inactive',auth, University.inactive);
router.get('/university/active',auth, University.active);
// router.get('/test', test.test);
router.post('/university/activate',auth, University.activate);

module.exports = router;
