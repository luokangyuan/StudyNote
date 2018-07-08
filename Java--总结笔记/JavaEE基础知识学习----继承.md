## 继承
* Java面向对象的第二个特性：继承，继承是指新的类可以获得已有类（称为父类或基类）的属性和行为，称新类为已有类的派生类或子类，
* 继承是一种联结类的层次模型，为类的重用提供方便，也可以说复用代码，例如有如下两个类Man类和Woman类：
![](https://i.imgur.com/Figvxss.png)
* 以上两个类中，我们可以看出，男人和女人的属性有很多相同的地方，男人和女人都是人，他们都具备人所具备的属性和行为，例如，姓名。年龄，性别，吃饭，睡觉等等，如果我们可以最大限度的复用代码，提取出两个类所共有的属性和行为，那么如何来实现代码的复用，这就要Java面向对象的特性二，继承性，
* 继承就是使用已经存在类来定义新的类，新类可以增加新的属性和行为，也可以使用父类的属性和行为，但是不能选择性的继承父类，使用继承可以方便的复用代码，提高开发效率，使用继承可以使程序结构清晰，但是会增加代码耦合度。
使用继承后的类设计如下：
![](https://i.imgur.com/31rnbCf.png)
使用继承需要明确的是：
* Java继承使用extends关键字实现
* Java是支持单继承。
* 子类拥有父类非private的属性和方法
* 子类可以拥有自己的属性和方法，也就是说子类可以对父类进行扩展
* 子类可以重写父类的方法，涉及到方法的重写，将会在后面学习
讲到继承，就会说到构造器，protected关键字，`向上转型`。
## 构造器
子类可以继承父类非private的属性和方法，还存在一种是子类不能继承的，那就是构造器，对于构造器来说，他允许被子类调用，不允许被子类继承，调用父类的构造方法使用super()即可。
这里就涉及到构造器初始化顺序的事，父类构造器如下：
```java
public Person() {
	System.out.println("我是父类构造器");
}

public Person(String name, String sex, int age) {
	System.out.println("我是父类含参构造器");
	this.name = name;
	this.sex = sex;
	this.age = age;
}
```
子类构造器如下:
```java
public Man() {
	System.out.println("我是子类构造器");
}

public Man(boolean smook) {
	System.out.println("我是子类含参构造器");
}
```
初始化对象：
```java
Man man = new Man();
```
输出结果如下：
```properties
我是父类构造器
我是子类构造器
```
初始化子类对象时会默认调用父类默认构造器，前提是父类要有默认的无参构造器，如果父类没有默认的无参构造器，我们就必须通过super()来调用父类构造器。例如：
父类有构造器：
```java
public Person(String name) {
	System.out.println("我是父类含参构造器====="+name);
}
```
子类默认构造器如下：
```java
public Man() {
	super("张三");
	System.out.println("我是子类构造器");
}
```
初始化子类对象：
```java
Man man = new Man();
```
输出结果：
```properties
我是父类含参构造器=====张三
我是子类构造器
```
综上所述：对于继承来讲，子类会默认调用父类的默认无参构造器（前提是父类存在默认无参构造器），如果父类没有默认的构造器，子类就必须明确的指定自己要调用的是父类哪一个构造器，而且必须是在子类构造器中最前面做的事，就是代码写在最前面。
## protected关键字
首先protected是一个权限修饰符，所以我们先看看权限修饰符的相关知识：
### 四种不同修饰符的权限如下所示：
* public：当前类，同包，子类，其他包
* protected：当前类，同包，子类
* default:当前类，同包
* private:当前类

类的成员不写访问修饰符就相当于default，default对于同一个包中的其他类相当于公开，对于不是同一个包的其他类相当于私有。protected对于子类相当于公开，对于不是同包也没有子类关系的类相关于私有。
对于Java面向对象的封装性来讲，private是最好的选择，但是有时候我需要将一些属性尽可能的向外界隐藏，但是允许子类可以访问，天下父母都一样，尽可能的向多给子类一些，但是又不想给全世界，毕竟没有那么伟大，所以就使用到了protercted关键字。例如：
父类protected 方法：
```java
protected void setName(String name) {
	this.name = name;
}
@Override
public String toString() {
	return "父类toString方法=="+name;
}
```
子类toString方法：
```java
@Override
public String toString() {
	setName("我是张三");//调用父类protected方法
	return super.toString();//调用父类toString方法
}
```
实例化子类对象：
```java
Man man = new Man();
System.out.println(man.toString());
```
输出结果为：
```properties
父类toString方法==我是张三
```
综上所述：我们可以看出子类Man类可以调用父类Person的setName(),因为改方法使用protected权限修饰符，尽管可以如此，但是最好将属性的权限保持为private，更好的体现Java面向对象的封装性，通过protected方法来控制继承者的访问权限。
## 向上转型
这个其实也叫子类对象的多态性，Java面向对象的特性之多态性将在后续的学习中，向上转型就是父类的应用指向子类对象，例如：
```java
Person person = new Man();
```
具体实例如下所示，例如在父类Person中有如下方法：
```java
public void show(){
	System.out.println("我是父类show方法");
}
static void show(Person person){
	person.show();
}
```
Man类继承Person类，在外部直接调用Man类的父类的静态方法如下：
```java
Man.show(person);
```
按理说我们应该在show方法中传入Person对象，但是我们可以参这样做：
```java
Person man = new Man();
Man.show(man);
```
另外：在这里可以通过man调用父类的方法，如果子类重写了父类的方法，那么调用就会执行子类的方法，这个也叫虚拟方法调用，也就是说man不能调用子类所特有的方法。
当然，如果你想调用子类所特有的方法，那么可以使用强转，
```java
Man m = (Man)man;
```
使用m来调用子类所特有的方法。
## 注意
虽然说继承可以带来很多好处，可以实现代码复用，但是使用继承要慎重，为什么这么讲呢？原因是：
* 增强了代码之间的耦合度。父类变，子类也就必须跟着变，有点像家族企业的兴衰一样
* 继承破坏了封装，对于父类而言，实现细节对子类是很清晰的

继承有优点也有缺点，不知道应不应该使用继承，主要看自己的代码需不需要继承带来的好处，例如需要向上转型不，如果需要，那肯定需要继承。


