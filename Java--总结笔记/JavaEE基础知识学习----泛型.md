## 泛型
Java泛型是jdk1.5的一个新特性，jdk的性特性还包括：泛型，枚举，装箱和拆箱，可变参数等。这里先主要学习泛型。这些特性，现在都在广泛的使用。因为现在使用IDE编写代码，都是标准的代码提示，所以泛型也就变得理所应当，但还是应该学习记录一下。
### 泛型的声明
interface List<T>和class 名称<K,V>,其中T,K,V代表的是类型。例如
```java
List<String> list = new ArrayList<String>();
Inerator<Customer> iterator = customers.iterator();
```
#### 说明：T只能是类，不能是基本数据类型
### 为什么要有这个新特性

```java
public static void main(String[] args) {
	List list = new ArrayList();
	list.add(12);
	list.add(23);
	list.add(45);
	list.add(65);
	list.add(new String("AA"));
	for(int i = 0 ; i < list.size(); i++){
		int age = (Integer)list.get(i);
		System.out.println(age);
	}
}
```
上述代码就是用一个集合存储年龄，如果不使用泛型的话就是任何元素就都可添加到集合中，导致类型不安全，其次在遍历的时候需要强转，如果不小心在Integer类型的集合中放入一个String类型的，那么在遍历就会出现一个类型转换异常。

* 为了解决元素存储的安全性问题
* 解决获取数据元素时，需要类型强转的问题，例如

String类型的对象→集合Object类型对象→读取为Object对象→强转为String对象，集合使用Object类型会导致类型不安全，简单说就是任何元素都可以添加进去。

### 使用泛型
集合中使用泛型可以达到类型安全，读取出来的对象不需要强转，使得程序简单快捷。
同上的代码，如果集合的声明为：

```java
List<String> list = new ArrayList<String>();
```
使用泛型声明集合，就只能向集合添加相同类型的数据，在遍历的数据类型也是声明泛型的类型，不需要再强转。下面是使用泛型的一个例子。

```java
public static void main(String[] args) {
	Map<String, Integer> map = new HashMap<String, Integer>();
	map.put("AA", 98);
	map.put("BB", 86);
	map.put("CC", 75);
	map.put("DD", 62);
	Set<Map.Entry<String, Integer>> set = map.entrySet();
	for(Map.Entry<String, Integer> o: set){
		System.out.println(o.getKey()+"===="+o.getValue());
	}
}
```
#### List源码解释泛型
1.为什么List接口可以使用泛型，源码如下：

```java
public interface List<E> extends Collection<E> {
```
其中<E>代表的就是泛型，再看里面的方法，

```java
 boolean add(E e);
 E get(int index);
```
其中的方法都是传入泛型的对象，得到的也是泛型的对象。
### 自定义泛型类，泛型方法
当实例化泛型类的对象时，明确指明泛型的类型，自定义泛型类的类中所有使用泛型的位置，都变成实例化中指定的泛型的类型。例如如下自定义泛型类：

```java
public class TestGeneric<T> {
	private String name;
	private String sex;
	private T t;
	List<T> list = new ArrayList<>();
	public void add(){
		list.add(t);
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public T getT() {
		return t;
	}
	public void setT(T t) {
		this.t = t;
	}
	public static void main(String[] args) {
		TestGeneric<String> generic = new TestGeneric<String>();
		generic.setT("AA");
		generic.add();
		List<String> list = generic.list;
		System.out.println(list);
		
	}
}
```
泛型的更多使用是为了代码的通用性。在使用jdbc编写查询数据的DAO就可以使用泛型来编写通用的父类DAO。让子类继承来决定类型。
对于集合类的泛型需要注意以下几点：
* 对象实例化不指定泛型，默认为Object
* 泛型不同的引用不能相互赋值
* 加入集合中的对象类型必须和指定的泛型类型保持一致
* 静态方法中不能使用泛型
* 如果泛型类是一个接口或抽象类，则不可以创建泛型类的对象