# MyBatis简介

## MyBatis概述

- MyBatis 是支持定制化SQL、存储过程以及高级映射的优秀的持久层框架。
- MyBatis 避免了几乎所有的JDBC 代码和手动设置参数以及获取结果集。
- MyBatis可以使用简单的XML或注解用于配置和原始映射，将接口和Java的POJO（Plain Old Java Objects，普通的Java对象）映射成数据库中的记录.

## Mybatis与其他持久化方式对比

- MyBatis是一个半自动化的持久化框架
- JDBC是SQL夹在Java代码中，耦合度高导致硬编码，维护不易且实际开发中SQL会经常变化
- Hibernate和JPA是内部自动产生的SQL语句，不容易做特殊优化，长而复杂的SQL，hibernate处理也不容易，是基于全映射的全自动化框架，大量子弹的pojo进行部分映射比较困难，导致数据库性能下降

**对于开发人员，核心SQL需要自己优化，所以需要SQL和java编码分开，功能界面明显，一个专注业务，一个专注数据**

## 文档资料

**下载地址：**https://github.com/mybatis/mybatis-3

**中文文档：**http://www.mybatis.org/mybatis-3/zh/index.html

# MyBatis的HelloWord

## 概述

随着Maven的流行，现在几乎很少有使用jar的方式来搭建开发环境，这里也就不在单个使用Mybatis去操作数据库，不会的可以自行百度，MyBatis只是一个持久化框架，只有和其他框架整合才能更好的使用，例如SpringMVC，SpringBoot等，与Spring整合后，Mybatis的一些配置文件都会交于Spring管理。