# MyBatis的全局配置文件

## 概述

MyBatis的全局配置文件可以配置的属性如下

- properties 属性
- settings 设置
- typeAliases 类型别名
- typeHandlers 类型处理器
- objectFactory 对象工厂
- plugins 插件
- environments 环境
  - environment 环境变量
    - transactionManager 事务管理器
    - dataSource 数据源
- databaseIdProvider 数据库厂商标识
- mappers 映射器

## properties属性

MyBatis使用properties来引入外部properties配置文件的内容，resource：引入类路径下的资源，url引入网络路径或者磁盘路径下的资源。可以用于将数据源连接信息放在properties文件中，与Spring整合后就写在Spring的配置文件中。

**引入外部properties文件**

```xml
<properties resource="org/mybatis/example/config.properties"></properties>
```

**使用引入的properties文件**

```xml
<dataSource type="POOLED">
  <property name="driver" value="${jdbc.driver}"/>
  <property name="url" value="${jdbc.url}"/>
  <property name="username" value="${jdbc.username}"/>
  <property name="password" value="${jdbc.password}"/>
</dataSource>
```

## settings运行时设置

这是 MyBatis 中极为重要的调整设置，它们会改变 MyBatis 的运行时行为。下表描述了设置中各项的意图、默认值等。

| 设置参数                                     | 描述                                                         | 有效值                      | 默认值  |
| :------------------------------------------- | ------------------------------------------------------------ | --------------------------- | ------- |
| cacheEnabled                                 | 全局开启或关闭配置文件中的所有映射器任何缓存                 | true \| false               | true    |
| lazyLoadingEnabled                           | 延迟加载的全局开关                                           | true \| false               | false   |
| aggressive<br />LazyLoading                  | 开启，任何方法的调用都会加载该对象的所有属性。<br />否则，每个属性会按需加载 | true \| false               | false   |
| multipleResult<br />SetsEnabled              | 是否允许单一语句返回多结果集                                 | true \| false               | true    |
| useColumnLabel                               | 使用列标签代替列名。                                         | true \| false               | true    |
| useGeneratedKeys                             | 允许 JDBC 支持自动生成主键<br /> 如果设置为 true 则这个设置强制使用自动生成主键 | true \| false               | False   |
| autoMappingBehavior                          | 指定 MyBatis 应如何自动映射列到字段或属性。<br /> NONE 表示取消自动映射；<br />PARTIAL 只会自动映射没有定义嵌套结果集映射的结果集。<br /> FULL 会自动映射任意复杂的结果集 | NONE, <br>PARTIAL, <br>FULL | PARTIAL |
| autoMapping<br />Unknown<br />ColumnBehavior | 指定发现自动映射目标未知列（或者未知属性类型）的行为。<br />`NONE`: 不做任何反应<br />`WARNING`: 输出提醒 | NONE, WARNING, FAILING      | NONE    |
| defaultExecutorType                          | 配置默认的执行器。SIMPLE 就是普通的执行器；REUSE 执行器会重用预处理语句（prepared statements）； BATCH 执行器将重用语句并执行批量更新。 | SIMPLE REUSE BATCH          | SIMPLE  |
| default<br />StatementTimeout                | 设置超时时间，它决定驱动等待数据库响应的秒数。               | 任意正整数                  |         |
| defaultFetchSize                             | 为驱动的结果集获取数量（fetchSize）设置一个提示值。此参数只可以在查询设置中被覆盖。 | 任意正整数                  |         |
| safeRow<br />BoundsEnabled                   | 允许在嵌套语句中使用分页（RowBounds）。如果允许使用则设置为false。 | true \| false               | False   |
| safeResult<br />HandlerEnabled               | 允许在嵌套语句中使用分页（ResultHandler）。如果允许使用则设置为false。 | true \| false               | True    |
| mapUnderscore<br />ToCamelCase               | 是否开启自动驼峰命名规则（camel case）映射，即从经典数据库列名 A_COLUMN 到经典 Java 属性名 aColumn 的类似映射。 | true \| false               | False   |
| localCacheScope                              | MyBatis 利用本地缓存机制（Local Cache）防止循环引用（circular references）和加速重复嵌套查询。 默认值为 SESSION，这种情况下会缓存一个会话中执行的所有查询。 若设置值为 STATEMENT，本地会话仅用在语句执行上，对相同 SqlSession 的不同调用将不会共享数据。 | SESSION \|<br> STATEMENT    | SESSION |
| jdbcTypeForNull                              | 当没有为参数提供特定的 JDBC 类型时，为空值指定 JDBC 类型。 某些驱动需要指定列的 JDBC 类型，多数情况直接用一般类型即可，比如 NULL、VARCHAR 或 OTHER。 |                             | OTHER   |
| lazyLoadTrigger<br />Methods                 | 指定哪个对象的方法触发一次延迟加载。                         |                             |         |
| defaultScripting<br />Language               | 指定动态 SQL 生成的默认语言。                                |                             |         |
| defaultEnum<br />TypeHandler                 | 指定 Enum 使用的默认 `TypeHandler` 。 (从3.4.5开始)          |                             |         |
| callSettersOnNulls                           | 指定当结果集中值为 null 的时候是否调用映射对象的 setter（map 对象时为 put）方法，这对于有 Map.keySet() 依赖或 null 值初始化的时候是有用的。注意基本类型（int、boolean等）是不能设置成 null 的。 | true \| false               | false   |
| returnInstance<br />ForEmptyRow              | 当返回行的所有列都是空时，MyBatis默认返回`null`。 当开启这个设置时，MyBatis会返回一个空实例。 请注意，它也适用于嵌套的结果集 (i.e. collectioin and association)。（从3.4.2开始） | true \| false               | false   |
| logPrefix                                    | 指定 MyBatis 增加到日志名称的前缀。                          | 任何字符串                  |         |
| logImpl                                      | 指定 MyBatis 所用日志的具体实现，未指定时将自动查找。        |                             |         |
| proxyFactory                                 | 指定 Mybatis 创建具有延迟加载能力的对象用到的代理工具。      | CGLIB \| JAVASSIST          |         |

## 常用的Setting设置

| 设置参数                 | 描述                                         | 默认值 |
| ------------------------ | -------------------------------------------- | ------ |
| mapUnderscoreToCamelCase | 是否开启驼峰命名规则映射A_COLUNM到aColumn    | false  |
| defaultStatementTimeout  | 设置超时时间，它决定驱动等待数据库响应的秒数 |        |

## Settings设置示例

```xml
<settings>
  <setting name="cacheEnabled" value="true"/>
  <setting name="lazyLoadingEnabled" value="true"/>
  <setting name="multipleResultSetsEnabled" value="true"/>
  <setting name="useColumnLabel" value="true"/>
  <setting name="useGeneratedKeys" value="false"/>
  <setting name="autoMappingBehavior" value="PARTIAL"/>
  <setting name="autoMappingUnknownColumnBehavior" value="WARNING"/>
  <setting name="defaultExecutorType" value="SIMPLE"/>
  <setting name="defaultStatementTimeout" value="25"/>
  <setting name="defaultFetchSize" value="100"/>
  <setting name="safeRowBoundsEnabled" value="false"/>
  <setting name="mapUnderscoreToCamelCase" value="false"/>
  <setting name="localCacheScope" value="SESSION"/>
  <setting name="jdbcTypeForNull" value="OTHER"/>
  <setting name="lazyLoadTriggerMethods" value="equals,clone,hashCode,toString"/>
</settings>
```

## typeAliases别名

类型别名是为 Java 类型设置一个短的名字。它只和 XML 配置有关，存在的意义仅在于用来减少类完全限定名的冗余,但是往往我们不会使用别名，是为了方便查看代码。

```xml
<typeAliases>
  <typeAlias alias="Author" type="domain.blog.Author"/>
  <typeAlias alias="Blog" type="domain.blog.Blog"/>
  <typeAlias alias="Comment" type="domain.blog.Comment"/>
  <typeAlias alias="Post" type="domain.blog.Post"/>
  <typeAlias alias="Section" type="domain.blog.Section"/>
  <typeAlias alias="Tag" type="domain.blog.Tag"/>
</typeAliases>
```

指定一个包名，MyBatis 会在包名下面搜索需要的 Java Bean，给包和子包下的所有类起一个默认的别名（类名小写） 

```xml
<typeAliases>
  <package name="domain.blog"/>
</typeAliases>
```

每一个在包 `domain.blog` 中的 Java Bean，在没有注解的情况下，会使用 Bean 的首字母小写的非限定类名来作为它的别名。 比如 `domain.blog.Author` 的别名为 `author`；若有注解，则别名为其注解值。 

```java
@Alias("author")
public class Author {}
```

## typeHandlers 类型处理器

无论是 MyBatis 在预处理语句（PreparedStatement）中设置一个参数时，还是从结果集中取出一个值时， 都会用类型处理器将获取的值以合适的方式转换成 Java 类型。下表描述了一些默认的类型处理器。 

| 类型处理器                   | Java类型                        | JDBC类型                                                     |
| ---------------------------- | ------------------------------- | ------------------------------------------------------------ |
| BooleanTypeHandler           | `java.lang.Boolean`, `boolean`  | 数据库兼容的 `BOOLEAN`                                       |
| `ByteTypeHandler`            | `java.lang.Byte`, `byte`        | 数据库兼容的 `NUMERIC` 或 `BYTE`                             |
| `ShortTypeHandler`           | `java.lang.Short`, `short`      | 数据库兼容的 `NUMERIC` 或 `SHORT INTEGER`                    |
| `IntegerTypeHandler`         | `java.lang.Integer`, `int`      | 数据库兼容的 `NUMERIC` 或 `INTEGER`                          |
| `LongTypeHandler`            | `java.lang.Long`, `long`        | 数据库兼容的 `NUMERIC` 或 `LONG INTEGER`                     |
| `FloatTypeHandler`           | `java.lang.Float`, `float`      | 数据库兼容的 `NUMERIC` 或 `FLOAT`                            |
| `DoubleTypeHandler`          | `java.lang.Double`, `double`    | 数据库兼容的 `NUMERIC` 或 `DOUBLE`                           |
| `BigDecimalTypeHandler`      | `java.math.BigDecimal`          | 数据库兼容的 `NUMERIC` 或 `DECIMAL`                          |
| `StringTypeHandler`          | `java.lang.String`              | `CHAR`, `VARCHAR`                                            |
| `ClobReaderTypeHandler`      | `java.io.Reader`                | -                                                            |
| `ClobTypeHandler`            | `java.lang.String`              | `CLOB`, `LONGVARCHAR`                                        |
| `NStringTypeHandler`         | `java.lang.String`              | `NVARCHAR`, `NCHAR`                                          |
| `NClobTypeHandler`           | `java.lang.String`              | `NCLOB`                                                      |
| `BlobInputStreamTypeHandler` | `java.io.InputStream`           | -                                                            |
| `ByteArrayTypeHandler`       | `byte[]`                        | 数据库兼容的字节流类型                                       |
| `BlobTypeHandler`            | `byte[]`                        | `BLOB`, `LONGVARBINARY`                                      |
| `DateTypeHandler`            | `java.util.Date`                | `TIMESTAMP`                                                  |
| `DateOnlyTypeHandler`        | `java.util.Date`                | `DATE`                                                       |
| `TimeOnlyTypeHandler`        | `java.util.Date`                | `TIME`                                                       |
| `SqlTimestampTypeHandler`    | `java.sql.Timestamp`            | `TIMESTAMP`                                                  |
| `SqlDateTypeHandler`         | `java.sql.Date`                 | `DATE`                                                       |
| `SqlTimeTypeHandler`         | `java.sql.Time`                 | `TIME`                                                       |
| `ObjectTypeHandler`          | Any                             | `OTHER` 或未指定类型                                         |
| `EnumTypeHandler`            | Enumeration Type                | VARCHAR-任何兼容的字符串类型，存储枚举的名称（而不是索引）   |
| `EnumOrdinalTypeHandler`     | Enumeration Type                | 任何兼容的 `NUMERIC` 或 `DOUBLE` 类型，存储枚举的索引（而不是名称）。 |
| `InstantTypeHandler`         | `java.time.Instant`             | `TIMESTAMP`                                                  |
| `LocalDateTimeTypeHandler`   | `java.time.LocalDateTime`       | `TIMESTAMP`                                                  |
| `LocalDateTypeHandler`       | `java.time.LocalDate`           | `DATE`                                                       |
| `LocalTimeTypeHandler`       | `java.time.LocalTime`           | `TIME`                                                       |
| `OffsetDateTimeTypeHandler`  | `java.time.OffsetDateTime`      | `TIMESTAMP`                                                  |
| `OffsetTimeTypeHandler`      | `java.time.OffsetTime`          | `TIME`                                                       |
| `ZonedDateTimeTypeHandler`   | `java.time.ZonedDateTime`       | `TIMESTAMP`                                                  |
| `YearTypeHandler`            | `java.time.Year`                | `INTEGER`                                                    |
| `MonthTypeHandler`           | `java.time.Month`               | `INTEGER`                                                    |
| `YearMonthTypeHandler`       | `java.time.YearMonth`           | `VARCHAR` or `LONGVARCHAR`                                   |
| `JapaneseDateTypeHandler`    | `java.time.chrono.JapaneseDate` | `DATE`                                                       |

## plugins插件

MyBatis 允许你在已映射语句执行过程中的某一点进行拦截调用。默认情况下，MyBatis 允许使用插件来拦截的方法调用

- Executor (update, query, flushStatements, commit, rollback, getTransaction, close, isClosed)
- ParameterHandler (getParameterObject, setParameters)
- ResultSetHandler (handleResultSets, handleOutputParameters)
- StatementHandler (prepare, parameterize, batch, update, query)

## environments环境配置

MyBatis可以配置多种环境，default代表指定使用某种环境，这样就可以快速切换环境，**尽管可以配置多个环境，每个 SqlSessionFactory 实例只能选择其一** ，所以，如果你想连接两个数据库，就需要创建两个 SqlSessionFactory 实例，每个数据库对应一个。而如果是三个数据库，就需要三个实例 。**每个数据库对应一个 SqlSessionFactory 实例**

**环境配置实例**

```xml
<environments default="development">
  <environment id="development">
    <transactionManager type="JDBC">
      <property name="..." value="..."/>
    </transactionManager>
    <dataSource type="POOLED">
      <property name="driver" value="${driver}"/>
      <property name="url" value="${url}"/>
      <property name="username" value="${username}"/>
      <property name="password" value="${password}"/>
    </dataSource>
  </environment>
</environments>
```

**环境配置说明**

- 默认的环境 ID（比如:default="development"）。
- 每个 environment 元素定义的环境 ID（比如:id="development"）。
- 事务管理器的配置（比如:type="JDBC"）。
- 数据源的配置（比如:type="POOLED"）。