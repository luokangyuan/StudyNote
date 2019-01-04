## Final关键字
final:最终的，可以用来修饰类，修饰属性，修饰方法，修饰参数，被final修饰的表示不可以被修改，不能被修改的原因是为了效率和安全性。
### final修饰类
final修饰的类不能被继承，提高了安全性，例如String类，System类，StringBuffer类，源码如下所示：

```java
public final class String
implements java.io.Serializable, Comparable<String>, CharSequence

public final class System {

public final class StringBuffer extends AbstractStringBuilder
implements java.io.Serializable, CharSequence
```
final修饰的类表示这个是最终类，不允许被继承，它的成员可以是final，也可以是非final。
### final修饰方法
final修饰的方法不能被子类重写，例如Object类中的getClass()方法；源码如下

```java
public final native Class<?> getClass();
```
### final修饰变量
final修饰的变量称之为常量，恒定不变的数据能减轻系统运行的负担，final修饰的成员变量必须再声明的时候就进行赋值，或者在构造方法，代码块中为其赋值，不然就会报错，然后才能使用。例如

```java
final double PI = 3.14;
```
在阿里巴巴出版的Java开发手册中说道：常量命名全部大写，单词间用下划线隔开，力求语义表达完整清楚，不要嫌名字长，例如MAX_STOCK_COUNT
看如下代码，final修饰变量：

```java
class Person{
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Person(String name) {
		super();
		this.name = name;
	}
}
public class TestFinal {
	 private final String CHINA_SUPER_MAN_01 = "孙悟空";//编译器常量，必须初始化赋值，且不能被更改
	 
	 private final String CHINA_SUPER_MAN_02;//构造器常量，在实例化一个对象是初始化这个常量
	 
	 private final Person CHINA_SUPER_MAN_03 = new Person("奥特曼");//final指向应用类型
	 public TestFinal(String cHINA_SUPER_MAN_02) {
		this.CHINA_SUPER_MAN_02 = cHINA_SUPER_MAN_02;
	}
	@Override
	public String toString() {
		return "final修饰变量时初始化=" + CHINA_SUPER_MAN_01
				+ ", final修饰变量使用构造器初始化=" + CHINA_SUPER_MAN_02
				+ ", final指向引用类型初始化=" + CHINA_SUPER_MAN_03.getName() ;
	}
	 public static void main(String[] args) {
		 TestFinal final1  = new TestFinal("唐僧");
		 System.out.println(final1);
		 TestFinal final2  = new TestFinal("嫦娥");
		 System.out.println(final2);
		 final2.CHINA_SUPER_MAN_03.setName("貂蝉");
		 System.out.println(final2);
	}
```
结果为：
	final修饰变量时初始化=孙悟空, final修饰变量使用构造器初始化=唐僧, final指向引用类型初始化=奥特曼
	final修饰变量时初始化=孙悟空, final修饰变量使用构造器初始化=嫦娥, final指向引用类型初始化=奥特曼
	final修饰变量时初始化=孙悟空, final修饰变量使用构造器初始化=嫦娥, final指向引用类型初始化=貂蝉
从上面的代码和结果可以看出：
1.final修饰的变量，如果在定义变量的时候直接初始化赋值，那么他是不可变的，
2.final修饰的变量，采用构造器初始化，也就是说每一个对象中某一个属性都有其特定的属性值。
3.final指向引用类型，实例化每一个对象时，不修改其属性值就会使用默认初始化的，可以修改对象的属性值，且不影响其他实例化对象的调用
## final修饰参数
final修饰的参数表示不可变，如果你做了什么能改变该参数的值，就会报错，例如

```java
 public void test(final int i){
	 //i++;final修饰的参数不能被改变
	System.out.println(i); 
 }
public void test1(final Man man){
	 //man = new Man();//不能被改变
	 man.setName("貂蝉");
 }
```
在匿名内部类中，为了保持参数的一致性，若所在的方法的形参需要被内部类使用时，该形参就是final的。匿名内部类将在接下来的学习中。
## final和static
这两个关键字都可以修饰变量，也可以修饰成员方法，
一起修饰成员变量，也叫全局全局常量，使用类名直接访问。
一起修饰成员方法，则不可被继承也不能被改变，可以通过类名直接访问。
## final面试题
###是否可以继承String类
答：不能，因为String类是final类不能被继承。
### final关键字有哪些用法
答：1.修饰类，表示类不能被继承。2.修饰方法，表示方法不能被重写。3.修饰变量，表示变量只能被赋值一次且不能被修改。4.修饰参数，表示参数不可变。
