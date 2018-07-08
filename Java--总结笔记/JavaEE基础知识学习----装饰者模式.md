## 定义
动态的将责任附加到对象上，若要扩展功能，装饰者模式提供了比继承更具有弹性的方案。
## 为什么会出现这个设计模式
给对象扩展行为的方法有两种，一种是通过继承，继承是给类添加扩展行为比较有效的办法，通过使用继承，可以使得子类有自己的行为，还可以获得父类的行为方法，但是使用继承是静态的，在编译的时候就已经决定了子类有哪些行为。
当然还可以使用关联，将一个对象嵌入到另一个对象中，有一个对象来决定是否引用该对象来扩展自己的行为，这是一种动态的方式，我们可以在程序中动态的决定和控制。
前面所说的两种都会导致一种‘类爆炸’的情况出现，所以就出现了装饰者模式。
## 认识装饰者模式
例如为咖啡店设计一个点咖啡的程序，采用饮料为主体，在运行时以调料来‘装饰’饮料，如果顾客要摩卡和奶泡深焙咖啡，那么，
1. 拿一个深焙咖啡（DarkRoast）对象
2. 以摩卡（Mocha）对象装饰它
3. 一奶泡（Whip）对象装饰它
4. 调用cost方法，并依赖委托（delegate）将调料的钱加上去。


## 装饰者类图结构
![](https://i.imgur.com/TccbbEZ.png)
## 实现装饰者模式
情景：购买咖啡时，会加入不同的调料，根据不同的调料来收费，也就是说不同的咖啡与不同的调料有N中不同的组合方式，也就是出现了不同组合就应该有不同的价格。结构图如下：

![](https://i.imgur.com/jSfJhgf.png)
## 代码实现
### Beverage组件基类
```java
public abstract class Beverage {
    protected String description = "";
    public String getDescription() {
        return description;
    }
    public abstract double cost();

}
```
### HouseBlend组件
```java
public class HouseBlend extends Beverage {
    public HouseBlend() {
        description = "这是一杯综合咖啡";
    }
    @Override
    public double cost() {
        return 0.89;
    }
}
```
### Espresso组件
```java
public class Espresso extends Beverage{
    public Espresso() {
        description = "这是一杯浓缩咖啡";
    }
    @Override
    public double cost() {
        return 1.99;
    }
}
```
### Decat组件
```java
public class Decat extends Beverage {
    public Decat() {
        description = "这是一杯深焙咖啡";
    }
    @Override
    public double cost() {
        return 0.99;
    }
}
```
### DarkRoast
```java
public class DarkRoast extends Beverage{
    public DarkRoast() {
        description = "这是一杯低咖啡因咖啡";
    }
    @Override
    public double cost() {
        return 1.05;
    }
}
```
### 配料基本类
```java
public abstract class CondimentDecorator extends Beverage{
    public abstract String getDescription();
}
```
### Milk配料
```java
public class Milk extends CondimentDecorator{
    Beverage beverage;
    public Milk(Beverage beverage) {
        this.beverage = beverage;
    }
    @Override
    public String getDescription() {
        return beverage.getDescription()+",牛奶";
    }

    @Override
    public double cost() {
        return beverage.cost()+0.1;
    }
}
```
### Mocha配料
```java
public class Mocha extends CondimentDecorator {
    Beverage beverage;
    public Mocha(Beverage beverage) {
        this.beverage = beverage;
    }
    @Override
    public String getDescription() {
        return beverage.getDescription()+",摩卡";
    }

    @Override
    public double cost() {
        return beverage.cost()+0.2;
    }
}
```
### Soy配料
```java
public class Soy extends CondimentDecorator{
    Beverage beverage;
    public Soy(Beverage beverage) {
        this.beverage = beverage;
    }

    @Override
    public String getDescription() {
        return beverage.getDescription()+",豆浆";
    }
    @Override
    public double cost() {
        return beverage.cost()+0.15;
    }
}
```
### Whip配料
```java
public class Whip extends CondimentDecorator{
    Beverage beverage;
    public Whip(Beverage beverage) {
        this.beverage = beverage;
    }
    @Override
    public String getDescription() {
        return beverage.getDescription()+",奶泡";
    }
    @Override
    public double cost() {
        return beverage.cost()+0.1;
    }
}
```
### 测试类
```java
public class StartbuzzCoffee {
    public static void main(String[] args) {
        Beverage beverage = new Espresso();
        System.out.println(beverage.getDescription()+",$"+beverage.cost());
        System.out.println("========================");

        Beverage beverage2 = new DarkRoast();
        beverage2 = new Mocha(beverage2);
        beverage2 = new Mocha(beverage2);
        beverage2 = new Whip(beverage2);
        System.out.println(beverage2.getDescription()+",$"+beverage2.cost());
    }
}
```
### 测试结果

	这是一杯浓缩咖啡,$1.99
	========================
	这是一杯低咖啡因咖啡,摩卡,摩卡,奶泡,$1.55
### 总结
1. 装饰者可以提供比继承更多的灵活性。
2. 可以通过一种动态的方式来扩展一个对象的功能，在运行时选择不同的的装饰器，从而实现不同的行为。
3. 具体组件类和装饰类可以独立变化，用户可以根据自己的需要增加具体的组件类和装饰类，原有的代码无需改变，负荷”开闭原则“。
4. 但是也会产生很多的小对象，增加了系统的负责性。
5. 建议在不影响其他对象的时候使用，以动态，透明的方式给单个对象添加职责。


