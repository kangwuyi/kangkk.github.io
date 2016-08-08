# 数组

## 数组合并

### 第一阶段

> concat(..)

```
var c = a.concat( b );
a = b = null; // 回收a、b
```

缺陷：
1. 内存

### 第二阶段

> push(..) || unshift(..)

```
for (var i=0; i < b.length; i++) {
    a.push( b[i] );
}
b = null;
```

缺陷：
1. 不好维护

### 第三阶段

> reduce

```
a = b.reduce( function(coll,item){
    coll.push( item );
    return coll;
}, a );
```

### 第四阶段

> apply

```
a.push.apply( a, b );
```

### 第五阶段

> ...

```
a.push( ...b )
```
缺陷：
1. 可能超出了push(...)或unshift(...)允许调用堆栈的限制

## 数组类型

### 稀疏数组

创建一个指定长度的稀疏数组:

```js
var arr = new Array(3);
console.log(arr)
console.log(arr.length)
console.log(arr[0])
==> [ , ,  ]
==> 3
==> undefined
```

并且 JavaScript 在遍历稀疏数组时会跳过这些缝隙：

```js
var arr = new Array(3);
arr.forEach(function (item, i) {
	console.log(i+": "+item);
});
==> undefined
arr.map(function (item, i) {
	return i;
})
==> [ , ,  ]
```

还有一些其他情况会生成稀疏数组,比如

```js
var arr = [];
arr[0] = 0;
arr[100] = 100;
arr.forEach(function (item, i) {
	console.log(i+": "+item);
});
==> 0: 0
==> 100: 100
```

>



### 密集数组

创建一个密集数组:

```js
var arr = Array.apply(null, Array(3));
console.log(arr);
console.log(arr.length);
console.log(arr[0]);
==> [ undefined, undefined, undefined ]
==> 3
==> undefined
```

从表面上看,貌似这个数组和之前的稀疏数组并没有太多的区别，但是密集数组可以遍历到这些数组元素,还可以为每个元素重新赋值:

```js
var arr = Array.apply(null, Array(3));
arr.forEach(function (item, i) {
	console.log(i+": "+item);
});
==> 0: undefined
	1: undefined
	2: undefined
arr.map(function (item, i) {
	return i;
})
==> [ 0, 1, 2 ]
```

#### 另一种写法

```js
Array.apply(null, Array(3)).map(Function.prototype.call.bind(Number));
==> [ 0, 1, 2 ]
```

等同于下面的写法

```js
Array.apply(null, Array(3)).map(Function.prototype.call,Number)
```

#### 效率

使用自定义的函数更清晰,但自定义的函数肯定没有原生方法快

```js
var arr = ["aaa  ", "  bbb", "  ccc  "];
arr.map(function(item) {
	return item.trim();
});
==> ["aaa", "bbb", "ccc"]
arr.map(Function.prototype.call, String.prototype.trim);
==> ["aaa", "bbb", "ccc"]
```

