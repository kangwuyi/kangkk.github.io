/*if (e && e.stopPropagation) {
       e.stopPropagation();
     } else if (window.event) {
       window.event.cancelBubble = true;
     }*/
     if (e && e.preventDefault) {
       //阻止默认浏览器动作(W3C)
       e.preventDefault();
     } else {
       //IE中阻止函数器默认动作的方式
       window.event.returnValue = false;
     }
