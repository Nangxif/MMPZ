//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = '<div id="loadingDiv" style=" position:absolute; top: 0px; left: 0px;width:100%;height:100%;background:white;z-index:10000;"><div style="margin:auto; position: absolute; left:0;top:0; right:0;bottom:0;cursor1: wait;  width: 100px; height: 100px; background: url(/public/img/loading.gif) no-repeat;background-size: cover;"></div></div>';
//呈现loading效果
document.write(_LoadingHtml);

//监听加载状态改变
document.onreadystatechange = completeLoading;
//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState == "complete") {
        var loadingMask = document.getElementById('loadingDiv');
        loadingMask.parentNode.removeChild(loadingMask);
    }
}

// function disabledMouseWheel() {
//   if (document.addEventListener) {
//     document.addEventListener('DOMMouseScroll', scrollFunc, false);
//   }//W3C
//   window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome
// }
// function scrollFunc(evt) {
//   evt = evt || window.event;
//     if(evt.preventDefault) {
//     // Firefox
//       evt.preventDefault();
//       evt.stopPropagation();
//     } else {
//       // IE
//       evt.cancelBubble=true;
//       evt.returnValue = false;
//   }
//   return false;
// }
// window.onload=disabledMouseWheel;