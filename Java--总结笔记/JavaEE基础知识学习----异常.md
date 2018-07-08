## 异常
在使用计算机语言进行项目开发的过程中，不可能把代码写的完美，在系统的运行过程中仍然会遇到一些问题，例如用户输入数据的格式，读取文件但是文件是否存在等等。
在java中，将程序执行过程中发生的不正常情况称为异常，当然开过程中的语法错误和逻辑错误就不是异常了。
### 异常体系结构
![](https://i.imgur.com/wl3TXOv.png)
### 分类
java程序在执行过程中所发生的异常可分为两类：
Error:Java虚拟机无法解决的严重问题，例如：JVM系统内部错误，资源耗尽等严重情况，一般不会编写代码进行处理。
Exception：因编程错误或偶然的外在因素导致的一般问题，可以编写代码进行针对性处理，例如空指针访问，试图读取不存在的文件等等
### 解决办法
1.遇见错误就终止程序的运行。
2.编写程序时就考虑到这些错误，并编写了错误检测，错误提示，错误处理的代码 。
捕获错误最理想的就是在编译期间，就是生成.class文件前，但是有的错误只有在运行期间才会发生，例如除数为0，数组下标越界等等，所以又分为编译时异常和运行时异常。
### 常见异常
#### 1.IndexOutOfBoundsException下标越界异常。例如

```java
public static void main(String[] args) {
	int a[] = new int[10];
	System.out.println(a[10]);
	System.out.println(a[-10]);
}
```
#### 2.ArithmeticException算术异常，例如

```java
public static void main(String[] args) {
	int i = 10;
	System.out.println(i/0);
}
```
#### 3.ClassCastException类转换异常，例如

```java
public static void main(String[] args) {
	Object obj = new Date();
	String str = (String) obj;
}
```
#### 4.NullPointerException空指针异常，例如

```java
public class TestException {
	public static void main(String[] args) {
		TestPerson person = new TestPerson();
		person = null;
		System.out.println(person.toString());
	}
}
class TestPerson{
	
}
```
说明：程序有异常，如果没有处理，就会结束继续向下执行，例如

```java
public class TestException {
	public static void main(String[] args) {
		TestPerson person = new TestPerson();
		person = null;
		System.out.println(person.toString());
		
		String str = new String("AA");
		System.out.println(str.length());
	}
}
class TestPerson{
	
}
```
在上述代码中，会抛出NullPointerException空指针异常，也不会打印str的长度。
### 异常处理方式
java采用异常处理机制，将异常处理的程序代码集中在一起，与正常的程序代码分开，使得程序简洁，并易于维护。
java提供的异常处理是抓抛模型。
#### 抛
java程序在执行过程中如果遇见异常，就会生成一个异常类对象，该异常类对象将被提交给java运行时系统，这个过程称为抛出异常。
抛出异常分为自动抛出和手动抛出，一旦抛出异常类的对象，程序就终止执行，异常类的对象是抛给方法的调用者。
#### 抓
抓住上一把抛出的异常类的对象，如何抓，就是异常类的处理方式，有两种方式。
#### 异常处理方式一

```java
try{
//可能出现异常的代码
}catch(Exception1 e1){
//处理方式1
}catch(Exception2 e2){
//处理方式2
}finally{
//一定要执行的代码
}
```
解释：try中的代码如果抛出了异常，就会抛给catch，catch根据Exception类型执行不同的解决方式，catch可以有多个，就和if-else一样的道理。其中try中申明的变量类似局部变量，在try外就不能访问。
例如下面的代码，解决异常的方式：

```java
public class TestException {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		try {
			int i= scanner.nextInt();
			System.out.println(i);
		} catch (InputMismatchException e) {
			System.out.println("出现了类型不匹配异常");
		}
		
	}
}
```
说明：
1.使用try-catch时候，出现了异常就会进入catch语句中，如果有多个catch，也只会进入一个catch，然后继续执行下面的代码。
2.如果catch里的异常类型是包含关系，必须将子类放在父类的上面，进行处理，否则就会报错。
3.finally存放的就是一定会处理的代码，不管try-catch中是否有异常未被处理，以及里面是否有return语句。
4.try-catch是可以嵌套的。
#### 异常处理方式二
使用try-catch处理的异常是知道可能会产生异常，并且知道怎么处理这个异常，如果一个方法中可能产生某种异常，但是并不明确知道该如何处理这种异常，这个时候就要显示的 声明抛出异常，表明我这个方法不进行异常处理，谁调用谁处理。
在方法的声明中使用throws语句可以声明抛出异常的列表，throws后面的异常类型可以是方法中可能产生的异常类型，也可以是他的父类。
例如如下：	

```java
public void readFile()throws FileNotFoundException{
	//可能产生文件找不到异常
	FileInputStream fis = new FileInputStream(file);
}
```
在上述代码中抛出的是系统自带的异常对象，还可以自己定义一个异常处理类。
在程序中还可以手动的抛出异常，例如：

```java
public int compareTo(Object obj){
	if(obj instanceof Person){
		return 0;
	}else{
		throw new RuntimeException("传入的类型有误");
	}
}
```
在上述代码中
1.我们手动抛出 RuntimeException，代码编译不会报错，如果抛出了Exception，程序就会报错，因为运行时异常在编译不会报错，这个时候要么用try-catch，要么在方法声明上使用throws.
2.我们使用throw手动抛出异常，这个throw和throws有很大的区别：
#### 注意的是
在继承后，子类重写父类异常方法时，抛出的异常要比父类小才行。
#### throw和throws的区别
1.throws+异常类型，是在方法的声明处，是解决异常处理的两种方式之一，
2.在处理异常的方式中有自动抛出异常和手动抛出异常（就使用到了throw后面是一个异常类对象）
#### 自定义异常类
使用java自定义异常需要注意以下几点：
1.定义一个类继承Throwable类或者他的子类
2.在某个方法类抛出异常
3.捕捉和解决该异常
#### 自定义异常类步骤
1.新建一个类，并继承Throwable类或者他的子类
2.类中提供一个序列号，作为唯一标识，具体看RuntimeException源码。
3.提供几个重载的构造器
例如：

```java
public class MyException extends RuntimeException {
	 static final long serialVersionUID = -7034897190745766939L;
	 
	public MyException(){
		
	}
	public MyException(String message){
			super(message);
	}
}
```
在处理异常就可以手动的抛出自定义的异常类。

```java
throw new MyException("传入的类型有误");
```
## 异常面试题
### 1.Error和Exception有什么区别？
答：Error表示系统级别的错误和程序不必处理的异常，比如内存溢出。
Exception表示需要捕捉或者程序处理的异常，是一种设计和实现问题，简单来讲就是如果程序运行正常就不会发生这样的情况。
### 2.try{}里有一个return语句，那么紧跟在try后面的finally{}里的代码会不会执行，什么时候执行？return前还是后？
答：会执行，在方法返回调用者前执行。简单说就是不管catch是否有return，finally里的代码都会执行。
### 3.Java如何进行异常处理？throws、throw、try、catch、finally分别如何使用？
答：java通过面向对象的方法进行异常处理，把各种异常进行分类，并提供的接口，在java中每一个异常都是一个对象，他是Throwable的子类的实例，
java异常处理使用五个关键字：try、catch、finally、throws、throw
一般情况下是try来执行一段程序，如果系统会抛出throw一个异常类对象，就用catch来捕获，或者使用finally来处理。try-catch是知道怎么处理异常，如果不知道就使用throws抛出异常，将异常交给方法调用者处理。
### 4.列出你常见的运行时异常？
#### ①.ArithmeticException算术异常，
当出现异常的运算条件时，抛出此异常。例如，一个整数“除以零”时，抛出此类的一个实例。
#### ②.ClassCastException类转换异常
当试图将对象强制转换为不是实例的子类时，抛出该异常。例如，以下代码将生成一个 ClassCastException： 

```properties
Object x = new Integer(0);
System.out.println((String)x);
```
#### ③.IllegalArgumentException非法参数异常
抛出的异常表明向方法传递了一个不合法或不正确的参数。 
#### ④.IndexOutOfBoundsException下标越界异常
指示某排序索引（例如对数组、字符串或向量的排序）超出范围时抛出。
#### ⑤.NullPointerException空指针异常
当应用程序试图在需要对象的地方使用 null 时，抛出该异常。这种情况包括：
	
```properties
调用 null 对象的实例方法。
访问或修改 null 对象的字段。
将 null 作为一个数组，获得其长度。
将 null 作为一个数组，访问或修改其时间片。
将 null 作为 Throwable 值抛出。
```
#### ⑥.SecurityException安全异常
由安全管理器抛出的异常，指示存在安全侵犯。 
### 5.阐述final、finally、finalize区别？
答：final:修饰符，修饰类表明该类不能被继承，修饰方法表明该方法不能被重写，修饰变量，则必须赋值，成为常量。
finally：是异常处理try-catch的后面总要执行的代码块，可以将资源的关闭写在里面。
finalize:Object类中定义的方法，java中允许使用finalize()方法在垃圾收集器里讲对象从内存中清除出去之前做必要的工作，这个方法是有垃圾收集器在销毁对象时候调用的。