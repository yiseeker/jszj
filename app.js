var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials=require('express-partials');
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;
var session=require('express-session');
var flash=require('connect-flash');
var USER=require('./dbmodels/models').getModel('USER');


var routes = require('./routes/index');
var news = require('./routes/news');
var recommend = require('./routes/recommend');
var hot = require('./routes/activity');
var error = require('./routes/error');
var register = require('./routes/register');

var app = express();
app.listen(8000,function(){
    console.log('[Server Start] : Listening port 8000.');
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());
app.use(session({secret:'jszj',resave:true,saveUninitialized:true,cookie: { maxAge: 600000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.all('*',function(req,res,next){

    if(req.isAuthenticated())
    {
        res.locals.isAuthenticated=true;
        res.locals.userName=req.user.username;
    }else
    {
        res.locals.isAuthenticated=false;
    }
    next();
});


app.use('/', routes);
app.use('/news', news);
app.use('/recommend', recommend);
app.use('/activity', hot);
app.use('/error', error);
app.use('/register', register);




/************************************** User login **************************************************/
passport.use(new localStrategy({
        usernameField:'username',//Form value field name
        passwordField:'password'//Form value field name
    },
    function(username,password,done){
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

app.get('/login', function(req, res) {
    res.render('login',{'layout':'LAYOUT.ejs',message:req.flash('authMessage')});
});

app.post('/login', function(req, res,next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            req.flash('authMessage',info.message);
            return res.redirect('/login');
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }

            return res.redirect('/index');
        });
    })(req, res, next);
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/index');
});


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
        next();
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
    next();
});