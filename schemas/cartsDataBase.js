var mongoose=require('mongoose');


//购物车的表结构
module.exports=new mongoose.Schema({
    //用户名称
    userName:String,
    //店铺名称
    storeNameList:String,
    //商品名称
    goodList:String,
    //购买数量
    goodNumList:String,
    //是否购买
    isBuyList:String,
    //物流状态
    logisticsList:String
});