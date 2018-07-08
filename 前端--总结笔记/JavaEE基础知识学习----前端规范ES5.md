## ES5知识详解
### 严格模式
严格模式就是在编写js代码之前加上下面一句代码，那么js代码就必须严格遵守严格模式的语法要求，

```javascript
'use strict'
```
严格模式的语法要求如下：
1. 必须用var声明变量
2. 禁止自定义函数的this指向window
3. 创建eval作用域
4. 对象不能有重名的属性


第一条语法示例如下
```javascript
<script type="text/javascript">
    username = "张三";
    console.log(username)
</script>
```
上述代码，在没有严格模式的约束下，代码是可以运行打印出字符串的，也不会存在报错的情况。如果使用了严格模式
```javascript
 <script type="text/javascript">
    'use strict'
    var username = "张三";
    console.log(username)
</script>
```
上述代码就使用了严格模式，那么就必须使用var定义username。
第二条语法示例如下

```javascript
<script type="text/javascript">
    function person(name,age){
        this.name = name;
        this.age = age;
    }
    person("张三",54);
</script>
```
上述代码中的person子调用在没有使用严格模式的情况下就不会报错，现在的this就是指向window，使用了严格模式，就要让this指向对象实例。

```javascript
<script type="text/javascript">
    'use strict'
    function person(name,age){
        this.name = name;
        this.age = age;
    }
   new person("张三",54);
</script>
```
第三条语法示例如下

```javascript
 <script type="text/javascript">
    var str = "NBA";
    eval('var str = "CBA";alert(str)')
    alert(str);
</script>
```
上述代码中使用了eval函数，eval函数就是可以解析传入的字符串为js代码，然后执行，上述代码中的弹出结果两次都是CBA,这是因为eval中没有自己作用域，在eval中写的变量就相当于在全局作用域中写的，使用了严格模式，就会给eval创建自己的作用域。

```javascript
 <script type="text/javascript">
    'use strict'
    var str = "NBA";
    eval('var str = "CBA";alert(str)')
    alert(str);
</script>
```
上述代码就是采用了严格模式，就给eval定义的自己的作用域，所以，弹出结果为CBA，NBA。
### JSON对象
### JSON.stringify(obj/arr);js对象（数组）转化为json对象（数组）
### JSON.parse(obj);json对象（数组）装换为js对象（数组）
## JSON和JS对象之间的区别
JSON（JavaScript Object Notation）仅仅是一种数据格式（或者叫数据形式）。数据格式其实就是一种规范，按照这种规范来存诸和交换数据。就好像 XML 格式一样。
![](https://i.imgur.com/TQDrq4y.png)

```javascript
var obj1 = {}; // 这只是 JS 对象

// 可把这个称做：JSON 格式的 JavaScript 对象 
var obj2 = {"width":100,"height":200,"name":"rose"};

// 可把这个称做：JSON 格式的字符串
var str1 = '{"width":100,"height":200,"name":"rose"}';

// 这个可叫 JSON 格式的数组，是 JSON 的稍复杂一点的形式
var arr = [
    {"width":100,"height":200,"name":"rose"},
    {"width":100,"height":200,"name":"rose"},
    {"width":100,"height":200,"name":"rose"},
];
        
// 这个可叫稍复杂一点的 JSON 格式的字符串     
var str2='['+
    '{"width":100,"height":200,"name":"rose"},'+
    '{"width":100,"height":200,"name":"rose"},'+
    '{"width":100,"height":200,"name":"rose"},'+
']';
```
### 语法如下
1、JSON 语法规则：

* 数据在名称/值对中

* 数据由逗号分隔

* 花括号保存对象

* 方括号保存数组

2、JSON 数据值：

* 数字（整数或浮点数）

* 字符串（在双引号中）

* 逻辑值（true 或 false）

* 数组（在方括号中）

* 对象（在花括号中）

* null

JSON 数据结构有两种，这两种结构就是对象和数组，通过这两种结构可以表示各种复杂的结构。
JSON 使用严格的 JavaScript 对象表示法来表示结构化的数据，因此 JSON 的属性名必须有双引号

```javascript
{
	"company": "Apple",
	"age": 18,
	"IPO", true,
	"employees": [
	    { "firstName":"John" , "lastName":"Doe" }, 
	    { "firstName":"Anna" , "lastName":"Smith" }, 
	    { "firstName":"Peter" , "lastName":"Jones" }
	]
}
```
### 数据转换
### JS 数据转换为 JSON 文本
使用 JSON.strigify() 函数，将 Javascript 对象转换为 JSON 文本数据。

```javascript
var obj = {a:1,b:2}
var txt = JSON.stringify(obj);
console.log(txt);
结果：
"{"a":1,"b":2}"
```
### JSON 数据转换为 JS 对象
SON 提供了专门的 JSON Parser 来实现只用于解析 JSON 数据，不会执行 JavaScript 脚本，而且速度更快。如下：

```javascript
var obj = JSON.parse(txt);
```
### Object扩展
ES5给Object扩展了一些静态方法，常用的有2个：
1. Object.create(prototype,[descriptors])

* 作用：以指定对象为原型创建新的对象
* 为新的对象指定新的属性，并对新的属性进行描述
	* value:指定值
	* writable:标识当前属性值是否是可修改的，默认是false
	* configurable:标识当前属性是否可以被删除，默认是false
	* enumerable:标识当前属性是否能用for in 枚举，默认为false


```javascript
 <script type="text/javascript">
    var obj = {username: '张三',age:65};
    var obj1 = {};
    obj1 = Object.create(obj,{
        sex:{
            value: '男',
            writable:true,
            configurable:true,
            enumerable:true
        }
    });
    console.log(obj1);
    console.log(obj1.sex);
    obj1.sex = "女";
    console.log(obj1.sex)
    /*delete obj1.sex;*/
    console.log(obj1)
    for(var i in obj1){
        console.log(i)
    }
</script>
```
2. Object.defineProperties(object,descriptors)

* 作用：为指定对象定义扩展多个属性
	* get：用来获取当前属性值的回调函数
	* set:修改当前属性值的触发的回调函数，并且实参即为修改后的值
* 存取属性：setter,getter一个用来存值，一个用来取值


```javascript
var obj2 = {firstName:"张",lastName:"三疯"};
    Object.defineProperties(obj2,{
        fullName:{
            get:function(){ //获取扩展属性的值
                console.log("get方法被调用");
                return this.firstName+' '+this.lastName;
            },
            set:function(data){//监听扩展属性，当扩展属性发生变化的时候自动调用，自动调用后会将变化后的值作为实参注入到set方法中。
                console.log("set方法被调用===>"+data);
                var names = data.split(' ')
                this.firstName = names[0];
                this.lastName = names[1];

            }
        }
    })
    console.log(obj2.fullName);
    obj2.fullName = '张 三丰';
    console.log(obj2.fullName)
```
### 总结
当我们需要使用扩展属性的值，才会调用get方法，也叫惰性求值。使用一次扩展属性值，就会调用一次get方法。
只有我们修改扩展属性的值，才会调用set方法。
### 数组的扩展
```javascript
<script type="text/javascript">
    var arr = [1,4,3,2,5,8,4,9,6];
    console.log(arr.indexOf(4));//得到值在数组中的第一个下标
    console.log(arr.lastIndexOf(4));//得到值在数组中的最后一个下标
    arr.forEach(function(item,index){//遍历数组
        console.log(item+"===>"+index);
    })
    var arr1 = arr.map(function(item,index){//遍历数组返回一个新的数组
        return item+10;
    })
   console.log(arr1)
    var arr2 = arr.filter(function(item,index){//遍历过滤出一个新的子数组，返回条件为true的值。
        return item >3;
    })
    console.log(arr,arr2)
</script>
```
### 函数的扩展-call,apply,bind
这三个函数其实就是强制绑定this的，下面我们看一个示例

```javascript
<script type="text/javascript">
  var obj = {username: 'zhangsan'};
  function test(){
      console.log(this)
  }
  test();
</script>
```
上述代码就是函数中的this指向的就是window。如果要钱强制改变this的指向，那么就需要就强制改变this的指向，如下所示

```javascript
<script type="text/javascript">
  var obj = {username: 'zhangsan'};
  function test(){
      console.log(this)
  }
  test.apply(obj);
  test.call(obj);
</script>
```
如果不传参数，那么apply和call是一样的，他们的区别在于传参数的时候不同。

```javascript
<script type="text/javascript">
  var obj = {username: 'zhangsan'};
  function test(data){
      console.log(this+data)
  }
  test.call(obj,33);//传参数：从第二个参数开始，依次往后传
  test.apply(obj,[33]);//第二个参数是数组，传入的参数放在数组里。
</script>
```
bind函数

```javascript
 <script type="text/javascript">
  var obj = {username: 'zhangsan'};
  function test(data){
      console.log(this+data)
  }
  test.bind(obj,33)();
</script>
test.bind(obj);返回的是一个函数，后面加一个()就是直接调用，传参数和call一样。
```
### call,apply,bind的区别
* 都能指向函数的this
* call()和apply()是立即调用函数
* bind()是将函数返回


```javascript
<script type="text/javascript">
    setTimeout(function(){
        console.log(this)
    },2000)
</script>
```
上述代码就是function中的this指向window，现在就把this改变指向实例。

```javascript
 <script type="text/javascript">
    var obj = {username: 'zhangsan'};
    setTimeout(function(){
        console.log(this)
    }.bind(obj),2000)
</script>
```
将代码这样书写，this就指向了实例独对象。
### 到此，ES5的相关知识就学到这儿了，
