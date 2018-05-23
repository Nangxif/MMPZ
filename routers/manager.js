var express=require('express');
var router=express.Router();
var Goods=require('../models/goodInformationModel');
var Register=require('../models/registerModel');
var app=express();
var swig=require('swig');
var url=require('url');
//导入处理get请求数据的插件
var querystring=require('querystring');



//上传图片需要引入的模块和定义的变量
var formidable = require('formidable');
var sd = require("silly-datetime");
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = '/good/'; // 上传图片存放路径，注意在本项目public文件夹下面新建good文件夹




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


//返回所有添加的数据
router.get('/allData',function(req,res,next){
    Goods.findOne({
        _id:querystring.parse(req.originalUrl)["/manager/allData?_id"]
    }).then(function(allData){
        res.json(allData);
    });
});
//添加数据页面路由
router.get('/add',function(req,res,next){
    if(req.userInfo.isAdmin){
        res.render('manager-add',{
            userInfo:req.userInfo
        });
    }else{
        res.send("对不起，您不是管理员，无法进入后台管理界面！");
    }
});
//上传商品图片接口
//提交用户头像路由。（未理解，需要查看）
router.post('/add/pic',function(req,res,next){
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 4 * 1024 * 1024;   //文件大小

    form.parse(req, function (err, fields, files) {

        if (err) {
            return res.json({
                "code": 500,
                "message": "内部服务器错误"
            })
        }

        // 限制文件大小 单位默认字节 这里限制大小为4m
        if (files.fulAvatar.size > form.maxFieldsSize) {
            fs.unlink(files.fulAvatar.path)
            return res.json({
                "code": 401,
                "message": "图片应小于4M"
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
//添加数据接口
router.post('/add/data',function(req,res,next){
    var storeName=req.body.storeName;
    var storeNum=req.body.storeNum;
    var goodName=req.body.goodName;
    var goodID=req.body.goodID;
    var goodSort=req.body.goodSort;
    var price=req.body.price;
    var description=req.body.description;
    var repertory=req.body.repertory;
    var goodpicSrc=req.body.goodpicSrc;

    if(storeName==''){
        responseData.code=1;
        responseData.message="商店名称不能为空";
        res.json(responseData);
        return;
    }
    if(storeNum==''){
        responseData.code=2;
        responseData.message="商店经营许可号不能为空";
        res.json(responseData);
        return;
    }
    if(goodName==''){
        responseData.code=3;
        responseData.message="商品名称不能为空";
        res.json(responseData);
        return;
    }
    if(goodID==''){
        responseData.code=4;
        responseData.message="商品ID不能为空";
        res.json(responseData);
        return;
    }
    if(goodSort=='商品类别'){
        responseData.code=5;
        responseData.message="商品类别未选择";
        res.json(responseData);
        return;
    }
    if(price==''){
        responseData.code=6;
        responseData.message="价格不能为空";
        res.json(responseData);
        return;
    }
    if(repertory==''){
        responseData.code=7;
        responseData.message="库存不能为空";
        res.json(responseData);
        return;
    }
    //商店名称是否已经被注册
    Goods.findOne({
        storeName:storeName,
        goodName:goodName
    }).then(function(GoodsInfo){
        if(GoodsInfo){
            //表示数据库中有该记录
            responseData.code=8;
            responseData.message="该商店名称和商品已被注册";
            res.json(responseData);
            return;
        }
        //保存商品的信息到数据库中,不需要直接操作数据库，通过操作对象来操作数据库
        var goods=new Goods({
            storeName:storeName,
            storeNum:storeNum,
            goodName:goodName,
            goodID:goodID,
            goodSort:goodSort,
            price:price,
            description:description,
            repertory:repertory,
            goodpicSrc:goodpicSrc
        });
        return goods.save();
    }).then(function ( newGoodsInfo ) {
        responseData.message="保存成功";
        res.json(responseData);
        return;
    });
    return;
});

//修改数据接口
router.post('/search/change',function(req,res,next){
    Goods.update({
        _id:req.body._id
    },{
        storeName:req.body.storeName,
        storeNum:req.body.storeNum,
        goodName:req.body.goodName,
        goodID:req.body.goodID,
        goodSort:req.body.goodSort,
        price:req.body.price,
        description:req.body.description,
        repertory:req.body.repertory,
        goodpicSrc:req.body.goodpicSrc
    }).then(function(result){
        res.json({
            code:200,
            message: "success"
        });
    });
});


//修改物流状态接口
router.post('/logistics',function(req,res,next){
    Goods.update({
        storeName:req.body.storeName,
        goodName:req.body.goodName
    },{
        storeNum:req.body.storeNum,
        goodID:req.body.goodID,
        goodSort:req.body.goodSort,
        price:req.body.price,
        description:req.body.description,
        repertory:req.body.repertory,
        goodpicSrc:req.body.goodpicSrc,
        score:req.body.score
    }).then(function(result){
        res.json({
            code:200,
            message: "success"
        });
    });
});
//查询数据页面路由
router.get('/search',function(req,res,next){
    if(req.userInfo.isAdmin){
        res.render('manager-search',{
            userInfo:req.userInfo
        });
    }else{
        res.send("对不起，您不是管理员，无法进入后台界面！");
    }
});
//查询商品数据接口
router.post('/search/data',function(req,res,next){
    var keyword=req.body.keyword;
    //查询数据库中是否有信息相同的数据，若有则返回
    //limit(Number):限制获取的数据的条数
    //skip(2):忽略数据的条数2,从第三条开始获取
    /*
    * 每页显示5条
    * 1.1-5 skip:0-->(当前页-1)*limit
    * 2.6-10 skip:5-->(2-1)*5
    * 3.11-15 skip:10-->(3-1)*5
    * */
    var page=Number(req.body.page||1);//表示第几页的数据
    var limit=5;
    var pages=0;
    Goods.find({
        $or:[{storeName:keyword},{goodName:keyword},{goodSort:keyword}]
    }).then(function(result){
        //计算总页数
        pages=Math.ceil(result.length/limit);
        //取值不超过pages
        page=Math.min(page,pages);
        //取值不小于pages
        page=Math.max(page,1);
        var skip=(page-1)*limit;



        Goods.find({
            $or:[{storeName:keyword},{goodName:keyword},{goodSort:keyword}]
        }).limit(limit).skip(skip).then(function(goodInfo){
            if(goodInfo){
                responseData.message="查询成功";
                responseData.goodInfo=goodInfo;
                res.json(responseData);
            }else{
                responseData.code=404;
                responseData.message="未查询到数据";
                res.json(responseData);
            }

            return;
        });
    })
});
//删除商品数据接口
router.get('/search/delete',function(req,res){
    var id=url.parse(req.url).search.slice(4);
    Goods.remove({
        _id:id
    }).then(function(){
        responseData.code=200;
        responseData.message="删除成功";
        res.json(responseData);
    })
})


//物流状态页面路由
router.get('/logistics',function(req,res,next){
    if(req.userInfo.isAdmin){
        res.render('manager-logistics',{
            userInfo:req.userInfo
        });
    }else{
        res.send("对不起，您不是管理员，无法进入后台管理界面！");
    }
});


//注销用户页面路由
router.get('/self',function(req,res,next){
    if(req.userInfo.isAdmin){
        res.render('manager-self',{
            userInfo:req.userInfo
        });
    }else{
        res.send("对不起，您不是管理员，无法进入后台管理界面！");
    }
});





module.exports=router;