# ShimAndPolyfill

shim是一个库,它将一个新的API引入到一个旧的环境中,而且仅靠旧环境中已有的手段实现

polyfill就是一个用在浏览器API上的shim.我们通常的做法是先检查当前浏览器是否支持某个API,如果不支持的话就加载对应的polyfill.然后新旧浏览器就都可以使用这个API了.术语polyfill来自于一个家装产品Polyfilla:

Polyfilla是一个英国产品,在美国称之为Spackling Paste(译者注:刮墙的,在中国称为腻子).记住这一点就行:把旧的浏览器想象成为一面有了裂缝的墙.这些[polyfills]会帮助我们把这面墙的裂缝抹平,还我们一个更好的光滑的墙壁(浏览器)
Paul Irish发布过一个Polyfills的总结页面“HTML5 Cross Browser Polyfills”.es5-shim是一个shim(而不是polyfill)的例子,它在ECMAScript 3的引擎上实现了ECMAScript 5的新特性,而且在Node.js上和在浏览器上有完全相同的表现(译者注:因为它能在Node.js上使用,不光浏览器上,所以它不是polyfill).

polyfill 是 shim 的一种。

shim 是将不同 api 封装成一种，比如 jQuery 的 $.ajax 封装了 XMLHttpRequest 和 IE 用 ActiveXObject 方式创建 xhr 对象；

polyfill 特指 shim 成的 api 是遵循标准的，其典型做法是在IE浏览器中增加 window.XMLHttpRequest ，内部实现使用 ActiveXObject。

在实际中为了方便做对比，会特指 shim 的 api 不是遵循标准的，而是自己设计的。

http://www.ituring.com.cn/article/details/766

http://www.cnblogs.com/fsjohnhuang/p/3712965.html
