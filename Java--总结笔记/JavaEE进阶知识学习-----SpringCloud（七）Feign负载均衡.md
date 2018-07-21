# Feign负载均衡

Feign是一个声明式WebService客户端，使用Feign能够让编写Web Service客户端变得更简单，它的使用方法就是定义一个接口，然后在上面添加注解。SpringCloud对Feign进行了封装，支持SpringMVC注解和HTTPMessageConverters，Feign可以与Eureka和Ribbon组合使用以支持负载均衡。简单讲，只需要创建一个接口，然后在上面使用注解即可。

## Feign使用步骤

参考项目microservicecloud-consumer-dept-80新建microservicecloud-consumer-dept-feign,拷贝相应的包和配置文件，去掉IRule等信息，修改pom.xml文件，添加对Feign的支持

### pom.xml文件

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>com.luo.springcloud</groupId>
    <artifactId>microservicecloud</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <artifactId>microservicecloud-consumer-dept-feign</artifactId>
<dependencies>
		<dependency><!-- 自己定义的api -->
			<groupId>com.luo.springcloud</groupId>
			<artifactId>microservicecloud-api</artifactId>
			<version>${project.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-feign</artifactId>
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

由于Feign是面向接口编程，为方便接口的互相调用，将接口和公共的方向在项目microservicecloud-api中，因此修改为：

### 修改microservicecloud-api工程的pom.xml文件

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-feign</artifactId>
</dependency>
```

### 新建DeptClientService接口

```java
@FeignClient(value = "MICROSERVICECLOUD-DEPT")
public interface DeptClientService {
	@RequestMapping(value = "/dept/get/{id}",method = RequestMethod.GET)
	public Dept get(@PathVariable("id") long id);
	
	@RequestMapping(value = "/dept/list",method = RequestMethod.GET)
	public List<Dept> list();
	
	@RequestMapping(value = "/dept/add", method = RequestMethod.POST)
	public boolean add(Dept dept);
}
```

### 修改microservicecloud-consumer-dept-feign中Controller添加新建的DeptClientService

```java
@RestController
public class DeptController_Consumer {
	@Autowired
	private DeptClientService service;
	
	@RequestMapping(value = "/consumer/dept/get/{id}")
	public Dept get(@PathVariable("id") Long id){
		return this.service.get(id);
	}
	
	@RequestMapping(value = "/consumer/dept/list")
	public List<Dept> list(){
		return this.service.list();
	}
	
	@RequestMapping(value = "/consumer/dept/add")
	public Object add(Dept dept){
		return this.add(dept);
	}
}
```

### 修改microservicecloud-consumer-dept-feign主启动类,添加注解

```java
@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients(basePackages = {"com.luo.springcloud"})
@ComponentScan("com.luo.springcloud")
public class DeptConsumer80_Feign_App {
	public static void main(String[] args) {
		SpringApplication.run(DeptConsumer80_Feign_App.class, args);
	}
}
```

### 测试

启动3个Eureka集群，启动三个部门微服务提供者，启动Feign，访问http://localhost/consumer/dept/list即可

### 总结说明

Feign集成了Ribbon，利用Ribbon维护了MicroServiceCloud-Dept的服务列表信息，并通过轮询的方式实现了客户端的复杂均衡，与Ribbon不同的是，通过Feign只需要定义服务绑定接口且以声明式法人方法，优雅而简单的实现服务调用。