# 加载规范

[](http://webpack.github.io/docs/api-in-modules.html#require-ensure)

[](http://webpack.github.io/docs/api-in-modules.html#require-amd)


require-amd
说明: 同AMD规范的require函数，使用时传递一个模块数组和回调函数，模块都被下载下来且都被执行后才执行回调函数
语法: require(dependencies: String[], [callback: function(...)])
参数
dependencies: 模块依赖数组
callback: 回调函数
require-ensure
说明: require.ensure在需要的时候才下载依赖的模块，当参数指定的模块都下载下来了（下载下来的模块还没执行），便执行参数指定的回调函数。require.ensure会创建一个chunk，且可以指定该chunk的名称，如果这个chunk名已经存在了，则将本次依赖的模块合并到已经存在的chunk中，最后这个chunk在webpack构建的时候会单独生成一个文件。
语法: require.ensure(dependencies: String[], callback: function([require]), [chunkName: String])
dependencies: 依赖的模块数组
callback: 回调函数，该函数调用时会传一个require参数
chunkName: 模块名，用于构建时生成文件时命名使用
注意点：requi.ensure的模块只会被下载下来，不会被执行，只有在回调函数使用require(模块名)后，这个模块才会被执行。
示例

require-amd

源代码

webpack.config.amd.js

var path = require("path");
module.exports = {
    entry: "./example.amd.js",
    output: {
        path: path.join(__dirname, "amd"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    }
};
1
2
3
4
5
6
7
8
9
example.amd.js

require(["./module1"], function(module1) {
    console.log("aaa");
    var module2 = require("./module2");
    console.log("bbb");
});
1
2
3
4
5
module1.js

console.log("module1");
module.exports = 1;
1
2
module2.js

console.log("module2");
module.exports = 2;    
1
2
构建结果

命令行中运行webpack --config webpack.config.amd.js
- main.bundle.js
- example.amd.js
- 1.chunk.js
- module1.js
- module2.js

运行结果

浏览器中运行amd/index.html，控制台输出：

module1
aaa
module2
bbb
1
2
3
4
require-ensure

源代码

webpack.config.ensure.js

var path = require("path");
module.exports = {
    entry: "./example.ensure.js",
    output: {
        path: path.join(__dirname, "ensure"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    }
};
1
2
3
4
5
6
7
8
9
example.ensure.js

require.ensure(["./module1"], function(require) {
    console.log("aaa");
    var module2 = require("./module2");
    console.log("bbb");
    require("./module1");
}, 'test');
1
2
3
4
5
6
module1.js
同上

module2.js
同上
构建结果

命令行中运行webpack --config webpack.config.ensure.js
- main.bundle.js
- example.amd.js
- 1.chunk.js
- module1.js
- module2.js

运行结果

浏览器中运行ensure/index.html，控制台输出：

aaa
module2
bbb
module1
1
2
3
4
require-ensure-chunk

源代码

webpack.config.ensure.chunk.js

var path = require("path");
module.exports = {
    entry: "./example.ensur.chunk.js",
    output: {
        path: path.join(__dirname, "ensure-chunk"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    }
};
1
2
3
4
5
6
7
8
9
example.ensur.chunk.js

require.ensure(["./module1"], function(require) {
    console.log("aaa");
    require("./module1");
    console.log("bbb");
}, 'common');

require.ensure(["./module2"], function(require) {
    console.log("ccc");
    require("./module2");
    console.log("ddd");
}, 'common');
1
2
3
4
5
6
7
8
9
10
11
module1.js
同上

module2.js
同上
构建结果

命令行中运行webpack --config webpack.config.ensure.js
- main.bundle.js
- example.amd.js
- 1.chunk.js
- module1.js
- module2.js

运行结果

浏览器中运行ensure/index.html，控制台输出：

aaa
module1
bbb
ccc
1module2
ddd
