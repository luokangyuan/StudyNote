###Java数据结构
Java中的数据结构主要分为Collection和map两个接口（接口只提供抽象方法，并不提供实现），程序中主要使用的是数据结构是这两个接口的主要实现类。
Java中的数据结构关系如下图所示
![](https://i.imgur.com/UyYCqRA.png)
###List：有序的可重复的Collection
使用此接口能够精确的控制每一个元素插入的位置，可以通过索引来访问List中的元素。

1. ArrayList采用数组实现，数组的访问速度要比链表快，所以ArrayList更适合查询操作，
2. LinkedList采用链表实现，随机插入和删除的效率要高于数组，
3. Vector是一种古老的实现类，采用数组的实现，内部方法使用了Sychronized关键字，是线程安全的。

List相关知识总结如下：
![](https://i.imgur.com/WBcFZ48.jpg)
###Map：‘键值’对映射的抽象接口，不包括重复的键。
1. HashMap：是基于‘拉链法’实现的散列表，底层采用数组+链表实现，一般用于单线程
2. HashTable：基于‘拉链法’实现的散列表，一般用于多线程
3. TreeMap：有序散列表，底层通过红黑树实现。

Map相关知识总结如下：
![](https://i.imgur.com/ilDYtjy.jpg)
Java数据结构的详细信息可以参考我写的其他博客。


