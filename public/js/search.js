$(function(){
    $(".getValue").on("click",function(){
        var val=$("#val").val();
        sessionStorage.setItem("keyvalue",val);
        window.location.href="/search/result";
    });
})