var express = require('express');
var router = express.Router();
var async =require('async');


var ACTIVITY;//This is mongodb model
var ITEM;//This is mongodb model
var MODULE;//This is mongodb model
var ITEMSINMODULE;//This is mongodb model
var EVALUATION;//This is mongodb model

//需要登录才可访问次模块功能
router.all('*',function(req,res,next){
    if(!req.isAuthenticated())
    {
        res.send({'succeed':false,'message':'请先登录才可以使用此功能！'});
    }else
    {
        next();
    }
});

//点赞
router.post('/agree',function(req,res){
    async.waterfall([
            function(callback){
                EVALUATION.find({'ref_type':req.body.type,'ref_id':req.body.id,'creatorID':req.user.username},function(err,docs){
                    if(err)
                    {
                        return callback('查询点赞状态时出现错误!');
                    }
                    else
                    {
                        if(docs!=null)
                        {
                            if(docs.length!=0)
                            {
                                return callback('您已经评价过!');
                            }
                        }
                        return callback(null);
                    }
                });
            },
            function(callback){
                var eva=new EVALUATION();
                eva.creationDate=new Date();
                eva.ref_type=req.body.type;
                eva.ref_id=req.body.id;
                eva.agree='Y';
                eva.creatorID=req.user.username;

                eva.save(function(err,doc){
                    if (err) {
                        return callback(err);
                    }
                    else {
                        return callback(null, doc);
                    }
                });
            }
        ],
        function(err,result){
            if(err)
            {
                res.send({'succeed':false,'message':''+err});
            }
            else
            {
                res.send({'succeed':true,'message':'保存成功!'});
            }
        });
});

//点烂
router.post('/disagree',function(req,res){
    async.waterfall([
            function(callback){
                EVALUATION.find({'ref_type':req.body.type,'ref_id':req.body.id,'creatorID':req.user.username},function(err,docs){
                    if(err)
                    {
                        return callback('查询点赞状态时出现错误!');
                    }
                    else
                    {
                        if(docs!=null)
                        {
                            if(docs.length!=0)
                            {
                                return callback('您已经评价过!');
                            }
                        }
                        return callback(null);
                    }
                });
            },
            function(callback){
                var eva=new EVALUATION();
                eva.creationDate=new Date();
                eva.ref_type=req.body.type;
                eva.ref_id=req.body.id;
                eva.agree='N';
                eva.creatorID=req.user.username;

                eva.save(function(err,doc){
                    if (err) {
                        return callback(err);
                    }
                    else {
                        return callback(null, doc);
                    }
                });
            }
        ],
        function(err,result){
            if(err)
            {
                res.send({'succeed':false,'message':''+err});
            }
            else
            {
                res.send({'succeed':true,'message':'保存成功!'});
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
        if(list[i].modelName=='APP_EVALUATION')
        {
            EVALUATION=list[i].model;
        }
        if(ACTIVITY != null && ITEM != null && MODULE != null && ITEMSINMODULE!=null && EVALUATION!=null)
        {
            return;
        }
    }
}

module.exports = router;
module.exports.SetModel=SetModel;