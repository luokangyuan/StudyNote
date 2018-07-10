###四大核心函数接口
1. Consumer<T>消费型接口： 参数类型 T  返回类型 void 对类型T的对象应用操作
2. Supplier<T>供给型接口： 参数类型 无 返回类型 T 返回类型为T的对象
3. Function<T,R>函数型接口： 参数类型 T 返回类型 R 对了类型为T的对象应用操作，并返回结果
4. Predicate<T>断言型接口： 参数类型 T 返回类型 boolean 确定类型为T的对象是否满足某约束，并返回布尔值。

Consumer示例如下：

	@Test
	public void test1(){
	    happy(10000,(m) -> System.out.println("购买笔记本电脑，每次消费"+m+"元"));
	}
	public void happy(double money, Consumer<Double> con){
	    con.accept(money);
	}
Supplier示例如下：

	@Test
	public void test2(){
	   List<Integer> list =  getNumList(10, () -> (int)(Math.random()*100));
	   for(Integer num: list){
	       System.out.println(num);
	   }
	}
	public List<Integer> getNumList(int num, Supplier<Integer> sup){
	    List<Integer> list = new ArrayList<>();
	    for (int i = 0; i <num ; i++) {
	        Integer n = sup.get();
	        list.add(n);
	    }
	    return list;
	}
上述使用Lambda表达式就是产生10个100以内的随机数。
Function示例如下

	@Test
	public void test3(){
	    String upperStr = strHandle("abce",(str) -> str.toUpperCase());
	    System.out.println(upperStr);
	}
	public String strHandle(String str, Function<String,String> fun){
	    return fun.apply(str);//对str进行处理，具体处理方式调用的时候使用Lambda表达式指定
	}
Predicate示例如下，将满足条件的字符串添加到集合中
	
	@Test
	public void test4(){
	    List<String> list = Arrays.asList("Hello","www.baidu.com","zhangsan","lisi");
	    List<String> strList = filterStr(list,(s) -> s.length() > 4);
	    for(String str: strList){
	        System.out.println(str);
	    }
	}
	
	public List<String> filterStr(List<String> list , Predicate<String> per){
	    List<String> strList = new ArrayList<>();
	    for (String str: list) {
	        if(per.test(str)){//对str进行过滤操作，具体操作调用的时候才执行
	            strList.add(str);
	        }
	    }
	    return strList;
	}
####小结
1. Consumer消费型是传入一个参数，进行处理
2. Supplier供给型是得到一些结果
2. Function函数型是传入一个参数，处理后返回一个结果
3. Predicate断言型就是做一些判断操作
4. 有无参数和返回值是指Predicate<String> per等调用的方法需不需要参数和有无返回值，例如：per.test(str)、fun.apply(str)、sup.get()等。