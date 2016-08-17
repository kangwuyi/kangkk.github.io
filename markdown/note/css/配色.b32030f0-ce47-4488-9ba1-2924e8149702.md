# 配色
<!-- toc -->

## 基本的16色

仅以下16种颜色的英文名称可以被[w3c](https://www.w3.org/)的[HTML 4.01 Specification](https://www.w3.org/TR/html4/)标准支持，详见[Basic HTML data types:Colors](https://www.w3.org/TR/html4/types.html#h-6.5)。

> The attribute value type "color" ([%Color;](https://www.w3.org/TR/html4/sgml/loosedtd.html#Color)) refers to color definitions as
specified in [SRGB](https://www.w3.org/TR/html4/references.html#ref-SRGB). A color value may either be a hexadecimal number
(prefixed by a hash mark) or one of the following sixteen color names. The
color names are [case-insensitive](https://www.w3.org/TR/html4/types.html#case-insensitive).</a></span>

| | | | |
| --- | --- | --- | --- |
| <span style="color:#000000">██ </span> Black (#000000)| <span style="color:#808080">██ </span> Gray (#808080)| <span style="color:#C0C0C0">██ </span> Silver (#C0C0C0)| <span style="color:#FFFFFF">██ </span> White (#FFFFFF)|
| <span style="color:#FF0000">██ </span> Red (#FF0000)| <span style="color:#FFFF00">██ </span> Yellow (#FFFF00)| <span style="color:#00FF00">██ </span> Lime (#00FF00)| <span style="color:#00FFFF">██ </span> Aqua (#00FFFF)|
| <span style="color:#0000FF">██ </span> Blue (#0000FF)| <span style="color:#FF00FF">██ </span> Fuchsia (#FF00FF)| <span style="color:#800000">██ </span> Maroon (#800000)| <span style="color:#808000">██ </span> Olive (#808000)|
| <span style="color:#008000">██ </span> Green (#008000)| <span style="color:#008080">██ </span> Teal (#008080)| <span style="color:#000080">██ </span> Navy (#000080)| <span style="color:#800080">██ </span> Purple (#800080)|

## 基本的17色

基本的16色是指[HTML 4.01 Specification](https://www.w3.org/TR/html4/)标准支持的16个颜色名，但在[CSS2.1](https://www.w3.org/TR/CSS21/)中，规范的是17个颜色名，与16色相比多出来了一个橙色（orange），详见[Syntax and basic data typess:Colors](https://www.w3.org/TR/CSS21/syndata.html#color-units)

| |
| --- |
| <span style="color:#ffA500">██ </span> Orange (#ffA500)|

## WEB安全色

browser-safe palette, Netscape palette, 216 palette, Web palette, and/or 6x6x6 color cube

web安全色是指在不同的平台下显示效果一致的颜色。在256色里有40种颜色在Macintosh和Windows里显示的效果不一样，所以能安全使用的只有216色。

在《CSS权威指南》中第四章“值和单位”（第90页：Web安全颜色）中阐述：

> 所谓“Web安全”颜色是指，在256色计算机系统上总能避免抖动的颜色。

### 抖动

在前几年里，当大多数计算机受显存大小的限制，一般只有4位~16位的颜色存储空间并只支持256种颜色时，提出了抖动（[dithering](https://en.wikipedia.org/wiki/Dither)）的技术。

![dithering color](../../../static/img/配色/1.gif)

参考：

- http://www.allfreebackgrounds.com/color_3.html
- http://caca.zoy.org/study/part6.html
- http://www.htmlgoodies.com/tutorials/colors/article.php/3479001
- http://whatis.techtarget.com/definition/dithering


### WEB安全色预览

| | | | | | |
| --- | --- | --- | --- |--- |--- |
| <span style="color:#000000">██ </span>#000000 | <span style="color:#000033">██ </span>#000033 | <span style="color:#000066">██ </span>#000066 | <span style="color:#000099">██ </span>#000099 | <span style="color:#0000CC">██ </span>#0000CC | <span style="color:#0000FF">██ </span>#0000FF |
| <span style="color:#003300">██ </span>#003300 | <span style="color:#003333">██ </span>#003333 | <span style="color:#003366">██ </span>#003366 | <span style="color:#003399">██ </span>#003399 | <span style="color:#0033CC">██ </span>#0033CC | <span style="color:#0033FF">██ </span>#0033FF |
| <span style="color:#006600">██ </span>#006600 | <span style="color:#006633">██ </span>#006633 | <span style="color:#006666">██ </span>#006666 | <span style="color:#006699">██ </span>#006699 | <span style="color:#0066CC">██ </span>#0066CC | <span style="color:#0066FF">██ </span>#0066FF |
| <span style="color:#009900">██ </span>#009900 | <span style="color:#009933">██ </span>#009933 | <span style="color:#009966">██ </span>#009966 | <span style="color:#009999">██ </span>#009999 | <span style="color:#0099CC">██ </span>#0099CC | <span style="color:#0099FF">██ </span>#0099FF |
| <span style="color:#00CC00">██ </span>#00CC00 | <span style="color:#00CC33">██ </span>#00CC33 | <span style="color:#00CC66">██ </span>#00CC66 | <span style="color:#00CC99">██ </span>#00CC99 | <span style="color:#00CCCC">██ </span>#00CCCC | <span style="color:#00CCFF">██ </span>#00CCFF |
| <span style="color:#00FF00">██ </span>#00FF00 | <span style="color:#00FF33">██ </span>#00FF33 | <span style="color:#00FF66">██ </span>#00FF66 | <span style="color:#00FF99">██ </span>#00FF99 | <span style="color:#00FFCC">██ </span>#00FFCC | <span style="color:#00FFFF">██ </span>#00FFFF |
| <span style="color:#330000">██ </span>#330000 | <span style="color:#330033">██ </span>#330033 | <span style="color:#330066">██ </span>#330066 | <span style="color:#330099">██ </span>#330099 | <span style="color:#3300CC">██ </span>#3300CC | <span style="color:#3300FF">██ </span>#3300FF |
| <span style="color:#333300">██ </span>#333300 | <span style="color:#333333">██ </span>#333333 | <span style="color:#333366">██ </span>#333366 | <span style="color:#333399">██ </span>#333399 | <span style="color:#3333CC">██ </span>#3333CC | <span style="color:#3333FF">██ </span>#3333FF |
| <span style="color:#336600">██ </span>#336600 | <span style="color:#336633">██ </span>#336633 | <span style="color:#336666">██ </span>#336666 | <span style="color:#336699">██ </span>#336699 | <span style="color:#3366CC">██ </span>#3366CC | <span style="color:#3366FF">██ </span>#3366FF |
| <span style="color:#339900">██ </span>#339900 | <span style="color:#339933">██ </span>#339933 | <span style="color:#339966">██ </span>#339966 | <span style="color:#339999">██ </span>#339999 | <span style="color:#3399CC">██ </span>#3399CC | <span style="color:#3399FF">██ </span>#3399FF |
| <span style="color:#33CC00">██ </span>#33CC00 | <span style="color:#33CC33">██ </span>#33CC33 | <span style="color:#33CC66">██ </span>#33CC66 | <span style="color:#33CC99">██ </span>#33CC99 | <span style="color:#33CCCC">██ </span>#33CCCC | <span style="color:#33CCFF">██ </span>#33CCFF |
| <span style="color:#33FF00">██ </span>#33FF00 | <span style="color:#33FF33">██ </span>#33FF33 | <span style="color:#33FF66">██ </span>#33FF66 | <span style="color:#33FF99">██ </span>#33FF99 | <span style="color:#33FFCC">██ </span>#33FFCC | <span style="color:#33FFFF">██ </span>#33FFFF |
| <span style="color:#660000">██ </span>#660000 | <span style="color:#660033">██ </span>#660033 | <span style="color:#660066">██ </span>#660066 | <span style="color:#660099">██ </span>#660099 | <span style="color:#6600CC">██ </span>#6600CC | <span style="color:#6600FF">██ </span>#6600FF |
| <span style="color:#663300">██ </span>#663300 | <span style="color:#663333">██ </span>#663333 | <span style="color:#663366">██ </span>#663366 | <span style="color:#663399">██ </span>#663399 | <span style="color:#6633CC">██ </span>#6633CC | <span style="color:#6633FF">██ </span>#6633FF |
| <span style="color:#666600">██ </span>#666600 | <span style="color:#666633">██ </span>#666633 | <span style="color:#666666">██ </span>#666666 | <span style="color:#666699">██ </span>#666699 | <span style="color:#6666CC">██ </span>#6666CC | <span style="color:#6666FF">██ </span>#6666FF |
| <span style="color:#669900">██ </span>#669900 | <span style="color:#669933">██ </span>#669933 | <span style="color:#669966">██ </span>#669966 | <span style="color:#669999">██ </span>#669999 | <span style="color:#6699CC">██ </span>#6699CC | <span style="color:#6699FF">██ </span>#6699FF |
| <span style="color:#66CC00">██ </span>#66CC00 | <span style="color:#66CC33">██ </span>#66CC33 | <span style="color:#66CC66">██ </span>#66CC66 | <span style="color:#66CC99">██ </span>#66CC99 | <span style="color:#66CCCC">██ </span>#66CCCC | <span style="color:#66CCFF">██ </span>#66CCFF |
| <span style="color:#66FF00">██ </span>#66FF00 | <span style="color:#66FF33">██ </span>#66FF33 | <span style="color:#66FF66">██ </span>#66FF66 | <span style="color:#66FF99">██ </span>#66FF99 | <span style="color:#66FFCC">██ </span>#66FFCC | <span style="color:#66FFFF">██ </span>#66FFFF |
| <span style="color:#990000">██ </span>#990000 | <span style="color:#990033">██ </span>#990033 | <span style="color:#990066">██ </span>#990066 | <span style="color:#990099">██ </span>#990099 | <span style="color:#9900CC">██ </span>#9900CC | <span style="color:#9900FF">██ </span>#9900FF |
| <span style="color:#993300">██ </span>#993300 | <span style="color:#993333">██ </span>#993333 | <span style="color:#993366">██ </span>#993366 | <span style="color:#993399">██ </span>#993399 | <span style="color:#9933CC">██ </span>#9933CC | <span style="color:#9933FF">██ </span>#9933FF |
| <span style="color:#996600">██ </span>#996600 | <span style="color:#996633">██ </span>#996633 | <span style="color:#996666">██ </span>#996666 | <span style="color:#996699">██ </span>#996699 | <span style="color:#9966CC">██ </span>#9966CC | <span style="color:#9966FF">██ </span>#9966FF |
| <span style="color:#999900">██ </span>#999900 | <span style="color:#999933">██ </span>#999933 | <span style="color:#999966">██ </span>#999966 | <span style="color:#999999">██ </span>#999999 | <span style="color:#9999CC">██ </span>#9999CC | <span style="color:#9999FF">██ </span>#9999FF |
| <span style="color:#99CC00">██ </span>#99CC00 | <span style="color:#99CC33">██ </span>#99CC33 | <span style="color:#99CC66">██ </span>#99CC66 | <span style="color:#99CC99">██ </span>#99CC99 | <span style="color:#99CCCC">██ </span>#99CCCC | <span style="color:#99CCFF">██ </span>#99CCFF |
| <span style="color:#99FF00">██ </span>#99FF00 | <span style="color:#99FF33">██ </span>#99FF33 | <span style="color:#99FF66">██ </span>#99FF66 | <span style="color:#99FF99">██ </span>#99FF99 | <span style="color:#99FFCC">██ </span>#99FFCC | <span style="color:#99FFFF">██ </span>#99FFFF |
| <span style="color:#CC0000">██ </span>#CC0000 | <span style="color:#CC0033">██ </span>#CC0033 | <span style="color:#CC0066">██ </span>#CC0066 | <span style="color:#CC0099">██ </span>#CC0099 | <span style="color:#CC00CC">██ </span>#CC00CC | <span style="color:#CC00FF">██ </span>#CC00FF |
| <span style="color:#CC3300">██ </span>#CC3300 | <span style="color:#CC3333">██ </span>#CC3333 | <span style="color:#CC3366">██ </span>#CC3366 | <span style="color:#CC3399">██ </span>#CC3399 | <span style="color:#CC33CC">██ </span>#CC33CC | <span style="color:#CC33FF">██ </span>#CC33FF |
| <span style="color:#CC6600">██ </span>#CC6600 | <span style="color:#CC6633">██ </span>#CC6633 | <span style="color:#CC6666">██ </span>#CC6666 | <span style="color:#CC6699">██ </span>#CC6699 | <span style="color:#CC66CC">██ </span>#CC66CC | <span style="color:#CC66FF">██ </span>#CC66FF |
| <span style="color:#CC9900">██ </span>#CC9900 | <span style="color:#CC9933">██ </span>#CC9933 | <span style="color:#CC9966">██ </span>#CC9966 | <span style="color:#CC9999">██ </span>#CC9999 | <span style="color:#CC99CC">██ </span>#CC99CC | <span style="color:#CC99FF">██ </span>#CC99FF |
| <span style="color:#CCCC00">██ </span>#CCCC00 | <span style="color:#CCCC33">██ </span>#CCCC33 | <span style="color:#CCCC66">██ </span>#CCCC66 | <span style="color:#CCCC99">██ </span>#CCCC99 | <span style="color:#CCCCCC">██ </span>#CCCCCC | <span style="color:#CCCCFF">██ </span>#CCCCFF |
| <span style="color:#CCFF00">██ </span>#CCFF00 | <span style="color:#CCFF33">██ </span>#CCFF33 | <span style="color:#CCFF66">██ </span>#CCFF66 | <span style="color:#CCFF99">██ </span>#CCFF99 | <span style="color:#CCFFCC">██ </span>#CCFFCC | <span style="color:#CCFFFF">██ </span>#CCFFFF |
| <span style="color:#FF0000">██ </span>#FF0000 | <span style="color:#FF0033">██ </span>#FF0033 | <span style="color:#FF0066">██ </span>#FF0066 | <span style="color:#FF0099">██ </span>#FF0099 | <span style="color:#FF00CC">██ </span>#FF00CC | <span style="color:#FF00FF">██ </span>#FF00FF |
| <span style="color:#FF3300">██ </span>#FF3300 | <span style="color:#FF3333">██ </span>#FF3333 | <span style="color:#FF3366">██ </span>#FF3366 | <span style="color:#FF3399">██ </span>#FF3399 | <span style="color:#FF33CC">██ </span>#FF33CC | <span style="color:#FF33FF">██ </span>#FF33FF |
| <span style="color:#FF6600">██ </span>#FF6600 | <span style="color:#FF6633">██ </span>#FF6633 | <span style="color:#FF6666">██ </span>#FF6666 | <span style="color:#FF6699">██ </span>#FF6699 | <span style="color:#FF66CC">██ </span>#FF66CC | <span style="color:#FF66FF">██ </span>#FF66FF |
| <span style="color:#FF9900">██ </span>#FF9900 | <span style="color:#FF9933">██ </span>#FF9933 | <span style="color:#FF9966">██ </span>#FF9966 | <span style="color:#FF9999">██ </span>#FF9999 | <span style="color:#FF99CC">██ </span>#FF99CC | <span style="color:#FF99FF">██ </span>#FF99FF |
| <span style="color:#FFCC00">██ </span>#FFCC00 | <span style="color:#FFCC33">██ </span>#FFCC33 | <span style="color:#FFCC66">██ </span>#FFCC66 | <span style="color:#FFCC99">██ </span>#FFCC99 | <span style="color:#FFCCCC">██ </span>#FFCCCC | <span style="color:#FFCCFF">██ </span>#FFCCFF |
| <span style="color:#FFFF00">██ </span>#FFFF00 | <span style="color:#FFFF33">██ </span>#FFFF33 | <span style="color:#FFFF66">██ </span>#FFFF66 | <span style="color:#FFFF99">██ </span>#FFFF99 | <span style="color:#FFFFCC">██ </span>#FFFFCC | <span style="color:#FFFFFF">██ </span>#FFFFFF |

## Netscape色

Netscape Navigator 用以下的英文名定义各种颜色。


| | | | | |
| --- | --- | --- | --- |--- |
| <span style="color:#000000">█</span> #000000 black| <span style="color:#000080">█</span> #000080 navy| <span style="color:#00008B">█</span> #00008B darkblue| <span style="color:#0000CD">█</span> #0000CD mediumblue| <span style="color:#0000FF">█</span> #0000FF blue|
| <span style="color:#006400">█</span> #006400 darkgreen| <span style="color:#008000">█</span> #008000 green| <span style="color:#008080">█</span> #008080 teal| <span style="color:#008B8B">█</span> #008B8B darkcyan| <span style="color:#00BFFF">█</span> #00BFFF deepskyblue|
| <span style="color:#00CED1">█</span> #00CED1 darkturquoise| <span style="color:#00FA9A">█</span> #00FA9A mediumspringgreen| <span style="color:#00FF00">█</span> #00FF00 lime| <span style="color:#00FF7F">█</span> #00FF7F springgreen| <span style="color:#00FFFF">█</span> #00FFFF aqua|
| <span style="color:#00FFFF">█</span> #00FFFF cyan| <span style="color:#191970">█</span> #191970 midnightblue| <span style="color:#1E90FF">█</span> #1E90FF dodgerblue| <span style="color:#20B2AA">█</span> #20B2AA lightseagreen| <span style="color:#228B22">█</span> #228B22 forestgreen|
| <span style="color:#2E8B57">█</span> #2E8B57 seagreen| <span style="color:#2F4F4F">█</span> #2F4F4F darkslategray| <span style="color:#32CD32">█</span> #32CD32 limegreen| <span style="color:#3CB371">█</span> #3CB371 mediumseagreen| <span style="color:#40E0D0">█</span> #40E0D0 turquoise|
| <span style="color:#4169E1">█</span> #4169E1 royalblue| <span style="color:#4682B4">█</span> #4682B4 steelblue| <span style="color:#483D8B">█</span> #483D8B darkslateblue| <span style="color:#48D1CC">█</span> #48D1CC mediumturquoise| <span style="color:#4B0082">█</span> #4B0082 indigo|
| <span style="color:#556B2F">█</span> #556B2F darkolivegreen| <span style="color:#5F9EA0">█</span> #5F9EA0 cadetblue| <span style="color:#6495ED">█</span> #6495ED cornflowerblue| <span style="color:#66CDAA">█</span> #66CDAA mediumaquamarine| <span style="color:#696969">█</span> #696969 dimgray|
| <span style="color:#6A5ACD">█</span> #6A5ACD slateblue| <span style="color:#6B8E23">█</span> #6B8E23 olivedrab| <span style="color:#708090">█</span> #708090 slategray| <span style="color:#778899">█</span> #778899 lightslategray| <span style="color:#7B68EE">█</span> #7B68EE mediumslateblue|
| <span style="color:#7CFC00">█</span> #7CFC00 lawngreen| <span style="color:#7FFF00">█</span> #7FFF00 chartreuse| <span style="color:#7FFFD4">█</span> #7FFFD4 aquamarine| <span style="color:#800000">█</span> #800000 maroon| <span style="color:#800080">█</span> #800080 purple|
| <span style="color:#808000">█</span> #808000 olive| <span style="color:#808080">█</span> #808080 gray| <span style="color:#87CEEB">█</span> #87CEEB skyblue| <span style="color:#87CEFA">█</span> #87CEFA lightskyblue| <span style="color:#8A2BE2">█</span> #8A2BE2 blueviolet|
| <span style="color:#8B0000">█</span> #8B0000 darkred| <span style="color:#8B008B">█</span> #8B008B darkmagenta| <span style="color:#8B4513">█</span> #8B4513 saddlebrown| <span style="color:#8FBC8F">█</span> #8FBC8F darkseagreen| <span style="color:#90EE90">█</span> #90EE90 lightgreen|
| <span style="color:#9370DB">█</span> #9370DB mediumpurple| <span style="color:#9400D3">█</span> #9400D3 darkviolet| <span style="color:#98FB98">█</span> #98FB98 palegreen| <span style="color:#9932CC">█</span> #9932CC darkorchid| <span style="color:#9ACD32">█</span> #9ACD32 yellowgreen|
| <span style="color:#A0522D">█</span> #A0522D sienna| <span style="color:#A52A2A">█</span> #A52A2A brown| <span style="color:#A9A9A9">█</span> #A9A9A9 darkgray| <span style="color:#ADD8E6">█</span> #ADD8E6 lightblue| <span style="color:#ADFF2F">█</span> #ADFF2F greenyellow|
| <span style="color:#AFEEEE">█</span> #AFEEEE paleturquoise| <span style="color:#B0C4DE">█</span> #B0C4DE lightsteelblue| <span style="color:#B0E0E6">█</span> #B0E0E6 powderblue| <span style="color:#B22222">█</span> #B22222 firebrick| <span style="color:#B8860B">█</span> #B8860B darkgoldenrod|
| <span style="color:#BA55D3">█</span> #BA55D3 mediumorchid| <span style="color:#BC8F8F">█</span> #BC8F8F rosybrown| <span style="color:#BDB76B">█</span> #BDB76B darkkhaki| <span style="color:#C0C0C0">█</span> #C0C0C0 silver| <span style="color:#C71585">█</span> #C71585 mediumvioletred|
| <span style="color:#CD5C5C">█</span> #CD5C5C indianred| <span style="color:#CD853F">█</span> #CD853F peru| <span style="color:#D2691E">█</span> #D2691E chocolate| <span style="color:#D2B48C">█</span> #D2B48C tan| <span style="color:#D3D3D3">█</span> #D3D3D3 lightgrey|
| <span style="color:#D8BFD8">█</span> #D8BFD8 thistle| <span style="color:#DA70D6">█</span> #DA70D6 orchid| <span style="color:#DAA520">█</span> #DAA520 goldenrod| <span style="color:#DB7093">█</span> #DB7093 palevioletred| <span style="color:#DC143C">█</span> #DC143C crimson|
| <span style="color:#DCDCDC">█</span> #DCDCDC gainsboro| <span style="color:#DDA0DD">█</span> #DDA0DD plum| <span style="color:#DEB887">█</span> #DEB887 burlywood| <span style="color:#E0FFFF">█</span> #E0FFFF lightcyan| <span style="color:#E6E6FA">█</span> #E6E6FA lavender|
| <span style="color:#E9967A">█</span> #E9967A darksalmon| <span style="color:#EE82EE">█</span> #EE82EE violet| <span style="color:#EEE8AA">█</span> #EEE8AA palegoldenrod| <span style="color:#F08080">█</span> #F08080 lightcoral| <span style="color:#F0E68C">█</span> #F0E68C khaki|
| <span style="color:#F0F8FF">█</span> #F0F8FF aliceblue| <span style="color:#F0FFF0">█</span> #F0FFF0 honeydew| <span style="color:#F0FFFF">█</span> #F0FFFF azure| <span style="color:#F4A460">█</span> #F4A460 sandybrown| <span style="color:#F5DEB3">█</span> #F5DEB3 wheat|
| <span style="color:#F5F5DC">█</span> #F5F5DC beige| <span style="color:#F5F5F5">█</span> #F5F5F5 whitesmoke| <span style="color:#F5FFFA">█</span> #F5FFFA mintcream| <span style="color:#F8F8FF">█</span> #F8F8FF ghostwhite| <span style="color:#FA8072">█</span> #FA8072 salmon|
| <span style="color:#FAEBD7">█</span> #FAEBD7 antiquewhite| <span style="color:#FAF0E6">█</span> #FAF0E6 linen| <span style="color:#FAFAD2">█</span> #FAFAD2 lightgoldenrodyellow| <span style="color:#FDF5E6">█</span> #FDF5E6 oldlace| <span style="color:#FF0000">█</span> #FF0000 red|
| <span style="color:#FF00FF">█</span> #FF00FF fuchsia| <span style="color:#FF00FF">█</span> #FF00FF magenta| <span style="color:#FF1493">█</span> #FF1493 deeppink| <span style="color:#FF4500">█</span> #FF4500 orangered| <span style="color:#FF6347">█</span> #FF6347 tomato|
| <span style="color:#FF69B4">█</span> #FF69B4 hotpink| <span style="color:#FF7F50">█</span> #FF7F50 coral| <span style="color:#FF8C00">█</span> #FF8C00 darkorange| <span style="color:#FFA07A">█</span> #FFA07A lightsalmon| <span style="color:#FFA500">█</span> #FFA500 orange|
| <span style="color:#FFB6C1">█</span> #FFB6C1 lightpink| <span style="color:#FFC0CB">█</span> #FFC0CB pink| <span style="color:#FFD700">█</span> #FFD700 gold| <span style="color:#FFDAB9">█</span> #FFDAB9 peachpuff| <span style="color:#FFDEAD">█</span> #FFDEAD navajowhite|
| <span style="color:#FFE4B5">█</span> #FFE4B5 moccasin| <span style="color:#FFE4C4">█</span> #FFE4C4 bisque| <span style="color:#FFE4E1">█</span> #FFE4E1 mistyrose| <span style="color:#FFEBCD">█</span> #FFEBCD blanchedalmond| <span style="color:#FFEFD5">█</span> #FFEFD5 papayawhip|
| <span style="color:#FFF0F5">█</span> #FFF0F5 lavenderblush| <span style="color:#FFF5EE">█</span> #FFF5EE seashell| <span style="color:#FFF8DC">█</span> #FFF8DC cornsilk| <span style="color:#FFFACD">█</span> #FFFACD lemonchiffon| <span style="color:#FFFAF0">█</span> #FFFAF0 floralwhite|
| <span style="color:#FFFAFA">█</span> #FFFAFA snow| <span style="color:#FFFF00">█</span> #FFFF00 yellow| <span style="color:#FFFFE0">█</span> #FFFFE0 lightyellow| <span style="color:#FFFFF0">█</span> #FFFFF0 ivory| <span style="color:#FFFFFF">█</span> #FFFFFF white|

## 6x6x6 Color Cube

![6x6x6 Color Cube](../../../static/img/配色/2.gif)

6x6x6 彩色立方体的相关内容我还没有安利明白(PД\`q。\)・，目前只有有限的知道std[^^www_world_std_com]网站

[^^www_world_std_com]:[6x6x6 Color Cube](http://world.std.com/~wij/color/index.html)，站内相关页面有[Through the 6x6x6 Color Cube An Interactive Voyage](http://world.std.com/~wij/color/index-animated.html)、[Through the 6x6x6 Color Cube Corner to Corner](http://world.std.com/~wij/color/wk-p-text.html)等。

## 色卡

## 计算

RGB数值表示颜色信息的格式为`(255 0 0)`，除此之外还存在色相，饱和度，亮度，明度和灰度大小的数值，分别对应`0°, 100%, 100%, 76, 127`，其彼此之间的换算公式为：

| 名称 | 公式 |
| --- | --- |
|色相|原色色相(RGB最大值色相[^^zui_da_zhi_se_xiang])+（-）(中间值-最小值)*60/(最大值-最小值)|
|饱和度|&#91;（最大值-最小值）/最大值&#93;*100%|
|亮度|(最大值 /255)*100%|
|明度|30%*R+59%*G+11%*B|
|灰度|(最大值+最小值)/2|

[^^zui_da_zhi_se_xiang]:色相公式中的原色色相（RGB最大值色相）是指基色通道最大值色相，R为0°度（或360°），G为120°，B为240°.正负号取值方法是看中间值色相在最大值的色相基础上，按中间值的定位，顺时针为负，逆时针为正。再如RGB为（150 40 80），色相为（0°-40*60/110=-338°）。


按照对应的换算公式，分别实例计算三组（255 0 0），（0 255 255），（60 200 95）信息对应的色相，饱和度，亮度，明度和灰度。

```html
<!--（255 0 0）-->
色相=0°+（0-0）*60/（255-0）= 0°
  或=360°-（0-0）*60/（255-0）= 0°
饱和度=[（255-0）/255]*100% = 100%
亮度=(255/255)*100% = 100%
明度=30%*255+59%*0+11%*0 = 76
灰度=（255+0）/2=127
<!--（0 255 255）-->
色相=120°+（255-0）*60/（255-0）= 180°
  或=240°-（255-0）*60/（255-0）= 180°
饱和度=[（255-0）/255]*100% = 100%
亮度=(255/255)*100% = 100%
明度=30%*0+59%*255+11%*255 = 179
灰度=（255+0）/2=127
<!--（60 200 95）-->
色相=120°+（95-60）*60/（200-60）= 135°
饱和度=[（200-60）/200]*100% = 70%
亮度=(200/255)*100%=78%
明度=30%*60+59%*200+11%*95 = 146
灰度=（200+60）/2 = 130
```


### 思考

现在大多数电脑都有能力显示数以百万计的颜色，起码浏览器制造商是这样说的，但是真实情况是这样么？那么安全色的定义还会维持多久呢？

## 配色方案

参考：

- http://flatuicolors.com/
- https://bjango.com/mac/skalacolor/
- http://nathanspeller.com/color-pickers/
- http://www.colorfavs.com/
- http://colllor.com/
- http://nipponcolors.com/
- http://www.0to255.com/
- http://bootflat.github.io/color-picker.html
- http://colorhunt.co/
- http://hex-code.com/
- http://www.colordic.org/s/
- http://www.colorsz.com/Article/48.aspx
