# Markdown

<!-- toc -->

> Markdown is a lightweight markup language with plain text formatting syntax designed so that it can be converted to HTML and many other formats using a tool by the same name. Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.[^^markdown_wiki_lightweight_desc]

[^^markdown_wiki_lightweight_desc]:[Markdown](https://en.wikipedia.org/wiki/Markdown):维基百科Markdown说明。

Markdown[^^markdown_website_desc]诞生于互联网时代，更是由深谙互联网文本之道的[John Gruber](http://daringfireball.net/)等人设计，其语法受到text-to-HTML格式的影响，以简洁、简单为目的，最大程度的简化排版增强文字创作，作为程序员免不了要经常和Markdown打交道，所以笔者整理以下资料，语法介绍虽然占了大幅篇章，但主菜是收集的那些其他作者写的关于Markdown开源作品，闲暇时看看可以对正则匹配又有新的认知，受益无穷。

[^^markdown_website_desc]:[Markdown](http://daringfireball.net/projects/markdown/)，Markdown官方网站，包括语法、博客和[Markdown语法测试](http://daringfireball.net/projects/markdown/dingus)等信息。

## 标题

Markdown 支持两种形式的标题语法：[Setext](http://docutils.sourceforge.net/mirror/setext.html)形式和[atx](http://www.aaronsw.com/2002/atx/)形式。

### Setext

Setext形式的标题只能表示标题1和标题2这两阶。

|符号|描述|markdown|html|
| --- | --- | --- | --- |
|=|最高阶标题|这是标题1<br>=============|<h1>这是标题1</h1>|
|-|第二阶标题|这是标题2<br>-------------|<h2>这是标题2</h2>|

### atx

atx形式的标题可以表示标题1~标题6共6阶。

|符号|描述|markdown|html|
| --- | --- | --- | --- |
|#|最高阶标题|# 这是标题1|<h1>这是标题1</h1>|
|##|第二阶标题|## 这是标题2|<h2>这是标题2</h2>|
|###|第三阶标题|### 这是标题3|<h3>这是标题3</h3>|
|####|第四阶标题|#### 这是标题4|<h4>这是标题4</h4>|
|#####|第五阶标题|##### 这是标题5|<h5>这是标题5</h5>|
|######|第六阶标题|###### 这是标题6|<h6>这是标题6</h6>|

## 区块引用

Markdown标记区块引用是使用 > 标记，一个段落既可以只用一个 >标记（放在段首，属偷懒做法），也可以在一个段落的每一行前面加上 >。

<iframe name="archives" src="../static/iframe/markdown/blockquote.html" frameborder="0" height="250px"></iframe>

区块引用可以嵌套使用，即引用内的引用，只要根据层次加上不同数量的 > 即可，比如两层就需要两个> ：


<iframe name="archives" src="../static/iframe/markdown/blockquote2.html" frameborder="0" height="250px"></iframe>

引用的区块内也可以使用其他的Markdown语法，包括标题、列表、代码块等：

<iframe name="archives" src="../static/iframe/markdown/blockquote3.html" frameborder="0" height="390px"></iframe>

## 分隔线

三个或以上的星号*、减号-、底线_来建立一个分隔线，标记之间允许存在空格，而且这三种标记可以混用。

|符号|markdown|html|效果|
| --- | --- | --- | --- |
|*|* * *|&#60;hr/&#62;|<hr style="display: block;"/>|
|*|***|&#60;hr/&#62;|<hr style="display: block;"/>|
|*|*****|&#60;hr/&#62;|<hr style="display: block;"/>|
|-|- - -|&#60;hr/&#62;|<hr style="display: block;"/>|
|-|-----|&#60;hr/&#62;|<hr style="display: block;"/>|
|_|____|&#60;hr/&#62;|<hr style="display: block;"/>|
|-*_|-*_|&#60;hr/&#62;|<hr style="display: block;"/>|

## 强调

星号*和底线_，&#42;&#42;和&#95;&#95;两个相同的符号中间不能留有空白，且不允许混用。

|符号|markdown|html|效果|
| --- | --- | --- | --- |
|&#42;|&#42;使用一个星号的强调&#42;|&#60;em&#62;使用一个星号的强调&#60;/em&#62;|<em>使用一个星号的强调</em>|
|&#42;|&#42;&#42;使用两个星号的强调&#42;&#42;|&#60;strong&#62;使用两个星号的强调&#60;/strong&#62;|<strong>使用两个星号的强调</strong>|
|&#95;|&#95;使用一个底线的强调&#95;|&#60;em&#62;使用一个底线的强调&#60;/em&#62;|<em>使用一个底线的强调</em>|
|&#95;|&#95;&#95;使用两个底线的强调&#95;&#95;|&#60;strong&#62;使用两个底线的强调&#60;/strong&#62;|<strong>使用两个底线的强调</strong>|

## 列表


Markdown 支持有序列表和无序列表两种，且列表可以嵌套使用。

### 无序列表

<iframe name="archives" src="../static/iframe/markdown/list1.html" frameborder="0" height="160px"></iframe>

### 有序列表

<iframe name="archives" src="../static/iframe/markdown/list2.html" frameborder="0" height="160px"></iframe>

### 技巧

<iframe name="archives" src="../static/iframe/markdown/list3.html" frameborder="0" height="580px"></iframe>


## 链接

Markdown的链接可分为自动链接和普通文本链接两种类型。

### 自动链接

Markdown支持以比较简短的自动链接形式来处理网址和电子邮件信箱。

|markdown代码|html代码|描述|效果|
| --- | --- | --- | --- |
|&#60;http:&#47;&#47;kangcafe.com&#47;&#62;|&#60;a href="http:&#47;&#47;www.kangcafe.net&#47;"&#62;<br>http:&#47;&#47;www.kangcafe.net&#47;&#60;&#47;a&#62;|可点击的URL|<http://kangcafe.com/>|
|&#60;kang@kangcafe.com&#62;|&#60;a href="mailto:kang@kangcafe.com"&#62;<br>kang@kangcafe.com&#60;&#47;a&#62;|可点击的Email|<kang@kangcafe.com>|

### 普通文本链接

Markdown支持两种形式的普通文本链接语法： 行内式和参考式两种形式。

#### 行内式链接

|markdown代码|html代码|效果|
| --- | --- | --- | --- |
|&#91;链接文字&#93;(链接URL '可选的链接title')|&#60;a href="链接URL" title="可选的链接title"<br>&#60;链接文字&#62;/a&#62;|[链接文字](链接URL "可选的链接title")|

#### 参考式链接

Markdown语法说明：

|markdown代码|html代码|效果|
| --- | --- | --- | --- |
|&#91;链接文字&#93;&#91;链接id&#93;<br>&#91;链接id&#93;: 真正的链接URL "可选的title"|&#60;a href="真正的链接URL" title="可选的title"<br>&#60;链接文字&#62;/a&#62;|<a href="链接URL" title="可选的链接title">链接文字</a><br>|

## 表格

<iframe name="archives" src="../static/iframe/markdown/table1.html" frameborder="0" height="360px"></iframe>

[Tables Generator
](http://www.tablesgenerator.com/markdown_tables)表格生成器很好用，可以根据需求一键生成表格。

![tablesgenerator](../../../static/img/markdown/3.png)

## 代码
。

### LaTeX

[LaTeX](https://en.wikipedia.org/wiki/LaTeX)

### R

- [psyapp markdown](http://r.psyapp.com/apps/markdown/)
- [citeproc-ruby](https://github.com/inukshuk/citeproc-ruby)
- [jekyll scholar](https://github.com/inukshuk/jekyll-scholar)

### Rmd

[文档](https://github.com/yihui/r-ninja/blob/master/11-auto-report.md)

#### RStudio

[RStudio](http://rstudio.org/)

## 画图

[flowchart.js](https://github.com/adrai/flowchart.js)

## 格式转换

- [Pandoc](http://pandoc.org/)
- [gitbook](https://github.com/GitbookIO/gitbook)
- [johnmacfarlane](http://johnmacfarlane.net/)
- [knitr](http://yihui.name/knitr/)

### Excel

- [fanfeilong/exceltk](https://github.com/fanfeilong/exceltk)

### 命令行转换工具

[linq2md](https://github.com/fanfeilong/linq2md)



## Emoji表情

官方网页[EMOJI CHEAT SHEET](http://www.webpagefx.com/tools/emoji-cheat-sheet/)

[文档](https://github.com/guodongxiaren/README/blob/master/emoji.md)

## 衍生规范

### GFM

GFM(GitHub Flavored Markdown)

## 转移

```html
\   反斜线
`   反引号
*   星号
_   底线
{}  花括号
[]  方括号
()  括弧
#   井号
+   加号
-   减号
.   英文句点
!   惊叹号
```
## 参考

| | | | | |
| --- | --- | --- | --- | --- |
|[dillinger](http://dillinger.io/)|[stackedit](https://stackedit.io/)|[pandoc try](http://pandoc.org/try/)|[codemirror](http://codemirror.net/)|[markgiu](https://github.com/bianchimro/markgiu)|
|[EpicEditor](https://github.com/OscarGodson/EpicEditor)|[ace](https://github.com/ajaxorg/ace)|[markdown here](https://github.com/adam-p/markdown-here/)|[marp](https://github.com/yhatt/marp/)|[小书匠](http://markdown.xiaoshujiang.com/)|
|[CuteMarkEd](http://cloose.github.io/CuteMarkEd/)|[MdCharm](https://github.com/zhangshine/MdCharm)|[MarkdownEditor](https://github.com/jijinggang/MarkdownEditor)|[vimwiki](https://xbeta.info/vimwiki.htm)|[marboo](https://github.com/marboo/marboo-doc)|
|[mahua](https://github.com/jserme/mahua)|[markdowneditor:ctrlshift](http://www.ctrlshift.net/project/markdowneditor/)|[MarkDownEditor:chenguanzhou](http://chenguanzhou.github.io/MarkDownEditor/)|[Android Markdown编辑器](https://github.com/qinci/MarkdownEditors)|[multimarkdown](https://github.com/fletcher/MultiMarkdown-5)|
|[kramdown](https://github.com/gettalong/kramdown)|[bootstrap-markdown](https://github.com/toopay/bootstrap-markdown)|[markdown-editor](https://github.com/jbt/markdown-editor)|[stackedit](https://github.com/benweet/stackedit)|[Timo Dörr](https://stackoverflow.com/cv/timodoerr)|
|[MDwiki](https://github.com/Dynalon/mdwiki)|[EtText](http://ettext.taint.org/doc/)|[Grutatext](http://triptico.com/software/grutatxt.html)|[reStructuredText](http://docutils.sourceforge.net/rst.html)|[Textile](http://www.booked.net/textism.html)|
|[php Markdown Extra](https://michelf.ca/projects/php-markdown/extra/)|[linguist](https://github.com/github/linguist)|[sundown](https://github.com/vmg/sundown)|[commonmark](https://github.com/jgm/CommonMark)|[The Markdown Mark](https://dcurt.is/the-markdown-mark)|
|[marked](https://github.com/chjj/marked)|[showdown](https://github.com/showdownjs/showdown)|[pagedown](https://code.google.com/p/pagedown/)|[wmd](https://github.com/cky/wmd)|[redcarpet](https://github.com/vmg/redcarpet)|
|[reMarked](https://github.com/leeoniya/reMarked.js)|[jblevins jblevins](http://jblevins.org/log/jblevins)|[MarkdownEditing](https://github.com/ttscoff/MarkdownEditing)|[Markdown.css](https://github.com/mrcoles/markdown-css)|[maruku](https://github.com/bhollis/maruku)|
