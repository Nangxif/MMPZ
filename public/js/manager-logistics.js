$(function(){
    var text=$("<tr id='nul'><td colspan=\"4\" style=\"color: #555; text-align: center;\">查询不到数据</td></tr>");
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
    $("#logisticsTable").append(text);
    $("#searchGood").on("click",function(){
        var keyvalue=$("#searchText").val();
        $.ajax({
            type: "GET",
            url: "/cart/allData",
            data: {
                userName: keyvalue
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
                } else {
                    storeNameArr = [];
                    goodArr = [];
                    goodNumArr = [];
                    isBuyArr = [];
                    logisticsArr=[];
                }


                //接下来渲染出来
                for (var m = 0; m < storeNameArr.length; m++) {
                    if (isBuyArr[m] == "true") {
                        text = $("<tr><td>" + storeNameArr[m] + "</td><td>"+goodArr[m]+"</td><td>"+logisticsArr[m]+"</td><td><a class=\"btn btn-default changeData\" data-toggle=\"modal\" data-target=\"#changeModal\">改</a><span style='display: none;'>"+m+"</span></td></tr>");
                        $("#nul").remove();
                        $("#logisticsTable").append(text);
                        $(".changeData").on("click",function(){
                            var index=$(this).parent().parent().find("span").text();
                            $("#status").text(logisticsArr[index]);
                            $("#lsure").on("click",function(){
                                logisticsArr[index]=$("#select").val();
                                $.ajax({
                                    type: "POST",
                                    url: "/cart/add",
                                    data: {
                                        isExit: true,
                                        userName: keyvalue,
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
                            })
                        })

                    }
                }
            }
        });

    })
})