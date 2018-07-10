# 视图

视图可以理解为一张虚拟的表，视图和表的区别如下

|      | 使用方式 | 占用物理空间              |
| ---- | -------- | ------------------------- |
| 视图 | 完全相同 | 不占用，仅保存的是SQL逻辑 |
| 表   | 完全相同 | 占用                      |

**使用视图的好处**

- sql语句提高重用性，效率高
- 和表实现了分离，提高了安全性

## 视图的创建

```sql
CREATE VIEW  视图名
AS
查询语句;
```

## 视图操作

```sql
--查看视图的数据 
SELECT * FROM my_v4;
SELECT * FROM my_v1 WHERE last_name='Partners';
--插入视图的数据
INSERT INTO my_v4(last_name,department_id) VALUES('虚竹',90);
--修改视图的数据
UPDATE my_v4 SET last_name ='梦姑' WHERE last_name='虚竹';
--删除视图的数据
DELETE FROM my_v4;
```

## 不能更新的视图

- 包含以下关键字的sql语句：分组函数、distinct、group  by、having、union或者union all
- 常量视图
- Select中包含子查询
- join
- from一个不能更新的视图
- where子句的子查询引用了from子句中的表

## 视图删除

```sql
DROP VIEW test_v1,test_v2,test_v3;
```

## 查看视图结构

```sql
DESC test_v7;
SHOW CREATE VIEW test_v7;
```