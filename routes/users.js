var express = require('express');
var async =require('async');
var router = express.Router();
var path =require('path');

var ACTIVITY;//This is mongodb model

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
                if(req.body.data.moduleContent==null||req.body.data.moduleList.length==0)
                {
                    return callback('数据传递时出错，请联系客服！');
                }
                if(req.body.data.moduleList==null||req.body.data.moduleList.length==0)
                {
                    return callback('数据传递时出错，请联系客服！');
                }
                return callback(null);
            },
            function(callback)//检查用户是否保存过同名活动
            {
                if(req.body.data.activityId=='')
                {
                    ACTIVITY.findOne({'activityName':req.body.data.activityName},function(err,doc){
                        if(err)
                        {
                            return callback(err);
                        }
                        if(doc!=null)
                        {
                            return callback('新增的活动存在同名活动，请修改活动名!');
                        }
                        return callback(null);
                    });
                }
                else
                {
                    ACTIVITY.findOne({'activityName':req.body.data.activityName,'_id':{$ne:req.body.data.activityId}},function(err,doc){
                        if(err)
                        {
                            return callback(err);
                        }
                        if(doc!=null)
                        {
                            return callback('同名活动已存在，无法更新!');
                        }
                        return callback(null);
                    });
                }


            },
            function(callback)//保存activity
            {
                if(req.body.data.activityId=='')//如果不是已保存的活动，则新增
                {
                    console.log(req.body.data);
                    var activity=new ACTIVITY();
                    var moduleList=new Array();
                    var moduleContent=new Array();
                    var _moduleList=req.body.data.moduleList;
                    var _moduleContent=req.body.data.moduleContent;
                    for(var i in _moduleList)
                    {
                        var name=_moduleList[i].name;
                        moduleList.push({'moduleName':name,'creationDate':new Date()});
                        for(var j in _moduleContent)
                        {
                            if(_moduleContent[j].moduleName==name)
                            var item={
                                'itemName':_moduleContent[j].itemName,
                                'itemDesc':_moduleContent[j].itemDesc,
                                'image':_moduleContent[j].image,
                                'price':_moduleContent[j].price,
                                'uom':_moduleContent[j].uom,
                                'itemId':_moduleContent[j].itemId,
                                'module':name
                            };
                            moduleContent.push({'moduleName':name,'creationDate':new Date(),'item':item});
                        }
                    }


                    activity.activityName=req.body.data.activityName;
                    activity.creatorID=req.user.username;
                    activity.activityType='COMMERCIAL';
                    activity.creationDate=new Date();
                    activity.enabled=req.body.data.enabled;
                    activity.activityDescription=req.body.data.activityDesc;
                    activity.activityContact=req.body.data.contactInfo;
                    activity.attachment1=req.body.data.pic1;
                    activity.attachment2=req.body.data.pic2;
                    activity.attachment3=req.body.data.pic3;
                    activity.attachment4=req.body.data.pic1Desc;
                    activity.attachment5=req.body.data.pic2Desc;
                    activity.attachment6=req.body.data.pic3Desc;
                    activity.moduleList=moduleList;
                    activity.moduleContent=moduleContent;

                    activity.save(function(err,doc){
                        if(err)
                        {
                            return callback(err);
                        }
                        else
                        {
                            return callback(null,doc);
                        }
                    });

                }
                else//对于已存在的活动进行更新
                {
                    console.log(req.body.data);
                    var moduleList=new Array();
                    var moduleContent=new Array();
                    var _moduleList=req.body.data.moduleList;
                    var _moduleContent=req.body.data.moduleContent;
                    for(var i in _moduleList)
                    {
                        var name=_moduleList[i].name;
                        moduleList.push({'moduleName':name,'creationDate':new Date()});
                        for(var j in _moduleContent)
                        {
                            if(_moduleContent[j].moduleName==name)
                                var item={
                                    'itemName':_moduleContent[j].itemName,
                                    'itemDesc':_moduleContent[j].itemDesc,
                                    'image':_moduleContent[j].image,
                                    'price':_moduleContent[j].price,
                                    'uom':_moduleContent[j].uom,
                                    'itemId':_moduleContent[j].itemId,
                                    'module':name
                                };
                            moduleContent.push({'moduleName':name,'creationDate':new Date(),'item':item});
                        }
                    }
                    ACTIVITY.findByIdAndUpdate(req.body.data.activityId,
                        {
                            'activityName':req.body.data.activityName,
                            'lastUpdateDate':new Date(),
                            'enabled':req.body.data.enabled,
                            'activityDescription':req.body.data.activityDesc,
                            'activityContact':req.body.data.contactInfo,
                            'attachment1':req.body.data.pic1,
                            'attachment2':req.body.data.pic2,
                            'attachment3':req.body.data.pic3,
                            'attachment4':req.body.data.pic4Desc,
                            'attachment5':req.body.data.pic5Desc,
                            'attachment6':req.body.data.pic6Desc,
                            'moduleList':moduleList,
                            'moduleContent':moduleContent
                        },
                        function(err,doc){
                            if(err){
                                return callback(err);
                            }
                            else
                            {
                                if(doc==null)
                                {
                                    return callback('活动更新失败！');
                                }
                                else
                                {
                                    return callback(null,doc);
                                }
                            }
                        });
                }
            }
        ],
        function rollback(err,result)//最终的处理，回滚或提交
        {
            if(err)
            {
                res.send({'success':false,'message':'保存失败,原因:'+err});
            }
            else
            {
                res.send({'success':true,'message':'保存成功!','activityId':result._id});
            }
        }
    );

});




function SetModel(list)
{
    for(var i in list)
    {
        if(list[i].modelName=='APP_COMMERCIALACTIVITY')
        {
            ACTIVITY=list[i].model;
            return;
        }
    }
}

module.exports = router;
module.exports.SetModel=SetModel;

