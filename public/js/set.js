$(document).ready(function(){
    var picSrc;
    //一进入设置页面就开始请求该用户的所有数据
    $.ajax({
        type:'get',
        url:'/user/set/allData',
        success:function(allData){
            //还未进入修改界面的时候显示的数据
            $(".set-picture").css("background-image","url("+allData.picSrc+")");
            $("#_username").text(allData.username);
            $("#_realname").text(allData.realname);
            $("#_sex").text(allData.sex);
            $("#_mobilephone").text(allData.mobilephone);
            $("#_address").text(allData.address);
            //进入修改设置页面之后在控件里面显示的数据
            $("#pics").val(allData.picSrc);
            $("#username").val(allData.username);
            $("#realname").val(allData.realname);
            $("#sex").val(allData.sex);
            $("#mobilephone").val(allData.mobilephone);
            $("#address").val(allData.address);
        }
    });
	$('#setInformation').click(function(){
		$('.content').fadeOut();
		$('.set-content').delay(500).fadeIn();
	});
	//提交图片
    /*
    * 由于图片的数据类型跟下面的其他数据类型（json）不一样，所以只能分开请求，提交图片成功之后，将图片保存的地址传递给提交用户信息的接口，然后在数据库保存起来，需要用到的时候，访问本地的图片库即可
    * */
    var data;
	$('#pic').change(function(evt){
        if ($('#pic').val().length) {
            var fileName = $('#pic').val();
            var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
            if (extension == ".jpg" || extension == ".png") {
                data = new FormData();
                //上传的图片数据
                data.append('fulAvatar', $('#pic')[0].files[0]);
                $.ajax({
                    url: '/user/set/pic',
                    type: 'POST',
                    data: data,
                    cache: false,
                    contentType: false, //不可缺参数
                    processData: false, //不可缺参数
                    success: function(data) {
                        picSrc="/public"+data.result;
                    },
                    error: function() {
                        console.log('error');
                    }
                });
            }
        }
    });
	$('#setOK').click(function(){
        if($("#username").val()==''&&$("#realname").val()==''&&$("#mobilephone").val()==''&&$("#address").val()==''){
            $("#Set-text").text("信息未填写完全，请填写完再提交");
            $("#Set_close").attr("data-dismiss","modal");
        }else{
            $("#Set_close").attr("href","/user/set");
        }
        if(picSrc==undefined){
            picSrc=$("#pics").val();
        }
        $.ajax({
            url: '/user/set/data',
            type: 'POST',
            data: {
                picSrc:picSrc,
                username: $("#username").val(),
                realname: $("#realname").val(),
                sex: $("#sex").val(),
                mobilephone: $("#mobilephone").val(),
                address: $("#address").val()
            },
            dataType:'json',
            success: function(response) {
                $("#Set-text").text("信息已修改，请点击关闭");
                $('.set-content').fadeOut();
                $('.content').delay(500).fadeIn();
            },
            error: function() {
                console.log('error');
            }
        });
	});
});