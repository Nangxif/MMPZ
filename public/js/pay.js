$(function(){
    //获取用户的已支付数据
    var userName="";
    //获取返回的所有数据
    var obj={};
    var imgArr=[];
    var storeNameArr=[];
    var goodArr=[];
    var goodNumArr=[];
    var isBuyArr=[];
    var logisticsArr=[];
    var t;
    $.ajax({
        type:'get',
        url:'/user/set/allData',
        success:function(allData){
            //确定是否为登录状态
            if(allData) {
                userName = allData.username;
                $.ajax({
                    type: "GET",
                    url: "/cart/allData",
                    data: {
                        userName: userName
                    },
                    success: function (data) {
                        obj = data;
                        if (obj) {
                            //将获取到的数据转变为数组存放到变量里面
                            storeNameArr = obj["storeNameList"].split(",");
                            goodArr = obj["goodList"].split(",");
                            goodNumArr = obj["goodNumList"].split(",");
                            isBuyArr = obj["isBuyList"].split(",");
                            logisticsArr=obj["logisticsList"].split(",");
                            $(".pay-content").html("<table id=\"pay-tab\"></table>");
                        } else {
                            storeNameArr = [];
                            goodArr = [];
                            goodNumArr = [];
                            isBuyArr = [];
                            logisticsArr=[];
                            $(".pay-content").html("<table id=\"pay-tab\"></table>");
                        }


                        //接下来渲染出来
                        for (var m = 0; m < storeNameArr.length; m++) {
                            if (isBuyArr[m] == "true") {
                                $.ajax({
                                    type: "post",
                                    url: "/cart/goodlist",
                                    data: {
                                        storeName: storeNameArr[m],
                                        goodName: goodArr[m],
                                        goodNum: goodNumArr[m],
                                        logistics:logisticsArr[m]
                                    },
                                    success: function (resData) {
                                        if(resData.logistics!="已签收") {
                                            t = $('<tr><td class="imgclas"><img src=\"' + resData.message.goodpicSrc + '\"/></td><td><p>' + resData.message.storeName + '</p><p>' + resData.message.goodName + '</p><p>' + '<i style="color: red">￥</i><span class="pri">' + resData.message.price + '</span></p></td><td class="num"><span>' + resData.num + '</span>件</td><td class="money">' + (resData.message.price * resData.num).toFixed(2) + '元</td><td>' + resData.logistics + '</td></tr>')
                                            $("#pay-tab").append(t);
                                        }else{
                                            t = $('<tr><td class="imgclas"><img src=\"' + resData.message.goodpicSrc + '\"/></td><td><p>' + resData.message.storeName + '</p><p>' + resData.message.goodName + '</p><p>' + '<i style="color: red">￥</i><span class="pri">' + resData.message.price + '</span></p></td><td class="num"><span>' + resData.num + '</span>件</td><td class="money">' + (resData.message.price * resData.num).toFixed(2) + '元</td><td>' +'<input type="button" class="btn" value="'+resData.logistics+'"  data-toggle="modal" data-target="#scoreModal"/></td></tr>');
                                            $("#pay-tab").append(t);
                                            $("#ssure").on("click",function(){
                                                $.ajax({
                                                    type:"post",
                                                    url:"/manager/logistics",
                                                    data:{
                                                        storeName:resData.message.storeName,
                                                        storeNum:resData.message.storeNum,
                                                        goodName:resData.message.goodName,
                                                        goodID:resData.message.goodID,
                                                        goodSort:resData.message.goodSort,
                                                        price:resData.message.price,
                                                        description:resData.message.description,
                                                        repertory:resData.message.repertory,
                                                        goodpicSrc:resData.message.goodpicSrc,
                                                        score:(resData.message.score+Number($("#selectscore").val()))/2
                                                    },
                                                    success:function(res){
                                                        if(res.code==200){
                                                            $(".tip").fadeIn().delay(1000).fadeOut();
                                                        }
                                                    }
                                                })
                                            })
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            }
        }
    })





})