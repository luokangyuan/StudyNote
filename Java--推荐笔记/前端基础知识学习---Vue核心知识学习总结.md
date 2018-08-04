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

`计算属性的get和set`

使用计算属性实现上述的双向绑定，代码如下：

```html
<body>
<div id="app">
    姓：<input type="text" placeholder="姓氏"  v-model="firstName"><br>
    名：<input type="text" placeholder="名字" v-model="lastName"><br>
    姓名3（双向）<input type="text" placeholder="姓名3双向" v-model="fullName3">

</div>
<script src="js/vue.js" type="text/javascript"></script>
<script type="text/javascript">
    new Vue({
        el: '#app',
        data: {
            firstName: 'A',
            lastName: 'B'
            // fullName1：'A B' 
        },
        computed: {
            fullName3: {
                // 回调函数：你定义的，你没有调用，但最终他执行了
                 // 回调函数，当需要读取当前属性值时回调，根据相关的数据计算并返回当前属性的值
                get(){
                    return this.firstName + ' ' + this.lastName
                },
                // 回调函数，监视当前属性的变化，当属性值发生改变时回调，更新相关的属性数据
                set(value){
                    const names = value.split(' ');
                    this.firstName = names[0];
                    this.lastName = names[1];
                }
            }
        }
    })
</script>
</body>
```

>   注意：计算属性存在缓存，多次读取只执行一次getter计算；

`监视`

通过vm对象的`$watch()方法或者watch配置`来监视某一个属性的值是否发生变化，当属性发生变化时，通过执行回调函数来执行相关的功能，下面的代码是使用计算属性完成的同一个功能，

```html
<body>
<div id="app">
    姓：<input type="text" placeholder="姓氏"  v-model="firstName"><br>
    名：<input type="text" placeholder="名字" v-model="lastName"><br>
    姓名2（单向）：<input type="text" placeholder="姓名2" v-model="fullName2"><br>
    姓名3（双向）<input type="text" placeholder="姓名3双向">

</div>
<script src="js/vue.js" type="text/javascript"></script>
<script type="text/javascript">
   var vm =  new Vue({
        el: '#app',
        data: {
            firstName: 'A',
            lastName: 'B',
            fullName2: 'A B'
        },
        watch: {
            // 这个方法就是监视firstName，值发生改变是被调用执行函数
            // 函数可以传入两个参数代表新值和改变之前的值，也可以传一个，也可以不传
            firstName: function(value){ 
                this.fullName2 = value+ ' ' + this.lastName
            }
        }
    })
    vm.$watch('lastName',function(value){
        this.fullName2 = this.firstName + ' ' + value
    })
</script>
</body>
```

## 1.5.class和style绑定

在某些页面中，某些元素的样式是动态发生变化的，class和style绑定就是用来实现动态改变样式效果的技术，其中class绑定中，表达式可以是字符串，可以是对象，也可以是数组，实例如下：

```html
<head>
  <meta charset="UTF-8">
  <title>class和style绑定</title>
  <style>
      .aClass{color: red}
      .bClass{color: blue}
  </style>
</head>
<body>
<div id="app">
    <h1>class绑定</h1>
    <p :class="a">我是字符串</p>
    <p :class="{aClass: isA,bClass: isB}">我是对象</p> <!--class绑定的是对象。当为true才会留下-->
    <h1>style绑定</h1>
    <p :style="{color: activeColor, fontSize: fontSize+'px'}">我是style强制绑定</p>
    <button @click='update'>更新</button>
</div>
<script src="js/vue.js" type="text/javascript"></script>
<script type="text/javascript">
    new Vue({
        el: '#app',
       data: {
        a: 'aClass',
        isA: true,
        isB: false ,// 以上是绑定class
        activeColor: 'red', // 以下是绑定style
        fontSize : 20
       },
       methods: {
        update(){
            this.a = 'bClass';
            this.isA = false;
            this.isB = true;// 以上是绑定class
            this.activeColor = 'blue';
            this.fontSize = 30;
        }
       }
    })
</script>
</body>
```

## 1.6.条件渲染

在vue中条件渲染使用`v-if`、`v-else`和`v-show`指令，二者不同的地方在于`v-if`是不会生成不应该显示的元素，`v-show`是通过css控制隐藏不应该显示的节点元素，是在页面生成的，当需要频繁的切换时，使用`v-show`比较好，当条件不成立时，`v-is`的所有子节点也不会被解析；

```html
<body>
<div id="app">
    <p v-if = 'ok'>显示成功</p>
    <p v-else>显示失败</p>
    <p v-show = 'ok'>显示成功-v-show</p>
    <p v-show = '!ok'>显示失败-v-show</p>
    <button @click='ok=!ok'>切换</button>
</div>
<script src="js/vue.js" type="text/javascript"></script>
<script type="text/javascript">
    new Vue({
        el: '#app',
        data: {
            ok: false
        }
    })
</script>
</body>
```

## 1.7.列表渲染

列表的渲染使用的是`v-for`指令，可以渲染数组和对象，注意的是遍历的时候指定唯一的index或者key，另外在做数组的删除和更新操作时使用数组的`变异方法`，有关vue的数组变异方法可以参考官方API；

```html
<body>
<div id="app">
    <h2>v-for遍历数组</h2>
   <ui>
       <li v-for="(u,index) in users" ::key="index">
           {{index}}===={{u.name}}===={{u.age}}==
           <button @click='deleteUser(index)'>删除</button>==<button @click="updateUser(index,{name: '王八',age: 45})">更新</button>
       </li>
   </ui>
   <h2>v-for遍历对象</h2>
   <ul>
       <li v-for="(value,key) in users[1]" :key="key">
           {{value}}==={{key}}
       </li>
   </ul>
</div>
<script src="js/vue.js" type="text/javascript"></script>
<script type="text/javascript">
    new Vue({
        el: '#app',
        data: {
            users: [ // vue本身只是监视了users的改变，没有监视数组内部数据的改变
                {name: '张三',age: 23},
                {name: '李四',age: 56},
                {name: '王五',age: 76},
                {name: '赵六',age: 87},
                {name: '陈七',age: 34}
            ]
        },
        methods: {
            deleteUser(index){
                this.users.splice(index,1);
            },
            updateUser(index,value){
                // 如果只写 this.users[index] = value这一条语句，只改变了数组内部的数据，如果不调用vue的变异方法，就不会更新页面
                // vue重写了数组中的一系列方法，重写后就是改变数组操作，然后重新渲染页面，也就是实现的数据绑定
                this.users.splice(index,1,value) ;
            }
        }
    })
</script>
</body>
```

`列表渲染-列表过滤和排序`

```html
<body>
<div id="app">
  <input type="text" v-model="searchName">
   <ui>
       <li v-for="(u,index) in filterUsers" ::key="index">
           {{index}}===={{u.name}}===={{u.age}}
       </li>
   </ui>
   <button @click="setOrderType(1)" >年龄升序</button>
   <button @click="setOrderType(2)">年龄降序</button>
   <button @click="setOrderType(0)">原本排序</button>
</div>
<script src="js/vue.js" type="text/javascript"></script>
<script type="text/javascript">
    new Vue({
        el: '#app',
        data: {
            searchName: '',
            orderType: 0, // 0代表原本，1代表升序，2代表降序
            users: [ // vue本身只是监视了users的改变，没有监视数组内部数据的改变
                {name: '张三',age: 23},
                {name: '李四',age: 56},
                {name: '张五',age: 76},
                {name: '赵六',age: 87},
                {name: '陈七',age: 34}
            ]
        },
        computed: {
            filterUsers() {
                const {searchName,users,orderType} = this;// 取到相关数据（searchName和users）
                let fusers; // 定义最终返回的数组
                fusers = users.filter(u => u.name.indexOf(searchName) !==-1);// 对users进行过滤
                // 对fusers排序
                if(orderType !== 0){
                    fusers.sort(function(u1,u2){ // 如果返回负数p1在前，返回正数p2在前
                        // 1.代表升序,2.代表降序
                        if(orderType == 2){
                            return u2.age - u1.age
                        }else{
                            return u1.age -u2.age
                        }
                    })
                }
                return fusers;
            }
        },
        methods: {
            setOrderType(value){
                this.orderType = value;
            }
        }
    })
</script>
</body>
```



# 二、Vue组件化编码方式



# 三、Vue请求方式vue-ajax



# 四、Vue组件库



# 五、Vue路由vue-router



# 六、Vue状态管理vuex







