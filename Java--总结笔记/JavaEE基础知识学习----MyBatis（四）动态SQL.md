# MyBatis的动态SQL

MyBatis 的强大特性之一便是它的动态 SQL。如果你有使用 JDBC 或其它类似框架的经验，你就能体会到根据不同条件拼接 SQL 语句的痛苦。例如拼接时要确保不能忘记添加必要的空格，还要注意去掉列表最后一个列名的逗号。利用动态 SQL 这一特性可以彻底摆脱这种痛苦。 MyBatis 采用功能强大的基于 OGNL 的表达式来淘汰其它大部分元素。 如下

- if
- choose (when, otherwise)
- trim (where, set)
- foreach

## if的使用

动态 SQL 通常要做的事情是根据条件包含 where 子句的一部分。比如 

**注意：在xml文件中特殊符号，像<，>要使用转义字符**

```xml
<select id="findActiveBlogWithTitleLike"
     resultType="Blog">
  SELECT * FROM BLOG 
  WHERE state = ‘ACTIVE’ 
  <if test="title != null">
    AND title like #{title}
  </if>
</select>
```

## choose，when，otherwise

有时我们不想应用到所有的条件语句，而只想从中择其一项 ，如下

```xml
<select id="findActiveBlogLike" resultType="Blog">
  SELECT * FROM BLOG WHERE state = ‘ACTIVE’
  <choose>
    <when test="title != null">
      AND title like #{title}
    </when>
    <when test="author != null and author.name != null">
      AND author_name like #{author.name}
    </when>
    <otherwise>
      AND featured = 1
    </otherwise>
  </choose>
</select>
```

## trim, where, set

在前面，如果所有的条件都是动态sql,那么可能会出现一下情况的SQL语句

```sql
SELECT * FROM BLOG WHERE
SELECT * FROM BLOG WHERE AND title like ‘someTitle’
```

出现以上错误的sql语句，MyBatis提供了一种解决方式

```xml
<select id="findActiveBlogLike" resultType="Blog">
  SELECT * FROM BLOG 
  <where> 
    <if test="state != null">
         state = #{state}
    </if> 
    <if test="title != null">
        AND title like #{title}
    </if>
    <if test="author != null and author.name != null">
        AND author_name like #{author.name}
    </if>
  </where>
</select>
```

*where* 元素只会在至少有一个子元素的条件返回 SQL 子句的情况下才去插入“WHERE”子句。而且，若语句的开头为“AND”或“OR”，*where* 元素也会将它们去除 。**注意：WHERE只会去掉开头第一个AND或OR**

**使用where会出错的情况，And放在后面**

```xml
<select id="findActiveBlogLike" resultType="Blog">
  SELECT * FROM BLOG 
  <where> 
    <if test="state != null">
         state = #{state}  AND
    </if> 
    <if test="title != null">
        title like #{title} AND
    </if>
    <if test="author != null and author.name != null">
        author_name like #{author.name}
    </if>
  </where>
</select>
```

另外一种解决办法就是使用<trim>标签，使用where，也可能造成最后一个and，使用trim方法如下

```xml
<trim prefix="WHERE" prefixOverrides="AND |OR ">
  ... 
</trim>
```

*prefixOverrides* 属性会忽略通过管道分隔的文本序列（注意此例中的空格也是必要的）。它的作用是移除所有指定在 *prefixOverrides* 属性中的内容（移除前面多余的AND 或者OR），并且插入 *prefix* 属性中指定的内容。 使用suffixOverrides会移除后面多余的AND或者OR。

**set标签与if结合实现动态更新**

```xml
<update id="updateAuthorIfNecessary">
  update Author
    <set>
      <if test="username != null">username=#{username},</if>
      <if test="password != null">password=#{password},</if>
      <if test="email != null">email=#{email},</if>
      <if test="bio != null">bio=#{bio}</if>
    </set>
  where id=#{id}
</update>
```

这里，*set* 元素会动态前置 SET 关键字，同时也会删掉无关的逗号，因为用了条件语句之后很可能就会在生成的 SQL 语句的后面留下这些逗号,也可以使用trim，注意这里我们删去的是后缀值，同时添加了前缀值。 

```xml 
<trim prefix="SET" suffixOverrides=",">
  ...
</trim>
```

## foreach

动态 SQL 的另外一个常用的操作需求是对一个集合进行遍历，通常是在构建 IN 条件语句的时候。比如： 

```xml
<select id="selectPostIn" resultType="domain.blog.Post">
  SELECT *
  FROM POST P
  WHERE ID in
  <foreach item="item" index="index" collection="list"
      open="(" separator="," close=")" index="i">
        #{item}
  </foreach>
</select>
```

**说明:**

- collection：指定要遍历的集合
- item：将当前遍历的每一个元素赋给指定的变量
- separator：每一个元素之间的分隔符
- open：遍历出所有的结果拼接一个开始的字符
- close：遍历出所有的结果拼接一个结束的字符
- index：遍历list的就是索引，遍历map的时候就是map的key,item是map的值

## Mysql下的批量插入

```java
public void addEmp(@Param("emps") List<Employee> emps);
```

```xml
<insert id="addEmp">
	INSERT into employee(name,age)values
  <foreach item="emp" index="index" collection="emps"
      open="(" separator="," close=")" index="i">
        #{emp.name}, #{emp.age}
  </foreach>
</insert>
```

## bind

`bind` 元素可以从 OGNL 表达式中创建一个变量并将其绑定到上下文。比如 

```xml
<select id="selectBlogsLike" resultType="Blog">
  <bind name="pattern" value="'%' + _parameter.getTitle() + '%'" />
  SELECT * FROM BLOG
  WHERE title LIKE #{pattern}
</select>
```

如果是模糊查询，使用下面的方式是行不通的，如下

```xml
<select>
    select * from person
    <if test="lastName != null">
        where lastName like '%#{lastName}%'
    </if>
</select>
```

解决方式之一，可以使用$符号(不安全)

```xml
<select>
    select * from person
    <if test="lastName != null">
        where lastName like '%${lastName}%'
    </if>
</select>
```

解决方式之二，使用bind标签

```xml
<select>
    <bind name="_lastName" value="'%'+lastName+'%'"></bind>
    select * from person
    <if test="lastName != null">
        where lastName like #{_lastName}
    </if>
</select>
```

```xml
<bind name="_lastName" value="'_'+lastName+'%'"></bind><!--表示以什么开始，后面是参数的模糊查询-->
```

