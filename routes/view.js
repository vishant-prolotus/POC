var express = require('express');
var router = express.Router();

var auth = function (req, res, next) {
	if (req.session && req.session.isLogged)
		return next();
	else
		return res.redirect('/login');
};

router.get('/', function (req, res, next) {
	res.render('register', { title: "Sofocle" });
});

router.get('/login', function (req, res, next) {
	res.render('login', { title: "Login" });
});

router.get('/student/add',auth, function (req, res, next) {
	res.render('student', { title: "Add Record" });
});

router.get('/student/listing',auth, function (req, res, next) {
	res.render('studentlisting', { title: "Student List" });
});

router.get('/student/view/:index',auth, function (req, res, next) {
	res.render('student-view', { title: "Verify Record", index: req.params.index });
});

router.get('/sofocle',auth, function (req, res, next) {
	res.render('index', { title: "Register" });
});

module.exports = router;
