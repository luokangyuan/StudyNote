# Mybatis的插件开发

## PageHelper分页插件

**项目地址：**https://github.com/pagehelper/Mybatis-PageHelper

**文档地址：**https://github.com/pagehelper/Mybatis-PageHelper/blob/master/README_zh.md

## 使用步骤

```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>最新版本</version>
</dependency>
```

**在 MyBatis 配置 xml 中配置拦截器插件**

```xml
<plugins>
    <!-- com.github.pagehelper为PageHelper类所在包名 -->
    <plugin interceptor="com.github.pagehelper.PageInterceptor">
        <!-- 使用下面的方式配置参数，后面会有所有的参数介绍 -->
        <property name="param1" value="value1"/>
	</plugin>
</plugins>
```

## 代码中使用方法

```java
//第二种，Mapper接口方式的调用，推荐这种使用方式。
PageHelper.startPage(1, 10);
List<Country> list = countryMapper.selectIf(1);

//第三种，Mapper接口方式的调用，推荐这种使用方式。
PageHelper.offsetPage(1, 10);
List<Country> list = countryMapper.selectIf(1);
//第六种，ISelect 接口方式
//jdk6,7用法，创建接口
Page<Country> page = PageHelper.startPage(1, 10).doSelectPage(new ISelect() {
    @Override
    public void doSelect() {
        countryMapper.selectGroupBy();
    }
});
//jdk8 lambda用法
Page<Country> page = PageHelper.startPage(1, 10).doSelectPage(()-> countryMapper.selectGroupBy());

//也可以直接返回PageInfo，注意doSelectPageInfo方法和doSelectPage
pageInfo = PageHelper.startPage(1, 10).doSelectPageInfo(new ISelect() {
    @Override
    public void doSelect() {
        countryMapper.selectGroupBy();
    }
});
//对应的lambda用法
pageInfo = PageHelper.startPage(1, 10).doSelectPageInfo(() -> countryMapper.selectGroupBy());

//count查询，返回一个查询语句的count数
long total = PageHelper.count(new ISelect() {
    @Override
    public void doSelect() {
        countryMapper.selectLike(country);
    }
});
//lambda
total = PageHelper.count(()->countryMapper.selectLike(country));
```

## 常用方法介绍

**RowBounds方式的调用**

```java
List<Country> list = sqlSession.selectList("x.y.selectIf", null, new RowBounds(1, 10));
```

使用这种调用方式时，你可以使用RowBounds参数进行分页，这种方式侵入性最小，我们可以看到，通过RowBounds方式调用只是使用了这个参数，并没有增加其他任何内容。分页插件检测到使用了RowBounds参数时，就会对该查询进行**物理分页**

**PageHelper.startPage静态方法调用**

在你需要进行分页的 MyBatis 查询方法前调用 `PageHelper.startPage` 静态方法即可，紧跟在这个方法后的**第一个MyBatis 查询方法**会被进行分页。 

**PageInfo用法**

```java
//获取第1页，10条内容，默认查询总数count
PageHelper.startPage(1, 10);
List<Country> list = countryMapper.selectAll();
//用PageInfo对结果进行包装
PageInfo page = new PageInfo(list);
//测试PageInfo全部属性
//PageInfo包含了非常全面的分页属性
assertEquals(1, page.getPageNum());
assertEquals(10, page.getPageSize());
assertEquals(1, page.getStartRow());
assertEquals(10, page.getEndRow());
assertEquals(183, page.getTotal());
assertEquals(19, page.getPages());
assertEquals(1, page.getFirstPage());
assertEquals(8, page.getLastPage());
assertEquals(true, page.isFirstPage());
assertEquals(false, page.isLastPage());
assertEquals(false, page.isHasPreviousPage());
assertEquals(true, page.isHasNextPage());
```

## Mybatis批量保存

在MyBatis的全局设置中有设置，defaultExecutorType  配置默认的执行器

- SIMPLE 就是普通的执行器；
- REUSE 执行器会重用预处理语句（prepared statements）； 
- BATCH 执行器将重用语句并执行批量更新

但是，如果在全局设置中设置批量执行器，那么每一个mapper中的方法都会执行批量操作，所以我们一般都是在与Spring整合后在Application.xml中配置一个可以执行批量操作的sqlSession,如下

```xml
<!--创建出SqlSessionFactory对象  -->
<bean id="sqlSessionFactoryBean" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"></property>
    <!-- configLocation指定全局配置文件的位置 -->
    <property name="configLocation" value="classpath:mybatis-config.xml"></property>
    <!--mapperLocations: 指定mapper文件的位置-->
    <property name="mapperLocations" value="classpath:mybatis/mapper/*.xml"></property>
</bean>
<bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
    <constructor-arg name="sqlSessionFactory" ref="sqlSessionFactoryBean"></constructor-arg>
    <constructor-arg name="executorType" value="BATCH"></constructor-arg>
</bean>
```

在Service中自动注入SQLSession

```java
@Autowired
private SqlSession sqlSession;
public List<Employee> getEmps(){
    EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
    return mapper.getEmps();
}
```

