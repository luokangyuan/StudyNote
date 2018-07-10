###方法引用
当要传递给Lambda体的操作，已经有了实现的方法，可以使用方法引用.
(实现抽象方法的参数列表，必须与方法引用方法的参数列表保持一致)。
方法引用：使用操作符“::”将方法名和对象或类的名字分割开，例如：
1. 对象::实例方法
2. 类::静态方法
3. 类::实例方法

####对象::实例方法示例如下：

	@Test
	public void test1(){
	    //注意：con.accept()中的accept的参数类型和返回值和println参数类型和返回值一致
	    Consumer<String> com = (x) -> System.out.println(x);
	    PrintStream ps = System.out;
	    Consumer<String> con = ps::println;
	}

例如打印一个字符串：

	@Test
	public void test1(){
	    Consumer<String> con = System.out::println;
	    con.accept("Hello Word");
	}
#####注意：con.accept()中的accept的参数类型和返回值和println参数类型和返回值一致
####类::静态方法
方法引用的实质就是使用更简单的方式代替Lambda表达式。下述代码就是类::静态方法的一个实例。例如，如下

	@Test
	public void test2(){
	    Comparator<Integer> con = (x,y) -> Integer.compare(x,y);
	    //上述代码中Lambda表达体中的compare方法已经被实现，可以简写为
	    Comparator<Integer> con1 = Integer::compare;
	}

####类::实例方法如下

	@Test
	public void test3(){
	    BiPredicate<String,String> bp = (x,y) -> x.equals(y);
	    //上述代码简写为
	    BiPredicate<String,String> bp2 = String::equals;
	}
###构造器引用

	@Test
	public void test4(){
	    Supplier<Employee> sup = () -> new Employee();
	    //构造器引用
	    Supplier<Employee> sup2 =  Employee::new;
	    Employee employee = sup.get();
	    System.out.println(employee.getName());
	}
其中构造器方法调用哪一个构造器取决与接口Supplier中的方法参数，Supplier就是调用的无参构造器，例如Function函数接口就是传入一个参数，并返回一个结果。如下

	@Test
	public void test5(){
	    Function<String,Employee> fun = (x) -> new Employee(x);
	    //构造器引用
	    Function<String,Employee> fun2 = Employee::new;
	    Employee emp = fun2.apply("王五");
	    System.out.println(emp);
	}
 Function<String,Employee>中的String是传入参数类型，Employee是返回结果类型。
如果我们想传入两个参数，并返回一个结果，就必须要在Employee中创建两个含两个参数的构造器，如下

	@Test
	public void test6(){
	    BiFunction<String,Integer,Employee> fun = Employee::new;
	    Employee emp = fun.apply("赵六",123);
	    System.out.println(emp);
	}
#####注意：Employee中构造器参数列表和接口中的方法fun.apply("赵六",123);参数列表保持一致。
###数组引用
格式：type[]::new

	@Test
	public void test7(){
	    Function<Integer,String[]> fun = (x) -> new String[x];
	    String[] str= fun.apply(10);
	    System.out.println(str.length);
	}
上述代码就是使用Lambda表达式传入一个数组大小，从而创建一个指定大小和类型的数组。
使用数组引用为：
	
	Function<Integer,String[]> fun2 = String[]::new;
	String[] str2 = fun2.apply(10);
	System.out.println(str2.length);


