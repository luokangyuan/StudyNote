## 内部类
类的五个成分：属性，方法，构造器，代码块，内部类。
什么是内部类？在java中，允许一个类定义在另一个类的内部，前者就叫内部类，后者就叫外部类。
内部类一般用在定义它的类或语句块之内，在外部引用内部类必须给出完整的类名，当然外部类和内部类的类名不能相同。
内部类可以使用外部类的私有数据，因为它本身就是外部类的成员，同一个类的成员之间是可以互相访问的。而外部类要访问内部类中的成员就需要使用对象或者如果访问内部类中静态结构就使用完整类名。
一般很少在类中在定义类，但是也是存在的，例如线程中的Thread类，其中就有一个内部类。如下：

```java
 public enum State {
```
这个是一个枚举类，也是类的一种，枚举有关的知识后续学习中。
## 内部类分类
成员内部类：声明在类内部且方法外的，根据是否有static修饰的又分为static成员内部类和非static成员内部类
局部内部类：声明在类的方法里，不谈修饰符，
## 成员内部类
1.它是外部类的一个成员，所以它有四个修饰符，普通的类只有两个public和默认的。
2.普通的类不可以用static修饰，但是内部类可以，因为他是类的成员。
3.因为内部类是一个类，所以他也具备类的特点，例如用abstract修饰，可以在其内定义属性，方法，构造器
下面演示的就是一个成员内部类和局部内部类；

```java
public class TestInnerClass {

}
class SuperPerson{
	String name;
	int age;
	private class Bird{
		String name;
		String age;
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getAge() {
			return age;
		}
		public void setAge(String age) {
			this.age = age;
		}
		public Bird(String name, String age) {
			super();
			this.name = name;
			this.age = age;
		}
		
	}
}
```
## 内部类有什么用？
老实说，我也没有用过内部类，我还是菜鸟一个，在网上看到一个例子，说的很好，我们都知道在java中只能支持单继承多接口。看如下代码：

```java
public interface Father {  
  
}  
  
public interface Mother {  
  
}  
  
public class Son implements Father, Mother {  
  
}  
  
public class Daughter implements Father{  
  
    class Mother_ implements Mother{  
          
    }  
} 
```
如果Father和Mother不是接口，而是抽象类或者具体类，我们就可以使用内部类实现多重继承。