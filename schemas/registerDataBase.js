var mongoose=require('mongoose');


//用户的表结构
module.exports=new mongoose.Schema({
    //头像地址
    picSrc:{
        type:String,
        default:'/public/img/nopic.png'
    },
    //昵称
    username:String,
    //手机号
    mobilephone:Number,
    //密码
    password:String,
    //真实姓名
    realname:{
        type:String,
        default:"未填写真实姓名"
    },
    //性别
    sex:{
        type:String,
        default:"未知"
    },
    //收货地址
    address:{
        type:String,
        default:"未填写收货地址"
    },
    //是否是管理员
    isAdmin:{
        type:Boolean,
        default:false
    }
});
