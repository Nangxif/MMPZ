//应用程序的启动入口文件
//只要用户发送了一个请求，那么首先进入的就是app.js文件
//加载express模块
var express=require('express');
//加载模板处理模块
var swig=require('swig');
//加载数据库模块
var mongoose=require('mongoose');
//加载body-parser用来处理post提交过来的数组
var bodyParser=require('body-parser');
//加载cookie模块
var Cookies=require('cookies');
//创建app应用=>NodeJS Http.createServer();
var app=express();
var Register=require('./models/registerModel');
//设置静态文件托管
//当用户访问的url以/public开始，那么直接访问对应__dirname+'/public'下的文件
app.use('/public',express.static(__dirname+'/public'));

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数表示模板引擎名称，同时而是模板文件的后缀
//第二个参数表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views','./views');
//注册所使用的模板引擎，第一个参数必须是view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache:false});

//bodyparser设置,添加了这个方法之后自动在api.js里面的post方法中的req添加body属性
app.use(bodyParser.urlencoded({extended:true}));

//设置cookies,无论请求哪个地址，都会走这个中间件
app.use(function(req,res,next){
    req.cookies=new Cookies(req,res);
    //解析登录用户的cookie信息
    req.userInfo={};
    if(req.cookies.get('userinfo')){
        try{
            req.userInfo=JSON.parse(req.cookies.get('userinfo'));
            Register.findById(req.userInfo._id).then(function(userInfo){
                //在接收到请求之后，给cookies对象再添加一个isAdmin属性
                req.userInfo.isAdmin=Boolean(userInfo.isAdmin);
                next();
            });
        }catch(e){
            next();
        }
    }else{
        next();
    }
});

//根据不同的功能划分模块
app.use('/',require('./routers/home'));
app.use('/user',require('./routers/user'));
app.use('/search',require('./routers/search'));
app.use('/cart',require('./routers/cart'));
app.use('/api',require('./routers/api'));
app.use('/manager',require('./routers/manager'));
//监听http请求
mongoose.connect('mongodb://localhost:27017/blog',function(err){
    if(err){
        console.log('数据库连接失败!');
    }else{
        console.log('数据库连接成功!');
        app.listen('4200');
    }
});
