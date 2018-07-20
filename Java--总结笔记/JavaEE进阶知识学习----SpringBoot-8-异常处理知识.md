###SpringBoot中对异常的统一处理
异常处理也可以说成是一种数据传输方式，简单来讲，可以在Services中抛出异常信息，在controller中接收异常信息，然后就可以返回到页面显示了。
####异常处理实例
如果我们需要获取用户的年龄，并根据年龄进行判断，并作出不同的响应。
#####1.首先我们会定义返回结果数据的通用类，如下：

	public class Msg {

	    //状态码100-成功，200-失败
	    private int code;
	    //提示信息
	    private String msg;
	    //具体提示消息
	    private String message;
	    //用户要返回给浏览器的数据
	    private Map<String, Object> extend = new HashMap<String, Object>();
	
	    public static Msg success(String message){
	        Msg result = new Msg();
	        result.setCode(100);
	        result.setMsg("处理成功");
	        return result;
	    }
	    public static Msg fail(String message){
	        Msg result = new Msg();
	        result.setCode(200);
	        result.setMsg("处理失败");
	        result.setMessage(message);
	        return result;
	    }
	    public Msg add(String key,Object value){
	        this.getExtend().put(key, value);
	        return this;
	    }
	    public int getCode() {
	        return code;
	    }
	    public void setCode(int code) {
	        this.code = code;
	    }
	    public String getMsg() {
	        return msg;
	    }
	
	    public String getMessage() {
	        return message;
	    }
	
	    public void setMessage(String message) {
	        this.message = message;
	    }
	
	    public void setMsg(String msg) {
	        this.msg = msg;
	    }
	    public Map<String, Object> getExtend() {
	        return extend;
	    }
	    public void setExtend(Map<String, Object> extend) {
	        this.extend = extend;
	    }
	}
#####2.修改Controller中的添加一个用户的方法

	@PostMapping(value = "/users")
	public Msg addUser(@Valid User user, BindingResult bindingResult){
	    if(bindingResult.hasErrors()){
	        return Msg.fail(bindingResult.getFieldError().getDefaultMessage());
	    }
	    user.setUserName(user.getUserName());
	    user.setAge(user.getAge());
	    return Msg.success().add("user",userRepository.save(user));
	}
#####3.测试
我们先测试失败的时候，我们开始做了一个年龄age的检验，不满足校验就会报错，如下：

![](https://i.imgur.com/X2Au6AA.png)

我们再来测试成功的时候，如下：

![](https://i.imgur.com/0T8pDcc.png)
可以看出我们写的通用的返回类，返回给客户端的数据格式是一致的。上面仅仅是测试一下我们写的通用返回类，下面我们将继续完成对用户年龄的判断。
#####4.Services中添加方法
	public void getAge(Integer id){
	    User user = userRepository.findOne(id);
	    Integer age = user.getAge();
	    if(age < 20){
	        //返回你还在上大学吧
	    }else if(age > 20 && age < 30){
	        //返回你刚工作不久吧
	    }
	}
#####5.userController中根据年龄获取用户
	@GetMapping(value = "users/getAge/{id}")
	public void getAge(@PathVariable("id") Integer id){
	    userService.getAge(id);
	}
但是，在controller中怎么获取Services中的返回的值，可能有的或说将Services的返回值改为String，如果我们要做其他操作，要返回一个对象或者其他呢，当然还有很多方式可以实现，但是随着业务的复杂，我们最好的使用统一异常的方式较为好些。
#####6.修改Services中的getAge方法

	public void getAge(Integer id) throws Exception{
	    User user = userRepository.findOne(id);
	    Integer age = user.getAge();
	    if(age < 20){
	        //返回你还在上大学吧
	        throw new Exception("你还在上大学吧!!!");
	    }else if(age > 20 && age < 30){
	        //返回你刚工作不久吧
	        throw new Exception("你刚工作不久吧!!!");
	    }
	}
#####7.增加一个统一异常处理类

	import com.study.springbootdemo.domain.Msg;
	import org.springframework.web.bind.annotation.ControllerAdvice;
	import org.springframework.web.bind.annotation.ExceptionHandler;
	import org.springframework.web.bind.annotation.ResponseBody;
	
	@ControllerAdvice
	public class ExceptionHandle {
	
	    //使用注解说明要捕获哪一个异常类,Exception是我们抛出异常使用的类
	    @ExceptionHandler(value = Exception.class)
	    @ResponseBody
	    public Msg handle(Exception e){
	        return Msg.fail(e.getMessage());
	    }
	}
#####8.测试
首先先看我数据库中表的信息
![](https://i.imgur.com/UBokLLn.png)
测试年龄小于20d的异常捕获和返回
![](https://i.imgur.com/i0mzGg7.png)
测试年龄大于20小于30的异常捕获和返回
![](https://i.imgur.com/pEFhkg9.png)
#####9.自定义异常类
使用Exception异常类只能抛出一个异常信息，throw new Exception("你还在上大学吧!!!");，如果我们要抛出其他的信息就要自定义异常类。

	public class UserException extends RuntimeException{
	
	    private String mes;
	
	    public UserException(String msg,String message){
	        super(message);
	        this.mes = msg;
	    }
	
	    public String getMes() {
	        return mes;
	    }
	
	    public void setMes(String mes) {
	        this.mes = mes;
	    }
	}
#####10.修改Services类，抛出自定义异常类

	public void getAge(Integer id) throws Exception{
	    User user = userRepository.findOne(id);
	    Integer age = user.getAge();
	    if(age < 20){
	        //返回你还在上大学吧
	        throw new UserException("年龄小于20的异常","你还在上大学吧!!!");
	    }else if(age > 20 && age < 30){
	        //返回你刚工作不久吧
	        throw new UserException("年龄大于20且小于30的异常","你刚工作不久吧!!!");
	    }
	}
#####11.异常捕获类

	@ControllerAdvice
	public class ExceptionHandle {
	
	    //使用注解说明要捕获哪一个异常类,Exception是我们抛出异常使用的类
	    @ExceptionHandler(value = Exception.class)
	    @ResponseBody
	    public Msg handle(Exception e){
	        if(e instanceof UserException){
	            UserException userException = (UserException) e;
	            userException.getMes();//自定义异常的第一个信息
	            userException.getMessage();//自定义异常的第二个信息
	
	            return Msg.fail(userException.getMes());
	        }
	        return Msg.fail(e.getMessage());
	    }
	}
#####12优化Services
如果有很多的异常信息在各个类中抛出，修改和维护就特别困难，所以我们使用枚举来统一管理，新建一个枚举

	public enum ResultEnum {
	    ERROR_ONE("101","你还在上大学吧!!!"),
	    ERRON_TWO("102","你刚工作不久吧!!!")
	    ;
	    private String mes;
	    private String message;
	
	    public String getMes() {
	        return mes;
	    }
	    ResultEnum(String msg,String message){
	        this.mes = msg;
	        this.message = message;
	    }
	    public String getMessage() {
	        return message;
	    }
	}
然后修改我们自定义异常类

	public class UserException extends RuntimeException{
	
	    private String mes;
	
	    public UserException(ResultEnum resultEnum){
	        super(resultEnum.getMessage());
	        this.mes = mes;
	    }
	
	    public String getMes() {
	        return mes;
	    }
	
	    public void setMes(String mes) {
	        this.mes = mes;
	    }
	}
修改我们的Services

	public void getAge(Integer id) throws Exception{
	    User user = userRepository.findOne(id);
	    Integer age = user.getAge();
	    if(age < 20){
	        //返回你还在上大学吧
	        throw new UserException(ResultEnum.ERROR_ONE);
	    }else if(age > 20 && age < 30){
	        //返回你刚工作不久吧
	        throw new UserException(ResultEnum.ERRON_TWO);
	    }
	}




