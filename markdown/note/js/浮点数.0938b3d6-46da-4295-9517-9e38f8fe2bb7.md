# 浮点数

<!-- toc -->

JavaScript中的小数采用的是双精度(64位)表示的，由三部分组成：

> 符 + 阶码 + 尾数

在二进制中，`0.1` == `0.0001100110011001100110011001100110011001100110011001…`（1001 循环）。因为浮点数只有52位有效数字，从第53位开始，就舍入了。这样就造成了“浮点数精度损失”问题。

## 浮点数问题

举证：

![浮点数计算误差](../../../static/img/浮点数/1.png)

### 第一阶段

收集的方法，仅可供参考思路，慎用

```js
/**
 * 除法函数
 * @param  {number} arg1
 * @param  {number} arg2
 * @return {number}
 */
function accDiv(arg1,arg2){
  var t1=0,t2=0,r1,r2;
  try{t1=arg1.toString().split(".")[1].length}catch(e){}
  try{t2=arg2.toString().split(".")[1].length}catch(e){}
  with(Math){
    r1=Number(arg1.toString().replace(".",""))
    r2=Number(arg2.toString().replace(".",""))
    return (r1/r2)*pow(10,t2-t1);
  }
}
function accDiv(arg1,arg2){
    var r1=0,r2=0,m,s1=arg1.toString(),s2=arg2.toString();
    try{
        if(s1.split(".")[1] != undefined )
            r1=s1.split(".")[1].length;
    }catch(e){}
    try{
        if(s2.split(".")[1] != undefined )
            r2=s2.split(".")[1].length;
    }catch(e){}
    m=Math.pow(10,Math.max(r1,r2));
    return (accMul(arg1,m))/(accMul(arg2,m));
}
/**
 * 乘法函数
 * @param  {number} arg1
 * @param  {number} arg2
 * @return {number}
 */
function accMul(arg1,arg2) {
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
function accMul(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{
        if(s1.split(".")[1] != undefined )
            m+=s1.split(".")[1].length
    }catch(e){}
    try{
        if(s2.split(".")[1] != undefined )
            m+=s2.split(".")[1].length
    }catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
/**
 * 加法函数
 * @param  {number} arg1
 * @param  {number} arg2
 * @return {number}
 */
function accAdd(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2))
  return (arg1*m+arg2*m)/m
}
function accAdd(arg1,arg2){
    var r1=0,r2=0,m,s1=arg1.toString(),s2=arg2.toString();
    try{
        if(s1.split(".")[1] != undefined )
            r1=s1.split(".")[1].length;
    }catch(e){}
    try{
        if(s2.split(".")[1] != undefined )
            r2=s2.split(".")[1].length;
    }catch(e){}
    m=Math.pow(10,Math.max(r1,r2));
    return (accMul(arg1,m)+accMul(arg2,m))/m;
}
/**
 * 减法函数
 * @param  {number} arg1
 * @param  {number} arg2
 * @return {number}
 */
function Subtr(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //last modify by deeka
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}
function Subtr(arg1,arg2){
    var r1=0,r2=0,m,n,s1=arg1.toString(),s2=arg2.toString();
    try{
        if(s1.split(".")[1] != undefined )
            r1=s1.split(".")[1].length;
    }catch(e){}
    try{
        if(s2.split(".")[1] != undefined )
            r2=s2.split(".")[1].length;
    }catch(e){}
    m=Math.pow(10,Math.max(r1,r2));
    //last modify by deeka
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return (accMul(arg1,m)-accMul(arg2,m))/m;
}
```

### 第二阶段

> 取float型小数点后两位，例22.127456取成22.13

```js
function get(num){
	var str = s.toString();
	return s.substring(0,s.indexOf(".")+3);
}
function get(num){
    return s.toString().replace(/([0-9]\.[0-9]{2})[0-9]*/,"$1");
}
// 好风凭借力，送我上青云
function get(num){
    return Math.round(num*100)/100;
}
function get(num){
    return num.toFixed(2);
}
```

这里还是不可取的，仍需要具体

#### toFixed

- numObj.toFixed([fractionDigits])

toFixed 方法返回一个以定点表示法表示的数字的字符串形式。该字符串中小数点之前有一位有效数字，而且其后必须包含 fractionDigits 数字。如果没有 fractionDigits 参数，或者该参数为 undefined，toFixed 方法假定该值为 0。

弊端：

```js
0.009.toFixed(2)
```
在ie7下四舍五入是不稳定的，有些参数运算会显示0.00，而ff会是0.01。

替代方案:

```js
Number.prototype.toFixed = function(num){
	return (parseInt(this*Math.pow(10,num)+0.5)/Math.pow(10,num)).toString();
}
```
#### with

```js
with (object)
   statements
```

with 语句通常用来缩短特定情形下必须写的代码量。

```js
with (Math){
   x = cos(3 * PI) + sin (LN10)
   y = tan(14 * E)
}
```

## 第三阶段

### 精确范围判定

```js
var x = 0.2;
var y = 0.3;
var equal = (Math.abs(x - y) < 0.000001)
```
### 保留精度

函数toPrecision或toFixed来保留一定的精度

```js
(0.1 + 0.2).toPrecision(10) == 0.3
// or
(0.1 + 0.2).toFixed(10) == 0.3
```

## 浮点数!=小数

整数和小数是数学里面的概念，在计算机中，只有定点数和浮点数，没有整数和小数。

计算机可精确的数字：

- 一个奇数 0.5
- 一个偶数 0.0。

> 人为的在数据最后一位补 5， 也就是 0.15，这样牺牲一位，但是可以保证数据精度，还原再把那个尾巴 5 去掉。

```js
JSON.parse('{"status":1,"id":9986705337161735,"name":"test"}').id;
==> 9986705337161736
```
