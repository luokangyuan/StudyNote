# DDL语言学习

## 库和表管理

**库的管理**

```sql
--创建库
create database 库名
--删除库
drop database 库名
```

**表的管理**

```sql
--创建表
CREATE TABLE IF NOT EXISTS stuinfo(
	stuId INT,
	stuName VARCHAR(20),
	gender CHAR,
	bornDate DATETIME);
DESC studentinfo;
--修改表 alter
ALTER TABLE 表名 ADD|MODIFY|DROP|CHANGE COLUMN 字段名 【字段类型】;
--修改字段名
ALTER TABLE studentinfo CHANGE  COLUMN sex gender CHAR;
--修改表名
ALTER TABLE stuinfo RENAME [TO]  studentinfo;
--修改字段类型和列级约束
ALTER TABLE studentinfo MODIFY COLUMN borndate DATE ;
--添加字段
ALTER TABLE studentinfo ADD COLUMN email VARCHAR(20) first;
--删除字段
ALTER TABLE studentinfo DROP COLUMN email;
--删除表
DROP TABLE [IF EXISTS] studentinfo;
```