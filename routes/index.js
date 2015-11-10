var express = require('express');
var router = express.Router();
var ACTIVITY;//This is mongodb model
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


/* 显示所有活动 */
router.get('/activityList', function(req, res) {
  res.render('activityList',{'layout':'LAYOUT.ejs'});
});

router.post('/getActivityByType',function(req,res){
    ACTIVITY.find({'activityType':req.body.type,'enabled':true},function(err,docs){
      if(err)
      {
        res.send({'succeed':false,'message':err});
      }
      else
      {
        res.send({'succeed':true,'message':'获取活动列表成功！','list':docs});
      }
    });
});


function SetModel(list)
{
  for(var i in list)
  {
    if(list[i].modelName=='COM_ACTIVITY')
    {
      ACTIVITY=list[i].model;
      return;
    }
  }
}
module.exports = router;
module.exports.SetModel=SetModel;

