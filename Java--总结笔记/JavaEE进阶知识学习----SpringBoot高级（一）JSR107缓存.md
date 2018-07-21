# SpringBoot与缓存

## JSR107

Java Caching定义了5个核心接口，分别是CachingProvider, CacheManager, Cache, Entry和Expiry。

- CachingProvider定义了创建、配置、获取、管理和控制多个CacheManager。一个应用可以在运行期访问多个CachingProvider。
- CacheManager定义了创建、配置、获取、管理和控制多个唯一命名的Cache，这些Cache存在于CacheManager的上下文中。一个CacheManager仅被一个CachingProvider所拥有。
- Cache是一个类似Map的数据结构并临时存储以Key为索引的值。一个Cache仅被一个CacheManager所拥有。
- Entry是一个存储在Cache中的key-value对。
- Expiry每一个存储在Cache中的条目有一个定义的有效期。一旦超过这个时间，条目为过期的状态。一旦过期，条目将不可访问、更新和删除。缓存有效期可以通过ExpiryPolicy设置。

**使用JSR107需要导入如下包**

```xml
<dependency>
	<groupId>javax.cache</groupId>
    <artifactId>cache-api</artifactId>
</dependency>
```

## Spring缓存抽象

Spring从3.1开始定义了org.springframework.cache.Cache和org.springframework.cache.CacheManager接口来统一不同的缓存技术；并支持使用JCache（JSR-107）注解简化我们开发；

- Cache接口为缓存的组件规范定义，包含缓存的各种操作集合；
- Cache接口下Spring提供了各种xxxCache的实现；如RedisCache，EhCacheCache , ConcurrentMapCache等；
- 每次调用需要缓存功能的方法时，Spring会检查检查指定参数的指定的目标方法是否已经被调用过；如果有就直接从缓存中获取方法调用后的结果，如果没有就调用方法并缓存结果后返回给用户。下次调用直接从缓存中获取。
- 使用Spring缓存抽象时我们需要关注以下两点；
  - 确定方法需要被缓存以及他们的缓存策略
  - 从缓存中读取之前缓存存储的数据

## 重要概念和缓存注解

| Cache          | 缓存接口，定义缓存操作。实现有：RedisCache、EhCacheCache、ConcurrentMapCache等 |
| -------------- | ------------------------------------------------------------ |
| CacheManager   | 缓存管理器，管理各种缓存（Cache）组件                        |
| @Cacheable     | 主要针对方法配置，能够根据方法的请求参数对其结果进行缓存     |
| @CacheEvict    | 清空缓存                                                     |
| @CachePut      | 保证方法被调用，又希望结果被缓存                             |
| @EnableCaching | 开启基于注解的缓存                                           |
| keyGenerator   | 缓存数据时key生成策略                                        |
| serialize      | 缓存数据时value序列化策略                                    |

**简要说明：**

- @Cacheable注解加载方法中，那么该方法第一次会查询数据库，然后就会吧数据放在缓存中，使用Cache 进行数据的读取等操作。
- @CacheEvict删除缓存，例如根据id删除用户，那么也要删除缓存中的用户信息
- @CachePut更新缓存，例如更新用户信息后，同时也要更新缓存中的用户信息