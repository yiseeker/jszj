/********************************Mongoose *************************************************************/
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/jszj');
//var db=mongoose.connection;
var list=new Array();

//定义app_users
var userSchema=mongoose.Schema({username:String,password:String,email:String,mobile:String});
var APP_USER=mongoose.model('app_users',userSchema,'app_users');

//定义App_CommercialActivity
var com_activitySchema=mongoose.Schema({creatorID:String,activityName:String,activityType:String,creationDate:Date,lastUpdateDate:Date,enabled:Boolean,activityDescription:String,activityContact:String,activityFavour:Number,activityDisagree:Number,attachment1:String,attachment2:String,attachment3:String,attachment4:String,attachment5:String,attachment6:String});
var COM_ACTIVITY=mongoose.model('COM_Activity',com_activitySchema,'COM_Activity');


//定义COM_Items
var com_itemsSchema=mongoose.Schema({activityID:String,creatorID:String,creationDate:Date,lastUpdateDate:Date,enabled:Boolean,itemName:String,itemDescription:String,unitPrice:Number,primaryUOM:String,secondaryUOM:String,attachment1:String,attachment2:String,attachment3:String});
var COM_ITEMS=mongoose.model('COM_Items',com_itemsSchema,'COM_Items');

//定义模块COM_Modules
var com_modulesSchema=mongoose.Schema({activityID:String,creatorID:String,creationDate:Date,lastUpdateDate:Date,enabled:Boolean,itemName:String,moduleName:String});
var COM_MODULES=mongoose.model('COM_Modules',com_modulesSchema,'COM_Modules');

//定义模块COM_ItemsInModule
var com_itemsinmoduleSchema=mongoose.Schema({activityID:String,moduleID:String,creatorID:String,creationDate:Date,lastUpdateDate:Date,enabled:Boolean,itemList:Array});
var COM_ITEMSINMODULE=mongoose.model('COM_ItemsInModule',com_itemsinmoduleSchema,'COM_ItemsInModule');


list.push({modelName:'APP_USER',model:APP_USER});
list.push({modelName:'COM_ACTIVITY',model:COM_ACTIVITY});
list.push({modelName:'COM_ITEMS',model:COM_ITEMS});
list.push({modelName:'COM_MODULES',model:COM_MODULES});
list.push({modelName:'COM_ITEMSINMODULE',model:COM_ITEMSINMODULE});

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