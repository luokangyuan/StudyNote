# PostgreSQL条件查询

PostgreSQL条件用于从数据库获取更具体的结果。 通常与WHERE子句一起使用。 具有子句的条件就像双层过滤器。 

- AND 条件
- OR 条件
- AND & OR 条件
- NOT 条件
- LIKE 条件
- IN 条件
- NOT IN 条件
- BETWEEN 条件

## AND条件

AND条件与`WHERE`子句一起使用，以从表中的多个列中选择唯一的数据。 

```sql
SELECT column1, column2, ..... columnN    
FROM table_name    
WHERE [search_condition]    
AND [search_condition];
```

## OR条件

OR条件与`WHERE`子句一起使用，以从表中的一列或多列列中选择唯一数据 

```sql
SELECT column1, column2, ..... columnN    
FROM table_name    
WHERE [search_condition]    
OR [search_condition];
```

**OR和AND一起使用实例**

```sql
SELECT *  
FROM EMPLOYEES  
WHERE (NAME = 'Minsu' AND ADDRESS = 'Delhi')  
OR (ID>= 8);
```

## NOT条件

NOT条件与WHERE子句一起使用以否定查询中的条件。 

```sql
SELECT column1, column2, ..... columnN    
FROM table_name    
WHERE [search_condition] NOT [condition];
```

**实例**

```sql
SELECT *  
FROM EMPLOYEES  
WHERE address IS NOT NULL ;
--查询年龄不是21和24的所有记录
SELECT *  
FROM EMPLOYEES  
WHERE age NOT IN(21,24) ;
```

## LIKE条件

LIKE条件与WHERE子句一起用于从指定条件满足`LIKE`条件的表中获取数据 

```sql
SELECT column1, column2, ..... columnN    
FROM table_name    
WHERE [search_condition] LIKE [condition];
```

**实例，查询名字以Ma开头记录**

```sql
SELECT *   
FROM EMPLOYEES   
WHERE NAME LIKE 'Ma%';
```

## IN条件

IN条件与WHERE子句一起使用，从指定条件满足`IN`条件的表中获取数据。 

```sql
SELECT column1, column2, ..... columnN    
FROM table_name    
WHERE [search_condition] IN [condition];
```

**实例,查询年龄是19,21的记录**

```sql
SELECT *  
FROM EMPLOYEES  
WHERE AGE IN (19, 21);
```

## NOT IN条件

NOT IN条件与WHERE子句一起使用，以从指定条件否定`IN`条件的表中获取数据。 

```sql
SELECT column1, column2, ..... columnN    
FROM table_name    
WHERE [search_condition] NOT IN [condition];
```

## BETWEEN条件

BETWEEN条件与WHERE子句一起使用，以从两个指定条件之间的表中获取数据 

```sql
SELECT column1, column2, ..... columnN    
FROM table_name    
WHERE [search_condition] BETWEEN [condition];
```

**实例，查询年龄在24到27之间的记录，包括24和27**

```sql
SELECT *   
FROM EMPLOYEES   
WHERE AGE BETWEEN 24 AND 27;
```