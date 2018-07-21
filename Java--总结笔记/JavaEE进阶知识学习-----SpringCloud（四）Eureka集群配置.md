# Eureka集群配置

microservicecloud-eureka-7001使EurekaServer服务注册中心，一旦这个出现问题，那么微服务就不能正常的工作，为防止这种情况，所以出现了集群，就是建立多个microservicecloud-eureka-7002，microservicecloud-eureka-7003等服务注册中心。

- 新建microservicecloud-eureka-7002，microservicecloud-eureka-7003服务注册中心
- 根据microservicecloud-eureka-7001的pom.xml修改7002和7003的pom.xml文件
- 复制7001的主程序启动类，并修改为7002,7003即可

## 修改映射配置

在7001注册中的application.yml文件中hostname，不能与7002,7003相同，所以要做映射配置

```yaml
eureka: 
  instance:
    hostname: localhost #eureka服务端的实例名称
```

**修改C:\Windows\System32\drivers\etc\host文件**,让127.0.0.1有三个别名

```properties
127.0.0.1 eureka7001.com
127.0.0.1 eureka7002.com
127.0.0.1 eureka7003.com
```

## microservicecloud-eureka-7001中的yml修改

```yaml
server: 
  port: 7001
eureka: 
  instance:
    hostname: eureka7001.com #eureka服务端的实例名称
  client: 
    register-with-eureka: false     #false表示不向注册中心注册自己。
    fetch-registry: false     #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    service-url: 
      #单机 defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/       
      #设置与Eureka Server交互的地址查询服务和注册服务都需要依赖这个地址（单机）。
      defaultZone: http://eureka7002.com:7002/eureka/,http://eureka7003.com:7003/eureka/
```

## microservicecloud-eureka-7002中的yml修改

```yaml
server: 
  port: 7002
eureka: 
  instance:
    hostname: eureka7002.com #eureka服务端的实例名称
  client: 
    register-with-eureka: false     #false表示不向注册中心注册自己。
    fetch-registry: false     #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    service-url: 
      #单机 defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/       
      #设置与Eureka Server交互的地址查询服务和注册服务都需要依赖这个地址（单机）。
      defaultZone: http://eureka7002.com:7002/eureka/,http://eureka7003.com:7003/eureka/
```

## microservicecloud-eureka-7003中的yml修改

```yaml
server: 
  port: 7003
eureka: 
  instance:
    hostname: eureka7003.com #eureka服务端的实例名称
  client: 
    register-with-eureka: false     #false表示不向注册中心注册自己。
    fetch-registry: false     #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    service-url: 
      #单机 defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/       
      #设置与Eureka Server交互的地址查询服务和注册服务都需要依赖这个地址（单机）。
      defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka/
```

## 修改dept微服务的yml文件

dept微服务会同时注册到7001,7002,7003服务注册中心

```yaml
eureka:
  client: #客户端注册进eureka服务列表内
    service-url: 
      #defaultZone: http://localhost:7001/eureka
      defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka/,http://eureka7003.com:7003/eureka/ 
```

## 测试

- 访问eureka7001.com:7001
- 访问eureka7002.com:7002
- 访问eureka7003.com:7003