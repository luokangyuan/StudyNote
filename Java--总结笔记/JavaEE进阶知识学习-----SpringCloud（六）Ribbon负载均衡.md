# Ribbon负载均衡

## Ribbon概述

Spring Cloude Ribbon是基于Netfilx Ribbon实现的一套客户端 负载均衡的工具，简单说，Ribbon是Netfilix发布的开源项目，主要功能就是提供 **客户端的软件负载均衡算法**，将Netfilix的中间层服务连接在一起，Ribbon客户端组件提供了一系列完善的配置项如连接超时，重试等，简单说，就是在配置文件中列出Load Balance后面的所有机器，Ribbon会自动的帮助你基于某种算法规则（简单轮询，随机连接等）去连接这些机器，也可以使用Ribbon自定义负载均衡算法。LB，即负载均衡，在微服务或者分布式集群中常用的一种应用。负载均衡就是将用户的请求平摊的分配到多个服务上，从而达到HA，常见的负载均衡软件有Nginx，LVS，硬件F5等

## Ribbon配置初步

由于Ribbon是客户端的负载均衡工具，所以我们需要修改的是客户端项目microservicecloud-consumer-dept-80

### POM.xml文件

```xml
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
```

### 修改application.yml文件，添加Eureka的服务注册地址

```yaml
server:
  port: 80
eureka:
  client:
    register-with-eureka: false #自己不能注册
    service-url: 
      defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka/,http://eureka7003.com:7003/eureka/  
```

### 修改客户端配置类

由于客户端使用restTemplate访问服务端中的数据接口，restTemplate配置在服务端的配置类中，所以修改如下

```java
@Configuration
public class ConfigBean {
	@Bean
	@LoadBalanced
	public RestTemplate geRestTemplate(){
		return new RestTemplate();
	}
}
```

### 修改客户端主程序启动类

```java
@SpringBootApplication
@EnableEurekaClient
public class DeptConsumer80_App {
	public static void main(String[] args) {
		SpringApplication.run(DeptConsumer80_App.class, args);
	}
}
```

### 修改客户端访问类DeptController_Consumer.java

```java
private static final String REST_URL_PREFIX = "http://MICROSERVICECLOUD-DEPT";
```

### 测试

启动7001,7002,7003三个服务注册中心，启动8001服务提供者，启动80客户端，使用http://localhost/consumer/dept/list可以渠道对应的数据，在DeptController_Consumer使用的是http://MICROSERVICECLOUD-DEPT服务名称来调用服务的接口，相比之前的http://localhost:8001，Ribbon和Eureka整合后，Consumer可以直接通过服务名称来调用服务，而不再关心地址和端口号。

## Ribbon负载均衡

 目前只有一个microservicecloud-provider-dept-8001服务提供者，为了实现Ribbon的负载均衡，所以我们需要多个服务提供者实例，新建microservicecloud-provider-dept-8002，microservicecloud-provider-dept-8003两个Module。参考8001的pom.xml文件修改8002,8003的pom.xml文件。拷贝8001中的所以类和配置文件mybatis和application.yml文件，将主启动类修改为对应的名字

### microservicecloud-provider-dept-8002服务提供者

#### 使用的数据库SQL语句

```sql
DROP DATABASE IF EXISTS cloudDB02 ;

CREATE DATABASE cloudDB02 CHARACTER SET UTF8 ;

USE cloudDB02 ;

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

#### Application.yml文件

```yaml
server:
  port: 8002
  
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
    url: jdbc:mysql://localhost:3306/cloudDB02              # 数据库名称
    username: root
    password: 1234
    dbcp2:
      min-idle: 5                                           # 数据库连接池的最小维持连接数
      initial-size: 5                                       # 初始化连接数
      max-total: 5                                          # 最大连接数
      max-wait-millis: 200      
```



### microservicecloud-provider-dept-8003服务提供者

#### 使用的数据库SQL语句

```sql
DROP DATABASE IF EXISTS cloudDB03 ;

CREATE DATABASE cloudDB03 CHARACTER SET UTF8 ;

USE cloudDB03 ;

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

#### Application.yml文件

```yaml
server:
  port: 8003
  
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
    url: jdbc:mysql://localhost:3306/cloudDB03              # 数据库名称
    username: root
    password: 1234
    dbcp2:
      min-idle: 5                                           # 数据库连接池的最小维持连接数
      initial-size: 5                                       # 初始化连接数
      max-total: 5                                          # 最大连接数
      max-wait-millis: 200      
```

### 微服务提供者说明

三个微服务提供者连接不同的数据库，因此在application.yml文件中，我们需要修改端口号和连接的数据库，注意的是三个微服务提供者的微服务名字保持一样，也就是如下的配置信息

```yaml
spring:
   application:
    name: microservicecloud-dept 
```

### 负载均衡自测

访问连接http://localhost:8001/dept/list，http://localhost:8002/dept/list，http://localhost:8003/dept/list得到不同数据库数据，当我们启动服务注册中心7001,7002,7003,再启动80客户端，这个时候访问localhost/consumer/dept/list，每次刷新就会得到不同数据库的数据。这就是Ribbon默认的轮询算法的负载均衡。

## Ribbon核心组件IRule

#### Ribbon负载均衡算法

Ribbon默认提供的是轮询的负载均衡算法，完整了还有如下

| RoundRobinRule            | 轮询                                       |
| ------------------------- | ---------------------------------------- |
| RandomRule                | 随机                                       |
| AvaliabilityFilteringRule | 会先过滤由于多次访问故障而处于断路器跳闸的状态的服务和并发的连接数量超过阈值的服务，然后对剩余的服务列表按照轮询策略 |
| WeightedResponseTimeRule  | 根据平均响应时间计算所有服务的权重，响应时间越快服务权重越大           |
| RetryRule                 | 先按照RoundRobinRule策略获取服务，如果获取服务失败会在指定时间内重试 |
| BestAvailableRule         | 会先过滤掉由于多次访问故障二处于断路器跳闸状态的服务，然后选择一个并发量最小的服务 |
| ZoneAvoidanceRule         | 默认规则，复合判断server所在的区域的性能和server的可用性选择服务器  |

#### Ribbon负载均衡算法使用方法

在客户端的配置类ConfigBean.java中添加IRule的实现

```java
@Configuration
public class ConfigBean {
	@Bean
	@LoadBalanced
	public RestTemplate geRestTemplate(){
		return new RestTemplate();
	}
	@Bean
	public IRule myRule(){
		return new RandomRule();
	}
}
```

## Ribbon自定义

如果不使用Ribbon默认的七种负载均衡算法，这个时候就需要使用自定义负载均衡算法

### 客户端主启动类使用注解@RibbonClient

```java
@SpringBootApplication
@EnableEurekaClient
@RibbonClient(name="MICROSERVICECLOUD-DEPT",configuration=MySelfRule.class)
public class DeptConsumer80_App {
	public static void main(String[] args) {
		SpringApplication.run(DeptConsumer80_App.class, args);
	}
}
```

**特此说明**

RibbonClient注解中的MySelfRule类使我们自定义负载均衡算法的类，但是，这个自定义配置类不能放在@ComponentScan所扫描的当前包下以及子包下，否则我们这个自定义的配置类会被所有的Ribbon客户端所共享，也就说，达不到我们特殊化定制的目的。举例说明，自定义配置类不能放在项目主启动类所有的包以及子包下，因为主启动类使用注解@SpringBootApplication，这个注解点进去使用@ComponentScan注解

### 自定义负载均衡算法

轮询算法中每一个服务轮询一次，现在需求是每一个服务调用五次后在轮询下一个服务

### 自定义配置类

```java
package com.luo.myrule;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.netflix.loadbalancer.IRule;

@Configuration
public class MySelfRule {
	@Bean
	public IRule myRule(){
		return new RandomRule_lky();
	}
}
```

### 自定义算法类

```java
package com.luo.myrule;

import java.util.List;

import com.netflix.client.config.IClientConfig;
import com.netflix.loadbalancer.AbstractLoadBalancerRule;
import com.netflix.loadbalancer.ILoadBalancer;
import com.netflix.loadbalancer.Server;

public class RandomRule_lky extends AbstractLoadBalancerRule{
	// total = 0 // 当total==5以后，我们指针才能往下走，
	// index = 0 // 当前对外提供服务的服务器地址，
	// total需要重新置为零，但是已经达到过一个5次，我们的index = 1
	// 分析：我们5次，但是微服务只有8001 8002 8003 三台，OK？
	private int total = 0; 			// 总共被调用的次数，目前要求每台被调用5次
	private int currentIndex = 0;	// 当前提供服务的机器号
	public Server choose(ILoadBalancer lb, Object key){
		if (lb == null) {
			return null;
		}
		Server server = null;
		while (server == null) {
			if (Thread.interrupted()) {
				return null;
			}
			List<Server> upList = lb.getReachableServers();
			List<Server> allList = lb.getAllServers();
			int serverCount = allList.size();
			if (serverCount == 0) {
				return null;
			}
//			private int total = 0; 			// 总共被调用的次数，目前要求每台被调用5次
//			private int currentIndex = 0;	// 当前提供服务的机器号
            if(total < 5)
            {
	            server = upList.get(currentIndex);
	            total++;
            }else {
	            total = 0;
	            currentIndex++;
	            if(currentIndex >= upList.size())
	            {
	              currentIndex = 0;
	            }
            }			
			if (server == null) {
				Thread.yield();
				continue;
			}
			if (server.isAlive()) {
				return (server);
			}
			server = null;
			Thread.yield();
		}
		return server;
	}
	@Override
	public Server choose(Object key){
		return choose(getLoadBalancer(), key);
	}
	@Override
	public void initWithNiwsConfig(IClientConfig clientConfig){}
}
```

# 