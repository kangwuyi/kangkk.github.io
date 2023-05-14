# redis

## 安装
```bash
apt-cache search redis
apt-get install redis-server
```

- 配置文件：/etc/redis/redis.conf
- 服务路径：/etc/init.d/redis-server

## 设置访问密码

```bash
vi /etc/redis/redis.conf
```
在redis.conf文件中查找`requirepass`字符串
```bash
/requirepass
```
取消注释requirepass

登陆Redis服务器，输入密码
```bash
redis-cli -a redisredis
```
## 启动redis
```bash
cd /etc/init.d
redis-server &
```

## 检查Redis服务器系统进程
```bash
ps -aux|grep redis
```
```
redis     6578  0.0  0.7  39844  7280 ?        Ssl  21:55   0:00 /usr/bin/redis-server *:6379               
root      6585  0.0  0.0  11740   932 pts/0    S+   22:00   0:00 grep --color=auto redis
```

## 通过启动命令检查Redis服务器状态
```bash
netstat -nlt|grep 6379
```
```
tcp        0      0 0.0.0.0:6379            0.0.0.0:*               LISTEN     
tcp6       0      0 :::6379                 :::*                    LISTEN
```
## 远程访问

默认情况下，Redis服务器不允许远程访问，只允许本机访问，所以我们需要设置打开远程访问的功能。

打开Redis服务器的配置文件redis.conf
```bash
vi /etc/redis/redis.conf
```
注释`bind`
```bash
#bind 127.0.0.1
```
修改后，重启Redis服务器。
```bash
service redis-server restart
```

## 问题处理

	> java.net.ConnectException: 拒绝连接
