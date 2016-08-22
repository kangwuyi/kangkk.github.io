# 刷题

> 去定义一个方法，传入一个string类型的参数，然后将string的每个字符间加个空格返回

```js
String.prototype.spacify = function(){
  return this.split('').join(' ');
};
```

> 定义一个未定义的log方法,它可以代理console.log的方法

```js
function log(){
  console.log.apply(console, arguments);
};
```

> 每一个log消息添加一个"(app)"的前辍

```js
function log(){
  var args = Array.prototype.slice.call(arguments);
  args.unshift('(app)');
  console.log.apply(console, args);
};
```

> 上下文和this的理解

```js
var User = {
  count: 1,
  getCount: function() {
    return this.count;
  }
};
console.log(User.getCount());
var func = User.getCount;
console.log(func());
var func = User.getCount.bind(User);
console.log(func());
==> 1
==> undefined
==> 1
```

> 老版本的浏览器兼容 bind

```js
Function.prototype.bind = Function.prototype.bind || function(context){
  var self = this;
  return function(){
	return self.apply(context, arguments);
  };
}
```

> 弹出窗口（Overlay library）

```css
.overlay {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,.8);
}
.overlay article {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -200px 0 0 -200px;
      width: 400px;
      height: 400px;
    }
```

检查事件的触发对象和绑定对象是否一致，从而确定事件不是从子元素里面冒泡上来的。

```js
$('.overlay').click(function(e){
  if (e.target == e.currentTarget)
	closeOverlay();
});
```

> 设计一个函数返回第n行的杨辉三角。

```language
           1
         1     1
      1     2     1
   1     3     3      1
   ...
```
杨辉三角也叫Pascal’s Triangle

```js
function triangle(r) {
	var arr =[], n = 1;
	for (var i = 1; n <= r; i+=n) {
		arr[i] = arr[i - 1] = 1;
		for (var j = 1; j < n - 1; j++) {
			arr[i - j -1] = arr[i - j - n - 1] + arr[i - j - n]
		}
		n += 1;
	}
	return arr.splice(arr.length - r - 1, r);
}
triangle(5);
```
上面是收集的其他人的答案，一眼看上去乱七八糟并且也不符合我的习惯，遂自己写了一个↓↓↓
```js
function triangle(r) {
	var arr = new Array(r);
	for(var i=0;i<r;i++){
		var _arr=new Array(i+1);
		_arr[0]=_arr[i]=1;
		for(var j=1;j<i;j++){
			_arr[j]= arr[i-1][j-1]+arr[i-1][j]
		}
		arr[i]=_arr;
	}
	return arr;
}
triangle(2);
```

> 设计一个函数，返回一串字符串中重复次最多的单词。

> 使用递归打印长度为n的费波那契数列。

> Scope作用范围

考虑下面的代码：

```js
(function() {
   var a = b = 5;
})();
console.log(b);
==> 5
```

> 给字符串对象定义一个repeatify功能。当传入一个整数n时，它会返回重复n次字符串的结果。

```js
String.prototype.repeatify = String.prototype.repeatify || function(times) {
   var str = '';
   for (var i = 0; i < times; i++) {
      str += this;
   }
   return str;
};
console.log('hello'.repeatify(3));
==> hellohellohello
```

> 声明提升（Hoisting）

```js
function test() {
   console.log(a);
   console.log(foo());
   var a = 1;
   function foo() {
      return 2;
   }
}
test();
==> undefined
==> 2
```

> this在JavaScript中如何工作的

```js
var fullname = 'John Doe';
var obj = {
   fullname: 'Colin Ihrig',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};
console.log(obj.prop.getFullname());
var test = obj.prop.getFullname;
console.log(test());
==> Aurelio De Rosa
==> John Doe
```

> ↑↑↑使最后的console.log() 打印 Aurelio De Rosa。

```js
console.log(test.call(obj.prop));
```


> 13 道题目

```js
(function(){
  return typeof arguments;
})();
==> "object"

var f = function g(){ 
  return 23; 
};
typeof g();
==> Error

(function(x){
  delete x;
  return x;
})(1);
==> 1

var y = 1, x = y = typeof x;
x;
==> "undefined"

(function f(f){
  return typeof f();
})(function(){ return 1; });
==> "number"

var foo = {
  bar: function() {
    return this.baz; 
  },
  baz: 1
};
(function(){
  return typeof arguments[0]();
})(foo.bar);
==> "undefined"

var foo = {
  bar: function(){
    return this.baz; 
  },
  baz: 1
}
typeof (f = foo.bar)();
==> "undefined"

var f = (
  function f(){ 
    return "1"; 
  }, 
  function g(){ 
    return 2; 
  }
)();
typeof f;
==> "number"

var x = 1;
if (function f(){}) {
  x += typeof f;
}
x;
==> "1number"

var x = [typeof x, typeof y][1];
typeof typeof x;
==> "string"

(function(foo){
  return typeof foo.bar;
})({ foo: { bar: 1 } });
==> "undefined"

(function f(){
  function f(){ return 1; }
  return f();
  function f(){ return 2; }
})();
==> 2

function f(){ return f; }
new f() instanceof f;
==> false

with (function(x, undefined){}) length;
==> 2
```

## 参考
- http://javascript-puzzlers.herokuapp.com/