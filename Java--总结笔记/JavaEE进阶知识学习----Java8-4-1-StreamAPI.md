###什么是Stream
Stream是Java8中处理集合的关键抽象概念，它可以指定你希望对集合进行测操作，可以执行非常复杂的查找，过滤和映射数据的操作，使用Stream API对集合数据进行操作就类似于使用SQL执行的数据库查询查询，Stream API提供了一种高效且易于使用的处理数据的方式。
流（Stream）是数据渠道，用于操作数据源（集合、数组等）所生成的元素序列，“集合讲的是数据，流讲的是计算”，需要注意的是以下三点
1. Stream自己不会存储元素
2. Stream不会改变源对象，相会，他们会返回一个持有结果的新的Stream
3. Stream操作是延迟执行的，这意味着他们会等到需要结果的时候才执行。

###Stream使用方法
1. 创建Stream：一个数据源（集合、数组）获取一个流
2. 中间操作：一个中间操作链，对数据源的数据进行处理
3. 终止操作：一个终止操作，执行中间操作链，并产生结果。
####创建Stream的方法
1. 通过Collection系列提供的stream()或parallelStream()，如下：
2. 通过Arrays中的静态方法stream()方法获取流
3. 通过Stream类中的静态方法of()
4. 创建无限流

示例如下：

	@Test
	public void test1(){
	    // 1.通过Collection系列提供的stream()或parallelStream()
	    List<String> list = new ArrayList<>();
	    Stream<String> stream = list.stream();
	
	    // 2.通过Arrays中的静态方法stream()方法获取流
	    Employee[] emps = new Employee[10];
	    Stream<Employee> stream1 = Arrays.stream(emps);
	
	    // 3.通过Stream类中的静态方法of()
	    Stream<String> stream2 = Stream.of("AA","BB","CC");
	
	    // 4.创建无限流
	    //迭代
	    Stream<Integer> stream3 = Stream.iterate(0,(x) -> x+2);
	    //只要前10个（中间操作）
	    stream3.limit(10).forEach(System.out::println);
	    //打印了所有的中间流操作
	    //stream3.forEach(System.out::println);
		//4.2生成
        Stream.generate(() -> Math.random())
                .limit(10)
                .forEach(System.out::println);
	}
####中间操作
* filter----接受lambda,从流中排除某一些元素
* limit----截断流，使其元素不超过给定的数量
* skip(n)----跳过元素，返回一个扔掉了前n个元素的流，若流中元素不足n个，则返回一个空流
* distinct----筛流，通过流生成元素的hashcode()和equals()去除重复元素

#####filter示例

	@Test
	public void test1(){
	    //中间操作
	    Stream<Employee> stream = employees.stream()
	            .filter((e) -> {
	                System.out.println("中间操作");
	                return  e.getAge() > 16;
	            });
	    //终止操作
	    stream.forEach(System.out::println);
	}
######惰性求值和内部迭代
1. 如果没有终止操作，是不会打印中间操作的，这就是流只有需要结果的时候才会被调用，这就是惰性求值。
2. 上述打印是Stream自己给我们迭代输出的，这个就是内部迭代。

#####筛选和切片示例如下

	@Test
	public void test1(){
	    //中间操作
	    Stream<Employee> stream = employees.stream()
	            .filter((e) -> e.getAge() > 15)
	            .limit(4)
	            .skip(1)
	            .distinct();
	    //终止操作
	    stream.forEach(System.out::println);
	}
说明：由于distinct是根据hashcode()和equals()去重，所以Employee中要重写equals和hashCode方法。
####映射
1. map(Function f) 接收一个函数作为参数，该函数会被应用到每一个元素上，并将其映射成一个新的元素。
2. mapToDouble(ToDoubleFunction f)接收一个函数作为参数，该函数会被应用到每个元素上，产生一个新的DoubleStream
3. mapToLong(ToLongFunction f) 接收一个函数作为参数，该函数会被应用到每个元素上，产生一个新的LongStream
4. flatMap(Function f) 接收一个函数作为参数，将流中的每个值都换成另一个流，然后把所有流连接成一个流。

####map示例如下

	@Test
	public void test2(){
	    List<String> list = Arrays.asList("aaa","bbb","ccc","ddd");
	    list.stream()
	            .map((str) -> str.toUpperCase())
	            .forEach(System.out::println);
	System.out.println("================");
        employees.stream()
                .map(Employee::getName)
                .forEach(System.out::println);
	}

####flatMap示例

	@Test
	public void test3(){
	    List<String> list = Arrays.asList("aaa","bbb","ccc","ddd");
	    Stream<Character> sm = list.stream()
	            .flatMap(TestMiddle::filterCharacter);
	    sm.forEach(System.out::println);
	}
	
	public static  Stream<Character> filterCharacter(String str){
	    List<Character> list = new ArrayList<>();
	    for(Character ch: str.toCharArray()){
	        list.add(ch);
	    }
	    return list.stream();
	}
####排序
#####sorted()-自然排序（comparable）
	
	@Test
	    public void test4(){
	        List<String> list = Arrays.asList("ccc","aaa","bbb","eee");
	        list.stream()
	                .sorted()
	                .forEach(System.out::println);
	    }
	}
#####sorted(Comparator com)-定制排序（Comparator）

	@Test
	public void test5(){
	    employees.stream()
	            .sorted((e1,e2) -> {
	                if(e1.getAge().equals(e2.getAge())){
	                    return e1.getName().compareTo(e2.getName());
	                }else{
	                    return e2.getAge().compareTo(e2.getAge());
	                }
	            }).forEach(System.out::println);
	}
####终止操作
终止操作会从流的流水线生成结果，该结果可以是任何不是流的值，例如：List、Integer、void。
#####查找和匹配
1. allMatch(Predicate p) 检查是否匹配所有的元素
2. anyMatch(Predicate p) 检查是否至少匹配一个元素
3. noneMatch(Predicate p) 检查是否没有匹配所有的元素
4. findFirst() 返回第一个元素
5. findAny() 返回当前流中的任意元素
6. count() 返回流中元素个数
7. max(Comparator c) 返回流中最大值
8. min(Comparator c) 返回流中最小值
9. forEach(Consumer c) 内部迭代


示例如下：

	public class TestStreamAPI {
	    List<Employee> employees = Arrays.asList(
	            new Employee("张三",16,9999.99, Employee.Status.FREE),
	            new Employee("李四",18,8888.99, Employee.Status.VOCATION),
	            new Employee("王五",20,7777.99, Employee.Status.BUSY),
	            new Employee("赵六",22,6666.99, Employee.Status.FREE),
	            new Employee("田七",24,5555.99, Employee.Status.BUSY),
	            new Employee("小八",26,4444.99, Employee.Status.VOCATION),
	            new Employee("陈九",28,3333.99, Employee.Status.VOCATION),
	            new Employee("王五",32,9999.99, Employee.Status.BUSY),
	            new Employee("王五",34,9999.99, Employee.Status.FREE),
	            new Employee("王五",36,9999.99, Employee.Status.BUSY)
	    );
	    @Test
	    public void test1(){
	       //检查是否所有的状态为BUSY状态
	       Boolean b1 =  employees.stream()
	                .allMatch((e) -> e.getStatus().equals(Employee.Status.BUSY));
	       //检查是否至少匹配一个元素
	       Boolean b2 = employees.stream()
	               .anyMatch((e) -> e.getStatus().equals(Employee.Status.BUSY));
	       //检查是否没有匹配元素
	       Boolean b3 = employees.stream()
	                .noneMatch((e) -> e.getStatus().equals(Employee.Status.BUSY));
	       //先按照工资排序，再去除第一个元素放在Option容器中
	       Optional<Employee> op = employees.stream()
	               .sorted((e1,e2) -> Double.compare(e1.getSalay(),e2.getSalay()))
	               .findFirst();
	       System.out.println(op.get());
	       //findAny返回当前流中的任意元素，先过滤再返回一个，
	       //mployees.stream()实现的是串行流，每次返回的值一定的。
	       //employees.parallelStream()实现的是并行流 ，返回的就是满足条件的随机结果。
	       Optional<Employee> op2 = employees.parallelStream()
	               .filter((e) -> e.getStatus().equals(Employee.Status.BUSY))
	               .findAny();
	       System.out.println(op2.get());
	       //返回流中元素个数
	       Long count = employees.stream()
	                .count();
	       //返回流中最大值
	       Optional<Employee> op1 = employees.stream()
	               .max((e1,e2) -> Double.compare(e1.getSalay(),e2.getSalay()));
	       System.out.println(op1.get());
	       //返回流中最低工资
	       Optional<Double> op3 = employees.stream()
	               .map(Employee::getSalay)
	               .min(Double::compare);
	       System.out.println(op3.get());
	    }
	}


#####归约
reduce(T iden,BinaryOperator b)可以将流中元素反复结合起来，得到一个值，返回T,示例如下：
	
	@Test
	public void test2(){
	    List<Integer> list = Arrays.asList(1,2,3,4,5,6,7,8,9,10);
	    Integer sum = list.stream()
	            .reduce(0,(x,y) -> x+y);
	    System.out.println(sum);
	    //计算工资的总和
	    Optional<Double> op = employees.stream()
	            .map(Employee::getSalay)
	            .reduce(Double::sum);
	    System.out.println(op.get());
	}
上述代码中使用map得到所有的工资，再有reduce将所有的工资累加，map和reduce配合使用情况比较多。
#####收集
collect(Collector c)将流转换为其他形式，接收一个Collector接口的实现，用于给Stream中元素做汇总的方法。
Colletor接口中的方法实现决定了如何对流执行收集操作（如收集到List，Set,Map）,但是Collectors实用类提供了很多静态的方法，可以方便的创建常用收集器实例，具体方法与实例如下：
1. toList 返回List<T> 将流中元素搜集到List
2. toSet 返回Set<T> 将流中元素手机到Set
3. toCollection 返回Collection<T> 把流中元素收集到创建的集合中
4. counting 返回Long 计算流中元素的个数
5. summinglnt 返回Integer 对流中元素的整数属性求和
6. averaginglnt 返回Double 计算流中元素Integer属性的平均值
7. summarizinglnt 返回IntSummaryStatistics 计算流中Integer属性的统计值，如平均值。
8. joining 返回String 连接流中每一个字符串
9. maxBy 返回Optional<T> 根据比较器选择最大值
10. minBy 返回Optional<T> 根据比较器选择最小值
11. reducing 归约产生的类型
12. collectionAndThen 转换函数返回的类型

实例如下：

	@Test
	public void test3(){
	    //将名字添加到list中
	    List<String> list = employees.stream()
	            .map(Employee::getName)
	            .collect(Collectors.toList());
	    list.forEach(System.out::println);
	    //将名字添加到Set中
	    Set<String> set = employees.stream()
	            .map(Employee::getName)
	            .collect(Collectors.toSet());
	    set.forEach(System.out::println);
	    //将名字添加到特定的数据结构中
	    HashSet<String> hashSet = employees.stream()
	            .map(Employee::getName)
	            .collect(Collectors.toCollection(HashSet::new));
	    //总数
	    Long count = employees.stream()
	            .collect(Collectors.counting());
	    //平均数
	    Double avg = employees.stream()
	            .collect(Collectors.averagingDouble(Employee::getSalay));
	    //总和
	    Double sum = employees.stream()
	            .collect(Collectors.summingDouble(Employee::getSalay));
	    //最大值，返回工资最大的员工信息
	    Optional<Employee> max = employees.stream()
	            .collect(Collectors.maxBy((e1,e2) -> Double.compare(e1.getSalay(),e2.getSalay())));
	    //最小值，返回最小工资
	    Optional<Double> min = employees.stream()
	            .map(Employee::getSalay)
	            .collect(Collectors.minBy(Double::compare));
	    //按照状态分组
	    Map<Employee.Status,List<Employee>> map = employees.stream()
	            .collect(Collectors.groupingBy(Employee::getStatus));
	    map.get(Employee.Status.BUSY);
	    //多级分组
	    Map<Employee.Status,Map<String,List<Employee>>> map1 = employees.stream()
	           .collect(Collectors.groupingBy(Employee::getStatus,Collectors.groupingBy((e) ->{
	               if(((Employee)e).getAge() <= 18){
	                   return "少年";
	               }else if(((Employee)e).getAge() <= 26){
	                   return "中年";
	               }else{
	                   return "老年";
	               }
	           })));
	    System.out.println(map1);
	    //分区。满足条件一个区，不满足条件的一个区
	    Map<Boolean,List<Employee>> map2 = employees.stream()
	            .collect(Collectors.partitioningBy((e) -> e.getSalay() >5000));
	    System.out.println(map2);
	    //其他的一种获取方式
	    DoubleSummaryStatistics dss = employees.stream()
	            .collect(Collectors.summarizingDouble(Employee::getSalay));
	    System.out.println(dss.getSum());
	    System.out.println(dss.getAverage());
	    System.out.println(dss.getMax());
	    //连接字符串
	    String str = employees.stream()
	            .map(Employee::getName)
	            .collect(Collectors.joining(",","====","==="));
	}


	
	
	
