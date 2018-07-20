###AOP统一处理请求日志
AOP是一种编程范式，与编程语言无关，是一种程序设计思想。AOP:面向切面编程，OOP：面向对象编程，POP:面向过程编程，还有函数式编程等等。
###AOP实例-记录每一个HTTP请求
####1.添加依赖

	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-aop</artifactId>
	</dependency>
####2.编写切面，切入点类

	import org.aspectj.lang.JoinPoint;
	import org.aspectj.lang.annotation.After;
	import org.aspectj.lang.annotation.Aspect;
	import org.aspectj.lang.annotation.Before;
	import org.aspectj.lang.annotation.Pointcut;
	import org.slf4j.Logger;
	import org.slf4j.LoggerFactory;
	import org.springframework.stereotype.Component;
	import org.springframework.web.context.request.RequestContextHolder;
	import org.springframework.web.context.request.ServletRequestAttributes;
	
	import javax.servlet.http.HttpServletRequest;
	
	@Aspect
	@Component
	public class HttpAspect {
	    //使用log打印日志
	    private final static Logger logger = LoggerFactory.getLogger(HttpAspect.class);
	
	    @Pointcut("execution(public * com.study.springbootdemo.controller.UserController.*(..))")
	    public void log(){}
	
	    @Before("log()")
	    public void doBefore(JoinPoint joinPoint){
	        //记录Http请求
	        ServletRequestAttributes attributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
	        HttpServletRequest request = attributes.getRequest();
	        //记录URL
	        logger.info("url={}",request.getRequestURL());
	        //记录请求方法
	        logger.info("method={}",request.getMethod());
	        //记录请求ip
	        logger.info("ip={}",request.getRemoteAddr());
	        //记录请求类的类方法
	        logger.info("class_method={}",joinPoint.getSignature().getDeclaringTypeName()+"."+joinPoint.getSignature().getName());
	        //记录参数
	        logger.info("args={}",joinPoint.getArgs());
	    }
	
	    @After("log()")
	    public void doAfter(){
	        logger.info("2222222222222222");
	    }
	}
说明：
1.  @Pointcut("execution(public * com.study.springbootdemo.controller.UserController.*(..))")是一个切入点，表示UserController类中的所有方法。
2.  @Aspect注解表示这是一个该类是一个切面类
3.  @Component注解表示将该类交于Spring来管理，
4.  @Before("log()")注解表示UserController类中的方法被访问前执行的方法
5.  @After("log()")注解表示UserController类中的方法被访问后要执行的方法

####3.启动程序，使用postman进行测试
#####3.1测试查询用户列表
![](https://i.imgur.com/MLszY3E.png)
#####测试结果为：
![](https://i.imgur.com/vrv1Kwd.png)
#####3.2测试添加一个用户
![](https://i.imgur.com/2MM3FWC.png)
#####测试结果为：
![](https://i.imgur.com/1dlGwz9.png)

