$(document).ready(function(){
    var isDenglu=false;
    var userName="";
    var goodlength=0;
    var storelength=0;
    //一进入设置页面就开始请求该用户的所有数据
    $.ajax({
        type:'get',
        url:'/user/set/allData',
        success:function(allData){
            //还未进入修改界面的时候显示的数据
            if(allData!=null){
                isDenglu=true;
                userName=allData.username;
                $(".picture").css("background-image","url("+allData.picSrc+")");
                $(".picture").attr("href","/user/set");
                $("#realname").text(allData.realname);
                $("#sex").text(allData.sex);
                $("#mobilephone").text(allData.mobilephone);
                $("#addresstext").text(allData.address);
                $.ajax({
                    type: "GET",
                    url: "/cart/allSaveGood",
                    data: {
                        userName: userName
                    },
                    success: function (data) {
                        goodlength=(data["goodList"].split(",")||[]).length;
                        $("#savegood").text(goodlength);
                    }
                })
                $.ajax({
                    type: "GET",
                    url: "/cart/allSaveStore",
                    data: {
                        userName: userName
                    },
                    success: function (data) {
                        storelength=(data["storeNameList"].split(",")||[]).length;
                        $("#savestore").text(storelength);
                    }
                })
            }else{
                isDenglu=false;
                $(".picture").css("background-image","url(/public/img/nopic.png)");
                $(".picture").removeAttr("href");
                $("#realname").text("未登录");
                $("#sex").text("未登录");
                $("#mobilephone").text("未登录");
                $("#addresstext").text("未登录");
            }
        }
    });
	$('#show').click(function(){
        if($('#show').text()=='显示更多'){
            $('#show').text('隐藏');
        }else{
            $('#show').text('显示更多');
        }
		$('#tel').slideToggle();
        $('#address').slideToggle();
	});
	$("#logout").on('click',function(){
        $.ajax({
            url:'/api/user/logout',
            success:function(result){
                if(!result.code){
                    window.location.reload();
                }
            }
        })
	});




    //商品收藏店铺收藏
    $(".save").on("click",function(){
        if(isDenglu){
            $(".save").attr("href","/user/savegood");
        }else{
            $(".tip").fadeIn().delay(1000).fadeOut();
        }
    });
    $(".star").on("click",function(){
        if(isDenglu){
            $(".star").attr("href","/user/savestore");
        }else{
            $(".tip").fadeIn().delay(1000).fadeOut();
        }
    })
	//已支付未支付
	$(".nopay").on("click",function(){
	    if(isDenglu){
            $(".nopay").attr("href","/user/nopay");
        }else{
            $(".tip").fadeIn().delay(1000).fadeOut();
        }
    });
	$(".pay").on("click",function(){
        if(isDenglu){
            $(".pay").attr("href","/user/pay");
        }else{
            $(".tip").fadeIn().delay(1000).fadeOut();
        }
    })
});