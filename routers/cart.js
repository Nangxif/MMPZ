var express=require('express');
var router=express.Router();
var Carts=require('../models/cartModel');
var Goods=require('../models/goodInformationModel');
var Saveg=require('../models/saveGoodModel');
var Saves=require('../models/saveStoreModel');
var app=express();
var swig=require('swig');
var url=require('url');
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
        message:'',
        num:0,
        logistics:""
    }
    next();
});



router.get('/',function(req,res,next){
    res.render('cart');
});
//以下接口是购物车的
router.post('/isExit',function(req,res,next){
    var userName=req.body.userName;
    Carts.findOne({
        userName:userName
    }).then(function(CartsInfo) {
        if(CartsInfo){
            responseData.code=200;
            responseData.message="已存在";
            return res.json(responseData);
        }else{
            responseData.code=404;
            responseData.message="不存在";
            return res.json(responseData);
        }
    });
});
router.post('/add',function(req,res,next){
    var isExit=req.body.isExit;
    var userName=req.body.userName;
    var storeNameList=req.body.storeNameList;
    var goodList=req.body.goodList;
    var goodNumList=req.body.goodNumList;
    var isBuyList=req.body.isBuyList;
    var logisticsList=req.body.logisticsList;
    if (isExit!='false') {
        //表示数据库中有该记录
        Carts.update({
            userName:userName
        },{
            storeNameList:storeNameList,
            goodList:goodList,
            goodNumList:goodNumList,
            isBuyList:isBuyList,
            logisticsList:logisticsList
        }).then(function(result){
            responseData.code=1;
            responseData.message="已添加";
            return res.json(responseData);
        });
    }else{
        //保存商品的信息到数据库中,不需要直接操作数据库，通过操作对象来操作数据库
        var carts=new Carts({
            userName:userName,
            storeNameList:storeNameList,
            goodList:goodList,
            goodNumList:goodNumList,
            isBuyList:isBuyList,
            logisticsList:logisticsList
        });
        carts.save().then(function(newCartsInfo){
            responseData.code=1;
            responseData.message="已添加";
            return res.json(responseData);
        })
    }
})

//获取用户的所有购物车信息
router.get('/allData',function(req,res,next){
    Carts.findOne({
        userName:url.parse(req.url).search.slice(10)
    }).then(function(allData){
        res.json(allData);
    });
});


//通过店铺名和商品名查找
router.post('/goodlist',function(req,res,next){
    Goods.findOne({
        storeName:req.body.storeName,
        goodName:req.body.goodName
    }).then(function(GoodsInfo){
        responseData.code=2;
        responseData.message=GoodsInfo;
        responseData.num=req.body.goodNum;
        responseData.logistics=req.body.logistics;
        return res.json(responseData);
    })
})

//清空购物车数据
router.post('/delete',function(req,res,next){
    Carts.remove({
        userName:req.body.userName
    }).then(function(){
        responseData.code=200;
        responseData.message="删除成功";
        res.json(responseData);
    })
});







//以下接口是收藏商品的
router.post('/isGood',function(req,res,next){
    var userName=req.body.userName;
    Saveg.findOne({
        userName:userName
    }).then(function(GoodInfo) {
        if(GoodInfo){
            responseData.code=200;
            responseData.message="已存在";
            return res.json(responseData);
        }else{
            responseData.code=404;
            responseData.message="不存在";
            return res.json(responseData);
        }
    });
});
router.post('/saveGood',function(req,res,next){
    var isGood=req.body.isGood;
    var userName=req.body.userName;
    var storeNameList=req.body.storeNameList;
    var goodList=req.body.goodList;
    if (isGood!='false') {
        //表示数据库中有该记录
        Saveg.update({
            userName:userName
        },{
            storeNameList:storeNameList,
            goodList:goodList
        }).then(function(result){
            responseData.code=1;
            responseData.message="已收藏";
            return res.json(responseData);
        });
    }else{
        //保存商品的信息到数据库中,不需要直接操作数据库，通过操作对象来操作数据库
        var savegs=new Saveg({
            userName:userName,
            storeNameList:storeNameList,
            goodList:goodList
        });
        savegs.save().then(function(newSavegInfo){
            responseData.code=1;
            responseData.message="已收藏";
            return res.json(responseData);
        })
    }
})

//获取用户的所有商品收藏信息
router.get('/allSaveGood',function(req,res,next){
    Saveg.findOne({
        userName:url.parse(req.url).search.slice(10)
    }).then(function(allSaveGood){
        res.json(allSaveGood);
    });
});


//通过店铺名和商品名查找收藏商品
router.post('/savegoodlist',function(req,res,next){
    Goods.findOne({
        storeName:req.body.storeName,
        goodName:req.body.goodName
    }).then(function(GoodsInfo){
        responseData.code=2;
        responseData.message=GoodsInfo;
        return res.json(responseData);
    })
})

//清空商品收藏数据
router.post('/deleteGood',function(req,res,next){
    Saveg.remove({
        userName:req.body.userName
    }).then(function(){
        responseData.code=200;
        responseData.message="删除成功";
        res.json(responseData);
    })
});








//以下是店铺关注的接口
router.post('/isStore',function(req,res,next){
    var userName=req.body.userName;
    Saves.findOne({
        userName:userName
    }).then(function(GoodInfo) {
        if(GoodInfo){
            responseData.code=200;
            responseData.message="已存在";
            return res.json(responseData);
        }else{
            responseData.code=404;
            responseData.message="不存在";
            return res.json(responseData);
        }
    });
});
router.post('/saveStore',function(req,res,next){
    var isStore=req.body.isStore;
    var userName=req.body.userName;
    var storeNameList=req.body.storeNameList;
    if (isStore!='false') {
        //表示数据库中有该记录
        Saves.update({
            userName:userName
        },{
            storeNameList:storeNameList
        }).then(function(result){
            responseData.code=1;
            responseData.message="已关注";
            return res.json(responseData);
        });
    }else{
        //保存商品的信息到数据库中,不需要直接操作数据库，通过操作对象来操作数据库
        var savess=new Saves({
            userName:userName,
            storeNameList:storeNameList
        });
        savess.save().then(function(newSavesInfo){
            responseData.code=1;
            responseData.message="已关注";
            return res.json(responseData);
        })
    }
})

//获取用户的所有店铺关注信息
router.get('/allSaveStore',function(req,res,next){
    Saves.findOne({
        userName:url.parse(req.url).search.slice(10)
    }).then(function(allSaveStore){
        res.json(allSaveStore);
    });
});
//通过店铺名查找收藏店铺
router.post('/savestorelist',function(req,res,next){
    Goods.findOne({
        storeName:req.body.storeName
    }).then(function(GoodsInfo){
        responseData.code=2;
        responseData.message=GoodsInfo;
        return res.json(responseData);
    })
})
//清空店铺关注数据
router.post('/deleteStore',function(req,res,next){
    Saves.remove({
        userName:req.body.userName
    }).then(function(){
        responseData.code=200;
        responseData.message="删除成功";
        res.json(responseData);
    })
});



module.exports=router;