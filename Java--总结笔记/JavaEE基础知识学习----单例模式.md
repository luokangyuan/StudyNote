## 为什么存在单例模式
有些对象我们只需要一个，比如线程池，缓存，对话框，处理偏好设置和注册表的对象，或者日志对象 ，实质上，这些对象只能有一个实例，如果存在多个实例，就会导致许多问题，例如，程序的行为异常，资源使用过度等，因为这样，所以就出现了单例模式。
## 单例模式实现

```java
public class Singleton {
	private static Singleton uniqueInstance;//利用一个静态变量来记录Singleton类的唯一实例
	
	private Singleton (){}// 将构造器声明为私有的，只有singleton内部可以调用构造器
	
	// 使用getInstance来创建实例，其中uniqueInstance是一个静态变量，为空表示没有创建实例，不为空则直接返回该实例
	public static Singleton getInstance(){
		if(uniqueInstance == null){
			uniqueInstance = new Singleton();
		}
		return uniqueInstance;
	}
}
```
在《Head First》书中有这样一个场景，就是两个线程都要执行单例模式中的代码，就会创建两个实例对象，如下图
![](https://i.imgur.com/BzLrcFr.png)
### 处理多线程
#### 使用synchronized关键字，将getInstance方法改为同步方法。

```java
public class Singleton {
	private static Singleton uniqueInstance;//利用一个静态变量来记录Singleton类的唯一实例
	
	private Singleton (){}// 将构造器声明为私有的，只有singleton内部可以调用构造器
	
	// 使用getInstance来创建实例，其中uniqueInstance是一个静态变量，为空表示没有创建实例，不为空则直接返回该实例
	public static synchronized Singleton getInstance(){
		if(uniqueInstance == null){
			uniqueInstance = new Singleton();
		}
		return uniqueInstance;
	}
}
```
#### 直接初始化静态变量，这样也可以保证线程安全

```java
public class Singleton {
	//利用静态变量来记录Singleton的唯一实例
	//直接初始化静态变量，这样就可以确保线程的安全
	private static Singleton uniqueInstance = new Singleton();
	
	private Singleton (){}// 将构造器声明为私有的，只有singleton内部可以调用构造器
```

```java
	public static  Singleton getInstance(){
		
		return uniqueInstance;
	}
}
```
#### 使用“双重检查加锁”的方式，在getInstance()中减少使用同步

```java
public class Singleton {
	/**
	 * 利用静态变量来记录Singleton的唯一实例
	 * volatile关键词确保：当uniqueInstance变量被初始化成Singleton实例时，
	 * 多个线程正确的处理uniqueInstance变量
	 */
	private volatile static Singleton uniqueInstance;
	/**
	 * 构造器私有化，只有Singleton内部才可以调用构造器
	 */
	private Singleton(){}
	/**
	 * 检查实例，不存在就进入同步区域，这样一来，就只会在第一次同步
	 * 
	 */
	public static Singleton getInstance(){
		if(uniqueInstance == null){
			synchronized (Singleton.class) {
				if(uniqueInstance == null){
					uniqueInstance = new Singleton();
				}
			}
		}
		return uniqueInstance;
	}
}
```
## 单例模式的优缺点
1. 节约了系统资源，由于系统中只存在一个实例对象，对于一些需要频繁创建和销毁对象的系统而言，单例模式就节约了系统资源和提高了系统的性能。
2. 因为单例封装了它的唯一实例，所以它可以严格控制客户 怎样以及何时访问它。
3. 由于单例模式没有抽象层，因此单例类的扩展就有很大的困难。
4. 单例类的职责过重，在一定程度上违背了“单一职责原则”。

## 单例模式使用场景
1. 系统只需要一个实例对象，如系统要求提供一个唯一的序列号生成器，或者需要考虑资源消耗太大而允许创建一个对象。
2. 客户调用类的单个实例只允许使用一个公共访问点，除了该公共访问点，不能通过其他途径访问该实例。

## 小结
1. 单例模式确认程序一个类只有一个实例。
2. 单例模式中的构造器是私有的，而且它必须要提供实例的全局访问点。
3. 单例模式可能会因为多线程的问题存在安全隐患。