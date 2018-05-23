var express=require('express');
var router=express.Router();
var app=express();
var swig=require('swig');
var Goods=require('../models/goodInformationModel');



app.engine('html',swig.renderFile);
app.set('views','/views');
app.set('view engine','html');
app.use('/public',express.static(__dirname+'/public'));



/*
* 统一返回格式
* */
var responseData;
router.use(function(req,res,next){
    responseData={
        code:0,
        message:''
    }
    next();
});


//本来是router.get('/admin/user');但是因为app.js文件中已经有app.use('/admin',require('./routers/admin'));自动填上admin前缀
router.get('/',function(req,res,next){
    res.render('home',{
        userInfo:req.userInfo
    });//render的第二个参数，就是传入分配给模板的数据
});
//获取所有商品数据的接口
router.get('/allData',function(req,res,next){
    Goods.find({
        $or:[{goodSort:"服装"},{goodSort:"日用品"},{goodSort:"化妆品"},{goodSort:"食品"},{goodSort:"家电"},{goodSort:"电子产品"},{goodSort:"医用品"},{goodSort:"书籍"},{goodSort:"文具"}]
    }).then(function(goodInfo){
        if(goodInfo){
            responseData.message="数据成功获取";
            responseData.goodInfo=goodInfo;
            res.json(responseData);
        }else{
            responseData.message="数据未成功获取";
            res.json(responseData);
        }
        return;
    });
});
module.exports=router;