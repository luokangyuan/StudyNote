## 多态
Java面向对象编程有三大特性：封装，继承和多态
封装隐藏类的内部具体实现机制，保护数据，对外界隐藏内部细节，只向外部提供它所允许访问的方法
继承是为了复用代码和实现向上转型，当然继承也是为多态做准备。
多态可以说是Java面向对象的精华所在。
## 什么是多态
多态是指允许不同子类型的对象对同一消息做出不同的响应，简单来讲，就是用同样的对象调用同样的方法但是却做了不同的事情。也可以理解为一个事物的多种表现形态。
多态性分为编译时的多态性和运行时的多态性。例如：
方法重载：实现的是编译时的多态性
方法重写：实现的是运行是的多态性
子类对象的多态性，这个是Java多态性中最常用的事。
## 实现多态的条件
1.方法重写，也就是说要有继承吧，只有有了继承，子类重写了父类已有的或抽象的方法
2.对象造型，也就是说要有父类的引用指向子类对象
只有这样，同样的引用调用同样的方法就会作出不同的响应，简单来讲如下代码所示：
父类Person有如下方法：

```java
public void walk(){
	System.out.println("人走路");
}

public void eat(){
	System.out.println("人吃饭");
}
```
如果子类Man类没有重写这两个方法，那么我们做如下的事情：

```java
	Person man = new Man();
    man.walk();
```
输出结果：

```java
人走路
```
综上所述：父类引用man指向的是子类对象，这个就是子类对象的多态性（也叫向上转型），man可以调用父类的方法，前提是子类没有重写父类方法。
如果子类Man类重写了父类方法

```java
public void walk(){
	System.out.println("男人应该挺拔的走路");
}

public void eat(){
	System.out.println("男人应该多吃肉");
}
```
同样的调用：

```java
Person man = new Man();
man.walk();
```
结果就是：

```java
男人应该挺拔的走路
```
综上所述：子类对象重写了父类方法，那么man调用父类方法，执行的就是子类的方法。这个也虚拟方法调用，说到这里你应该可以猜到，什么是多态了吧，就是同样的父类对象应用，指向不同的子类对象，就会作出不同的响应，例如子类Woman类也重写了父类的方法：

```java
public void walk(){
	System.out.println("女人应该温柔的走路");
}

public void eat(){
	System.out.println("女人应该少吃肉多吃水果蔬菜");
}
```
调用方法：

```java
Person man = new Man();
Person woman = new Woman();
man.walk();
woman.walk();
```
结果为：

```java
男人应该挺拔的走路
女人应该温柔的走路
```
综上所述：应该是很清晰了什么是子类对象的多态性，就是你相同的父类引用，不同的子类对象，就会响应对应的子类对象的方法。
## 方法重载和方法重写
方法重载和方法重写两者都是实现多态的方式，区别在于方法重载实现的是编译时的多态，方法重写实现的是运行时的多态，重载发生在同一个类中，同名的方法有不同的参数列表。
> 注意：方法的重载与返回值无关，简称两同一不同，同一个类，同一个方法，不同的参数列表
方法的重写发生在子类和父类之间，重写要求子类方法返回值，方法名，参数列表与父类爆出一致，权限修饰符大于父类，同时要同为static或同为非static。
> 注意：构造器不能被继承，所以不能被重写，但是却可以被重载
## 多态的使用例子
例如在父类Person类中有如下方法：

```java
public void show(Person person){
	System.out.println("这是父类show方法");
}
```
子类Man类重写了子类方法：

```java
public void show(Person person){
	System.out.println("这是子类show方法");
}
```
如果实例化Man对象，调用man的show(Person person)方法，就应该传入Person对象，这个时候就可以传入父类对象的引用。

```java
Person man = new Man();
man.show(man);
```
父类引用指向不同的子类对象，作出不同的响应。
## 多态经典案例
摘自http://blog.csdn.net/thinkGhoster/archive/2008/04/19/2307001.aspx

```java
    public class A {  
    public String show(D obj) {  
        return ("A and D");  
    }  
  
    public String show(A obj) {  
        return ("A and A");  
    }   
  
}  
  
public class B extends A{  
    public String show(B obj){  
        return ("B and B");  
    }  
      
    public String show(A obj){  
        return ("B and A");  
    }   
}  
  
public class C extends B{  
  
}  
  
public class D extends B{  
  
}  
  
public class Test {  
    public static void main(String[] args) {  
        A a1 = new A();  
        A a2 = new B();  
        B b = new B();  
        C c = new C();  
        D d = new D();  
          
        System.out.println("1--" + a1.show(b));  
        System.out.println("2--" + a1.show(c));  
        System.out.println("3--" + a1.show(d));  
        System.out.println("4--" + a2.show(b));  
        System.out.println("5--" + a2.show(c));  
        System.out.println("6--" + a2.show(d));  
        System.out.println("7--" + b.show(b));  
        System.out.println("8--" + b.show(c));  
        System.out.println("9--" + b.show(d));        
    }  
}  
```
输出结果为：

```java
1--A and A  
2--A and A  
3--A and D  
4--B and A  
5--B and A  
6--A and D  
7--B and B  
8--B and B  
9--A and D  
```
结果分析如下：

```properties
System.out.println("1--" + a1.show(b)); //a1是A的引用指向是A对象，故调用A中的show方法，传入的是b，b指向的是B对象，因为B继承与A,故传入的也可认为是A，结果为A and A
System.out.println("2--" + a1.show(c)); //c指向C对象，C继承B,B继承A,相当于传入A，结果为A and A
System.out.println("3--" + a1.show(d)); //d指向D对象，在A中有传入D对象的方法，结果为 A and D
System.out.println("4--" + a2.show(b)); //a2是父类引用，指向子类对象，按理说调用show方法会执行子类B的show方法，传入的是b,b指向的是B对象,
                                        //但是B中的show(B)是子类特有的方法，故不能被调用，传入的是B,B继承与A，相当于传入A,B类重写了show(B)方法，结果为B and A
System.out.println("5--" + a2.show(c)); //传入c,执行B中show(C)的方法，没有，C继承B,执行B中show(B),但是这是B中特有方法，不能被调用，
										//B继承A,调用B中show(A),结果B and A
System.out.println("6--" + a2.show(d)); //传入D,执行B中show(D)方法，没有，但是A中有就会执行父类show(D)方法，所以结果为：A and D
System.out.println("7--" + b.show(b)); //b指向B,传入B, 结果为B and B
System.out.println("8--" + b.show(c)); //传入c,执行B中show(C),没有，C继承B,执行B中show(B),结果为：B and B
System.out.println("9--" + b.show(d)); //传入d,执行B中show(D)方法，没有，当时B继承A,是存在A中show(D)的方法，结果为 A and D 
```
## 案例总结
对于a2.show(c)来讲,a2是A的应用，故先去A中找show(C)方法（this.show(O)）,A中没有，按理应该去A的父类中找（super.show(O)），但是A没有父类，故只能在A中找show(c的父类)方法(this.show(super))，c的父类有B和A,A中找到show(A)的方法，但是B重写了该方法，故执行子类的方法，所以结果为B and A。找的顺序是this.show(O)、super.show(O)、this.show((super)O)、super.show((super)O)。
