var express = require('express');
var router = express.Router();
var ACTIVITY;//This is mongodb model
var ITEM;//This is mongodb model
var MODULE;//This is mongodb model
var ITEMSINMODULE;//This is mongodb model


/******************************get zone***********************************************/
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

/* 显示活动 */
router.get('/showActivity', function(req, res) {
  switch(req.query.type)
  {
    case 'COMMERCIAL':
          res.render('showCommercialActivity',{'layout':'LAYOUT.ejs'});
          break;
    default:
          break;
  }
});

/* 搜索界面 */
router.get('/search', function(req, res) {
  res.render('search',{'layout':'LAYOUT.ejs'});
});










/******************************post zone***********************************************/

//按类型获取所有活动
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

//获取活动信息
router.post('/getActivityInfo',function(req,res){
  ACTIVITY.findOne({'_id':req.body.activityID},
      function(err,doc){
        if(err)
        {
          res.send({'succeed':false,'message':err});
        }
        else
        {
          if(doc==null)
          {
            res.send({'succeed':false,'message':'未能获取到活动的明细信息！'});
          }
          else
          {
            res.send({'succeed':true,'message':'成功！','activity':doc});
          }

        }
      });
});

//获取模块列表
router.post('/getModuleList',function(req,res){
  MODULE.find({'activityID':req.body.activityID},
      function(err,docs){
        if(err)
        {
          res.send({'succeed':false,'message':err});
        }
        else
        {
          if(docs==null)
          {
            res.send({'succeed':false,'message':'未能获取任何模块信息！'});
          }
          else
          {
            var list=new Array();
            for(var i in docs)
            {
              list.push({'moduleName':docs[i].moduleName,'moduleID':docs[i]._id,'enabled':docs[i].enabled,'creationDate':docs[i].creationDate});
            }
            res.send({'succeed':true,'message':'获取列表成功！','list':list});
          }
        }
      });
});

//获取模块中的商品信息
router.post('/getItemsInModule',function(req,res){
  ITEMSINMODULE.find({'activityID':req.body.activityID},function(err,docs){
    if(err)
    {
      res.send({'succeed':false,'message':'获取模块中商品列表时失败，原因：'+err});
    }
    else
    {
      res.send({'succeed':true,'message':'获取模块中商品列表成功！','list':docs});
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
    }
    if(list[i].modelName=='COM_ITEMS')
    {
      ITEM=list[i].model;
    }
    if(list[i].modelName=='COM_MODULES')
    {
      MODULE=list[i].model;
    }
    if(list[i].modelName=='COM_ITEMSINMODULE')
    {
      ITEMSINMODULE=list[i].model;
    }
    if(ACTIVITY != null && ITEM != null && MODULE != null && ITEMSINMODULE!=null)
    {
      return;
    }
  }
}

module.exports = router;
module.exports.SetModel=SetModel;

