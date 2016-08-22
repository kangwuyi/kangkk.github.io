# DOM

# 标签元素

## 按字母划分

| | |
|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|
|A|`<a>`|`<abbr>`|~~`<acronym>`~~|`<address>`|`<area>`|**`<article>`**|**`<aside>`**|**`<audio>`**|
|B|`<b>`|`<base>`|~~`<basefont>`~~|**`<bdi>`**|`<bdo>`|~~`<bgsound>`~~|~~`<big>`~~|`<blockquote>`|`<body>`|`<br>`|`<button>`|
|C|`<caption>`|`<cite>`|`<code>`|`<col>`|`<colgroup>`|**`<command>`**|~~`<comment>`~~|
|D|`<datalist>`|`<dd>`|`<del>`|`<details>`|`<dfn>`|~~`<dir>`~~|`<div>`|`<dl>`|`<dt>`|
|E|`<em>`|
|F|~~`<font>`~~|`<footer>`|`<form>`|
|H|`<h1>-<h6>`|`<head>`|`<header>`|`<hr>`|`<html>`|
|I|`<i>`|`<img>`|`<input>`|`<ins>`|
|K|`<kbd>`|`<keygen>`|
|L|`<label>`|`<li>`|`<link>`|~~`<listing>`~~|
|M|`<map>`|`<menu>`|`<meta>`|`<meter>`|
|N|`<nav>`|~~`<nextid>`~~|~~`<nobr>`~~|`<noscript>`|
|O|`<ol>`|`<option>`|
|P|`<p>`|~~`<plaintext>`~~|`<pre>`|**`<progress>`**|
|Q|`<q>`|
|S|`<s>`|`<samp>`|`<script>`|`<select>`|`<small>`|`<source>`|`<span>`|~~`<strike>`~~|`<strong>`|`<style>`|`<sub>`|`<summary>`|`<sup>`|
|T|`<table>`|`<td>`|`<textarea>`|`<th>`|`<title>`|`<tr>`|**`<track>`**|~~`<tt>`~~|
|U|~~`<u>`~~|`<ul>`|
|V|`<var>`|**`<video>`**|
|W|~~`<wbr>`~~|
|X|~~`<xmp>`~~|

## 按功能划分

| | |
|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|
|基本|`<html>`|`<head>`|`<title>`|`<body>`|`<!DOCTYPE>`|`<style>`|`<span>`|`<div>`|
|注释|`<!-- -->`|~~`<comment>`~~|
|文档结构|`<h1>-<h6>`|`<p>`|`<article>`|`<nav>`|`<header>`|`<footer>`|`<aside>`|
||`<details>`|`<figure>`|`<figcaption>`|`<hgroup>`|
|换行|`<br>`|~~`<nobr>`~~|~~`<wbr>`~~|
|水平线|`<hr>`|
|链接|`<a>`|`<map>`|`<area>`|
|列表|`<li>`|`<ul>`|`<ol>`|`<dl>`|`<dt>`|`<dd>`|~~`<dir>`~~|`<menu>`|`<command>`|
|表单|`<form>`|`<input>`|`<select>`|`<option>`|`<textarea>`|`<button>`|`<label>`|`<datalist>`|`<summary>`|`<output>`|
|表格|`<table>`|`<tr>`|`<th>`|`<td>`|`<caption>`|
|字体|~~`<font>`~~|`<b>`|`<i>`|~~`<tt>`~~|~~`<u>`~~|`<s>`|~~`<strike>`~~|~~`<big>`~~|`<small>`|
|词义|`<address>`|`<blockquote>`|`<q>`|`<ins>`|`<del>`|`<sub>`|`<sup>`|`<em>`|
||`<strong>`|~~`<acronym>`~~|`<abbr>`|`<cite>`|`<dfn>`|`<code>`|`<kbd>`|`<samp>`|`<var>`|`<mark>`|
|媒体|`<img>`|~~`<bgsound>`~~|`<audio>`|`<video>`|`<source>`|`<track>`|
|嵌入|`<script>`|`<noscript>`|
|文本|`<pre>`|~~`<xmp>`~~|~~`<plaintext>`~~|~~`<listing>`~~|
|其他|`<meta>`|`<link>`|`<keygen>`|`<meter>`|`<progress>`|

## 块元素和内联元素（block element and inline element）

### 块元素

| | |
|--------|--------|
|P|H1|H2|H3|h4|H5|H6|UL|OL|
|DIR|MENU|PRE|DL|DIV|CENTER|NOSCRIPT|NOFRAMES|BLOCKQUOTE|
|FORM|ISINDEX|HR|TABLE|FIELDSET|ADDRESS|MULTICOL

### 内联元素

| | |
|--------|--------|
|TT|I|B|U|S|STRIKE|BIG|SMALL|EM|
|STRONG|DFN|CODE|SAMP|KBD|VAR|CITE|ABBR|ACRONYM|
|A|IMG|APPLET|OBJECT|FONT|BASEFONT|BR|SCRIPT|MAP|
|Q|SUB|SUP|SPAN|BDO|IFRAME|INPUT|SELECT|TEXTAREA|
|LABEL|BUTTON|BLINK|EMBED|LAYER|ILAYER|NOLAYER|NOBR|WBR|
|RUBY|RB|RP|RT|SPACER

### 特殊

只包含内联元素的时候会被认为是内联元素，如果包含了块元素的话就会被认为是块元素。

| | |
|--------|--------|
|INS|DEL|

## Shadow DOM

[Web and About What the Heck is Shadow DOM?](https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/)
