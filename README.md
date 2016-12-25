[toc]

#npm私有仓库
* 教程：[https://github.com/cnpm/cnpmjs.org/wiki/Deploy](https://github.com/cnpm/cnpmjs.org/wiki/Deploy),
[http://blog.fens.me/nodejs-cnpm-npm/](http://blog.fens.me/nodejs-cnpm-npm/)
* 相关路径:
```
 ~/.cnpmjs.org/download   //临时下载目录
 ~/.cnpmjs.org/nfs   //存储目录
```

<br>
<br>
####创建容器
```
docker run --name macmini-mysql -p 3306:3306 -v /Users/a16120119/code/mysql_data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1 -d mysql:8 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```
####进入容器
```
docker exec -it 31c bash
```
####使用root帐户本地登录（容器内）
```
mysql -uroot -p
```
####为cnpm创建数据库帐户（容器内）
```
insert into mysql.user (host,user,authentication_string,ssl_cipher,x509_issuer,x509_subject) values ('127.0.0.1','cnpm',password('2Sxo*eXeAI^C5EOrDQSpSQ70*eqOMJ$2'),'','','');
insert into mysql.user (host,user,authentication_string,ssl_cipher,x509_issuer,x509_subject) values ('::1','cnpm',password('2Sxo*eXeAI^C5EOrDQSpSQ70*eqOMJ$2'),'','','');
insert into mysql.user (host,user,authentication_string,ssl_cipher,x509_issuer,x509_subject) values ('localhost','cnpm',password('2Sxo*eXeAI^C5EOrDQSpSQ70*eqOMJ$2'),'','','');
insert into mysql.user (host,user,authentication_string,ssl_cipher,x509_issuer,x509_subject) values ('10.24.47.136','cnpm',password('2Sxo*eXeAI^C5EOrDQSpSQ70*eqOMJ$2'),'','','');
FLUSH PRIVILEGES;
```
####为cnpm创建数据库（容器内）
```
create database cnpmDB;
//为cnpm用户设置数据库访问权限
grant all privileges on cnpmDB.* to cnpm@localhost identified by '2Sxo*eXeAI^C5EOrDQSpSQ70*eqOMJ$2';
flush privileges;
```

####拉取私有仓库源码
```
git pull https://github.com/rockcitystore/cnpmjs.org.git
```
####安装私有仓库
```
npm install --registry=https://registry.npm.taobao.org
make test
```


####挂载docs/db.sql
```
cp docs/db.sql /Users/a16120119/code/mysql_data/
```
####创建表（容器内）
```
mysql> use cnpmjs;
mysql> source /var/lib/mysql/db.sql
```

####配置私有仓库(可选)
```
//Users/a16120119/code/cnpmjs.org-master/config/config.js
module.exports = {
    debug: false,
    enableCluster: true, // enable cluster mode
    mysqlServers: [
      {
        host: 'localhost',
        port: 3306,
        user: 'cnpm',
        password: '2Sxo*eXeAI^C5EOrDQSpSQ70*eqOMJ$2',
      }
    ],
    mysqlDatabase: 'cnpmDB',
    enablePrivate: false, // enable private mode, only admin can publish, other use just can sync package from source npm
    admins: {
      admin: 'a16120119@10.24.47.136',
    },
    syncModel: 'exist'// 'none', 'all', 'exist'
    }; 

```

####启动私有仓库
```
npm run start
```


####停止私有仓库
```
npm run stop
```