# PostgreSQL查询工具

##  INSERT语句

```sql
INSERT INTO EMPLOYEES(  ID, NAME, AGE, ADDRESS, SALARY)  
VALUES
 (1, 'Maxsu', 25, '海口市人民大道2880号', 109990.00 ), 
(2, 'minsu', 25, '广州中山大道 ', 125000.00 ), 
(3, '李洋', 21, '北京市朝阳区', 185000.00),   
(4, 'Manisha', 24, 'Mumbai', 65000.00), 
(5, 'Larry', 21, 'Paris', 85000.00);
```

## SELECT语句

```sql
SELECT ID, NAME, AGE, SALARY  FROM EMPLOYEES;
```

## UPDATE语句

```sql
UPDATE table_name  
SET column1 = value1, column2 = value2...., columnN = valueN  
WHERE [condition];
```

## DELETE语句

```sql
DELETE FROM table_name  
WHERE [condition];
```

注意：如果不使用“WHERE”条件，整个表中的记录都将被删除 

## ORDER BY语句

`ORDER BY`子句用于按升序或降序对数据进行排序。数据在一列或多列的基础上进行排序。 

```sql
SELECT column-list  
FROM table_name  
[WHERE condition]  
[ORDER BY column1, column2, .. columnN] [ASC | DESC];
```

## GROUP BY语句

`GROUP BY`子句用于将具有相同数据的表中的这些行分组在一起。 它与`SELECT`语句一起使用。`GROUP BY`子句通过多个记录收集数据，并将结果分组到一个或多个列。 它也用于减少输出中的冗余

```sql
SELECT column-list  
FROM table_name  
WHERE [conditions ]  
GROUP BY column1, column2....columnN  
ORDER BY column1, column2....columnN
```

**实例,按name分组，统计薪水**

```sql
SELECT NAME, SUM(SALARY)   
FROM EMPLOYEES   
GROUP BY NAME;
```

## HAVING IN语句

HAVING子句与[GROUP BY](http://www.yiibai.com/postgresql/postgresql-group-by-clause.html)子句组合使用，用于选择函数结果满足某些条件的特定行。 

```sql
SELECT column1, column2  
FROM table1, table2  
WHERE [ conditions ]  
GROUP BY column1, column2  
HAVING [ conditions ]  
ORDER BY column1, column2
```

**实例，查询表中名字相同数大于2**

```sql
SELECT NAME,COUNT (NAME) 
FROM EMPLOYEES  
GROUP BY NAME HAVING COUNT (NAME) > 2;
```