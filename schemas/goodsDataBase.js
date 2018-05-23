var mongoose=require('mongoose');


//用户的表结构
module.exports=new mongoose.Schema({
    //商店名称
    storeName:String,
    //商店经营许可号
    storeNum:String,
    //商品名称
    goodName:String,
    //商品ID
    goodID:String,
    //商品类别
    goodSort:String,
    //价格
    price:Number,
    //描述
    description:String,
    //库存
    repertory:Number,
    //商品图片
    goodpicSrc:String,
    //评分
    score:{
        type:Number,
        default:5
    }
});