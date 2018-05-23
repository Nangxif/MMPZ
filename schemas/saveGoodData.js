var mongoose=require('mongoose');


//商品收藏的表结构
module.exports=new mongoose.Schema({
    //用户名称
    userName:String,
    //店铺名称
    storeNameList:String,
    //商品名称
    goodList:String
});