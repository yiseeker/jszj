var express = require('express');
var async =require('async');
var router = express.Router();
var path =require('path');

var ACTIVITY;//This is mongodb model
var MODULE;//This is mongodb model
var CONTENT;//This is mongodb model

//All users content needs authentication, or the request will be redirect to login page automatically
router.all('*',function(req,res,next){
    if(!req.isAuthenticated())
    {
        res.redirect('/login');
    }
    next();
});

router.get('/myProfile',function(req,res){

    res.render('users/myProfile',{'layout':'LAYOUT.ejs'});
});



router.get('/myActivity',function(req,res){
    res.render('users/myActivity',{'layout':'LAYOUT.ejs'});
});



router.get('/myParticipate',function(req,res){
    res.render('users/myParticipate',{'layout':'LAYOUT.ejs'});
});



router.get('/editActivity',function(req,res){
    res.render('users/editActivity',{'layout':'LAYOUT.ejs'});
});



router.get('/showActivity',function(req,res){
    res.render('users/showActivity',{'layout':'LAYOUT.ejs'});
});



router.get('/previewActivity',function(req,res){
    res.render('users/previewActivity',{'layout':'LAYOUT.ejs'});
});


router.post('/saveActivity',function(req,res){
    async.waterfall([
            function(callback)//检查传递进来的数据的准确性
            {
                if(req.body.moduleContent==null||req.body.moduleList.length==0)
                {
                    return callback('数据传递时出错，请联系客服！');
                }
                if(req.body.moduleList==null||req.body.moduleList.length==0)
                {
                    return callback('数据传递时出错，请联系客服！');
                }
                return callback(null);
            },
            function(callback)//检查用户是否保存过同名活动
            {

            }
        ],
        function rollback(err,result)//最终的处理，回滚或提交
        {

        }
    );

});




function SetModel(list)
{
    for(var i in list)
    {
        if(list[i].modelName=='APP_USER_ACTIVITY')
        {
            ACTIVITY=list[i].model;
        }
        if(list[i].modelName=='APP_ACTIVITY_MODULE')
        {
            MODULE=list[i].model;
        }
        if(list[i].modelName=='APP_MODULE_CONTENT')
        {
            CONTENT=list[i].model;
        }
        if(ACTIVITY!=null&&MODULE!=null&&CONTENT!=null)
        {
            return;
        }
    }
}

module.exports = router;
module.exports.SetModel=SetModel;

