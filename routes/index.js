var express = require('express');
var router = express.Router();

/* 首页 */
router.get('/', function(req, res,next) {
  res.render('index',{'layout':'LAYOUT.ejs'});
});
router.get('/index', function(req, res,next) {
  res.render('index',{'layout':'LAYOUT.ejs'});
});

/* 关于我们 */
router.get('/aboutUs', function(req, res) {
  res.render('aboutUs',{'layout':'LAYOUT.ejs'});
});



module.exports = router;

