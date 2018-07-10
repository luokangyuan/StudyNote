###lambda表达式
在Java8中引入了一个新的操作符“->”,该操作符称为箭头操作符或Lambda操作符。
左侧：Lambda表示式的参数列表
右侧：Lambda表达式中所要执行的功能
####语法格式
#####1.无参数，无返回值（）-> System.out.print("Hello Word");
示例如下：

	@Test
    public void test1(){
        Runnable r = new Runnable() {
            @Override
            public void run() {
                System.out.print("Hello Word");
            }
        };
        r.run();
        System.out.print("===============================");
        Runnable r1 = () -> System.out.print("Hello Word");
        r1.run();
    }
#####2.一个参数，无返回值（x）-> System.out.print(x);

	@Test
    public void test2(){
        Consumer<String> con = (x) -> System.out.println(x);
        con.accept("Hello Word");
    }
如果只有一个参数，无返回值可以省略小括号不写。
#####3.两个参数，有返回值，并且有多条执行语句

	@Test
    public void test3(){
        Comparator<Integer> com = (x,y) ->{
            System.out.println("函数式接口");
            return Integer.compare(x,y);
        };
        int max = com.compare(4,5);
        System.out.println(max);
    }
#####4.如果只有一条返回语句

	@Test
    public void test4(){
        Comparator<Integer> com = (x,y) -> Integer.compare(x,y);
    }
#####4.lambda表达式中的参数类型可以省略不写，JVM可以根据上下文推断出类型
####Lambda表达式需要函数式接口的支持。
###函数式接口
接口中只有一个抽象方法的接口，就叫函数式接口。可以使用注解@FunctionalInterface检查是否为函数式接口。

	@FunctionalInterface
	public interface MyPredicat <T>{
	    public boolean test(T t);
	}
示例如下：
1.定义一个函数式接口

	@FunctionalInterface
	public interface MyFun {
	    public Integer getValue(Integer num);
	}
2.定义一个方法，方法的参数为函数式接口

	public Integer operation(Integer num,MyFun mf){
	        return mf.getValue(num);
	    }
3.使用Lambda表达式

	@Test
    public void test5(){
        Integer num = operation(100,(x)-> x*x);
        System.out.println(num);
    }
Lambda表达式左侧是函数式接口的参数，右侧是函数式接口的实现。
####Lambda练习
将集合中的员工排序，按照年龄从小到大排序，如果年龄相同就按照名称排序

	public class TestLambda {
	    List<Employee> emps = Arrays.asList(
	            new Employee("张三",13,9999.99),
	            new Employee("李四",67,444.44),
	            new Employee("王五",45,55.55),
	            new Employee("赵六",45,6666.66)
	    );
	    @Test
	    public void test1(){
	        Collections.sort(emps,(e1,e2) -> {
	            if(e1.getAge() == e2.getAge()){
	                return e1.getName().compareTo(e2.getName());
	            }else{
	                return Integer.compare(e1.getAge(),e2.getAge());
	            }
	        });
	        for(Employee emp:emps){
	            System.out.println(emp);
	        }
	    }
	}
练习二，对字符串进行处理
1.申明一个函数式接口，用于处理字符串

	@FunctionalInterface
	public interface MyFunction {
	    public  String getValue(String str);
	}
2.申明一个处理字符串的方法，返回处理后的结果

	public String strHandle(String str,MyFunction mf){
	    return mf.getValue(str);
	}
3.调用处理方法，使用Lambda表达式实现字符串的不同处理

	@Test
	public void test2(){
	    //将传入的字符串做去除空格处理
	    String trimStr = strHandle("  \t\t\t\tHello Word",(str) -> str.trim());
	    System.out.println(trimStr);
	    //将传入的字符串做大写转换处理
	    String uper = strHandle("abce",(str) -> str.toUpperCase());
	    System.out.println(uper);
	    //将传入的字符串做截取处理
	    String subStr = strHandle("我要好好学习，成为一个大神",(str) -> str.substring(1,5));
	    System.out.println(subStr);
	}
练习三，计算两个long型参数做处理
1.声明一个函数式接口

	@FunctionalInterface
	public interface MyFunction2 <T,R>{
	    public R getValue(T t1,T t2);
	}
2.定义处理方法

	public void operator(Long l1,Long l2,MyFunction2<Long,Long> mf){
	   System.out.println(mf.getValue(l1,l2));
	}
3.使用Lambda表达式

 	@Test
    public void test4(){
       operator(100L,200L,(x,y) -> x+y);
	   operator(100L,200L,(x,y) -> x*y);
    }
####总结
从上述代码中，我们可以看出Lambda表达式的好处，但是我们会发现，每次使用都会新建一个函数式接口，增加了很多麻烦，所以，Java8给我们增加了很多函数式接口，将在下一pain博客中学习。




