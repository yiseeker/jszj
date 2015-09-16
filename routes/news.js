var express = require('express');
var router = express.Router();

/* 新闻 */
router.get('/', function(req, res,next) {
  res.render('news',{'layout':'LAYOUT.ejs'});
});

module.exports = router;
