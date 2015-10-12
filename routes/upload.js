var express = require('express');
var router = express.Router();
var formidable=require('formidable');
var fs =require('fs');
var uuid=require('node-uuid');


/* 上传 */
router.post('/', function(req, res,next) {
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        try{
            var fileType;
            for(var i in files)
            {
                if(files[i].type!='image/jpeg' && files[i].type!='image/png' && files[i].type!='image/gif' && files[i].type!='image/bmp' && files[i].type!='image/jpg')
                {
                    throw new Error('上传的不是图片类型的文件!');
                }
                else
                {
                   fileType=files[i].type.split('/')[1];
                }

            }
            var fileName=req.user.username+'_'+uuid.v4()+'.'+fileType;
            if(req.query.type=='temp')
            {
                fs.renameSync(files.upload.path,'/home/linux/Projects/jszj/temp/'+fileName);//存放到临时目录，随时可以删除
            }
            else
            {
                fs.renameSync(files.upload.path,'/home/linux/Projects/jszj/upload/'+fileName);//这里的保存路径是系统的路径，不是站点的路径
            }

            res.send("<script>window.parent.CKEDITOR.tools.callFunction("+req.query.CKEditorFuncNum+",'/resource/"+fileName+"','')</script>");
        }catch(e)
        {
            res.send('上传失败,原因:\n'+e);
            console.log(e);
        }
    });
});




module.exports = router;

