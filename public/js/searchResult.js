$(function(){
    //获取商品查询的数据并显示
    var key=sessionStorage.getItem("keyvalue");
    //获取用户的购物车数据
    var isDenglu=false;
    var userName="";
    //获取返回的所有数据
    var obj={};
    var storeNameArr=[];
    var goodArr=[];
    var goodNumArr=[];
    var isBuyArr=[];
    var logisticsArr=[];


    var storeNamegArr=[];
    var goodgArr=[];


    var storeNamesArr=[];
    $.ajax({
        type:"post",
        url:"/manager/search/data",
        data:{
            keyword:key
        },
        success:function(res){
            if(res.goodInfo.length>=1){
                $(".container").html('<table>'+'</table>');
                for(var i=0;i<res.goodInfo.length;i++){
                    var child=$('<tr><td><a href="" data-toggle="modal" data-target="#myBuyModal" class="goodinformations"><div class="pic"><img src="'+res.goodInfo[i].goodpicSrc+'"/></div><div class="text"><div class="desc">'+res.goodInfo[i].description+'</div><div class="price"><i>￥</i>'+res.goodInfo[i].price+'</div></div><span style="display:none;">'+[res.goodInfo[i]._id,res.goodInfo[i].goodpicSrc,res.goodInfo[i].goodName,res.goodInfo[i].price,res.goodInfo[i].description,res.goodInfo[i].storeName,res.goodInfo[i].repertory,res.goodInfo[i].score]+'</span></a></td></tr>');
                    $("table").append(child);
                    //将数据渲染到弹框
                    $(".goodinformations").eq(i).on('click',function(){
                        var arr=$(this).find("span").text().split(',');
                        $("#picture").attr("src",arr[1]);
                        $("#goodN").text(arr[2]);
                        $("#detail-price").text(arr[3]);
                        $("#desc").text(arr[4]);
                        $("#sName").text(arr[5]);
                        $("#reper").text(arr[6]);
                        $("#score").text("评分:"+arr[7]);
                        //将商品数据暂时存放在sessionStorage中
                        sessionStorage.setItem("good",arr[5]+','+arr[2]);
                        //判断是否为登录状态，是的话就保存数据
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
                                            //将获取到的数据转变为数组存放到变量里面
                                            //如果获取到的购物车信息null，表示用户的商品收藏列表没有东西，那么设置为空的数组
                                            if(obj==null){
                                                storeNameArr=[];
                                                goodArr=[];
                                                goodNumArr=[];
                                                isBuyArr=[];
                                                logisticsArr=[];
                                            }else{
                                                storeNameArr=obj["storeNameList"].split(",");
                                                goodArr=obj["goodList"].split(",");
                                                goodNumArr=obj["goodNumList"].split(",");
                                                isBuyArr=obj["isBuyList"].split(",");
                                                logisticsArr=obj["logisticsList"].split(",");
                                            }
                                        }
                                    });


                                    $.ajax({
                                        type:"GET",
                                        url:"/cart/allSaveGood",
                                        data:{
                                            userName:userName
                                        },
                                        success:function(data){
                                            obj=data;
                                            //将获取到的数据转变为数组存放到变量里面
                                            //如果获取到的商品收藏信息null，表示用户的购物车没有东西，那么设置为空的数组
                                            if(obj==null){
                                                storeNamegArr=[];
                                                goodgArr=[];
                                            }else{
                                                storeNamegArr=obj["storeNameList"].split(",");
                                                goodgArr=obj["goodList"].split(",");
                                            }
                                            for(var roll=0;roll<storeNamegArr.length;roll++){
                                                if(storeNamegArr[roll]==arr[5]&&goodgArr[roll]==arr[2]){
                                                    $("#saveGood").find("span").text("已收藏");
                                                    $("#goodicon").css("color","#d0040a");
                                                    $("#saveGood").css("backgroundColor","#f7f7f7");
                                                }
                                            }
                                        }
                                    });



                                    $.ajax({
                                        type:"GET",
                                        url:"/cart/allSaveStore",
                                        data:{
                                            userName:userName
                                        },
                                        success:function(data){
                                            obj=data;
                                            //将获取到的数据转变为数组存放到变量里面
                                            //如果获取到的店铺关注信息null，表示用户的店铺关注列表没有东西，那么设置为空的数组
                                            if(obj==null){
                                                storeNamesArr=[];
                                            }else{
                                                storeNamesArr=obj["storeNameList"].split(",");
                                            }
                                            for(var roll=0;roll<storeNamesArr.length;roll++){
                                                if(storeNamesArr[roll]==arr[5]){
                                                    $("#saveStore").find("span").text("已关注");
                                                    $("#storeicon").css("color","#d0040a");
                                                    $("#saveStore").css("backgroundColor","#f7f7f7");
                                                }
                                            }
                                        }
                                    });
                                }else{
                                    isDenglu=false;
                                }
                            }
                        })
                    });
                }
            }else{
                $(".container").text('无查询结果，请重试！');
                $(".container").addClass("fault");
            }

        }
    });


    //设置增加或减少件数按钮
    $("#decrease").on("click",function(){
        var i=$("#detail-but-input").val()-1;
        if(i<=1){
            $("#detail-but-input").val(1);
        }else {
            $("#detail-but-input").val(i);
        }
    });
    $("#increase").on("click",function(){
        var j=Number($("#detail-but-input").val())+1;
        $("#detail-but-input").val(j);
    })



    //添加至购物车
    var storeName="";
    var storeNameMiddle="";
    var good="";
    var goodMiddle="";
    var goodNum="";
    var goodNumMiddle="";
    var isBuy="";
    var isBuyMiddle="";
    var logistics="";
    var logisticsMiddle="";
    var isExit=false;
    $("#addCart").on("click",function(){
        if(isDenglu){
            var start=sessionStorage.getItem("good").indexOf(",");
            storeNameMiddle=sessionStorage.getItem("good").substring(0,start);
            goodMiddle=sessionStorage.getItem("good").substring(start+1);
            goodNumMiddle=$("#detail-but-input").val();
            isBuyMiddle="false";
            logisticsMiddle='未下单';
            //接下来要循环遍历数组，如果在storeNameArr和goodArr数组中找到对应的商品信息，则修改数量和是否购买的状态即可，若没有找到对应信息，则之间添加数组元素
            var ispush=true;//判断是否需要添加
            for(var m=0;m<storeNameArr.length;m++){
                if(storeNameArr[m]==storeNameMiddle&&goodArr[m]==goodMiddle){
                    goodNumArr[m]=goodNumMiddle;
                    isBuyArr[m]=isBuyMiddle;
                    logisticsArr[m]=logisticsMiddle;
                    ispush=false;
                }
            }

            //如果原来的数组是空的话，那么不要push
            if(storeNameArr.length==0) {
                storeName=storeNameMiddle;
                good=goodMiddle;
                goodNum=goodNumMiddle;
                isBuy=isBuyMiddle;
                logistics=logisticsMiddle;
            }else{
                //刚刚循环完所有数组元素之后，我们判断一下是否需要添加元素，如果需要，则添加之后赋值给最终的变量，如果不需要添加，则使用原来的数组
                if(ispush==true){
                    storeNameArr.push(storeNameMiddle);
                    storeName=storeNameArr.join(",");
                    goodArr.push(goodMiddle);
                    good=goodArr.join(",");
                    goodNumArr.push(goodNumMiddle);
                    goodNum=goodNumArr.join(",");
                    isBuyArr.push(isBuyMiddle);
                    isBuy=isBuyArr.join(",");
                    logisticsArr.push(logisticsMiddle);
                    logistics=logisticsArr.join(",");
                }else{
                    storeName = storeNameArr.join(",");
                    good = goodArr.join(",");
                    goodNum = goodNumArr.join(",");
                    isBuy = isBuyArr.join(",");
                    logistics=logisticsArr.join(",");
                }
            }
            //查询数据库里面是否已经有了该用户
            $.ajax({
                type:"POST",
                url:"/cart/isExit",
                data:{
                    userName:userName
                },
                success:function(isExit){
                    if(isExit.code==200){
                        isExit=true;
                    }else{
                        isExit=false;
                    }
                    //将处理完的数据传递给购物车接口
                    $.ajax({
                        type:"POST",
                        url:"/cart/add",
                        data:{
                            isExit:isExit,
                            userName:userName,
                            storeNameList:storeName,
                            goodList:good,
                            goodNumList:goodNum,
                            isBuyList:isBuy,
                            logisticsList:logistics
                        },
                        success:function(res){
                            $("#addCart").text(res.message);
                            $("#addCart").css("backgroundColor","#f71e25");
                            $("#detail-but-input").val(1);
                        }
                    })
                }
            });
        }else{
            $(".tip").fadeIn().delay(1000).fadeOut();
        }

    })






    //商品收藏
    var storeNameg="";
    var storeNamegMiddle="";
    var goodg="";
    var goodgMiddle="";
    var isGood=false;
    $("#saveGood").on("click",function(){
        if(isDenglu){
            var start=sessionStorage.getItem("good").indexOf(",");
            storeNamegMiddle=sessionStorage.getItem("good").substring(0,start);
            goodgMiddle=sessionStorage.getItem("good").substring(start+1);
            //接下来要循环遍历数组，如果在storeNamegArr和goodgArr数组中找到对应的商品信息，则修改数量和是否购买的状态即可，若没有找到对应信息，则之间添加数组元素
            var ispush=true;//判断是否需要添加
            for(var m=0;m<storeNamegArr.length;m++){
                if(storeNamegArr[m]==storeNamegMiddle&&goodgArr[m]==goodgMiddle){
                    ispush=false;
                }
            }

            //如果原来的数组是空的话，那么不要push
            if(storeNamegArr.length==0) {
                storeNameg=storeNamegMiddle;
                goodg=goodgMiddle;
            }else{
                //刚刚循环完所有数组元素之后，我们判断一下是否需要添加元素，如果需要，则添加之后赋值给最终的变量，如果不需要添加，则使用原来的数组
                if(ispush==true){
                    storeNamegArr.push(storeNamegMiddle);
                    storeNameg=storeNamegArr.join(",");
                    goodgArr.push(goodgMiddle);
                    goodg=goodgArr.join(",");
                }else{
                    storeNameg = storeNamegArr.join(",");
                    goodg = goodgArr.join(",");
                }
            }
            //查询数据库里面是否已经有了该用户
            $.ajax({
                type:"POST",
                url:"/cart/isGood",
                data:{
                    userName:userName
                },
                success:function(isG){
                    if(isG.code==200){
                        isGood=true;
                    }else{
                        isGood=false;
                    }
                    //将处理完的数据传递给商品收藏接口
                    $.ajax({
                        type:"POST",
                        url:"/cart/saveGood",
                        data:{
                            isGood:isGood,
                            userName:userName,
                            storeNameList:storeNameg,
                            goodList:goodg
                        },
                        success:function(res){
                            $("#saveGood").find("span").text(res.message);
                            $("#goodicon").css("color","#d0040a");
                            $("#saveGood").css("backgroundColor","#f7f7f7");
                            $("#detail-but-input").val(1);
                        }
                    })
                }
            });
        }else{
            $(".tip").fadeIn().delay(1000).fadeOut();
        }

    })




    //关注店铺
    var storeNames="";
    var storeNamesMiddle="";
    var isStore=false;
    $("#saveStore").on("click",function(){
        if(isDenglu){
            var start=sessionStorage.getItem("good").indexOf(",");
            storeNamesMiddle=sessionStorage.getItem("good").substring(0,start);
            var ispush=true;//判断是否需要添加
            for(var m=0;m<storeNamesArr.length;m++){
                if(storeNamesArr[m]==storeNamesMiddle){
                    ispush=false;
                }
            }

            //如果原来的数组是空的话，那么不要push
            if(storeNamesArr.length==0) {
                storeNames=storeNamesMiddle;
            }else{
                //刚刚循环完所有数组元素之后，我们判断一下是否需要添加元素，如果需要，则添加之后赋值给最终的变量，如果不需要添加，则使用原来的数组
                if(ispush==true){
                    storeNamesArr.push(storeNamesMiddle);
                    storeNames=storeNamesArr.join(",");
                }else{
                    storeNames = storeNamesArr.join(",");
                }
            }
            //查询数据库里面是否已经有了该用户
            $.ajax({
                type:"POST",
                url:"/cart/isStore",
                data:{
                    userName:userName
                },
                success:function(isS){
                    if(isS.code==200){
                        isStore=true;
                    }else{
                        isStore=false;
                    }
                    //将处理完的数据传递给商品收藏接口
                    $.ajax({
                        type:"POST",
                        url:"/cart/saveStore",
                        data:{
                            isStore:isStore,
                            userName:userName,
                            storeNameList:storeNames
                        },
                        success:function(res){
                            $("#saveStore").find("span").text("已关注");
                            $("#storeicon").css("color","#d0040a");
                            $("#saveStore").css("backgroundColor","#f7f7f7");
                            $("#detail-but-input").val(1);
                        }
                    })
                }
            });
        }else{
            $(".tip").fadeIn().delay(1000).fadeOut();
        }

    })
    //当退出弹框的时候，购物车按钮恢复原样
    $("#clean").on("click",function(){
        $("#addCart").css("backgroundColor","#d0040a");
        $("#addCart").text("添加至购物车");
        $("#saveGood").css("backgroundColor","white");
        $("#saveGood").find("span").text("收藏商品");
        $("#goodicon").css("color","#b3b0b0");
        $("#saveStore").css("backgroundColor","white");
        $("#saveStore").find("span").text("关注店铺");
        $("#storeicon").css("color","#b3b0b0");
        $("#detail-but-input").val(1);

    });
})