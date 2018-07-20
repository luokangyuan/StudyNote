下面是接着基础知识的代码整理后，如下所示：
![](https://i.imgur.com/GkfsJ8V.png)
在前面的学习中，我们写了一个插入用户的方法，如下：

	@PostMapping(value = "/users")
    public User addUser(@RequestParam("userName")String userName,@RequestParam("age")Integer age){
        User user = new User();
        user.setUserName(userName);
        user.setAge(15);
        return userRepository.save(user);
    }
从上述代码中，我们可以看出随着用户的属性增多时，代码量就会变得很多，我们可以做如下的修改：

	@PostMapping(value = "/users")
    public User addUser(User user){
        user.setUserName(user.getUserName());
        user.setAge(user.getAge());
        return userRepository.save(user);
    }
当我们进行表单验证时，使用注解的方式在实体类中，例如年龄必须大于18岁，如下：

	@Min(value = 18,message = "未成年人禁止注册")
	private Integer age;
控制类中的方法修改如下：

	@PostMapping(value = "/users")
    public User addUser(@Valid User user, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            System.out.print(bindingResult.getFieldError().getDefaultMessage());
            return null;
        }
        user.setUserName(user.getUserName());
        user.setAge(user.getAge());
        return userRepository.save(user);
    }
	
说明：

1. 使用了@Min(value = 18,message = "未成年人禁止注册")进行表单字段校验
2. 使用@Valid注解表示校验user这个对象
3. 校验结果存在在BindingResult bindingResult这个对象中

####SpringBoot采用的是Hibernate-validator校验规则，常用的校验规则如下所示：

1. @AssertTrue 用于Boolean字段，该字段只能为true
2. @AssertFalse 用于Boolean字段，该字段只能为false
3. @CreditCardNumber 对信用卡进行一个大致的验证
4. @DecimalMax("5") 只能小于或等于该值
5. @DecimalMin("48")只能大于和等于该值
6. @Digits(integer = 2,fraction = 20) 检查是否是一种数字的整数，分数，小数位数的数字
7. @Email 对邮箱进行校验
8. @Future 检查该字段的日期是否是一个将来的日期
9. @Length(min = 12,max = 45) 检查所属字段的长度是否在min和max之间，只能用于字符串
10. @Max(value = 15) 该字段的值只能小于或者等于该值
11. @Min(value = 1) 该字段的值只能大于或者等于该值
12. @NotNull 不能为null 
13. @NotBlank 不能为空，检查的时候会将空格忽略
14. @NotEmpty 不能为空，这里指的是空字符串
15. @Null 检查该字段是否为空
16. @Past 检查该字段的是日期在过去
17. @Size(min = 12,max = 51) 检查该字段的size是否在min和max之间，包括字符串，数组，集合，Map等
18. @URL(protocol = "1",host = "",port = 51) 检查是否是一个有效的URL
19. @Valid 该注解只能用于字段为一个包含其他对象的集合或map或数组的字段。



