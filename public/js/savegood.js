$(function(){
    //获取用户的商品关注数据
    var isDenglu=false;
    var userName="";
    //获取返回的所有数据
    var obj={};
    var imgArr=[];
    var storeNamegArr=[];
    var goodgArr=[];
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
                    url:"/cart/allSaveGood",
                    data:{
                        userName:userName
                    },
                    success:function(data){
                        obj=data;
                        if(obj){
                            //将获取到的数据转变为数组存放到变量里面
                            storeNamegArr=obj["storeNameList"].split(",");
                            goodgArr=obj["goodList"].split(",");
                            $("#howmuch").text(storeNamegArr.length);
                            $(".saveg-content").html("<table id=\"saveg-tab\"></table>");
                        }else{
                            storeNamegArr=[];
                            goodgArr=[];
                            $("#howmuch").text(storeNamegArr.length);
                            $(".saveg-content").html("<table id=\"saveg-tab\"></table>");
                        }


                        //接下来渲染出来
                        for(var m=0;m<storeNamegArr.length;m++){
                                $.ajax({
                                    type:"post",
                                    url:"/cart/savegoodlist",
                                    data:{
                                        storeName:storeNamegArr[m],
                                        goodName:goodgArr[m]
                                    },
                                    success:function(resData){
                                        var t=$('<tr><td class="imgclas"><img src=\"'+resData.message.goodpicSrc+'\"/></td><td><p>'+resData.message.storeName+'</p><p>'+resData.message.goodName+'</p><p>'+'<i style="color: red">￥</i><span class="pri">'+resData.message.price+'</span></p></td><td class="dele"><a href="">取消收藏</a></td></tr>')
                                        $("#saveg-tab").append(t);

                                        //删除按钮
                                        $(".dele").eq(times).find("a").on("click",function(){
                                            for(var e=0;e<storeNamegArr.length;e++){
                                                if(storeNamegArr[e]==resData.message.storeName&&goodgArr[e]==resData.message.goodName){
                                                    storeNamegArr=removeElemen(storeNamegArr,e);
                                                    goodgArr=removeElemen(goodgArr,e);
                                                }
                                            }
                                            if(storeNamegArr.length==0){
                                                //将处理完的数据传递给购物车接口
                                                $.ajax({
                                                    type: "POST",
                                                    url: "/cart/deleteGood",
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
                                                    url: "/cart/saveGood",
                                                    data: {
                                                        isGood: true,
                                                        userName: userName,
                                                        storeNameList: storeNamegArr.join(","),
                                                        goodList: goodgArr.join(",")
                                                    },
                                                    success: function (res) {
                                                        window.location.reload();
                                                    }
                                                })
                                            }
                                        })
                                        times++;
                                    }
                                });

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


})