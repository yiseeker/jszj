var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var USER=require('../dbmodels/models').getModel('USER');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());


/* 注册 */
router.get('/', function(req, res) {
  res.render('register',{'layout':'LAYOUT.ejs'});
});

router.post('/', function(req, res) {
  USER.find({username:req.body.username},function(err,users){
    if(err){
      return console.log(err);
    }
    if(!users)
    {
      return console.log('find none');
    }
    console.log('get here');
    res.render('register',{'layout':'LAYOUT.ejs','message':users[0].password});
  });
});


module.exports = router;
