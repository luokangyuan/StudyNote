## 整合redis实现缓存

Redis 是一个开源（BSD许可）的，内存中的数据结构存储系统，它可以用作数据库、缓存和消息中间件。 

- 在虚拟机中安装使用docker,使用SmarTTY-2.2客户端连接虚拟机
- 安装redis使用的docker国内镜像
- 引入redis的starter

### pom.xml文件

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### application.properties文件

```properties
spring.redis.host=118.24.44.169  # 配置Linux的主机地址
```

### 测试Redis

```java
@Autowired
StringRedisTemplate stringRedisTemplate; //操作k-v都是字符串的

@Autowired
RedisTemplate redisTemplate; //k-v都是对象的

/**
* Redis常见的五大基本数据类型
* String（字符串），list（列表），set（集合），Hash（散列），ZSet（有序集合）
* stringRedisTemplate.opsForValue()操作字符串的
* stringRedisTemplate.opsForList()操作列表
* stringRedisTemplate.opsForSet()操作集合
* stringRedisTemplate.opsForHash()操作散列
*stringRedisTemplate.opsForZSet()操作有序集合
*/
@Test
public void test01(){
    stringRedisTemplate.opsForValue().append("msg","hello");//给redis中key为msg追加一个hello字符串
}

/**
* 测试保存对象
*/
@Test
public void test01(){
    Employee emp = employeeMapper.getEmpById(1);
    //默认保存对象，使用的是jdk序列化机制，序列化后的数据保存到redis中
    redisTemplate.opsForValue().set("emp-01",emp);
}
```

**在上述中保存对象到redis中使用的是jdk的序列化机制，如果我们需要将employee对象以JSON的方式保存到redis中，可以使用将对象转为JSON,也可以改变默认的序列化规则，如下**

**序列化配置类**

```java
@Configuration
public class MyRedisTemplate {

    @Bean
    public RedisTemplate<Object,Employee> empRedisTemplate(
            RedisConnectionFactory redisConnectionFactory)throws UnknownHostException{
        RedisTemplate<Object,Employee> template = new RedisTemplate<Object,Employee>();
        template.setConnectionFactory(redisConnectionFactory);
        Jackson2JsonRedisSerializer<Employee> ser = new Jackson2JsonRedisSerializer<Employee>(Employee.class);
        return template;
    }
}
```

**测试**

```java
@Autowired
RedisTemplate<Object,Employee> empRedisTemplate;

@Test
public void test03(){
    Employee emp = employeeMapper.getEmpById(1);
    //保存对象，使用的是Json序列化机制，序列化后的数据保存到redis中
    empRedisTemplate.opsForValue().set("emp-01",emp);
}
```

### 测试Redis缓存

当我们引入redis的starter后，容器中保存的是RedisCacheManager，RedisCacheManager会创建一个RedisCache来作为缓存组件，RedisCache就是操作redis来缓存数据，这个时候执行上述的缓存测试就以默认的序列化保存到redis中。如何让保存的数据是json格式，就需要自定义CacheManager