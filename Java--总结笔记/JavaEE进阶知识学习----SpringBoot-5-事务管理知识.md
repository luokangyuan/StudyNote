####事务管理
事务就是多条操作同时成功或者失败。例如同时新增两个用户，同时插入成功才插入到数据库表中，否则不插入。
####1.新增了一个Services类，如下所示：

	@Service
	public class UserService {
	    @Autowired
	    private UserRepository userRepository;
	     
        @Transactional
	    public void insertUserTwo(){
	        User userA = new User();
	        userA.setUserName("B");
	        userA.setAge(52);
	        userRepository.save(userA);
	
	        User userB = new User();
	        userB.setUserName("陈七");
	        userB.setAge(25);
	        userRepository.save(userB);
	    }
	}
说明:为了让测试方便，也就是模拟第二次插入会失败，我们将数据库表中的user_name字段的大小设置为1个字节，那么第一次插入就会成功，第二次插入就会报错，
####2.控制类中的方法如下所示：

	@PostMapping(value = "/users/two")
	public void addTwoUser(){
	    userService.insertUserTwo();
	}
这个时候即使第一条数据可以插入成功，也不会被插入进数据库表中，这就是 @Transactional的事务管理。
####总结
SpringBoot的基础知识包括了如下部分
1. 开发环境的安转和配置
2. 简单的介绍了SpringBoot的配置文件中的
3. Controller的使用
4. 数据库的基本使用的事务管理

