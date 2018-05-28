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
    var text;
    $("#searchSelf").on("click",function(){
        var keyvalue=$("#searchText").val();
        $.ajax({
            type:"POST",
            url:"/api/user/search",
            data:{
                username:keyvalue
            },
            success:function(result){
                if(result.code!=404){
                    text = $("<tr>\n" +
                        "            <th>用户名</th>\n" +
                        "            <th>删除</th>\n" +
                        "        </tr><tr><td>" + result.obj.username + "</td><td><a class=\"btn btn-default changeData\" data-toggle=\"modal\" data-target=\"#deleteModal\">删</a></td></tr>");
                    $("#selfTable").html(text);
                    $("#sure").on("click", function () {
                        $.ajax({
                            type:"POST",
                            url:"/api/user/delete",
                            data:{
                                username:keyvalue
                            },
                            success:function(res){
                                text=$("<tr>\n" +
                                    "            <th>用户名</th>\n" +
                                    "            <th>删除</th>\n" +
                                    "        </tr>\n" +
                                    "        <tr>\n" +
                                    "            <td colspan=\"2\" style=\"color: #555; text-align: center;\">查询不到数据</td>\n" +
                                    "        </tr>");
                                $("#selfTable").html(text);
                                $("#searchText").val("");
                                $(".tip").text(res.message);
                                $(".tip").fadeIn().delay(1000).fadeOut();
                            }
                        })

                    })
                }else{
                    text=$("<tr>\n" +
                        "            <th>用户名</th>\n" +
                        "            <th>删除</th>\n" +
                        "        </tr>\n" +
                        "        <tr>\n" +
                        "            <td colspan=\"2\" style=\"color: #555; text-align: center;\">查询不到数据</td>\n" +
                        "        </tr>");
                    $("#selfTable").html(text);
                }
            }
        });
    })
})