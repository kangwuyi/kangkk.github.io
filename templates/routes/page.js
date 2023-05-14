var express = require('express');
var router = express.Router();

router.get('/index', function(req, res, next) {
  res.render('page/index', {
    kcFileId: '123',
    kcFileName: 'abc',
    kcFileAddr: '1234',
    description: 'description',
    keyWorlds: 'keyWorlds'
  });
});
router.get('/header', function(req, res, next) {
  res.render('page/header', {
    kcFileName: 'title',
    description: 'description',
    keyWorlds: 'keyWorlds'
  });
});
router.get('/footer', function(req, res, next) {
  res.render('page/footer', {
    kcFileId: '123',
    kcFileName: 'abc',
    kcFileAddr: '1234',
  });
});
//
router.get('/candies', function(req, res, next) {
  res.render('page/candies', {
    content: `<h1><span class="header-link" id="history">History</span></h1><!-- toc -->
<section class="content__section"><div class="content-box__markdown--toc"><ol>
<li><a href="#history对象">History对象</a><ol>
<li><a href="#history对象属性">History对象属性</a></li>
<li><a href="#history对象方法">History对象方法</a></li>
</ol>
</li>
<li><a href="#html5扩展histroy">HTML5扩展Histroy</a><ol>
<li><a href="#pjax">pjax</a></li>
<li><a href="#其它">其它</a></li>
</ol>
</li>
<li><a href="#兼容状况">兼容状况</a><ol>
<li><a href="#桌面浏览器">桌面浏览器</a></li>
<li><a href="#移动浏览器">移动浏览器</a></li>
</ol>
</li>
</ol>
</div></section>

<!-- toc stop -->
<h2><span class="header-link" id="history对象">History对象</span></h2><p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/history">History</a>对象是window对象的一部分，可通过window.history属性对其进行访问对浏览器历史记录的读取，内容为用户（在浏览器窗口中）访问过的URL。从HTML5开始，我们可以开始操作这个历史记录堆栈。</p>
<h3><span class="header-link" id="history对象属性">History对象属性</span></h3><p>通过检查浏览器历史记录的length属性来找到历史记录堆栈中的页面总数。</p>
<table>
<thead>
<tr>
<th>属性</th>
<th>实例</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>length</td>
<td><code>var numberOfEntries = window.history.length;</code></td>
<td>返回浏览器历史列表中的URL数量</td>
</tr>
</tbody>
</table>
<h3><span class="header-link" id="history对象方法">History对象方法</span></h3><p>使用back(),forward(),和go()方法可以在用户的历史记录中前进和后退。</p>
<table>
<thead>
<tr>
<th>方法</th>
<th>实例</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>back<sup id="footnoteUp_1" data-desc="windows_histroy_backup" class="reference"><a class="footnoteUp" href="#footnoteDo_1">[1]</a></sup></td>
<td><code>window.history.back();</code></td>
<td>加载history列表中的前一个URL</td>
</tr>
<tr>
<td>forward</td>
<td><code>window.history.forward();</code></td>
<td>加载history列表中的下一个URL</td>
</tr>
<tr>
<td>go<sup id="footnoteUp_2" data-desc="windows_histroy_go_ie" class="reference"><a class="footnoteUp" href="#footnoteDo_2">[2]</a></sup></td>
<td><code>window.history.go(-1);</code></td>
<td>加载history列表中的某个具体页面</td>
</tr>
</tbody>
</table>
<p>如果移动的位置超出了访问历史的边界，以上三个方法并不报错，而是默默的失败。</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API">Manipulating the browser history</a></p>
<h2><span class="header-link" id="html5扩展histroy">HTML5扩展Histroy</span></h2><p>html5通过<code>history.pushState</code>等接口扩展了<code>回退栈</code>等功能。即所有的变化只发生在前端，这种方式下url变化，但实际上该url所对应的页面很可能不存在，url部分只作为回退栈的tag而存在。</p>
<table>
<thead>
<tr>
<th>方法</th>
<th>实例</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>pushState</td>
<td><code>history.pushState(data, title [, url])</code></td>
<td>往历史记录堆栈顶部添加一条记录</td>
</tr>
<tr>
<td>replaceState</td>
<td><code>history.replaceState(data, title [, url])</code></td>
<td>修改浏览历史中当前纪录</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>参数</th>
<th>参数描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>data</td>
<td>一个与指定网址相关的状态对象，onpopstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null</td>
</tr>
<tr>
<td>title</td>
<td>新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null</td>
</tr>
<tr>
<td>url</td>
<td>新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址</td>
</tr>
</tbody>
</table>
<p>通过<code>pushState</code>函数改变地址栏。</p>
<p><img src="../static/img/js_history/1.png" alt="pushState"></p>
<pre><code class="lang-js">var <span class="hljs-keyword">state</span>Obj = { foo: 'bar' };
history.pushState(<span class="hljs-keyword">state</span>Obj, 'page <span class="hljs-number">2</span>', '<span class="hljs-number">2</span>-page.html');
</code></pre>
<p><img src="../static/img/js_history/2.png" alt="pushState"></p>
<p>pushState方法不会触发页面刷新，只是导致history对象发生变化，地址栏会有反应。如果第三个参数<code>url</code>是带有<code>http|https</code>等网络协议标识的锚点，就要注意跨域问题。</p>
<pre><code class="lang-js">history.pushState(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, <span class="hljs-symbol">'https</span>:<span class="hljs-comment">//img.baidu.com/hello');</span>
</code></pre>
<p><img src="../static/img/js_history/6.png" alt="pushState"></p>
<p>不同源则报错。</p>
<pre><code class="lang-js">history.pushState(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, <span class="hljs-symbol">'https</span>:<span class="hljs-comment">//www.baidu.com/hello');</span>
</code></pre>
<p><img src="../static/img/js_history/5.png" alt="pushState"></p>
<p>使用<a href="http://html5test.com/">how well does your browser support html5</a>检查当前浏览器是否支持History API，不支持的话使用<a href="https://balupton.com/">Benjamin Lupton</a>等人写的Polyfill库（<a href="https://github.com/browserstate/history.js/">history.js</a>）扩展history。</p>
<pre><code class="lang-js"><span class="hljs-keyword">if</span> (!!(window<span class="hljs-selector-class">.history</span> &amp;&amp; history.pushState)){
  <span class="hljs-comment">// 支持History API</span>
} <span class="hljs-keyword">else</span> {
  <span class="hljs-comment">// 不支持</span>
}
</code></pre>
<p>扩展使用window.history进行前端mvc跳转。</p>
<pre><code class="lang-js"><span class="hljs-keyword">if</span> (!!(<span class="hljs-built_in">window</span>.history &amp;&amp; history.pushState))
 {   
   <span class="hljs-comment">// 支持History API</span>
    <span class="hljs-keyword">var</span> stateObj = { foo: <span class="hljs-string">"bar"</span> };
    history.pushState(stateObj, <span class="hljs-string">"page 2"</span>, <span class="hljs-string">"user.html"</span>);
    <span class="hljs-comment">// 监听出栈事件</span>
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-built_in">window</span>,<span class="hljs-string">'popstate'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onPopStack</span>(<span class="hljs-params">evt</span>)</span>{
         <span class="hljs-keyword">var</span> e = evt || <span class="hljs-built_in">window</span>.event;
         <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"location: "</span> + <span class="hljs-built_in">document</span>.location);   
         <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"state: "</span> + <span class="hljs-built_in">JSON</span>.stringify(event.state));
         <span class="hljs-built_in">console</span>.dir(evt);  
    },<span class="hljs-literal">true</span>);

 }
<span class="hljs-keyword">else</span> {  
 <span class="hljs-comment">// 不支持</span>
}
</code></pre>
<h3><span class="header-link" id="pjax">pjax</span></h3>

<p>在现在追求用户体验的大环境下，主流网站都支持这样的一种浏览方式，当点击一个站内的链接的时候不做页面跳转，而是只是页面刷新变更地址栏目不变。页面变化内容是通过<code>AJAX</code>技术与后端进行交互，但是这样做有一个弊端，就是会破坏浏览器本身的回退功能，随着<code>html5</code>技术规范的推广，<code>history.pushState</code>的实现可以曲线解决这一问题。有人把<code>pjax = pushState + ajax</code>这种技术称之为<a href="https://github.com/defunkt/jquery-pjax">pjax</a>。</p>
<h3><span class="header-link" id="其它">其它</span></h3><table>
<thead>
<tr>
<th>方法</th>
<th>参数描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>history.state</td>
<td>返回当前页面的state对象</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate">window.onpopstate</a><sup id="footnoteUp_3" data-desc="window_onpopstate_desc" class="reference"><a class="footnoteUp" href="#footnoteDo_3">[3]</a></sup></td>
<td>每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件</td>
</tr>
<tr>
<td>URLSearchParams API<sup id="footnoteUp_4" data-desc="URLSearchParams_eericbidelman_desc" class="reference"><a class="footnoteUp" href="#footnoteDo_4">[4]</a></sup></td>
<td>URLSearchParams API用于处理URL之中的查询字符串，即问号之后的部分。没有部署这个API的浏览器，可以用<a href="https://github.com/WebReflection/url-search-params">url-search-params</a>这个垫片库</td>
</tr>
</tbody>
</table>
<p><img src="../static/img/js_history/3.png" alt="state"></p>
<p>URLSearchParams有以下方法，用来操作某个参数。</p>
<table>
<thead>
<tr>
<th>方法</th>
<th>参数描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>has()</td>
<td>返回一个布尔值，表示是否具有某个参数</td>
</tr>
<tr>
<td>get()<sup id="footnoteUp_5" data-desc="URLSearchParams_get_desc" class="reference"><a class="footnoteUp" href="#footnoteDo_5">[5]</a></sup></td>
<td>返回指定参数的第一个值</td>
</tr>
<tr>
<td>getAll()</td>
<td>返回一个数组，成员是指定参数的所有值</td>
</tr>
<tr>
<td>set()</td>
<td>设置指定参数</td>
</tr>
<tr>
<td>delete()</td>
<td>删除指定参数</td>
</tr>
<tr>
<td>append()</td>
<td>在查询字符串之中，追加一个键值对</td>
</tr>
<tr>
<td>toString()</td>
<td>返回整个查询字符串</td>
</tr>
<tr>
<td>keys()</td>
<td>遍历所有参数名</td>
</tr>
<tr>
<td>values()</td>
<td>遍历所有参数值</td>
</tr>
<tr>
<td>entries()</td>
<td>遍历所有参数的键值对</td>
</tr>
</tbody>
</table>
<pre><code class="lang-js"><span class="hljs-keyword">var</span> paramsString = <span class="hljs-string">'q=URLUtils.searchParams&amp;topic=api'</span>;
<span class="hljs-keyword">var</span> searchParams = <span class="hljs-keyword">new</span> URLSearchParams(paramsString);
searchParams.has(<span class="hljs-string">'topic'</span>);
==&gt; <span class="hljs-keyword">true</span>
searchParams.<span class="hljs-keyword">get</span>(<span class="hljs-string">'topic'</span>);
==&gt; <span class="hljs-string">"api"</span>
searchParams.getAll(<span class="hljs-string">'topic'</span>);
==&gt; [<span class="hljs-string">"api"</span>]
searchParams.<span class="hljs-keyword">get</span>(<span class="hljs-string">'foo'</span>);
==&gt; <span class="hljs-keyword">null</span>
searchParams.<span class="hljs-keyword">set</span>(<span class="hljs-string">'foo'</span>, <span class="hljs-number">2</span>);
searchParams.<span class="hljs-keyword">get</span>(<span class="hljs-string">'foo'</span>);
==&gt; <span class="hljs-string">"2"</span>
</code></pre>
<h2><span class="header-link" id="兼容状况">兼容状况</span></h2><h3><span class="header-link" id="桌面浏览器">桌面浏览器</span></h3><pre><code>Session history management ✔ <span class="hljs-number">83.99</span>% ◒ <span class="hljs-number">7.31</span>% [WHATWG Living Standard]
  Method of manipulating the user's browser's session history in JavaScript using history.pushState,
  history.replaceState and the popstate event. #HTML5

  IE ✘ <span class="hljs-number">5.5</span>+ ✔ <span class="hljs-number">10</span>+
  Edge ✔  
  Firefox ✘ <span class="hljs-number">2</span>+ ✔ <span class="hljs-number">4</span>+
  Chrome ✘ <span class="hljs-number">4</span>+ ✔ <span class="hljs-number">5</span>+
  Safari ✘ <span class="hljs-number">3.1</span>+ ◒ <span class="hljs-number">5</span>+ ✔ <span class="hljs-number">6</span>+
  Opera ✘ <span class="hljs-number">9</span>+ ✔ <span class="hljs-number">11.5</span>+

   ⓘ  Older iOS versions and Android <span class="hljs-number">4.0</span><span class="hljs-number">.4</span> claim support, but implementation is too buggy to be useful.
</code></pre><h3><span class="header-link" id="移动浏览器">移动浏览器</span></h3><pre><code>Session history management ✔ <span class="hljs-number">83.99</span>% ◒ <span class="hljs-number">7.31</span>% [WHATWG Living Standard]
  Method of manipulating the user's browser's session history

  IE ✘ <span class="hljs-number">5.5</span>+ ✔ <span class="hljs-number">10</span>+
  Edge ✔  
  Firefox ✘ <span class="hljs-number">2</span>+ ✔ <span class="hljs-number">4</span>+
  Chrome ✘ <span class="hljs-number">4</span>+ ✔ <span class="hljs-number">5</span>+
  Safari ✘ <span class="hljs-number">3.1</span>+ ◒ <span class="hljs-number">5</span>+ ✔ <span class="hljs-number">6</span>+
  Opera ✘ <span class="hljs-number">9</span>+ ✔ <span class="hljs-number">11.5</span>+
  iOS Safari ✘ <span class="hljs-number">3.2</span>+ ◒ <span class="hljs-number">4.2</span><span class="hljs-number">-4.3</span>+ ✔ <span class="hljs-number">5.0</span><span class="hljs-number">-5.1</span>+
  Opera Mini ✘  
  Android Browser ✘ <span class="hljs-number">2.1</span>+ ✔ <span class="hljs-number">2.2</span>+ ✘ <span class="hljs-number">3</span>+ ✔ <span class="hljs-number">4.2</span><span class="hljs-number">-4.3</span>+
  Blackberry Browser ✔  
  Opera Mobile ✘ <span class="hljs-number">10</span>+ ✔ <span class="hljs-number">11.1</span>+
  Chrome for Android ✔  
  Firefox for Android ✔  
  IE Mobile ✔  
  UC Browser for Android ◒  
  Samsung Internet ✔  

   ⓘ  Older iOS versions and Android <span class="hljs-number">4.0</span><span class="hljs-number">.4</span> claim support, but implementation is too buggy to be useful.
</code></pre><h2><span class="header-link" id="references">References</span></h2><section class="footnote-box"><ul><li id="footnoteDo_1" class="footnoteUp"><span class="backlink" data-desc="windows_histroy_backup"><b><a href="#footnoteUp_1">^</a></b></span><span class="reference-text">返回上一页时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页。</span></li><li id="footnoteDo_2" class="footnoteUp"><span class="backlink" data-desc="windows_histroy_go_ie"><b><a href="#footnoteUp_2">^</a></b></span><span class="reference-text">IE支持向go()方法传URL参数。<code>history.go(0)</code>相当于刷新当前页面。</span></li><li id="footnoteDo_3" class="footnoteUp"><span class="backlink" data-desc="window_onpopstate_desc"><b><a href="#footnoteUp_3">^</a></b></span><span class="reference-text">需要注意的是，仅仅调用pushState方法或replaceState方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用JavaScript调用back、forward、go方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。页面第一次加载的时候，在load事件发生后，Chrome和Safari浏览器（Webkit核心）会触发popstate事件，而Firefox和IE浏览器不会。</span></li><li id="footnoteDo_4" class="footnoteUp"><span class="backlink" data-desc="URLSearchParams_eericbidelman_desc"><b><a href="#footnoteUp_4">^</a></b></span><span class="reference-text"><a href="https://developers.google.com/web/updates/2016/01/urlsearchparams?hl=en">Eric Bidelman</a></span></li><li id="footnoteDo_5" class="footnoteUp"><span class="backlink" data-desc="URLSearchParams_get_desc"><b><a href="#footnoteUp_5">^</a></b></span><span class="reference-text">如果真值为假返回<code>null</code>,但是Firefox返回空字符串。</span></li></ul></section>`,
    kcFileId: '123',
    kcFileName: 'abc',
    kcFileAddr: '1234',
    description: 'description',
    keyWorlds: 'keyWorlds'
  });
});
router.get('/waterChestnut', function(req, res, next) {
  res.render('page/waterChestnut', {
    content: `<h1><span class="header-link" id="飘尘">飘尘</span></h1><pre><code>风中的飞尘，
断想它的梦，
梦中是桃园仙境：
女织男耕，
老怡童庆，
没有烽燧的硝烟，
没有勾心斗角的残破心灵

风中的飞尘，
不甘微小而被遗忘，
经历太多的人事：
奸佞、忠义或是真情至死不渝。
飞尘不禁辛酸，
泪水飘洒尘世，
又有谁知道
天降的雨
是飞尘的哭泣！

风中的飞尘
没有可寻的踪迹，
无从知晓起始，
无法预知终极，
漫无目的
注定孤独今世
</code></pre><p><em>2006年02月16日</em></p>`,
    kcFileId: '123',
    kcFileName: 'abc',
    kcFileAddr: '1234',
    description: 'description',
    keyWorlds: 'keyWorlds'
  });
});
router.get('/longan', function(req, res, next) {
  res.render('page/longan', {
    content: `<h1><span class="header-link" id="1625行，解开-underscore.js-的面纱">1625行，解开 underscore.js 的面纱</span></h1><hr>
    <p>一直想写一篇这样的文章，于是心动不如行动，这里选择的是 Underscore.js 1.8.3 版本，源码注释加在一起1625行。</p>
    <ul>
    <li>Underscore.js 1.8.3</li>
    <li><a href="http://underscorejs.org">http://underscorejs.org</a></li>
    <li>(c) 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters &amp; Editors Underscore may be freely distributed under the MIT license.</li>
    </ul>
    <pre><code class="lang-js">(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    </code></pre>
    <p>这里我们首先看到的是一个闭包，概念不再熬述，诸君有意详勘闭包的概念，请移步 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures">Closures</a>。源码如下：</p>
    <p>这里如果这里有 this 那么一定是指向 window，即：</p>
    <blockquote>
    <p>Window {external: Object, chrome: Object, document: document, speechSynthesis: SpeechSynthesis, caches: CacheStorage…}</p>
    </blockquote>
    <p>window 具有的众多属性中就包含了 self 引用其自身，根据javascript的运算符执行顺序 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators">Expressions and operators</a>：</p>
    <ul>
    <li>. [] ()                                字段访问、数组下标、函数调用以及表达式分组</li>
    <li>++ -- - ~ ! delete new typeof void    一元运算符、返回数据类型、对象创建、未定义值</li>
    <li>* / %                                乘法、除法、取模</li>
    <li>+ - +                                加法、减法、字符串连接</li>
    <li>&lt;&lt; &gt;&gt; &gt;&gt;&gt;                                移位</li>
    <li>&lt; &lt;= &gt; &gt;= instanceof                    小于、小于等于、大于、大于等于、instanceof</li>
    <li>== != === !==                            等于、不等于、严格相等、非严格相等</li>
    <li>&amp;                                        按位与</li>
    <li>^                                        按位异或</li>
    <li>|                                        按位或</li>
    <li>&amp;&amp;                                    逻辑与</li>
    <li>||                                    逻辑或</li>
    <li>?:                                    条件</li>
    <li>=                                        赋值、运算赋值</li>
    <li>,                                        多重求值</li>
    </ul>
    <pre><code class="lang-js">    <span class="hljs-built_in">var</span> root = typeof <span class="hljs-built_in">self</span> == <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-built_in">self</span>.<span class="hljs-built_in">self</span> === <span class="hljs-built_in">self</span> &amp;&amp; <span class="hljs-built_in">self</span> || typeof <span class="hljs-built_in">global</span> == <span class="hljs-string">'object'</span>
        &amp;&amp; <span class="hljs-built_in">global</span>.<span class="hljs-built_in">global</span> === <span class="hljs-built_in">global</span> &amp;&amp; <span class="hljs-built_in">global</span> || this;
    </code></pre>
    <p>这里首先判断的是存在 self 或者 node 环境下的全局变量 global，然后复制给 root，作为根对象。</p>
    <pre><code class="lang-js">    <span class="hljs-built_in">var</span> previousUnderscore = root.<span class="hljs-symbol">_</span>;
    </code></pre>
    <p>previousUnderscore，从字面上理解就是“以前的 underscore”，说实话我并没理解这个赋值的用意，最开始以为是用来做判断全局 window是否已经存在 window.<em> 这个对象，然后通过判断 previousUnderscore 用来避免 window.</em> 污染 underscore 引起命名冲突，但是从头到尾只有一个地方用到了 previousUnderscore，即（1352行）：</p>
    <blockquote>
    <pre><code>  _.noConflict = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
          root._ = previousUnderscore;
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
        };
    </code></pre></blockquote>
    <p>在外部可执行  <code>var underscore_cache = _.noConflict();</code> 用来重新定义 underscore 命名，很简单也很巧妙，noConflict 方法内将 <code>root._</code> 也就是 <code>window._</code> 重新定义为 previousUnderscore （previousUnderscore = undefined），而 noConflict 是<code>_</code>的一个属性方法，所以 this 指向其自身（41行），即将 <code>_</code> 赋值给了 underscore_cache。</p>
    <blockquote>
    <pre><code>   <span class="hljs-keyword">var</span> _ = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj)</span> </span>{
          <span class="hljs-keyword">if</span> (obj <span class="hljs-keyword">instanceof</span> _) <span class="hljs-keyword">return</span> obj;
          <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> _)) <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> _(obj);
          <span class="hljs-keyword">this</span>._wrapped = obj;
        };
    </code></pre></blockquote>
    <pre><code class="lang-js">    <span class="hljs-keyword">var</span> ArrayProto = <span class="hljs-keyword">Array</span>.prototype, ObjProto = <span class="hljs-keyword">Object</span>.prototype;
    </code></pre>
    <p>这两句很简单，就是将原生 JAVASCRIPT 的 Array 和 Object 对象的 prototype 缓存，这样做的好处是使用 push、slice、toString等方法的代码行数会减少、减少 JAVASCRIPT 遍历等等，更具体的介绍会在下面讲解，不要心急。</p>
    <pre><code class="lang-js">    <span class="hljs-keyword">var</span> SymbolProto = <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Symbol</span> !== <span class="hljs-string">'undefined'</span> ? <span class="hljs-built_in">Symbol</span>.prototype : <span class="hljs-literal">null</span>;
    </code></pre>
    <p>2009年的 ES5 规定了六种语言类型：Null Undefined Number Boolean  String Object，详见<a href="https://www.w3.org/html/ig/zh/wiki/ES5/%E7%B1%BB%E5%9E%8B">ES5/类型</a> 和 <a href="https://www.w3.org/html/ig/zh/wiki/ES5/conversion">ES5/类型转换与测试</a>。新出台的 ES6 则规定，包括六种原始类型：Null Undefined Number Boolean String 和 Symbol，还有一种 Object，详见<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures">JavaScript 数据类型和数据结构</a>。新增加的 Symbol 很早就已经提出，其具体概念这里不再复述请移步参考 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol">Symbol</a> ，得益于 <a href="https://www.w3.org/html/ig/zh/wiki/ES6">ES6</a> 的渐渐普及，客户端浏览器也有很多已经支持 Symbol，比如 Firefox v36+ 和 Chrome v38+ 等，具体参考 <a href="http://kangax.github.io/compat-table/es6/">ES6 支持情况</a>，如果大家对 ES6 想要深入了解可以看 <a href="https://hacks.mozilla.org/category/es6-in-depth/">ES6 In Depth</a> 这篇文章和 <a href="http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts">ES6草案</a>，说实话我的水平有限这份草案还没有读懂（<em>+﹏+</em>），如果想要进一步为 ES6 普及贡献自己的力量 <a href="https://www.w3.org/html/ig/zh/wiki/ES6#.E7.B1.BB.E5.9E.8B">ES6 WIKI</a> 的编写是一个蛮好的选择。</p>
    <p>回归正题，上述代码的目的显而易见就是判断客户端是否支持 Symbol，支持则缓存 Symbol.prototype 原型链，不支持则赋值为 Null，三元运算符的灵活运用是判断一个人语言到达一个阶段的标识，这句话有点武断，但是算的上肺腑之言，要熟悉且灵活运用它。</p>
    <pre><code class="lang-js">    var <span class="hljs-attr">push</span> = ArrayProto.push,
            <span class="hljs-attr">slice</span> = ArrayProto.slice,
            <span class="hljs-attr">toString</span> = ObjProto.<span class="hljs-built_in">toString</span>,
            <span class="hljs-attr">hasOwnProperty</span> = ObjProto.hasOwnProperty;
    </code></pre>
    <p>这里是简单缓存了 push、slice、toString、hasOwnProperty 四个方法。</p>
    <pre><code class="lang-js">    <span class="hljs-keyword">var</span> nativeIsArray = <span class="hljs-keyword">Array</span>.isArray,
            nativeKeys = <span class="hljs-keyword">Object</span>.keys,
            nativeCreate = <span class="hljs-keyword">Object</span>.create;
    </code></pre>
    <p>这里就比较有意思了，Array.isArray(element) 是 ES5 后来新增的静态函数，用来判断一个对象是不是数组，具体描述可见 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray">Array.isArray()</a> 和 Array.isArray 函数 (JavaScript)：<code>https://msdn.microsoft.com/zh-cn/library/ff848265(v=vs.94).aspx</code>，我一点都不喜欢微软，就比如现在我想粘一个微软的网址，但是它的网址里面居然有<code>()</code>，以至于我必须把网址贴到代码框里才能保证不出现错误ヽ(ˋДˊ)ノ。Object.keys 用于返回一个由给定对象的所有可枚举自身属性的属性名组成的数组，<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys">Object.keys()</a>。Object.create 用于创建一个拥有指定原型和若干个指定属性的对象，这一系列的函数方法都可以在 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a> 处了解详情。同时这里面有些内容可以参考 <a href="https://es5.github.io/">Annotated ECMAScript 5.1</a>，有兴趣的同学可以看一看，雾里探花，蛮有趣的。</p>
    <pre><code class="lang-js">      <span class="hljs-keyword">var</span> Ctor = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{};
    </code></pre>
    <p>ctor 英文译为男星，或者我的百度翻译打开方式不对，翻译错了？？？，实际上就是一个空的方法，这种写法很常见，一般用于和 call、apply、argument 等配合使用，在 Underscore.js 中作者并没有上述的用法，只是用 Ctor 这个函数扩展了自身的 prototype，将一些函数方法绑定到自身作为一个 return function，具体细节后面接触到再详述。</p>
    <pre><code class="lang-js">    <span class="hljs-keyword">var</span> _ = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj)</span> </span>{
            <span class="hljs-keyword">if</span> (obj <span class="hljs-keyword">instanceof</span> _) <span class="hljs-keyword">return</span> obj;
            <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> _)) <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> _(obj);
            <span class="hljs-keyword">this</span>._wrapped = obj;
        };
    </code></pre>
    <p>定义 <code>_</code> 对象，作者的备注是”Create a safe reference to the Underscore object for use below.“，这里我们了解到 <code>_</code> 本身是一个函数，而在 JAVASCRIPT 中函数本身就是对象的一种，所以 Underscore.js 的一系列函数都是作为对象函数绑定到 <code>_</code> 这个函数对象上面的，上面这个函数默认传入一个 obj 参数，可以通过 <code>_(obj)</code> 用来校验 <code>_</code> 是否是 obj 的父类型以此判断继承关系，instanceof的用法详见 <a href="http://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/">JavaScript instanceof 运算符深入剖析</a>，至于 <code>_wrapped</code> 涉及到后面的链式操作，在（887行）一起讲。</p>
    <pre><code class="lang-js">    <span class="hljs-keyword">if</span> (typeof <span class="hljs-keyword">exports</span> != <span class="hljs-string">'undefined'</span> &amp;&amp; !<span class="hljs-keyword">exports</span>.nodeType) {
            <span class="hljs-keyword">if</span> (typeof <span class="hljs-keyword">module</span> != <span class="hljs-string">'undefined'</span> &amp;&amp; !<span class="hljs-keyword">module</span>.nodeType &amp;&amp; <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>) {
                <span class="hljs-keyword">exports</span> = <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = _;
            }
            <span class="hljs-keyword">exports</span>._ = _;
        } <span class="hljs-keyword">else</span> {
            root._ = _;
        }
    </code></pre>
    <p>这是 Node.js 中对通用模块的封装方法，通过对判断 exports 是否存在来决定将局部变量 _ 赋值给exports，顺便说一下 AMD 规范、CMD规范和 UMD规范，Underscore.js 是支持 AMD 的，在源码尾部有定义，这里简单叙述一下：</p>
    <p>amd：<a href="https://github.com/amdjs/amdjs-api/wiki/AMD">AMDJS</a></p>
    <blockquote>
    <pre><code>  define([<span class="hljs-string">'underscore'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(_)</span> </span>{
          <span class="hljs-comment">//todo</span>
      });
    </code></pre></blockquote>
    <p>cmd：<a href="https://github.com/cmdjs/specification/blob/master/draft/module.md">Common Module Definition / draft</a>、<a href="https://github.com/seajs/seajs/issues/242">CMD 模块定义规范</a></p>
    <blockquote>
    <pre><code>  <span class="hljs-keyword">var</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">'underscore'</span>);
      <span class="hljs-built_in">module</span>.exports = _;
    </code></pre></blockquote>
    <p>另一种常见的写法：</p>
    <blockquote>
    <pre><code>  (<span class="hljs-name">function</span> (<span class="hljs-name">root</span>, factory) {
          if (<span class="hljs-name">typeof</span> define === <span class="hljs-symbol">'function</span>' &amp;&amp; define.amd) {
              define([<span class="hljs-symbol">'underscore</span>'], factory)<span class="hljs-comment">;</span>
          } else if (<span class="hljs-name">typeof</span> exports === <span class="hljs-symbol">'object</span>') {
              module.exports = factory(<span class="hljs-name"><span class="hljs-builtin-name">require</span></span>(<span class="hljs-symbol">'underscore</span>'))<span class="hljs-comment">;</span>
          } else {
              root.returnExports = factory(<span class="hljs-name">root._</span>)<span class="hljs-comment">;</span>
          }
      }(<span class="hljs-name">this</span>, function (<span class="hljs-name">$</span>) {
          //todo
      }))<span class="hljs-comment">;</span>
    </code></pre></blockquote>`,
    kcFileId: '123',
    kcFileName: 'abc',
    kcFileAddr: '1234',
    description: 'description',
    keyWorlds: 'keyWorlds'
  });
});
// router.get('/chestnut', function(req, res, next) {
//   res.render('page/chestnut', { title: 'Express' });
// });



module.exports = router;
