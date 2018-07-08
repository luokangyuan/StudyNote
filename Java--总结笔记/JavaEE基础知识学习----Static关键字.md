## Static关键字
static静态的，可以用来修饰变量，修饰方法，代码块，静态内部类和静态导包。
static关键字表明一个成员变量或方法在没有所属类的实例的情况下被访问。
### 明确的是
Java内存分为，栈，堆，方法去和静态域。
栈：存放的是局部变量，对象的引用名，数组的引用名。
堆：主要存放一些对象，也就是new出来的“东西”。
方法区：也叫字符串常量池。
静态域：存放类中静态的变量。
先看如下代码：

```java
public class TestStatic {
	public static void main(String[] args) {
		Supperman s1 = new Supperman("奥特曼", 800);
		Supperman s2 = new Supperman("孙悟空", 1000);
		System.out.println(s1);
		System.out.println(s2);
	}
}
class Supperman{
	String name;
	int age;
	public Supperman(String name, int age) {
		super();
		this.name = name;
		this.age = age;
	}
	@Override
	public String toString() {
		return "man [name=" + name + ", age=" + age + "]";
	}
}
```
结果很简单：

```properties
Supperman [name=奥特曼, age=800]
Supperman [name=孙悟空, age=1000]
```
再看看这段代码的内存解析如下：
![](https://i.imgur.com/TZh9skQ.png)
综上所述：如果不是静态的，他就会在堆空间独立占有一块，你修改s1属性的值，不会影响到s2对应的值。
同样是上面的代码

```java
public class TestStatic {
	public static void main(String[] args) {
		Supperman s1 = new Supperman("奥特曼", 800);
		Supperman s2 = new Supperman("孙悟空", 1000);
		s1.sex = "男";
		System.out.println(s1);
		System.out.println(s2);
	}
}
class Supperman{
	String name;
	int age;
	String sex;
	public Supperman(String name, int age) {
		super();
		this.name = name;
		this.age = age;
	}
	@Override
	public String toString() {
		return "Supperman [name=" + name + ", age=" + age + ", sex=" + sex
				+ "]";
	}
}
```
结果：
	Supperman [name=奥特曼, age=800, sex=男]
	Supperman [name=孙悟空, age=1000, sex=null]
现在更可以看出，你改变一个对象的属性值，不会影响其他的对象，但是如果我们加上static呢？

```java
static String sex;
```
结果为：

```properties
Supperman [name=奥特曼, age=800, sex=男]
Supperman [name=孙悟空, age=1000, sex=男]
```
再看上述代码的内存解析图
![](https://i.imgur.com/QqGN2fs.png)
简单来讲就是：s1.name=""仅仅改变的是s1对象中name属性值，不会影响s2中的name的值，但是s1.sex=""改变的可是所有该类的实例对象的sex的属性值。
## static修饰属性（类变量）
当static修饰属性时，由类创建的所有对象都共用这一个属性。当其中一个对象对此属性修改时，会导致其他对象对此属性的一个调用，静态变量可以通过类.类变量的形式来调用。类变量随类的加载而加载的，而且只有一份，类变量的加载是早于对象的，类变量存在与静态域中。
例如所有的中国人都有一个国家名称，每一个中国人都共享这个国家名称，所以我们不必为中国人这个实例对象都单独分配一个代表国家名称的变量吧，这个时候就用到了static修饰变量。
## static修饰方法（类方法）
static修饰方法需要说明的是：
1.随之类的加载而加载，在内存中也只有一份。
2.可以直接通过类.类方法，普通的方法只能通过对象来调用。
3.内部可以调用静态的属性和静态方法，不能调用非静态的属性和方法，反之，非静态的方法却可以调用静态的属性和方法。
4.静态方法里不可以有this关键字和super关键字。
5.静态的结构，例如静态属性，静态方法，静态代码块，内部类等等的生命周期要早于非静态结构，被回收也要晚于非静态结构。

```java
public class TestStatic {
	public static void main(String[] args) {
		Supperman.run();
	}
}
class Supperman{
	String name;
	int age;
	static String sex;
	public static void run(){
		System.out.println("sex"+sex);
		System.out.println("超人飞走了！");
}
```
## 先说说属性赋值的方法
* 默认的初始化
* 显示的初始化或者使用代码块进行初始化
* 使用构造器
* 通过属性的setter方法进行修改

## 代码块
代码块的作用是用来初始化类的属性，根据是否有static关键字修饰分为静态代码块和非静态代码块
例如有如下类：

```java
class Order{
private int orderId;
private String orderName;
public Order() {
	super();
}
public Order(int orderId, String orderName) {
	super();
	this.orderId = orderId;
	this.orderName = orderName;
}
public int getOrderId() {
	return orderId;
}
public void setOrderId(int orderId) {
	this.orderId = orderId;
}
public String getOrderName() {
	return orderName;
}
public void setOrderName(String orderName) {
	this.orderName = orderName;
}
@Override
public String toString() {
	return "Order [orderId=" + orderId + ", orderName=" + orderName + "]";
}
```
测试代码如下：

```java
public static void main(String[] args) {
	Order o1 = new Order();
	System.out.println(o1);
}
```
结果为：
	Order [orderId=0, orderName=null]
下面就使用代码块来对属性赋值。
### 静态代码块
1.里面可以有输出语句。
2.随着类的加载而加载，而且只被加载一次。
3.多个静态代码块按照顺序一次执行
4.静态代码快的执行要早于非静态的
5.静态的代码块里只能执行静态的结构（静态属性，静态方法）

```java
static{
		System.out.println("我是静态代码块");
	}
```
### 非静态代码块
1.可以对类的属性（静态的或者非静态）进行初始化操作，同时也可以调用自身类中的方法（静态的或者非静态的）
2.里面也可以有输出语句
3.一个类也可以有多个非静态的代码块，彼此之间顺序执行，
4.每创建一个对象，非静态类就加载一次，这个和静态代码块不一样
5.非静态代码块的执行要在于构造器
在上述Order类中加入如下代码

```java
private int orderId = 1000;
private String orderName;
//初始化块
{
	orderId=1001;
	orderName="AA";
}
```
同样的测试语句，结果为：

```java
Order [orderId=1001, orderName=AA]
```
### 代码块总结
关于代码块的所有知识可以通过下面这个代码来解释：

```java
public class TestOrder {
	public static void main(String[] args) {
		Order o1 = new Order();
		System.out.println(o1);
		System.out.println("============我是帅气分隔符========");
		Order o2 = new Order();
		System.out.println(o2);
	}

}
class Order{
	private int orderId = 1000;
	private String orderName;
	//初始化块
	static{
		System.out.println("我是静态代码块");
	}
	{
		orderId=1001;
		orderName="AA";
		System.out.println("我是非静态代码块1");
	}
	{
		orderId=1002;
		orderName="BB";
		System.out.println("我是非静态代码块2");
	}
	public Order() {
		super();
	}
	public Order(int orderId, String orderName) {
		super();
		this.orderId = orderId;
		this.orderName = orderName;
	}
	public int getOrderId() {
		return orderId;
	}
	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}
	public String getOrderName() {
		return orderName;
	}
	public void setOrderName(String orderName) {
		this.orderName = orderName;
	}
	@Override
	public String toString() {
		return "Order [orderId=" + orderId + ", orderName=" + orderName + "]";
	}
}
```
执行结果为：

```properties
我是静态代码块
我是非静态代码块1
我是非静态代码块2
Order [orderId=1002, orderName=BB]
============我是帅气分隔符========
我是非静态代码块1
我是非静态代码块2
Order [orderId=1002, orderName=BB]
```
## static导包
如果我们要使用静态成员（方法和变量）我们就要用类.类方法（类变量）。如果使用了静态导包，就不用在给出类了，如下TestStaticPackge类

```java
public class TestStaticPackge {
	public static  void output(){
		System.out.println("Hello world");
	}
}
```
如果我们不使用静态导包，访问就是这个样子的：

```java
public static void main(String[] args) {
	TestStaticPackge.output();
}
```
静态导包的方法：
import static 包名.类名.静态成员变量;

import static 包名.类名.静态成员函数;

注意导入的是成员变量和方法名。
例如上述：

```java
import static com.java.study.TestStaticPackge.output;
public class TestOrder {
	public static void main(String[] args) {
		TestStaticPackge.output();//不使用静态导包
		output();//使用静态导包
	}

}
```
## 总结：
有static可以脱离对象而执行，没有就必须依赖对象




