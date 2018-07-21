## 缓存使用

**1.使用IDEA创建SpringBoot项目，引入cache模块，web模块，mysql模块，Mybatis模块**

**2.创建mysql数据库spring_cache**

```sql
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` int(2) DEFAULT NULL,
  `d_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

**3.创建JavaBean封装数据**

```java
package com.springboot.cache.bean;

public class Employee {
	private Integer id;
	private String lastName;
	private String email;
	private Integer gender; //性别 1男  0女
	private Integer dId;
	public Employee() {
		super();
	}
	public Employee(Integer id, String lastName, String email, Integer gender, Integer dId) {
		super();
		this.id = id;
		this.lastName = lastName;
		this.email = email;
		this.gender = gender;
		this.dId = dId;
	}
	public Integer getId() {

		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Integer getGender() {
		return gender;
	}
	public void setGender(Integer gender) {
		this.gender = gender;
	}
	public Integer getdId() {
		return dId;
	}
	public void setdId(Integer dId) {
		this.dId = dId;
	}
	@Override
	public String toString() {
		return "Employee [id=" + id + ", lastName=" + lastName + ", email=" + email + ", gender=" + gender + ", dId="
				+ dId + "]";
	}
}
```

```java
package com.springboot.cache.bean;

public class Department {
    private Integer id;
    private String departmentName;
    public Department() {
        super();
        // TODO Auto-generated constructor stub
    }
    public Department(Integer id, String departmentName) {
        super();
        this.id = id;
        this.departmentName = departmentName;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getDepartmentName() {

        return departmentName;
    }
    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
    @Override
    public String toString() {
        return "Department [id=" + id + ", departmentName=" + departmentName + "]";
    }
}
```

**4.整合Mybatis**

- Application.properties中配置数据源

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/spring_cache
spring.datasource.username=root
spring.datasource.password=1234
spring.datasource.driver-class-name=com.mysql.jdbc.Driver

mybatis.configuration.map-underscore-to-camel-case=true
logging.level.com.springboot.cache.mapper = debug
```

- 使用注解版的Mybatis

  - 使用@MapperScan指定需要扫描的Mapper接口所在的包

  ```java
  @MapperScan("com.springboot.cache.mapper")
  @SpringBootApplication
  public class CacheApplication {
  	public static void main(String[] args) {
  		SpringApplication.run(CacheApplication.class, args);
  	}
  }
  ```

  - 编写Employee接口和DepartmentMapper接口

  ```java
  @Mapper
  public interface EmployeeMapper {
  
      @Select("select * from employee where id = #{id}")
      public  Employee getEmpById(Integer id);
  
      @Update("update employee set lastName = #{lastName},email = #{email},gender = #{gender},d_id = #{did} where id = #{id}")
      public void updateEmp(Employee employee);
  
      @Delete("delete from employee where id = #{id}")
      public void deleteEmpById(Integer id);
  
      @Insert("insert into employee(lastName.email,gender,d_id) values(#{lastName},#{email},#{gender},#{did})")
      public void insertEmployee(Employee employee);
  }
  ```

  - **编写service层代码**

  ```java
  @Service
  public class EmployeeService {
  
      @Autowired
      private EmployeeMapper employeeMapper;
  
      public Employee getEmp(Integer id){
          return employeeMapper.getEmpById(id);
      }
  }
  ```

  - **编写controller层代码**

  ```java
  @RestController
  public class EmployeeController {
  
      @Autowired
      private EmployeeService employeeService;
  
      @GetMapping("/emp/{id}")
      public Employee getEmployee(@PathVariable("id") Integer id){
          Employee emp = employeeService.getEmp(id);
          return emp;
      }
  }
  ```

**5.开启基于注解@EnableCaching的缓存**

```java
@MapperScan("com.springboot.cache.mapper")
@SpringBootApplication
@EnableCaching
public class CacheApplication {

	public static void main(String[] args) {
		SpringApplication.run(CacheApplication.class, args);
	}
}
```

**6.标注缓存注解即可**

```java
@Service
public class EmployeeService {

    @Autowired
    private EmployeeMapper employeeMapper;

    /**
     * 将方法结果进行缓存，以后再要相同的数据，就直接从缓存中去
     * @param id
     * @return
     */
    @Cacheable(cacheNames = "emp" , key = "#id")
    public Employee getEmp(Integer id){
        return employeeMapper.getEmpById(id);
    }
}
```

**注解@Cacheable说明：**

- 将方法结果进行缓存，以后再要相同的数据，就直接从缓存中去

- 属性说明：

  - cacheNames/value:指定缓存组件的名字，CacheManager管理多个cache组件，对缓存的真正CRUD操作在Cache中，每一个缓存都有自己唯一的一个名字
  - key:缓存数据使用的key,可以使用这个属性来指定，默认是使用方法参数的值1，方法的返回值

  ```java
   @Cacheable(cacheNames = "emp" , key = "#id")
  ```

  缓存的名字是emp，key是方法中参数id的值，这种写法还有如下可以取到其他参数

  | 名字        | 描述                                                         | 示例                 |
  | ----------- | ------------------------------------------------------------ | -------------------- |
  | methodName  | 当前被调用的方法名                                           | #root.methodName     |
  | method      | 当前被调用的方法                                             | #root.method.name    |
  | target      | 当前被调用的目标对象                                         | #root.target         |
  | targetClass | 当前被调用的目标对象类                                       | #root.targetClass    |
  | args        | 当前被调用的方法的参数列表                                   | #root.args[0]        |
  | caches      | 当前方法调用使用的缓存列表（如@Cacheable(value={"cache1","cache2"})），则有两个cache | #root.caches[0].name |
  | result      | 方法执行后的返回值                                           | #result              |

  - CacheManager属性：指定缓存管理器
  - condition:指定符合条件的才进入缓存

  ```java
   @Cacheable(cacheNames = "emp",condition = "#id > 0")
  ```

  - unless：否定缓存，当unless指定的条件为true,该方法的返回值就不会被缓存，可以获取结果进行判断

  ```java
  // 使用unless判断结果为null就不缓存
  @Cacheable(cacheNames = "emp",condition = "#id > 0",unless = "#result == null ")
  ```