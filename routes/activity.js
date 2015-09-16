var express = require('express');
var router = express.Router();

/* 热门 */
router.get('/', function(req, res,next) {
  res.render('activity',{'layout':'LAYOUT.ejs'});
});

module.exports = router;
