# PostgreSQL基础部分

## PostgreSQL简介

PostgreSQL是一个功能强大的开源对象**关系数据库**管理系统(ORDBMS)。 用于安全地存储数据; 支持最佳做法，并允许在处理请求时检索它们。 

## PostgreSQL特点

- PostgreSQL可在所有主要操作系统(即Linux，UNIX(AIX，BSD，HP-UX，SGI IRIX，Mac OS X，Solaris，Tru64)和Windows等)上运行。
- PostgreSQL支持文本，图像，声音和视频，并包括用于C/C++，Java，Perl，Python，Ruby，Tcl和开放数据库连接(ODBC)的编程接口。
- PostgreSQL支持SQL的许多功能，例如复杂SQL查询，SQL子选择，外键，触发器，视图，事务，多进程并发控制(MVCC)，流式复制(9.0)，热备(9.0))。
- 在PostgreSQL中，表可以设置为从“父”表继承其特征。
- 可以安装多个扩展以向PostgreSQL添加附加功能。

##  PostgreSQL语法

可以使用`help`语句查看所有postgreSQL语句的语法。 按照以下步骤查看PostgreSQL中所有语句的语法。

- 安装postgreSQL后，打开`psql`为：程序文件 -> PostgreSQL 9.2 -> SQL Shell(psql)
- 使用以下语句查看特定语句的语法。 postgres-＃\ help＆

##  PostgreSQL数据类型

数据类型指定要在表字段中存储哪种类型的数据。 在创建表时，对于每列必须使用数据类型。 以下是PostgreSQL中主要有三种类型的数据类型：

- 数值数据类型
- 字符串数据类型
- 日期/时间数据类型

###  数值数据类型

| 名称      | 描述                                   | 存储大小 | 范围                                                    |
| --------- | -------------------------------------- | -------- | ------------------------------------------------------- |
| smallint  | 存储整数，小范围                       | 2字节    | -32768 至 +32767                                        |
| integer   | 存储整数。使用这个类型可存储典型的整数 | 4字节    | -2147483648 至 +2147483647                              |
| bigint    | 存储整数，大范围。                     | 8字节    | -9223372036854775808 至 9223372036854775807             |
| decimal   | 用户指定的精度，精确                   | 变量     | 小数点前最多为131072个数字; 小数点后最多为16383个数字。 |
| numeric   | 用户指定的精度，精确                   | 变量     | 小数点前最多为131072个数字; 小数点后最多为16383个数字。 |
| real      | 可变精度，不精确                       | 4字节    | 6位数字精度                                             |
| double    | 可变精度，不精确                       | 8字节    | 15位数字精度                                            |
| serial    | 自动递增整数                           | 4字节    | 1 至 2147483647                                         |
| bigserial | 大的自动递增整数                       | 8字节    | 1 至 9223372036854775807                                |

### 字符串数据类型

| 数据类型                | 描述                                                         |
| ----------------------- | ------------------------------------------------------------ |
| char(size)              | 这里`size`是要存储的字符数。固定长度字符串，右边的空格填充到相等大小的字符。 |
| character(size)         | 这里`size`是要存储的字符数。 固定长度字符串。 右边的空格填充到相等大小的字符。 |
| varchar(size)           | 这里`size`是要存储的字符数。 可变长度字符串。                |
| character varying(size) | 这里`size`是要存储的字符数。 可变长度字符串。                |
| text                    | 可变长度字符串。                                             |

### 日期/时间数据类型

| 名称                         | 描述                   | 存储大小 | 最小值        | 最大值        | 解析度       |
| ---------------------------- | ---------------------- | -------- | ------------- | ------------- | ------------ |
| timestamp [ (p) ][不带时区 ] | 日期和时间(无时区)     | 8字节    | 4713 bc       | 294276 ad     | 1微秒/14位数 |
| timestamp [ (p) ]带时区      | 包括日期和时间，带时区 | 8字节    | 4713 bc       | 294276 ad     |              |
| date                         | 日期(没有时间)         | 4字节    | 4713 bc       | 5874897 ad    | 1微秒/14位数 |
| time [ (p) ][ 不带时区 ]     | 时间(无日期)           | 8字节    | 00:00:00      | 24:00:00      | 1微秒/14位数 |
| time [ (p) ] 带时区          | 仅限时间，带时区       | 12字节   | 00:00:00+1459 | 24:00:00-1459 | 1微秒/14位数 |
| interval [ fields ][ (p) ]   | 时间间隔               | 12字节   | -178000000年  | 178000000年   | 1微秒/14位数 |

## PostgreSQL基本使用

### 创建数据库

可以使用数据库客户端pgAdmin来创建数据库,下面说的是使用SQL shell查询工具来创建数据库

```sql
create database testdb;
```

### 查看数据库

```properties
postgres=# \l
```

### 删除数据库

```properties
postgres=# drop database testdb;
DROP DATABASE
postgres=#
```

### 创建表

```sql
CREATE TABLE table_name(  
   column1 datatype,  
   column2 datatype,  
   column3 datatype,  
   .....  
   columnN datatype,  
   PRIMARY KEY( one or more columns )  
);
```

### 删除表

```properties
postgres=# drop table student2;
DROP TABLE
```

## PostgreSQL模式

模式(也叫架构)是指定的表集合。 它还可以包含视图，索引，序列，数据类型，运算符和函数。 尤为重要

### 创建模式语法

```sql
CREATE SCHEMA schema_name;
```

### 创建模式实例

```sql
CREATE SCHEMA myschema;
```

### 在模式下新建表

```sql
CREATE TABLE myschema.tb_test
(
  id integer,
  name character(254)
)
WITH (
  OIDS=FALSE
);
```

### 使用模式的优点

- 模式有助于多用户使用一个数据库，而不会互相干扰。
- 它将数据库对象组织成逻辑组，使其更易于管理。
- 可以将第三方模式放入单独的模式中，以避免与其他对象的名称相冲突。