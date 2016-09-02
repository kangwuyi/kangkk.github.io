# MongoDB


## 安装 MongoDB

系统环境：ubuntu
```bash
apt-get install mongodb
```
查看进程是否启动
```bash
pgrep mongo -l
```

关闭或者启动
```bash
service mongodb stop
service mongodb start
```


## 设置连接密码：

在跟目录创建文件夹.
```bash
cd /home
mkdir data && mkdir data/db
```

关闭现有服务并重启。
```bash
service mongodb stop
mongod --auth
```
或者
```bash
service mongodb restart
netstat -nlt|grep 28017
```
```
tcp        0      0 127.0.0.1:28017         0.0.0.0:*               LISTEN
```

创建连接用户

```bash
mongo
```

```mongodb
> use admin
> db.addUser("root","1983")
```
关闭服务重启服务

```bash
service mongodb restart
netstat -nlt|grep 28017
```

查看是否开始验证：、

```bash
mongo
```

```mongodb
> use admin
> show collections
```

如果提示有错，进行用户验证：
```mongodb
> db.auth("root","1983")
> show collections
```
直至输出
```
system.indexes
system.users
```

### 设置客户端连接

默认安装的话只允许`127.0.0.1`的IP连接。

```bash
vi /etc/mongodb.conf
```
注释掉`#bind_ip = 0.0.0.0`

#### 远程连接认证失败

进入当前数据库添加用户
```
> db.addUser("root","1983")
```

#### 命令行远程连接

```bash
mongo 115.28.210.83:27017/strider-dongwm -u root -p
```
