## abstract关键字
abstract：抽象的，可以用来修饰类和方法，当abstract修饰类的时候，该类就叫抽象类，修饰方法时，就叫抽象方法。
## 什么叫抽象类
在java中，因为继承，使得类越来越具体化，类的设计使得父类越来越通用，在类的设计里应该保证父类和子类能够共享特征，有时候就把父类设计的非常抽象，让它没有具体的实例。这样的类就叫抽象类，例如人可以说话，但是不同的人可能说的话不一样，所以让说话的内容由子类自己决定。
### 1.抽象类不可以被实例化，实例化应该是它的子类来完成

```java
public class TestAbstract {
	public static void main(String[] args) {
		Person person = new Person();
		person.eat();
	}
}
class Person{
	public void eat(){
		System.out.println("人吃饭");
	}
	public void walk(){
		System.out.println("人走路");
	}
}
class Teacher extends Person{
	public void eat(){
		System.out.println("教师吃饭");
	}
	public void walk(){
		System.out.println("教师走路");
	}
}
class Student extends Person{
	public void eat(){
		System.out.println("学生吃饭");
	}
	public void walk(){
		System.out.println("学生走路");
	}
}
```
从上述代码可以看出，如果Person类没有被abstract修饰，在main方法里是可以被实例化的，如果我们加上了abstract关键字修饰，那么Person person = new Person();就会被报错。
### 2.抽象类是类的一种，也有构造器
很神奇的是，抽象类不能被实例化，但是却可以存在构造器，

```java
abstract class Person{
	String name;
	int age;
	public void eat(){
		System.out.println("人吃饭");
	}
	public void walk(){
		System.out.println("人走路");
	}
	public Person(String name, int age) {
		super();
		this.name = name;
		this.age = age;
	}
	public Person() {
		super();
	}
}
```
### 3.抽象方法所在的类一定是抽象类
```java
abstract class Person{
	public abstract void eat();
	public abstract void walk();
}
```
## abstract修饰方法
abstract修饰的方法也叫抽象方法，关于抽象方法需要说明以下几点：
1.抽象方法的格式，没有方法体，就是不包括{},例如public abstract void eat();
2.抽象方法值保留方法的功能，具体的实现过程由继承他的子类来实现，
3.如果子类继承了抽象类没有全部实现父类抽象方法，则表明子类还是一个抽象类，也必须用abstract修饰类，
4.如果子类继承了抽象类，并且全部重写了父类抽象方法，则该子类就可以被实例化。
### 4.抽象类中可以没有抽象方法

```java
abstract class Person{
	public void eat(){
		System.out.println("人吃饭");
	}
	public void walk(){
		System.out.println("人走路");
	}
}
```
### 5.抽象方法必须由子类来重写

```java
abstract class Person{
	public abstract void eat();
	public abstract void walk();
}
class Teacher extends Person{
	public void eat(){
		System.out.println("教师吃饭");
	}
	public void walk(){
		System.out.println("教师走路");
	}
}
```
从上述代码也能得出，子类继承一个抽象类，要么全部实现父类的抽象方法，要么本身还是一个抽象类。
### 6.子类中的抽象方法不能和父类的抽象方法同名
### 7.abstract不能与final修饰同一个类，原因很简单，final修饰的类不能被继承，
### 8.abstract不能与private，static，final，native并列修饰同一个方法
这三点大家都可以试试，道理也很简单。下面一个例子说明抽象类的相关知识；

```java
public class TestAbstract {
	public static void main(String[] args) {
		Person p1 = new Teacher();
		p1.eat();
		Person p2 = new Student();
		p2.eat();
		Teacher t1 = new Teacher();
		t1.eat();
		Student s1 = new Student();
		s1.eat();
	}
}
abstract class Person{
	public  abstract void eat();
	public abstract void walk();
}
class Teacher extends Person{
	public void eat(){
		System.out.println("教师吃饭");
	}
	public void walk(){
		System.out.println("教师走路");
	}
}
class Student extends Person{
	public void eat(){
		System.out.println("学生吃饭");
	}
	public void walk(){
		System.out.println("学生走路");
	}
}
```
结果为：

```properties
教师吃饭
学生吃饭
教师吃饭
学生吃饭
```
## 模板方法设计模式
抽象类体现的就是一种模板设计模式，抽象类作为多个子类通用的模板，子类在抽象类的基础上进行扩展，这种模式解决的就是一部分功能不确定，就把不确定的功能部分暴露出去，让子类自己去实现。
### 案例

```java
public class TestTemplate {
	public static void main(String[] args) {
		new subTemplate().spendTime();
	}
}
abstract class Template{
	public abstract void testAbstract();
	public void spendTime(){
		long start = System.currentTimeMillis();
		this.testAbstract();
		long end = System.currentTimeMillis();
		System.out.println("执行testAbstract方法花费的时间为"+(end-start));
	}
}
class subTemplate extends Template{

	@Override
	public void testAbstract() {//求10000以内的素数
		boolean flag = false;
		for(int i = 2; i <= 10000;i++){
			for(int j = 2;j <=Math.sqrt(i);j++){
				if(i % j == 0){
					flag = true;
					break;
				}
			}if(!flag){
				System.out.println(i);
			}
			flag = false;
		}
	}
	
}
```
## 接口
接口是一种比抽象类还抽象的东西，它不是类，不能被实例化，只能实例化他的子类。使用关键字interface，实现接口的类就必须实现接口中的所有方法，这个在javaee中的三层架构中会经常使用。在使用接口的过程中需要注意一下几点：

* 一个类可以实现多个接口，也可以继承其他接口。
* 接口中只能有常量和抽象方法。
* 接口的权限只能是public，你可以手动声明为其他，编译就会报错。
* 接口中定义的“成员变量”，也加不可变的常量，因为会自动加上public static final，可以通过接口名.常量名进行访问。
* 接口主要用于定义规范，接触耦合关系

```java
public interface TestInterface {
 public void show();
 public void updateEmployee();
}
```
这就是一个接口，只是说接口没有太多说的，主要是接口有什么用，java为什么会提供这么一个东西，接口在JAVAEE中使用很多，例如Mybatis基于接口的mapper开发。JavaEE三层模式开发都会大量使用接口。下面主要学习接口的应用。
## 接口的多态性

```java
public class Test {
	public static void main(String[] args) {
		Duck duck = new Duck();
		Test.test1(duck);
		Test.test2(duck);
		Test.test3(duck);
	}
	
	public static void test1(Swim s){
		s.swim();
	}
	public static void test2(Runner r){
		r.runner();
	}
	public static void test3(Fly f){
		f.fly();
	}

}
interface Swim{
	public abstract void swim();
}
interface Runner{
	public abstract void runner();
}
interface Fly{
	public abstract void fly();
}
class Duck implements Swim,Fly,Runner{

	@Override
	public void runner() {
		System.out.println("鸭子跑起来了");
	}

	@Override
	public void fly() {
		System.out.println("鸭子飞起来了");
	}

	@Override
	public void swim() {
		System.out.println("鸭子游起来了");
	}
	
}
```
继承的多态是子类重写父类方法，父类引用指向不同的子类实例，就会调用对应子类的方法，从而执行不同的响应，
接口的多态是实现类实现多个接口，方法参数列表里可以带接口的引用参数，方法的具体可以通过接口引用调用接口里的抽象方法，调用该方法时传入接口实现类，实际执行的是实现类中的方法。这是相同的实例，不同的接口体现的多态性。
## 接口应用-工厂方法的设计模式
定义一个用于创建对象的接口，让子类决定实例化哪一个类。简单来讲就是暴露接口给用户，根据用户传入的参数返回特定的实例对象的一种模式。
例如：一个生产汽车的工厂，有很多分厂，生产火车的，生产轿车的，生产货车的，用户不知道有这些分厂，用户只知道有一个工厂可以生产车，这个工厂是虚拟的，用户在接口传入编号，由工厂返回用户指定的车实例。
案例如下：

```java
public class TestFactory {
	public static void main(String[] args) {
		IWorkFactory factory = new StudentWorkFactory();
		factory.getWork().doWork();
		
		IWorkFactory factory2 = new TeacherWorkFactory();
		factory2.getWork().doWork();
	}

}
interface IWorkFactory{
	Work getWork();
}
class StudentWorkFactory implements IWorkFactory{

	@Override
	public Work getWork() {
		return new StudentWork();
	}
	
}
class TeacherWorkFactory implements IWorkFactory{

	@Override
	public Work getWork() {
		return new TeacherWork();
	}
	
}
interface Work{
	void doWork();
}
class StudentWork implements Work{

	@Override
	public void doWork() {
		System.out.println("学生写作业");
	}
	
}
class TeacherWork implements Work{

	@Override
	public void doWork() {
		System.out.println("教师批改作业");
	}
	
}
```

## 抽象类和接口的区别
总的来说：抽象类和接口都不能被实例化，但是都可以定义抽象类和接口的引用。

* 抽象类可以有抽象方法，也可以有方法的具体实现，接口中不能。
* 抽象类中的成员修饰可以为private，默认，protected,public但是接口中只能为public。
* 抽象类可以定义成员变量，但是接口中其实都是不可变的常量。

抽象类如下：

```java
abstract class TestAbstractDemo{
	String name;
	abstract void test1();
	void test2(){
		System.out.println("我是具体方法");
	}
}
```
接口如下：

```java
interface TestInterfaceDemo{
	 String name="Hello";
	 abstract void test1();
	 abstract void test2();
 }
```
## 总结：
程序设计中，什么时候使用接口，什么时候使用抽象类，这是一个架构的难点，只有对问题充分了解才能选择合适的设计方法，抽象类在java中表示的是一种继承关系，一个子类只存在一个父类，但是却可以实现多个接口。
