var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt=require('bcrypt-nodejs');
var USER;
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());


/* 注册 */
router.get('/', function(req, res) {
  res.render('register',{'layout':'LAYOUT.ejs',message:''});
});

router.post('/', function(req, res) {
  
});

function SetModel(model)
{
  USER=model;
}

module.exports = router;

module.exports.SetModel=SetModel;