###StreamAPI练习
1.给定一个数字列表，返回一个由每一个数的平方构成的列表。

	@Test
	public void test(){
	    Integer[] nums = new Integer[]{1,2,3,4,5};
	    Arrays.stream(nums)
	            .map((x) -> x*x)
	            .forEach(System.out::println);
	
	}
2.使用map和reduce方法数一数流中有多少个Employee

	@Test
	public void test1(){
	  Optional<Integer> count = employees.stream()
	           .map((e) -> 1)
	           .reduce(Integer::sum);
	  System.out.println(count.get());
	}
####交易员类
	
	public class Trader {
	
		private String name;
		private String city;
	
		public Trader() {
		}
	
		public Trader(String name, String city) {
			this.name = name;
			this.city = city;
		}
	
		public String getName() {
			return name;
		}
	
		public void setName(String name) {
			this.name = name;
		}
	
		public String getCity() {
			return city;
		}
	
		public void setCity(String city) {
			this.city = city;
		}
	
		@Override
		public String toString() {
			return "Trader [name=" + name + ", city=" + city + "]";
		}
	
	}
####交易类

	public class Transaction {
	
		private Trader trader;
		private int year;
		private int value;
	
		public Transaction() {
		}
	
		public Transaction(Trader trader, int year, int value) {
			this.trader = trader;
			this.year = year;
			this.value = value;
		}
	
		public Trader getTrader() {
			return trader;
		}
	
		public void setTrader(Trader trader) {
			this.trader = trader;
		}
	
		public int getYear() {
			return year;
		}
	
		public void setYear(int year) {
			this.year = year;
		}
	
		public int getValue() {
			return value;
		}
	
		public void setValue(int value) {
			this.value = value;
		}
	
		@Override
		public String toString() {
			return "Transaction [trader=" + trader + ", year=" + year + ", value="
					+ value + "]";
		}
	}
####练习

	public class TestTransaction {
		
		List<Transaction> transactions = null;
		
		@Before
		public void before(){
			Trader raoul = new Trader("Raoul", "Cambridge");
			Trader mario = new Trader("Mario", "Milan");
			Trader alan = new Trader("Alan", "Cambridge");
			Trader brian = new Trader("Brian", "Cambridge");
			
			transactions = Arrays.asList(
					new Transaction(brian, 2011, 300),
					new Transaction(raoul, 2012, 1000),
					new Transaction(raoul, 2011, 400),
					new Transaction(mario, 2012, 710),
					new Transaction(mario, 2012, 700),
					new Transaction(alan, 2012, 950)
			);
		}
		
		//1. 找出2011年发生的所有交易， 并按交易额排序（从低到高）
		@Test
		public void test1(){
			transactions.stream()
					.filter((t) -> t.getYear() == 2011)//过滤2011年的交易
					.sorted((t1,t2) -> Integer.compare(t1.getValue(),t2.getValue()))
					.forEach(System.out::println);
		}
		//2. 交易员都在哪些不同的城市工作过？
		@Test
		public void test2(){
			transactions.stream()
					.map((t) -> t.getTrader().getCity())
					.distinct()
					.forEach(System.out::println);
		}
		//3. 查找所有来自剑桥的交易员，并按姓名排序
		@Test
		public void test3(){
			new ArrayList<Integer>();
			transactions.stream()
					.filter((t) -> t.getTrader().getCity().equals("Cambridge"))
					.map(Transaction::getTrader)
					.sorted((t1,t2) -> t1.getName().compareTo(t2.getName()))
					.distinct()
					.forEach(System.out::println);
		}
		//4. 返回所有交易员的姓名字符串，按字母顺序排序
		@Test
		public void test4(){
			transactions.stream()
					.map((t) -> t.getTrader().getName())
					.sorted()
					.forEach(System.out::println);
			System.out.println("====================================");
			String str = transactions.stream()
					.map((t) -> t.getTrader().getName())
					.sorted()
					.reduce("",String::concat);
			System.out.println(str);
		}
		//5. 有没有交易员是在米兰工作的？
		@Test
		public void test5(){
			Boolean b1 = transactions.stream()
					.anyMatch((t) -> t.getTrader().getCity().equals("Milan"));
			System.out.println(b1);
		}
		//6. 打印生活在剑桥的交易员的所有交易额
		@Test
		public void test6(){
			Optional<Integer> sum = transactions.stream()
					.filter((e) -> e.getTrader().getCity().equals("Cambridge"))
					.map(Transaction::getValue)
					.reduce(Integer::sum);
			System.out.println(sum.get());
		}
		//7. 所有交易中，最高的交易额是多少
		@Test
		public void test7(){
			Optional<Integer> max = transactions.stream()
					.map((t) -> t.getValue())
					.max(Integer::compare);
			System.out.println(max);
		}
		//8. 找到交易额最小的交易
		@Test
		public void test8(){
			Optional<Transaction> op = transactions.stream()
					.min((t1,t2) -> Integer.compare(t1.getValue(),t2.getValue()));
			System.out.println(op.get());
		}
	}
