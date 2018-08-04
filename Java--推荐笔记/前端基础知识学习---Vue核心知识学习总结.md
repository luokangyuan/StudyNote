[TOC]

# 一、Vue核心知识

## 1.1.Vue的基本简介

学习一门技术首先登陆其官网，[中文网址](https://cn.vuejs.org/)，[英文网址](https://vuejs.org/)，`vue`是一款渐进式JavaScript框架，作用是为了动态构建用户界面，该框架遵循MVVM模式，编码简洁，体积小，运行效率高；他借鉴了angular的`模板`和`数据绑定技术`，借鉴了react的`组件化`和`虚拟DOM技术`，当然，该技术也存在一个Vue全家桶，例如vue脚手架：`vue-cli`，ajax请求：`vue-resource`，路由：`vue-router`，状态管理：`vuex`，图片懒加载：`vue-lazyload`，移动端UI组件库：`min-ui`，PC端组件库：`element-ui`，页面滑动：`vue-scroller`等等插件；

## 1.2.Vue的基本使用

```html
<div id="app">
    <input type="text" v-model="username">
    <p>Hello {{username}}</p>
</div>
<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
    //创建Vue实例
    const vm = new Vue({ // 配置对象
        el:'#app', // element:选择器
        data:{ //数据（Model）
            username:'世界'
        }
    })
</script>
```

`vue的HelloWord编码说明`

*   使用vue首先引入Vue.js，然后创建Vue对象，其中el表示指定的`根element选择器`，data是指初始化数据，双向数据绑定使用`v-model`，显示数据使用语法：`{{xxx}}`；
*   vue的MVVM的体现就是：`model`代表模型，上述代码就是数据对象（data）,`view`代表视图，就是vue中的模板页面，`viewModel`代表是视图模型（vue实例）；

## 1.3.模板语法

所谓的模板就是动态的Html页面，包含了一些JS语法代码，在Vue中使用`双大括号表达式`和`指令`（以v-开头的自定义标签属性）；

`双大括号表达式`

语法是：`{{xxx}}`，作用就是向页面输出数据，可以调用对象的方法，例如`{{msg.toUpperCase()}}`；

`指令：强制数据绑定`

```html
<body>
<div id="app">
    <p>{{msg}}</p>
    <p>{{msg.toUpperCase()}}</p> 
    <img src="imgSrc" alt="">
</div>
<script src="js/vue.js" type="text/javascript"></script>
<script type="text/javascript">
    new Vue({
        el: '#app',
        data: {
            msg: 'Hello Word',
            imgSrc: 'http://image.luokangyuan.com/1.jpg'
        }
    })
</script>
</body>
```

上述代码中的img标签的src属性不会获取到data中定义的imgSrc属性的值，这个时候就需要使用指令强制数据绑定，功能就是`指定变化的属性值`，完整写法是：`v-bind:src='imgSrc'`，一般采用简洁写法：`:src='imgSrc'`；正确写法如下：

```html
 <img :src="imgSrc" alt="">
```

`指令：绑定事件监听`

```html
<body>
<div id="app">
    <button v-on:click = 'test1'>test1</button>
   	<button v-on:click = 'test2(msg)'>test2</button>
    <button @click = 'test'>test</button>
</div>
<script src="js/vue.js" type="text/javascript"></script>
<script type="text/javascript">
    new Vue({
        el: '#app',
        data: {
            msg: 'Hello Word',
            imgSrc: 'http://image.luokangyuan.com/1.jpg'
        },
        methods: {
            test1() {
                alert(123)
            },
          	test2(content) {
                alert(content)
            },
            test() {
                alert(123)
            }
        }
    })
</script>
</body>
```

绑定事件监听指令的作用就是绑定指定事件名的回调函数，完整写法：`v-on:click='xxx'`或者`v-on:click='xxx(参数)'`再或者`v-on:click.enter='xxx'`，简洁写法就是：`@click='xxx'`，使用`@`符号；

## 1.4.计算属性和监视

`计算属性`

在computed属性对象中定义计算属性的方法，在页面中使用`{{方法名}}`来显示计算的结果；

```html
<body>
<div id="app">
    姓：<input type="text" placeholder="姓氏"  v-model="firstName"><br>
    名：<input type="text" placeholder="名字" v-model="lastName"><br>
    姓名1（单向）：<input type="text" placeholder="姓名1" v-model="fullName1"><br>
    姓名2（单向）：<input type="text" placeholder="姓名2"><br>
    姓名3（双向）<input type="text" placeholder="姓名3双向">

</div>
<script src="js/vue.js" type="text/javascript"></script>
<script type="text/javascript">
    new Vue({
        el: '#app',
        data: {
            firstName: 'A',
            lastName: 'B'
            //如果将 fullName1写在这个地方，那么改变firstName和lastName的值并不会同时改变fullName1的值
            // 所以需要使用到计算属性，将fullName1写入computed属性对象中，将方法的返回值作为输出值
            // fullName1：'A B' 
        },
        computed: {
            // 这个f方法在初始化会执行，当相关属性发生改变时也会执行
            fullName1() { // 计算属性中的一个方法，方法的返回值作为属性值
                return this.firstName + ' ' + this.lastName
            }
        }
    })
</script>
</body>
```

`监视`



# 二、Vue组件化编码方式



# 三、Vue请求方式vue-ajax



# 四、Vue组件库



# 五、Vue路由vue-router



# 六、Vue状态管理vuex







