# Hystrix断路器

## 概述

Hystrix是一个用于处理分布式系统的**延迟**和**容错**的开源库，在分布式系统中，许多的依赖不可避免的会调用失败，比如超时，异常等，Hystrix能够保证在一个依赖出问题的情况下， **不会导致整体服务的失败，避免级联故障，以提高分布式系统的弹性。**断路器本身是一种开关装置，当某个服务单元发生故障之后，通过断路器的故障监控（类似熔断保险丝）， **向调用方法返回一个预期的，可处理的备选响应（FallBack），而不是长时间的等待或者抛出调用方法异常无法处理的异常**，这样就保证服务调用方的线程不会被长时间，不必要的占用，从而避免了故障在分布式系统中的蔓延。

## 服务熔断

熔断机制是应对雪崩效应的一种微服务链路保护机制，当扇出链路的某一个微服务不可用或者响应时间太长，会进行服务的降级， **进而熔断该节点微服务的调用，快速返回“错误”的响应信息**，当检测到该节点微服务调用响应正常后恢复调用链路，在SpringCloud框架中熔断机制使用Hystrix实现，Hystrix会监控微服务调用情况，当失败达到一定阈值。就会启动熔断机制，熔断机制的注解是 **@HystrixCommand**

## Hystrix实操

### 参照microservicecloud-provider-dept-8001建立microservicecloud-provider-dept-hystrix-8001项目

### pom.xml文件

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-hystrix</artifactId>
</dependency>
```

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>com.luo.springcloud</groupId>
    <artifactId>microservicecloud</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <artifactId>microservicecloud-provider-dept-hystrix-8001</artifactId>
<dependencies>
		<!-- hystrix -->
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-hystrix</artifactId>
		</dependency>
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
eureka:
  client: #客户端注册进eureka服务列表内
    service-url: 
      #defaultZone: http://localhost:7001/eureka
      defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka/,http://eureka7003.com:7003/eureka/      
  instance:
    instance-id: microservicecloud-dept8001-hystrix #自定义服务名称信息
    prefer-ip-address: true     #访问路径可以显示IP地址 
```

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
      #defaultZone: http://localhost:7001/eureka
      defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka/,http://eureka7003.com:7003/eureka/      
  instance:
    instance-id: microservicecloud-dept8001-hystrix #自定义服务名称信息
    prefer-ip-address: true     #访问路径可以显示IP地址 
    
info: 
  app.name: luokangyuan-microservicecloud
  company.name: www.luokangyuan.com
  build.artifactId: $project.artifactId$
  build.version: $project.version$
```

### 修改DeptController

Hystrix的作用就是当调用服务出现异常时如何解决，模拟根据id查部门信息，查到null，人为抛出运行时异常，让Hystrix处理这种情况。

```java
@RequestMapping(value="dept/get/{id}",method=RequestMethod.GET)
@HystrixCommand(fallbackMethod = "processHystrix_GET")
public Dept get(@PathVariable("id") Long id){
  Dept dept = service.get(id);
  if(null == dept){
    throw new RuntimeException("该ID:"+id+"没有对应的部门信息");
  }
  return dept;
}

public Dept processHystrix_GET(@PathVariable("id") Long id){
  return new Dept().setDeptno(id)
    .setDname("该ID："+id+"没有对应的信息，null--@HystrixCommand")
    .setDb_source("no this database in Mysql");
}
```

### 修改主启动类添加Hystrix支持

```java
@SpringBootApplication
@EnableEurekaClient // 本服务启动后会注册到Eureka服务注册中心
@EnableDiscoveryClient // 服务发现
@EnableCircuitBreaker //对Hystrix熔断机制的支持
public class DeptProvider8001_Hystrix_App {
	public static void main(String[] args) {
		SpringApplication.run(DeptProvider8001_Hystrix_App.class, args);
	}
}
```

### 测试熔断机制

启动三个Eureka集群，启动服务主启动类DeptProvider8001_Hystrix_App，客户端启动microservicecloud-consumer-dept-80，页面访问http://localhost/consumer/dept/get/112

## 服务降级

服务降级处理是在客户端完成的，与服务端没有关系，在前面的服务熔断中，我们发现每一个业务方法都要写一个processHystrix_方法，这样就造成了很大耦合，根据Spring的学习，我们可将processHystrix_改写一个异常通知。

### 修改microservicecloud-api工程

根据已有的DeptClientService接口，新建一个实现了FallbackFactory接口的类DeptClientServiceFallbackFactory

```java
package com.luo.springcloud.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.luo.springcloud.entities.Dept;

import feign.hystrix.FallbackFactory;
@Component
public class DeptClientServiceFallbackFactory implements FallbackFactory<DeptClientService>{

	@Override
	public DeptClientService create(Throwable arg0) {
		return new DeptClientService() {
			
			@Override
			public List<Dept> list() {
				return null;
			}
			
			@Override
			public Dept get(long id) {
				return new Dept().setDeptno(id)
						.setDname("该ID："+id+"没有对应的信息，Consumer客户端提供的降级信息，此服务暂停使用")
						.setDb_source("no this database in Mysql");
			}
			
			@Override
			public boolean add(Dept dept) {
				return false;
			}
		};
	}

}
```

**注意：不要忘记新类上添加@Component注解**

### 修改microservicecloud-api

在DeptClientService接口在注解@FeignClient(value = "MICROSERVICECLOUD-DEPT")添加fallbackFactory属性值

```java
@FeignClient(value = "MICROSERVICECLOUD-DEPT",fallbackFactory = DeptClientServiceFallbackFactory.class)
```

```java
@FeignClient(value = "MICROSERVICECLOUD-DEPT",fallbackFactory = DeptClientServiceFallbackFactory.class)
public interface DeptClientService {
	@RequestMapping(value = "/dept/get/{id}",method = RequestMethod.GET)
	public Dept get(@PathVariable("id") long id);
	
	@RequestMapping(value = "/dept/list",method = RequestMethod.GET)
	public List<Dept> list();
	
	@RequestMapping(value = "/dept/add", method = RequestMethod.POST)
	public boolean add(Dept dept);
}
```

### 修改microservicecloud-consumer-dept-feign的Application.yml文件

```yaml
server:
  port: 80
  
feign: 
  hystrix: 
    enabled: true
eureka:
  client:
    register-with-eureka: false
    service-url: 
      defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka/,http://eureka7003.com:7003/eureka/  
```

### 测试服务降级

启动三个Eureka集群，microservicecloud-provider-dept-8001启动，microservicecloud-consumer-dept-feign启动，正常访问http://localhost/consumer/dept/get/1测试，故意关停microservicecloud-provider-dept-8001，客户端自己调用提示

## 服务监控Hystrix Dashboard

Hystrix还提供了准实时的调用监控Hystrix Dashboard，Hystx会持续的记录所有通过Hystrix发起的请求的执行信息，并以统计报表的图形的形式展示给用户，包括每秒执行多少次请求多少成功多少失败等，对监控内容转换为可视化界面。

**新建microservicecloud-consumer-hystrix-dashboard监控的一个微服务工程**

## POM.xml文件

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>com.luo.springcloud</groupId>
    <artifactId>microservicecloud</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <artifactId>microservicecloud-consumer-hystrix-dashboard</artifactId>
<dependencies>
		<!-- 自己定义的api -->
		<dependency>
			<groupId>com.luo.springcloud</groupId>
			<artifactId>microservicecloud-api</artifactId>
			<version>${project.version}</version>
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
		<!-- feign相关 -->
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-feign</artifactId>
		</dependency>
		<!-- hystrix和 hystrix-dashboard相关 -->
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-hystrix</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-hystrix-dashboard</artifactId>
		</dependency>
	</dependencies>
</project>
```

## application.yml文件

```yaml
server:
  port: 9001
```

## 主启动类DeptConsumer_DashBoard_App

```java
@SpringBootApplication
@EnableHystrixDashboard
public class DeptConsumer_DashBoard_App {
	public static void main(String[] args) {
		SpringApplication.run(DeptConsumer_DashBoard_App.class, args);
	}
}
```

## 微服务提供者添加监控依赖配置

所有的Provider微服务提供类（8001,8002,8003）都需要监控依赖配置，也就是pom文件添加如下依赖

```xml
<!-- actuator监控信息完善 -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

## 监控页面测试

**启动microservicecloud-consumer-hystrix-dashboard，访问http://localhost:9001/hystrix,出现豪猪页面**

## 全部测试

**启动3个Eureka集群，启动microservicecloud-provider-dept-hystrix-8001**，启动了microservicecloud-consumer-hystrix-dashboard用来监控8001服务提供者，访问http://localhost:8001/hystrix.stream

### 观察监控窗口

访问http://localhost:9001/hystrix，填写监控地址http://localhost:8001/hystrix.stream,时间2000，title:demo01,点击按钮

实心圆：两种含义，它通过颜色的变化代表了实例的健康程度，健康色是从绿色<黄色<橙色<红色递减，该实心圆除了颜色的变化之外，他的大小也会根据实例的请求流量发生变化，流量越大该实心圆就越大，所以通过实心圆的展示就可以在大量实例中快速的发现 **故障实例和高压力测试**。