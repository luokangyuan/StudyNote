####下面将简单介绍一下controller类的相关用法
在上一篇博客中，我们也使用的Controller相关的注解，下面我们来简单的总结一下：
1. @RestController处理Http请求，返回JSON格式的数据。
2. @RequestMapping(value = "/hello",method = RequestMethod.GET)配置URL映射

如果使用多个URL访问同一个的方法，可以将URL映射配置为一个集合，如下所示：

	@RestController
	public class HelloSpringBoot {
	    @Autowired
	    private UserProperties userProperties;
	    @RequestMapping(value = {"/hello","/hi"},method = RequestMethod.GET)
	    public String hello(){
	        return userProperties.getCupSize();
	    }
	}
RequestMapping类注解如下：

	@RestController
	@RequestMapping("demo")
	public class HelloSpringBoot {
	    @Autowired
	    private UserProperties userProperties;
	    @RequestMapping(value = {"/hello","/hi"},method = RequestMethod.GET)
	    public String hello(){
	        return userProperties.getCupSize();
	    }
	}
访问链接为http://localhost:8082/gire/demo/hello
###如何获取参数
1. @PathVariable获取URL中的数据
2. @RequestParam获取请求参数的值
3. @GetMapping组合注解

####@PathVariable注解使用

	@RestController
	@RequestMapping("demo")
	public class HelloSpringBoot {
	    @Autowired
	    private UserProperties userProperties;
	    @RequestMapping( value = "/hello/{id}",method = RequestMethod.GET)
	    public String hello(@PathVariable("id") Integer id){
	        return "id:"+id;
	    }
	}
访问链接如下：http://localhost:8082/gire/demo/hello/5，
####@RequestParam注解使用
如果使用传统的传参数http://localhost:8082/gire/demo/hello?id=5那么获取方式如下所示：

	@RestController
	@RequestMapping("demo")
	public class HelloSpringBoot {
	    @Autowired
	    private UserProperties userProperties;
	    @RequestMapping( value = "/hello",method = RequestMethod.GET)
	    public String hello(@RequestParam("id") Integer id){
	        return "id:"+id;
	    }
	}
也可以使用默认参数值，和要求是否必传，如下所示：

	@RestController
	@RequestMapping("demo")
	public class HelloSpringBoot {
	    @Autowired
	    private UserProperties userProperties;
	    @RequestMapping(value = "/hello",method = RequestMethod.GET)
	    public String hello(@RequestParam(value = "id",required = false,defaultValue = "0") Integer id){
	        return "id:"+id;
	    }
	}
其中required要求是否必传，defaultValue是默认值，如果不传id则显示默认值。
####组合注解
@RequestMapping(value = "/hello",method = RequestMethod.GET)这个注解可以使用 @GetMapping(value = "/hello")这个组合注解来替代，当然 @PutMapping、 @DeleteMapping等形式。
