## HashMap基本知识
### 概述
* Map与Collection并列存在，Map用于保存具有映射关系的数据。
* Map中的key和value都是可以是任何引用类型的数据。key和value存在单向一对一的关系。
* Map接口的实现类有HashTable，HashMap等。
* 常用String类来作为Map中的key。
* HashMap是Map接口的实现类，继承了AbstractMap类，以key-value的形式存在，系统根据hash算法来计算key-value的存储位置。
* HashMap中key用Set来存放，key不允许重复，value是用Collection存放，可重复，一个key-value对，就是一个Entry,所有的Entry是用Set存放，不可重复。
* 如果key用自定义的类，那么自定义的类就必须重写equals方法和hashCode方法。
### 使用方法
```java
HashMap<String,Object> hashMap = new HashMap<String, Object>();
```
说明：hashMap这个map的key是String类型的，value是Object类型的。
### 常用方法
#### 1.Object put(Object key,Object value);添加方法
```java
public static void main(String[] args) {
	HashMap<Object,Object> hashMap = new HashMap<Object, Object>();
	hashMap.put("AA", "张三");
	hashMap.put(null, null);
	hashMap.put(new Person("孙悟空", 5000), "美猴王");
	hashMap.put(new Person("孙悟空", 5000), "七天大圣");
	System.out.println(hashMap);
}
```
#### 说明：
* HashMap可以放入null的键值对。
* HashMap的key是不允许重复的，如果用自定义的类做key,那么就必须重写equals和hashCode方法。
* 如果添加两个相同的key,后面的会替换前面的。
#### 2.Object remove(Object key);移除方法
```java
public static void main(String[] args) {
	HashMap<String,Object> hashMap = new HashMap<String, Object>();
	hashMap.put("AA", new Person("张三", 12) );
	hashMap.put("BB", new Person("李四", 13));
	hashMap.remove("BB");
	System.out.println(hashMap);
}
```
#### 3.void putAll(Map t);添加一个map
```java
public static void main(String[] args) {
	HashMap<String,Object> hashMap = new HashMap<String, Object>();
	hashMap.put("AA", new Person("张三", 12) );
	hashMap.put("BB", new Person("李四", 13));
	HashMap<String,Object> hashMap2 = new HashMap<String, Object>();
	hashMap2.put("CC", new Person("孙悟空", 500));
	hashMap2.put("DD", new Person("嫦娥", 700));
	hashMap.putAll(hashMap2);
	System.out.println(hashMap);
}
```
#### 4.void clear();清除数据
```java
public static void main(String[] args) {
	HashMap<String,Object> hashMap = new HashMap<String, Object>();
	hashMap.put("AA", new Person("张三", 12) );
	hashMap.put("BB", new Person("李四", 13));
	hashMap.clear();
	System.out.println(hashMap);
}
```
#### 5.Object get(Object key);根据key取出value
```java
public static void main(String[] args) {
	HashMap<String,Object> hashMap = new HashMap<String, Object>();
	hashMap.put("AA", new Person("张三", 12) );
	hashMap.put("BB", new Person("李四", 13));
	Person person = (Person) hashMap.get("AA");
	System.out.println(person.name);
}
```
#### 6.boolean containsKey(Object key);是否包含这个key，这里返回false。
```java
public static void main(String[] args) {
	HashMap<String,Object> hashMap = new HashMap<String, Object>();
	hashMap.put("AA", new Person("张三", 12) );
	hashMap.put("BB", new Person("李四", 13));
	boolean containsKey = hashMap.containsKey("aa");
	System.out.println(containsKey);
}
```
#### 7.boolean containsValue(Object value);HasHMap是否包含这个value
```java
public static void main(String[] args) {
	HashMap<String,Object> hashMap = new HashMap<String, Object>();
	hashMap.put("AA", new Person("张三", 12) );
	hashMap.put("BB", new Person("李四", 13));
	hashMap.put("CC", new Person("李四", 14));
	boolean containsValue = hashMap.containsValue(new Person("李四", 14));
	System.out.println(containsValue);
}
```
#### 说明：
> 自定义类做key就必须重写equals方法，这里如果不重写就返回false，否则就返回true。
#### 8.int size();输出HashMap中键值对的个数。
```java
public static void main(String[] args) {
	HashMap<String,Object> hashMap = new HashMap<String, Object>();
	hashMap.put("AA", new Person("张三", 12) );
	hashMap.put("BB", new Person("李四", 13));
	hashMap.put("BB", new Person("李四", 13));
	hashMap.put(null, null);
	int size = hashMap.size();
	System.out.println(size);
}
```
#### 说明：
这里是3，其中hashMap.put("BB", new Person("李四", 13));重复添加。
#### 9.boolean isEmpty();判断HashMap是否为空
```java
public static void main(String[] args) {
	HashMap<Object,Object> hashMap = new HashMap<Object, Object>();
	hashMap.put("AA", "张三");
	hashMap.put(null, null);
	hashMap.isEmpty();
	System.out.println(hashMap);
}
```
#### 10.boolean equals(Object obj);比较两个Map是否相同
```java
public static void main(String[] args) {
	HashMap<Object,Object> hashMap = new HashMap<Object, Object>();
	hashMap.put("AA", new Person("张三",12));
	hashMap.put("BB", new Person("李四",13));
	HashMap<Object,Object> hashMap2 = new HashMap<Object, Object>();
	hashMap2.put("AA", new Person("张三",12));
	boolean equals = hashMap.equals(hashMap2);
	System.out.println(equals);
}
```
#### 11.Set keySet();遍历HashMap中的所有Key
```java
public static void main(String[] args) {
	HashMap<Object,Object> hashMap = new HashMap<Object, Object>();
	hashMap.put("AA", new Person("张三",12));
	hashMap.put("BB", new Person("李四",13));
	hashMap.put("CC", new Person("王五",14));
	hashMap.put("DD", new Person("陈六",14));
	Set<Object> entrySet = hashMap.keySet();
	for (Object entry : entrySet) {
		System.out.println(entry);
	}
}
```
#### 12.Collection values();遍历HashMap中的value
```java
public static void main(String[] args) {
	HashMap<Object,Object> hashMap = new HashMap<Object, Object>();
	hashMap.put("AA", new Person("张三",12));
	hashMap.put("BB", new Person("李四",13));
	hashMap.put("CC", new Person("王五",14));
	hashMap.put("DD", new Person("陈六",14));
	Collection<Object> values = hashMap.values();
	//values的遍历方式一
	for (Object object : values) {
		System.out.println(object);
	}
	//values的遍历方式二
	Iterator<Object> iterator = values.iterator();
	while(iterator.hasNext()){
		System.out.println(iterator.next());
	}
}
```
#### 13.Set entrySet();遍历HashMap的键值对
```java
public static void main(String[] args) {
	HashMap<Object,Object> hashMap = new HashMap<Object, Object>();
	hashMap.put("AA", new Person("张三",12));
	hashMap.put("BB", new Person("李四",13));
	hashMap.put("CC", new Person("王五",14));
	hashMap.put("DD", new Person("陈六",14));
	Set<Entry<Object,Object>> entrySet = hashMap.entrySet();
	for (Entry<Object, Object> entry : entrySet) {
		System.out.println(entry);
	}
}
```
### 小结
* HashMap 判断两个 key 相等的标准是：两个 key 通过 equals() 方法返回 true，hashCode 值也相等。
* HashMap 判断两个 value相等的标准是：两个 value 通过 equals() 方法返回 true。
## HashMap底层实现原理
在HashMap的源码中我们可以看出HashMap是一个数组和链表结合的一种数据结构，
### 1.HashMap属性
```java
transient Entry[] table;
static class Entry<K,V> implements Map.Entry<K,V> {
	final K key;
	V value;
	Entry<K,V> next;
	final int hash;
```
可以看出，HashMap底层是一个数组，数据中的每一个元素就是Entry类型，Entry又是一个链表结构。
### 2.HashMap构造方法
```java
//构建一个初始容量为16，负载因子为0.75的HashMap。
	public HashMap() {
	this.loadFactor = DEFAULT_LOAD_FACTOR;
	threshold = (int)(DEFAULT_INITIAL_CAPACITY * DEFAULT_LOAD_FACTOR);
	table = new Entry[DEFAULT_INITIAL_CAPACITY];
	init();
}
//构建一个指定容量和负载因子的HashMap
	public HashMap(int initialCapacity, float loadFactor) {
	if (initialCapacity < 0)
		throw new IllegalArgumentException("Illegal initial capacity: " +
											initialCapacity);
	if (initialCapacity > MAXIMUM_CAPACITY)
		initialCapacity = MAXIMUM_CAPACITY;
	if (loadFactor <= 0 || Float.isNaN(loadFactor))
		throw new IllegalArgumentException("Illegal load factor: " +
											loadFactor);

	// Find a power of 2 >= initialCapacity
	int capacity = 1;
	while (capacity < initialCapacity)
		capacity <<= 1;

	this.loadFactor = loadFactor;
	threshold = (int)(capacity * loadFactor);
	table = new Entry[capacity];
	init();
}
```
#### 说明：
* HashMap的容量就是底层table数组的长度。
* 负载因子：散列表的实际元素数目/散列表的容量，负载因子衡量的是一个散列表的空间使用程度，值越大代表装填程度越高，反之越小，如果负载因子越大代表空间利用充分，但是查询，搜索效率就降低，过小，空间利用率就降低，
### 3.添加数据方法
```java
	public V put(K key, V value) {
	//判断key是否为空
	if (key == null)
		return putForNullKey(value);
	//根据key的hashcode值来计算hash值。
	int hash = hash(key.hashCode());
	int i = indexFor(hash, table.length);
	//如果索引i出的Entry不为null，通过循环遍历e的下一个元素
	for (Entry<K,V> e = table[i]; e != null; e = e.next) {
		Object k;
		if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
			V oldValue = e.value;
			e.value = value;
			e.recordAccess(this);
			return oldValue;
		}
	}
	//如果索引i出的Entry为null,说明此处没有Entry
	modCount++;
	//将key-value放在次索引处
	addEntry(hash, key, value, i);
	return null;
}
	//如果key为空就将value放在数组的第一个位置
	private V putForNullKey(V value) {
	for (Entry<K,V> e = table[0]; e != null; e = e.next) {
		if (e.key == null) {
			V oldValue = e.value;
			e.value = value;
			e.recordAccess(this);
			return oldValue;
		}
	}
	modCount++;
	addEntry(0, null, value, 0);
	return null;
}
//计算hashcode的
	public final int hashCode() {
		return (key==null   ? 0 : key.hashCode()) ^
				(value==null ? 0 : value.hashCode());
	}
//计算hash值的
static int hash(int h) {
	h ^= (h >>> 20) ^ (h >>> 12);
	return h ^ (h >>> 7) ^ (h >>> 4);
}
//搜索指定Hash在对应table中的索引
	static int indexFor(int h, int length) {
	return h & (length-1);
}
//根据hash值，将key-value放在数组table的索引i位置上。
void addEntry(int hash, K key, V value, int bucketIndex) {
	//获取指定bucketIndex索引处的Entry
	Entry<K,V> e = table[bucketIndex];
	//将新创建的Entry放入bucketIndex索引位置，并让新的Entry指向原来的Entry。
	table[bucketIndex] = new Entry<>(hash, key, value, e);
	//如果数组长度不够，就扩容
	if (size++ >= threshold)
	//将table数组的长度扩展到原来的2倍
	resize(2 * table.length);
}
```
#### 说明：
> &是与运算符，将int转为二进制，只有两个位都是1，结果才是1。
#### 小结：
从上面的源码可以看出，当我们向HashMap中添加一个元素时，先根据key的hashCode重新计算hash值，根据这个hash值得到这个元素在数组中的位置，也就是数组的下标，如果这个位置已经存放了其他元素，那么他就会以链表的方式存放，新加入的放在链头，最先加入的放在链尾，如果数组上该位置没有元素，就直接放到该位置上。
### 4.读取数据
```java
public V get(Object key) {
if (key == null)
	return getForNullKey();
int hash = hash(key.hashCode());
for (Entry<K,V> e = table[indexFor(hash, table.length)];
		e != null;
		e = e.next) {
	Object k;
	if (e.hash == hash && ((k = e.key) == key || key.equals(k)))
		return e.value;
}
return null;
}
```
#### 小结：
当我们从HashMap中读取一个元素时，首先判断key是否为空，不为空就根据key计算hash值，根据hash值找到数组中对应位置的元素，然后通过key的equals方法，在对应位置的链表中找到需要元素的值。
##HashMap 总结
* HashMap是数组和链表的结合体，允许插入null的key和value。
* HashMap是线程不安全的，采用Fail-Fast机制。
* HashMap进行数组扩容时，需要重新计算每个元素在数组中的位置，耗性能。