var express = require('express');
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;
var cookieParser=require('cookie-parser');
var session=require('express-session');
var router = express.Router();

router.use(cookieParser());
router.use(session({secret:'jszj',resave:true,saveUninitialized:true}));
router.use(passport.initialize());
router.use(passport.session());

/********************************Mongoose *************************************************************/
var mongoose=require('mongoose');
var userSchema=mongoose.Schema({username:String,password:String});
var USER=mongoose.model('app_users',userSchema,'app_users');
mongoose.connect('mongodb://localhost/jszj');
var db=mongoose.connection;


/*************************************************Passport ***********************************/
passport.use(new localStrategy({
      usernameField:'username',//Form value field name
      passwordField:'password'//Form value field name
    },
    function(username,password,done){
      console.log(username+' '+password);
      USER.findOne({'username':username,'password':password},function(err,user){
        if(err)
        {
          return done(err);
        }
        if(!user)
        {
          return done(null,false,{message:'用户名或密码错误!'})
        }
        return done(null,user);
      });
    }
));

passport.serializeUser(function(user,done){
    done(null,user._id);
});

passport.deserializeUser(function(id,done){
    USER.findById(id,function(err,user){
        done(err,user);
    });
});

/************************************** User login **************************************************/
router.get('/login', function(req, res) {
  res.render('login',{'layout':'LAYOUT.ejs'})
});

router.post('/login',
    passport.authenticate('local',{
      successRedirect:'/',
      failureRedirect:'/error',
      failureFlush:true
    }),
    function(req,res){
      console.log('auth passed');
});

module.exports = router;
