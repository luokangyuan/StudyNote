## 概念理解-模块和组件
### 模块
向外部提供特定功能的js文件，在webpack中认为一个js文件，一个css文件，一张图片都是一个模块。出现这一概念的原因在于随着项目的复杂度的增加，例如js的代码变得越来越复杂，难以维护，使用模块就可以简化js的编写，提高运行效率。
### 组件
用来实现特定功能效果的代码集合（Html/css/js）,一个页面的功能可以看成是由多个特定功能组件构成，在下一个页面开发中，相同的功能可以调用组件实现，复用的代码，简化了项目编码，提高了运行效率。
### 模块化
当应用的js都是采用模块的方式来编写的，这个功能就是一个模块化应用。
### 组件化
当应用是以多组件的方式实现功能，那么这个应用就是一个组件化应用。
## React介绍
  * Facebook开源的一个js库
  * 一个用来动态构建用户界面的js库
  * React的特点
    * Declarative(声明式编码)
    * Component-Based(组件化编码)
    * Learn Once, Write Anywhere(支持客户端与服务器渲染)
    * 高效
    * 单向数据流
  * React高效的原因
    * 虚拟(virtual)DOM, 不总是直接操作DOM(批量更新, 减少更新的次数) 
    * 高效的DOM Diff算法, 最小化页面重绘(减小页面更新的区域)
    
## React的Hello React
```javascript
<head>
    <meta charset="UTF-8">
    <title>React测试学习</title>
</head>
<body>
    <div id="container"></div>
    <script type="text/javascript" src="js/react.js"></script>
    <script type="text/javascript" src="js/react-dom.js"></script>
    <script type="text/javascript" src="js/babel.min.js"></script>
    <script type="text/babel">
        //创建虚拟DOM对象
        let user = <h2>Hello React !!!</h2>
        //渲染虚拟DOM对象
        console.log(ReactDOM);
        ReactDOM.render(user,document.getElementById('container'))
    </script>
</body>
```
### 说明：什么是虚拟DOM
1. React提供了一些API来创建一种‘特别’的一般js对象，例如

     ```javascript
     var element = React.createElement('h1',{id:'container'},'Hello')
       let user = <h2>Hello React !!!</h2>
     ```

2. 虚拟DOM对象最终都会被React装换为真实的DOM

3. 我们编码时基本只需要操作React的虚拟DOM的相关数据，React会转换为真实DOM变化而更新页面

## JSX
1. 全称是JavaScript XML
2. react定义的一种类似与XML的JS的扩展语法：XML+JS
3. 该语法的作用是用来创建React虚拟DOM对象

	   let user = <h2>Hello React !!!</h2>

4. 其中的标签名任意：HTML标签或者其它标签
5. 标签属性任意：HTML标签属性或者其他
6. 注意：
    * 标签必须有结束
    * 标签的class属性必须改为className属性  
    * 标签的style属性值必须为: {{color:'red', width:12}}

在js中写HTML就直接写，例如：

```javascript
let user = <h2>Hello React !!!</h2>
```
但是在HTML中写js,就必须使用{},例如

```javascript
var msg = 'Hello React!!!';
var ele = <h1>{msg}</h1>
```
## babel.js
浏览器的js引擎是不能直接解析JSX语法代码的，需要使用babel.js转译为纯js代码才能运行。
只要你使用的JSX,都要加上type = "text/babel",声明为babel来处理。
## 创建虚拟DOM的2中方式
1. 纯JS(一般不采用)

	   var element = React.createElement('h1',{id:'container'},'Hello')
2. JSX
       <h1 id='container'>{title}</h1>


### 如下所示：


```javascript
<body>
    <div id="example1"></div>
    <div id="example2"></div>
    <script type="text/javascript" src="js/react.js"></script>
    <script type="text/javascript" src="js/react-dom.js"></script>
    <script type="text/javascript" src="js/babel.min.js"></script>
    <script type="text/babel">
        //方式一：创建虚拟DOM对象
        var element1 = React.createElement('h2',{id:'box1',className: 'box1'},'React.createElement方式创建的虚拟DOM对象')
        //方式二：JSX创建虚拟DOM对象
        let element2 = <h2>JSX创建虚拟DOM对象</h2>
        let user = <h2>Hello React !!!</h2>
        //渲染虚拟DOM对象
        ReactDOM.render(element1,document.getElementById('example1'))
        ReactDOM.render(element2,document.getElementById('example2'))
    </script>
</body>
```
### JSX语法练习
1. 使用JSX创建虚拟DOM
2. React能自动的遍历显示数组中的所有元素
3. array.map()的使用

```javascript
<body>
    <div id="example1">
        <ul>
            <li>AAA</li>
            <li>BBB</li>
            <li>CCC</li>
        </ul>
    </div>
    <hr>
    <div id="example2"></div>
    <script type="text/javascript" src="js/react.js"></script>
    <script type="text/javascript" src="js/react-dom.js"></script>
    <script type="text/javascript" src="js/babel.min.js"></script>
    <script type="text/babel">
        var names = ['张三','李四','王五'];
        ReactDOM.render(
                <ul>
                    {
                        names.map((item,index) => {
                            return <li key ={index}>{item}</li>
                        })
                    }
                </ul>,
            document.getElementById('example2')
        )
    </script>
</body>
```
## 重点：组件开发
就是定义一个一个的组件，然后渲染组件。
### 自定义组件的三种方式
#### 方式一：工厂函数（最简洁，推荐使用）
```javascript
function MyComponent1(){
	return <h1>工厂函数方式自定义组件</h1>
}
```
#### 方式二：ES6类语法方式（复杂组件，推荐使用，也是最常用的）
```javascript
 class MyComponent2 extends React.Component{
      render(){
          return <h1>ES6类语法方式自定义组件</h1>
      }
  }
```
#### 方式三：ES5老语法（不推荐使用）
```javascript
 var MyComponent2 = React.createClass({
      render(){
          return <h1>ES5语法自定义组件</h1>
      }
  })
```
## 注意：
1. 返回的组件类必须首字母大写
2. 虚拟DOM元素必须只有一个根元素
3. 虚拟DOM元素必须有结束标签

现在开发的流程是：先定义组件，在渲染组件
### 渲染组件的方式：

```javascript
 ReactDOM.render(<MyComponent1/>,document.getElementById('example1'));
```
`React的特点就是声明式开发，其实就是我们在组件中声明了虚拟DOM对象，但是我们并没有自己调用例如MyComponent1函数或者render方法，也没有new一个MyComponent2的实例，这些都是 ReactDOM.render帮我们实现的，这就是声明式开发。`