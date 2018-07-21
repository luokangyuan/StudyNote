# Zuul路由网关

## 概述

Zuul包含了对请求的路由和过滤两个主要的功能，其中路由的功能是负责将外部请求转发到具体的微服务实例上，是实现外部访问统一入口的基础而过滤功能是负责对请求的处理过程进行干预，是实现请求校验，服务聚合等功能的基础，Zuul和Eureka进行整合，将Zuul自身注册近Eureka服务治理的应用，同时从Eureka中获取其他微服务的消息，也及时以后的访问服务都是通过Zuul跳转后获得， **注意的是Zuul服务最终还是会注册近Eureka中**

## 路由基本配置

新建项目microservicecloud-zuul-gateway-9527，添加依赖如下

### pom.xml文件

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>com.luo.springcloud</groupId>
    <artifactId>microservicecloud</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <artifactId>microservicecloud-zuul-gateway-9527</artifactId>
<dependencies>
		<!-- zuul路由网关 -->
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-zuul</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-eureka</artifactId>
		</dependency>
		<!-- actuator监控 -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-actuator</artifactId>
		</dependency>
		<!-- hystrix容错 -->
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-hystrix</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-config</artifactId>
		</dependency>
		<!-- 日常标配 -->
		<dependency>
			<groupId>com.luo.springcloud</groupId>
			<artifactId>microservicecloud-api</artifactId>
			<version>${project.version}</version>
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
		<!-- 热部署插件 -->
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
  port: 9527
 
spring: 
  application:
    name: microservicecloud-zuul-gateway
 
eureka: 
  client: 
    service-url: 
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka,http://eureka7003.com:7003/eureka  
  instance:
    instance-id: gateway-9527.com
    prefer-ip-address: true 
 
 
zuul: 
  #ignored-services: microservicecloud-dept
  prefix: /luo
  ignored-services: "*"
info:
  app.name: luo-microcloud
  company.name: www.luo.com
  build.artifactId: $project.artifactId$
  build.version: $project.version$
```

### 修改host文件

```properties
127.0.0.1 myzuul.com
```

### 主启动类Zuul_9527_StartSpringCloudApp

```java
@SpringBootApplication
@EnableZuulProxy
public class Zuul_9527_StartSpringCloudApp {
	public static void main(String[] args) {
		SpringApplication.run(Zuul_9527_StartSpringCloudApp.class, args);
	}
}
```

### 启动

三个集群，一个服务提供类microservicecloud-provider-dept-8001，一个路由

### 测试

不使用路由：http://localhosat:8001/dept/get/2

使用路由：http://myzuul.com:9527/microservicecloud-dept/dept/get/2

## Zuul路由访问映射

在前面的测试中我们可以使用http://myzuul.com:9527/microservicecloud-dept/dept/get/2访问我们的接口，这样就暴露我们的微服务名称，需要做安全加固，就用到了路由访问映射，修改路由项目的yml文件,添加 mydept.path: /mydept/**

```yaml
zuul: 
  #ignored-services: microservicecloud-dept #忽略真实地址，只让虚拟地址访问
  prefix: /luo #访问地址前缀
  ignored-services: "*"#忽略真实地址，只让虚拟地址访问
  routes: 
    mydept.serviceId: microservicecloud-dept ##真实地址
    mydept.path: /mydept/** # 虚拟地址
```

**访问连接：http://lyzuul.com:9527/luo/mydept/dept/get/1**