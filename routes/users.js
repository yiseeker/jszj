var express = require('express');
var async =require('async');
var router = express.Router();
var path =require('path');
var fs=require('fs');

var ACTIVITY;//This is mongodb model
var ITEM;//This is mongodb model

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

router.get('/createItem',function(req,res){
    res.render('users/createItem',{'layout':'LAYOUT.ejs'});
});

router.post('/crItem',function(req,res){

});

router.get('/createActivity',function(req,res){
    res.render('users/createActivity',{'layout':'LAYOUT.ejs'});
});

router.get('/createModule',function(req,res){
    res.render('users/createModule',{'layout':'LAYOUT.ejs'});
});

//保存新的活动
router.post('/saveNewActivity',function(req,res){
    async.waterfall([
            function(callback)//检查用户是否保存过同名活动
            {
                ACTIVITY.findOne({'activityName':req.body.data.activityName},function(err,doc){
                    if(err)
                    {
                        return callback(err);
                    }
                    if(doc!=null)
                    {
                        return callback('存在同名活动，请修改活动名!');
                    }
                    return callback(null);
                });
            },
            function(callback)//将临时文件夹中的图片1转移到upload文件夹中
            {
                if(req.body.data.pic1!='')
                {
                    fs.rename('/home/linux/Projects/jszj/temp/'+req.body.data.pic1,'/home/linux/Projects/jszj/upload/'+req.body.data.pic1,function(err){
                        if(err)
                        {
                            return callback(err);
                        }
                        else
                        {
                            return callback(null);
                        }
                    });
                }
                else
                {
                    return callback(null);
                }
            },
            function(callback)//将临时文件夹中的图片2转移到upload文件夹中
            {
                if(req.body.data.pic2!='')
                {
                    fs.rename('/home/linux/Projects/jszj/temp/'+req.body.data.pic2,'/home/linux/Projects/jszj/upload/'+req.body.data.pic2,function(err){
                        if(err)
                        {
                            return callback(err);
                        }
                        else
                        {
                            return callback(null);
                        }
                    });
                }
                else
                {
                    return callback(null);
                }
            },
            function(callback)//将临时文件夹中的图片3转移到upload文件夹中
            {
                if(req.body.data.pic3!='')
                {
                    fs.rename('/home/linux/Projects/jszj/temp/'+req.body.data.pic3,'/home/linux/Projects/jszj/upload/'+req.body.data.pic3,function(err){
                        if(err)
                        {
                            return callback(err);
                        }
                        else
                        {
                            return callback(null);
                        }
                    });
                }
                else
                {
                    return callback(null);
                }
            },
            function(callback)//保存activity
            {
                var activity = new ACTIVITY();
                activity.activityName = req.body.data.activityName;
                activity.creatorID = req.user.username;
                activity.activityType = 'COMMERCIAL';
                activity.creationDate = new Date();
                activity.enabled = req.body.data.enabled;
                activity.activityDescription = req.body.data.activityDesc;
                activity.activityContact = req.body.data.contactInfo;
                activity.attachment1 = req.body.data.pic1;
                activity.attachment2 = req.body.data.pic2;
                activity.attachment3 = req.body.data.pic3;
                activity.attachment4 = req.body.data.pic1Desc;
                activity.attachment5 = req.body.data.pic2Desc;
                activity.attachment6 = req.body.data.pic3Desc;

                activity.save(function (err, doc) {
                    if (err) {
                        return callback(err);
                    }
                    else {
                        return callback(null, doc);
                    }
                });
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

//删除新增的物品
router.post('/deleteItem',function(req,res){
    ITEM.remove({'_id':req.body.data._id},function(err){
        if(err)
        {
            res.send({'succeed':false,'message':err});
        }
        else
        {
            res.send({'succeed':true,'message':'商品删除成功!'});
        }
    });
});

//保存新的物品
router.post('/saveNewItem',function(req,res){
    try
    {
        async.waterfall([
                function(callback){//活动项下是否存在同名物品
                    ITEM.findOne({'activityID':req.body.data.activityID,'itemName':req.body.data.itemName,'_id':{$ne:req.body.data.itemID==''?null:req.body.data.itemID}},
                        function(err,doc){
                            if(err)
                            {
                                return callback(err);
                            }
                            else if(doc!=null)
                            {
                                return callback('当前活动内存在同名物品，请检查!');
                            }
                            else
                            {
                                return callback(null);
                            }
                        });
                },
                function(callback){
                    if(req.body.data.itemID!='')//执行更新
                    {
                        ITEM.findByIdAndUpdate(req.body.data.itemID,
                            {
                                lastUpdateDate:new Date(),
                                itemName:req.body.data.itemName,
                                itemDescription:req.body.data.itemDesc,
                                unitPrice:req.body.data.price,
                                primaryUOM:req.body.data.uom,
                                attachment1:req.body.data.image
                            },
                            function(err,doc){
                                if(err)
                                {
                                    return callback(err);
                                }
                                else
                                {
                                    return callback(null,doc);
                                }
                            }
                        );
                    }
                    else//执行新增
                    {
                        var item =new ITEM();
                        item.activityID=req.body.data.activityID;
                        item.creatorID=req.user.username;
                        item.creationDate=new Date();
                        item.lastUpdateDate=new Date();
                        item.enabled=true;
                        item.itemName=req.body.data.itemName;
                        item.itemDescription=req.body.data.itemDesc;
                        item.unitPrice=req.body.data.price;
                        item.primaryUOM=req.body.data.uom;
                        item.attachment1=req.body.data.image;

                        item.save(function (err, doc) {
                            if (err) {
                                return callback(err);
                            }
                            else {
                                return callback(null, doc);
                            }
                        });
                    }
                }
            ],
            function rollback(err,result)//最终的处理，回滚或提交
            {
                if(err)
                {
                    res.send({'success':false,'message':'物品保存失败,原因:'+err});
                }
                else
                {
                    res.send({'success':true,'message':'物品保存成功!','_id':result._id});
                }
            }
        );
    }
    catch(e)
    {
        console.log(e);
    }

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
        if(ACTIVITY!=null&&ITEM!=null)
        {
            return;
        }
    }
}

module.exports = router;
module.exports.SetModel=SetModel;

