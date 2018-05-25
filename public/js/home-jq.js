$(function(){
    //声明并初始化每个商品版块的数据
    var Cloth=[];
    var DailyNecessities=[];
    var Cosmetics=[];
    var Food=[];
    var HomeAppliance=[];
    var ElectronicProducts=[];
    var MedicalSupplies=[];
    var Books=[];
    var Stationery=[];
    $.ajax({
        type:"get",
        url:"/allData",
        dataType:"json",
        success:function(result){
            //循环分类所有数据
            for(var m=0;m<result.goodInfo.length;m++){
                if(result.goodInfo[m].goodSort=="服装"){
                    Cloth.push(result.goodInfo[m]);
                }else if(result.goodInfo[m].goodSort=="日用品"){
                    DailyNecessities.push(result.goodInfo[m]);
                }else if(result.goodInfo[m].goodSort=="化妆品"){
                    Cosmetics.push(result.goodInfo[m]);
                }else if(result.goodInfo[m].goodSort=="食品"){
                    Food.push(result.goodInfo[m]);
                }else if(result.goodInfo[m].goodSort=="家电"){
                    HomeAppliance.push(result.goodInfo[m]);
                }else if(result.goodInfo[m].goodSort=="电子产品"){
                    ElectronicProducts.push(result.goodInfo[m]);
                }else if(result.goodInfo[m].goodSort=="医用品"){
                    MedicalSupplies.push(result.goodInfo[m]);
                }else if(result.goodInfo[m].goodSort=="书籍"){
                    Books.push(result.goodInfo[m]);
                }else{
                    Stationery.push(result.goodInfo[m]);
                }
            }
            //分类完成之后开始给每个框框赋值
            //推荐版块
            $("#tuijiant1").attr("src",DailyNecessities[0].goodpicSrc);
            $("#tuijiand1").text(DailyNecessities[0].description);
            $("#tuijianp1").text(DailyNecessities[0].price);
            $("#tuijian1data").text([DailyNecessities[0].goodpicSrc,DailyNecessities[0].goodName,DailyNecessities[0].storeName,DailyNecessities[0].price,DailyNecessities[0].description,DailyNecessities[0].repertory,DailyNecessities[0].score]);
            $("#tuijiant2").attr("src",HomeAppliance[0].goodpicSrc);
            $("#tuijiand2").text(HomeAppliance[0].description);
            $("#tuijianp2").text(HomeAppliance[0].price);
            $("#tuijian2data").text([HomeAppliance[0].goodpicSrc,HomeAppliance[0].goodName,HomeAppliance[0].storeName,HomeAppliance[0].price,HomeAppliance[0].description,HomeAppliance[0].repertory,HomeAppliance[0].score]);
            //服装版块
            $("#fuzhuangt1").attr("src",Cloth[0].goodpicSrc);
            $("#fuzhuangd1").text(Cloth[0].description);
            $("#fuzhuangp1").text(Cloth[0].price);
            $("#fuzhuang1data").text([Cloth[0].goodpicSrc,Cloth[0].goodName,Cloth[0].storeName,Cloth[0].price,Cloth[0].description,Cloth[0].repertory,Cloth[0].score]);
            $("#fuzhuangt2").attr("src",Cloth[1].goodpicSrc);
            $("#fuzhuangd2").text(Cloth[1].description);
            $("#fuzhuangp2").text(Cloth[1].price);
            $("#fuzhuang2data").text([Cloth[1].goodpicSrc,Cloth[1].goodName,Cloth[1].storeName,Cloth[1].price,Cloth[1].description,Cloth[1].repertory,Cloth[1].score]);
            //日用品版块
            $("#riyongpint1").attr("src",DailyNecessities[0].goodpicSrc);
            $("#riyongpind1").text(DailyNecessities[0].description);
            $("#riyongpinp1").text(DailyNecessities[0].price);
            $("#riyongpin1data").text([DailyNecessities[0].goodpicSrc,DailyNecessities[0].goodName,DailyNecessities[0].storeName,DailyNecessities[0].price,DailyNecessities[0].description,DailyNecessities[0].repertory,DailyNecessities[0].score]);
            $("#riyongpint2").attr("src",DailyNecessities[1].goodpicSrc);
            $("#riyongpind2").text(DailyNecessities[1].description);
            $("#riyongpinp2").text(DailyNecessities[1].price);
            $("#riyongpin2data").text([DailyNecessities[1].goodpicSrc,DailyNecessities[1].goodName,DailyNecessities[1].storeName,DailyNecessities[1].price,DailyNecessities[1].description,DailyNecessities[1].repertory,DailyNecessities[1].score]);
            //化妆品
            $("#huazhuangpint1").attr("src",Cosmetics[0].goodpicSrc);
            $("#huazhuangpind1").text(Cosmetics[0].description);
            $("#huazhuangpinp1").text(Cosmetics[0].price);
            $("#huazhuangpin1data").text([Cosmetics[0].goodpicSrc,Cosmetics[0].goodName,Cosmetics[0].storeName,Cosmetics[0].price,Cosmetics[0].description,Cosmetics[0].repertory,Cosmetics[0].score]);
            $("#huazhuangpint2").attr("src",Cosmetics[1].goodpicSrc);
            $("#huazhuangpind2").text(Cosmetics[1].description);
            $("#huazhuangpinp2").text(Cosmetics[1].price);
            $("#huazhuangpin2data").text([Cosmetics[1].goodpicSrc,Cosmetics[1].goodName,Cosmetics[1].storeName,Cosmetics[1].price,Cosmetics[1].description,Cosmetics[1].repertory,Cosmetics[1].score]);
            //食品版块
            $("#shipint1").attr("src",Food[0].goodpicSrc);
            $("#shipind1").text(Food[0].description);
            $("#shipinp1").text(Food[0].price);
            $("#shipin1data").text([Food[0].goodpicSrc,Food[0].goodName,Food[0].storeName,Food[0].price,Food[0].description,Food[0].repertory,Food[0].score]);
            $("#shipint2").attr("src",Food[1].goodpicSrc);
            $("#shipind2").text(Food[1].description);
            $("#shipinp2").text(Food[1].price);
            $("#shipin2data").text([Food[1].goodpicSrc,Food[1].goodName,Food[1].storeName,Food[1].price,Food[1].description,Food[1].repertory,Food[1].score]);
            //家电版块
            $("#jiadiant1").attr("src",HomeAppliance[0].goodpicSrc);
            $("#jiadiand1").text(HomeAppliance[0].description);
            $("#jiadianp1").text(HomeAppliance[0].price);
            $("#jiadian1data").text([HomeAppliance[0].goodpicSrc,HomeAppliance[0].goodName,HomeAppliance[0].storeName,HomeAppliance[0].price,HomeAppliance[0].description,HomeAppliance[0].repertory,HomeAppliance[0].score]);
            $("#jiadiant2").attr("src",HomeAppliance[1].goodpicSrc);
            $("#jiadiand2").text(HomeAppliance[1].description);
            $("#jiadianp2").text(HomeAppliance[1].price);
            $("#jiadian2data").text([HomeAppliance[1].goodpicSrc,HomeAppliance[1].goodName,HomeAppliance[1].storeName,HomeAppliance[1].price,HomeAppliance[1].description,HomeAppliance[1].repertory,HomeAppliance[1].score]);
            //电子产品版块
            $("#dianzit1").attr("src",ElectronicProducts[0].goodpicSrc);
            $("#dianzid1").text(ElectronicProducts[0].description);
            $("#dianzip1").text(ElectronicProducts[0].price);
            $("#dianzi1data").text([ElectronicProducts[0].goodpicSrc,ElectronicProducts[0].goodName,ElectronicProducts[0].storeName,ElectronicProducts[0].price,ElectronicProducts[0].description,ElectronicProducts[0].repertory,ElectronicProducts[0].score]);
            $("#dianzit2").attr("src",ElectronicProducts[1].goodpicSrc);
            $("#dianzid2").text(ElectronicProducts[1].description);
            $("#dianzip2").text(ElectronicProducts[1].price);
            $("#dianzi2data").text([ElectronicProducts[1].goodpicSrc,ElectronicProducts[1].goodName,ElectronicProducts[1].storeName,ElectronicProducts[1].price,ElectronicProducts[1].description,ElectronicProducts[1].repertory,ElectronicProducts[1].score]);
            //医用品版块
            $("#yiyongpint1").attr("src",MedicalSupplies[0].goodpicSrc);
            $("#yiyongpind1").text(MedicalSupplies[0].description);
            $("#yiyongpinp1").text(MedicalSupplies[0].price);
            $("#yiyongpin1data").text([MedicalSupplies[0].goodpicSrc,MedicalSupplies[0].goodName,MedicalSupplies[0].storeName,MedicalSupplies[0].price,MedicalSupplies[0].description,MedicalSupplies[0].repertory,MedicalSupplies[0].score]);
            $("#yiyongpint2").attr("src",MedicalSupplies[1].goodpicSrc);
            $("#yiyongpind2").text(MedicalSupplies[1].description);
            $("#yiyongpinp2").text(MedicalSupplies[1].price);
            $("#yiyongpin2data").text([MedicalSupplies[1].goodpicSrc,MedicalSupplies[1].goodName,MedicalSupplies[1].storeName,MedicalSupplies[1].price,MedicalSupplies[1].description,MedicalSupplies[1].repertory,MedicalSupplies[1].score]);
            //书籍版块
            $("#shujit1").attr("src",Books[0].goodpicSrc);
            $("#shujid1").text(Books[0].description);
            $("#shujip1").text(Books[0].price);
            $("#shuji1data").text([Books[0].goodpicSrc,Books[0].goodName,Books[0].storeName,Books[0].price,Books[0].description,Books[0].repertory,Books[0].score]);
            $("#shujit2").attr("src",Books[1].goodpicSrc);
            $("#shujid2").text(Books[1].description);
            $("#shujip2").text(Books[1].price);
            $("#shuji2data").text([Books[1].goodpicSrc,Books[1].goodName,Books[1].storeName,Books[1].price,Books[1].description,Books[1].repertory,Books[1].score]);
            //文具版块
            $("#wenjut1").attr("src",Stationery[0].goodpicSrc);
            $("#wenjud1").text(Stationery[0].description);
            $("#wenjup1").text(Stationery[0].price);
            $("#wenju1data").text([Stationery[0].goodpicSrc,Stationery[0].goodName,Stationery[0].storeName,Stationery[0].price,Stationery[0].description,Stationery[0].repertory,Stationery[0].score]);
            $("#wenjut2").attr("src",Stationery[1].goodpicSrc);
            $("#wenjud2").text(Stationery[1].description);
            $("#wenjup2").text(Stationery[1].price);
            $("#wenju2data").text([Stationery[1].goodpicSrc,Stationery[1].goodName,Stationery[1].storeName,Stationery[1].price,Stationery[1].description,Stationery[1].repertory,Stationery[1].score]);
        }
    });
    //给侧边栏添加动画
    $("#side").attr("class","iconfont icon-xiayiyeqianjinchakangengduo");
    $(".side-bar").css("left","-75px");
    $(".side-bar").css({"height":(0.93*$(window).height()-50)+"px","top":"50px"});
    $(".side-bar i").css({"height":(0.93*$(window).height()-50)+"px","line-height":(0.93*$(window).height()-50)+"px"});
    $("#side").on('click',function(){
        if($("#side").attr("class")=="iconfont icon-xiayiyeqianjinchakangengduo"){
            $("#side").attr("class","iconfont icon-shangyiyehoutuifanhui");
            $(".side-bar").animate({left:"0px"},1000);
        }else{
            $("#side").attr("class","iconfont icon-xiayiyeqianjinchakangengduo");
            $(".side-bar").animate({left:"-75px"},1000);
        }
    });
    //侧边栏的显示
    $(window).scroll(function () {
        console.log($(window).height());
        var scrollTop=$(document).scrollTop();
        if(scrollTop<=50){
            $(".side-bar").css({"height":(0.93*$(window).height()-50)+"px","top":"50px"});
            $(".side-bar i").css({"height":(0.93*$(window).height()-50)+"px","line-height":(0.93*$(window).height()-50)+"px"});
        }else{
            $(".side-bar").css({"height":(0.93*$(window).height())+"px","top":"0px"});
            $(".side-bar i").css({"height":(0.93*$(window).height())+"px","line-height":(0.93*$(window).height())+"px"});
        }
    });
    //点击锚点之后滚动到相应位置
    $(".scroll").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });


    //增加件数和减少件数的按钮
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







    //获取返回的所有数据
    var userName="";
    var obj={};
    var storeNameArr=[];
    var goodArr=[];
    var goodNumArr=[];
    var isBuyArr=[];
    var logisticsArr=[];
    var isDenglu=false;
    var storeNamegArr=[];
    var goodgArr=[];


    var storeNamesArr=[];
    //弹框设置

    for(var p=0;p<$(".box").length;p++){
        $(".box").eq(p).on("click",function(){
           var arr=$(this).find("span").eq(4).text().split(",");
           $("#picture").attr('src',arr[0]);
           $("#goodN").text(arr[1]);
           $("#detail-price").text(arr[3]);
           $("#desc").text(arr[4]);
           $("#sName").text(arr[2]);
           $("#reper").text(arr[5]);
           $("#score").text('评分:'+arr[6]);
           sessionStorage.setItem("data",arr[2]+','+arr[1]);
            $.ajax({
                type:'get',
                url:'/user/set/allData',
                success:function(allData){
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
                                //如果获取到的购物车信息null，表示用户的购物车没有东西，那么设置为空的数组
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
                                    if(storeNamegArr[roll]==arr[2]&&goodgArr[roll]==arr[1]){
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
                                    if(storeNamesArr[roll]==arr[2]){
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
            var start=sessionStorage.getItem("data").indexOf(",");
            storeNameMiddle=sessionStorage.getItem("data").substring(0,start);
            goodMiddle=sessionStorage.getItem("data").substring(start+1);
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
            var start=sessionStorage.getItem("data").indexOf(",");
            storeNamegMiddle=sessionStorage.getItem("data").substring(0,start);
            goodgMiddle=sessionStorage.getItem("data").substring(start+1);
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
            var start=sessionStorage.getItem("data").indexOf(",");
            storeNamesMiddle=sessionStorage.getItem("data").substring(0,start);
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




});
