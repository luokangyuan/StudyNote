# SpringCloud实践准备

## 项目技术版本

SpringCloud版本：Dalston.SR1，SpringBoot版本：1.5.9

## 项目说明

项目是使用SpringCloud将四个工程进行整合，microservicecloud整体父工程Project，microservicecloud-api公共子模块Module，microservicecloud-provider-dept-8001部门微服务提供者Module，microservicecloud-consumer-dept-80部门微服务消费者Module。

## 1.父类项目创建

在逻辑视图中选择new-Maven Project-勾上创建简单项目-选择pom方式

### pom.xml文件

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>com.luo.springcloud</groupId>
	<artifactId>microservicecloud</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>pom</packaging>
	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<maven.compiler.source>1.8</maven.compiler.source>
		<maven.compiler.target>1.8</maven.compiler.target>
		<junit.version>4.12</junit.version>
		<log4j.version>1.2.17</log4j.version>
		<lombok.version>1.16.18</lombok.version>
	</properties>
	<dependencyManagement>
		<dependencies>
			<dependency>
				<groupId>org.springframework.cloud</groupId>
				<artifactId>spring-cloud-dependencies</artifactId>
				<version>Dalston.SR1</version>
				<type>pom</type>
				<scope>import</scope>
			</dependency>
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-dependencies</artifactId>
				<version>1.5.9.RELEASE</version>
				<type>pom</type>
				<scope>import</scope>
			</dependency>
			<dependency>
				<groupId>mysql</groupId>
				<artifactId>mysql-connector-java</artifactId>
				<version>5.0.4</version>
			</dependency>
			<dependency>
				<groupId>com.alibaba</groupId>
				<artifactId>druid</artifactId>
				<version>1.0.31</version>
			</dependency>
			<dependency>
				<groupId>org.mybatis.spring.boot</groupId>
				<artifactId>mybatis-spring-boot-starter</artifactId>
				<version>1.3.0</version>
			</dependency>
			<dependency>
				<groupId>ch.qos.logback</groupId>
				<artifactId>logback-core</artifactId>
				<version>1.2.3</version>
			</dependency>
			<dependency>
				<groupId>junit</groupId>
				<artifactId>junit</artifactId>
				<version>${junit.version}</version>
				<scope>test</scope>
			</dependency>
			<dependency>
				<groupId>log4j</groupId>
				<artifactId>log4j</artifactId>
				<version>${log4j.version}</version>
			</dependency>
		</dependencies>
	</dependencyManagement>
</project>


```

## 2.公共组件项目创建

在父项目上创建microservicecloud-api项目，注意是在microservicecloud上new一个maven module，packaging选择jar

### POM.xml文件

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>com.luo.springcloud</groupId>
    <artifactId>microservicecloud</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <artifactId>microservicecloud-api</artifactId>
  <dependencies><!-- 当前Module需要用到的jar包，按自己需求添加，如果父类已经包含了，可以不用写版本号 -->
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-feign</artifactId>
		</dependency>
	</dependencies>
</project>
```

### Dept实体类

```java
public class Dept implements Serializable{
	private Long deptno; // 主键
	private String dname; // 部门名称、
	private String db_source; // 来自那个数据库，因为微服务可以一个服务对应一个数据库，同一个信息被存储到不同的数据库
	
	public Dept() {
		super();
	}
	public Dept(Long deptno, String dname, String db_source) {
		super();
		this.deptno = deptno;
		this.dname = dname;
		this.db_source = db_source;
	}
	public Long getDeptno() {
		return deptno;
	}
	public void setDeptno(Long deptno) {
		this.deptno = deptno;
	}
	public String getDname() {
		return dname;
	}
	public void setDname(String dname) {
		this.dname = dname;
	}
	public String getDb_source() {
		return db_source;
	}
	public void setDb_source(String db_source) {
		this.db_source = db_source;
	}
	@Override
	public String toString() {
		return "Dept [deptno=" + deptno + ", dname=" + dname + ", db_source=" + db_source + "]";
	}
```

当我们每次都需要创建一个实体类的getter，setter，toString和构造器等方法时，如果增加一个字段就要重新生成方法，为了简化这种重复的操作，我们在前面的pom中引入了lombok，同样的实体类，使用方法如下

```java
@SuppressWarnings("serial")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Accessors(chain=true)
public class Dept implements Serializable{
	private Long deptno; // 主键
	private String dname; // 部门名称
    // 来自那个数据库，因为微服务可以一个服务对应一个数据库，同一个信息被存储到不同的数据库
	private String db_source; 
}
```

#### lombok安装方法

拷贝lombok-1.16.18.jar到Eclipse目录下，执行java -jar D:\javasoft\eclipse-jee-neon-3-win32-x86_64\eclipse\ombok-1.16.18.jar，然后，弹框中选择Eclipse安装目录，选择install即可。

#### lombok注解使用

```properties
@Data ：注解在类上；提供类所有属性的 getting 和 setting 方法，此外还提供了equals、canEqual
@Setter：注解在属性上；为属性提供 setting 方法
@Getter：注解在属性上；为属性提供 getting 方法
@Log4j ：注解在类上；为类提供一个 属性名为log 的 log4j 日志对象
@NoArgsConstructor：注解在类上；为类提供一个无参的构造方法
@AllArgsConstructor：注解在类上；为类提供一个全参的构造方法
@Accessors(chain=true)：可以使用链式写法
```

#### lombok测试

```java
@SuppressWarnings("serial")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Accessors(chain=true)
public class Dept implements Serializable{
	
	private Long deptno; // 主键
	private String dname; // 部门名称、
	private String db_source; // 来自那个数据库，因为微服务可以一个服务对应一个数据库，同一个信息被存储到不同的数据库
	public static void main(String[] args) {
		Dept dept = new Dept();
		dept.setDeptno(12L).setDname("开发部").setDb_source("DB01");
	}
}
```

#### 注意内容

实体类必须实现Serializable接口

### 打包使用

公共组件模块写好后可以点击run as 选择maven clean ，然后在选择maven install。其他模块引用的方法如下

```xml
<groupId>com.atguigu.springcloud</groupId>
<artifactId>microservicecloud-api</artifactId>
<version>0.0.1-SNAPSHOT</version>
```

## 3.部门微服务提供者

首先现在父类项目上new一个maven module,microservicecloud-provider-dept-8001修改pom.xml文件

### pom.xml文件

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<parent>
		<groupId>com.luo.springcloud</groupId>
		<artifactId>microservicecloud</artifactId>
		<version>0.0.1-SNAPSHOT</version>
	</parent>

	<artifactId>microservicecloud-provider-dept-8001</artifactId>

	<dependencies>
		<!-- 引入自己定义的api通用包，可以使用Dept部门Entity -->
		<dependency>
			<groupId>com.luo.springcloud</groupId>
			<artifactId>microservicecloud-api</artifactId>
			<version>${project.version}</version>
		</dependency>
		<!-- actuator监控信息完善 -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-actuator</artifactId>
		</dependency>
		<!-- 将微服务provider侧注册进eureka -->
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-eureka</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-config</artifactId>
		</dependency>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
		</dependency>
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
		</dependency>
		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>druid</artifactId>
		</dependency>
		<dependency>
			<groupId>ch.qos.logback</groupId>
			<artifactId>logback-core</artifactId>
		</dependency>
		<dependency>
			<groupId>org.mybatis.spring.boot</groupId>
			<artifactId>mybatis-spring-boot-starter</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-jetty</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
		</dependency>
		<!-- 修改后立即生效，热部署 -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>springloaded</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-devtools</artifactId>
		</dependency>
	</dependencies>

</project>
```

### application.yml文件

```yaml
server:
  port: 8001
  
mybatis:
  config-location: classpath:mybatis/mybatis.cfg.xml        # mybatis配置文件所在路径
  type-aliases-package: com.luo.springcloud.entities        # 所有Entity别名类所在包
  mapper-locations:
  - classpath:mybatis/mapper/**/*.xml                       # mapper映射文件
    
spring:
   application:
    name: microservicecloud-dept 
   datasource:
    type: com.alibaba.druid.pool.DruidDataSource            # 当前数据源操作类型
    driver-class-name: org.gjt.mm.mysql.Driver              # mysql驱动包
    url: jdbc:mysql://localhost:3306/cloudDB01              # 数据库名称
    username: root
    password: 1234
    dbcp2:
      min-idle: 5                                           # 数据库连接池的最小维持连接数
      initial-size: 5                                       # 初始化连接数
      max-total: 5                                          # 最大连接数
      max-wait-millis: 200                                  # 等待连接获取的最大超时时间
      
eureka:
  client: #客户端注册进eureka服务列表内
    service-url: 
      defaultZone: http://localhost:7001/eureka
```

### mybatis下mybatis.cfg.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
	<settings>
		<setting name="cacheEnabled" value="true" /><!-- 二级缓存开启 -->
	</settings>
</configuration>
```

### SQL语句

```sql
DROP DATABASE IF EXISTS cloudDB01 ;

CREATE DATABASE cloudDB01 CHARACTER SET UTF8 ;

USE cloudDB01 ;

CREATE TABLE dept (
  deptno BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  dname VARCHAR (60),
  db_source VARCHAR (60)
) ;

INSERT INTO dept(dname,db_source) VALUES('开发部',DATABASE());
INSERT INTO dept(dname,db_source) VALUES('人事部',DATABASE());
INSERT INTO dept(dname,db_source) VALUES('财务部',DATABASE());
INSERT INTO dept(dname,db_source) VALUES('市场部',DATABASE());
INSERT INTO dept(dname,db_source) VALUES('运维部',DATABASE());
```

### dao接口

```java
@Mapper
public interface DeptDao {
	
	public boolean addDept(Dept dept);
	public Dept findById(Long id);
	public List<Dept> findAll();

}
```

### DeptMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.luo.springcloud.dao.DeptDao">
	<select id="findById" resultType="Dept" parameterType="Long">
		select deptno,dname,db_source from dept where deptno=#{deptno};
	</select>
	<select id="findAll" resultType="Dept">
		select deptno,dname,db_source from dept;
	</select>
	<insert id="addDept" parameterType="Dept">
		INSERT INTO dept(dname,db_source) VALUES(#{dname},DATABASE());
	</insert>
</mapper>
```

### DeptService

```java
public interface DeptService {
	public boolean add(Dept dept);
	public Dept get(Long id);
	public List<Dept> list();
}
```

### DeptServiceImpl

```java
@Service
public class DeptServiceImpl implements DeptService{
	@Autowired
	private DeptDao dao;

	@Override
	public boolean add(Dept dept) {
		return dao.addDept(dept);
	}

	@Override
	public Dept get(Long id) {
		return dao.findById(id);
	}

	@Override
	public List<Dept> list() {
		return dao.findAll();
	}
}
```

### DeptController

```java
@RestController
public class DeptController {
	@Autowired
	private DeptService service;
	
	@RequestMapping(value="/dept/add",method=RequestMethod.POST)
	public boolean add(@RequestBody Dept dept){
		return service.add(dept);
	}
	
	@RequestMapping(value="dept/get/{id}",method=RequestMethod.GET)
	public Dept get(@PathVariable("id") Long id){
		return service.get(id);
	}
	
	@RequestMapping(value="dept/list",method=RequestMethod.GET)
	public List<Dept> list(){
		return service.list();
	}
}
```

### 创建主启动类DeptProvider8001_App

```java
@SpringBootApplication
public class DeptProvider8001_App {
	public static void main(String[] args) {
		SpringApplication.run(DeptProvider8001_App.class, args);
	}
}
```

### 测试结果

输入http://localhost:8001/dept/list以JSON的方式返回数据

## 4.部门微服务消费者

首先现在父类项目上new一个maven module,microservicecloud-consumer-dept-80修改pom.xml文件

### POM.xml文件

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<parent>
		<groupId>com.luo.springcloud</groupId>
		<artifactId>microservicecloud</artifactId>
		<version>0.0.1-SNAPSHOT</version>
	</parent>

	<artifactId>microservicecloud-consumer-dept-80</artifactId>
	<description>部门微服务消费者</description>

	<dependencies>
		<dependency><!-- 自己定义的api -->
			<groupId>com.luo.springcloud</groupId>
			<artifactId>microservicecloud-api</artifactId>
			<version>${project.version}</version>
		</dependency>
		<!-- Ribbon相关 -->
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-eureka</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-ribbon</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-config</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<!-- 修改后立即生效，热部署 -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>springloaded</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-devtools</artifactId>
		</dependency>
	</dependencies>
</project>
```

### application.yml文件

```yaml
server:
  port: 80
```

### ConfigBean注解类

```java
@Configuration
public class ConfigBean {
    @Bean
	public RestTemplate geRestTemplate(){
		return new RestTemplate();
	}
}
```

#### RestTemplate

RestTemplate提供了多种便捷访问远程Http服务的方法，是一种简单高效便捷的访问restful服务模板类，是Spring提供的用于访问Rest服务的客户端模板工具类集，使用方法如下

（url,requestMap,ResponseBean.class）三个参数分别代表Rest请求地址，请求参数，HTTP响应转换被转换的对象类型

### DeptController_Consumer

```java
@RestController
public class DeptController_Consumer {
	private static final String REST_URL_PREFIX = "http://localhost:8001";
	@Autowired
	private RestTemplate restTemplate;
	
	@RequestMapping(value="/consumer/dept/add")
	public boolean add(Dept dept){
		return restTemplate.postForObject(REST_URL_PREFIX+"/dept/add", dept, Boolean.class);
	}
	
	@RequestMapping(value="/consumer/dept/get/{id}")
	public Dept get(@PathVariable("id") Long id){
		return restTemplate.getForObject(REST_URL_PREFIX+"/dept/get/"+id, Dept.class);
	}
	
	@RequestMapping(value="/consumer/dept/list")
	public Dept list(){
		return restTemplate.getForObject(REST_URL_PREFIX+"/dept/list/", Dept.class);
	}
}
```

### DeptConsumer80_App主类

```java
@SpringBootApplication
public class DeptConsumer80_App {
	public static void main(String[] args) {
		SpringApplication.run(DeptConsumer80_App.class, args);
	}
}
```

### 测试结果

http://localhost/consumer/dept/list

http://localhost/consumer/dept/get/2

http://localhost/consumer/dept/add?dname=AI