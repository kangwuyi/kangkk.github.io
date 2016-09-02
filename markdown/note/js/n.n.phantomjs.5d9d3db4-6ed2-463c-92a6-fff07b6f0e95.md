# phantomjs

PhantomJS 是一个基于 WebKit 的服务器端 JavaScript API。它全面支持web而不需浏览器支持，其快速，原生支持各种Web标准： DOM 处理, CSS 选择器, JSON, Canvas, 和 SVG。 PhantomJS 可以用于 页面自动化 ， 网络监测 ， 网页截屏 ，以及 无界面测试 等。


## 安装

[phantomjs](http://phantomjs.org/)下载对应操作系统的文件，比如LINUX，按照步骤安装并设置环境变量。

安装依赖。

```bash
sudo apt-get update
sudo apt-get install build-essential chrpath libssl-dev libxft-dev
sudo apt-get install libfreetype6 libfreetype6-dev
sudo apt-get install libfontconfig1 libfontconfig1-dev
```
下载文件。

```shell
aria2c https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2
tar -jxvf phantomjs-2.1.1-linux-x86_64.tar.bz2 && cd phantomjs-2.1.1-linux-x86_64.tar.bz2/bin
chmod +x phantomjs
vi /etc/profile
```

`profile`文件底部添加变量。

```sh
export PATH=${PATH}:/home/kang/application/phantomjs-2.1.1-linux-x86_64/bin/
```
退出文件后更新变量。

```bash
source /etc/profile
```

测试安装。

```bash
phantomjs -v
==> 2.1.1
```
## phantomjs-prebuilt

[phantomjs(github)](https://github.com/ariya/phantomjs)
