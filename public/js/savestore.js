$(function(){
    //获取用户的商品关注数据
    var isDenglu=false;
    var userName="";
    //获取返回的所有数据
    var obj={};
    var imgArr=[];
    var storeNamesArr=[];
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
                    url:"/cart/allSaveStore",
                    data:{
                        userName:userName
                    },
                    success:function(data){
                        obj=data;
                        if(obj){
                            //将获取到的数据转变为数组存放到变量里面
                            storeNamesArr=obj["storeNameList"].split(",");
                            $(".saves-content").html("<table id=\"saves-tab\"></table>");
                        }else{
                            storeNamesArr=[];
                            $(".saves-content").html("<table id=\"saves-tab\"></table>");
                        }


                        //接下来渲染出来
                        for(var m=0;m<storeNamesArr.length;m++){
                            $.ajax({
                                type:"post",
                                url:"/cart/savestorelist",
                                data:{
                                    storeName:storeNamesArr[m]
                                },
                                success:function(resData){
                                    var t=$('<tr><td>'+resData.message.storeName+'</td><td class="dele"><a href="">取消关注</a></td></tr>')
                                    $("#saves-tab").append(t);

                                    //删除按钮
                                    $(".dele").eq(times).find("a").on("click",function(){
                                        for(var e=0;e<storeNamesArr.length;e++){
                                            if(storeNamesArr[e]==resData.message.storeName){
                                                storeNamesArr=removeElemen(storeNamesArr,e);
                                            }
                                        }
                                        if(storeNamesArr.length==0){
                                            //将处理完的数据传递给购物车接口
                                            $.ajax({
                                                type: "POST",
                                                url: "/cart/deleteStore",
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
                                                url: "/cart/saveStore",
                                                data: {
                                                    isStore: true,
                                                    userName: userName,
                                                    storeNameList: storeNamesArr.join(",")
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