var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt=require('bcrypt-nodejs');
var async =require('async');
var USER;
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());



/* 注册 */
router.get('/', function(req, res) {
  res.render('register',{'layout':'LAYOUT.ejs',message:''});
});

router.post('/', function(req, res) {
  //do checks on mongodb
  async.waterfall([
    function (callback)//1.Check if specfy username exists in db
    {
      USER.find({'username':req.body.username},function(err,users){
        if(err)
        {
          return callback('出现内部错误，请联系统管理员！');
        }
        if(users.length==0)
        {
          return callback(null);
        }
        return callback('用户名已存在!');
      });
    },
    function(callback)//2.Check if Email exist
    {
      USER.find({'email':req.body.email},function(err,emails){
        if(err)
        {
          return callback('出现内部错误，请联系统管理员！');
        }
        if(emails.length==0)
        {
          return callback(null);
        }
        return callback('电子邮箱帐号已存在!');
      });
    },
    function(callback)//3.Check if mobile exists
    {
      USER.find({'mobile':req.body.mobile},function(err,mobiles){
        if(err)
        {
          return callback('出现内部错误，请联系统管理员！');
        }
        if(mobiles.length==0)
        {
          return callback(null);
        }
        return callback('手机号已存在!');
      });
    }
  ],
  function(err,result)
  {
    if(err)
    {
      res.render('register',{'layout':'LAYOUT.ejs',message:err});
    }
    else
    {
      //Validation passed, save the user infomation.
      bcrypt.hash(req.body.pwd,null,null,function(err,hash){
        var regUser={'username':req.body.username,'password':hash,'email':req.body.email,'mobile':req.body.mobile};
        USER.create(regUser,function(err,user){
          if(err)
          {
            res.render('register',{'layout':'LAYOUT.ejs',message:'登记用户失败，请联系系统管理员!'});
          }
          else
          {
            req.logIn(user, function(err) {
              return res.redirect('/index');
            });
          }
        });
      });

    }
  });
});






function SetModel(list)
{
  for(var i in list)
  {
    if(list[i].modelName=='USER')
    {
      USER = list[i].model;
      break;
    }
  }
}

module.exports = router;

module.exports.SetModel=SetModel;