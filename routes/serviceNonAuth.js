var express = require('express');
var router = express.Router();
var async =require('async');


var ACTIVITY;//This is mongodb model
var ITEM;//This is mongodb model
var MODULE;//This is mongodb model
var ITEMSINMODULE;//This is mongodb model
var EVALUATION;//This is mongodb model


//获取活动的总评价数，点赞数和点烂数
router.post('/getEvaluation',function(req,res){
    var agreeCount=0;
    var disagreeCount=0;
    async.waterfall([
            function(callback)//获取总赞数
            {
                EVALUATION.find({'ref_type':req.body.type,'ref_id':req.body.id,'agree':'Y'},function(err,docs){
                    if(err)
                    {
                        callback('获取评价信息时出错！');
                    }
                    else
                    {
                        if(docs==null)
                        {
                            agreeCount=0;
                        }
                        else
                        {
                            agreeCount=docs.length;
                        }
                        return callback(null);
                    }
                });
            },
            function(callback)//获取总烂数
            {
                EVALUATION.find({'ref_type':req.body.type,'ref_id':req.body.id,'agree':'N'},function(err,docs){
                    if(err)
                    {
                        callback('获取评价信息时出错！');
                    }
                    else
                    {
                        if(docs==null)
                        {
                            disagreeCount=0;
                        }
                        else
                        {
                            disagreeCount=docs.length;
                        }
                        return callback(null);
                    }
                });
            }
        ],
        function(err,result){
            if(err)
            {
                res.send({'succeed':false,'message':err});
            }
            else
            {
                res.send({'succeed':true,'message':'获取评价信息成功！','total':agreeCount+disagreeCount,'agree':agreeCount,'disagree':disagreeCount});
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