**字符串集合去重**

```java
List<String> distinctElements = list.stream().distinct().collect(Collectors.toList());
```

**根据对象属性去重**

```java
public static <T> Predicate<T> distinctByKey(Function<? super T, Object> keyExtractor)
    {
        Map<Object, Boolean> map = new ConcurrentHashMap<>();
        return t -> map.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
    }
//使用举例
persons.stream().filter(distinctByKey(Person::getName))
```

