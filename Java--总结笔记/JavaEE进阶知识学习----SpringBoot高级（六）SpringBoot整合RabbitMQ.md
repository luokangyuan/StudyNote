## SpringBoot整合RabbitMQ

- 引入spring-boot-starter-amqp
- application.yml配置
- 测试RabbitMQ
  - AmqpAdmin：管理组件
  - RabbitTemplate：消息发送处理组件

整合前提是在Linux虚拟主机中的docker中安装rabbitmq镜像，并启动镜像。

- 新建项目，加入RabbitMQ依赖，SpringBoot的自动配置RabbitAutoConfiguration，有自动配置连接工厂ConnectionFactory，在RabbitProperties中封装了RabbitMQ的配置
- 在Application.properties文件中配置RabbitMQ

```properties
spring.rabbitmq.host=118.24.44.169  #配置虚拟主机的地址
spring.rabbitmq.username=guest
spring.activemq.password=guest
```

- RabbitTemplate给RabbitMQ发送和接收消息
- AmqpAdmin,是RabbitMQ中系统管理功能组件

### 测试使用RabbitTemplate发送消息

```java
@Autowired
private RabbitTemplate rabbitTemplate;

/**
 * 单播模式发送消息
 */
@Test
public void contextLoads() {
    //message需要自己构造一个，定义消息体内容和消息头
    //rabbitTemplate.send(exchange,routeKey,message);

    //只需要传入要发送的对象，自动序列化发送给RabbitMQ
    //rabbitTemplate.convertAndSend(exchange,routeKey,object);
    Map<String,Object> map = new HashMap<>();
    map.put("msg","这是第一个消息");
    map.put("data", Arrays.asList("hello",123,true));
    //对象默认序列化以后被发送出去
    rabbitTemplate.convertAndSend("exchange.direct","luo.news",map);
}

/**
 * 接收数据,如何将数据转为JSON数据格式
 */
@Test
public void receive(){
    Object o = rabbitTemplate.receiveAndConvert("luo.news");
    System.out.println(o.getClass());
    System.out.println(o);
}
```

### 如何将数据转为JSON数据格式

**定义MyAMQConfig配置类**

```java
@Configuration
public class MyAMQConfig {

    @Bean
    public MessageConverter messageConverter(){
        return new Jackson2JsonMessageConverter();
    }
}
```

## RabbitMQ中的监听

### service层中的代码如下

```java
@Service
public class BookService {
    /**
     * 注解的作用就是监听luo.new消息队列，一旦这个队列中有消息就会调用这个方法
     * @param book
     */
    @RabbitListener(queues = "luo.new")
    public void receive(Book book){
        System.out.println("收到消息，消息是；"+book);
    }
}
```

### 主配置类添加开启注解的RabbitMQ模式

```java
@EnableRabbit
@SpringBootApplication
public class SpringbootRabbitmqApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootRabbitmqApplication.class, args);
	}
}
```

## AmqpAdmin的使用

使用AmqpAdmin创建和删除Queue和Exchange等

### 测试如下

```java
@Autowired
private AmqpAdmin amqpAdmin;

@Test
public void createExchange(){
    amqpAdmin.declareExchange(new DirectExchange("amqpadmin.exchange"));
    System.out.println("创建完成");

    amqpAdmin.declareQueue(new Queue("amqpadmin.queue",true));
    //创建绑定规则
    amqpAdmin.declareBinding(new Binding("amqpadmin.queue",Binding.DestinationType.QUEUE,"amqpadmin.exchange","amqp.test",null));
}
```