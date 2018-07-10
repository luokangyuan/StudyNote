# PostgreSQL连接

- 内连接(INNER JOIN)
- 左外连接(LEFT OUTER JOIN)
- 右外连接(RIGHT OUTER JOIN)
- 全连接(FULL OUTER JOIN)
- 跨连接(CROSS JOIN)

##  INNER JOIN内连接

内部连接也被称为连接或简单连接。 这是最常见的连接类型。 此连接返回满足连接条件的多个表中的所有行。 简单讲，就是返回两张表中共同拥有的部分

```sql
SELECT table1.columns, table2.columns  
FROM table1  
INNER JOIN table2  
ON table1.common_filed = table2.common_field;
```

## LEFT JOIN左外连接

左外连接返回从“`ON`”条件中指定的左侧表中的所有行，只返回满足条件的另一个表中的行。 简单讲on条件中左侧表的全部加上两张表共同的部分

```sql
SELECT table1.columns, table2.columns  
FROM table1  
LEFT OUTER JOIN table2  
ON table1.common_filed = table2.common_field;
```

返回的是table1的全部和table1和table2共同的记录

## RIGHT JOIN右外连接

右外连接返回从“`ON`”条件中指定的右侧表中的所有行，只返回满足条件的另一个表中的行。 

```sql
SELECT table1.columns, table2.columns  
FROM table1  
RIGHT OUTER JOIN table2  
ON table1.common_filed = table2.common_field;
```

返回的是table2的全部记录和table1和table2共同的部分

## FULL 全外连接

FULL外连接从LEFT手表和RIGHT表中返回所有行。 它将`NULL`置于不满足连接条件的位置。 

```sql
SELECT table1.columns, table2.columns  
FROM table1  
FULL OUTER JOIN table2  
ON table1.common_filed = table2.common_field;
```

## CROSS跨连接

跨连接(`CROSS JOIN`)将第一个表的每一行与第二个表的每一行相匹配。 它也被称为笛卡儿积分。 如果`table1`具有“`x`”列，而`table2`具有“`y`”列，则所得到的表将具有(`x + y`)列。 

```sql
SELECT coloums   
FROM table1   
CROSS JOIN table2
```