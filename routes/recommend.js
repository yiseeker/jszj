var express = require('express');
var router = express.Router();

/* 推荐 */
router.get('/', function(req, res) {
  res.render('recommend',{'layout':'LAYOUT.ejs'});
});

module.exports = router;
