# meta（meta-information）

| 项目 | 说明 |
|--------|--------|
|形式|`<meta http-equiv="..." content="..."> or <meta name="..." content="...">`|
|支持|H3+ / e2+ / N2+ / Fx1+ / Op6+ / Ch1+ / Sa1+|
|标签省略|开始标签：必须，结束标签：无|

## 属性

| 属性 | 意义 |
|--------|--------|
|name=name|H2+/e2+/N2+。指定名字。|
|http-equiv=http-equiv|H2+/e2+/N2+。指定HTTP头部信息名。|
|content=content|H2+/e2+/N2+。指定内容，HTML4.01 中为必须属性。|
|scheme=scheme|H4+。设定解释 content 时的提示信息。基本不使用。|
|dir=dir|H4+/e5+。指定文字显示的方向。|
|lang=lang|H4+/e4+。指定语言种类。|
|title=title|e4+。指定标题。|

### 文字编码

声明文档的文字编码，不设定的话有可能显示成乱码。

```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
```

### 脚本语言

设定文档的脚本语言。HTML4.01 中强烈推荐设定，HTML5 中默认为 text/javascript ，如果使用 JavaScript 的话不需要设定。

```html
<meta http-equiv="Content-Script-Type" content="text/javascript">
```

### 样式表语言

设定文档的样式表语言。HTML4.01 中强烈推荐设定，HTML5 中默认为 text/css ，如果使用 css 的话不需要设定。

```html
<meta http-equiv="Content-Style-Type" content="text/css">
```


### 文档的作者

注明文档的作者。画面上没有变化。

```html
<meta name="Author" content="mmkguanli">
```

### 文档的关键词

指定关于此文档的关键词。有些搜索引擎以这些关键词来搜索和排序结果。

```html
<meta name="Keywords" content="HTML,CGI,JavaScript">
```

### 网页描述

设定关于此文档的网页描述。这些信息可能会出现在搜索引擎的搜索结果中。

```html
<meta name="Description" content="HTML标签">
```

### 页面刷新

比如可以让页面每隔10秒钟刷新一次。这种功能叫 Client Pull。

```html
<meta http-equiv="Refresh" content="10">
```

### 自动跳转到其他页面

比如可以设定10秒后跳转到指定的URL。

```html
<meta http-equiv="Refresh" content="10;URL=http://www.monmonkey.com/">
```

### 缓存的有效期

设定缓存的有效期，超过时间的话，缓存里的关于此网页的内容将过期而无法使用。如果指定过去的时间，则此网页无法使用缓存。

### 缓存控制

设定此网页无法被存入缓存，每次打开此页面都需要重新读取。

```html
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Expires" content="0">
```

### 搜索引擎机器人的控制

可以设定对 Google 等搜索机器人的信息。index 为允许搜索、noindex 为禁止搜索、follow 为允许搜索链接目标、nofollow 为禁止搜索链接目标。

```html
<meta name="robots" content="noindex,nofollow">
```

### 过度效果

设定网页跳转时的视觉效果。

```html
<meta http-equiv="Page-Enter" content="blendTrans(Duration=0.8)">
```

### 使图像工具条无效

使IE6.0 中支持的图像工具条无效。（就是鼠标移到图像上会显示打印、保存等按钮的工具条）

```html
<meta http-equiv="imagetoolbar" content="no">
```

### 编辑器

注明用来制作此网页的HTML编辑器。

```html
<meta http-equiv="Generator" content="Simple HTML Editor V2.5">
```
## 参考

- http://www.iana.org/assignments/character-sets
