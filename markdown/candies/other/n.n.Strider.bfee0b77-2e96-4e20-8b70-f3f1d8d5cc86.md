# Strider

[Strider](git@github.com:DoctorMcKay/node-steamcommunity.git)是一个开源的持续集成和部署平台，使用Javascript Node.js和MongoDB架构，BSD许可证，概念上类似Travis 和 Jenkins，Strider是易设置使用和定制的。

## 安装Node

```bash
wget https://nodejs.org/dist/v4.4.2/node-v4.4.2.tar.gz
tar zxf node-v4.4.2.tar.gz
cd node-v4.4.2
./configure && make && sudo make install
```

## 安装Strider

```bash
git clone https://github.com/Strider-CD/strider
cd strider
npm install  # 安装依赖包
```

### 添加striderrc文件

```bash
vi .striderrc
```

```html
{
"db_uri": "mongodb://dongwm:dongwm@ds015720.mlab.com:15720/strider-dongwm",  # 我的VPS不够1G内存， 不能安装MongoDB， 使用 MongoLab的免费服务来测试
"smtp_host": "smtp.mailgun.org",  # Mailgun提供每天可发送300封邮件的免费服务， 我们用它来测试
"smtp_user": "postmaster@sandboxabe8d2f42ac8424fa8dd4c5ab1f1d92b.mailgun.org",
"smtp_pass": "4e0c2880f7aaf6c1b5f39bb88acabee1"
}
```

### 创建管理员用户

```html
DB_URI=mongodb://dongwm:dongwm@ds015720.mlab.com:15720/strider-dongwm node bin/strider addUser
```

### 关联github

这里移动要先到[github](https://github.com/settings/applications/new)注册一个开发者账号

之后在服务器端输入变量。
```bash
export SERVER_NAME=http://VPS:3000
export PLUGIN_GITHUB_APP_ID=Client ID
export PLUGIN_GITHUB_APP_SECRET=Client Secret
source ~/.bashrc
NODE_ENV=production npm start
```

更具体的信息参考[strider-gitlab](https://github.com/Strider-CD/strider-gitlab)。
