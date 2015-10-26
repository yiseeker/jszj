/********************************Mongoose *************************************************************/
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/jszj');
//var db=mongoose.connection;
var list=new Array();

//定义app_users
var userSchema=mongoose.Schema({username:String,password:String,email:String,mobile:String});
var USER=mongoose.model('app_users',userSchema,'app_users');

//定义App_CommercialActivity
var App_CommercialActivitySchema=mongoose.Schema({creatorID:String,activityName:String,activityType:String,creationDate:Date,lastUpdateDate:Date,enabled:Boolean,activityDescription:String,activityContact:String,activityAdore:Number,activityDisagree:Number,attachment1:String,attachment2:String,attachment3:String,attachment4:String,attachment5:String,attachment6:String,moduleList:Array,moduleContent:Array});
var APP_COMMERCIALACTIVITY=mongoose.model('App_CommercialActivity',App_CommercialActivitySchema,'App_CommercialActivity');





list.push({modelName:'USER',model:USER});
list.push({modelName:'APP_COMMERCIALACTIVITY',model:APP_COMMERCIALACTIVITY});


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