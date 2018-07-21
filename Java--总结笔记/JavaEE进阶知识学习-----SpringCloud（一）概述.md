# SpringCloud概述

## SpringCloud是什么

SpringCloud，基于SpringBoot提供的一套微服务解决方案，包括服务注册与发现，配置中心，全链路监控，服务网关，负载均衡，等组件。换句话说是分布式微服务架构下的一站式解决方案，是各个微服务架构落地技术的集合体，俗称微服务全家桶。

## SpringBoot和SpringCloud

- SpringBoot专注于快速方便的开发单个个体微服务
- SpringCloud是关注全局的微服务协调整理治理框架，它将SpringBoot开发的单体微服务整合并管理，为各个微服务之间提供配置管理，服务发现，路由，分布式会话等集成服务
- SpringBoot可以离开SpringCloud独立的开发项目，但是SpringCloud离不开SpringBoot，属于依赖关系
- SpringBoot专注于快速，方便的开发单个微服务个体，SpringCloud关注全局的服务治理框架

## Double和SpringCloud

首先可以在GitHub上看到二者的活跃度，其次是比较各功能组件的支持情况，最大的区别在于SpringCloud抛弃了Dubbo的RPC通信，采用的是HTTP的REST方式，如下：

|        | Dobbo         | SpringCloud                  |
| ------ | ------------- | ---------------------------- |
| 服务注册中心 | Zookeeper     | SpringCloud Netflix Eureka   |
| 服务调用方式 | RPC           | Rest API                     |
| 服务监控   | Dubbo-monitor | Spring Boot Admin            |
| 断路器    | 不完善           | Spring Cloud Netflix Hystrix |
| 服务网关   | 无             | Spring Cloud Netflix Zuul    |
| 分布式配置  | 无             | Spring Cloud Config          |
| 服务跟踪   | 无             | Spring Cloud Sleuth          |
| 消息总线   | 无             | Spring Cloud Bus             |
| 数据流    | 无             | Spring Cloud Stream          |
| 批量任务   | 无             | Spring Cloud Task            |

## SpringCloud资料

SpringCloud各个组件的文档：https://springcloud.cc/spring-cloud-netflix.html

SpringCloud中文API：https://springcloud.cc/spring-cloud-dalston.html