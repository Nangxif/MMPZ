$(function(){
    //注销账户
    $("#logout").on("click",function(){
        $.ajax({
            url:'/api/user/logout',
            success:function(result){
                $("#logout").attr("href","/");
            }
        })
    });
    //上传图片
    var data;
    var goodpicSrc;
    $("#goodpic").change(function(){
        if ($('#goodpic').val().length) {
            var fileName = $('#goodpic').val();
            var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
            if (extension == ".jpg" || extension == ".png") {
                data = new FormData();
                //上传的图片数据
                data.append('fulAvatar', $('#goodpic')[0].files[0]);
                $.ajax({
                    url: '/manager/add/pic',
                    type: 'POST',
                    data: data,
                    cache: false,
                    contentType: false, //不可缺参数
                    processData: false, //不可缺参数
                    success: function(data) {
                        goodpicSrc="/public"+data.result;
                    },
                    error: function() {
                        console.log('error');
                    }
                });
            }
        }
    });
    //保存数据
    $("#saveGood").on('click',function(){
        if(goodpicSrc==undefined){
            $("#successText").text("图片还未上传，请上传后重试");
            $("#addClose").attr("data-dismiss","modal");
        }else{
            $.ajax({
                type:'post',
                url:'/manager/add/data',
                data:{
                    storeName:$("#storeName").val(),
                    storeNum:$("#storeNum").val(),
                    goodName:$("#goodName").val(),
                    goodID:$("#goodID").val(),
                    goodSort:$("#goodSort").val(),
                    price:$("#price").val(),
                    description:$("#description").val(),
                    repertory:$("#repertory").val(),
                    goodpicSrc:goodpicSrc
                },
                dataType:'json',
                success:function(result){
                    //如果返回保存成功的话，那么所有控件里面的数据全部清空
                    if(result.code==0){
                        $("#addClose").attr("data-dismiss","");
                        $("#addClose").attr("href","/manager/add");
                    }else{
                        $("#addClose").attr("data-dismiss","modal");
                    }
                    $("#successText").text(result.message);
                }
            })
        }
    });

    //查询数据结果
    var change_Id;//用来存储要修改的数据的id
    var changeGoodPicSrc;//用来存储要修改的图片的存储地址,这个变量之所以要重新声明一个，是因为点击出来的更新弹框的数据不能受之前数据的影响
    var pagelength=0;
    var changePage=function(p){
        $.ajax({
            type:'post',
            url:'/manager/search/data',
            data:{
                keyword: $("#searchText").val(),
                page:p||1
            },
            success:function(result){
                $("#goodTable").html("<table class=\"table\" id=\"goodTable\">\n" +
                    "\t\t<tr>\n" +
                    "\t\t\t<th>店名</th>\n" +
                    "\t\t\t<th>商品</th>\n" +
                    "\t\t\t<th>商品ID</th>\n" +
                    "\t\t\t<th>类别</th>\n" +
                    "\t\t\t<th>修改/删除</th>\n" +
                    "\t\t</tr>\n" +
                    "\t</table>");
                if(result.code==0){
                    pagelength=result.goodInfo.length;
                    if(pagelength>=1) {
                        for (var i = 0; i < pagelength; i++) {
                            var hr = '/manager/search/delete?id=' + result.goodInfo[i]._id;
                            var text = $("<tr><td>" + result.goodInfo[i].storeName + "</td><td>" + result.goodInfo[i].goodName + "</td><td>" + result.goodInfo[i].goodID + "</td><td>" + result.goodInfo[i].goodSort + "</td><td><a class=\"btn btn-default changeData\" data-toggle=\"modal\" data-target=\"#changeModal\">改</a><a class=\"btn btn-default delete\">删</a><span style='display: none;'>" + result.goodInfo[i]._id + "</span></td></tr>");
                            $("#goodTable").append(text);
                            $(".delete").eq(i).on("click", function (evt) {
                                var evt = window.event || evt;
                                $.ajax({
                                    type: "get",
                                    url: hr,
                                    success: function () {
                                        changePage();
                                    }
                                })
                            })
                        }
                    }else{
                        var text = $("<tr>\n" +
                            "\t\t\t<td colspan=\"5\" style=\"color: #555; text-align: center;\">查询不到数据</td>\n" +
                            "\t\t</tr>");
                        $("#goodTable").append(text);
                    }
                    //查询功能的分页
                    // for(var i=0;i<$(".pageNum").length;i++){
                    //     $(".pageNum:eq("+(i)+")").text(i+1);
                    //     if(pagelength>25){
                    //         $("#next").removeClass("bg");
                    //     }else{
                    //         $("#next").addClass("bg");
                    //     }
                    //     if(Number($(".pageNum").eq(i).text())>Math.ceil(pagelength/5)){
                    //         $(".pageNum").eq(i).addClass("bg");
                    //     }else{
                    //         $(".pageNum").eq(i).removeClass("bg");
                    //     }
                    // }
                    //更改数据,此处可用智能的事件处理器，后期修改
                    for(var m=0;m<$(".changeData").length;m++){
                        $(".changeData").bind("click",{index:m},function(){
                            change_Id=$(this).parent().children().eq(2).text();//将获取到的ID暂时性地保存起来
                            $.ajax({
                                type:'get',
                                url:"/manager/allData",
                                data:{
                                    _id:change_Id
                                },
                                dataType:"JSON",
                                success:function(allData){
                                    //当所有的数据返回的时候，将所有的数据渲染到控件里面
                                    $("#changeStoreName").val(allData.storeName);
                                    $("#changeStoreNum").val(allData.storeNum);
                                    $("#changeGoodName").val(allData.goodName);
                                    $("#changeGoodID").val(allData.goodID);
                                    $("#changeGoodSort").val(allData.goodSort);
                                    $("#changePrice").val(allData.price);
                                    $("#changeDescription").val(allData.description);
                                    $("#changeRepertory").val(allData.repertory);
                                    $("#changePics").val(allData.goodpicSrc);
                                    //更改图片的上传
                                    $("#changeGoodpic").change(function(){
                                        if ($('#changeGoodpic').val().length) {
                                            var fileName = $('#changeGoodpic').val();
                                            var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
                                            if (extension == ".jpg" || extension == ".png") {
                                                data = new FormData();
                                                //上传的图片数据
                                                data.append('fulAvatar', $('#changeGoodpic')[0].files[0]);
                                                $.ajax({
                                                    url: '/manager/add/pic',
                                                    type: 'POST',
                                                    data: data,
                                                    cache: false,
                                                    contentType: false, //不可缺参数
                                                    processData: false, //不可缺参数
                                                    success: function(data) {
                                                        changeGoodPicSrc="/public"+data.result;
                                                    },
                                                    error: function() {
                                                        console.log('error');
                                                    }
                                                });
                                            }
                                        }
                                    });
                                    //这时候要来设置一下确认修改的按钮了
                                    $("#change").on("click",function(){
                                        if($("#changeGoodName").val()==""||$("#changeGoodID").val()==""||$("#changeGoodSort").val()=="商品类别"||$("#changePrice").val()==""||$("#changeRepertory").val()==""){
                                            $("#changeText").text("信息未填写完全，请填写完之后重试！");
                                            $("#changeClose").attr("data-dismiss","modal");
                                        }else{
                                            if(changeGoodPicSrc==undefined){
                                                changeGoodPicSrc=allData.goodpicSrc;
                                            }
                                            $.ajax({
                                                type:"POST",
                                                url:"/manager/search/change",
                                                data:{
                                                    _id:change_Id,
                                                    storeName:$("#changeStoreName").val(),
                                                    storeNum:$("#changeStoreNum").val(),
                                                    goodName:$("#changeGoodName").val(),
                                                    goodID:$("#changeGoodID").val(),
                                                    goodSort:$("#changeGoodSort").val(),
                                                    price:$("#changePrice").val(),
                                                    description:$("#changeDescription").val(),
                                                    repertory:$("#changeRepertory").val(),
                                                    goodpicSrc:changeGoodPicSrc
                                                },
                                                dataType:"json",
                                                success:function(result){
                                                    if(result.code==200){
                                                        $("#changeText").text("信息修改成功！");
                                                        $("#changeClose").removeAttr("data-dismiss");
                                                        $("#changeClose").attr("href","/manager/search");
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        });
                    }


                    // for(var m=0;m<$(".delete").length;m++){
                    //     $(".delete").bind("click",{index:m},function(){
                    //         change_Id=$(this).parent().children()[2].innerHTML;//将获取到的ID暂时性地保存起来
                    //         $.ajax({
                    //             type:'get',
                    //             url:"/manager/allData",
                    //             data:{
                    //                 _id:change_Id
                    //             },
                    //             dataType:"JSON",
                    //             success:function(allData){
                    //
                    //             }
                    //         });
                    //     });
                    // }

                }
            }
        });
    }
    var nowPage=1;
    $("#searchGood").on('click',function(){
        changePage(nowPage);
    });
    $(".previous").on('click',function(){
        changePage(--nowPage);
    })
    $(".next").on('click',function(){
        changePage(++nowPage);
    })
    //查询功能的分页
    // var Page=5;
    // for(var i=0;i<$(".pageNum").length;i++){
    //     $(".pageNum:eq("+(i)+")").text(i+1);
    //     $(".pageNum").eq(i).addClass("bg");
    // }
    // $("#next").addClass("bg");
    // $("#prev").addClass("bg");
    // $("#prev").on("click",function(){
    //     if(parseInt($(".pageNum:eq(0)").text())<=1){
    //         $("#prev").addClass("bg");
    //     }else{
    //         var n=parseInt($(".pageNum:eq(0)").text())-Page;
    //         for(var i=0;i<$(".pageNum").length;i++){
    //             $(".pageNum:eq("+i+")").text(n);
    //             ++n;
    //         }
    //     };
    // });
    // $("#next").on("click",function(){
    //     var m=parseInt($(".pageNum:eq(0)").text())+Page;
    //     for(var i=1;i<=$(".pageNum").length;i++){
    //         $(".pageNum:eq("+(i-1)+")").text(m);
    //         ++m;
    //     }
    //     for(var j=0;j<5;j++){
    //         if(Number($(".pageNum").eq(j).text())>Math.ceil(pagelength/5)){
    //             $(".pageNum").eq(j).addClass("bg");
    //         }else{
    //             $(".pageNum").eq(j).removeClass("bg");
    //         }
    //     }
    // });
    // for(var q=1;q<=$(".pageNum").length;q++){
    //     $(".pageNum:eq("+(q-1)+")").on("click",function(){
    //         $.ajax({
    //             type:'get'
    //         })
    //     });
    // }


    //修改数据

})