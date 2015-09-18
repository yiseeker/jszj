/********************************Mongoose *************************************************************/
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/jszj');
//var db=mongoose.connection;
var list=new Array();

var userSchema=mongoose.Schema({username:String,password:String,email:String,mobile:String});
var USER=mongoose.model('app_users',userSchema,'app_users');
list.push({modelName:'USER',model:USER});

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



module.exports.getModel=getModel;