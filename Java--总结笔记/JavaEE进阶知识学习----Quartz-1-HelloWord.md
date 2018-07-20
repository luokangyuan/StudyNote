###概要
Quartz是一款强大的开源任务调度框架。主要用到了Builder模式，factory模式，组件模式和链式写法。包括了三个核心概念，分别是调度器，任务和触发器。
###重要组成部分
Job：实现任务逻辑的任务接口。
JobDetail：JobDetail为Job实例提供了许多设置属性，以及JobDataMap成员变量属性，它用来存储特定Job实例的状态信息，调度器需要借助JobDetail对象来添加Job实例。重要的属性如下：name、group、jobClass、jobDataMap。

	JobDetail jobDetail = JobBuilder.newJob(HelloJob.class)
					.withIdentity("myJob", "ground1").build();
	System.out.println("jobDetail name:"+jobDetail.getKey().getName());// myJob
	System.out.println("jobDetail group:"+jobDetail.getKey().getGroup());//  ground1
	System.out.println("jobDetail jobClass:"+jobDetail.getJobClass().getName());// com.study.quartz.HelloJob
JobBuilder
JobStore
Trigger
TriggerBuilder
ThreadPool
Scheduler
calendar：一个Trigger可以和多个Calendar关联，以排除或包含某些时间点。
监听器：JobListener,TriggerListener,ScheduerListener
###Quartz的Hello Word
####1.创建一个maven工程，并引入Quartz的相关jar

	<dependency>
	    <groupId>org.quartz-scheduler</groupId>
	    <artifactId>quartz</artifactId>
	    <version>2.3.0</version>
	</dependency>
####2.创建一个job类

	import java.text.SimpleDateFormat;
	import java.util.Date;
	
	import org.quartz.Job;
	import org.quartz.JobExecutionContext;
	import org.quartz.JobExecutionException;
	
	public class HelloJob implements Job{
	
		@Override
		public void execute(JobExecutionContext arg0) throws JobExecutionException {
			//打印当前的执行时间
			Date date = new Date();
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("当前时间为："+sf.format(date));
			//编写具体的业务逻辑
			System.out.println("Hello World");
		}
	
	}
####3.创建一个Scheduler类

	import java.text.SimpleDateFormat;
	import java.util.Date;
	
	import org.quartz.JobBuilder;
	import org.quartz.JobDetail;
	import org.quartz.Scheduler;
	import org.quartz.SchedulerException;
	import org.quartz.SchedulerFactory;
	import org.quartz.SimpleScheduleBuilder;
	import org.quartz.Trigger;
	import org.quartz.TriggerBuilder;
	import org.quartz.impl.StdSchedulerFactory;
	
	public class HelloScheduler {
		public static void main(String[] args) throws SchedulerException {
			// 创建一个JobDetail实例，将实例与HelloJob绑定
			JobDetail jobDetail = JobBuilder.newJob(HelloJob.class)
					.withIdentity("myJob", "ground1").build();
			// 创建一个Trigger实例，定义该Job立即执行，并且每隔两秒钟重复执行一次
			Trigger trigger = TriggerBuilder
					.newTrigger()
					.withIdentity("myTrigger", "group1")
					.startNow()
					.withSchedule(
							SimpleScheduleBuilder.simpleSchedule()
									.withIntervalInSeconds(2).repeatForever())
					.build();
			//创建Schedule实例
			SchedulerFactory sFactory = new StdSchedulerFactory();
			Scheduler scheduler = sFactory.getScheduler();
			scheduler.start();
			//打印当前时间
			Date date = new Date();
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("当前时间为："+sf.format(date));
			scheduler.scheduleJob(jobDetail,trigger);
		}
	
	}
###Job中的JobExecutionContext


- 当Scheduler调用一个job，就会将JobExecutionContext传递给Job的execute方法。
- Job可以通过JobExecutionContext对象访问到Quartz运行时候的环境以及Job本身的明细数据。


###JobDataMap


- 在进行任务调度时JobDataMap存储在JobExecutionContext中，方便获取。
- JobDataMap可以用来装载任何可序列化的数据对象，当job实例对象被执行时这些参数对象就会传递给他。
- JobDataMap实现了JDK的Map接口，并且添加了一些方便的方法用来存取基本的数据类型。

####JobDataMap的获取方式
我们修改了HelloScheduler类，并传入了一些我们自定义的参数和值，如何在job中获取这些值，就使用到了JobDataMap对象。

	public class HelloScheduler {
		public static void main(String[] args) throws SchedulerException {
			// 创建一个JobDetail实例，将实例与HelloJob绑定
			JobDetail jobDetail = JobBuilder.newJob(HelloJob.class)
					.withIdentity("myJob", "ground1")
					.usingJobData("message", "Hello job")
					.usingJobData("doubleJobValue", 66.6).build();
			
			// 创建一个Trigger实例，定义该Job立即执行，并且每隔两秒钟重复执行一次
			Trigger trigger = TriggerBuilder
					.newTrigger()
					.withIdentity("myTrigger", "group1")
					.usingJobData("message", "Hello trigger")
					.usingJobData("doubleTrigglerValue", 88.8)
					.startNow()
					.withSchedule(
							SimpleScheduleBuilder.simpleSchedule()
									.withIntervalInSeconds(2).repeatForever())
					.build();
			//创建Schedule实例
			SchedulerFactory sFactory = new StdSchedulerFactory();
			Scheduler scheduler = sFactory.getScheduler();
			scheduler.start();
			//打印当前时间
			Date date = new Date();
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("当前时间为："+sf.format(date));
			scheduler.scheduleJob(jobDetail,trigger);
		}
	
	}
Job类中JobDataMap的获取方式如下，包含了如何获取trigger中的自定义的参数值。

	public class HelloJob implements Job{
	
		@Override
		public void execute(JobExecutionContext context) throws JobExecutionException {
			//打印当前的执行时间
			Date date = new Date();
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("当前时间为："+sf.format(date));
			//编写具体的业务逻辑
			JobKey key = context.getJobDetail().getKey();
			System.out.println("Job的name属性值和group属性值分别为："+key.getName()+":"+key.getGroup());
			TriggerKey trKey = context.getTrigger().getKey();
			System.out.println("Trigger的name属性值和group属性值分别为："+trKey.getName()+":"+trKey.getGroup());
			JobDataMap dataMap = context.getJobDetail().getJobDataMap();
			JobDataMap tDataMap = context.getTrigger().getJobDataMap();
			
			String jobMsg = dataMap.getString("message");
			double doubleJobValue = dataMap.getDouble("doubleJobValue");
			String tiggerMsg = tDataMap.getString("message");
			double doubleTrigglerValue = tDataMap.getDouble("doubleTrigglerValue");
			System.out.println("jobMsg："+jobMsg);
			System.out.println("doubleJobValue："+doubleJobValue);
			System.out.println("tiggerMsg："+tiggerMsg);
			System.out.println("doubleTrigglerValue："+doubleTrigglerValue);
			
		}
	
	}
输出结果为：

	当前时间为：2018-01-22 17:03:29
	Job的name属性值和group属性值分别为：myJob:ground1
	Trigger的name属性值和group属性值分别为：myTrigger:group1
	jobMsg：Hello job
	doubleJobValue：66.6
	tiggerMsg：Hello trigger
	doubleTrigglerValue：88.8
####也可以使用成员变量的getter和setter获取
修改job类的代码如下

	public class HelloJob implements Job{
		private String message;
		private double doubleJobValue;
		private double doubleTrigglerValue;
		
		public String getMessage() {
			return message;
		}
	
		public void setMessage(String message) {
			this.message = message;
		}
	
		public double getDoubleJobValue() {
			return doubleJobValue;
		}
	
		public void setDoubleJobValue(double doubleJobValue) {
			this.doubleJobValue = doubleJobValue;
		}
	
		public double getDoubleTrigglerValue() {
			return doubleTrigglerValue;
		}
	
		public void setDoubleTrigglerValue(double doubleTrigglerValue) {
			this.doubleTrigglerValue = doubleTrigglerValue;
		}
	
		@Override
		public void execute(JobExecutionContext context) throws JobExecutionException {
			//打印当前的执行时间
			Date date = new Date();
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("当前时间为："+sf.format(date));
			//编写具体的业务逻辑
			JobKey key = context.getJobDetail().getKey();
			System.out.println("Job的name属性值和group属性值分别为："+key.getName()+":"+key.getGroup());
			TriggerKey trKey = context.getTrigger().getKey();
			System.out.println("Trigger的name属性值和group属性值分别为："+trKey.getName()+":"+trKey.getGroup());
			
			System.out.println("Msg："+message);
			System.out.println("doubleJobValue："+doubleJobValue);
			
			System.out.println("doubleTrigglerValue："+doubleTrigglerValue);
			
		}
	
	}
结果为

	Job的name属性值和group属性值分别为：myJob:ground1
	Trigger的name属性值和group属性值分别为：myTrigger:group1
	Msg：Hello trigger
	doubleJobValue：66.6
	doubleTrigglerValue：88.8
未完，待续




