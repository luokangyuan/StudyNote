# MyBatis的逆向工程

## 概述

MyBatis Generator：简称MBG，是一个专门为MyBatis框架使用者定制的代码生成器，可以快速的根据表生成对应的映射文件，接口，以及bean类。支持基本的增删改查，以及QBC风格的条件查询。但是表连接、存储过程等这些复杂sql的定义需要我们手工编写

**官方文档地址：**http://www.mybatis.org/generator/

**官方工程地址：**https://github.com/mybatis/generator/releases

## MBG使用步骤

- 编写MBG的配置文件（重要几处配置）
  - jdbcConnection配置数据库连接信息
  - javaModelGenerator配置javaBean的生成策略
  - sqlMapGenerator配置sql映射文件生成策略
  - javaClientGenerator配置Mapper接口的生成策略
  - table配置要逆向解析的数据表
    - tableName：表名
    - domainObjectName：对应的javaBean名
- 运行代码生成器生成代码

**注意：**

Context标签
targetRuntime=“MyBatis3“可以生成带条件的增删改查
targetRuntime=“MyBatis3Simple“可以生成基本的增删改查
如果再次生成，建议将之前生成的数据删除，避免xml向后追加内容出现的问题。

## MBG配置文件

```xml
<generatorConfiguration>
    <context id="DB2Tables" targetRuntime="MyBatis3">
    //数据库连接信息配置
    <jdbcConnection driverClass="com.mysql.jdbc.Driver"
    connectionURL="jdbc:mysql://localhost:3306/bookstore0629"
    userId="root" password="123456">
    </jdbcConnection>
    //javaBean的生成策略
    <javaModelGenerator targetPackage="com.atguigu.bean" targetProject=".\src">
    <property name="enableSubPackages" value="true" />
    <property name="trimStrings" value="true" />
    </javaModelGenerator>
    //映射文件的生成策略
    <sqlMapGenerator targetPackage="mybatis.mapper" targetProject=".\conf">
    <property name="enableSubPackages" value="true" />
    </sqlMapGenerator>
    //dao接口java文件的生成策略
    <javaClientGenerator type="XMLMAPPER" targetPackage="com.atguigu.dao"
    targetProject=".\src">
    <property name="enableSubPackages" value="true" />
    </javaClientGenerator>
    //数据表与javaBean的映射
    <table tableName="books" domainObjectName="Book"></table>
    </context>
</generatorConfiguration>
```

## 生成器代码

```java
public static void main(String[] args) throws Exception {
    List<String> warnings = new ArrayList<String>();
    boolean overwrite = true;
    File configFile = new File("mbg.xml");
    ConfigurationParser cp = new ConfigurationParser(warnings);
    Configuration config = cp.parseConfiguration(configFile);
    DefaultShellCallback callback = new efaultShellCallback(overwrite);
    MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config,
    callback, warnings);
    myBatisGenerator.generate(null);
}
```

## QBC风格的带条件查询

```java
@Test
public void test01(){
    SqlSession openSession = build.openSession();
    DeptMapper mapper = openSession.getMapper(DeptMapper.class);
    DeptExample example = new DeptExample();
    //所有的条件都在example中封装
    Criteria criteria = example.createCriteria();
    //select id, deptName, locAdd from tbl_dept WHERE
    //( deptName like ? and id > ? )
    criteria.andDeptnameLike("%部%");
    criteria.andIdGreaterThan(2);
    List<Dept> list = mapper.selectByExample(example);
    for(Dept dept : list) {
    System.out.println(dept);
}
```

