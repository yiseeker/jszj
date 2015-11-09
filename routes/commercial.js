var express = require('express');
var async =require('async');
var router = express.Router();
var path =require('path');
var fs=require('fs');

var ACTIVITY;//This is mongodb model
var ITEM;//This is mongodb model
var MODULE;//This is mongodb model
var ITEMSINMODULE;//This is mongodb model

//All users content needs authentication, or the request will be redirect to login page automatically
router.all('*',function(req,res,next){
    if(!req.isAuthenticated())
    {
        res.redirect('/login');
    }
    next();
});



/***********************************get region*********************************/

router.get('/editActivity',function(req,res){
    res.render('commercial/editActivity',{'layout':'LAYOUT.ejs'});
});

router.get('/showActivity',function(req,res){
    res.render('commercial/showActivity',{'layout':'LAYOUT.ejs'});
});

router.get('/previewActivity',function(req,res){
    res.render('commercial/previewActivity',{'layout':'LAYOUT.ejs'});
});

router.get('/createItem',function(req,res){
    res.render('commercial/createItem',{'layout':'LAYOUT.ejs'});
});

router.get('/editItem',function(req,res){
    res.render('commercial/editItem',{'layout':'LAYOUT.ejs'});
});

router.get('/createActivity',function(req,res){
    res.render('commercial/createActivity',{'layout':'LAYOUT.ejs'});
});

router.get('/createModule',function(req,res){
    res.render('commercial/createModule',{'layout':'LAYOUT.ejs'});
});

router.get('/itemsInModule',function(req,res){
    res.render('commercial/itemsInModule',{'layout':'LAYOUT.ejs'});
});

router.get('/editItemsInModule',function(req,res){
    res.render('commercial/editItemsInModule',{'layout':'LAYOUT.ejs'});
});

router.get('/commercialFinished',function(req,res){
    res.render('commercial/commercialFinished',{'layout':'LAYOUT.ejs'});
});

router.get('/editModule',function(req,res){
    res.render('commercial/editModule',{'layout':'LAYOUT.ejs'});
});





/***********************************post region*********************************/



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
                res.send({'succeed':false,'message':'保存失败,原因:'+err});
            }
            else
            {
                res.send({'succeed':true,'message':'保存成功!','activityId':result._id});
            }
        }
    );

});

//更新活动信息
router.post('/updateActivity',function(req,res){
    async.waterfall([
            function(callback)//将临时文件夹中的图片1转移到upload文件夹中
            {
                if(req.body.data.pic1!='')
                {
                    fs.rename(__dirname.replace(/routes/,'temp/')+req.body.data.pic1,__dirname.replace(/routes/,'upload/')+req.body.data.pic1,function(err){
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
                    fs.rename(__dirname.replace(/routes/,'temp/')+req.body.data.pic2,__dirname.replace(/routes/,'upload/')+req.body.data.pic2,function(err){
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
                    fs.rename(__dirname.replace(/routes/,'temp/')+req.body.data.pic3,__dirname.replace(/routes/,'upload/')+req.body.data.pic3,function(err){
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
            function(callback)
            {
                ACTIVITY.findByIdAndUpdate({'_id':req.body.data.activityID},
                    {
                        'lastUpdateDate':new Date(),
                        'enabled':req.body.data.enabled,
                        'activityDescription':req.body.data.activityDesc,
                        'activityContact':req.body.data.contactInfo,
                        'attachment1':req.body.data.pic1,
                        'attachment2':req.body.data.pic2,
                        'attachment3':req.body.data.pic3,
                        'attachment4':req.body.data.pic1Desc,
                        'attachment5':req.body.data.pic2Desc,
                        'attachment6':req.body.data.pic3Desc
                    },
                    function(err){
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
    ],
    function(err,result){
        if(err)
        {
            res.send({'succeed':false,'message':'活动更新失败,原因:'+err});
        }
        else
        {
            res.send({'succeed':true,'message':'活动更新成功!'});
        }
    });
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
                function(callback)//将上传的临时商品图片保存到upload文件夹下
                {
                    var exp =new RegExp('^/tmp/');
                    if(exp.test(req.body.data.image))//如果是临时的，则转移到upload文件夹下
                    {
                        fs.rename(__dirname.replace(/routes/,'')+req.body.data.image.replace('tmp','temp'),__dirname.replace(/routes/,'')+req.body.data.image.replace('tmp','upload'),function(err){
                            if(err)
                            {
                                return callback(err);
                            }
                            else
                            {
                                req.body.data.image=req.body.data.image.replace(/\/tmp\//,'');
                                return callback(null);
                            }
                        });
                    }
                    else//如果图片已经是转移到upload文件夹下，则返回
                    {
                        req.body.data.image=req.body.data.image.replace(/\/resource\//,'');
                        return callback(null);
                    }
                },
                function(callback){//对于已经保存的商品，如果新的图片名和旧的不一致，那么从upload文件夹中删除旧文件

                    var oldFile;
                    if(req.body.data.itemID=='')
                    {
                        return callback(null);
                    }
                    ITEM.findOne({'_id':req.body.data.itemID},function(err,doc){
                       if(err)
                       {
                           return callback(err);
                       }
                       else
                       {
                           if(doc==null)
                           {
                               return callback('获取商品信息时出错，请联系客服！');
                           }
                           else
                           {
                               oldFile=doc.attachment1;
                               if(oldFile!=req.body.data.image)//执行删除老文件
                               {
                                   fs.unlink(__dirname.replace(/routes/,'upload/')+oldFile,function(err){
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
                           }
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
                    res.send({'succeed':false,'message':'物品保存失败,原因:'+err});
                }
                else
                {
                    res.send({'succeed':true,'message':'物品保存成功!','_id':result._id,'item':result});
                }
            }
        );
    }
    catch(e)
    {
        console.log(e);
    }

});

//更新商品enable标记
router.post('/updateItemEnabled',function(req,res){
    try
    {
        ITEM.findByIdAndUpdate({'_id':req.body.itemID},{'enabled':req.body.enabled,'lastUpdateDate':req.body.lastUpdateDate},
            function(err){
                if(err)
                {
                    res.send({'succeed':false,'message':err});
                }
                else
                {
                    res.send({'succeed':true,'message':'商品状态更新成功！'});
                }
            });
    }
    catch(e)
    {
        console.log(e);
    }
});

//保存模块
router.post('/saveModule',function(req,res){
    async.waterfall([
            //检查是否存在同名模块
            function(callback){
                MODULE.findOne({'activityID':req.body.module.activityID,'moduleName':req.body.module.moduleName},function(err,doc){
                    if(err)
                    {
                        return callback(err);
                    }
                    else
                    {
                        if(doc!=null)
                        {
                            return callback('活动项下已存在同名模块!');
                        }
                        else
                        {
                            return callback(null);
                        }
                    }
                });
            },
            //保存模块
            function(callback){
                var module=new MODULE();
                module.creatorID=req.user.username;
                module.creationDate=new Date();
                module.activityID=req.body.module.activityID;
                module.enabled=true;
                module.moduleName=req.body.module.moduleName;

                module.save(function (err, doc) {
                    if (err) {
                        return callback(err);
                    }
                    else {
                        return callback(null, doc);
                    }
                });
            }
        ],
        function rollback(err,result){
            if(err)
            {
                res.send({'succeed':false,'message':'模块保存失败,原因:'+err});
            }
            else
            {
                res.send({'succeed':true,'message':'模块保存成功!','_id':result._id});
            }
        });
});

//更新模块
router.post('/updateModule',function(req,res){
    MODULE.findByIdAndUpdate({'_id':req.body.module.moduleID},{'enabled':req.body.module.enabled,'lastUpdateDate':req.body.module.lastUpdateDate},
        function(err){
            if(err)
            {
                res.send({'succeed':false,'message':err});
            }
            else
            {
                res.send({'succeed':true,'message':'模块状态更新成功！'});
            }
        });
});

//删除模块
router.post('/deleteModule',function(req,res){
    try
    {
        MODULE.remove({'activityID':req.body.module.activityID,'_id':req.body.module.moduleID},
            function(err){
                if(err)
                {
                    res.send({'succeed':false,'message':err});
                }
                else
                {
                    res.send({'succeed':true,'message':'模块删除成功！'});
                }
            });
    }catch(e)
    {
        console.log(e);
    }
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

//获取物品列表
router.post('/getItemList',function(req,res){
    try{

        ITEM.find({'activityID':req.body.activityID,'enabled':true},
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
                        res.send({'succeed':true,'message':'获取列表成功！','list':docs});
                    }
                }
            });

    }catch(e)
    {
        console.log(e);
    }

});

//保存模块中包含哪些商品信息
router.post('/saveItemInModuleList',function(req,res){
    try{
        async.waterfall([
                function(callback)//先清除，再新增
                {
                    ITEMSINMODULE.remove({'activityID':req.body.activityID},function(err){
                        if(err)
                        {
                            return callback('清除原有数据时失败！');
                        }
                        else
                        {
                            var docs=new Array();
                            var list =req.body.list;
                            for(var i in list)
                            {
                                var doc={'activityID':list[i].activityID,
                                    'moduleID':list[i].moduleID,
                                    'creationDate':new Date(),
                                    'creatorID':req.user.username,
                                    'enabled':true,
                                    'itemList':list[i].itemList
                                };
                                docs.push(doc);
                            }
                            ITEMSINMODULE.create(docs,function(err){
                                if(err)
                                {
                                    callback(err);
                                }
                                else
                                {
                                    callback(null);
                                }
                            });
                        }
                    });
                }
            ],
            function(err,result){
                if(err)
                {
                    res.send({'succeed':false,'message':'保存模块中的商品清单时失败,原因:'+err});
                }
                else
                {
                    res.send({'succeed':true,'message':'保存成功!'});
                }
            });

    }catch(e)
    {
        console.log(e);
    }

});

//删除itemsInModule中的信息
router.post('/deleteItemsInModule',function(req,res){
    try {
        ITEMSINMODULE.remove({'activityID': req.body.activityID, 'moduleID': req.body.moduleID},
            function (err) {
                if (err) {
                    res.send({'succeed': false, 'message': err});
                }
                else {
                    res.send({'succeed': true, 'message': '模块删除成功！'});
                }
            });
    }catch(e)
    {
        console.log(e);
    }
});

//获取活动名称
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

