var express = require('express');
var router = express.Router();
var formidable=require('formidable');
var fs =require('fs');



/* 上传 */
router.post('/', function(req, res,next) {
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        try{
            fs.renameSync(files.upload.path,'/home/linux/Projects/jszj/upload/'+files.upload.name);//这里的保存路径是系统的路径，不是站点的路径
            res.send("<script>window.parent.CKEDITOR.tools.callFunction("+req.query.CKEditorFuncNum+",'/resource/"+files.upload.name+"','')</script>");
        }catch(e)
        {
            res.send('上传失败,原因:\n'+e);
            console.log(e);
        }
    });
});




module.exports = router;

