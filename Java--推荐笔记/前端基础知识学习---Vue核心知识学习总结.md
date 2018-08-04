

# Vue.js学习笔记

> Vue.js的使用之HelloWord

* 引入Vue.js
* 创建Vue对象
  * 其中el：指定根element（选择器）
  * data：初始化数据（页面可以访问）
* 双向数据绑定：v-model
* 显示数据：{{xxx}}

> 实例如下

~~~javascript
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
~~~

> MVVM在Vue中体现如下

model：模型，在Vue中就是数据对象（data）

view：视图，就是Vue中的模板页面

viewModel：视图模型（Vue的实例）

## 模板语法

模板：动态的HTML页面，包含了一些JS语法代码，例如大括号表达式，指令（以v-开头的自定义标签）

> 双大括号表达式

语法：{{xxx}}或者{{{exp}}},功能就是向页面输出数据，可以调用对象的方法，例如

~~~javascript
<body>
    <div id="app">
        <p>{{msg}}</p>
        <p>{{msg.toUpperCase()}}</p>
    </div>
    <script type="text/javascript" src="../js/vue.js"></script>
    <script>
        new Vue({
            el:'#app',
            data:{
                msg:'I Will Back'
            }
        })
    </script>
</body>
~~~

> 强制数据绑定指令

数据强制绑定指令v-bind,使用如下 `<img v-bind:src="imgUrl">`，以`：`简写

~~~javascript
<body>
<div id="app">
    <p>{{msg}}</p>
    <p>{{msg.toUpperCase()}}</p>
    <img:src="imgUrl">
</div>
<script type="text/javascript" src="../js/vue.js"></script>
<script>
    new Vue({
        el:'#app',
        data:{
            msg:'I Will Back',
            imgUrl:"http://cn.vuejs.org/images/logo.png"
        }
    })
</script>
~~~

> 绑定事件监听指令

绑定事件监听使用v-on指令` <button v-on:click="test">按钮</button>`，在实例中简写如下`@click`

~~~javascript
<body>
<div id="app">
    <p>{{msg}}</p>
    <p>{{msg.toUpperCase()}}</p>
    <img :src="imgUrl">
    <button @click="test">按钮</button>
    <button @click="test2('发奋学习')">按钮</button>
 	<button @click="test2(msg)">按钮</button>
</div>
<script type="text/javascript" src="../js/vue.js"></script>
<script>
    new Vue({
        el:'#app',
        data:{
            msg:'I Will Back',
            imgUrl:"http://cn.vuejs.org/images/logo.png"
        },
        methods:{
            test(){
                alert("Hello !!")
            },
            test2(content){
                alert(content)
            }
        }
    })
</script>
</body>
~~~
