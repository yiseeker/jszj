/********************************Mongoose *************************************************************/
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/jszj');
//var db=mongoose.connection;
var list=new Array();

//定义app_users
var userSchema=mongoose.Schema({username:String,password:String,email:String,mobile:String});
var USER=mongoose.model('app_users',userSchema,'app_users');

//定义app_user_activity
var app_user_activitySchema=mongoose.Schema({creatorID:String,activityName:String,activityType:String,creationDate:Date,lastUpdateDate:Date,enabled:Boolean,activityDescription:String,activityContact:String,activityAdore:Number,activityDisagree:Number,attachment1:String,attachment2:String,attachment3:String,attachment4:String,attachment5:String,attachment6:String});
var APP_USER_ACTIVITY=mongoose.model('app_user_activity',app_user_activitySchema,'app_user_activity');

//定义app_activity_module
var app_activity_moduleSchema=mongoose.Schema({activityID:String,moduleName:String,creationDate:Date,lastUpdateDate:Date,contentType:String,creatorID:String});
var APP_ACTIVITY_MODULE=mongoose.model('app_activity_module',app_activity_moduleSchema,'app_activity_module');

//定义app_module_content
var app_module_contentSchema=mongoose.Schema({moduleID:String,creationDate:Date,lastUpdateDate:Date,creatorID:String,content:String});
var APP_MODULE_CONTENT=mongoose.model('app_module_content',app_module_contentSchema,'app_module_content');





list.push({modelName:'USER',model:USER});
list.push({modelName:'APP_USER_ACTIVITY',model:APP_USER_ACTIVITY});
list.push({modelName:'APP_ACTIVITY_MODULE',model:APP_ACTIVITY_MODULE});
list.push({modelName:'APP_MODULE_CONTENT',model:APP_MODULE_CONTENT});


function getModel(modelName)
{
    for(var i in list)
    {
        if(list[i].modelName==modelName)
        {
            return list[i].model;
        }
    }
    return null;
}

function getAllModel()
{
    return list;
}

module.exports.getModel=getModel;
module.exports.getAllModel=getAllModel;