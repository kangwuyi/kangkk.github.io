# 内存

# 内存

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
