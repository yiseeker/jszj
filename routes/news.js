var express = require('express');
var router = express.Router();

/* 新闻 */
router.get('/', function(req, res) {
  res.render('news',{'layout':'LAYOUT.ejs'});
});

module.exports = router;
