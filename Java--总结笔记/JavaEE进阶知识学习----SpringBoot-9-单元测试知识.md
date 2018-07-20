###单元测试
####1.先测试Services中的方法

	/**
	 * 根据id查询一个用户
	 * @param id
	 * @return
	 */
	public User findOne(Integer id){
	    return userRepository.findOne(id);
	}
####2.在项目目录中的test/java/com.study.springbootdemo中新建测试类

	import com.study.springbootdemo.domain.User;
	import com.study.springbootdemo.services.UserService;
	import org.junit.Assert;
	import org.junit.Test;
	import org.junit.runner.RunWith;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.boot.test.context.SpringBootTest;
	import org.springframework.test.context.junit4.SpringRunner;
	
	@RunWith(SpringRunner.class)
	@SpringBootTest
	public class UserServicesTest {
	    @Autowired
	    private UserService userService;
	    @Test
	    public void findOneTest(){
	        User user = userService.findOne(1);
	        //使用断言
	        Assert.assertEquals(new Integer(15),user.getAge());
	    }
	}
说明：断言是指我们的预期结果是否程序的执行结果是否一致，其中使用了@RunWith(SpringRunner.class)注解、@SpringBootTest注解。
####3.运行UserServicesTest，测试结果
![](https://i.imgur.com/ImrPgsB.png)
####IDEA简单方法进行测试
#####第一步选中要测试的方法
![](https://i.imgur.com/MPFNCtq.png)
#####第二步选择新建一个测试类
![](https://i.imgur.com/o61ITQ2.png)
#####第三步选择要测试的方法
![](https://i.imgur.com/fyFEW9l.png)
#####第四步结果如下
![](https://i.imgur.com/a7A0BXA.png)
####3.测试API(controller中的方法这里使用IDEA生成API测试类和方法，这里是要模仿发送请求的测试，如下所示：

	@RunWith(SpringRunner.class)
	@SpringBootTest
	@AutoConfigureMockMvc
	public class UserControllerTest {
	    @Autowired
	    private MockMvc mvc;
	
	    @Test
	    public void userList() throws Exception {
	        mvc.perform(MockMvcRequestBuilders.get("/users"))
	                .andExpect(MockMvcResultMatchers.status().isOk());
	    }
	}
说明：

1. 这里比Services测试多了一个注解@AutoConfigureMockMvc。
2. MockMvcRequestBuilders.get("/users")表示发送的是get请求，当然还有put等请求
3. andExpect表示使用断言
4. MockMvcResultMatchers.status()表示获取的是状态


