# SpringBoot中的日志框架学习

日志框架中我们选择的是SLF4J日志门面。日志实现选择的是Logback。调用日志记录的方法，不应该直接调用实现类，而是调用日志抽象层里面的方法。

## 1.使用slf4j的方法

给系统导入slf4j包和日志实现Logback包，如果要使用log4j,就导入slf4j和slf4j-log4、log4j包

~~~java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloWorld {
  public static void main(String[] args) {
    Logger logger = LoggerFactory.getLogger(HelloWorld.class);
    logger.info("Hello World");
  }
}
~~~

![img](https://www.slf4j.org/images/concrete-bindings.png)

每一个日志的实现框架都有自己的配置文件，使用slf4j以后，配置文件还是写日志实现框架的配置文件。

## 2.统一日志记录

### 统一日志框架官方图示

![img](https://www.slf4j.org/images/legacy.png)

### 统一日志框架方法总结

1、将系统中的其他日志框架先排除出去。

2、用中间包来替换原有的日志框架。

3、我们导入slf4j其他的实现

## 3.SpringBoot中的日志关系

~~~xml
 <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter</artifactId>
      <version>2.0.0.RELEASE</version>
      <scope>compile</scope>
    </dependency>
~~~

SpringBoot使用下面的日志

~~~xml
 <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-logging</artifactId>
      <version>2.0.0.RELEASE</version>
      <scope>compile</scope>
    </dependency>
~~~

SpringBoot日志依赖图示

![](图片素材/6.png)

SpringBoot底层使用slf4j+logback的方式进行日志记录。同时将其他日志框架也装换为slf4框架。

如果我们使用其他框架，就先把这个框架的默认日志框架给排除，例如我们使用Spring，就先排除Spring默认的commons-logging日志框架。

## 4.SpringBoot中使用slf4j

SpringBoot默认配置了日志框架，我们直接就可以使用，如下

~~~java
@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringBootConfigApplicationTests {

	//日志记录器
	Logger logger = LoggerFactory.getLogger(getClass());

	@Test
	public void contextLoads() {
		//日志级别，由低到高，可以调整输入的日志级别，日志就只会在这个级别和更高的级别生效
		logger.trace("这是trace日志");
		logger.debug("这是debug日志");
		//SpringBoot默认使用的是info级别的，即trace和debug不会被打印输出
		logger.info("这是自定义的info日志");
		logger.warn("这是警告日志");
		logger.error("这是错误日志");
	}

}
~~~

修改日志级别的方法，添加配置文件

~~~yaml
logging:
  level: debug
~~~

指定日志文件输出位置

| logging.file | logging.path | Example  | Desciption            |
| ------------ | ------------ | -------- | --------------------- |
| (none)       | (none)       |          | 只在控制台输出               |
| 指定文件名        | (none)       | my.log   | 输出日志到my.log文件         |
| (none)       | 指定目录         | /var/log | 输出到指定目录的spring.log文件中 |

logging.file不指定路径在当前项目下生成springboot.log文件，也可以指定路径D:/springboot.log

logging.path指定为/spring/log就会在当前磁盘的根路径下创建一个spring文件夹和log文件夹，使用spring.log为日志文件。

## 5.使用自己的配置文件

如果使用logback配置文件，就吧logback.xml放在项目resources目录下即可，

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
scan：当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值为true。
scanPeriod：设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒当scan为true时，此属性生效。默认的时间间隔为1分钟。
debug：当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false。
-->
<configuration scan="false" scanPeriod="60 seconds" debug="false">
    <!-- 定义日志的根目录 -->
    <property name="LOG_HOME" value="/app/log" />
    <!-- 定义日志文件名称 -->
    <property name="appName" value="atguigu-springboot"></property>
    <!-- ch.qos.logback.core.ConsoleAppender 表示控制台输出 -->
    <appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
        <!--
        日志输出格式：
			%d表示日期时间，
			%thread表示线程名，
			%-5level：级别从左显示5个字符宽度
			%logger{50} 表示logger名字最长50个字符，否则按照句点分割。 
			%msg：日志消息，
			%n是换行符
        -->
        <layout class="ch.qos.logback.classic.PatternLayout">
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </layout>
    </appender>

    <!-- 滚动记录文件，先将日志记录到指定文件，当符合某个条件时，将日志记录到其他文件 -->  
    <appender name="appLogAppender" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 指定日志文件的名称 -->
        <file>${LOG_HOME}/${appName}.log</file>
        <!--
        当发生滚动时，决定 RollingFileAppender 的行为，涉及文件移动和重命名
        TimeBasedRollingPolicy： 最常用的滚动策略，它根据时间来制定滚动策略，既负责滚动也负责出发滚动。
        -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--
            滚动时产生的文件的存放位置及文件名称 %d{yyyy-MM-dd}：按天进行日志滚动 
            %i：当文件大小超过maxFileSize时，按照i进行文件滚动
            -->
            <fileNamePattern>${LOG_HOME}/${appName}-%d{yyyy-MM-dd}-%i.log</fileNamePattern>
            <!-- 
            可选节点，控制保留的归档文件的最大数量，超出数量就删除旧文件。假设设置每天滚动，
            且maxHistory是365，则只保存最近365天的文件，删除之前的旧文件。注意，删除旧文件是，
            那些为了归档而创建的目录也会被删除。
            -->
            <MaxHistory>365</MaxHistory>
            <!-- 
            当日志文件超过maxFileSize指定的大小是，根据上面提到的%i进行日志文件滚动 注意此处配置SizeBasedTriggeringPolicy是无法实现按文件大小进行滚动的，必须配置timeBasedFileNamingAndTriggeringPolicy
            -->
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
        <!-- 日志输出格式： -->     
        <layout class="ch.qos.logback.classic.PatternLayout">
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [ %thread ] - [ %-5level ] [ %logger{50} : %line ] - %msg%n</pattern>
        </layout>
    </appender>

    <!-- 
		logger主要用于存放日志对象，也可以定义日志类型、级别
		name：表示匹配的logger类型前缀，也就是包的前半部分
		level：要记录的日志级别，包括 TRACE < DEBUG < INFO < WARN < ERROR
		additivity：作用在于children-logger是否使用 rootLogger配置的appender进行输出，
		false：表示只用当前logger的appender-ref，true：
		表示当前logger的appender-ref和rootLogger的appender-ref都有效
    -->
    <!-- hibernate logger -->
    <logger name="com.atguigu" level="debug" />
    <!-- Spring framework logger -->
    <logger name="org.springframework" level="debug" additivity="false"></logger>



    <!-- 
    root与logger是父子关系，没有特别定义则默认为root，任何一个类只会和一个logger对应，
    要么是定义的logger，要么是root，判断的关键在于找到这个logger，然后判断这个logger的appender和level。 
    -->
    <root level="info">
        <appender-ref ref="stdout" />
        <appender-ref ref="appLogAppender" />
    </root>
</configuration> 
~~~

如果将logback.xml更改为logback-spring.xml就是有SpringBoot解析日志配置，就可以使用SpringBoot的Profile功能，指定在某种开发环境下才生效。

~~~xml
<layout class="ch.qos.logback.classic.PatternLayout">
            <springProfile name="dev">
                <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} ----> [%thread] ---> %-5level %logger{50} - %msg%n</pattern>
            </springProfile>
            <springProfile name="!dev">
                <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} ==== [%thread] ==== %-5level %logger{50} - %msg%n</pattern>
            </springProfile>
        </layout>
~~~

