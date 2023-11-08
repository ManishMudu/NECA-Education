var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.get('/events', function(req, res, next) {
  res.render('events');
});

router.get('/eventview', function(req, res, next) {
  res.render('eventview');
});

router.get('/newsadd', function(req, res, next) {
  res.render('newsadd');
});

router.get('/newsview', function(req, res, next) {
  res.render('newsview');
});

router.get('/adminnav', function(req, res, next) {
  res.render('adminnav');
});

router.get('/admindashboard', function(req, res, next) {
  res.render('admindashboard');
});

router.get('/adminprofile', function(req, res, next) {
  res.render('adminprofile');
});

module.exports = router;
