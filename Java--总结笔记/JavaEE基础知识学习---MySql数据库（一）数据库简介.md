# 数据库简介

## 数据库优点

- 持久化数据到本地
- 可以实现结构化查询，方便管理

## 数据库相关概念

- DB：数据库，保存一组有组织的数据的容器
- DBMS：数据库管理系统，又称为数据库软件（产品），用于管理DB中的数据
- SQL:结构化查询语言，用于和DBMS通信的语言

## 数据库存储特点

- 将数据放到表中，表再放到库中
- 一个数据库中可以有多个表，每个表都有一个的名字，用来标识自己。表名具有唯一性。
- 表具有一些特性，这些特性定义了数据在表中如何存储，类似java中 “类”的设计。
- 表由列组成，我们也称为字段。所有表都是由一个或多个列组成的，每一列类似java 中的”属性”
- 表中的数据是按行存储的，每一行类似于java中的“对象”。

## Mysql常用命令

**查看当前所有的数据库**

```sql
show databases;
```

**打开指定的库**

```sql
use 库名
```

**查看当前库的所有表**

```sql
show tables;
```

**查看其它库的所有表**

```sql
show tables from 库名;
```

**创建表**

```sql
create table 表名(
    列名 列类型,
	列名 列类型
    );
```

**查看表结构**

```sql
desc 表名;
```

## Mysql语法规范

- 不区分大小写,但建议关键字大写，表名、列名小写
- 每条命令最好用分号结尾
- 每条命令根据需要，可以进行缩进 或换行
- 注释
  - 单行注释：#注释文字
  - 单行注释：-- 注释文字
  - 多行注释：/* 注释文字  */

## SQL语言分类

- DQL（Data Query Language）：数据查询语言，例如：select 
- DML(Data Manipulate Language):数据操作语言，例如：insert 、update、delete
- DDL（Data Define Languge）：数据定义语言，例如：create、drop、alter
- TCL（Transaction Control Language）：事务控制语言，例如：commit、rollback