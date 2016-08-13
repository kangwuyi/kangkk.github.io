# 1625行，解开 underscore.js 的面纱
---

一直想写一篇这样的文章，于是心动不如行动，这里选择的是 Underscore.js 1.8.3 版本，源码注释加在一起1625行。

 - Underscore.js 1.8.3
 - http://underscorejs.org
 - (c) 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors Underscore may be freely distributed under the MIT license.

这里我们首先看到的是一个闭包，概念不再熬述，诸君有意详勘闭包的概念，请移步 [Closures](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)。源码如下：

    (function() {

这里如果这里有 this 那么一定是指向 window，即：

> Window {external: Object, chrome: Object, document: document, speechSynthesis: SpeechSynthesis, caches: CacheStorage…}

window 具有的众多属性中就包含了 self 引用其自身，根据javascript的运算符执行顺序 [Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)：

- \. [] ()								字段访问、数组下标、函数调用以及表达式分组
- \++ -- - ~ ! delete new typeof void	一元运算符、返回数据类型、对象创建、未定义值
- \* / %								乘法、除法、取模
- \+ - +								加法、减法、字符串连接
- << >> >>>								移位
- < <= > >= instanceof					小于、小于等于、大于、大于等于、instanceof
- == != === !==							等于、不等于、严格相等、非严格相等
- &										按位与
- ^										按位异或
- |										按位或
- &&									逻辑与
- ||									逻辑或
- ?:									条件
- =										赋值、运算赋值
- ,										多重求值


      var root = typeof self == 'object' && self.self === self && self ||
                typeof global == 'object' && global.global === global && global ||
                this;

这里首先判断的是存在 self 或者 node 环境下的全局变量 global，然后复制给 root，作为根对象。

      var previousUnderscore = root._;

previousUnderscore，从字面上理解就是“以前的 underscore”，说实话我并没理解这个赋值的用意，最开始以为是用来做判断全局 window是否已经存在 window._ 这个对象，然后通过判断 previousUnderscore 用来避免 window._ 污染 underscore 引起命名冲突，但是从头到尾只有一个地方用到了 previousUnderscore，即（1352行）：

>       _.noConflict = function() {
>           root._ = previousUnderscore;
>           return this;
>         };

在外部可执行  `var underscore_cache = _.noConflict();` 用来重新定义 underscore 命名，很简单也很巧妙，noConflict 方法内将 `root._` 也就是 `window._` 重新定义为 previousUnderscore （previousUnderscore = undefined），而 noConflict 是`_`的一个属性方法，所以 this 指向其自身（41行），即将 `_` 赋值给了 underscore_cache。

>        var _ = function(obj) {
>           if (obj instanceof _) return obj;
>           if (!(this instanceof _)) return new _(obj);
>           this._wrapped = obj;
>         };

      var ArrayProto = Array.prototype, ObjProto = Object.prototype;

这两句很简单，就是将原生 JAVASCRIPT 的 Array 和 Object 对象的 prototype 缓存，这样做的好处是使用 push、slice、toString等方法的代码行数会减少、减少 JAVASCRIPT 遍历等等，更具体的介绍会在下面讲解，不要心急。

	  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

2009年的 ES5 规定了六种语言类型：Null Undefined Number Boolean  String Object，详见[ES5/类型](https://www.w3.org/html/ig/zh/wiki/ES5/%E7%B1%BB%E5%9E%8B) 和 [ES5/类型转换与测试](https://www.w3.org/html/ig/zh/wiki/ES5/conversion)。新出台的 ES6 则规定，包括六种原始类型：Null Undefined Number Boolean String 和 Symbol，还有一种 Object，详见[JavaScript 数据类型和数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)。新增加的 Symbol 很早就已经提出，其具体概念这里不再复述请移步参考 [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) ，得益于 [ES6](https://www.w3.org/html/ig/zh/wiki/ES6) 的渐渐普及，客户端浏览器也有很多已经支持 Symbol，比如 Firefox v36+ 和 Chrome v38+ 等，具体参考 [ES6 支持情况](http://kangax.github.io/compat-table/es6/)，如果大家对 ES6 想要深入了解可以看 [ES6 In Depth](https://hacks.mozilla.org/category/es6-in-depth/) 这篇文章和 [ES6草案](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts)，说实话我的水平有限这份草案还没有读懂（*+﹏+*），如果想要进一步为 ES6 普及贡献自己的力量 [ES6 WIKI](https://www.w3.org/html/ig/zh/wiki/ES6#.E7.B1.BB.E5.9E.8B) 的编写是一个蛮好的选择。

回归正题，上述代码的目的显而易见就是判断客户端是否支持 Symbol，支持则缓存 Symbol.prototype 原型链，不支持则赋值为 Null，三元运算符的灵活运用是判断一个人语言到达一个阶段的标识，这句话有点武断，但是算的上肺腑之言，要熟悉且灵活运用它。

      var push = ArrayProto.push,
          slice = ArrayProto.slice,
          toString = ObjProto.toString,
          hasOwnProperty = ObjProto.hasOwnProperty;

这里是简单缓存了 push、slice、toString、hasOwnProperty 四个方法。

      var nativeIsArray = Array.isArray,
          nativeKeys = Object.keys,
          nativeCreate = Object.create;

这里就比较有意思了，Array.isArray(element) 是 ES5 后来新增的静态函数，用来判断一个对象是不是数组，具体描述可见 [Array.isArray()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) 和 Array.isArray 函数 (JavaScript)：`https://msdn.microsoft.com/zh-cn/library/ff848265(v=vs.94).aspx`，我一点都不喜欢微软，就比如现在我想粘一个微软的网址，但是它的网址里面居然有`()`，以至于我必须把网址贴到代码框里才能保证不出现错误ヽ(ˋДˊ)ノ。Object.keys 用于返回一个由给定对象的所有可枚举自身属性的属性名组成的数组，[Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)。Object.create 用于创建一个拥有指定原型和若干个指定属性的对象，这一系列的函数方法都可以在 [Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 处了解详情。同时这里面有些内容可以参考 [Annotated ECMAScript 5.1](https://es5.github.io/)，有兴趣的同学可以看一看，雾里探花，蛮有趣的。

      var Ctor = function(){};

ctor 英文译为男星，或者我的百度翻译打开方式不对，翻译错了？？？，实际上就是一个空的方法，这种写法很常见，一般用于和 call、apply、argument 等配合使用，在 Underscore.js 中作者并没有上述的用法，只是用 Ctor 这个函数扩展了自身的 prototype，将一些函数方法绑定到自身作为一个 return function，具体细节后面接触到再详述。

      var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
      };

定义 `_` 对象，作者的备注是”Create a safe reference to the Underscore object for use below.“，这里我们了解到 `_` 本身是一个函数，而在 JAVASCRIPT 中函数本身就是对象的一种，所以 Underscore.js 的一系列函数都是作为对象函数绑定到 `_` 这个函数对象上面的，上面这个函数默认传入一个 obj 参数，可以通过 `_(obj)` 用来校验 `_` 是否是 obj 的父类型以此判断继承关系，instanceof的用法详见 [JavaScript instanceof 运算符深入剖析](http://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/)，至于 `_wrapped` 涉及到后面的链式操作，在（887行）一起讲。

      if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
          exports = module.exports = _;
        }
        exports._ = _;
      } else {
        root._ = _;
      }

这是 Node.js 中对通用模块的封装方法，通过对判断 exports 是否存在来决定将局部变量 _ 赋值给exports，顺便说一下 AMD 规范、CMD规范和 UMD规范，Underscore.js 是支持 AMD 的，在源码尾部有定义，这里简单叙述一下：

amd：[AMDJS](https://github.com/amdjs/amdjs-api/wiki/AMD)

>       define(['underscore'], function (_) {
>           //todo
>       });

cmd：[Common Module Definition / draft](https://github.com/cmdjs/specification/blob/master/draft/module.md)、[CMD 模块定义规范](https://github.com/seajs/seajs/issues/242)

>       var _ = require('underscore');
>       module.exports = _;

另一种常见的写法：

>       (function (root, factory) {
>           if (typeof define === 'function' && define.amd) {
>               define(['underscore'], factory);
>           } else if (typeof exports === 'object') {
>               module.exports = factory(require('underscore'));
>           } else {
>               root.returnExports = factory(root._);
>           }
>       }(this, function ($) {
>           //todo
>       }));

      _.VERSION = '1.8.3';

underscore 版本为 '1.8.3'。

      var optimizeCb = function(func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
          case 1: return function(value) {
            return func.call(context, value);
          };
          case 3: return function(value, index, collection) {
            return func.call(context, value, index, collection);
          };
          case 4: return function(accumulator, value, index, collection) {
            return func.call(context, accumulator, value, index, collection);
          };
        }
        return function() {
          return func.apply(context, arguments);
        };
      };

optimizeCb 翻译成汉语就是优化回调（optimize callback），那么 optimizeCb 是如何优化的呢，我们可以首先看到它传入了三个参数，分别为：func、context、argCount，语义化可知一个是将要优化的 callback function，一个是 context 上下文函数，最后 argCount 是一个 number 类型的数字。`void 0` 的用法很巧妙，这里用 `context === void 0` 判断是否存在上下文环境，也就是第二个参数，其他的一些关于 void 的用法详见 [谈谈Javascript中的void操作符](https://segmentfault.com/a/1190000000474941)。接下来判断 argCount 数字进行相应的操作，其中有 call 和 apply 两个方法，详见 [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 和 [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)。

      var builtinIteratee;

builtinIteratee，内置的 Iteratee （迭代器）。

      var cb = function(value, context, argCount) {
        if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value)) return _.matcher(value);
        return _.property(value);
      };

cb 函数接受三个参数，陆续四个判断，第一个判断 `_.iteratee`，根据 JAVASCRIPT 的上下文，首先 builtinIteratee 为 undefined，然 cb 函数内 builtinIteratee 为 undefined，接下来就是 `_.iteratee = builtinIteratee` 里面的 cb 函数，so...接着第二个判断传入参数是否为空值，如果是则返回 `_.identity` 函数，即当前传入值。第三个判断传入值是方法则执行 optimizeCb 函数。第四个判断如果是对象执行返回一个断言函数，用来判定传入对象是否匹配attrs指定键/值属性。都不匹配最后执行 `_.property`，返回传入的对象的 key 属性。

      _.iteratee = builtinIteratee = function(value, context) {
        return cb(value, context, Infinity);
      };

`_.iteratee` 这个函数一般认为是一个迭代器，这里是作者的主观写法，因为从意义上讲， cb 函数和 `_.iteratee` 函数很相似，甚至说只要稍加改动 cb 完全可以替换掉 `_.iteratee`，作者用 `_.iteratee` 包装 cb 并提供外部访问，虽然实际工作中我们运用 `_.iteratee` 函数并不常见，但如果用的好绝对是一利器，由 underscore.js 源码内部随处可见的 cb()，就知道这一函数的作用之大。在 `underscore` 中 `return cb()` 传入了第三个参数 Infinity，意为参数类型为 Infinity 当执行第三个 cb 函数的 if 判断，执行 `return optimizeCb();` 时就会发挥其作用，Infinity 类型也蛮有意思，有兴趣的同学可以参考 [Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)、[POSITIVE_INFINITY](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY) 和 [NEGATIVE_INFINITY](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY)。

      var restArgs = function(func, startIndex) {
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function() {
          var length = Math.max(arguments.length - startIndex, 0);
          var rest = Array(length);
          for (var index = 0; index < length; index++) {
            rest[index] = arguments[index + startIndex];
          }
          switch (startIndex) {
            case 0: return func.call(this, rest);
            case 1: return func.call(this, arguments[0], rest);
            case 2: return func.call(this, arguments[0], arguments[1], rest);
          }
          var args = Array(startIndex + 1);
          for (index = 0; index < startIndex; index++) {
            args[index] = arguments[index];
          }
          args[startIndex] = rest;
          return func.apply(this, args);
        };
      };

restArgs（其余的参数），什么意思呢，我们看它传入了一个 function 和 一个 Number 类型的 startIndex 标识，首先处理的是 startIndex。三元运算判断 startIndex 是否存在，是则为 `+startIndex`，否则为 `func.length - 1` 即传入 function 中的传入形参的数量减一，举个例子如：

>       var aFunction = function(a,b,c){};
>       function(a){
>       	console.log(a.length)	//3
>       }

这么做的目的是什么呢，我们都知道在一个 Array 中数组排序是从 0 开始，所以就不难理解 `func.length - 1`，但是 `+startIndex` 又是为什么呢，答案是同样是考虑数组排序是从 0 开始。其实在源码中 restArgs 这个内部函数作者还并没有用到过 startIndex 这个参数，如果需要使用那么它的意义在于 return function 的时候处理 function 中的一部分参数，我们现在假设使用了 startIndex 参数，如果 `startIndex >2` 即抛去 arguments[startIndex + 1] 作为传入参数的一步限定，然后将 `arguments[arguments.length - startIndex + 1] ～ arguments[arguments.length]` 封装数组作为 arguments[startIndex] 传入，当然这过程中需要将 `arguments[arguments.length - startIndex + 1] ～ arguments[arguments.length]` 从 arguments 删除，所以源码中运用了多个 Array 用于这一过程其目的就是重组 arguments。而当 `0<startIndex<2` 时，同学们应该很容易理解  switch (startIndex)，这里就不再多说了。
前面说到作者并没有使用 startIndex 这个参数，那么没有 startIndex 是什么情况呢，`startIndex = func.length - 1` 就是说设定 Array 的长度即 arguments 的长度，我们可以看到作者对 restArgs 这个函数很重视，并且好像一直在优化它，作者想要做什么也不得而知，毕竟抛开 startIndex 的话：

>       var restArgs = function(func) {
>         startIndex = func.length - 1;
>         return function() {
>           var rest = Array(1);
>           rest[0] = arguments[startIndex];
>           var args = Array(arguments.length);
>           for (index = 0; index < startIndex; index++) {
>             args[index] = arguments[index];
>           }
>           args[startIndex] = rest;
>           return func.apply(this, args);
>         };
>       };

等同于：

>       var restArgs = function(func) {
>         return function() {
>           return func.apply(this, arguments);
>         };
>       };

作者将5行代码扩展到21行，其实就是为了一个 startIndex 而已。

      var baseCreate = function(prototype) {
        if (!_.isObject(prototype)) return {};
        if (nativeCreate) return nativeCreate(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor;
        Ctor.prototype = null;
        return result;
      };

baseCreate 用于创建一个干净且只存在具有想要其具有 prototype 的函数，第一个判断是否具有 prototype 参数，第二个判断运用 Object.create 创建，余下则是自己运用 Ctor 这个空函数创建，没什么可细说的。

      var property = function(key) {
        return function(obj) {
          return obj == null ? void 0 : obj[key];
        };
      };

property 用于获取 obj 的 key 值，通过 `property（）` 设置 key ，重点是`设置`两个字，有 key 则以没有则创建之。

      var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

设置 一个最大值 MAX_ARRAY_INDEX，`Math.pow(2, 53) - 1` 意为2的53次幂等于9007199254740991，Math 的相关函数参考 [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)，其实我一直觉得 MAX_ARRAY_INDEX 并不用设置这么大的值，Math.pow(2, 16) 就足以。

      var getLength = property('length');

设置 obj 的 key 值并生成函数，等同于：

>   	var getLength = function(obj) {
>      		return obj == null ? void 0 : obj['length'];
>     	};

      var isArrayLike = function(collection) {
        var length = getLength(collection);
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
      };

isArrayLike，使 Obj 具有 length 属性且有值则返回 true，否则返回 false，这是一个判断函数。

      _.each = _.forEach = function(obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        if (isArrayLike(obj)) {
          for (i = 0, length = obj.length; i < length; i++) {
            iteratee(obj[i], i, obj);
          }
        } else {
          var keys = _.keys(obj);
          for (i = 0, length = keys.length; i < length; i++) {
            iteratee(obj[keys[i]], keys[i], obj);
          }
        }
        return obj;
      };

我一直以为 JAVASCRIPT 最精华的就是回调的执行方式，虽然互联网上一些文章总在说回调毁了一切，人云亦云等等，但是回调支撑起了所有的框架，而且回调很优雅用的好可以很舒服，回调不是毁了一切只是因为某些人不恰当的设置回调毁了他自己的代码。在 `_.forEach` 中 iteratee 即回调函数，其中运用了 optimizeCb 优化回调，然后是一个常规判断，这里为什么用 isArrayLike(obj) 而不是 isArray(obj) 来判断是不是数组呢，留下一个思考问题。

      _.map = _.collect = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
        for (var index = 0; index < length; index++) {
          var currentKey = keys ? keys[index] : index;
          results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
      };

封装 map 函数，没什么好说的，参考 [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Mapv)、[Map.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/prototype)、[WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) 用于知识储备，至于作者的 `_.map` 更多的是根据一定的条件遍历 obj 中的元素，与 `_.forEach` 的更大区别是 `_.forEach` 不会对传入的 obj 做改动直接 `return obj`，而 `_.map` 会 `return results`，`return results` 是每个 iteratee 回调的集合。

      var createReduce = function(dir) {
        var reducer = function(obj, iteratee, memo, initial) {
          var keys = !isArrayLike(obj) && _.keys(obj),
              length = (keys || obj).length,
              index = dir > 0 ? 0 : length - 1;
          if (!initial) {
            memo = obj[keys ? keys[index] : index];
            index += dir;
          }
          for (; index >= 0 && index < length; index += dir) {
            var currentKey = keys ? keys[index] : index;
            memo = iteratee(memo, obj[currentKey], currentKey, obj);
          }
          return memo;
        };
        return function(obj, iteratee, memo, context) {
          var initial = arguments.length >= 3;
          return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
        };
      };

createReduce，创建 reduce。关于 reduce 的介绍可见 reduce 方法 (Array) (JavaScript)：`https://msdn.microsoft.com/library/ff679975(v=vs.94).aspx` 和 [array-reduce](http://www.zhangxinxu.com/study/201304/array-reduce.html)，作者这里的 reduce 肯定不是这样，但既然命名为 createReduce，想来也脱不了太多关系。函数中 reducer 首先定义 keys，其值为 obj 的 key 集合或者 false，后面几个语句里都有对于 keys 的三元运算，目的就是排除 obj 不为 Object 的可能性。接下来判断传入 initial，如果传入 initial 为 false 则默认 memo 值为 `keys[keys.length-1] || 0`，之后是 for 循环遍历回调，并返回最后一个回调值。跳出 reducer 函数 return function 的恰恰是引用 reducer 函数的外部接口，于是所有一切都连贯上了，包括 initial 的定义是 arguments 长度大于等于3等等。
我们再重新过一遍代码，在最外部 return 的时候判断 initial，实际上就是再确定是否传入了 memo 和 context，当然最主要的就是 memo，以此来确定在内部 reducer 的时候是否具有初始值。在这里我觉得作者应该对 memo 进行类型判断的，如果是 Number 或者 String 还说的过去，但是如果传入 memo 是 Object 就有点说不过去了，会出错的。比如：

>         _.reduce([1, 2, 3], function(memo, num){ return memo + num; });
>         6
>         _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 1);
>         7
>         _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, '1');
>         "1123"
>         _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, []);
>         "123"
>         _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, [1,2]);
>         "1,2123"
>         _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, {a:1});
>         "[object Object]123"

      _.reduce = _.foldl = _.inject = createReduce(1);

这里就是用 `createReduce` 包装好的 `_.reduce`，不解释。

      _.reduceRight = _.foldr = createReduce(-1);

这里就是用 `createReduce` 包装好的 `_.reduceRight`，与 `_.reduce` 计算顺序相反即从右面向左面开始。

      _.find = _.detect = function(obj, predicate, context) {
        var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
        var key = keyFinder(obj, predicate, context);
        if (key !== void 0 && key !== -1) return obj[key];
      };

`_.find`，讨论这个函数首先要弄懂 `_.findIndex` 和 `_.findKey`，这里我们先简单知道一个是针对数组一个是针对对象，具体的后面读到源码再说。传入值 obj 进行 isArrayLike 判断以此决定 keyFinder 函数，将三个参数包括回调传入 keyFinder 中其中 predicate 回调函数充当迭代器进行真值检测，最后 return obj[key]。

>         var createPredicateIndexFinder = function(dir) {
>             return function(array, predicate, context) {
>               predicate = cb(predicate, context);
>               var length = getLength(array);
>               var index = dir > 0 ? 0 : length - 1;
>               for (; index >= 0 && index < length; index += dir) {
>                 if (predicate(array[index], index, array)) return index;
>               }
>               return -1;
>             };
>           };

以 `_.findIndex` 为例简单介绍一下，`_.findIndex` 是由 createPredicateIndexFinder 包装而成，意义在于返回 predicate 函数内部 return true。

      _.filter = _.select = function(obj, predicate, context) {
        var results = [];
        predicate = cb(predicate, context);
        _.each(obj, function(value, index, list) {
          if (predicate(value, index, list)) results.push(value);
        });
        return results;
      };

`_.filter` 函数与 `_.find` 类似，内部实现较之 `_.find` 更简单些，`_.find` 意为匹配 predicate 回调 return true 唯一就近值，`_.filter` 则是匹配所有值的集合。那么有人说为什么不用 `_.filter()[0]` 取代 `_.find`，理论上二者确实是相同值，但是 `_.filter` 会遍历传参 obj 直至结束，而 `_.find` 则是遍历过程中匹配成功结束遍历，所以某些情况下 `_.find` 优于 `_.filter`。

      _.reject = function(obj, predicate, context) {
        return _.filter(obj, _.negate(cb(predicate)), context);
      };

`_.reject`，通过 `_.negate` 和 `cb` 函数包装 predicate 回调，实际上就是用 `optimizeCb` 优化 predicate function，然后用 `_.negate` 返回与 predicate 相反的 Boolean 类型值，以此获得与 `_.filter` 作用相反的结果集合。

      _.every = _.all = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
          var currentKey = keys ? keys[index] : index;
          if (!predicate(obj[currentKey], currentKey, obj)) return false;
        }
        return true;
      };

`_.every`，我们看源码中的返回值类型为 Boolean 知道这是一个用于真值检测的函数，内部的处理步骤已经很程序化了，首先优化回调函数 predicate，处理传参 obj（根据 Object 或者 Array），回调中接收 `obj[currentKey], currentKey, obj` 三个参数进行 Boolean 判断，当判断失败的时候则 `if (!false) return false;` 结束 for 循环。这个方法看上去很鸡肋，但实际上结合 predicate 回调应用于某些判断处理很给力。

      _.some = _.any = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
          var currentKey = keys ? keys[index] : index;
          if (predicate(obj[currentKey], currentKey, obj)) return true;
        }
        return false;
      };

`_.some`，看源码我们可以知道它基本上与 `_.every` 类似，区别在于 `_.some` 遍历 obj 过程中只要任何一个元素通过 predicate 回调的真值检测就直接立即中断遍历并返回 true。我主观意识上更偏向于 `_.every` 和 `_.some` 用一个相同的基础函数包装再通过判断值构建它们，就像 `createReduce` 函数构成 `_.reduce`、`_.reduceRight` 一样，但是不知道作者为什么没有这样做，可能有其他的考虑吧，这里不再揣测。

      _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
        if (!isArrayLike(obj)) obj = _.values(obj);
        if (typeof fromIndex != 'number' || guard) fromIndex = 0;
        return _.indexOf(obj, item, fromIndex) >= 0;
      };

`_.contains` 用于检查 obj 中是否包含 item 值，我更倾向于这是一个简化版的 `_.some`，如果是我写基础函数可能真的就只有 `_.some` 不用 `_.contains`，但是 Undescore.js 作为一个知名函数库，在代码优化的执行速度上肯定要比我们做的更细。
这里顺便说一下 `_.indexOf` 和 `guard`，`_.indexOf` 是由 createIndexFinder 包装而来，可以理解为数组版的 indexOf，indexOf 概念可参考 [String.prototype.indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) 和 [Array.prototype.indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)。关于 `array.indexOf(searchElement[, fromIndex = 0])`，我这里再说几句，这个 JAVASCRIPT 函数传入1或2个参数，第一个参数为将要进行匹配的内容，可为 Number 可为 String，第二个可选参数为`(需要定向匹配数组中某一值的数组下标值 - array.length)*n，且 n！= 0`，`array.indexOf` 根据这个下标进行定向匹配验证，如果匹配成功则返回值为被匹配值的数组下标，匹配失败则返回 -1。

>         var array = [2, 9, 9,9,9,3,4];
>         undefined
>         array.indexOf(9,2);
>         2
>         array.indexOf(9,3);
>         3
>         array.indexOf(9,4);
>         4
>         array.indexOf(9,5);
>         -1
>         array.indexOf(3,5);
>         5
>         array.indexOf(5);
>         -1
>         array.indexOf(2, -7);
>         0

`_.indexOf` 虽然与 `array.indexOf(searchElement[, fromIndex = 0])` 有所区别，但也有很多相通之处。

      _.invoke = restArgs(function(obj, method, args) {
        var isFunc = _.isFunction(method);
        return _.map(obj, function(value) {
          var func = isFunc ? method : value[method];
          return func == null ? func : func.apply(value, args);
        });
      });

`_.invoke` 用于批量执行方法，前面我们讲了 restArgs 方法，虽然代码很复杂，但目前实际上只应用了如下简化的结构：

>       var restArgs = function(func) {
>         return function() {
>           return func.apply(this, arguments);
>         };
>       };

也就是说 `_.invoke` 抛开闭包的概念之后等同于：

>         function(obj, method, args) {
>             var isFunc = _.isFunction(method);
>             return _.map(obj, function(value) {
>               var func = isFunc ? method : value[method];
>               return func == null ? func : func.apply(value, args);
>             });
>           }

其中 `_.isFunction` 是判断是否为 function，接下来 `_.map` 回调，实际上我很纳闷万一传入的 method 是 obj[i] 对象上没有的方法怎么办，按照 return 的结果如果没有则返回 func 也就是 `null`，总觉得这样返回缺少点什么。

      _.pluck = function(obj, key) {
        return _.map(obj, _.property(key));
      };

` _.pluck` 返回传入 obj 的 key 的集合，或者说 key 的集合有点武断，更具体点说是 obj 下第二层所包含 key 的值的集合，而第一层也就是 obj 可为 Object 或 Array，但 obj 中第二层必须是 Object。这是为什么呢？

>         _.map(obj, function(key) {
>             return (function(obj) {
>               return obj == null ? void 0 : obj[key];
>             })(key);
>           })

在上述简化的代码中我们可以看出 `return obj == null ? void 0 : obj[key];` 的值是 obj[key]，所以第二层只能是 Object。

      _.where = function(obj, attrs) {
        return _.filter(obj, _.matcher(attrs));
      };

`_.where` 很有趣，代码简化之后是：

> 	  _.where = function(obj, attrs) {
>         return _.filter(obj, (function(attrs) {
>             attrs = _.extendOwn({}, attrs);
>             return function(obj) {
>               return _.isMatch(obj, attrs);
>             })(attrs);
>           });
>       };

`_.filter` 我们讲过是获取所有匹配值的集合，而回调中的 `_.extendOwn` 将 attrs 放入空对象 `{}` 中并 return，`_.isMatch`是个断言用于判断 obj 中是否存在 key-value。那么 `_.where` 就是 `_.isMatch` 和 `_.filter` 的加强版，它用于判断一个大的对象数组中存在与传入 attrs 相同的键值对，如果存在则返回匹配目标键值对所在的 Object，并且返回值是一个集合。

>         var list = [{author:"Shakespeare",title:"china"},
>             {author:"Shakespeare",year:1611,title:"china"},
>             {author:"Shakespeare",year:1611,title:"English"},
>             {year:1611,title:"china"}];
>         _.where(list, {author: "Shakespeare", year: 1611});
>         [{"author":"Shakespeare","year":1611,"title":"china"},{"author":"Shakespeare","year":1611,"title":"English"}]

这个方法在处理数据的时候特别有用。

      _.findWhere = function(obj, attrs) {
        return _.find(obj, _.matcher(attrs));
      };

`_.findWhere`，相当于 `_.where()[0]`，即返回结果集合的第一个值，这么设定的目的和 `_.find` 与 `_.filter` 一样，运算更快，遍历到目标马上停止遍历。

      _.max = function(obj, iteratee, context) {
        var result = -Infinity, lastComputed = -Infinity,
            value, computed;
        if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
          obj = isArrayLike(obj) ? obj : _.values(obj);
          for (var i = 0, length = obj.length; i < length; i++) {
            value = obj[i];
            if (value != null && value > result) {
              result = value;
            }
          }
        } else {
          iteratee = cb(iteratee, context);
          _.each(obj, function(v, index, list) {
            computed = iteratee(v, index, list);
            if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
              result = v;
              lastComputed = computed;
            }
          });
        }
        return result;
      };

`_.max` 用来查找 obj 对象数组中某一 key 的最大值的 Object，限定是 key-value 的 value 必须是 Number 类型。`-Infinity` 我更喜欢叫它负无穷，这里的 if true 第一个判断可以忽略了，为什么不讲了呢，因为作者要放弃 `typeof iteratee == 'number' && typeof obj[0] != 'object'` 这种情况，可见其他版本的 Underscore.js。如果忽略 `typeof iteratee == 'number' && typeof obj[0] != 'object'` 的情况则  `_.max` 传参为一个数组，return 为数组中最大值。if false 则进行常规的 `_.each` 代码很简单这里不再讲解。

      _.min = function(obj, iteratee, context) {
        var result = Infinity, lastComputed = Infinity,
            value, computed;
        if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
          obj = isArrayLike(obj) ? obj : _.values(obj);
          for (var i = 0, length = obj.length; i < length; i++) {
            value = obj[i];
            if (value != null && value < result) {
              result = value;
            }
          }
        } else {
          iteratee = cb(iteratee, context);
          _.each(obj, function(v, index, list) {
            computed = iteratee(v, index, list);
            if (computed < lastComputed || computed === Infinity && result === Infinity) {
              result = v;
              lastComputed = computed;
            }
          });
        }
        return result;
      };

`_.min` 真心不用讲了，参考 `_.max`。

      _.shuffle = function(obj) {
        return _.sample(obj, Infinity);
      };

`_.shuffle` 官网释义是`返回一个随机乱序的 list 副本, 使用 Fisher-Yates shuffle 来进行随机乱序.`，`Fisher-Yates shuffle` 是什么鬼，我们这里看到 `_.shuffle` 这个函数用到了 `_.sample`，所以我们先讲 `_.sample`。

      _.sample = function(obj, n, guard) {
        if (n == null || guard) {
          if (!isArrayLike(obj)) obj = _.values(obj);
          return obj[_.random(obj.length - 1)];
        }
        var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
        var length = getLength(sample);
        n = Math.max(Math.min(n, length), 0);
        var last = length - 1;
        for (var index = 0; index < n; index++) {
          var rand = _.random(index, last);
          var temp = sample[index];
          sample[index] = sample[rand];
          sample[rand] = temp;
        }
        return sample.slice(0, n);
      };

`_.sample` 是从一个 obj 中随机返回值，并且返回值受限于 n 这个参数，如果没有传入 n 或者传入了 guard = true 则执行 if 语句，目的是将 obj 判断处理之后返回单一值。这里觉得特鸡肋有木有，也就是说 `_.sample（obj,n,true）` 和`_.sample(obj)` 是一回事。如果按照 `_.sample（obj,n）` 的逻辑执行，依赖是老套路，处理 obj （Object 和 Array），然后 `n = Math.max(Math.min(n, length), 0);` 获得合理的 n 值，前面我们讲到了 `Infinity` 正无穷和 `-Infinity` 负无穷，这段代码利用了 Infinity 的特性包装了 `_.shuffle`函数，关键就是 Infinity 大于所有 Number 数字，即 `Math.min(Infinity, Number)` 等于 Number，好处就是让人眼前一亮，哇，原来代码还可以这样写，坏处就是当单独使用 `_.sample` 函数的 n 大于处理之后的 obj 的长度时并不会报错，而是默认执行 `n=sample.length`，仁者见仁，智者见智吧。后面就是很套路的根据数组下标替换数组内容，当然数组下标是通过 `_.random` 随机的，然后 slice 一刀切数组。

      _.sortBy = function(obj, iteratee, context) {
        var index = 0;
        iteratee = cb(iteratee, context);
        return _.pluck(_.map(obj, function(value, key, list) {
          return {
            value: value,
            index: index++,
            criteria: iteratee(value, key, list)
          };
        }).sort(function(left, right) {
          var a = left.criteria;
          var b = right.criteria;
          if (a !== b) {
            if (a > b || a === void 0) return 1;
            if (a < b || b === void 0) return -1;
          }
          return left.index - right.index;
        }), 'value');
      };

`_.sortBy`，顾名思义这是一个对数组进行排序处理的函数，在原生 JAVASCRIPT 中 sort() 的详情可参考 [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)、[TypedArray.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/sort)。`_.sortBy` 接收三个参数分别为 obj、iteratee 回调和 context，其中 iteratee 与 context 是可选参数。
当传入值只有 obj 时，应该限定 obj 类型为数组且值为 Number，为什么呢，这里涉及到 JAVASCRIPT 对数字字符串的比较的问题了，JAVASCRIPT 在进行字符串比较的时候遵循的是二进制与运算，也就是说并不是数字 length 越长就会大于 length 小的。举个栗子：

>         _.sortBy([1, 2, 3, 4, 5, 6, 8, 7, 11, 13]);
>         [1, 2, 3, 4, 5, 6, 7, 8, 11, 13]
>         _.sortBy(['1', '2', '3', '4', '5', '6', '8', '7', '11', '13']);
>         ["1", "11", "13", "2", "3", "4", "5", "6", "7", "8"]

同学们都很聪明，不用我在说了，言归正传，当只有 obj 一个值且值为 Number，那么默认从左到右从小到大排序，为什么呢，我看下代码，在 `_.pluck` 中代码只做了一件事，就是整理数据，当没有 iteratee 的时候执行 `cb` 函数里的 `if (value == null) return _.identity;` 也就是相当于默认 iteratee function 为 `_.identity` 即 return obj，所以 `_.map` 中回调的 criteria 值即 value。有点绕口，代码起开（假定只有 obj 一个参数）：

>           _.sortBy = function(obj) {
>             var index = 0;
>             return _.pluck(_.map(obj, function(value, key, list) {
>               return {
>                 value: value,
>                 index: index++,
>                 criteria: (function(value, key, list) {
>                     return value;
>                   })(value, key, list);
>               };
>             }).sort(function(left, right) {
>               var a = left.criteria;
>               var b = right.criteria;
>               if (a !== b) {
>                 if (a > b || a === void 0) return 1;
>                 if (a < b || b === void 0) return -1;
>               }
>               return left.index - right.index;
>             }), 'value');
>           };

这样看上去就直白好多。整理完数据之后就是 `arr.sort([compareFunction])` 进行排序，这里不说了。当传入参数有 iteratee 回调的时候，依旧老套路优化回调，然后根据回调函数里面的设定决定 criteria 参数值，criteria 参数是 `arr.sort([compareFunction])` 进行排序的关键标识，so一定要是 Number才行。

      var group = function(behavior, partition) {
        return function(obj, iteratee, context) {
          var result = partition ? [[], []] : {};
          iteratee = cb(iteratee, context);
          _.each(obj, function(value, index) {
            var key = iteratee(value, index, obj);
            behavior(result, value, key);
          });
          return result;
        };
      };

`group` 是一个内部函数，我觉得它最特别在于将回调称之为一个 behavior，为什么呢，因为虽然 behavior function 只能被动接受 `value, index, obj` 三个参数进行数值运算，但作者巧妙的用它结合 group 包装出 `_.groupBy`、`_.indexBy`、`_.countBy`、`_.partition` 四个函数，在实际开发中我们处理数据时可能需要各种适用场景的工具，那么把如何函数写好写活呢，group 给了我很大的启发，言归正传，group 的 behavior 回调是在外部定义，源码到这里并不知道 behavior 是什么东西，所以先一带而过。

      _.groupBy = group(function(result, value, key) {
        if (_.has(result, key)) result[key].push(value); else result[key] = [value];
      });

`_.groupBy` 官网定义`把一个集合分组为多个集合，通过 iterator 返回的结果进行分组. 如果 iterator 是一个字符串而不是函数, 那么将使用 iterator 作为各元素的属性名来对比进行分组.`。

———————— 颓废的分割线 ————————
从昨天到今天状态不佳，昏天黑地的看了两天电影，看到最后都不知道自己在看什么，我需要吐槽一下小米路由器，由于我是 linux 系统，作为 [deiban](https://www.debian.org/) 死忠党来说一台不到两千元的台式机想要链接无线网络，折腾的时间和金钱都不如再填个路由器做中继划算，于是我买了这货 [小米路由器](http://www.mi.com/miwifimini/)，它在路由器模式下还算可以，一但调整到中继模式，这完全就是一个入坑的神展开，啪啪啪的随时无间歇性断网没商量，莫名其妙的就连不上网了，即使连接上网络网速都不如无线的一般有木有，在过去的一段时间里我有 N 次想把这款路由器摔在地上（额，或者摔在墙上），希望大家不要吐槽我两千块都不到的台式主力机，价钱虽然 lower 了点，但性能绝对够用，对于 mac 党们我很希望大家转粉，虽然我也有 mac 但是我平均开机数目大约在 1/（1~2个月）。
写到这里目测大约水了一百多个文字，继续前天的讲解 ╮(╯Д╰)╭ 。
———————— END ————————

官网的意思是什么呢，假如我有一个 obj，那么我可以使用 `_.groupBy` 函数将这个 obj 通过其内部值的某个属性进行分类，而这个属性值的判断也可以通过回调进行扩展断言。那么当 iteratee 为 null 时，`_.groupBy` 默认使用前面的 `group` 函数中的 cb 函数的 `if (value == null) return _.identity;` 处理 iteratee 为空的情况，我来简化一下 `_.groupBy`：

>         _.groupBy = function(obj) {
>            var result = partition ? [[], []] : {};
>            _.each(obj, function(value, index) {
>            	 var key = value;
>                if (_.has(result, key)) result[key].push(value); else result[key] = [value];
>            })
>            return result;
>        }

这样理解是不是浅显很多呢，设置 result 空数组，然后 `_.each` 遍历 obj，满满的都是套路有木有，唯一亮点的地方就是 if 判断是根据 `_.has` 函数确定 result 中是否已经存在 key-value。但是这里面还有一个更深的套路，那就是作者没有对 obj 作进一步处理，所以 `_.groupBy` 函数只能适用于 Array，举个栗子：

>        _.groupBy(['one', 'two', 'three']);
>        {"one":["one"],"two":["two"],"three":["three"]}
>        _.groupBy([{a:'one'}, {b:'two'}, {c:'three'}]);
>        {"[object Object]":[{"a":"one"},{"b":"two"},{"c":"three"}]}

然后我们再说一下 `_.groupBy` 参数有第二个参数的情况，这里可以看出 cb 函数的重要性，它对 iteratee 的类型情况做了细致的判断和处理，我们前面可以知道 cb 函数除了 Null、Function、Object 意外的类型都用 `_.property` 处理，即 生成获取属性值的函数，那么我们传参为数组呢，see ↓↓↓

>        _.groupBy(['one', 'two', 'three'],[1,2,3])
>        {"false":["one","two","three"]}

也就是说作者虽然大才，但是并没有对超出范围的值类型做进一步的处理，也就是说 iteratee 的可选值类型只能为 Function 和 String。当然这并不是错，从工具的角度来讲我们应用函数应该遵守函数创造者设定的规则，超出规则后出现错误并不是说作者的函数一定有问题，也可能是我们太过于调皮了（比如番茄西红柿需要用平底锅来炒，但厨师非要用电饭煲，这是厨师的错还是平底锅生产商的错 ─=≡Σ((( つ•̀ω•́)つ）。
言归正传当传入合理的 iteratee 值时，其实整个函数的重点还是 `group` 函数内部的 `cb` 函数，因为我们可以看源码 `_.groupBy` 上的回调最终是落实到 `cb` 上，将一个函数比作一个公共房间，众多人就是传入传出的参数，那么 cb 就是门禁卡识别每个人的身份并发身份牌。如果 iteratee 是 String 则用 `_.property` 处理恰到好处（生成获取属性值的函数），如果是 Function 也只是在 `if (_.has(result, key)) result[key].push(value); else result[key] = [value];` 之前通过回调生成相应的 key 值。

      _.indexBy = group(function(result, value, key) {
        result[key] = value;
      });

官网释义 `给定一个list，和 一个用来返回一个在列表中的每个元素键 的iterator 函数（或属性名）， 返回一个每一项索引的对象。`，关键代码参考 `_.groupBy`，二者的二区别也之有一行代码，理解起来并不难，我就不再水文字了。

      _.countBy = group(function(result, value, key) {
        if (_.has(result, key)) result[key]++; else result[key] = 1;
      });

官网释义 `排序一个列表组成一个组，并且返回各组中的对象的数量的计数。类似groupBy，但是不是返回列表的值，而是返回在该组中值的数目。`，其实就是对匹配成功的元素计数。

      var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;

reStrSymbol 用于正则函数，这一块我也不是很熟悉，但是我找到了两篇文章做了参考，[Unicode Regular Expressions, Surrogate Points and UTF-8](http://unicode.org/pipermail/unicode/2014-June/000679.html)、
[Re: Java char and Unicode 3.0+ (was:Canonical equivalence in rendering: mandatory or recommended?)](http://www.unicode.org/mail-arch/unicode-ml/y2003-m10/0216.html)、[unicode](http://unicode.org/)。另外知乎上也有人对这句话做了判断：

>        [^\ud800-\udfff] 普通的 BMP 字符，表示不包含代理对代码点的所有字符
>        [\ud800-\udbff][\udc00-\udfff] 成对的代理项对，表示合法的代理对的所有字符
>        [\ud800-\udfff] 未成对的代理项字，表示代理对的代码点（本身不是合法的Unicode字符）

以上仅供参考，我也不是很清楚，等我做好这方面功课的时候再重新说这个话题。

      _.toArray = function(obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (_.isString(obj)) {
          return obj.match(reStrSymbol);
        }
        if (isArrayLike(obj)) return _.map(obj, _.identity);
        return _.values(obj);
      };

官网说 `把list(任何可以迭代的对象)转换成一个数组，在转换 arguments 对象时非常有用`，并给出一个 `(function(){ return _.toArray(arguments).slice(1); })(1, 2, 3, 4);`，说心里话每当看到 arguments 的时候我第一个印象是 `Array.prototype.slice.call(arguments, indexes);`，这里作者对待 Array 的原理同样是这个。`_.toArray` 函数本身没有重点，无非就是根据字符串、数组、对象进行数组转换，需要注意的是当转换 Object 的时候会忽略 key-value 的 key，只单独把 value 放到数组中，另外就是 `if (_.isArray(obj))` 和 `if (isArrayLike(obj))`，顾名思义第一个是判断数组，第二个难道是考虑到 `{'length':[1,2,3,4]}` 这种数据结构的情况？

      _.size = function(obj) {
        if (obj == null) return 0;
        return isArrayLike(obj) ? obj.length : _.keys(obj).length;
      };

`_.size` 用于返回传入参数的长度，包括但不限于 Object、Array 、 String 和 Function，Function 返回的是 Function 中传入参数的个数（arguments）。另外 Map 这里有个坑，Map返回值是12，众所周知 Map是一个大的对象，所以返回值是它的12个基本属性的个数。

      _.partition = group(function(result, value, pass) {
        result[pass ? 0 : 1].push(value);
      }, true);

`_.partition` 是第四个用 group 函数包装的函数，用来对传入 obj 做判断时返回符合回调断言的结果集以及不符合的结果集，从 `result[pass ? 0 : 1].push(value)` 这里就可见一斑了，也就是说 group 的第三个传参 partition 也就是为了 `_.partition` 而存在。partition 使 result 的设定为固定的 `[[][]]`，这种写法我觉得并不是看上去最优雅地，理想情况是最好不存在第三个参数才对，但这一定是相对节约性能的，面对可节约的性能怎么取舍已经很清楚了。

      _.first = _.head = _.take = function(array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[0];
        return _.initial(array, array.length - n);
      };

`_.first` 用于返回数组中从左到右指定数目 n 的结果集，传入 array、n、guard 三个参数中 array 只能为 Array，当 `n = null` 时返回数组第一个元素，这里需要讲解的是 `_.initial` 函数是与 `_.first` 完全对立的函数，它用于返回数组中从左到右指定数目 `Array.length - n` 的结果集。

      _.initial = function(array, n, guard) {
        return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
      };

那么它是如何实现的呢，依然是应用数组 Array 的 `Array.prototype.slice.call(array, start, end);` 实现，这个概念请参看：[Array.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)。

      _.last = function(array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[array.length - 1];
        return _.rest(array, Math.max(0, array.length - n));
      };

`_.last` 是返回数组中从右到左指定数目 n 的结果集。实现原理依旧 `Array.prototype.slice.call(array, start, end);`

      _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, n == null || guard ? 1 : n);
      };

`_.rest` 用于返回数组中从右到左指定数目 `Array.length - n` 的结果集。

      _.compact = function(array) {
        return _.filter(array, Boolean);
      };
`_.compact`，我喜欢称它为过滤器，过滤坏的数据，那么什么样的数据为坏数据呢，我们可以看下 `_.filter`，前面讲 `_.filter` 接收三个参数 `obj, predicate, context`，其中 predicate 依旧由 cb 处理，那么这里 `_.compact` 传的 predicate 是 `Boolean = function Boolean() { [native code] }`，这是一个 JAVASCRIPT 内置的函数用于 Boolean 判断，我们可以参考 [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 和 [Boolean data type](https://en.wikipedia.org/wiki/Boolean_data_type)。那么重点来了，什么的值会是 Boolean 函数断言为 false 呢，答案就是 `false, 0, "", null, undefined, NaN`，这个可不是我瞎说或者 copy 官网，我是有理论依据的（vˍv），当当当，看这里 [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)。

      var flatten = function(input, shallow, strict, output) {
        output = output || [];
        var idx = output.length;
        for (var i = 0, length = getLength(input); i < length; i++) {
          var value = input[i];
          if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
            if (shallow) {
              var j = 0, len = value.length;
              while (j < len) output[idx++] = value[j++];
            } else {
              flatten(value, shallow, strict, output);
              idx = output.length;
            }
          } else if (!strict) {
            output[idx++] = value;
          }
        }
        return output;
      };

flatten 传入四个参数，`input, shallow, strict, output`，其中我们可以通过 flatten 内部的 for 循环中 `length = getLength(input);` 知道 input 数据类型为 Array。然后通过对 `shallow, strict` 两个 Boolean 型变量的控制执行相应的数据处理方式。比如 shallow 为 false 会一直执行 `flatten(value, shallow, strict, output);` 和 `output[idx++] = value;` 对多维数组进行一维数组的转换。

      _.flatten = function(array, shallow) {
        return flatten(array, shallow, false);
      };

`_.flatten` 函数用于对多维度数组进行扁平化处理，即将任意维数的数组转换为一维数组，上面已经说到了这个的实现方式。

      _.without = restArgs(function(array, otherArrays) {
        return _.difference(array, otherArrays);
      });

`_.without` 用于删除数组中的某些特定元素。它由 `_.difference` 构成。

      _.uniq = _.unique = function(array, isSorted, iteratee, context) {
        if (!_.isBoolean(isSorted)) {
          context = iteratee;
          iteratee = isSorted;
          isSorted = false;
        }
        if (iteratee != null) iteratee = cb(iteratee, context);
        var result = [];
        var seen = [];
        for (var i = 0, length = getLength(array); i < length; i++) {
          var value = array[i],
              computed = iteratee ? iteratee(value, i, array) : value;
          if (isSorted) {
            if (!i || seen !== computed) result.push(value);
            seen = computed;
          } else if (iteratee) {
            if (!_.contains(seen, computed)) {
              seen.push(computed);
              result.push(value);
            }
          } else if (!_.contains(result, value)) {
            result.push(value);
          }
        }
        return result;
      };

`_.uniq` 是数组去重，实现原理是如果 isSorted 及后面元素省略，那么  _.uniq 简化为：

>         _.uniq = _.unique = function(array) {
>             context = null;
>             iteratee = null;
>             isSorted = false;
>             var result = [];
>             var seen = [];
>             for (var i = 0, length = getLength(array); i < length; i++) {
>               var value = array[i];
>               if (!_.contains(result, value)) {
>                 result.push(value);
>               }
>             }
>             return result;
>           };

我们可以看到其核心代码只有 `if (!_.contains(result, value))`，用于判断数组中是否包含其值，以此达到数组去重的目的。是这里我想说的是 context、iteratee、isSorted 变成了未定义的参数，作者没有处理它会在这种情况下变成全局污染。
接下来我们说一下传入 `array, isSorted, iteratee` 三个参数的情况，我们已经知道 isSorted 默认为 false，代表去重，那么如果定义 isSorted 为 true 则就是不去重，如果 isSorted 是回调函数，则默认内部重新定义 isSorted 为 false，并将回调函数赋给 iteratee，然后很悲剧的 iteratee 参数依然是没有 var 过的，又污染了啊(‧_‧？) 。大致就是这酱了。

      _.union = restArgs(function(arrays) {
        return _.uniq(flatten(arrays, true, true));
      });

`_.union` 对多个一维数组进行并运算，实际上就是加强版的 `_.uniq`。在代码中作者首先用 flatten 函数处理参数，之前我们说到 flatten 是用于多个多维数组进行一位转换，实际上就是要把 arrays 转换。这里有同学可能问道 flatten 直接收一个 Array 剩下的值是 Boolean 啊，那么使用 `_.union` 的时候是一次性传入 n 个 Array（如这样：`_.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);`），说不通啊。所以我要说的是 restArgs 这个函数，将传入参数转换为一个数组进行 `func.apply(this, args)` 到 restArgs 的回调函数 `function(arrays) {}` 中，以此达到 flatten 函数 arrays 接到的是一个一维数组的集合。最后通过 `_.uniq` 函数对数组进行处理。

      _.intersection = function(array) {
        var result = [];
        var argsLength = arguments.length;
        for (var i = 0, length = getLength(array); i < length; i++) {
          var item = array[i];
          if (_.contains(result, item)) continue;
          var j;
          for (j = 1; j < argsLength; j++) {
            if (!_.contains(arguments[j], item)) break;
          }
          if (j === argsLength) result.push(item);
        }
        return result;
      };

`_.intersection` 用于获取多个一维数组的相同数据的集合，即交集。又是一番对 Array 的 for 啊 for 啊 for,然后 if 然后 push，相信大家这么聪明，不用多说了，因为这个函数很直白，没太多可讲的。

      _.difference = restArgs(function(array, rest) {
        rest = flatten(rest, true, true);
        return _.filter(array, function(value){
          return !_.contains(rest, value);
        });
      });

`_.difference` 函数的实现与 `_.union` 类似，都是通过 restArgs 对 n 个传参进行数组转变，然后赋给回调函数，区别在于这个函数可能更加复杂，它首先 restArgs 回调写了两个传参 `array, rest`，但实际上 rest 是 undefined，之后在回调内部给 rest 赋值为 flatten 函数处理之后的数组，即扁平化后的一维数组。因为 restArgs 函数只有一个 function 回调，所以内部执行 `return func.call(this, arguments[0], rest);`，返回的是第一个数组和其他数组的集合，即 `array, rest`。

      _.unzip = function(array) {
        var length = array && _.max(array, getLength).length || 0;
        var result = Array(length);
        for (var index = 0; index < length; index++) {
          result[index] = _.pluck(array, index);
        }
        return result;
      };

`_.unzip` 用于将多个数组中元素按照数组下标进行拼接，只接收一个二维数组，返回值同样是一个二维数组。

      _.zip = restArgs(_.unzip);

`_.zip` 与 `_.unzip` 不同之处在于它可以传入不定的一维数组参数然后通过 restArgs 函数转换实现 `_.unzip` 传参的效果。

      _.object = function(list, values) {
        var result = {};
        for (var i = 0, length = getLength(list); i < length; i++) {
          if (values) {
            result[list[i]] = values[i];
          } else {
            result[list[i][0]] = list[i][1];
          }
        }
        return result;
      };

`_.object` 用于将数组转换成对象。

      var createPredicateIndexFinder = function(dir) {
        return function(array, predicate, context) {
          predicate = cb(predicate, context);
          var length = getLength(array);
          var index = dir > 0 ? 0 : length - 1;
          for (; index >= 0 && index < length; index += dir) {
            if (predicate(array[index], index, array)) return index;
          }
          return -1;
        };
      };

createPredicateIndexFinder 这个函数适用于生成 `_.findIndex` 之类的函数，当我们看到 `return index;` 的是后就已经可以知道，其核心是与数组下标有关。

      _.findIndex = createPredicateIndexFinder(1);

`_.findIndex` 函数由 createPredicateIndexFinder 包装而成，我们可以看到它的默认传值是 `1`，也就是：

>         _.findIndex = function(array, predicate, context) {
>            predicate = cb(predicate, context);
>            for (var index >= 0; index < getLength(array); index += 1) {
>                if (predicate(array[index], index, array)) return index;
>            }
>            return -1;
>        };

其中 predicate 是回调函数接收 `array[index], index, array` 三个值用于 Boolean 判断，最终结果是返回符合规则的数组中的第一条数据的数组下标。

      _.findLastIndex = createPredicateIndexFinder(-1);

`_.findLastIndex` 顾名思义就是返回数组中符合规则的最后一条数据的下标，说直白了就是遍历数组的时候从右往左而已。

      _.sortedIndex = function(array, obj, iteratee, context) {
        iteratee = cb(iteratee, context, 1);
        var value = iteratee(obj);
        var low = 0, high = getLength(array);
        while (low < high) {
          var mid = Math.floor((low + high) / 2);
          if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
        }
        return low;
      };

`_.sortedIndex` 官网解释说 `使用二分查找确定value在list中的位置序号，value按此序号插入能保持list原有的排序。`，很绕口，这里我们需要注意的是如果进行 `_.sortedIndex` 查找这个特定的序列号，一定要事先将 array 进行按需排序。

      var createIndexFinder = function(dir, predicateFind, sortedIndex) {
        return function(array, item, idx) {
          var i = 0, length = getLength(array);
          if (typeof idx == 'number') {
            if (dir > 0) {
              i = idx >= 0 ? idx : Math.max(idx + length, i);
            } else {
              length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
            }
          } else if (sortedIndex && idx && length) {
            idx = sortedIndex(array, item);
            return array[idx] === item ? idx : -1;
          }
          if (item !== item) {
            idx = predicateFind(slice.call(array, i, length), _.isNaN);
            return idx >= 0 ? idx + i : -1;
          }
          for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
            if (array[idx] === item) return idx;
          }
          return -1;
        };
      };

createIndexFinder，看命名就可以知道依旧与数组下标有关。我们可以看到数据处理的一个关键是 idx，它可能是一个数字也可能是一个字符串或者对象。当它是 Number 的时候遵循 idx 是限制查找范围的数组下标规则，如果它是其他的则使用 sortedIndex 函数查找到 idx 的数组下标再岁数组查找范围进行限定。

      _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);

`_.indexOf` 函数与 `_.findIndex` 区别在于 `_.findIndex` 需要查找的数据可能存在于数组中也可能不存在数组中，而 `_.indexOf` 的 predicateFind 一定是数组中的元素。同时也用 `array, item, idx` 三个参数中的 idx 限定开始查找的范围。

      _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

`_.lastIndexOf` 查找数组中的符合结果的最后条数据的数组下标。

      _.range = function(start, stop, step) {
        if (stop == null) {
          stop = start || 0;
          start = 0;
        }
        if (!step) {
          step = stop < start ? -1 : 1;
        }
        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);
        for (var idx = 0; idx < length; idx++, start += step) {
          range[idx] = start;
        }
        return range;
      };

`_.range` 用于生成一个有序的数组，通过 start 和 stop 限定数组范围，通过 step 限定差值。

      _.chunk = function(array, count) {
        if (count == null || count < 1) return [];
        var result = [];
        var i = 0, length = array.length;
        while (i < length) {
          result.push(slice.call(array, i, i += count));
        }
        return result;
      };

` _.chunk`，这个函数目前官网并没有释义，估计作者忘记加进去了吧，我们看到 chunk 很自然的就应该想到 stream 的概念，这里也差不多，只不过拆分的不限定是 Buffer 数组，` _.chunk` 传入两个参数 Array 以及 count，其中 count 用来限定拆分出的每一组的大小，举个栗子：

>        _.chunk([1,2,3,4,5,6,7,8,9], 1)
>        [[1],[2],[3],[4],[5],[6],[7],[8],[9]]
>        _.chunk([1,2,3,4,5,6,7,8,9], 2)
>        [[1,2],[3,4],[5,6],[7,8],[9]]

然而但凡对 stream 的概念有所了解都知道这个函数吧，没什么特殊的地方。

      var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
        if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
        var self = baseCreate(sourceFunc.prototype);
        var result = sourceFunc.apply(self, args);
        if (_.isObject(result)) return result;
        return self;
      };

executeBound 用来构成 `_.bind` 和 `_.partial` 两个函数，主要针对的是为了将函数调用模式更改为构造器调用和方法调用。

      _.bind = restArgs(function(func, context, args) {
        if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
        var bound = restArgs(function(callArgs) {
          return executeBound(func, bound, context, this, args.concat(callArgs));
        });
        return bound;
      });

也许我们可以参考下 [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)，`_.bind` 函数这个需要仔细讲一下了，先化简：

>         _.bind = function(func, context, args) {
>             var length = arguments.length - 2;
>             args = Array(length);
>             for (var index = 0; index < length; index++) {
>                 args[index] = arguments[index + startIndex];
>             }
>             if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
>             var bound = function(args_2){
>                 args_2 = Array(arguments.length);
>                 for (var index = 0; index < arguments.length; index++) {
>                     args_2[index] = arguments[index];
>                 }
>                 (function(sourceFunc, boundFunc, context, callingContext, args) {
>                     if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
>                     var self = baseCreate(sourceFunc.prototype);
>                     var result = sourceFunc.apply(self, args);
>                     if (_.isObject(result)) return result;
>                     return self;
>               })(func, bound, context, this, args.concat(args_2));
>             };
>             return bound;
>         };

这样看上去是不是直白很多，官网给它的定义是：`绑定函数 function 到对象 object 上, 也就是无论何时调用函数, 函数里的 this 都指向这个 object.任意可选参数 arguments 可以传递给函数 function , 可以填充函数所需要的参数,这也被称为 partial application。对于没有结合上下文的partial application绑定，请使用partial。`，怎么听怎么别扭，我们可以这样理解：`_.bind` 函数是为其传参中的 function 的 this 上绑定相应对象属性，并且同时进行 function 的参数传入，而其中最关键的就是在执行这一系列动作的同时将传入参数 context 绑定到了指向它的 Function 对象本身的 this 身上（可参考函数调用模式与方法调用模式的区别）。官网有个栗子：

>        var func = function(greeting){ return greeting + ': ' + this.name };
>        func = _.bind(func, {name: 'moe'}, 'hi');
>        func();
>        {'hi: moe'}

实际上呢它等同于：

>        var func = _.bind(function(greeting){
>        		return greeting + ': ' + this.name;
>        	},
>        	{name: 'moe'},
>        	'hi'
>        );
>        func();
>        {'hi: moe'}

结合前面简化的 `_.bind` 代码示例可知这个函数的核心思想就是先通过 `_.bind` 初始化的时候优化第3+个参数 args，为什么叫 `3+` 呢，因为从第三个参数开始，可能是不限定的参数数量，所以从第三个开始到最后一个参数同一处理为一个数组 args。
紧接着就是执行刚才初始化过后的函数了，当 `func();` 的时候也就是开始执行 `_.bind` 中的 bound 函数。bound 允许传递参数并且其参数会被 push 到 args 中，具体实现参看上面的简化代码 `args.concat(args_2)`。这里我们有几个需要注意的点，其一是 `callingContext instanceof boundFunc`，之前我们讲过 instanceof 的神奇用法，在这里它用与判断 `bound` 中的 this 的指向是否继承于 bound。我们一定知道 this 指向的四个情况，如下：

>     var obj = {};
>     var func = function (){console.log(this);};
>     func();
>     new func();
>     obj.func = func;
>     obj.func();
>     func.apply(['this is parameter']);
>     func.call(['this is parameter']);

输出结果为：

>     Window {external: Object, chrome: Object, document: document, alogObjectConfig: Object, alogObjectName: "alog"…}
>     func {}
>     Object {}
>     ["this is parameter"]
>     ["this is parameter"]

分别代表四种情况：

- 函数调用模式：指向 `Global`，浏览器客户端即 window；
- 方法调用模式：指向对象本身；
- 构造器调用模式：指向为新构造的对象，继承自原 Function 对象；
- apply 或 call 调用模式：指向传入的参数。

这里还有一些非常好的资料：[this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)、[Understanding JavaScript Function Invocation and "this"](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)，在这里我要说一下我在推库上看到一篇关于 this 的介绍文章说：`“比较系统的分类是《JavaScript语言精粹》中的，分为函数调用模式（this绑定全局对象window）和方法调用模式（this绑定调用方法的主体）”`，我把《[JavaScript语言精粹](https://www.amazon.cn/JavaScript%E8%AF%AD%E8%A8%80%E7%B2%BE%E7%B2%B9-%E9%81%93%E6%A0%BC%E6%8B%89%E6%96%AF%E2%80%A2%E5%85%8B%E7%BD%97%E5%85%8B%E7%A6%8F%E5%BE%B7/dp/B0097CON2S/ref=sr_1_1?ie=UTF8&qid=1465722328&sr=8-1&keywords=JavaScript%E8%AF%AD%E8%A8%80%E7%B2%BE%E7%B2%B9)》这本书从头到尾翻看了好几遍，实际上它原文是这样说的：`“在 JAVASCRIPT 中一共有4种调用模式：方法调用模式、函数调用模式、构造器调用模式和 apply 调用模式。”`，具体叙述在原书的P27～P30页，感兴趣的朋友可以看下，在给大家看一个彩蛋，[严格模式下的 this](http://speakingjs.com/es5/ch07.html#strict_mode)。紧接上文，当 `bound` 中的 this 的指向是否继承于 bound 函数的时候说明是使用了 `new` 关键字的构造器调用模式调用了 `_.bind` 函数，则继续执行 executeBound 函数中的 baseCreate 创建基本函数然后进行一系列的操作，其实说到底 baseCreate 的目的就是为了保证传入参数 Function 的 this 的干净。
另外一个需要注意的地方是官网示例的暗示（特蛋疼的暗示），我扩展了一下：

>        var func = function(){ return JSON.stringify(arguments) + ': ' + this.name };
>        func = _.bind(func, {name: 'moe'}, 'hi');
>        func();
>        func = _.bind(func, {name: 'moe2'}, 'hi2');
>        func();

输出结果：

>        "{"0":"hi"}: moe"
>        "{"0":"hi","1":"hi2"}: moe"

可能有些不明就里的同学会问这是为什么啊，怎么 `this.name` 的值没有变化呢。实际上我们第一个 `_.bind` 是正常的函数绑定，而第二个 `func = _.bind(func, {name: 'moe2'}, 'hi2');` 是将上一个 `_.bind` 作为了 Function 参数传入到了新的 `_.bind` 中，而本来的函数 func 作为第一个 `_.bind` 的 func 参数一直传递到第二个 `_.bind` 中，但是中间的 this.name 却被绑定到了第一个 `_.bind` 上面而不是第一个 `_.bind` 中的 func 上。有一点绕口。用个代码介绍下，第二个 `_.bind` 的情况是这样子的：

>      func = _.bind(function(
>			function(greeting){
>        		return greeting + ': ' + this.name;
>       	},
>        	context,
>        	args
>        ) {
>             var length = arguments.length - 2;
>             args = Array(length);
>             for (var index = 0; index < length; index++) {
>                 args[index] = arguments[index + startIndex];
>             }
>             if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
>             var bound = function(args_2){
>                 args_2 = Array(arguments.length);
>                 for (var index = 0; index < arguments.length; index++) {
>                     args_2[index] = arguments[index];
>                 }
>                 (function(sourceFunc, boundFunc, context, callingContext, args) {
>                     if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
>                     var self = baseCreate(sourceFunc.prototype);
>                     var result = sourceFunc.apply(self, args);
>                     if (_.isObject(result)) return result;
>                     return self;
>               })(func, bound, context, this, args.concat(args_2));
>             };
>             return bound;
>         },
>        	{name: 'moe2'},
>        	'hi2'
>        );

所以 `_.bind` 一定要遵循正确的用法，不然真的出错了可能调试都不好发现问题，多层回调嵌套的时候一层套一层，很麻烦。

      _.partial = restArgs(function(func, boundArgs) {
        var placeholder = _.partial.placeholder;
        var bound = function() {
          var position = 0, length = boundArgs.length;
          var args = Array(length);
          for (var i = 0; i < length; i++) {
            args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
          }
          while (position < arguments.length) args.push(arguments[position++]);
          return executeBound(func, bound, this, this, args);
        };
        return bound;
      });

`_.partial` 函数的核心思想与 `_.bind` 相同，都是为了解决 this 指向的问题，区别在于 `_.partial` 不需要对 this 上的值做什么处理。用法上我觉得 `_.partial` 看上去更怪异一些，也许用来做一些特定的计算可能更合适些。

      _.partial.placeholder = _;

设置 `_.partial.placeholder` 为 `_`。

      _.bindAll = restArgs(function(obj, keys) {
        keys = flatten(keys, false, false);
        var index = keys.length;
        if (index < 1) throw new Error('bindAll must be passed function names');
        while (index--) {
          var key = keys[index];
          obj[key] = _.bind(obj[key], obj);
        }
      });

这里我们看到 `_.bindAll` 函数官网的示例就有点糊涂了：

>        var buttonView = {
>          label  : 'underscore',
>          onClick: function(){ console.log('clicked: ' + this.label); },
>          onHover: function(){ console.log('hovering: ' + this.label); }
>        };
>        _.bindAll(buttonView, 'onClick', 'onHover');
>        buttonView.onClick（);
>        clicked: underscore

我们当然知道结果是 `clicked: underscore`，那么执行 `_.bindAll(buttonView, 'onClick', 'onHover');` 的意义在哪呢，所以说这又是官网坑人的地方了，`_.bindAll` 的本意是将其传入的第二个及以后的参数放到一个共同的上下文环境里面执行，从而达到 this 指向其第一个参数的本身的目的，而官网的示例为`方法调用模式`，this 指向已经是 Object 本身了所以看不到变化，但是我们在浏览器控制台查看的话应该能知道 this 上多了 `[[TargetFunction]]: function ()`、`[[BoundThis]]: Object`、`[[BoundArgs]]: Array[0]` 三个参数并且 `[[BoundThis]]` 恰好是 Object。闲来无事这好看到有人也写了这个问题并举证了一个示例，详见 [Understanding bind and bindAll in Backbone.js](http://blog.bigbinary.com/2011/08/18/understanding-bind-and-bindall-in-backbone.html)。我 cope 一下：

>        function Developer(skill) {
>          this.skill = skill;
>          this.says = function(){
>            console.log(this.skill + ' rocks!');
>          }
>        }
>        var john = new Developer('Ruby');
>        _.bindAll(john, 'says');
>        var func = john.says;
>        func(); //Ruby rocks!

这个`函数调用模式`的示例正好答疑了 this 指向已经被改变的这个问题。

      _.memoize = function(func, hasher) {
        var memoize = function(key) {
          var cache = memoize.cache;
          var address = '' + (hasher ? hasher.apply(this, arguments) : key);
          if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
          return cache[address];
        };
        memoize.cache = {};
        return memoize;
      };

`_.memoize` 函数更像是一个可以缓存第一次执行结果的递归函数，我们从源码中可以看到 `memoize.cache = {};` 就是用来存储计算结果的容器，这里面比较有意思的是 hasher 这个参数，官网释义： `hashFunction`，实际上就是通过 hashFunction 对传入的 key 值进行处理然后放到 `memoize.cache = {};` 中，至于怎么处理 hash 也好、md5 也好、或者什么其他的计算加密真值判断增加对象等等都可以通过 hasher 这个传入的回调进行扩展。

————————— 疲惫的分割线 ———————————
这几天北京总在下雨，身体特别的疲惫，状态也不怎么好，所以今天才开始继续更新。
————————— END ———————————

      _.delay = restArgs(function(func, wait, args) {
        return setTimeout(function() {
          return func.apply(null, args);
        }, wait);
      });

`_.delay` 函数用于处理定时器相关函数，原理是通过 setTimeout 进行二次封装，比较关键的就是 args 参数通过 restArgs 函数处理为一个数组，方便了下一步的 `func.apply(null, args);` 传值。

      _.defer = _.partial(_.delay, _, 1);

`_.defer` 这个函数我们首先可以看到内部应用了 `_.partial` 并且中间传入参数 `_`，这意味着当 `_.defer` 执行的时候传入的参数会被补全到 `_.partial` 内部 bound 中的 `args[0]` 位置，而此时 `args` 的值为 `[func, 1]`并将它传给 `_.delay` 函数，即 `_.delay.apply(null, args);`，用着这种方式曲线的设置 setTimeout 函数的 `wait = 1`，目的就是处理代码复用问题，不然的话完全可以改装一下 `_.delay` 函数可以更简单的实现这一功能。

      _.throttle = function(func, wait, options) {
        var timeout, context, args, result;
        var previous = 0;
        if (!options) options = {};
        var later = function() {
          previous = options.leading === false ? 0 : _.now();
          timeout = null;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        };
        var throttled = function() {
          var now = _.now();
          if (!previous && options.leading === false) previous = now;
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0 || remaining > wait) {
            if (timeout) {
              clearTimeout(timeout);
              timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
          } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
          }
          return result;
        };
        throttled.cancel = function() {
          clearTimeout(timeout);
          previous = 0;
          timeout = context = args = null;
        };
        return throttled;
      };

`_.throttle` 函数可以限制和控制其参数 func 的执行次数和执行时间，思想就是通过 wait、now、previous 和 remaining 进行判断然后分别执行相应的策略。

- wait：使用 `_.throttle` 函数时传入的时间标识，在每个 wait 毫秒时间段内最多且一定调用一次该函数。
- now：使用 `_.now()` 函数获取当前时间戳。
- previous：用来缓存函数执行时的时间戳，用于后面与下一次执行时的时间戳进行相关判断。
- remaining：缓存 `wait - (now - previous)` 的差值。

我们在看官网介绍可以知道 `_.throttle` 传递的 options 分四种情况（默认是 `{leading:false,trailing:false}`）：

- `{leading:true,trailing:true}`：从实例化 `_.throttle` 的时间开始到执行实例化的函数的时间为止，中间的差值定义为 `now - previous`，进而得出设定的时间 wait 与 `now - previous` 的差值 remaining，从而决定怎么执行函数。参考 [世纪之光](http://www.easyui.info/third/underscore/throttle.html) 的很有趣的说法，就是第一次可以立即执行，第二次开始将在每 wait 时间内只允许执行一次，为什么会第一次立即执行呢，因为大家设置的 wait 一般都不会太大，所以页面加载过程中一般已经执行了 `_.throttle` 的实例化，也就是说其 `remaining <= 0`，而后面如果一直执行函数，那么就开始 `0 < remaining <= wait` 模式了，
- `{leading:false,trailing:false}`：这种情况下比较有意思的是 previous 这个参数，在实例化 `_.throttle` 的时候，`previous = 0`，利用了 `!0 === true` 的特性使 `_.throttle` 内部并没有执行回调函数 func，所以第一次函数调用失败，在第二次开始 `previous = now` （now 为第一次调用的时间戳），所以它也分为两种情况：
- `{leading:true,trailing:false}`：这种情况下是没有 setTimeout 函数的，因为 `leading:true`，所以 previous 初始化为 `0`，意味着第一次执行函数会立即执行，儿后面就要遵循 `remaining <= 0 || remaining > wait` 才能执行，也就是说只有第一执行完毕后的时间超过了 wait 才能继续调用函数才能执行（调用是重点），以此类推。
- `{leading:false,trailing:true}`：这种情况由于 `leading:false`，所以每次 previous 都等于当前调用函数时的时间戳，所以完美的不存在 `remaining <= 0 || remaining > wait` 的情况，由此只能通过 setTimeout 执行回调，所以遵循通过 setTimeout 函数设定时间为 remaining 毫秒后执行 `_.throttle` 函数的回调函数 func，用以达到在规定时间 wait 毫秒时执行函数的目的，并且规定 wait 时间内只执行一次函数。

其实总结一下就是大概一下两种都存在或者只存在其一的情况：

- `remaining <= 0`：立即执行 `_.throttle` 函数的回调函数 func。
- `0 < remaining <= wait`：通过 setTimeout 函数设定时间为 remaining 毫秒后执行 `_.throttle` 函数的回调函数 func，用以达到在规定时间 wait 毫秒时执行函数的目的，并且规定 wait 时间内只执行一次函数。


      _.debounce = function(func, wait, immediate) {
        var timeout, result;
        var later = function(context, args) {
          timeout = null;
          if (args) result = func.apply(context, args);
        };
        var debounced = restArgs(function(args) {
          if (timeout) clearTimeout(timeout);
          if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(later, wait);
            if (callNow) result = func.apply(this, args);
          } else {
            timeout = _.delay(later, wait, this, args);
          }
          return result;
        });
        debounced.cancel = function() {
          clearTimeout(timeout);
          timeout = null;
        };
        return debounced;
      };

`_.debounce` 更像是 `_.delay` 的方言版，当 `immediate = true` 的时候通过 `var callNow = !timeout = false` 达到立即执行回调函数 func 的目的，并用 later 函数限制 规定 wait 时间内不允许在调用函数（later 函数内部 context = args = underfind，其实我们知道 `var later = function(context, args)` 这个条件是为 `_.delay(later, wait, this, args)` 准备的）。

      _.wrap = function(func, wrapper) {
        return _.partial(wrapper, func);
      };

`_.wrap` 的两个参数理论上都要求是 Function，我们已经知道 `_.partial` 是用来在 this 上下功夫的，虽然这里和 this 也没什么太大关系，之所以这里应用了 `_.partial` 是为了让 func 作为 wrapper 的第一个参数执行，并且通过 executeBound 函数对`函数调用模式`和`方法调用模式`做处理。

      _.negate = function(predicate) {
        return function() {
          return !predicate.apply(this, arguments);
        };
      };

`_.negate` 用来做真值判断。

      _.compose = function() {
        var args = arguments;
        var start = args.length - 1;
        return function() {
          var i = start;
          var result = args[start].apply(this, arguments);
          while (i--) result = args[i].call(this, result);
          return result;
        };
      };

`_.compose` 用于将函数执行结果进行传递，需要注意的是 `var args = arguments;` 中的 arguments 和 `args[start].apply(this, arguments);` 中的 arguments 并不相同就可以了。这个涉及到函数的执行，当每一个函数执行的时候都会形成一个内部的上下文执行环境（传说叫 `ExecutionContext`，这个我还没有考证过），在构建环境的同时生成 arguments 变量和作用域链表等等，这里不像叙述了。

      _.after = function(times, func) {
        return function() {
          if (--times < 1) {
            return func.apply(this, arguments);
          }
        };
      };

`_.after` 接受两个参数，Number 参数用来限定 `_.after` 实例化函数的执行次数，说白了就是只有当第 Number 次执行实例化函数的时候才会继续执行 func 回调，这个用来处理遍历 `_.each` 时某些情况很有用。

      _.before = function(times, func) {
        var memo;
        return function() {
          if (--times > 0) {
            memo = func.apply(this, arguments);
          }
          if (times <= 1) func = null;
          return memo;
        };
      };

`_.before`，与 `_.after` 相反，只在规定 Number 参数的次数内以此执行 `_.before`，超过之后结束。

      _.once = _.partial(_.before, 2);

`_.once` 创建一个只能调用一次的函数。到这里关于函数相关的源码就结束了，说心里话很多地方看得懂不一定说的懂，说的懂也不一定用的懂，就拿这个 `_.once` 来讲，它只用了 `_.partial` 和 `_.before` 来做文章，用 `_.before` 限定只能执行一次还好理解，那么为什么一定要用 `_.partial` 坐下处理呢，其目的真的只是为了让 `2` 作为 `_.before` 的第一个参数进行传递过去并将 `_.once` 的传参作为 `arguments[1+]` 传入么，更深一层考虑，`_.partial` 函数是不是有处理过 `_.once` 传递过来的函数的作用域链和 this 相关的情况呢。

      _.restArgs = restArgs;

`_.restArgs` 将 restArgs 函数绑定到 `_` 对象上。

      var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');



      var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                          'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
      var collectNonEnumProps = function(obj, keys) {
        var nonEnumIdx = nonEnumerableProps.length;
        var constructor = obj.constructor;
        var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;
        var prop = 'constructor';
        if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
        while (nonEnumIdx--) {
          prop = nonEnumerableProps[nonEnumIdx];
          if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
            keys.push(prop);
          }
        }
      };

      _.keys = function(obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (_.has(obj, key)) keys.push(key);
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
      };

      _.allKeys = function(obj) {
        if (!_.isObject(obj)) return [];
        var keys = [];
        for (var key in obj) keys.push(key);
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
      };

      _.values = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
          values[i] = obj[keys[i]];
        }
        return values;
      };

      _.mapObject = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = _.keys(obj),
            length = keys.length,
            results = {};
        for (var index = 0; index < length; index++) {
          var currentKey = keys[index];
          results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
      };

      _.pairs = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = Array(length);
        for (var i = 0; i < length; i++) {
          pairs[i] = [keys[i], obj[keys[i]]];
        }
        return pairs;
      };

      _.invert = function(obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
          result[obj[keys[i]]] = keys[i];
        }
        return result;
      };

      _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) {
          if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
      };

      var createAssigner = function(keysFunc, defaults) {
        return function(obj) {
          var length = arguments.length;
          if (defaults) obj = Object(obj);
          if (length < 2 || obj == null) return obj;
          for (var index = 1; index < length; index++) {
            var source = arguments[index],
                keys = keysFunc(source),
                l = keys.length;
            for (var i = 0; i < l; i++) {
              var key = keys[i];
              if (!defaults || obj[key] === void 0) obj[key] = source[key];
            }
          }
          return obj;
        };
      };

      _.extend = createAssigner(_.allKeys);

      _.extendOwn = _.assign = createAssigner(_.keys);

      _.findKey = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = _.keys(obj), key;
        for (var i = 0, length = keys.length; i < length; i++) {
          key = keys[i];
          if (predicate(obj[key], key, obj)) return key;
        }
      };

      var keyInObj = function(value, key, obj) {
        return key in obj;
      };

      _.pick = restArgs(function(obj, keys) {
        var result = {}, iteratee = keys[0];
        if (obj == null) return result;
        if (_.isFunction(iteratee)) {
          if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
          keys = _.allKeys(obj);
        } else {
          iteratee = keyInObj;
          keys = flatten(keys, false, false);
          obj = Object(obj);
        }
        for (var i = 0, length = keys.length; i < length; i++) {
          var key = keys[i];
          var value = obj[key];
          if (iteratee(value, key, obj)) result[key] = value;
        }
        return result;
      });

      _.omit = restArgs(function(obj, keys) {
        var iteratee = keys[0], context;
        if (_.isFunction(iteratee)) {
          iteratee = _.negate(iteratee);
          if (keys.length > 1) context = keys[1];
        } else {
          keys = _.map(flatten(keys, false, false), String);
          iteratee = function(value, key) {
            return !_.contains(keys, key);
          };
        }
        return _.pick(obj, iteratee, context);
      });

      _.defaults = createAssigner(_.allKeys, true);

      _.create = function(prototype, props) {
        var result = baseCreate(prototype);
        if (props) _.extendOwn(result, props);
        return result;
      };

      _.clone = function(obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
      };

      _.tap = function(obj, interceptor) {
        interceptor(obj);
        return obj;
      };

      _.isMatch = function(object, attrs) {
        var keys = _.keys(attrs), length = keys.length;
        if (object == null) return !length;
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
          var key = keys[i];
          if (attrs[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
      };

      var eq, deepEq;
      eq = function(a, b, aStack, bStack) {
        if (a === b) return a !== 0 || 1 / a === 1 / b;
        if (a == null || b == null) return a === b;
        if (a !== a) return b !== b;
        var type = typeof a;
        if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
        return deepEq(a, b, aStack, bStack);
      };

      deepEq = function(a, b, aStack, bStack) {
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        var className = toString.call(a);
        if (className !== toString.call(b)) return false;
        switch (className) {
          case '[object RegExp]':
          case '[object String]':
            return '' + a === '' + b;
          case '[object Number]':
            if (+a !== +a) return +b !== +b;
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
          case '[object Date]':
          case '[object Boolean]':
            return +a === +b;
          case '[object Symbol]':
            return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
        }

        var areArrays = className === '[object Array]';
        if (!areArrays) {
          if (typeof a != 'object' || typeof b != 'object') return false;
          var aCtor = a.constructor, bCtor = b.constructor;
          if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                                   _.isFunction(bCtor) && bCtor instanceof bCtor)
                              && ('constructor' in a && 'constructor' in b)) {
            return false;
          }
        }

        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
        while (length--) {
          if (aStack[length] === a) return bStack[length] === b;
        }

        aStack.push(a);
        bStack.push(b);

        if (areArrays) {
          length = a.length;
          if (length !== b.length) return false;
          while (length--) {
            if (!eq(a[length], b[length], aStack, bStack)) return false;
          }
        } else {
          var keys = _.keys(a), key;
          length = keys.length;
          if (_.keys(b).length !== length) return false;
          while (length--) {
            key = keys[length];
            if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
          }
        }
        aStack.pop();
        bStack.pop();
        return true;
      };

      _.isEqual = function(a, b) {
        return eq(a, b);
      };

      _.isEmpty = function(obj) {
        if (obj == null) return true;
        if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
        return _.keys(obj).length === 0;
      };

      _.isElement = function(obj) {
        return !!(obj && obj.nodeType === 1);
      };

      _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) === '[object Array]';
      };

      _.isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
      };

      _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function(name) {
        _['is' + name] = function(obj) {
          return toString.call(obj) === '[object ' + name + ']';
        };
      });

      if (!_.isArguments(arguments)) {
        _.isArguments = function(obj) {
          return _.has(obj, 'callee');
        };
      }

      var nodelist = root.document && root.document.childNodes;
      if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
        _.isFunction = function(obj) {
          return typeof obj == 'function' || false;
        };
      }

      _.isFinite = function(obj) {
        return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
      };

      _.isNaN = function(obj) {
        return isNaN(obj) && _.isNumber(obj);
      };

      _.isBoolean = function(obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
      };

      _.isNull = function(obj) {
        return obj === null;
      };

      _.isUndefined = function(obj) {
        return obj === void 0;
      };

      _.has = function(obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
      };

      _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
      };

      _.identity = function(value) {
        return value;
      };

      _.constant = function(value) {
        return function() {
          return value;
        };
      };

      _.noop = function(){};

      _.property = property;

      _.propertyOf = function(obj) {
        return obj == null ? function(){} : function(key) {
          return obj[key];
        };
      };

      _.matcher = _.matches = function(attrs) {
        attrs = _.extendOwn({}, attrs);
        return function(obj) {
          return _.isMatch(obj, attrs);
        };
      };

      _.times = function(n, iteratee, context) {
        var accum = Array(Math.max(0, n));
        iteratee = optimizeCb(iteratee, context, 1);
        for (var i = 0; i < n; i++) accum[i] = iteratee(i);
        return accum;
      };

      _.random = function(min, max) {
        if (max == null) {
          max = min;
          min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
      };

      _.now = Date.now || function() {
        return new Date().getTime();
      };

      var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
      };
      var unescapeMap = _.invert(escapeMap);

      var createEscaper = function(map) {
        var escaper = function(match) {
          return map[match];
        };

        var source = '(?:' + _.keys(map).join('|') + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');
        return function(string) {
          string = string == null ? '' : '' + string;
          return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
      };
      _.escape = createEscaper(escapeMap);
      _.unescape = createEscaper(unescapeMap);

      _.result = function(object, prop, fallback) {
        var value = object == null ? void 0 : object[prop];
        if (value === void 0) {
          value = fallback;
        }
        return _.isFunction(value) ? value.call(object) : value;
      };

      var idCounter = 0;
      _.uniqueId = function(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
      };

      _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
      };

      var noMatch = /(.)^/;

      var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
      };

      var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

      var escapeChar = function(match) {
        return '\\' + escapes[match];
      };

      _.template = function(text, settings, oldSettings) {
        if (!settings && oldSettings) settings = oldSettings;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = RegExp([
          (settings.escape || noMatch).source,
          (settings.interpolate || noMatch).source,
          (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
          source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
          index = offset + match.length;
          if (escape) {
            source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
          } else if (interpolate) {
            source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
          } else if (evaluate) {
            source += "';\n" + evaluate + "\n__p+='";
          }
          return match;
        });
        source += "';\n";
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
        source = "var __t,__p='',__j=Array.prototype.join," +
          "print=function(){__p+=__j.call(arguments,'');};\n" +
          source + 'return __p;\n';
        var render;
        try {
          render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
          e.source = source;
          throw e;
        }
        var template = function(data) {
          return render.call(this, data, _);
        };
        var argument = settings.variable || 'obj';
        template.source = 'function(' + argument + '){\n' + source + '}';
        return template;
      };

      _.chain = function(obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
      };

      var chainResult = function(instance, obj) {
        return instance._chain ? _(obj).chain() : obj;
      };

      _.mixin = function(obj) {
        _.each(_.functions(obj), function(name) {
          var func = _[name] = obj[name];
          _.prototype[name] = function() {
            var args = [this._wrapped];
            push.apply(args, arguments);
            return chainResult(this, func.apply(_, args));
          };
        });
      };

      _.mixin(_);

      _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
          var obj = this._wrapped;
          method.apply(obj, arguments);
          if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
          return chainResult(this, obj);
        };
      });

      _.each(['concat', 'join', 'slice'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
          return chainResult(this, method.apply(this._wrapped, arguments));
        };
      });

      _.prototype.value = function() {
        return this._wrapped;
      };

      _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

      _.prototype.toString = function() {
        return '' + this._wrapped;
      };

将自己注册为AMD（Require.js），Bower和Component， 以及作为一个CommonJS的模块

      if (typeof define == 'function' && define.amd) {
        define('underscore', [], function() {
          return _;
        });
      }
    }());

