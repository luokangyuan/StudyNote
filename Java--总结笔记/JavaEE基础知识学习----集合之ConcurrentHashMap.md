## ConcurrentHashMap基本知识
### 概述
* ConcurrentHashMap是map接口的实现类，因为HashMap是线程不安全的，因此ConcurrentHashMap可以看成是HashMap的线程安全版本。
* 线程安全的有ConcurrentHashMap，ConcurrentSkipListMap，HashTable，Properties，但是HashTable是过时的类库，所以在并发中使用最多的是是ConcurrentHashMap和ConcurrentSkipListMap。
* ConcurrentHashMap在并发的开发中使用频率高，所以他的主要方法和HashMap基本一样。
## ConcurrentHashMap实现原理
### 概述
* ConcurrentHashMap是由Segment数组和HashEntry数组组成，
* Segment的结构和HashMap差不多，是数组和链表结合的数组结构，Segment是一种可重入锁，在ConcurrentHaspMap中就是锁的角色，
* HashEntry是存放键值对数据，在源码中我们可以出一个Segment中包含一个HashEntry，
* 换句话说，一个Segment守护一个HashEntry，当我们要对HashEntry中的数据进行修改时，首先要获得HashEntry数据所对应的Segment锁。
### 源码分析如下
```java
public class ConcurrentHashMap<K, V> extends AbstractMap<K, V>
    implements ConcurrentMap<K, V>, Serializable {
```
* 源码中可以看出ConcurrentHashMap继承了AbstractMap这个类，实现了ConcurrentMap和Serializable这两个接口，说明这个类具备了Map基本的骨干方法。
### 1.构造方法
#### 1.ConcurrentHashMap() 
创建一个带有默认初始容量 (16)、加载因子 (0.75) 和 concurrencyLevel (16) 的新的空映射。
#### 2.ConcurrentHashMap(int initialCapacity)
创建一个带有指定初始容量、默认加载因子 (0.75) 和 concurrencyLevel (16) 的新的空映射。
#### 3.ConcurrentHashMap(int initialCapacity, float loadFactor)
创建一个带有指定初始容量、加载因子和默认 concurrencyLevel (16) 的新的空映射。
#### 4.ConcurrentHashMap(int initialCapacity, float loadFactor, int concurrencyLevel)
创建一个带有指定初始容量、加载因子和并发级别的新的空映射。
#### 5.ConcurrentHashMap(Map<? extends K,? extends V> m) 
构造一个与给定映射具有相同映射关系的新映射
### 2.属性
ConcurrentHashMap使用segments数组来保存锁，源码如下：
```java
	final Segment<K,V>[] segments;
```
ConcurrentHashMap完全允许多个读操作并发进行，读操作并不需要加锁，在ConcurrentHashMap中保证HashEntry几乎不可变，使用final关键字。源码如下：
```java
	static final class HashEntry<K,V> {
        final int hash;
        final K key;
        volatile V value;
        volatile HashEntry<K,V> next;
```
### 3.如何初始化segments数组
```java
    public ConcurrentHashMap(int initialCapacity,
                            float loadFactor, int concurrencyLevel) {
    if (!(loadFactor > 0) || initialCapacity < 0 || concurrencyLevel <= 0)
        throw new IllegalArgumentException();
    if (concurrencyLevel > MAX_SEGMENTS)
        concurrencyLevel = MAX_SEGMENTS;
    int sshift = 0;
    int ssize = 1;
    while (ssize < concurrencyLevel) {
        ++sshift;
        ssize <<= 1;
    }
    this.segmentShift = 32 - sshift;
    this.segmentMask = ssize - 1;
    if (initialCapacity > MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;
    int c = initialCapacity / ssize;
    if (c * ssize < initialCapacity)
        ++c;
    int cap = MIN_SEGMENT_TABLE_CAPACITY;
    while (cap < c)
        cap <<= 1;
    Segment<K,V> s0 =
        new Segment<K,V>(loadFactor, (int)(cap * loadFactor),
                            (HashEntry<K,V>[])new HashEntry[cap]);
    Segment<K,V>[] ss = (Segment<K,V>[])new Segment[ssize];
    UNSAFE.putOrderedObject(ss, SBASE, s0);
    this.segments = ss;
}
```
说明：
* 构造方法中initialCapacity代表数组容量，loadFactor代表负载因子，concurrencyLevel代表并发级别。
* segment数组是ConcurrentHashMap保存锁的数组，segment数组的初始化由段偏移量segmentShift，段掩码segmentmask和HashEntry数组组成。
* segment数组的长度ssize通过concurrencyLevel计算得出，为了通过按位与的哈希算法类定位segment的索引，就必须保证segment数组的长度是2的N次方，所以必须计算出一个大于或等于concurrencyLevel的最小的2的n次方值来作为segment数组的长度，concurrencyLevel的最大并发级别是655535，所以segment数组的最大长度为66636.对应的二进制是16位。
