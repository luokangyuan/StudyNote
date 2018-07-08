## LinkList
### 概述
LinkList是List接口的实现类，与ArrayList不同的是，ArrayList采用的是大小可变的数组实现，LinkList采用的是双向链表的实现方式，基于链表的实现方式使得在插入和删除是比ArrayList要好一些，但是随机访问则数组要好一些。
### 实现原理（源码分析）
#### 实现原理要点概括
1.LinkList采用的是双向链表非同步的方式实现，允许null在内的所有元素。
##### LinkList类的定义
```java
public class LinkedList<E>
extends AbstractSequentialList<E>
implements List<E>, Deque<E>, Cloneable, java.io.Serializable{}
```
从上面的代码可以看出一下几点；
* LinkList继承了AbstractSequentialList的双向链表，这个和ArrayList不同 ArrayList继承的是AbstractList。
* LinkList实现了List接口，能对它进行队列操作。
* LinkList实现了Deque接口，表明可以用作双向队列操作。
* LinkList实现了Cloneable接口，表明可以实现克隆操作。
* Linklist实现了Serializable接口，表明支持序列化，可以通过序列化传输。
`继承AbstractSequentialList的必然性`

AbstractSequentialList的源码如下：
```java
public abstract class AbstractSequentialList<E> extends AbstractList<E> {
```
可以看出AbstractSequentialList这个类是一个抽象类，而且也继承了AbstractList类，再看里面的方法，如下：
```java
	 public E get(int index) {
        try {
            return listIterator(index).next();
        } catch (NoSuchElementException exc) {
            throw new IndexOutOfBoundsException("Index: "+index);
        }
    }
	
	 public E set(int index, E element) {
        try {
            ListIterator<E> e = listIterator(index);
            E oldVal = e.next();
            e.set(element);
            return oldVal;
        } catch (NoSuchElementException exc) {
            throw new IndexOutOfBoundsException("Index: "+index);
        }
    }

	 public void add(int index, E element) {
        try {
            listIterator(index).add(element);
        } catch (NoSuchElementException exc) {
            throw new IndexOutOfBoundsException("Index: "+index);
        }
    }

	 public E remove(int index) {
        try {
            ListIterator<E> e = listIterator(index);
            E outCast = e.next();
            e.remove();
            return outCast;
        } catch (NoSuchElementException exc) {
            throw new IndexOutOfBoundsException("Index: "+index);
        }
    }
```
从上述代码可以看出，AbstractSequentialList类实现了这个操作集合的基本也是骨干的方法，LinkList是双向链表，他继承了AbstractSequentialList这个类，就相当于已经实现了这些方法。
##### 双向链表
因为我还是小白，对于数据结构方面的知识，还有很多不知道，简单说说什么是链表吧，
* 链表：链式存储的线性表，简称链表，链表由多个链表元素组成，这些元素称之为节点，节点之间通过逻辑连接，形成链式存储结构。
* 链表分为两个域：值域和链域，值域用来存放节点的值，链域用来存放下一个节点的地址或位置。

![](https://i.imgur.com/Fsr4kCJ.png)

双向链表中的节点，保存业务数据和前一个节点信息和后一个节点信息，如下：

![](https://i.imgur.com/AWQnjTz.png)
##### LinkList类属性
```java
transient int size = 0;
transient Node<E> first;
transient Node<E> last;
```
first是双向链表的头结点，last是尾节点，size是双向链表中节点实例的个数。其中Node类如下：
```java
private static class Node<E> {
    E item;
    Node<E> next;
    Node<E> prev;

    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }
}
```
Node节点类很简单，item存放数据，next和prev分别存放前后节点信息。
##### LinkList构造器方法
```java
public LinkedList() {}
    public LinkedList(Collection<? extends E> c) {
    this();
    addAll(c);
}
```
##### LinkList集合中添加单一元素
向LinkList中添加元素，调用add(E e);方法，源码如下：
```java
public boolean add(E e) {
    linkLast(e);
    return true;
}
void linkLast(E e) {
final Node<E> l = last;
final Node<E> newNode = new Node<>(l, e, null);
last = newNode;
if (l == null)
    first = newNode;
else
    l.next = newNode;
size++;
modCount++;
}
```
源码分析：调用add(E e)方法添加元素，方法中调用linkLast(E e)方法，得到当前集合的最后节点，再创建一个新的节点，创建节点的方法，如下：
```java
Node(Node<E> prev, E element, Node<E> next) {
    this.item = element;
    this.next = next;
    this.prev = prev;
}
```
将最后节点改为型创建的节点，在判断添加元素之前的末尾节点是否为空，不为空，就指向新节点，同时将节点实例个数加1。
##### LinkList集合移除指定元素
```java
public E remove(int index) {
    checkElementIndex(index);
    return unlink(node(index));
}
private void checkElementIndex(int index) {
    if (!isElementIndex(index))
        throw new IndexOutOfBoundsException(outOfBoundsMsg(index));
}
private boolean isElementIndex(int index) {
    return index >= 0 && index < size;
}
E unlink(Node<E> x) {
// assert x != null;
final E element = x.item;
final Node<E> next = x.next;
final Node<E> prev = x.prev;

if (prev == null) {
    first = next;
} else {
    prev.next = next;
    x.prev = null;
}

if (next == null) {
    last = prev;
} else {
    next.prev = prev;
    x.next = null;
}

x.item = null;
size--;
modCount++;
return element;
}
```
源码分析：从LinkList集合中移除一个元素时调用remove(int index)，先调用 checkElementIndex(index);方法对要移除的位置进行判断，判断是否大于0并且小于当前集合的大小，否则抛出IndexOutOfBoundsException异常。在执行unlink(node(index));方法，根据node(index)方法得到指定位置的节点，在执行删除操作。
##### LinkList清除元素
```java
public void clear() {
    for (Node<E> x = first; x != null; ) {
        Node<E> next = x.next;
        x.item = null;
        x.next = null;
        x.prev = null;
        x = next;
    }
    first = last = null;
    size = 0;
    modCount++;
}
```
##### 取LinkList元素
```java
public E get(int index) {
    checkElementIndex(index);
    return node(index).item;
}
    Node<E> node(int index) {
    if (index < (size >> 1)) {
        Node<E> x = first;
        for (int i = 0; i < index; i++)
            x = x.next;
        return x;
    } else {
        Node<E> x = last;
        for (int i = size - 1; i > index; i--)
            x = x.prev;
        return x;
    }
}
```
##### 数据包含
```java
public boolean contains(Object o) {
    return indexOf(o) != -1;
}
    public int indexOf(Object o) {
    int index = 0;
    if (o == null) {
        for (Node<E> x = first; x != null; x = x.next) {
            if (x.item == null)
                return index;
            index++;
        }
    } else {
        for (Node<E> x = first; x != null; x = x.next) {
            if (o.equals(x.item))
                return index;
            index++;
        }
    }
    return -1;
}
```
从前往后找，返回形参元素在集合中的索引，不存在就返回-1。
##### 迭代器，使用listIterator(int index)
```java
public ListIterator<E> listIterator(int index) {
    checkPositionIndex(index);
    return new ListItr(index);
}
```
由于LinkList也继承了AbstractSequentialList，也可以使用iterator遍历，如下：

```java
public static void main(String[] args) {
    LinkedList<String> linkedList = new LinkedList<String>();
    linkedList.add("AA");
    linkedList.add("BB");
    ListIterator<String> listIterator = linkedList.listIterator();
    while(listIterator.hasNext()){
        System.out.println(listIterator.next());
    }
    Iterator<String> iterator = linkedList.iterator();
    while(iterator.hasNext()){
        System.out.println(iterator.next());
    }
}
```
##### 反向迭代器，使用descendingIterator()方法。
```java
public Iterator<E> descendingIterator() {
    return new DescendingIterator();
}
private class DescendingIterator implements Iterator<E> {
    private final ListItr itr = new ListItr(size());
    public boolean hasNext() {
        return itr.hasPrevious();
    }
    public E next() {
        return itr.previous();
    }
    public void remove() {
        itr.remove();
    }
}
```
使用方法同正向迭代器一样。
### 总结：
LinkList的相关用法和ArrayList一样，我们学习的是他们的实现原理，重点在于源码解析和数据结构，有关数据结构的深层次学习将在后续学习中。

