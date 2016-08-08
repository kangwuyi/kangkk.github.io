# 数学函数

<!-- toc -->


## 内置函数

### 随机数

- Math.random()

生成大于 0 小于 1 的随机数。下面的代码可以生成 0～100 的随机数。

```js
Math.floor(Math.random() * 101);
```

### 进位/舍位/四舍五入/绝对值

- Math.ceil(n)
- Math.floor(n)
- Math.round(n)

ceil() 可以把小数点以下部分舍去并使整数部分加 1 。举例来说，3.6 会进位到 4 ，-3.6 会进位到 -3 。floor() 可以把小数点以下部分舍去，即取整。举例来说，3.6 会取整为 3 ，-3.6 会取整为 -4 。round() 可以把整数四舍五入。举例来说，3.6 会四舍五入为 4 ，-3.6 会四舍五入为 -4 。

- Math.abs(n)

取 n 的绝对值。

### 三角函数

- Math.sin(x)
- Math.cos(x)
- Math.tan(x)

正弦函数（-1～1）、余弦函数（-1～1）、正切函数（-∞～∞）。x 是一个以弧度表示的角。将角度乘以 0.017453293 （2PI/360）即可转换为弧度。

```js
r = 10.0;  // 半径
a = 30.0;  // 角度
x = r  Math.cos(a / 180  Math.PI);  // X坐标
y = r  Math.sin(a / 180  Math.PI);  // Y坐标
```

- Math.asin(x)
- Math.acos(x)
- Math.atan(x)

值 x 的反正弦函数（-π/2～π/2）、反余弦函数（0～π）、反正切函数（-π/2～π/2）。

- Math.atan2(y, x)
坐标 x, y 的角度(-π～π)。

- Math.PI

圆周率π。


### 其他

- Math.max(x, y)
- Math.min(x, y)

max() 取 x 与 y 中大的那个，min() 取 x 与 y 中小的那个。

- Math.pow(n, m)

n 的 m 次幂。

- Math.sqrt(n)

n 的平方根。

- Math.SQRT2
- Math.SQRT1_2

SQRT2 是 2 的平方根（约1.414）。SQRT1_2 是 1/2 的平方根(约0.707)。

- Math.E

自然对数 e 的值（约2.718281828）。

- Math.LN2
- Math.LN10
- Math.LOG2E
- Math.LOG10E

LN2 是 loge2，即 2 的自然对数（约0.69314718055994528623）。 LN10 是 loge10，即 10 的自然对数（约2.3025850929940459011）。LOG2E 是 log2e,即以 2 为底 e 的对数（约1.442695040888963387）。LOG10E 是 log10e,即以 10 为底 e 的对数（约0.43429448190325181667）。

- Math.exp(n)

e 的 n 次幂。

- Math.log(n)

n 的自然对数。