var express=require('express');
var router=express.Router();
var app=express();
var swig=require('swig');
//引入注册的数据库，根据cookies传递过来的id定位需要修改id那条数据
var Register=require('../models/registerModel');


//上传图片需要引入的模块和定义的变量
var formidable = require('formidable');
var sd = require("silly-datetime");
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = '/avatar/'; // 上传图片存放路径，注意在本项目public文件夹下面新建avatar文件夹



app.engine('html',swig.renderFile);
app.set('views','/views');
app.set('view engine','html');
app.use('/public',express.static(__dirname+'/public'));
//用户界面路由
router.get('/',function(req,res,next){
    res.render('user',{
        userInfo:req.userInfo
    });
});
//设置用户信息路由
router.get('/set',function(req,res,next){
    res.render('set',{
        userInfo:req.userInfo
    });
});
//商品收藏界面
router.get('/savegood',function(req,res,next){
    res.render('savegood',{
        userInfo:req.userInfo
    });
});
//店铺收藏界面
router.get('/savestore',function(req,res,next){
    res.render('savestore',{
        userInfo:req.userInfo
    });
});
//未支付界面
router.get('/nopay',function(req,res,next){
    res.render('nopay',{
        userInfo:req.userInfo
    });
});
//支付界面
router.get('/pay',function(req,res,next){
    res.render('pay',{
        userInfo:req.userInfo
    });
});
//获取当前登录用户的所有数据
router.get('/set/allData',function(req,res,next){
    Register.findOne({
        _id:req.userInfo._id
    }).then(function(allData){
        res.json(allData);
    });
});
//提交用户头像路由。（未理解，需要查看）
router.post('/set/pic',function(req,res,next){
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.json({
                "code": 500,
                "message": "内部服务器错误"
            })
        }

        // 限制文件大小 单位默认字节 这里限制大小为2m
        if (files.fulAvatar.size > form.maxFieldsSize) {
            fs.unlink(files.fulAvatar.path)
            return res.json({
                "code": 401,
                "message": "图片应小于2M"
            })
        }

        var extName = '';  //后缀名
        switch (files.fulAvatar.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if (extName.length == 0) {
            return res.json({
                "code": 404,
                "message": "只支持png和jpg格式图片"
            })
        }

        //使用第三方模块silly-datetime
        var t = sd.format(new Date(), 'YYYYMMDDHHmmss');
        //生成随机数
        var ran = parseInt(Math.random() * 8999 + 10000);

        // 生成新图片名称
        var avatarName = t + '_' + ran + '.' + extName;
        // 新图片路径
        var newPath = form.uploadDir + avatarName;

        // 更改名字和路径
        fs.rename(files.fulAvatar.path, newPath, function (err) {
            if (err) {
                return res.json({
                    "code": 401,
                    "message": "图片上传失败"
                })
            }
            return res.json({
                "code": 200,
                "message": "上传成功",
                "result": AVATAR_UPLOAD_FOLDER + avatarName
            })
        })
    });
});
//提交用户数据路由
router.post('/set/data',function(req,res,next){
    var picSrc=req.body.picSrc;
    var username=req.body.username;
    var realname=req.body.realname;
    var sex=req.body.sex;
    var mobilephone=req.body.mobilephone;
    var address=req.body.address;
    Register.update({
        _id:req.userInfo._id
    },{
        picSrc:picSrc,
        username:username,
        realname:realname,
        sex:sex,
        mobilephone:mobilephone,
        address:address
    }).then(function(result){
        res.json({
            code:200,
           message: "success"
        });
    });
});
module.exports=router;