# JavaScript 浏览器对象

## Window 对象

- window.self
- window.top
- window.parent

self 代表窗体自己，top 代表窗体被框架分割时的最顶层，parent 代表当前框架的上一层的父窗体

- window.opener

代表打开此窗体的父窗体对象，如果父窗体里有 &lt;form name="FORM1"&gt; 表单的 &lt;input type="text" name="TEXT1"&gt; 元素的话，用下面的代码可以设定此元素的值。

```js
window.opener.document.FORM1.TEXT1.value = "ABCDEFG";
```

- window.name

用 &lt;frame&gt; 的 name 属性指定窗体对象。比如下面的例子里，窗体被分割成两个框架，分别可以用 top.sub、top.main 指向它们。

```html
<frameset cols="100,*">
 <frame name="sub" src="sub.html">
 <frame name="main" src="main.html">
</frameset>
```
- window.alert(message)

```js
window.alert("发生了XX错误！");
```

- window.confirm(message)

弹出内容为 message 的确认对话框。按下 [OK] 按钮返回true，按下取消按钮返回false。

```js
if (window.confirm("确定吗？")) {
   document.F1.submit();
}
```
- window.prompt(message [, default])

弹出可输入文字的对话框。message 为对话框的说明内容，default 为输入框的初期值。返回值为输入的内容，按下取消按钮时返回 null。

- window.showModalDialog(url [, arg [, opt]])
- window.showModelessDialog(url [, arg [, opt]])
- window.dialogArguments
- window.dialogHeight
- window.dialogWidth
- window.dialogLeft
- window.dialogTop
- window.returnValue

显示以 url 为内容的对话框。参数 arg 可以为数值、字符串、数组等。opt 可以指定 dialogWidth:px（对话框宽度）, dialogHeight:px（对话框高度，不小于100px）, dialogTop:px（离屏幕上的距离）, dialogLeft:px（离屏幕左的距离）, center:(yes|no)（是否居中，默认yes，但仍可以指定高度和宽度）, dialogHide:(yes|no)（在打印或者打印预览时对话框是否隐藏，默认为no）, edge:(sunken|raised)（指明对话框的边框样式，默认为raised）, resizable:(yes|no)（是否可被改变大小，默认no）, scroll:(yes|no)（是否显示滚动条，默认为yes）, status:(yes|no)（是否显示状态栏，默认为yes[ Modeless]或no[Modal]）, unadorned:(yes|no)（默认为no）。用 dialogArguments 可以取得对话框传递的参数。关闭对话框时 returnValue 中设定的值会成为 showModalDialog() 的返回值。

```js
var args = new Array();
args[0] = "AAA";
args[1] = "BBB";
var val = showModalDialog("dlg.html", args,"dialogHeight:100px;dialogWidth:300px");
```

```html
<!-- parent.html-->
<script>
    var obj = new Object();
    obj.name='jsobj1';
    window.showModalDialog('model.html',obj,'dialogWidth=200px;dialogHeight=100px');
</script>
model.html
<script>
    var obj = window.dialogArguments
    alert('您传递的参数为：' + obj.name)
</script>
<script>
    str =window.showModalDialog('model.html',,'dialogWidth=200px;dialogHeight=100px');
    alert(str);
</script>
model.html
<script>
    window.returnValue='http://www.monmonkey.com/';
</script>
```

## 窗体控制

- window.focus()
- window.blur()

focus() 可以使此窗体获得焦点。blur() 可以使此窗体失去焦点。

- window.scroll(x, y)
- window.scrollTo(x, y)
- window.scrollBy(x, y)

使画面跳转到坐标 x，y 的位置。scroll() 和 scrollTo() 是绝对坐标，scrollBy() 是从现在位置开始的相对坐标。scroll() 是以前的东西，为了兼容性才保留下来。

- window.resizeTo(x, y)
- window.resizeBy(x, y)

改变窗体的大小为 x，y。resizeTo() 是绝对坐标，resizeBy() 是从现在位置开始的相对坐标。一般无法小于100×100。

- window.moveTo(x, y)
- window.moveBy(x, y)

把窗体移动到 x，y 的位置。moveTo() 是绝对坐标、moveBy() 是从现在位置开始的相对坐标。

- window.print()

## 窗体信息

- window.name

返回窗体名字的字符串。（&lt;frame&gt;标签的 name 属性或 window.open()函数的第二个参数指定的名字）

### 定时

- window.setTimeout(script, msec)
- window.setTimeout(script, msec, lang)
- window.clearTimeout(timeoutID)

setTimeout() 是在 msec 毫秒后执行指定的程序。script 的部分为 JavaScript 代码。lang 的部分为语言种类（"JScript"、"JavaScript"、"VBScript"）。clearTimeout() 用来解除 setTimeout() 设定的定时处理。

- window.setInterval(script, msec)
- window.setInterval(script, msec, lang)
- window.clearInterval(intervalID)

类似 setTimeout()、clearTimeout()，以 msec 毫秒为间隔，定期重复执行指定的程序。

- window.open(url, name [, style])

```js
w = window.open("test.html", "Test", "width=200,height=200");
```

<table border="1" cellspacing="0" cellpadding="2" width="85%">
<tbody><tr class="h">
<th>名字</th>
<th>意义</th>
</tr>
<tr>
<td>_top</td>
<td>窗体被框架分割时，最顶层的框架（窗体）。</td>
</tr>
<tr>
<td>_blank</td>
<td>没名字的新窗体。</td>
</tr>
<tr>
<td>_self</td>
<td>框架（窗体）本身。</td>
</tr>
<tr>
<td>_parent</td>
<td>窗体被框架分割时，上一层的框架（窗体）。</td>
</tr>
</tbody></table>

style 用来指定窗体的样式。n 是像素值，yes | no 是 yes 和 no 二选一。指定复数样式的时候，可以像 width=100,height=50,menubar=no 这样用逗号隔开。

<table border="1" cellspacing="0" cellpadding="2" width="85%">
<tbody><tr class="h">
<th>样式</th>
<th>意义</th>
</tr>
<tr>
<td>channelmode=yes|no</td>
<td>是否启用通道模式。默认为no。</td>
</tr>
<tr>
<td>directories=yes|no</td>
<td>是否显示链接栏。默认为yes。</td>
</tr>
<tr>
<td>fullscreen=yes|no</td>
<td>是否以全屏模式打开。默认为no。此属性可能会隐藏浏览器的标题栏和菜单，ALT+F4可以关闭窗口。</td>
</tr>
<tr>
<td>height=n</td>
<td>指定窗体的高度。</td>
</tr>
<tr>
<td>left=n</td>
<td>指定窗口距画面左边的距离。值必须大于或者等于0。。</td>
</tr>
<tr>
<td>location=yes|no</td>
<td>是否显示地址栏。默认为yes。</td>
</tr>
<tr>
<td>menubar=yes|no</td>
<td>是否显示菜单栏。默认为yes。</td>
</tr>
<tr>
</tr><tr>
<td>resizable=yes|no</td>
<td>可否改变窗体大小。默认为yes。</td>
</tr>
<tr>
<td>scrollbars=yes|no</td>
<td>是否显示横向或者纵向滚动条。默认为yes。</td>
</tr>
<tr>
<td>status=yes|no</td>
<td>是否显示状态栏。默认为yes。</td>
</tr>
<tr>
<td>titlebar=yes|no</td>
<td>是否显示标题栏。默认为yes。</td>
</tr>
<tr>
<td>toolbar=yes|no</td>
<td>是否显示工具栏，包括如前进、后退、停止等按钮。默认为yes。</td>
</tr>
<tr>
<td>top=n</td>
<td>指定窗口距画面顶部的距离。值必须大于或者等于0。</td>
</tr>
<tr>
<td>width=n</td>
<td>指定窗体的宽度。</td>
</tr>
</tbody></table>

各浏览器的支持程度如下。

<table border="1" cellspacing="0" cellpadding="2" width="65%">
	<tbody><tr class="h">
	  <th>&nbsp;</th>
	  <th>IE6</th>
	  <th>IE7</th>
	  <th>IE8</th>
	  <th>Firefox</th>
	  <th>Safari</th>
	  <th>Chrome</th>
	  <th>Opera</th>
	</tr>
        <tr>
          <th>channelmode</th>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
        </tr>
        <tr>
          <th>directories</th>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
        </tr>
        <tr>
          <th>fullscreen</th>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
        </tr>
        <tr>
          <th>location</th>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_4">不支持 7</td>
          <td class="hl_2">支持 2</td>
          <td class="hl_4">不支持 7</td>
          <td class="hl_2">支持 8</td>
        </tr>
        <tr>
          <th>menubar</th>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持 1</td>
          <td class="hl_2">支持 1</td>
          <td class="hl_2">支持 1</td>
          <td class="hl_2">支持 1</td>
          <td class="hl_4">不支持 9</td>
          <td class="hl_4">不支持 9</td>
        </tr>
        <tr>
          <th>resizable</th>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_4">不支持 10</td>
          <td class="hl_4">不支持 10</td>
          <td class="hl_4">不支持 10</td>
          <td class="hl_4">不支持 10</td>
        </tr>
        <tr>
          <th>scrollbars</th>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_4">不支持 11</td>
          <td class="hl_4">不支持 11</td>
          <td class="hl_2">支持</td>
        </tr>
        <tr>
          <th>status</th>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持 12</td>
          <td class="hl_2">支持</td>
          <td class="hl_4">不支持 13</td>
          <td class="hl_2">支持</td>
          <td class="hl_4">不支持 13</td>
          <td class="hl_4">不支持 13</td>
        </tr>
        <tr>
          <th>titlebar</th>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
          <td class="hl_4">不支持</td>
        </tr>
        <tr>
          <th>toolbar</th>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持 2</td>
          <td class="hl_4">不支持 14</td>
          <td class="hl_4">不支持 14</td>
        </tr>
        <tr>
          <th>top</th>
          <td class="hl_2">支持 3</td>
          <td class="hl_2">支持 1</td>
          <td class="hl_2">支持 3</td>
          <td class="hl_2">支持 4</td>
          <td class="hl_2">支持 4</td>
          <td class="hl_4">不支持 5</td>
          <td class="hl_4">不支持 5</td>
        </tr>
        <tr>
          <th>left</th>
          <td class="hl_2">支持 3</td>
          <td class="hl_2">支持 1</td>
          <td class="hl_2">支持 3</td>
          <td class="hl_2">支持 4</td>
          <td class="hl_2">支持 4</td>
          <td class="hl_4">不支持 5</td>
          <td class="hl_4">不支持 5</td>
        </tr>
        <tr>
          <th>width</th>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_4">不支持 6</td>
          <td class="hl_2">支持</td>
        </tr>
        <tr>
          <th>height</th>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_4">不支持 6</td>
          <td class="hl_2">支持</td>
        </tr>
        <tr>
          <th>top  left</th>
          <td class="hl_2">支持 3</td>
          <td class="hl_2">支持 4</td>
          <td class="hl_2">支持 3</td>
          <td class="hl_2">支持 4</td>
          <td class="hl_2">支持 4</td>
          <td class="hl_4">不支持 5</td>
          <td class="hl_4">不支持 5</td>
        </tr>
        <tr>
          <th>width  height</th>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持 4</td>
          <td class="hl_2">支持 1</td>
          <td class="hl_2">支持</td>
        </tr>
        <tr>
          <th>top  left  width  height</th>
          <td class="hl_2">支持</td>
          <td class="hl_2">支持 4</td>
          <td class="hl_2">支持 3</td>
          <td class="hl_2">支持 4</td>
          <td class="hl_2">支持 4</td>
          <td class="hl_2">支持 3</td>
          <td class="hl_2">支持 ^4]</td>
        </tr>
</tbody>
</table>

1. 【标注1】：IE7 IE8 Firefox Chrome Safari 中，当 "menubar" 选项为 "yes" 时，默认不显示菜单栏，需要按 ALT 键后菜单栏才可显示；相反当 "menubar" 选项为 "no" 时，即使按了 ALT 键也不会显示菜单栏。
2. 【标注2】：Safari 中，开启 "location" 选项与开启 "toolbar" 选项时显示效果一致。
3. 【标注3】：IE6 IE8 Chrome 中，使用 "top" 和 "left" 定位，如果出现设定的的坐标值过大，弹出窗口将可能显示在屏幕可视范围外。
4. 【标注4】：IE7 Firefox Safari Opera 中，使用 "top" 和 "left" 定位，如果出现设定的的坐标值过大，窗口会自动调整 "top" 与 "left" 值，确保窗口正常显示在屏幕可视区域内。
5. 【标注5】：Chrome Opera 中，不支持在没有设定 "width" 与 "height" 值的情况下独立使用 "left" 和 "top"，此时 "left" "top" 设定值均不生效。
6. 【标注6】：Chrome 中，不支持在没有设定 "left" 和 "height" 值的情况下独立使用 "width" 与 "height"，此时 "width" "height" 设定值均不生效。结合【标注5】说明可知，在 Chrome 中弹出窗口不论想要设定宽高或位置中的一个或几个值，都必须将他们全部赋值，否则都将不起作用。
7. 【标注7】：Firefox Chrome 中，地址栏会始终显示。
8. 【标注8】：Opera 中，地址栏默认不显示，但可以点击页面最上方横条使他显示出来，设置 "location=yes" 后地址栏会自动显示出来。
9. 【标注9】：Chrome Opera 中，不论 "menubar" 值如何设置，永远不显示菜单栏。
10. 【标注10】：Firefox Safari Chrome Opera 中，无论 "resizable"值如何设置，窗口永远可由用户调整大小。
11. 【标注11】：Safari Chrome 中，在页面存在滚动条的情况下，无论 "scrollbars"值如何设置，滚动条始终可见。
12. 【标注12】：IE7 在 Windows XP SP3 系统中默认可以支持  "status " 参数隐藏状态栏；而在 Windows Vista 系统默认环境下不支持  "status " 参数，状态栏始终可见。这与两个系统中默认的 IE7 小版本号不同有关，前者版本号较低，后者版本号较高。
13. 【标注13】：Firefox 中，无论 "status" 值如何设置，状态栏始终可见，而 Chrome Opera 中，则与前者相反，状态栏始终不可见。
14. 【标注14】： Chrome Opera 中，无论 "toolbar" 值如何设置，始终不显示工具栏。

- window.close()

关闭窗体。为了保证安全，关闭由自身窗口打开的子窗口时没有确认对话框，但是要关闭其他窗口时会弹出请求确认的对话框。

- window.closed

检查窗体是否已被关闭，返回 True 或 False。

- window.status
- window.defaultStatus

status 是显示在状态栏上的内容。defaultStatus 是状态栏上没其他需要显示的内容的时候，显示的默认内容。要在 onMouseOver 等事件里改写状态栏的内容时，需要在此句柄的处理中返回 true。

- window.clientInformation

与 window.navigator 相同。

- window.execScript(code [, lang])

把 code 中的内容当作 JScript 代码来执行。要当作 JavaScript 执行需要在 lang 中指定 "JavaScript"。window.execScript 方法不是所有浏览器都支持，需谨慎使用。若需要在其他不支持 window.execScript 方法的浏览器中达到类似的效果，可以使用 window.eval 方法。

- window.showHelp(url [, id [, opt]])

显示 HTML 帮助文档。

## Navigator

- window.navigator

代表正在使用的浏览器的对象。

- window.navigator.appCodeName

返回浏览器的代码名。"Mozilla" 本来是 Netscape Navigator 的开发代码（语源是怪兽哥斯拉），考虑到为 Mozilla 制作的网页的兼容性，Internet Explorer 的返回值也是 "Mozilla"。

- window.navigator.appName

返回代表浏览器名的字符串。

- window.navigator.userAgent

userAgent 返回代表浏览器名和版本号的字符串。

<table border="1" cellspacing="0" cellpadding="2" class="p" width="85%">
<tbody><tr class="h"><th>浏览器</th><th>值</th></tr>
<tr><td>IE7.0(Win)</td><td>Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; InfoPath.3) </td></tr>
<tr><td>Chrome16.0(Win)</td><td>Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7</td></tr>
</tbody></table>

- window.navigator.platform

返回浏览器平台的字符串（"Win32", "Win16", "WinCE", "Mac68k", "MacPPC", "HP-UX", "SunOS" 等）。

- window.navigator.cpuClass

返回CPU的信息（"x86", "68K", "Alpha", "PPC" 等）。仅IE有效。

- window.navigator.browserLanguage

- window.navigator.systemLanguage

- window.navigator.userLanguage

language、browserLanguage 返回浏览器的语言种类，systemLanguage 返回系统的语言种类，userLanguage 返回用户环境的语言种类。仅IE有效。

- window.navigator.cookieEnabled

返回 cookie 是否可用的真伪值。

- window.navigator.onLine

返回是否能连上网络的真伪值。

- window.navigator.javaEnabled()

返回 Java 是否可用的真伪值。

- window.navigator.userProfile

保存着用户信息的对象。拥有 addReadRequest() doReadRequest() getAttribute() clearRequest() 等方法。

- window.navigator.taintEnabled()

是否可以加密数据的真伪值。仅IE有效。

## Element

- window.document.all.id（IE专用）
- window.document.all(n)（IE专用）
- window.document.all.length（IE专用）

文档中元素的数组。id 为各元素的 ID 属性所指定的ID。

```js
obj = document.all.ABC;
for (i = 0; i < document.all.length; i++) {
    obj = document.all(i);
}
```

- window.document.all.item(id)（IE专用）
- window.document.all.item(id, n)（IE专用）
- window.document.all.item(id).length（IE专用）

文档中的元素或元素的数组。id 为各元素的 ID 属性所指定的ID。请注意，对象元素可为复数或单数，调用的方法也不同。

```js
obj = document.all.item("ABC");
if (document.all.item(id).length) {
   for (i = 0; i < document.all.item(id).length; i++) {
      obj = document.all.item(id, i);
   }
} else {
   obj = document.all.item(id);
}
```

- window.document.all.tags(tag)（IE专用）
- window.document.all.tags(tag)(n)（IE专用）
- window.document.all.tags(tag).length（IE专用）

文档中元素的数组。tag 为标签名。

```js
for (i = 0; i < document.all.tags("IMG").length; i++) {
    obj = document.all.tags("IMG")(i);
}
```

- element.style（IE专用）

代表 style 对象。下面的例子改变文档中所有 H1 元素的颜色。

```js
for (i = 0; i < document.all.tags("H1").length; i++) {
   elm = document.all.tags("H1")(i);
   elm.style.color = "#FF0000";
}
```

- element.innerHTML（IE专用）
- element.innerText（IE专用）

此元素中的字符串或HTML代码。把值代入的话，可以动态改变元素的内容。

```html
<script type="text/javascript">
<!--
function func() {
    document.all.ABC.innerHTML = "<b>欢迎光临猴子web入门。</b>";
}
// -->
</script>
<div id="ABC">再见。</div>
<button onclick="func()">OK</button>
```

- element.tagName（IE专用）
- element.title（IE专用）
- element.className（IE专用）
- element.id（IE专用）
- element.lang（IE专用）
- element.language（IE专用）

tagName 为标签名，title、className、id、lang、language 各自对应 title、class、id、lang、language 属性的值。

- element.parentElement（IE专用）

代表上一层的父元素。

- element.click()（IE专用）

代表鼠标点击了元素。

## 文档对象模型（DOM）

DOM 是 Document Object Model 的缩写。是一组 W3C 在 1998 年推荐的用来控制 HTML 和 XML 中各元素的接口。核心层并没有依存特定的语言，比较流行的是与 JavaScript 等语言互通。DOM 从 IE5.0 开始被支持。这里主要介绍一些 JavaScript DOM的基本操作。

### 访问某一元素

- document.getElementById(id)
- document.getElementsByTagName(tagName)
- document.getElementsByName(name)
- element.childNodes
- element.parentNode
- element.firstChild
- element.lastChild
- element.previousSibling
- element.nextSibling

```js
oElements = oElement.childNodes;         // 子元素数组
oElement = oElement.parentNode;          // 父元素
oElement = oElement.firstChild;          // 第一个子元素
oElement = oElement.lastChild;           // 最后一个子元素
oElement = oElement.previousSibling;     // 上一个同级元素
oElement = oElement.nextSibling;         // 下一个同级元素
```

### 从元素数组中取出元素

```js
languagen = oElements.length;
oElement = oElements[0];
oElement = oElements(0);
oElement = oElements.id1;
oElement = oElements.item(0);
oElement = oElements.item("id1");
oElement = oElements.namedItem("id1");
oElements = oElements.tags("span");
```

### 访问元素内的文字

```js
sStr = oElement.firstChild.nodeValue;
sStr = oElement.innerText;
sStr = oElement.innerHTML;
```

### 访问与设定属性

```js
value = oElement.id;
value = oElement.getAttribute("ID");
value = oElement.getAttributeNode("ID").value;
value = oElement.getAttributeNode("ID").nodeValue;
value = oElement.attributes.getNamedItem("ID").value;
value = oElement.attributes.getNamedItem("ID").nodeValue;
```

### 设定元素的属性值

```js
oElement.id = value;
oElement.setAttribute("ID", value);
oElement.getAttributeNode("ID").value = value;
oElement.getAttributeNode("ID").nodeValue = value;
oElement.attributes.getNamedItem("ID").value = value;
oElement.attributes.getNamedItem("ID").nodeValue = value;
oElement.setAttributeNode(oAttr);
```

### 生成新元素

- createElement(tagName)
- appendChild(element)

## 表单（Form）

- window.document.forms
- window.document.forms.length
- window.document.form
- window.document.form.action
- window.document.form.encoding
- window.document.form.method
- window.document.form.name
- window.document.form.target
- window.document.form.submit()
- window.document.form.reset()
- window.document.form.elements
- window.document.form.elements.length
- window.document.form.element
- window.document.form.element.name
- window.document.form.element.type
- window.document.form.element.form
- window.document.form.element.value
- window.document.form.element.focus()
- window.document.form.element.blur()
- window.document.form.text.defaultValue
- window.document.form.text.select()
- window.document.form.checkbox.defaultChecked
- window.document.form.checkbox.checked
- window.document.form.checkbox.click()
- window.document.form.select.selectedIndex
- window.document.form.select.length
- window.document.form.select.options
- window.document.form.select.options[n]
- window.document.form.select.options.length
- window.document.form.select.option.defaultSelected
- window.document.form.select.option.selected
- window.document.form.select.option.text
- window.document.form.select.option.value

## 文档对象（Document）

- window.document
- document.bgColor
- document.fgColor
- document.linkColor
- document.alinkColor
- document.vlinkColor

标签里指定的背景色（bgcolor）、文字的颜色（text）、链接文字的颜色（link）、正被点击的链接文字的颜色（alink）、已经浏览过的链接文字的颜色（vlink）等相对应的字符串。代入值就可以动态改变各种颜色。

- document.open([mimeType [, replace]])

可打开文档并写入内容。和 window.open() 不是一个东西。

```js
top.main.document.open();
top.main.document.write("<html>\n");
top.main.document.write("<head><title>测试</title></head>\n");
top.main.document.write("<body>测试文本</body>\n");
top.main.document.write("</html>\n");
top.main.document.close();
```

- document.write(msg [, msg...])
- document.writeln(msg [, msg...])

在指定的文档中写入字符串等值。写入完毕后如果不使用 document.close() 关闭的话，有可能最后一行不会显示。writeln() 和 write() 的区别是，writeln()会在最后输入换行符。在一般的 HTML 里，换行符会变成一个空格，但是在 `<pre>～</pre>` 等标签里则能换行。

```js
document.writeln("<pre>");
document.writeln("AAA");
document.writeln("BBB");
document.writeln("</pre>");
```

- document.close()

关闭向文档的写入。忘了使用这个的话，用 write() 和 writeln() 写入文档的内容有可能不会显示。

- document.clear()（IE专用）

清空文档的内容。

- document.lastModified

返回此文档的最后更新时间。不同浏览器以及不同版本间，返回的字符串都各不相同，使用的时候要当心。

- document.referrer

返回一个URL，表示是哪个页面跳转到当前页面的。有可能因浏览器的安全性而无法表示。

```js
if (document.referrer) {
    document.write("您是由");
    document.write(document.referrer);
    document.write("跳转过来的。");
}
```

- document.URL
- document.domain

返回当前文档的地址（URL）和域名（domain）部分。

- document.title

返回由 `<title>` 指定的文档标题的字符串。

- document.charset（IE专用）
- document.defaultCharset（IE专用）

返回此文档的charset。

- document.readyState（IE专用）

返回 "uninitialized", "loading", "interactive", "complete" 这四个字符串中的一个来表示当前的下载状态。

- document.all（IE专用）

代表此文档中的所有元素。

- document.activeElement（IE专用）

返回现在获得焦点的元素。

- document.elementFromPoint(x, y)（IE专用）

返回 x, y 坐标的元素。

- document.createElement(tag)（IE专用）

新建一个元素对象。新建的对象可用 add() 或 appendChild() 显示到画面上。

```html
<script type="text/javascript">
function func() {
  elm = document.createElement("OPTION");
  elm.text = "CCC";
  document.F1.S1.add(elm);
}
</script>
<form name="F1" action="#">
<select name="S1" size=5>
<option>AAA
<option>BBB
</select>
<input type="button" onclick="func()" value="Add">
</form>
```

- document.cookie

此文档的cookie。

- document.parentWindow（IE专用）

此文档的父窗口的对象。

- document.embeds

`<embed>`对应的嵌入对象的数组。

- document.selection（IE专用）
- document.selection.type（IE专用）
- document.selection.clear()（IE专用）
- document.selection.empty()（IE专用）
- document.selection.createRange()（IE专用）


表示现在选中的字符串的对象。

```js
xx = document.selection.createRange();
alert(xx.text);
```

- document.createStyleSheet([URL [, index]])（IE专用）

在此文档中使用其他文件里记述的样式表代码。URL 指定外部样式表文件的地址（URL），index 指定 styleSheets 对象列表上的索引。

```html
<input type="button" value="夏天的样式"
 onclick="document.createStyleSheet('summer.css')">
```

- document.showHelp(URL [, content])（IE专用）

显示帮助文档。只有 Microsoft HTML Help 能使用。

- window.location

保持着关于当前地址（URL）的信息的对象。

- window.location.protocol
- window.location.host
- window.location.hostname
- window.location.port
- window.location.pathname
- window.location.search
- window.location.hash
- window.location.href
- window.location.assign(url)（仅限IE）
- window.location.replace(url)
- window.location.reload([force])


重新显示页面。force 设置为 true 时，强制性重新显示页面。

- window.history

上一页、上上一页等，保存和控制窗体历史记录的对象。

- window.history.length

返回历史记录的个数。

- window.history.back()
- window.history.forward()
- window.history.go(n)

back() 返回上一页，forward() 前进到后一页，go(n) 跳转到第 n 个网页。n 可以指定负数。

### language属性

以前可以使用language属性指定所用JavaScript的版本。下面的代码可以指定只有支持JavaScript 1.2的浏览器才能运行JavaScript代码。

<table border="1" cellspacing="0" cellpadding="2">
<tbody><tr class="h">
<th rowspan="2"><br></th>
<th colspan="4">IE</th>
<th colspan="5">Netscape</th>
</tr>
<tr class="h">
<th>2.*</th><th>3.*</th><th>4.*</th><th>5.*</th>
<th>2.*</th><th>3.*</th><th>4.0<div>～</div>4.05</th><th>4.06<div>～</div>4.7</th><th>6.0</th>
</tr>
<tr align="center">
<th class="h">JavaScript</th>
<td>×</td><td>○</td><td>○</td><td>○</td>
<td>○</td><td>○</td><td>○</td><td>○</td><td>○</td>
</tr>
<tr align="center">
<th class="h">JavaScript1.0</th>
<td>×</td><td>×</td><td>×</td><td>×</td>
<td>×</td><td>×</td><td>×</td><td>×</td><td>×</td>
</tr>
<tr align="center">
<th class="h">JavaScript1.1</th>
<td>×</td><td>×</td><td>○</td><td>○</td>
<td>×</td><td>○</td><td>○</td><td>○</td><td>○</td>
</tr>
<tr align="center">
<th class="h">JavaScript1.2</th>
<td>×</td><td>×</td><td>○</td><td>○</td>
<td>×</td><td>×</td><td>○</td><td>○</td><td>○</td>
</tr>
<tr align="center">
<th class="h">JavaScript1.3</th>
<td>×</td><td>×</td><td>×</td><td>○</td>
<td>×</td><td>×</td><td>×</td><td>○</td><td>○</td>
</tr>
<tr align="center">
<th class="h">JavaScript1.4</th>
<td>×</td><td>×</td><td>×</td><td>×</td>
<td>×</td><td>×</td><td>×</td><td>×</td><td>○</td>
</tr>
<tr align="center">
<th class="h">JavaScript1.5</th>
<td>×</td><td>×</td><td>×</td><td>×</td>
<td>×</td><td>×</td><td>×</td><td>×</td><td>○</td>
</tr>
<tr align="center">
<th class="h">JScript</th>
<td>×</td><td>○</td><td>○</td><td>○</td>
<td>×</td><td>×</td><td>×</td><td>×</td><td>×</td>
</tr>
</tbody></table>

language属性在HTML4.01里已经被废弃，HTML4.01使用type属性。

## 对象

```html
□ 对象（Object）
├□ 数值（Number）
├□ 字符串（String）
├□ 布尔值（Boolean）
├□ 数组（Array）
├□ 数学函数（Math）
├□ 日期（Date）
├□ 函数（Function）
├□ 正则表达式（RegExp）
└□ 窗口（Window）
　├□ 浏览器（Navigator）
　│├□ 插件（Plugin）
　│└□ MIME类型（MimeType）
　├□ 框架（Frame）
　├□ 事件（Event）
　├□ 履历（History）
　├□ 本地化（Location）
　├□ 屏幕信息（Screen）
　└□ 文档（Document）
　　├□ 层（Layer）
　　├□ 图像（Image）
　　├□ 链接（Link）
　　├□ 锚（Anchor）
　　├□ 小程序（Applet）
　　├□ 表单（Form）
　　│├□ 文本（Text）
　　│├□ 密码（Password）
　　│├□ 文件上传（File）
　　│├□ 隐藏元素（Hidden）
　　│├□ 文本领域（Textarea）
　　│├□ 复选框（Checkbox）
　　│├□ 单选框（Radio）
　　│├□ 按钮（Button）
　　│├□ 提交按钮（Submit）
　　│├□ 重置按钮（Reset）
　　│└□ 下拉列表（Select）
　　│　└□ 条目（Option）
　　└□ 元素（Elements）
　　　└□ 样式（Style）
```
