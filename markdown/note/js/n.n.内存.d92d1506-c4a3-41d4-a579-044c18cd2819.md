# 内存

## 内存分配

```js
var obj = {a:1};
```
在给一个变量赋值的时候已经在浏览器中开辟了一块内存出来。这块内存在浏览器中占了一定的空间，这个时候，我们可以称变量`obj`为栈，称`{a:1}`为堆。

![](../../../static/img/内存/1.jpg)

栈上只是存了一个指针，指针就是堆上对象的地址，程序代码通过这个指针句柄可以操作堆上的对象。

```js
var obj = {a:1};
var newObj = obj;
```
声明一个变量`newObj`，将`obj`复制给`newObj`，`newObj`通过`obj`获得`{a:1}`这个对象地址，也就是说它们并非两个不同的对象，实际上他们的在`栈`上存储的指针都是指向同一个`堆`对象。所以有一个很经典的关于指针的实例。

```js
var a = {n:1};  
var b = a;  
a.x = a = {n:2};  
console.log(a.x);
console.log(b.x);
==> undefined
==> Object {n: 2}
```

![](../../../static/img/内存/2.png)

___图片来源[pythontutor](http://pythontutor.com/)___

## 内存有效管理

相关问题：
- 内存泄漏
- 频繁的垃圾收集暂停
- 整体内存膨胀

## 内存泄漏

> Delete一个Object的属性会让此对象变慢（多耗费15倍的内存）

```js
var o = { x: 'y' };
delete o.x; // 此时o会成一个慢对象
o.x;
//解决方法:
var o = { x: 'y' };
o = null;
```

> 在闭包中引入闭包外部的变量时，当闭包结束时此对象无法被垃圾回收（GC）。

```js
var a = function() {
  var largeStr = new Array(1000000).join('x');
  return function() {
  return largeStr;
  }
}();
```

> 当原有的COM被移除时，子结点引用没有被移除则无法回收（DOM泄露）

```js
var select = document.querySelector;
var treeRef = select('#tree');
//在COM树中leafRef是treeFre的一个子结点
var leafRef = select('#leaf');
var body = select('body');
body.removeChild(treeRef); // #tree不能被回收入，因为treeRef还在
//解决方法:
treeRef = null; // tree还不能被回收，因为叶子结果leafRef还在
leafRef = null; // 现在#tree可以被释放了。
```

> 定时器也是常见产生内存泄露的地方（Timers计（定）时器泄露）

```js
for (var i = 0; i < 90000; i++) {
  var buggyObject = {
  callAgain: function() {
  var ref = this;
  var val = setTimeout(function() {
  ref.callAgain();
  }, 90000);
  }
  }
  buggyObject.callAgain(); // 虽然你想回收但是timer还在
  buggyObject = null;
}
```
