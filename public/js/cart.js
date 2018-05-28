$(function(){
    //获取用户的购物车数据
    var isDenglu=false;
    var userName="";
    //获取返回的所有数据
    var obj={};
    var imgArr=[];
    var storeNameArr=[];
    var goodArr=[];
    var goodNumArr=[];
    var isBuyArr=[];
    var logisticsArr=[];
    var total=0;//总价格
    var times=0;//次数
    $.ajax({
        type:'get',
        url:'/user/set/allData',
        success:function(allData){
            //确定是否为登录状态
            if(allData){
                isDenglu=true;
                userName=allData.username;
                $.ajax({
                    type:"GET",
                    url:"/cart/allData",
                    data:{
                        userName:userName
                    },
                    success:function(data){
                        obj=data;
                        if(obj&&obj["storeNameList"].split(",").length!=0){
                            //将获取到的数据转变为数组存放到变量里面
                            storeNameArr=obj["storeNameList"].split(",");
                            goodArr=obj["goodList"].split(",");
                            goodNumArr=obj["goodNumList"].split(",");
                            isBuyArr=obj["isBuyList"].split(",");
                            logisticsArr=obj["logisticsList"].split(",");
                            var howmuch=0;
                            for(var many=0;many<isBuyArr.length;many++){
                                if(isBuyArr[many]=="false"){
                                    howmuch++;
                                }
                            }
                            $("#howmuch").text(howmuch);
                            $(".cart-content").html("<table id=\"cart-tab\"></table>");
                        }else{
                            storeNameArr=[];
                            goodArr=[];
                            goodNumArr=[];
                            isBuyArr=[];
                            logisticsArr=[];
                            $("#howmuch").text(0);
                        }


                        //接下来渲染出来
                        for(var m=0;m<storeNameArr.length;m++){
                            if(isBuyArr[m]=="false"){
                                $.ajax({
                                    type:"post",
                                    url:"/cart/goodlist",
                                    data:{
                                        storeName:storeNameArr[m],
                                        goodName:goodArr[m],
                                        goodNum:goodNumArr[m]
                                    },
                                    success:function(resData){
                                        var t=$('<tr><td class="imgclas"><img src=\"'+resData.message.goodpicSrc+'\"/></td><td><p>'+resData.message.storeName+'</p><p>'+resData.message.goodName+'</p><p>'+'<i style="color: red">￥</i><span class="pri">'+resData.message.price+'</span></p></td><td class="num"><span>'+resData.num+'</span>件</td><td class="dele"><a href="">删除</a></td></tr>')
                                        $("#cart-tab").append(t);
                                        total+=Number(resData.message.price)*Number(resData.num);

                                        //删除按钮
                                        $(".dele").eq(times).find("a").on("click",function(){
                                            for(var e=0;e<storeNameArr.length;e++){
                                                if(storeNameArr[e]==resData.message.storeName&&goodArr[e]==resData.message.goodName){
                                                    storeNameArr=removeElemen(storeNameArr,e);
                                                    goodArr=removeElemen(goodArr,e);
                                                    goodNumArr=removeElemen(goodNumArr,e);
                                                    isBuyArr=removeElemen(isBuyArr,e);
                                                    logisticsArr=removeElemen(logisticsArr,e);
                                                }
                                            }
                                            if(storeNameArr.length==0){
                                                //将处理完的数据传递给购物车接口
                                                $.ajax({
                                                    type: "POST",
                                                    url: "/cart/delete",
                                                    data: {
                                                        userName: userName
                                                    },
                                                    success: function (res) {
                                                        window.location.reload();
                                                    }
                                                })
                                            }else {
                                                //将处理完的数据传递给购物车接口
                                                $.ajax({
                                                    type: "POST",
                                                    url: "/cart/add",
                                                    data: {
                                                        isExit: true,
                                                        userName: userName,
                                                        storeNameList: storeNameArr.join(","),
                                                        goodList: goodArr.join(","),
                                                        goodNumList: goodNumArr.join(","),
                                                        isBuyList: isBuyArr.join(","),
                                                        logisticsList: logisticsArr.join(",")
                                                    },
                                                    success: function (res) {
                                                        window.location.reload();
                                                    }
                                                })
                                            }
                                        })
                                        times++;
                                        //因为这里是异步调用的结果，m早就已经加1了
                                        if(times==howmuch){
                                            $(".money").text(total);
                                        }



                                    }
                                });
                            }
                        }
                    }
                });
            }else{
                isDenglu=false;
            }
        }
    })
//去掉数组指定的元素
    function removeElemen(arr,index){
        var A=[];
        for(var d=0;d<arr.length;d++){
            if(d!==index){
                A.push(arr[d]);
            }
        }
        return A;
    }

    $(".choose").on("click",function(){
        if(isDenglu){
            $.ajax({
                type:"POST",
                url:"/cart/delete",
                data:{
                    userName:userName
                },
                success:function(data){
                    if(data.code==200){
                        location.reload();
                    }
                }
            })
        }else{
            $(".tip").fadeIn().delay(1000).fadeOut();
        }
    })

    $(".pay").on("click",function(){
        if(isDenglu){
            $('.pay').attr("data-target","#myBuyModal");
            $('.pay').css("background","rgb(247, 30, 37)");
            $("#buytext").text("您购买的商品总价为："+total.toFixed(2)+"元，是否确定下单？？");
        }else{
            $(".tip").fadeIn().delay(1000).fadeOut();
        }
    })
    $("#Buyyes").on("click",function(){
        for(var mon=0;mon<storeNameArr.length;mon++){
            if(isBuyArr[mon]=="false"){
                isBuyArr[mon]=true;
                logisticsArr[mon]="已下单";
                $.ajax({
                    type: "POST",
                    url: "/cart/add",
                    data: {
                        isExit: true,
                        userName: userName,
                        storeNameList: storeNameArr.join(","),
                        goodList: goodArr.join(","),
                        goodNumList: goodNumArr.join(","),
                        isBuyList: isBuyArr.join(","),
                        logisticsList: logisticsArr.join(",")
                    },
                    success: function (res) {
                        window.location.reload();
                    }
                })
            }
        }
    })

})