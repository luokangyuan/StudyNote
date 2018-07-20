####下面学习的是数据库相关知识
数据库使用的是MySQL，持久化技术使用的就是spring-data-jpa,RESTFul API如下
![](https://i.imgur.com/x2JhG2P.png)
####1.pom文件中添加依赖

	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-data-jpa</artifactId>
	</dependency>
	
	<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
	</dependency>
####2.application.yml文件中配置数据库信息和jpa
	
	spring:
	  profiles:
	    active: prod
	  datasource:
	    driver-class-name: com.mysql.jdbc.Driver
	    url: jdbc:mysql://127.0.0.1:3306/dbspringboot
	    username: root
	    password: 123456
	  jpa:
	    hibernate:
	      ddl-auto: create
	    show-sql: true
其中的 ddl-auto: create表示每次都会删除原先存在的表，就是说如果表中存在数据，运行程序数据就不存在了。
也可以是 update：会创建表，如果表中有数据，不会删除表。
####3.创建一个实体类User，如下所示

	@Entity
	public class User {
	    @Id
	    @GeneratedValue
	    private Integer id;
	
	    private String userName;
	
	    private Integer age;
	
	    public User(){
	
	    }
	
	    public Integer getId() {
	        return id;
	    }
	
	    public void setId(Integer id) {
	        this.id = id;
	    }
	
	    public String getUserName() {
	        return userName;
	    }
	
	    public void setUserName(String userName) {
	        this.userName = userName;
	    }
	
	    public Integer getAge() {
	        return age;
	    }
	
	    public void setAge(Integer age) {
	        this.age = age;
	    }
	}
当我们再次启动程序的时候时候，dbspringboot数据库中就会多一个user表，其中表字段就是实体类所对应的字段，这是jpa相关的知识，具体将在以后仔细学习和记录。
####4.创建UserController

	@RestController
	public class UserController {
	    @Autowired
	    private UserRepository userRepository;
	
	    @GetMapping(value = "/users")
	    public List<User> userList(){
	        return userRepository.findAll();
	    }
	}
####5.UserRepository接口的代码如下

	public interface UserRepository extends JpaRepository<User,Integer> {
	}
####6.访问
使用http://localhost:8082/gire/users访问，如下：
![](https://i.imgur.com/nD51Mz6.png)
####7.restful风格的完整代码如下：

	@RestController
	public class UserController {
	    @Autowired
	    private UserRepository userRepository;
	
	    /**
	     * 查询用户列表
	     * @return
	     */
	    @GetMapping(value = "/users")
	    public List<User> userList(){
	        return userRepository.findAll();
	    }
	
	    /**
	     * 添加一个用户
	     * @param userName
	     * @param age
	     * @return
	     */
	    @PostMapping(value = "/users")
	    public User addUser(@RequestParam("userName")String userName,@RequestParam("age")Integer age){
	        User user = new User();
	        user.setUserName(userName);
	        user.setAge(15);
	        return userRepository.save(user);
	    }
	
	    /**
	     * 根据id查询用户
	     * @return
	     */
	    @GetMapping(value = "/users/{id}")
	    public User getUserById(@PathVariable("id") Integer id){
	        return userRepository.findOne(id);
	    }
	
	    /**
	     * 根基id修改用户
	     * @param id
	     * @param userName
	     * @param age
	     * @return
	     */
	    @PutMapping(value = "/users/{id}")
	    public User updateUserById(@PathVariable("id") Integer id,@RequestParam("userName")String userName,@RequestParam("age")Integer age){
	        User user = new User();
	        user.setId(id);
	        user.setAge(age);
	        user.setUserName(userName);
	        return userRepository.save(user);
	    }
	
	    /**
	     * 根据id删除用户
	     * @param id
	     */
	    @DeleteMapping(value = "/users{id}")
	    public void deleteUserById(@PathVariable("id") Integer id){
	        userRepository.delete(id);
	    }
	
	    @GetMapping(value = "users/age/{age}")
	    public List<User> listUserByAge(@PathVariable("age") Integer age){
	        return userRepository.findByAge(age);
	    }
	}
上述代码中我们也扩展了使用年龄来查询用户，在UserRepository接口中我们扩展了这个方法如下所示：

	//通过年龄查询，方法名有规定
    public List<User> findByAge(Integer age);
