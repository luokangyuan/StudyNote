###认识Trigger
Quartz中的触发器是用来告诉调度程序作业什么时候触发，即Trigger对象是用来触发执行Job的。
###触发器的通用属性
JobKey：表示job实例的标识，触发器被触发时，该指定的job实例会执行。
StartTime：表示触发器的时间表首次触发的时间，值为util.Date。
EndTime：指定触发器的不再被触发的时间，值为util.Date。
实例如下
HelloScheduler类中的startAt(date)和endAt(endDate)

	public class HelloScheduler {
		public static void main(String[] args) throws SchedulerException {
			//打印当前时间
			Date date = new Date();
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("当前时间为："+sf.format(date));
			// 创建一个JobDetail实例，将实例与HelloJob绑定
			JobDetail jobDetail = JobBuilder.newJob(HelloJob.class)
					.withIdentity("myJob", "ground1")
					.build();
			//获取距离当前时间3秒后的时间
			date.setTime(date.getTime()+3000);
			//获取距离当前时间6秒后的时间
			Date endDate = new Date();
			endDate.setTime(endDate.getTime()+6000);
			// 创建一个Trigger实例，定义该Job立即执行，并且每隔两秒钟重复执行一次
			Trigger trigger = TriggerBuilder
					.newTrigger()
					.withIdentity("myTrigger", "group1")
					.startAt(date)//开始执行时间为当前时间的后3秒
					.endAt(endDate)//停止执行的时间为当前时间的后6秒
					.withSchedule(
							SimpleScheduleBuilder.simpleSchedule()
									.withIntervalInSeconds(2).repeatForever())
					.build();
			//创建Schedule实例
			SchedulerFactory sFactory = new StdSchedulerFactory();
			Scheduler scheduler = sFactory.getScheduler();
			scheduler.start();
			scheduler.scheduleJob(jobDetail,trigger);
		}
	
	}
HelloJob中获取了开始执行时间和结束执行时间。

	public class HelloJob implements Job{
	
		@Override
		public void execute(JobExecutionContext context) throws JobExecutionException {
			//打印当前的执行时间
			Date date = new Date();
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("当前时间为："+sf.format(date));
			Trigger currentTrigger = context.getTrigger();
			System.out.println("开始时间为："+currentTrigger.getStartTime());
			System.out.println("结束时间为："+currentTrigger.getEndTime());
			JobKey  jobKey = currentTrigger.getJobKey();
			System.out.println("jobKeyName:"+jobKey.getName()+"jobGroup:"+jobKey.getGroup());
			
		}
	
	}
###认识SimpleTrigger
在一个指定时间段内执行一次作业任务，或是在指定的时间间隔内多次执行作业任务。
实例一：距离当前时间4秒后执行且执行一次

	public class HelloJob implements Job{
	
		@Override
		public void execute(JobExecutionContext context) throws JobExecutionException {
			//打印当前的执行时间
			Date date = new Date();
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("当前时间为："+sf.format(date));
			System.out.println("Hello world");
		}
	
	}
HelloScheduler类中代码如下

	public class HelloScheduler {
		public static void main(String[] args) throws SchedulerException {
			//打印当前时间
			Date date = new Date();
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("当前时间为："+sf.format(date));
			// 创建一个JobDetail实例，将实例与HelloJob绑定
			JobDetail jobDetail = JobBuilder.newJob(HelloJob.class)
					.withIdentity("myJob", "ground1")
					.build();
			
			//距离当前时间4秒后执行且执行一次
			date.setTime(date.getTime()+4000);
			SimpleTrigger trigger = (SimpleTrigger)TriggerBuilder
					.newTrigger()
					.withIdentity("myTrigger", "group1")
					.startAt(date)
					.build();
			//创建Schedule实例
			SchedulerFactory sFactory = new StdSchedulerFactory();
			Scheduler scheduler = sFactory.getScheduler();
			scheduler.start();
			scheduler.scheduleJob(jobDetail,trigger);
		}
	
	}
实例二：距距离当前时间4秒后首次执行任务之后每隔两秒重复执行一次，在第一次执行再连续执行三次

	public class HelloScheduler {
		public static void main(String[] args) throws SchedulerException {
			//打印当前时间
			Date date = new Date();
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("当前时间为：" + sf.format(date));
			// 创建一个JobDetail实例，将实例与HelloJob绑定
			JobDetail jobDetail = JobBuilder.newJob(HelloJob.class)
					.withIdentity("myJob", "ground1").build();
	
			// 距距离当前时间4秒后首次执行任务之后每隔两秒重复执行一次，在第一次执行再连续执行三次
			date.setTime(date.getTime() + 4000);
			SimpleTrigger trigger = (SimpleTrigger) TriggerBuilder
					.newTrigger()
					.withIdentity("myTrigger", "group1")
					.startAt(date)
					.withSchedule(
							SimpleScheduleBuilder
									.simpleSchedule()
									.withIntervalInSeconds(2)
									.withRepeatCount(3))
					.build();
			// 创建Schedule实例
			SchedulerFactory sFactory = new StdSchedulerFactory();
			Scheduler scheduler = sFactory.getScheduler();
			scheduler.start();
			scheduler.scheduleJob(jobDetail, trigger);
		}
	
	}
实例三：距离当前时间4秒后首次执行，距离当前时间后6秒停止执行

	public class HelloScheduler {
		public static void main(String[] args) throws SchedulerException {
			//打印当前时间
			Date date = new Date();
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("当前时间为：" + sf.format(date));
			// 创建一个JobDetail实例，将实例与HelloJob绑定
			JobDetail jobDetail = JobBuilder.newJob(HelloJob.class)
					.withIdentity("myJob", "ground1").build();
	
			// 距离当前时间4秒后首次执行，距离当前时间后6秒停止执行
			date.setTime(date.getTime() + 4000);
			Date endDate = new Date();
			endDate.setTime(endDate.getTime()+6000);
			SimpleTrigger trigger = (SimpleTrigger) TriggerBuilder
					.newTrigger()
					.withIdentity("myTrigger", "group1")
					.startAt(date)
					.endAt(endDate)
					.withSchedule(
							SimpleScheduleBuilder
									.simpleSchedule()
									.withIntervalInSeconds(2)
									.withRepeatCount(3))
					.build();
			// 创建Schedule实例
			SchedulerFactory sFactory = new StdSchedulerFactory();
			Scheduler scheduler = sFactory.getScheduler();
			scheduler.start();
			scheduler.scheduleJob(jobDetail, trigger);
		}
	
	}
####注意
重复次数withRepeatCount：可以是0，正整数或是SimpleTrigger.REPEAT_INDEFINITELY常量值
重复执行间隔withIntervalInSeconds：必须为0或者长整数
指定了endAt参数，就会覆盖重复执行的效果
###认识CronTrigger
基于日历的作业调度器，而不是像SimpleTrigger那样精确的指定时间间隔，比SimpleTrigger更常用。
####Cron表达式
用于配置CronTrigger实例，是由7个子表达式组成的字符串，描述了时间表的详细信息，格式为：
 [秒] [分] [小时] [日] [月] [周] [年]
实例一：使用CronTrigger 每秒钟触发一次任务

	public class HelloScheduler {
		public static void main(String[] args) throws SchedulerException {
			//打印当前时间
			Date date = new Date();
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("当前时间为：" + sf.format(date));
			// 创建一个JobDetail实例，将实例与HelloJob绑定
			JobDetail jobDetail = JobBuilder.newJob(HelloJob.class)
					.withIdentity("myJob").build();
			// 每秒执行一次任务
			CronTrigger trigger = (CronTrigger) TriggerBuilder
					.newTrigger()
					.withIdentity("myTrigger", "group1")
					.withSchedule(
							CronScheduleBuilder.cronSchedule("* * * * * ? *"))
					.build();
			// 创建Schedule实例
			SchedulerFactory sFactory = new StdSchedulerFactory();
			Scheduler scheduler = sFactory.getScheduler();
			scheduler.start();
			scheduler.scheduleJob(jobDetail, trigger);
		}
	
	}
注意，表达式中的空格和英文状态
####Cron表达式特殊字符意义对应表
![](https://i.imgur.com/FQlxFOc.png)
####Cron表达式举例
![](https://i.imgur.com/W1oTyxC.png)
实例：
#####2017年内的每天10点15分触发一次
0 15 10 ？ * * 2017
#####每天的14点整至14点59分55秒，以及18点整至18点59分55秒，每5秒钟触发一次
0/5 * 14,18 * * ?
####通配符说明
![](https://i.imgur.com/zHJFs5I.png)
####Cron表达式
- L和W可以一起使用，例如LW表示每个月的最后一个工作日
- 周字段英文字母不区分大小写
- 利用工具，在线生成百度搜索Crona表达式在线生成器

###Scheduler-工厂模式
所有的Schedule实例应该有SchedulerFactory来创建，Quartz的三个核心概念是调度器，任务和触发器
关系如下：
![](https://i.imgur.com/F3W4wat.jpg)
####Scheduler创建方式

	SchedulerFactory sFactory = new StdSchedulerFactory();
	Scheduler scheduler = sFactory.getScheduler();
	
	DirectSchedulerFactory factory = DirectSchedulerFactory.getInstance();
	Scheduler scheduler2 = factory.getScheduler();
####StdSchedulerFactory


1. 使用一组参数（Java.util.Properties）来创建和初始化Quartz调度器。
2. 配置参数一般存储在quartz.properties中。
3. 调用getScheduler方法就能创建和初始化调度器对象。

未完，待续