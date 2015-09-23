var express = require('express');
var router = express.Router();
var path =require('path');

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


module.exports = router;
