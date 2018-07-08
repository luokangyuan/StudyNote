### 概述
在设计原则中有这样的一句话“我们应该针对接口编程，而不是针对实现编程”，但是，在大部分的情况下，我们都是以new关键字来创建对象的，针对接口编程的原因在于多态的使用，我们希望能够调用一个简单的方法，传递一个参数就可以返回一个相应的对象，这个时候我们不在是采用new来创建对象，这个就是普通工厂模式，也叫简单工厂模式。
举个例子说吧，现实中车子的种类很多，大巴车，轿车，救护车，越野车等等，每一个种类下面还有很多的型号，一个工厂生产这么多的车很难管理，就会有很多分厂，例如生产轿车的分厂，生产货车的分厂，但是，客户不需要知道工厂是怎么区分的，客户只会告诉客服，他需要什么车，客服会根据客户的需求去找到对应的车长去生产车，对客户来说，工厂只是一个抽象的概念，他只知道有这么一个工厂能满足他的需要。
### 上述例子的类图
![](https://i.imgur.com/OPQ0Ctw.png)
### 伪代码

```java
public class ProductFactory{
	public static IProduct createProduct(String productNo){
		switch (productNo) {
		case "1":
			return new Product1(XXXX);
		case "2":
			return new Product2(XXXX);
		case "3":
			return new Product3(XXXX);
		case "4":
			return new Product4(XXXX);
		case "5":
			return new Product5(XXXX);

		default: throw new
			NotSupportedException("不支持此编号的车");
			break;
		}
	}
}
```
### 定义
普通工厂模式又称为静态工厂方法，属于创建型模式，在普通工厂模式中，可以根据传递的参数不同，返回不同类的实例，普通工厂模式定义了一个类，这个类专门用于创建其他类的实例，这些被创建的类都有一个共同的父类。
### 普通工厂模式的实现
情景：在一个披萨店中，要根据不同客户的口味，生产不同的披萨，类图如下：
![](https://i.imgur.com/9JNK9sf.png)
### 代码实现
### SimplyPizzaFactory工厂类

```java
/**
 *生产披萨的工厂类
 * @author lky
 */
public class SimplyPizzaFactory {
	public Pizza createPizza(String type){
		Pizza pizza = null;
		if(type.equals("cheese")){
			pizza = new CheesePizza();
		}
		else if(type.equals("clam")){
			pizza = new ClamPizza();
		}
		else if(type.equals("pepperoni")){
			pizza = new PepperoniPizza();
		}
		else if(type.equals("veggie")){
			pizza = new VeggiePizze();
		}
		return pizza;
		
	}

}
```
### 抽象披萨类

```java
public abstract class  Pizza {
	public abstract void prepare();
	
	public abstract void bak();
	
	public abstract void cut();
	
	public abstract void box();

}
```
### 具体披萨CheesePizza

```java
public class CheesePizza extends Pizza{

	@Override
	public void prepare() {
		System.out.println("CheesePizza披萨正在准备");
	}

	@Override
	public void bak() {
		System.out.println("CheesePizza披萨正在烘烤");
	}

	@Override
	public void cut() {
		System.out.println("CheesePizza披萨正在切片");
	}

	@Override
	public void box() {
		System.out.println("CheesePizza披萨正在装盒");
	}

}
```
### 具体披萨ClamPizza

```java
public class ClamPizza extends Pizza{
	@Override
	public void prepare() {
		System.out.println("ClamPizza披萨正在准备");
	}

	@Override
	public void bak() {
		System.out.println("ClamPizza披萨正在烘烤");
	}

	@Override
	public void cut() {
		System.out.println("ClamPizza披萨正在切片");
	}

	@Override
	public void box() {
		System.out.println("ClamPizza披萨正在装盒");
	}
}
```
### 具体披萨PepperoniPizza

```java
public class PepperoniPizza extends Pizza{
	@Override
	public void prepare() {
		System.out.println("PepperoniPizza披萨正在准备");
	}

	@Override
	public void bak() {
		System.out.println("PepperoniPizza披萨正在烘烤");
	}

	@Override
	public void cut() {
		System.out.println("PepperoniPizza披萨正在切片");
	}

	@Override
	public void box() {
		System.out.println("PepperoniPizza披萨正在装盒");
	}
}
```
### 具体披萨VeggiePizze

```java
public class VeggiePizze extends Pizza{
	@Override
	public void prepare() {
		System.out.println("VeggiePizze披萨正在准备");
	}

	@Override
	public void bak() {
		System.out.println("VeggiePizze披萨正在烘烤");
	}

	@Override
	public void cut() {
		System.out.println("VeggiePizze披萨正在切片");
	}

	@Override
	public void box() {
		System.out.println("VeggiePizze披萨正在装盒");
	}
}
```
### 披萨商店类

```java
public class PizzaStore {
	SimplyPizzaFactory factory;
	
	public PizzaStore(SimplyPizzaFactory factory) {
		this.factory = factory;
	}
	
	public Pizza orderPizza(String type){
		Pizza pizza;
		pizza = factory.createPizza(type);//采用工厂对象的创建方法实例化
		pizza.prepare();
		pizza.bak();
		pizza.cut();
		pizza.box();
		return pizza;
	}
}
```
### 总结
- 普通工厂模式实现了对责任的分割，提供了专门的工厂用于创建对象。
- 客户端不需要知道所创建的具体产品的类名，只要知道产品类对应的编号即可。
- 要点就是当你需要什么，只需要传入一个正确的参数就可以，不需要关心它具体的实现细节。
- 如果产品过多就会导致工厂类的代码十分的复杂。





