# JavaScript基础部分

## JavaScript简介

### JavaScript实现

JavaScript是一种专门为网页交互设计的脚本语言，有以下三部分组成：

* ECMAScript，提供和核心语言功能；
* 文档对象模型（DOM），提供访问和操作网页内容的方法和接口；
* 浏览器对象模型（BOM），提供与浏览器交互的方法和接口；

## HTML中使用JavaScript

### 标签的位置

`传统位置将JavaScript放在title后面`

```html
<head>
    <meta charset="UTF-8">
    <title></title>
    <script type="text/javascript" src="../js/index.js"></script>
</head>
```

由于解析网页的时候按照从上到写的加载原则，只有等所有的JavaScript文件加载成功后页面才能显示，如果JavaScript文件有一处错误，那么整个页面都就是一片空白，因此，位置应该放置与body内容后面，如下：

```html
<body>
    <!--这里放页面内容-->
    <script type="text/javascript" src="../js/index.js"></script>
</body>
```

## JavaScript基本概念

### JavaScript语法

`严格区分大小写`

在ECMAScript中的一切变量，函数名和操作符都严格区分大小写，例如变量名test和Test是两个不同的变量名。

`标识符`

`标识符`就是指变量，函数，属性的名字，或者函数的参数名，标识符是由满足下列规则组合的一个或者多个字符

* 第一个字符必须是一个字母、下划线（_）或者一个美元符号（$）；
* 其他字符可以是字母、下划线、美元符号或者数字；
* 标识符一般采用驼峰命名法，首字母小写，每一个单词的开头字母大写（规范，不是强制要求）

> 注意：不能将关键字，保留字，true，false和null用作标识符

`注释`

ECMAScript中有单行注释和块级注释，单行注释以两个斜杠开头，块级注释以一个斜杠加一个星号开头（/*），一个星号加一个斜杠结尾。

`语句`

ECMAScript语句以一个分号结尾，虽然不加分号也是能运行的，但是不加分号，是浏览器很会帮我们添加分号，这样依赖降低性能，二来，浏览器有时会加错分号的位置，所以，养成良好的代码编写风格，自己加。

### 关键字和保留字

在ECMAScript中具有特定用途的标识符称之为关键字，这些关键字可表示控制语句的开始或者结束，或者用于描述一个变量等，如下：

* `breake；do；instanceof；typeof；case；else；new；var,catch；finally；return；`
* `void；continue；for；switch；while；default；if,throw；delete；in；try；`
* `function；this；with；debugger；false；true；null`

还存在一些没有特殊用途的标识符，但是以后可能有特殊用途的标识符称之为保留字，如下：

* `class ；enum；extends；super；const；export；`
* `import；implements；le:；private；public；yield；interface；package；protected；static`

> 说明：在ES6中已经将let作为关键字定义变量

## JavaScript数据类型

### 变量

在ES中，变量是`松散类型`的，所谓松散类型就是说变量可以保存任何类型的数据，换句话说，这个变量仅仅是一个用于保存值的占位符，使用关键字`var`，在ES6中推荐使用`let`关键字；

### 数据类型

在ES中定义了六种数据类型，其中包含了五种基本数据类型，分别是：`String，Number，Boolean，Null，Underfined`和一种复杂数据类型`Object`；

### typeof操作符

因为在ES中的数据类型是松散类型的，因此需要一种手段来检测变量的数据类型，这个时候就使用`typeof`，使用该操作符可能返回以下值，分别为：

* `underfined`：表示这个值未定义；
* `boolean`：表示这个值是布尔值；
* `string`：表示这个值是一个字符串；
* `number`：表示这个值是一个数值；
* `object`：表示这个值是一个对象或者null；
* `function`：表示这个值是一个函数；

```javascript
var a = "hello"
console.log(typeof a);
console.log(Number.MAX_VALUE * Number.MAX_VALUE)/*返回的是Infinity无穷大*/
```

### Undefined类型

Undefined类型就只有一个undefined值，在使用var定义变量后，未初始化该变量，那么使用typeof检测，返回的就是undefined，例如：

```javascript
var message;
console.log(message)/*undefined*/
console.log(message == undefined);/*true*/
```

### Null类型

NULL类型也只有一个NULL值，从逻辑角度看，这个NULL值代表的是一个空对象指针，所以当我们使用`typeof null`返回的是Object，如下：

```javascript
var user = null;
console.log(typeof user);/*object*/
```

> 注意：如果定义变量是在将来用于保存对象，那么最好在定义的时候就初始化为NULL

### Boolean类型

Boolean类型有两个值，分别为:true，false；这两个值和数字值没有关系，true并不代表1，如下：

```javascript
var message = false;
var test = true;
```

> 注意：Boolean类型的值是区分大小写的，True和False，或者大小写混写都只是代表标识符，不是Boolean值；

虽然Boolean类型的值只有两个，但是在ES中任何类型的值都可以与这两个Boolean值有着等价的值，要将一个值转换为对应的Boolean值，可以调用转型函数`Boolean()`，如下所示：

```javascript
var test = "Helo";
var testBoolean = Boolean(test);
console.log(typeof testBoolean)/*boolean*/
console.log(testBoolean);/*true*/
```

有关各种数据类型的转换规则如下：

* String类型，非空字符转换为true，空字符串转换为false；
* number类型，任何非零数字值（包括无穷大），转换为true，0和NaN转换为false；
* Object类型，任何对象转换为true，NUL转换为false；

使用这些转换规则可以更方便的使用if流程语句，例如：

```javascript
var message = "Hello Word";
if(message){
    console.log("我执行了。。。")/*该行代码会被执行*/
}
```

### Number类型

ES中Number数据类型包含整数和浮点数值，在JavaScript中可以使用number类型保存正零和负零，正零和负零被认为是相等的。

`浮点数值`

在JavaScript中浮点数值就是数值中必须包含一个小数点，并且小数点后至少有一位数字，虽然小数点前面可以没有整数，但是不建议这种写法，如下：

```javascript
var floatN1 = "1.1";
var floatN2 = "0.1";
var floatN3 = ".1";/*虽有效，但不推荐*/
```

由于保存浮点数值需要的内存空间是整数的两倍，所以，只要可以将浮点数转换为整数，就会转换为整数，如下：

```javascript
var floatN1 = "1.0";
```

当然也可以使用科学计数法，如下：

```javascript
var floatN1 = 3.12e7;
```

> 注意：使用浮点数值进行计算会产生误差的问题，所以和钱相关的就不要使用JavaScript计算了。