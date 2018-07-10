# DQL语言学习

## 基础查询

**语法**

```sql
SELECT 要查询的东西
【FROM 表名】;
```

**特点**

- 通过select查询完的结果 ，是一个虚拟的表格，不是真实存在
- 要查询的东西 可以是常量值、可以是表达式、可以是字段、可以是函数

## 条件查询

条件查询：根据条件过滤原始表的数据，查询到想要的数据

**语法**

```sql
select 
	要查询的字段|表达式|常量值|函数
from 
	表
where 
	条件 ;
```

**分类**

- 条件表达式，例如：salary>10000，条件运算符：> < >= <= = != <>
- 逻辑表达式，例如：salary>10000 && salary<20000，逻辑运算符：
  - and（&&）:两个条件如果同时成立，结果为true，否则为false
  - or(||)：两个条件只要有一个成立，结果为true，否则为false
  - not(!)：如果条件成立，则not后为false，否则为true
- 模糊查询，例如：last_name like 'a%'

## 排序查询

**语法**

```sql
select
	要查询的东西
from
	表
where 
	条件
order by 排序的字段|表达式|函数|别名 【asc|desc】
```

## 常见函数

**字符函数**

- concat拼接
- substr截取子串
- upper转换成大写
- lower转换成小写
- trim去前后指定的空格和字符
- ltrim去左边空格
- rtrim去右边空格
- replace替换
- lpad左填充
- rpad右填充
- instr返回子串第一次出现的索引
- length 获取字节个数

**数学函数**

- round 四舍五入
- rand 随机数
- floor向下取整
- ceil向上取整
- mod取余
- truncate截断

**日期函数**

- now当前系统日期+时间
- curdate当前系统日期
- curtime当前系统时间
- str_to_date 将字符转换成日期
- date_format将日期转换成字符

**流程控制函数**

- if 处理双分支
- case语句 处理多分支
  情况1：处理等值判断
  		情况2：处理条件判断

## 分组函数

- sum 求和
- max 最大值
- min 最小值
- avg 平均值
- count 计数

**分组函数说明**

- 以上五个分组函数都忽略null值，除了count(*)
- sum和avg一般用于处理数值型
- max、min、count可以处理任何数据类型
- 都可以搭配distinct使用，用于统计去重后的结果
- count的参数可以支持：字段、*、常量值，一般放1

## 分组查询

**语法**

```sql
select 查询的字段，分组函数
from 表
group by 分组的字段
```

**分组查询特点**

- 可以按单个字段分组
- 和分组函数一同查询的字段最好是分组后的字段
- 分组筛选
  - 分组前筛选：	原始表		group by的前面		where
    分组后筛选：	分组后的结果集	group by的后面		having
- 可以按多个字段分组，字段之间用逗号隔开
- 可以支持排序
- having后可以支持别名

## 多表查询

**语法**

```sql
select 字段，...
from 表1
【inner|left outer|right outer|cross】join 表2 on  连接条件
【inner|left outer|right outer|cross】join 表3 on  连接条件
【where 筛选条件】
【group by 分组字段】
【having 分组后的筛选条件】
【order by 排序的字段或表达式】
```

## 子查询

**子查询含义**

一条查询语句中又嵌套了另一条完整的select语句，其中被嵌套的select语句，称为子查询或内查询
在外面的查询语句，称为主查询或外查询

**子查询特点**

- 子查询都放在小括号内
- 子查询可以放在from后面、select后面、where后面、having后面，但一般放在条件的右侧
- 子查询优先于主查询执行，主查询使用了子查询的执行结果
- 子查询根据查询结果的行数不同分为以下两类
  - 单行子查询：结果集只有一行，一般搭配单行操作符使用：> < = <> >= <= ，非法使用子查询的情况：子查询的结果为一组值或者子查询的结果为空
  - 多行子查询：结果集有多行，一般搭配多行操作符使用：any、all、in、not in，in： 属于子查询结果中的任意一个就行，any和all往往可以用其他查询代替

## 分页查询

**语法**

```sql
select 字段|表达式,...
from 表
【where 条件】
【group by 分组字段】
【having 条件】
【order by 排序的字段】
limit 【起始的条目索引，】条目数;
```

**特点**

- 起始条目索引从0开始
- limit子句放在查询语句的最后
- 公式：select * from  表 limit （page-1）*sizePerPage,sizePerPage

## 联合查询

**语法**

```sql
select 字段|常量|表达式|函数 【from 表】 【where 条件】 union 【all】
select 字段|常量|表达式|函数 【from 表】 【where 条件】 union 【all】
select 字段|常量|表达式|函数 【from 表】 【where 条件】 union  【all】
.....
select 字段|常量|表达式|函数 【from 表】 【where 条件】
```

**特点**

- 多条查询语句的查询的列数必须是一致的
- 多条查询语句的查询的列的类型几乎相同
- union代表去重，union all代表不去重