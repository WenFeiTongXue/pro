#设置客户端连接服务器端编码
SET NAMES UTF8;
#丢弃数据库，如果存在
DROP DATABASE IF EXISTS bbt;
#创建数据库，设置存储的编码
CREATE DATABASE bbt CHARSET=UTF8;
#进入该数据库
USE bbt;
create table bbt_user(
  `uid` int(11) PRIMARY KEY auto_increment,
  `uname` varchar(32) UNIQUE NOT NULL,
  `upwd` varchar(32) NOT NULL,
  `user_name` varchar(32) NOT NULL,
  `phone` varchar(16) default NULL,
  `avatar` varchar(128) default NULL
);