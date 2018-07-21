**注解@CachePut使用**

既调用方法，又更新缓存数据，当修改了数据库的某一个数据，同时更新缓存

**service层代码如下**

```java
@CachePut(value = "emp")
public Employee updateEmp(Employee employee){
    employeeMapper.updateEmp(employee);
    return employee;
}
```

**Controller层代码如下**

```java
@GetMapping("emp")
public Employee update(Employee employee){
    Employee emp = employeeService.updateEmp(employee);
    return emp;
}
```

**测试说明**

- 先查询id为1的员工信息，第一次请求将查询数据库，然后放入缓存中
- 在执行更新id为1的员工信息，再查询id为1的员工信息，返回的是更新之前缓存中的员工信息
- 原因在于 @Cacheable中的key默认是参数，值是返回结果，查询缓存key是1，value是employee对象，更新方法中的@CachePut注解key是传入的employee对象，value是返回的employee对象，
- 更新之后查询应该返回的是更新的数据，也就是缓存中的数据没有更新，原因在于两次的key不一样导致，修改如下

```java
 @CachePut(value = "emp" ,key = "#employee.id")
public Employee updateEmp(Employee employee){
    employeeMapper.updateEmp(employee);
    return employee;
}
```

**注解@CacheEvict的使用**

注解@CacheEvict清除缓存，通过使用value，key属性清除指定缓存中指定key的缓存数据,有一个allEntries属性，默认是false，意思就是是否删除指定缓存中的所有key的缓存数据。beforeInvocation = false属性表示缓存的清除是否在方法执行之前执行，默认是在方法之后执行，如果出现异常就不会清除缓存，如果在方法之前执行，就是不管方法是否执行成功都会清除缓存数据

**services层代码如下**

```java
@CacheEvict(value = "emp",key = "#id")
public void deleteEmpById(Integer id){
    employeeMapper.deleteEmpById(id);
}
```

**controller层代码如下**

```java
@GetMapping("/delemp/{id}")
public void deleteEmp(@PathVariable("id")Integer id){
    employeeService.deleteEmpById(id);
}
```



**@Cacheable，@CachePut，@CacheEvict的区别**

- 注解@Cacheable是先调用缓存中的数据，如果没有在调用@Cacheable注解的方法
- 注解@CachePut是先调用目标方法，然后再将目标方法的返回结果放入缓存数据中
- 注解@CacheEvict的执行先后可以谁用属性配置改变

**注解@Caching复杂缓存配置的使用**

**Mapper层代码如下**

```java
@Select("select * from employee where lastName = #{lastName}")
Employee getEmpByLastName(String lastName);
```

**service层代码如下**

```java
 @Caching(
     cacheable = {
         @Cacheable(value = "emp",key = "#lastName")
     },
     put = {
         @CachePut(value = "emp",key = "#result.id"),
         @CachePut(value = "emp",key = "#result.email")
     }
 )
public Employee getEmpByLastName(String lastName){
    Employee emp = employeeMapper.getEmpByLastName(lastName);
    return emp;
}
```

上述定义的复杂缓存规则简单讲就是使用名字查询后，缓存中有了key为id的缓存信息，key为email的缓存信息

**Controller层代码如下**

```java
@GetMapping("/emp/lastName/{lastName}")
public Employee getEmpByLastName(@PathVariable("lastName") String lastName){
    return employeeService.getEmpByLastName(lastName);
}
```

**注解@CacheConfig的使用**

在前面中我们对每一个方法都写了@CacheEvict(value = "emp",key = "#id")中的value属性，指定缓存到哪里。我们可以使用@CacheConfig注解指明一个类的所有方法都缓存到哪里，用什么key等信息

```java
@Service
@CacheConfig(cacheNames = "emp")
public class EmployeeService {
```

**总结**

缓存默认使用的ConcurrentMapCacheManager == ConcurrentMapCache，将数据保存在ConcurrentMap,但是在开发中我们经常使用的缓存中间件：redis，memcached.ehcahe等