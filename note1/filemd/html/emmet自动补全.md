# Emmet

Emmet的前身是大名鼎鼎的Zen coding。

## html
### 初始化

|输入|用途|
|--------|--------|
|html:5 或!|用于HTML5文档类型|
|html:xt|用于XHTML过渡文档类型|
|html:4s|用于HTML4严格文档类型|

### 添加类、id、文本和属性

| 输入 | 输出 |
|--------|--------|
|p#foo|`<p id="foo"></p> `|
|p.bar|`<p class="bar"></p> `|
|h1{foo}|`<h1>foo</h1>`|
|a[href=#]|`<a href="#"></a>`|

### 嵌套

| 符号 | 用途 | 输入 | 输出 |
|--------|--------|--------|--------|
|>|子元素符号，表示嵌套的元素|p>span|`<p><span></span></p>`|
|+|同级标签符号|p+span|`<p></p><span></span>`|
|^|可以使该符号前的标签提升一行|p>span^div|`<p><span></span></p><div></div>`|

### 分组

通过嵌套和括号快速生成代码块

```html
(.foo>h1)+(.bar>h2)
==>
<div class="foo">
  <h1></h1>
</div>
<div class="bar">
  <h2></h2>
</div>
```

### 隐式标签

| 标签 | 用途 |
|--------|--------|
|li|用于ul和ol中|
|tr|用于table、tbody、thead和tfoot中|
|td|用于tr中|
|option|用于select和optgroup中|

### 定义多个元素

```html
ul>li*3
==>
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

### 定义多个带属性的元素

```html
ul>li.item$*3
==>
<ul>
  <li class="item1"></li>
  <li class="item2"></li>
  <li class="item3"></li>
</ul>
```

## CSS缩写

### 值

比如要定义元素的宽度，只需输入w100，即可生成 

Css代码 
width: 100px;  




除了px，也可以生成其他单位，比如输入h10p+m5e，结果如下： 

Css代码 
height: 10%;  
margin: 5em;  


单位别名列表： 

p 表示%
e 表示 em
x 表示 ex
2.  附加属性 

可能你之前已经了解了一些缩写，比如 @f，可以生成： 

Css代码 
@font-face {  
  font-family:;  
  src:url();  
}  

一些其他的属性，比如background-image、border-radius、font、@font-face,text-outline、text-shadow等额外的选项，可以通过“+”符号来生成，比如输入@f+，将生成： 

Css代码 
@font-face {  
  font-family: 'FontName';  
  src: url('FileName.eot');  
  src: url('FileName.eot?#iefix') format('embedded-opentype'),  
     url('FileName.woff') format('woff'),  
     url('FileName.ttf') format('truetype'),  
     url('FileName.svg#FontName') format('svg');  
  font-style: normal;  
  font-weight: normal;  
}  




3.  模糊匹配 

如果有些缩写你拿不准，Emmet会根据你的输入内容匹配最接近的语法，比如输入ov:h、ov-h、ovh和oh，生成的代码是相同的： 

Css代码 
overflow: hidden;  




4.  供应商前缀 

如果输入非W3C标准的CSS属性，Emmet会自动加上供应商前缀，比如输入trs，则会生成： 

Css代码 
-webkit-transform: ;  
-moz-transform: ;  
-ms-transform: ;  
-o-transform: ;  
transform: ;  




你也可以在任意属性前加上“-”符号，也可以为该属性加上前缀。比如输入-super-foo： 

Css代码 
-webkit-super-foo: ;  
-moz-super-foo: ;  
-ms-super-foo: ;  
-o-super-foo: ;  
super-foo: ;  

如果不希望加上所有前缀，可以使用缩写来指定，比如-wm-trf表示只加上-webkit和-moz前缀： 

Css代码 
-webkit-transform: ;  
-moz-transform: ;  
transform: ;  

前缀缩写如下： 

w 表示 -webkit-
m 表示 -moz-
s 表示 -ms-
o 表示 -o-
5.  渐变 

输入lg(left, #fff 50%, #000)，会生成如下代码： 

Css代码 
background-image: -webkit-gradient(linear, 0 0, 100% 0, color-stop(0.5, #fff), to(#000));  
background-image: -webkit-linear-gradient(left, #fff 50%, #000);  
background-image: -moz-linear-gradient(left, #fff 50%, #000);  
background-image: -o-linear-gradient(left, #fff 50%, #000);  
background-image: linear-gradient(left, #fff 50%, #000);  


- http://docs.emmet.io/