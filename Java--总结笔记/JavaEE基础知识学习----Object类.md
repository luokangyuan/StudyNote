## Object类
### java.lang.Object类，是所有类的根父类，
### Object类中只有一个空参的构造器
## equals(Object obj)方法
这是Object类中很常用的方法，在学习equals(Object obj)方法之前，先学习“==”相关知识。
### “==”的相关知识
1.“==”两端比较的是基本数据类型，判断基本数据类型的值是否相等，相等就返回true，否则返回false，重点是值，数据类型可能不同，例如：

```java
public static void main(String[] args) {
	int i = 110;
	int j = 110;
	char c = 110;
	float f = 110.0F;
	int k = 65;
	char a = 'A';
	System.out.println(i==j);//true
	System.out.println(i==c);//true
	System.out.println(i==f);//true
	System.out.println(k==a);//true
}
```
2.“==”两端比较的是引用类型，判断的是引用类型变量的地址值是否相等，例如：

```java
Object obj1 = new Object();
Object obj2 = new Object();
Object obj3 = obj1;
System.out.println(obj1 == obj2);//false
System.out.println(obj3 == obj1);//true
```
### equals(Object obj)的相关知识
源码如下所示：

```java
public boolean equals(Object obj) {
return (this == obj);
}
```
equals(Object obj)处理引用类型变量，在源码中发现还是比较的还是地址值。

```java
Object obj1 = new Object();
Object obj2 = new Object();
System.out.println(obj1.equals(obj2));//false
```
但是，在下面的例子中，仿佛又不是这个样子的，请看

```java
String str1 = new String("AA");
String str2 = new String("AA");
System.out.println(str1.equals(str2));//true
```
String类也是继承了Object类，按理说比较的是地址值也，应该为false，怎么会为true呢？因为String类重写了equals()方法，源码如下：

```java
public boolean equals(Object anObject) {
    if (this == anObject) {
        return true;
    }
    if (anObject instanceof String) {
        String anotherString = (String) anObject;
        int n = value.length;
        if (n == anotherString.value.length) {
            char v1[] = value;
            char v2[] = anotherString.value;
            int i = 0;
            while (n-- != 0) {
                if (v1[i] != v2[i])
                        return false;
                i++;
            }
            return true;
        }
    }
    return false;
}
```
其实不仅String类重写了equals()方法，还有包装类，File类，Date类都重写了Object类的equals()方法，比较两个对象的“实体内容”是否相同，如果我们自己定义的类，希望两个对象的属性值都相同的情况下返回true，就需要重写equals()方法。
当然，我们可以仿照String类重写equals()方法来重写自己的定义类中的equals()方法，还是有难度，可以使用eclipse自动生成的equlas()方法，例如Person类，如下所示：

```java
private String name;//姓名

private String sex;//性别

private int age;//年龄

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
	if (sex == null) {
		if (other.sex != null)
			return false;
	} else if (!sex.equals(other.sex))
		return false;
	return true;
}
```
当然这里也存在一些常识性的操作，例如对于非空对象引用x,y,z
```java
x.equals(x);返回true
x.equals(y);返回true,那么y.equals(x);也应该返回true
x.equals(y);返回true,y.equals(z);返回true,那么x.equals(z);也应该返回true
x.equals(null);返回false
```
### equals()方法和“==”使用场景
```java
1.对象域，使用equals方法 。
2.类型安全的枚举，使用equals或== 。
3.可能为null的对象域 : 使用 == 和 equals 。
4.数组域 : 使用 Arrays.equals 。
5.除float和double外的原始数据类型 : 使用 == 。
6.float类型: 使用Float.foatToIntBits转换成int类型，然后使用==。
7.double类型: 使用Double.doubleToLongBit转换成long类型，然后使用==。
```
## toString()方法
toString()也是Object类中使用频率很高的方法，使用情况如下所示：

```java
Person person = new Person();
System.out.println(person.toString());
System.out.println(person);
```
结果如下：

```java
com.java.study.Person@c791b9
com.java.study.Person@c791b9
```
Object类中toString()方法的源码如下：

```java
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```
如果子类没有重写toString()方法，当我们打印一个对象的引用时，实际调用的就是Object类中的toString()方法。输出此对象所在类及对应的堆空间对象的首地址。
如果子类重写了toString()方法，那么打印一个对象引用时,实际上调用的就是当前对象的toString()方法
例如Person类重写了toString()方法

```java
@Override
public String toString() {
	return "Person [name=" + name + ", sex=" + sex + ", age=" + age + "]";
}
```
看下面两个例子：

```java
String str1 = "AA";
String str2 = new String("BB");
System.out.println(str1.toString());
System.out.println(str2.toString());
```
结果为：

```java
AA
BB
```
输出结果不是我们前面所说的地址值，这是因为String类重写了toString()方法，源码如下：

```java
public String toString() {
    return this;
}
```
其实像String类，File类，Date类，包装类都重写了toString()方法。



