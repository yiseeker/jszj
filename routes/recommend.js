var express = require('express');
var router = express.Router();

/* 推荐 */
router.get('/', function(req, res,next) {
  res.render('recommend',{'layout':'LAYOUT.ejs'});
});

module.exports = router;
