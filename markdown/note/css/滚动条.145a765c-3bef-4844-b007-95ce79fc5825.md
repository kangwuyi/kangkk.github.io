# webkit滚动条伪属性

<!-- toc -->

## scrollbar

> WebKit now supports styling of the scrollbars in overflow sections, listboxes, dropdown menus and textareas. [^^webkit_scrollbars_website_desc]

[^^webkit_scrollbars_website_desc]:[Styling Scrollbars](https://webkit.org/blog/363/styling-scrollbars/)，webkit浏览器内核相关于滚动条样式的文章。

源于浏览器厂商的各自为政，所以直至目前为止兼容所有浏览器的滚动条样式尚不存在，CSS3的推广使这种状况有所缓减，但有什么用呢\(。・\`ω´・\)。webkit支持相关的`|&#58;&#58;-webkit-scrollbar`等伪类，可以替换webkit默认的滚动条样式从而进行自定义样式渲染，我先假定一个`红橙黄绿青蓝紫`的颜色配色方案来区分滚动条的组成部分。

|伪类+伪元素|背景颜色|
| --- | --- |
|&#58;&#58;-webkit-scrollbar|<span style="color:Black">████</span> Black|
|&#58;&#58;-webkit-scrollbar-button:start:decrement|<span style="color:Red">████</span> Red|
|&#58;&#58;-webkit-scrollbar-button:vertical:start:increment|<span style="color:Orange">████</span> Orange|
|&#58;&#58;-webkit-scrollbar-track-piece:vertical:start|<span style="color:Yellow">████</span> Yellow|
|&#58;&#58;-webkit-scrollbar-thumb:vertical|<span style="color:Green">████</span> Green|
|&#58;&#58;-webkit-scrollbar-track-piece:vertical:end|<span style="color:Lime">████</span> Lime|
|&#58;&#58;-webkit-scrollbar-button:vertical:end:decrement|<span style="color:Navy">████</span> Navy|
|&#58;&#58;-webkit-scrollbar-button:end:increment|<span style="color:Purple">████</span> Purple|
|&#58;&#58;-webkit-scrollbar-track|<span style="color:Fuchsia">████</span> Fuchsia|
|&#58;&#58;-webkit-scrollbar-corner|<span style="color:Gray">████</span> Gray|
|&#58;&#58;-webkit-resizer|<span style="color:Maroon">████</span> Maroon|
具体实现如下：

<iframe width="100%" height="300" src="https://jsfiddle.net/kahn1990/n1awL5ac/4/embedded/html,css,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

可以看到整个滚动条拥有一个黑色的滚动条背景，在此基础上又在上一层粘附滚动按钮和轨道，再细分即按钮碎片和滚到碎片、滑块等。

## scrollbar基本伪类

|伪类|描述|
| --- | --- |
|&#58;&#58;-webkit-scrollbar|滚动条整体|
|&#58;&#58;-webkit-scrollbar-button|滚动条两端按钮|
|&#58;&#58;-webkit-scrollbar-track|外层轨道|
|&#58;&#58;-webkit-scrollbar-track-piece|内层轨道|
|&#58;&#58;-webkit-scrollbar-thumb|拖动条|
|&#58;&#58;-webkit-scrollbar-corner|边角|
|&#58;&#58;-webkit-resizer|定义右下角拖动块的样式|

![滚动条样式](../../../static/img/滚动条/2.png)

___图片源于[css-tricks](https://css-tricks.com/)网站内`CHRIS COYIER`的文章[Custom Scrollbars in WebKit](https://css-tricks.com/custom-scrollbars-in-webkit/)，略有修改。___

<iframe name="archives" src="../static/iframe/滚动条/3.html" frameborder="0" height="380px"></iframe>

这个实例源于[trac webkit](https://trac.webkit.org)网站的[Dave Hyatt](https://twitter.com/hyatt_dave)在2009年写的一个官方示例[^^overflow_scrollbar_combinations_desc]，额距今大约7年前。。。

[^^overflow_scrollbar_combinations_desc]:[overflow scrollbar combinations](http://trac.webkit.org/export/41842/trunk/LayoutTests/scrollbars/overflow-scrollbar-combinations.html)

CSS3标准新增了一些其他伪类，关于这些可以参考[Selectors Level 3](https://www.w3.org/TR/selectors/#pseudo-elements)。

### 简单样式

```css
::-webkit-scrollbar {
    width: 16px;
    height: 16px;
}
::-webkit-scrollbar-button:start:decrement,
::-webkit-scrollbar-button:end:increment {
    display: block;
}
::-webkit-scrollbar-button:vertical:start:increment, ::-webkit-scrollbar-button:vertical:end:decrement {
    display: none;
}
::-webkit-scrollbar-button:end:increment {
    background-image: url(../images/scroll_cntrl_dwn.png);
}
::-webkit-scrollbar-button:start:decrement {
    background-image: url(../images/scroll_cntrl_up.png);
}
::-webkit-scrollbar-track-piece:vertical:start {
    background-image: url(../images/scroll_gutter_top.png), url(../images/scroll_gutter_mid.png);
    background-repeat: no-repeat, repeat-y;
}
::-webkit-scrollbar-track-piece:vertical:end {
    background-image: url(../images/scroll_gutter_btm.png), url(../images/scroll_gutter_mid.png);
    background-repeat: no-repeat, repeat-y;
    background-position: bottom left, 0 0;
}
::-webkit-scrollbar-thumb:vertical {
    height: 56px;
    -webkit-border-image: url(../images/scroll_thumb.png) 8 0 8 0 stretch stretch;
    border-width: 8 0 8 0;
}
```

根据伪类重定义样式，参考于[almaer](http://almaer.com/)：

<iframe name="archives" src="../static/iframe/滚动条/2.html" frameborder="0"></iframe>


## 伪元素

|伪元素|中文描述|英文描述|
| --- | --- | --- |
|:horizontal|横向滚动条|The horizontal pseudo-class applies to any scrollbar pieces that have a horizontal orientation|
|:vertical|竖向滚动条|The vertical pseudo-class applies to any scrollbar pieces that have a vertical orientation|
|:decrement|具有向下箭头或向右箭头按钮的滚动条)|The decrement pseudo-class applies to buttons and track pieces. It indicates whether or not the button or track piece will decrement the view’s position when used (e.g., up on a vertical scrollbar, left on a horizontal scrollbar)|
|:increment|具有向上箭头或向左箭头按钮的滚动条)|The increment pseudo-class applies to buttons and track pieces. It indicates whether or not a button or track piece will increment the view’s position when used (e.g., down on a vertical scrollbar, right on a horizontal scrollbar)|
|:start|部件在滑道前方的滚动条|The start pseudo-class applies to buttons and track pieces. It indicates whether the object is placed before the thumb|
|:end|部件在滑道后方的滚动条|The end pseudo-class applies to buttons and track pieces. It indicates whether the object is placed after the thumb|
|:double-button|在滑道两端同时具有上下箭头按钮|The double-button pseudo-class applies to buttons and track pieces. It is used to detect whether a button is part of a pair of buttons that are together at the same end of a scrollbar. For track pieces it indicates whether the track piece abuts a pair of buttons|
|:single-button|在滑道两端只有单个箭头按钮的滚动条|The single-button pseudo-class applies to buttons and track pieces. It is used to detect whether a button is by itself at the end of a scrollbar. For track pieces it indicates whether the track piece abuts a singleton button|
|:no-button|滑道两端没有箭头按钮的滚动条|Applies to track pieces and indicates whether or not the track piece runs to the edge of the scrollbar, i.e., there is no button at that end of the track|
|:corner-present|横竖交点存在一个公共角落的滚动条|Applies to all scrollbar pieces and indicates whether or not a scrollbar corner is present|
|:window-inactive|当前窗口处于未激活状态的滚动条|Applies to all scrollbar pieces and indicates whether or not the window containing the scrollbar is currently active. (In recent nightlies, this pseudo-class now applies to ::selection as well. We plan to extend it to work with any content and to propose it as a new standard pseudo-class.)|
|:enabled| - | -
|:disabled| - | - |
|:hover| - | - |
|:active| - | - |

这里我对美学意义上的作图功力尚浅（画的图惨不忍睹。。），所以直接安利了一张[jQuery custom content scroller](http://manos.malihu.gr/jquery-custom-content-scroller/)官网[^^malihu_custom_scrollbar_plugin_desc]里的关于浏览器`scrollbar`的图片，先把坑位占上再慢慢填图。

[^^malihu_custom_scrollbar_plugin_desc]:[malihu custom scrollbar plugin](https://github.com/malihu/malihu-custom-scrollbar-plugin)是[Manos](http://manos.malihu.gr)开发的一款流行[Jquery](http://jquery.com/)插件，并jQuery UI，可以通过灵活的通过 CSS 定义你的滚动条。同时可以定义垂直的和水平的滚动条，而且通过[malihu custom scrollbar plugin](https://github.com/malihu/malihu-custom-scrollbar-plugin)提供了鼠标滚动的支持，滚动的过程中，还可以缓冲滚动使得滚动更加的平滑。可以自动调整滚动条的位置并且可以定义滚动到的位置等，下载地址[uibox malihu-custom-scrollbar-plugin](http://www.uibox.in/item/163)。

![scrollbar](../../../static/img/滚动条/1.png)


这些样式里或多或少都用到了一些伪元素：

<iframe name="archives" src="../static/iframe/滚动条/1.html" frameborder="0" height="230px"></iframe>


## IE滚动条

|类名|描述|
| --- | --- |
|scrollbar-arrow-color|三角箭头的颜色|
|scrollbar-face-color|立体滚动条的颜色，包括箭头部分的背景色|
|scrollbar-3dlight-color|立体滚动条亮边的颜色|
|scrollbar-highlight-color|滚动条的高亮颜色|
|scrollbar-shadow-color|立体滚动条阴影的颜色|
|scrollbar-darkshadow-color|立体滚动条外阴影的颜色|
|scrollbar-track-color|立体滚动条背景颜色|
|scrollbar-base-color|滚动条的基色|

关于这些类，我找到一个很好玩得flash动态的展示它们的作用。

<iframe name="archives" src="../static/iframe/滚动条/4.html" frameborder="0" height="240px"></iframe>

## scroll事件

[scroll and mousewheel](http://www.quirksmode.org/dom/events/scroll.html)

(未完待续)
