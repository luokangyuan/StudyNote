# Eureka服务注册与发现

## Eureka三大角色

- Eureka Server提供服务注册和发现
- Service Provider服务提供方将自身服务注册到Eureka， 从而使服务消费者能够找到
- Service Consumer服务消费方从Eureka获取注册服务列表，从而能够消费

## 1.Eureka Server注册

在上述项目的父工程中新建microservicecloud-eureka-7001，这个module是Eureka的服务中心

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

	<artifactId>microservicecloud-eureka-7001</artifactId>
	<dependencies>
		<!--eureka-server服务端 -->
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-eureka-server</artifactId>
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
  port: 7001
eureka: 
  instance:
    hostname: localhost #eureka服务端的实例名称
  client: 
    register-with-eureka: false     #false表示不向注册中心注册自己。
    fetch-registry: false     #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    service-url: 
      #单机 defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/       #设置与Eureka Server交互的地址查询服务和注册服务都需要依赖这个地址（单机）。
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
```

### EurekaServer主启动类

```java
@SpringBootApplication
@EnableEurekaServer// EurekaServer服务器端启动类，接收其它微服务注册进来
public class EurekaServer7001_App {
	public static void main(String[] args) {
		SpringApplication.run(EurekaServer7001_App.class, args);
	}
}
```

### 测试EurekaServer

浏览器输入http://localhost:7001/，看到Spring Eureka界面表示成功，这个访问链接和程序中的application.yml配置吻合。

## 2.微服务注册

将microservicecloud-provider-dept-8001微服务注册到microservicecloud-eureka-7001中

### 修改microservicecloud-provider-dept-8001的POM.xml文件

```xml
<!-- 将微服务provider侧注册进eureka -->
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-eureka</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
```

### 修改microservicecloud-provider-dept-8001的application.yml文件

```yaml
eureka:
  client: #客户端注册进eureka服务列表内
    service-url: 
      defaultZone: http://localhost:7001/eureka
```

说明：defaultZone的地址对应Eureka Server服务注册中心的application.yml中的defaultZone路径

### microservicecloud-provider-dept-8001主程序类使用注解

```java
@SpringBootApplication
@EnableEurekaClient // 本服务启动后会注册到Eureka服务注册中心
public class DeptProvider8001_App {
	public static void main(String[] args) {
		SpringApplication.run(DeptProvider8001_App.class, args);
	}
}
```

### 测试是否注册成功

先启动Eureka服务注册中心microservicecloud-eureka-7001，启动微服务microservicecloud-provider-dept-8001，打开浏览器输入http://localhost:7001/，Application下出现**MICROSERVICECLOUD-DEPT**微服务名称，这个名称来源于microservicecloud-provider-dept-8001中application.ym文件中的配置属性，如下

```yaml
spring:
   application:
    name: microservicecloud-dept 
```

## 3.微服务常用设置

### 主机名称和服务名称修改

在Eureka中注册的微服务的Status的名称显示localhost或者显示电脑主机名，所以要修改服务的主机名称，修改方法如下，修改microservicecloud-provider-dept-8001中application.yml文件，修改后如下

```yaml
 instance:
    instance-id: microservicecloud-dept8001
```

### 访问信息有IP信息提示

修改microservicecloud-provider-dept-8001中application.yml文件，修改后如下

```yaml
  instance:
    instance-id: microservicecloud-dept8001
    prefer-ip-address: true     #访问路径可以显示IP地址 
```

### 微服务info内容详细信息

增加microservicecloud-provider-dept-8001中POM.xml文件

```xml
<!-- actuator监控信息完善 -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

总的父工程microservicecloud修改pom.xml添加构建build信息

```xml
<build>
  <finalName>microservicecloud</finalName>
  <resources>
    <resource>
      <!-- 说明在src/main/resources目录下的配置文件 -->
      <directory>src/main/resources</directory>
      <filtering>true</filtering>
    </resource>
  </resources>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-resources-plugin</artifactId>
      <configuration>
        <delimiters>
          <!-- 表示以$开始和以$结束的表示方法 -->
          <delimit>$</delimit>
        </delimiters>
      </configuration>
    </plugin>
  </plugins>
</build>
```

修改microservicecloud-provider-dept-8001中application.yml文件，修改后如下

```yaml
info: 
  app.name: luokangyuan-microservicecloud
  company.name: www.luokangyuan.com
  build.artifactId: $project.artifactId$
  build.version: $project.version$
```

## 4.Eureka的自我保护机制

### 导致的原因

默认情况下，如果EurekaServer在一定的时间内没有接收到某一个微服务实例的心跳，EurekaServer将会注销该实例，页面就会看见一串红色提示，但是当网络分区发生故障时，微服务与EurekaServer无法进行正常的通信，此时本不应该注销这个微服务实例，这个时候，Eureka的自我保护机制就可以解决这个问题，当EurekaServer节点在短时间内丢失过多的客户端时（可能发生了网络故障），那么这个节点就会进入自我保护模式，一旦进入该模式，EurekaServer就会保护服务注册表中的信息，不再删除服务注册表中的数据（也就是不会注销任何微服务），当网络故障恢复后，该EurekaServer节点就会自动退出自我保护模式。

### 总结

在自我保护模式下，EurekaServer会保护服务注册表中的信息，不再注销任何服务实例，当它收到的心跳数重新到阈值以上，该EurekaServer就会自动退出自我保护模式，也就是宁可保留错误的服务注册信息，也不盲目的删除任何可能健康的服务实例。

## 5.服务发现

对于注册近Eureka里面的微服务，可以通过服务发现来获取该服务的信息

### 修改microservicecloud-provider-dept-8001的DeptController

```java
@Autowired
private DiscoveryClient client;

@RequestMapping(value = "/dept/discovery", method = RequestMethod.GET)
public Object discovery(){
  List<String> list = client.getServices();//得到Eureka中所有的微服务
  System.out.println("**********" + list);

  List<ServiceInstance> srvList = client.getInstances("MICROSERVICECLOUD-DEPT");
  for (ServiceInstance element : srvList) {
    System.out.println(element.getServiceId() + "\t" 
                       + element.getHost() + "\t" + element.getPort() + "\t"
                       + element.getUri());
  }
  return this.client;
}

```

### microservicecloud-provider-dept-8001主启动类添加注解

```java
@SpringBootApplication
@EnableEurekaClient // 本服务启动后会注册到Eureka服务注册中心
@EnableDiscoveryClient // 服务发现
public class DeptProvider8001_App {
	public static void main(String[] args) {
		SpringApplication.run(DeptProvider8001_App.class, args);
	}
}
```

### 自测试

启动服务注册中心microservicecloud-eureka-7001，再启动microservicecloud-provider-dept-8001，访问http://localhost:8001/dept/discovery可以得到这个服务的info信息，/dept/discovery接口就是microservicecloud-provider-dept-8001这个服务暴露给外部访问的接口。使用http://localhost:8001/dept/discovery测试，就是自己测试能不能使用

### 外部访服务暴露的接口

microservicecloud-consumer-dept-80调用microservicecloud-provider-dept-8001服务暴露在外的接口，修改microservicecloud-consumer-dept-80中的DeptController_Consumer，如下

```java
// 测试@EnableDiscoveryClient,消费端可以调用服务发现
@RequestMapping(value = "/consumer/dept/discovery")
public Object discovery(){
  return restTemplate.getForObject(REST_URL_PREFIX + "/dept/discovery", Object.class);
}
```

### 消费者访问接口测试

启动microservicecloud-consumer-dept-80访问http://localhost/consumer/dept/discovery得到8001微服务信息

### 总结

- microservicecloud-provider-dept-8001注册到EurekaServer服务中心
- microservicecloud-provider-dept-8001将Controller中的某一个方法暴露出去（提供服务发现）
- microservicecloud-consumer-dept-80中的Controller就可以调用微服务暴露出来的接口