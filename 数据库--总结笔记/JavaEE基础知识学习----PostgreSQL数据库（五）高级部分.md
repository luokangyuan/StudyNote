# PostgreSQL高级部分

## PostgreSQL视图

在PostgreSQL中，视图(VIEW)是一个伪表。 它不是物理表，而是作为普通表选择查询。 视图也可以表示连接的表。 它可以包含表的所有行或来自一个或多个表的所选行。 

**使用视图的优点**

- 它以自然和直观的方式构建数据，并使其易于查找。
- 它限制对数据的访问，使得用户只能看到有限的数据而不是完整的数据。
- 它归总来自各种表中的数据以生成报告。

### 创建视图

可以使用`CREATE VIEW`语句来在PostgreSQL中创建视图。 您可以从单个表，多个表以及另一个视图创建它。 

```sql
CREATE [TEMP | TEMPORARY] VIEW view_name AS  
SELECT column1, column2.....  
FROM table_name  
WHERE [condition];
```

**创建视图实例,在Employees表创建一个视图，此视图仅包含Employee表中的几个列**

```sql
CREATE VIEW current_employees AS  
SELECT NAME, ID, SALARY 
FROM EMPLOYEES;
```

这个时候，你可以在视图下看到current_employees视图

**使用视图**

```sql
SELECT * FROM current_employees;
```

**删除视图**

```sql
DROP VIEW current_employees;
```

## PostgreSQL函数

PostgreSQL函数也称为PostgreSQL存储过程。 PostgreSQL函数或存储过程是存储在数据库服务器上并可以使用SQL界面调用的一组SQL和过程语句(声明，分配，循环，控制流程等)。 它有助于您执行通常在数据库中的单个函数中进行多次查询和往返操作的操作。可以在许多语言(如SQL，PL/pgSQL，C，Python等)中创建PostgreSQL函数。

```sql
CREATE [OR REPLACE] FUNCTION function_name (arguments)   
RETURNS return_datatype AS $variable_name$  
  DECLARE  
    declaration;  
    [...]  
  BEGIN  
    < function_body >  
    [...]  
    RETURN { variable_name | value }  
  END; LANGUAGE plpgsql;
```

**说明：**

- `function_name`：指定函数的名称。
- `[OR REPLACE]`：是可选的，它允许您修改/替换现有函数。
- `RETURN`：它指定要从函数返回的数据类型。它可以是基础，复合或域类型，或者也可以引用表列的类型。
- `function_body`：`function_body`包含可执行部分。
- `plpgsql`：它指定实现该函数的语言的名称。

**实例，在Employee表上创建一个total records() 函数**

```sql
CREATE OR REPLACE FUNCTION totalRecords ()  
RETURNS integer AS $total$  
declare  
    total integer;  
BEGIN  
   SELECT count(*) into total FROM EMPLOYEES;  
   RETURN total;  
END;  
$total$ LANGUAGE plpgsql;
```

**调用函数**

```sql
select totalRecords();
```

## PostgreSQL触发器

PostgreSQL触发器是一组动作或数据库回调函数，它们在指定的表上执行指定的数据库事件(即，`INSERT`，`UPDATE`，`DELETE`或`TRUNCATE`语句)时自动运行。 触发器用于验证输入数据，执行业务规则，保持审计跟踪等。 

### 说明

- PostgreSQL在以下情况下执行/调用触发器：在尝试操作之前(在检查约束并尝试`INSERT`，`UPDATE`或`DELETE`之前)。或者在操作完成后(在检查约束并且`INSERT`，`UPDATE`或`DELETE`完成后)。或者不是操作(在视图中`INSERT`，`UPDATE`或`DELETE`的情况下)
- 对于操作修改的每一行，都会调用一个标记为`FOR EACH ROWS`的触发器。 另一方面，标记为`FOR EACH STATEMENT`的触发器只对任何给定的操作执行一次，而不管它修改多少行。
- 您可以为同一事件定义同一类型的多个触发器，但条件是按名称按字母顺序触发。
- 当与它们相关联的表被删除时，触发器被自动删除。

### 创建触发器

```sql
CREATE  TRIGGER trigger_name [BEFORE|AFTER|INSTEAD OF] event_name  
ON table_name  
[  
 -- Trigger logic goes here....  
];
```

在这里，`event_name`可以是`INSERT`，`UPDATE`，`DELETE`和`TRUNCATE`数据库操作上提到的表`table_name`。 您可以选择在表名后指定`FOR EACH ROW`。下面来看看看如何在`INSERT`操作中创建触发器的语法。

```sql
CREATE  TRIGGER trigger_name AFTER INSERT ON column_name  
ON table_name  
[  
 -- Trigger logic goes here....  
];
```

### 实例

当插入一条数据到审核表COMPANY时，就会在AUDIL表中插入一条记录

**先在审核表中创建一个函数auditlogfunc**

```sql
CREATE OR REPLACE FUNCTION auditlogfunc() RETURNS TRIGGER AS $example_table$  
    BEGIN  
        INSERT INTO AUDIT(EMP_ID, ENTRY_DATE) VALUES (new.ID, current_timestamp);  
        RETURN NEW;   
    END;  
$example_table$ LANGUAGE plpgsql;
```

**COMPANY表上创建触发器**

```sql
CREATE TRIGGER example_trigger AFTER INSERT ON COMPANY  
FOR EACH ROW EXECUTE PROCEDURE auditlogfunc();
```

**向审核表中插入数据测试**

```sql
INSERT INTO COMPANY VALUES(1, '小米科技', 8, '北京市朝阳区', 9999);
INSERT INTO COMPANY VALUES(2, '京东中科', 6, '广州市天河区', 8999);
```

### 触发器使用场景

- 验证输入数据。
- 执行业务规则。
- 为不同文件中新插入的行生成唯一值。
- 写入其他文件以进行审计跟踪。
- 从其他文件查询交叉引用目的。
- 访问系统函数。
- 将数据复制到不同的文件以实现数据一致性。

### 触发器的优点

- 它提高了应用程序的开发速度。 因为数据库存储触发器，所以您不必将触发器操作编码到每个数据库应用程序中。
- 全局执法业务规则。定义触发器一次，然后将其重用于使用数据库的任何应用程序。
- 更容易维护 如果业务策略发生变化，则只需更改相应的触发程序，而不是每个应用程序。
- 提高客户/服务器环境的性能。 所有规则在结果返回之前在服务器中运行。

## PostgreSQL索引

索引是用于加速从数据库检索数据的特殊查找表。数据库索引类似于书的索引(目录)。 索引为出现在索引列中的每个值创建一个条目。 

### 特点

- 索引使用`SELECT`查询和`WHERE`子句加速数据输出，但是会减慢使用`INSERT`和`UPDATE`语句输入的数据。
- 您可以在不影响数据的情况下创建或删除索引。
- 可以通过使用`CREATE INDEX`语句创建索引，指定创建索引的索引名称和表或列名称。
- 还可以创建一个唯一索引，类似于唯一约束，该索引防止列或列的组合上有一个索引重复的项

### 创建索引

```sql
CREATE INDEX index_name ON table_name;
```

### 索引类型

PostgreSQL中有几种索引类型，如`B-tree`，`Hash`，`GiST`，`SP-GiST`和`GIN`等。每种索引类型根据不同的查询使用不同的算法。 默认情况下，`CREATE INDEX`命令使用**B树**索引。 

### 单列索引

如果仅在一个表列中创建索引，则将其称为单列索引。 

```sql
CREATE INDEX index_name  
ON table_name (column_name);
```

### 多列索引

如果通过使用表的多个列创建索引，则称为多列索引。 

```sql
CREATE INDEX index_name  
ON table_name (column1_name, column2_name);
```

### 唯一索引

创建唯一索引以获取数据的完整性并提高性能。它不允许向表中插入重复的值，或者在原来表中有相同记录的列上也不能创建索引。 

```sql
CREATE UNIQUE INDEX index_name  
on table_name (column_name);
```

### 删除索引

```sql
DROP INDEX index_name;
```

### 避免使用索引场景

- 应该避免在小表上使用索引。
- 不要为具有频繁，大批量更新或插入操作的表创建索引。
- 索引不应用于包含大量`NULL`值的列。
- 不要在经常操作(修改)的列上创建索引。

## PostgreSQL日期函数

| 函数                  | 描述                                    |
| --------------------- | --------------------------------------- |
| `AGE()`               | 减去参数                                |
| `CURRENT DATE/TIME()` | 它指定当前日期和时间。                  |
| `DATE_PART()`         | 获取子字段(相当于提取)                  |
| `EXTRACT()`           | 获得子字段                              |
| `ISFINITE()`          | 测试有限的日期，时间和间隔(非+/-无穷大) |
| `JUSTIFY`             | 调整间隔                                |

### AGE(timestamp，timestamp)＆AGE(timestamp)

| 函数                        | 描述                                                         |
| --------------------------- | ------------------------------------------------------------ |
| `age(timestamp, timestamp)` | 当使用第二个参数的时间戳形式调用时，`age()`减去参数，产生使用年数和月份的类型为“`interval`”的“符号”结果。 |
| `age(timestamp)`            | 当仅使用时间戳作为参数调用时，`age()`从`current_date(午夜)`减去。 |

**AGE函数实例**

```sql
SELECT AGE(timestamp '2017-01-26', timestamp '1951-08-15'); --结果是65 year 5 mons 11 day
```

### 当前时间函数

| 函数                         | 描述                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| CURRENT_DATE                 | 提供当前日期                                                 |
| CURRENT_TIME                 | 提供带时区的值                                               |
| CURRENT_TIMESTAMP            | 提供带时区的值                                               |
| CURRENT_TIME(precision)      | 选择使用`precision`参数，使结果在四分之一秒的范围内四舍五入到数位数。 |
| CURRENT_TIMESTAMP(precision) | 选择使用精度参数，这将使结果在四分之一秒的范围内四舍五入到数位数。 |
| LOCALTIME                    | 提供没有时区的值。                                           |
| LOCALTIMESTAMP               | 提供没有时区的值。                                           |
| LOCALTIME(precision)         | 选择使用精度参数，这将使结果在四分之一秒的范围内四舍五入到数位数。 |
| LOCALTIMESTAMP(precision)    | 选择使用精度参数，这将使结果在四分之一秒的范围内四舍五入到数位数。 |

**实例**

```sql
SELECT CURRENT_TIME; --获取当前时间
SELECT CURRENT_DATE; --获取当前日期
SELECT CURRENT_TIMESTAMP; --获取当前时间戳
SELECT CURRENT_TIMESTAMP(2); --虎丘当前时间戳更精确
SELECT LOCALTIMESTAMP; --获取本地时间戳
```

## PostgreSQL UNIONS语句

PostgreSQL UNION子句/运算符用于组合两个或多个SELECT语句的结果，而不返回任何重复的行。要使用UNION，每个SELECT必须具有相同的列数，相同数量的列表达式，相同的数据类型，并且具有相同的顺序，但不一定要相同。

### 语法

```sql
SELECT column1 [, column2 ]
FROM table1 [, table2 ]
[WHERE condition]

UNION

SELECT column1 [, column2 ]
FROM table1 [, table2 ]
[WHERE condition]
```

**实例**

```sql
SELECT EMP_ID, NAME, DEPT FROM COMPANY INNER JOIN DEPARTMENT
        ON COMPANY.ID = DEPARTMENT.EMP_ID
   UNION
     SELECT EMP_ID, NAME, DEPT FROM COMPANY LEFT OUTER JOIN DEPARTMENT
        ON COMPANY.ID = DEPARTMENT.EMP_ID;
```

### UNION ALL语句

`UNION ALL`运算符用于组合两个`SELECT`语句(包括重复行)的结果。 适用UNION的相同规则也适用于`UNION ALL`运算符。 

```sql
SELECT column1 [, column2 ]
FROM table1 [, table2 ]
[WHERE condition]

UNION ALL

SELECT column1 [, column2 ]
FROM table1 [, table2 ]
[WHERE condition]
```

## PostgreSQL NULL

PostgreSQL `NULL`是用于表示缺少值的术语。 表中的`NULL`值是一个字段中的值，显示为空白。具有`NULL`值的字段是没有值的字段。要知道一个`NULL`值与零值或包含空格的字段不同是非常重要的。

### IS NOT NULL

```sql
SELECT  ID, NAME, AGE, ADDRESS, SALARY
        FROM COMPANY
        WHERE SALARY IS NOT NULL;
```

### IS NULL

```sql
SELECT  ID, NAME, AGE, ADDRESS, SALARY
        FROM COMPANY
        WHERE SALARY IS NULL;
```

## PostgreSQL修改表

PostgreSQL ALTER TABLE命令用于添加，删除或修改现有表中的列。您还可以使用`ALTER TABLE`命令在现有表上添加和删除各种约束。 

### 语法

使用`ALTER TABLE`语句在现有表中添加新列的基本语法如下： 

```sql
ALTER TABLE table_name ADD column_name datatype;
```

现有表中`ALTER TABLE`到`DROP COLUMN`(删除某个字段)的基本语法如下： 

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

`ALTER TABLE`更改表中列的`DATA TYPE`(修改字段类型)的基本语法如下：

```sql
ALTER TABLE table_name ALTER COLUMN column_name TYPE datatype;
```

`ALTER TABLE`向表中的列添加`NOT NULL`约束的基本语法如下：

```sql
ALTER TABLE table_name MODIFY column_name datatype NOT NULL;
```

`ALTER TABLE`添加唯一约束`ADD UNIQUE CONSTRAINT`到表中的基本语法如下：

```sql
ALTER TABLE table_name
ADD CONSTRAINT MyUniqueConstraint UNIQUE(column1, column2...);
```

`ALTER TABLE`将“检查约束”添加到表中的基本语法如下所示：

```sql
ALTER TABLE table_name
ADD CONSTRAINT MyUniqueConstraint CHECK (CONDITION);
```

`ALTER TABLE`添加主键`ADD PRIMARY KEY`约束的基本语法如下：

```sql
ALTER TABLE table_name
ADD CONSTRAINT MyPrimaryKey PRIMARY KEY (column1, column2...);
```

使用`ALTER TABLE`从表中删除约束(`DROP CONSTRAINT`)的基本语法如下：

```sql
ALTER TABLE table_name
DROP CONSTRAINT MyUniqueConstraint;
```

使用`ALTER TABLE`从表中删除主键约束(`DROP PRIMARY KEY`)约束的基本语法如下：

```sql
ALTER TABLE table_name
DROP CONSTRAINT MyPrimaryKey;
```

## PostgreSQL子查询

子查询或内部查询或嵌套查询是一个PostgreSQL查询中的查询，它可以嵌入到`WHERE`子句中。子查询用于返回将在主查询中使用的数据作为进一步限制要检索的数据的条件。 子查询可以与`SELECT`，`INSERT`，`UPDATE`和`DELETE`语句以及运算符(如`=`，`<`，`>`，`>=`，`<=`，`IN`等)一起使用。 

- 子查询必须括在括号中。
- 子查询在SELECT子句中只能有一列，除非主查询中有多个列用于比较其所选列的子查询。
- `ORDER BY`不能用于子查询，主查询可以使用`ORDER BY`，`GROUP BY`可用执行与子查询中的`ORDER BY`相同的功能。
- 返回多行的子查询只能与多个值运算符一起使用，例如：`IN`，`EXISTS`，`NOT IN`，`ANY / SOME`，`ALL`运算符。
- `BETWEEN`运算符不能与子查询一起使用; 但是，`BETWEEN`可以在子查询中使用。

### 带SELECT语句的子查询

```sql
SELECT column_name [, column_name ]
FROM   table1 [, table2 ]
WHERE  column_name OPERATOR
      (SELECT column_name [, column_name ]
      FROM table1 [, table2 ]
      [WHERE])
```

**实例**

```sql
SELECT *
     FROM COMPANY
     WHERE ID IN (SELECT ID
                  FROM COMPANY
                  WHERE SALARY > 45000) ;
```

### 带INSERT语句的子查询

子查询也可以用于INSERT语句。INSERT语句使用从子查询返回的数据插入另一个表。 可以使用任何字符，日期或数字函数修改子查询中选定的数据。 

```sql
INSERT INTO table_name [ (column1 [, column2 ]) ]
           SELECT [ *|column1 [, column2 ]
           FROM table1 [, table2 ]
           [ WHERE VALUE OPERATOR ]
```

```sql
INSERT INTO COMPANY_BKP
     SELECT * FROM COMPANY
     WHERE ID IN (SELECT ID
                  FROM COMPANY) ;
```

### 带UPDATE语句的子查询

子查询可以与`UPDATE`语句一起使用。 当使用具有`UPDATE`语句的子查询时，可以更新表中的单列或多列 

```sql
UPDATE table
SET column_name = new_value
[ WHERE OPERATOR [ VALUE ]
   (SELECT COLUMN_NAME
   FROM TABLE_NAME)
   [ WHERE) ]
```

**实例**

假设我们有一个名为`COMPANY_BKP`表，它是`COMPANY`表的备份。以下示例将所有客户(其`AGE`大于或等于`27`)在`COMPANY`表中的`SALARY`更新为`0.50`倍：

```sql
UPDATE COMPANY
     SET SALARY = SALARY * 0.50
     WHERE AGE IN (SELECT AGE FROM COMPANY_BKP
                   WHERE AGE >= 27 );
```

### 带有DELETE语句的子查询

```sql
DELETE FROM TABLE_NAME
[ WHERE OPERATOR [ VALUE ]
   (SELECT COLUMN_NAME
   FROM TABLE_NAME)
   [ WHERE) ]
```

**实例**

假设我们有一个`COMPANY_BKP`表，它是`COMPANY`表的备份。以下示例从`COMPANY` 表中删除所有客户的记录，其`AGE`大于或等于`27`数据记录

```sql
DELETE FROM COMPANY
     WHERE AGE IN (SELECT AGE FROM COMPANY_BKP
                   WHERE AGE > 27 );
```

