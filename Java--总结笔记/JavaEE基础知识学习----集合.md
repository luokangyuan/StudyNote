## 集合
* 首相明确的是java是一门面向对象的语言，在Java中，对事物的体现都是以对象的形式，为了方便对多个对象进行操作，就有了要对对象进行存储的要求，于是就有了集合的概念，java集合就像是一种容器，可以动态的将多个对象的引用存放在java集合这个容器当中。
* java集合类可以存储数量不等的多个对象，还可以用于保存具有映射关系的关联数组。
* 在编写java程序的中，集合是每时每刻都在使用，例如常用的ArrayList，HashMap，HashSet，也有不常用的Stack，Queue,有线程安全的Vector,HashTable也有线程不安全的LinkedList，TreeMap。
* 说到存储对象，除了集合可以存储对象，数组也可以存储对象，但是数组存储对象有如下弊端：
##### 1.数组长度一旦初始化就不可改变，存储对象的个数就不能改变
##### 2.数组中真实存储的对象的个数也没有现成方法可用
### Java集合概述
Java集合可分为Collection和Map两种体系，具体的要自己看源码，其中Collection和Map如下；

![](https://i.imgur.com/olKAzTI.png)![](https://i.imgur.com/rxIrmPY.png)
在Collection体系中，存在了Iterator迭代器和Comparable，Comparator对象排序接口
### Collection接口
* Collection接口是最基本的集合接口，它不提供直接的实现，而是由子接口来提供实现，它是List，Set和Queue的父接口，
* Set是元素无序，不可重复的接口
* List是元素有序，可重复的接口
#### Collection常用方法
> 注意：这里集合的创建使用了java中的泛型。
##### 1.size();返回集合中元素个数
```java
Collection<String> collection = new ArrayList<String>();
int size = collection.size();
```
##### 2.add("AA");向集合中添加元素
```java
Collection<String> collection = new ArrayList<String>();
collection.add("AA");
```
##### 3.addAll(List);向集合中添加一个集合中的全部元素
```java
Collection<String> collection = new ArrayList<String>();
Collection<String> List = Arrays.asList("AA","BB","CC");
collection.addAll(List);
```
##### 4.isEmpty();判断集合是否为空
```java
Collection<String> collection = new ArrayList<String>();
boolean empty = collection.isEmpty();
```
##### 5.clear();清空集合元素
```java
Collection<String> collection = new ArrayList<String>();
collection.clear();
```
#### 注意：以下方法都依赖与对象的equals方法。
##### 6.contains("AA");查看集合中是否包含某一个元素，返回一个布尔类型的值
```java
Collection<String> collection = new ArrayList<String>();
collection.add("AA");
collection.add("BB");
collection.add("CC");
boolean contains = collection.contains("AA");
```
关于这个contains方法需要仔细对待，上述代码没什么问题，现在集合中存入对象，如下
```java
public class TestCollection {
	public static void main(String[] args) {
		Collection<Person> collection = new ArrayList<Person>();
		Person person = new Person("AA", 12);
		collection.add(person);
		boolean contains = collection.contains(person);
		System.out.println(contains);
	}
	
}
class Person{
	String name;
	int age;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
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
上述代码是collection.add(person);这样返回的是true，
```java
Collection<Person> collection = new ArrayList<Person>();
collection.add(new Person("AA", 12));
boolean contains = collection.contains(new Person("AA", 12));
System.out.println(contains);
```
如果这样写就会返回false，这是因为两个对象的引用不一样，如果想两个对象的值一样就返回true的话，那么Person类就重写equals方法，如下：
```java
public class TestCollection {
	public static void main(String[] args) {
		Collection<Person> collection = new ArrayList<Person>();
		collection.add(new Person("AA", 12));
		boolean contains = collection.contains(new Person("AA", 12));
		System.out.println(contains);
	}
}
class Person{
	String name;
	int age;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public Person(String name, int age) {
		super();
		this.name = name;
		this.age = age;
	}
	public Person() {
		super();
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Person other = (Person) obj;
		if (age != other.age)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
}
```
###### 一般而言集合中的对象元素都应该重写equals方法。
##### 7.containsAll(list);当前集合是否包含list中的所有元素，只有全部包含才返回true
```java
public static void main(String[] args) {
	Collection<Person> collection = new ArrayList<Person>();
	collection.add(new Person("AA", 12));
	collection.add(new Person("BB", 13));
	collection.add(new Person("CC", 14));
	Collection<Person> list = new ArrayList<Person>();
	list.add(new Person("AA", 12));
	list.add(new Person("BB", 13));
	boolean containsAll = collection.containsAll(list);
	System.out.println(containsAll);
}
```
##### 8.retainAll(list);求当前集合与形参集合所共有的元素，并返回给当前集合，简单说就是将当前集合中与形参集合一样的元素移除。
```java
public static void main(String[] args) {
		Collection<Person> collection = new ArrayList<Person>();
		collection.add(new Person("AA", 12));
		collection.add(new Person("BB", 13));
		collection.add(new Person("CC", 14));
		Collection<Person> list = new ArrayList<Person>();
		list.add(new Person("AA", 12));
		list.add(new Person("BB", 13));
		boolean retainAll = collection.retainAll(list);
		System.out.println(collection);
}
```
##### 9.remove(new Person("DD", 12));删除集合中某一个元素，删除成功返回true，否则false，这里返回false。
```java
public static void main(String[] args) {
	Collection<Person> collection = new ArrayList<Person>();
	collection.add(new Person("AA", 12));
	collection.add(new Person("BB", 13));
	collection.add(new Person("CC", 14));
	Collection<Person> list = new ArrayList<Person>();
	list.add(new Person("AA", 12));
	list.add(new Person("BB", 13));
	boolean remove = collection.remove(new Person("DD", 12));
	System.out.println(remove);
}
```
##### 10.removeAll(list);在当前集合中产出包含形参的元素。
```java
public static void main(String[] args) {
	Collection<Person> collection = new ArrayList<Person>();
	collection.add(new Person("AA", 12));
	collection.add(new Person("BB", 13));
	collection.add(new Person("CC", 14));
	Collection<Person> list = new ArrayList<Person>();
	list.add(new Person("AA", 12));
	list.add(new Person("BB", 13));
	boolean removeAll = collection.removeAll(list);
	System.out.println(removeAll);
	System.out.println(collection);
}
```
##### 11.equals(list);判断当前集合是否与形参集合完全相同，这里返回true,
```java
public static void main(String[] args) {
	Collection<Person> collection = new ArrayList<Person>();
	collection.add(new Person("AA", 12));
	collection.add(new Person("BB", 13));
	collection.add(new Person("CC", 14));
	Collection<Person> list = new ArrayList<Person>();
	list.add(new Person("AA", 12));
	list.add(new Person("BB", 13));
	list.add(new Person("CC", 14));
	boolean equals = collection.equals(list);
	System.out.println(equals);
}
```
同样的代码，顺序不一样，返回的结果也就不一样，这里返回false，只是交换了想集合中存储对象的顺序。
```java
public static void main(String[] args) {
	Collection<Person> collection = new ArrayList<Person>();
	collection.add(new Person("AA", 12));
	collection.add(new Person("BB", 13));
	collection.add(new Person("CC", 14));
	Collection<Person> list = new ArrayList<Person>();
	list.add(new Person("AA", 12));
	list.add(new Person("CC", 14));
	list.add(new Person("BB", 13));
	boolean equals = collection.equals(list);
	System.out.println(equals);
}
```
##### 12.toArray();将集合装换为数组。
```java
public static void main(String[] args) {
	Collection<Person> list = new ArrayList<Person>();
	list.add(new Person("AA", 12));
	list.add(new Person("CC", 14));
	list.add(new Person("BB", 13));
	Object[] array = list.toArray();
	for(int i = 0; i<array.length; i++){
		System.out.println(array[i]);
	}
}
```
##### 13.iterator();返回一个Iterator接口实现类，实现集合遍历
```java
public static void main(String[] args) {
	Collection<Person> list = new ArrayList<Person>();
	list.add(new Person("AA", 12));
	list.add(new Person("CC", 14));
	list.add(new Person("BB", 13));
	Iterator<Person> iterator = list.iterator();
	while(iterator.hasNext()){
		System.out.println(iterator.next());
	}
}
```
### 说到遍历就顺便学了遍历集合的三种方式
#### 1.for循环
```java
public static void main(String[] args) {
	List<Person> list = new ArrayList<Person>();
	list.add(new Person("AA", 12));
	list.add(new Person("CC", 14));
	list.add(new Person("BB", 13));
	for(int i = 0 ; i <list.size(); i++){
		Person person = list.get(i);
		System.out.println(person);
	}
}
```
### 注意：Collection没有get方法，意味着不能使用for遍历，可以使用迭代器进行遍历。
#### 2.增强for循环
```java
public static void main(String[] args) {
	List<Person> list = new ArrayList<Person>();
	list.add(new Person("AA", 12));
	list.add(new Person("CC", 14));
	list.add(new Person("BB", 13));
	for (Person person : list) {
		System.out.println(person);
	}
}
```
### 注意：增强for循环没有index,如果需要使用就要在外部定义，如下：
```java
public static void main(String[] args) {
	List<Person> list = new ArrayList<Person>();
	list.add(new Person("AA", 12));
	list.add(new Person("CC", 14));
	list.add(new Person("BB", 13));
	int index = 0;
	for (Person person : list) {
		System.out.println("index=="+index+"========="+person);
		index++;
	}
}
```
#### 3.iterator迭代器遍历
```java
public static void main(String[] args) {
	Collection<Person> list = new ArrayList<Person>();
	list.add(new Person("AA", 12));
	list.add(new Person("CC", 14));
	list.add(new Person("BB", 13));
	Iterator<Person> iterator = list.iterator();
	while(iterator.hasNext()){
		System.out.println(iterator.next());
	}
}
```
### Collection和collections的区别
* Collection是一个接口，他是Set、List等容器的父接口。
* Collections是一个工具类，提供了一系列的静态方法来辅助容器操作，这些方法包括对容器的搜索，排序等，具体参考API
