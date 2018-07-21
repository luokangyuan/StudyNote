# SpringCloudConfig配置中心

## 概述

就前面项目而言，分布面临的问题是配置问题，每一个项目都有一个yml文件，不好运维管理，所有需要一套集中式，动态的配置管理设施，SpringCloud提供了ConfigServer来解决这个问题。

SpringCloud Config是为微服务架构中的微服务提供集中化的外部配置支持，配置服务器为 **各个不同的微服务应用**的环境提供了一个 **中心化的外部配置**。SpringCloud Config分为客户端和服务端，服务端也称 **分布式配置中心，它是一个独立的微服务应用**，用来连接配置服务器并为客户端提供获取配置信息，加密和解密信息等访问接口，客户端是通过指定的配置中心获取和加载配置信息配置服务器默认采用git来存储配置信息，这样就有助于对环境配置进行版本管理，并且可以通过git客户端工具管理和访问配置内容。

## 作用

- 集中管理配置文件
- 不同环境下不同配置，动态化的配置更新，分环境部署等
- 运行期间动态调整配置，不需要在每一个服务部署的机器编码上编写文件，服务会向配置中心拉取自己的配置信息
- 当配置发生变动时，服务不需要重启即可感知配置的变化并应用新的配置
- 将配置信息以REST接口的形式暴露

## config服务端与GitHub通信

**GitHUb上新建一个microservicecloud-config的Repository**

**本地硬盘目录新建git仓库并clone**

**在D:\workspace2018\micorservicecloude-config\microservicecloud-config新建application.yml文件**

```yaml
Spring:
    profiles:
    active:
    - dev
---
Spring:
    profiles: dev 
    application:
        name: micorservicecloud-config-luo-dev
---
Spring:
    profiles: test 
    application:
        name: micorservicecloud-config-luo-test
```

**注意保存为utf-8的文件格式**

**将yml文件推送到GitHub上**

```properties
git add .
git commit -m""
git push origin master
```

**新建项目microservicecloud-config-3344**

**POM.xml文件**

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>com.luo.springcloud</groupId>
    <artifactId>microservicecloud</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <artifactId>microservicecloud-config-3344</artifactId>
<dependencies>
		<!-- springCloud Config -->
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-config-server</artifactId>
		</dependency>
		<!-- 避免Config的Git插件报错：org/eclipse/jgit/api/TransportConfigCallback -->
		<dependency>
			<groupId>org.eclipse.jgit</groupId>
			<artifactId>org.eclipse.jgit</artifactId>
			<version>4.10.0.201712302008-r</version>
		</dependency>
		<!-- 图形化监控 -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-actuator</artifactId>
		</dependency>
		<!-- 熔断 -->
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-hystrix</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-eureka</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-config</artifactId>
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

**application.yml文件**

```yaml
server: 
  port: 3344 
  
spring:
  application:
    name:  microservicecloud-config
  cloud:
    config:
      server:
        git:
          uri: git@github.com:luokangyuan/microservicecloud-config.git #GitHub上面的git仓库名字
```

**主启动类**

```java
@SpringBootApplication
@EnableConfigServer
public class Config_3344_StartSpringCloudApp {
	public static void main(String[] args) {
		SpringApplication.run(Config_3344_StartSpringCloudApp.class, args);
	}
}
```

**修改host文件**

```properties
127.0.0.1 config-3344.com
```

**测试通过config微服务从GitHub上获取配置内容**

启动服务3344，访问http://config-3344.com:3344/application-dev.yml，http://config-3344.com:3344/application-test.yml

## config客户端获取github配置

**本地新建microservicecloud-config-client.yml文件,并推送到github**

```yaml
server:
    port: 8201
spring:
    profiles: dev
    application:
        name: microservicecloud-config-client
eureka:
    client:
        service-url:
            defaultZone: http://eureka-dev.com:7001/eureka/
---
server:
    port: 8202
spring:
    profiles: test
    application:
        name: microservicecloud-config-client
eureka:
    client:
        service-url:
            defaultZone: http://eureka-test.com:7001/eureka/
```

**新建项目microservicecloud-config-client-3355，pom.xml文件如下**

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>com.luo.springcloud</groupId>
		<artifactId>microservicecloud</artifactId>
		<version>0.0.1-SNAPSHOT</version>
	</parent>
	<artifactId>microservicecloud-config-client-3355</artifactId>

	<dependencies>
		<!-- SpringCloud Config客户端 -->
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-config</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-actuator</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-hystrix</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-eureka</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-config</artifactId>
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

**新建bootstrap.yml文件**

```yaml
spring:
  cloud:
    config:
      name: microservicecloud-config-client #需要从github上读取的资源名称，注意没有yml后缀名
      profile: test   #本次访问的配置项
      label: master   
      uri: http://config-3344.com:3344  #本微服务启动后先去找3344号服务，通过SpringCloudConfig获取GitHub的服务地址
```

application.yml是用户级的资源配置文件，bootstrap.yml是系统级，优先级更高，保证不会被本地配置文件所覆盖

**修改host文件，增加映射**

```properties
127.0.0.1 client-config.com
```

**新建测试controller，从github读取配置信息**

```java
package com.luo.springcloud.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConfigClientRest
{

	@Value("${spring.application.name}")
	private String applicationName;

	@Value("${eureka.client.service-url.defaultZone}")
	private String eurekaServers;

	@Value("${server.port}")
	private String port;

	@RequestMapping("/config")
	public String getConfig()
	{
		String str = "applicationName: " + applicationName + "\t eurekaServers:" + eurekaServers + "\t port: " + port;
		System.out.println("******str: " + str);
		return "applicationName: " + applicationName + "\t eurekaServers:" + eurekaServers + "\t port: " + port;
	}
}
```

**新建主启动类**

```java
@SpringBootApplication
public class ConfigClient_3355_StartSpringCloudApp {
	public static void main(String[] args) {
		SpringApplication.run(ConfigClient_3355_StartSpringCloudApp.class, args);
	}
}
```

**测试**

启动3344服务，启动3355服务，bootstrap.yml中的profile值是什么，决定从github上读取什么,ruguo

访问http://client-config.com:8201/config得到是github上的microservicecloud-config-client.yml文件中dev相关的配置信息

访问http://client-config.com:8202/config得到是github上的microservicecloud-config-client.yml文件中test相关的配置信息