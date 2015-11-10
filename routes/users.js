var express = require('express');
var router = express.Router();

var ACTIVITY;



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
    ACTIVITY.findOne({'_id':req.query.actid},function(err,doc){
        if(err)
        {
            res.render('error',{'layout':'LAYOUT.ejs','message':err});
        }
        else
        {
            if(doc==null)
            {
                res.render('error',{'layout':'LAYOUT.ejs','message':'未能查询到此活动的详细信息，请联系客服！'});
            }
            else
            {
                res.redirect('../commercial/editActivity?actid='+req.query.actid);
            }
        }
    });
});



//显示活动
router.get('/showActivity',function(req,res){
    res.render('users/showActivity',{'layout':'LAYOUT.ejs'});
});

//获取用户的活动列表
router.post('/getActivityList',function(req,res){
    ACTIVITY.find({'creatorID':req.user.username},
        function(err,docs){
            if(err)
            {
                res.send({'succeed':false,'message':err});
            }
            else
            {
                if(docs==null)
                {
                    res.send({'succeed':true,'message':'活动列表为空！','list':null});
                }
                else
                {
                    res.send({'succeed':true,'message':'获取活动列表成功！','list':docs});
                }
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
        if(ACTIVITY != null )
        {
            return;
        }
    }
}

module.exports = router;
module.exports.SetModel=SetModel;

