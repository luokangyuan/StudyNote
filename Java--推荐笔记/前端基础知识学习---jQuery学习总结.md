# jQuery学习笔记

## jQuery简介

jQuery是一个优秀的`JS函数库`,其[官网](http://jquery.com/)可以看一下，jQuery包含了HTML元素选取，HTML元素操作，CSS操作，HTML事件等内容。

## jQuery的两把利器

### jQuery核心函数

jQuery核心函数就是`$或者jQuery`，它定义了这个全局的函数供我们使用，它既可以用于一般的函数调用，且传递的参数类型不同，格式不同功能就完全不同，也可以作为对象调用其定义好的方法，此时的$就是一个工具对象。

#### 作为函数调用

* `参数为函数即$(function)`
* `参数为选择器字符串即$("#btn")`
* `参数为DOM对象即$(div)`
* `参数为html标签字符串即$("<div>")`

```html
<body>
    <input type="text" name="userName" id="userName" />
    <button id="search" value="搜索">搜索</button>
    <script type="text/javascript" src="js/jquery-1.10.1.js" ></script>
    <script type="text/javascript">
        $(function(){/*绑定文档加载完成的监听*/
            $('#search').click(function(){/*给按钮添加点击监听事件*/
                var userName = $('#userName').val();/*获取DOM元素的值*/
            })
        })
    </script>
</body>
```

> 说明：上述代码使用了jQuery核心函数：`$/jQuery`，使用了jQuery核心对象：执行`$()返回的对象`，`$('#search')`

作为函数的时候，不同参数实例

```html
<body>
    <div>
        <button id="btn">确定</button>
        <input type="text" name="msg1" />
        <input type="text" name="msg2" />
    </div>
    <script type="text/javascript" src="../js/jquery-1.10.1.js" ></script>
    <script type="text/javascript">
        $(function(){/*参数为函数即$(function):执行此回调函数*/
            /*参数为选择器字符串即$("#btn"):查找所匹配的标签，并将他们封装为jQuery对象*/
            $('#btn').click(function(){/*绑定监听事件*/
                alert(this.innerHTML)/*this:发生事件的DOM元素*/
                /*参数为DOM对象即$(div):此时的this就是一个DOM元素，
                *此时将dom对象封装为jQuery对象，就可以使用jQuery对象的方法*/
                alert($(this).html())
                /*参数为html标签字符串即$("<div>"):创建标签对象，并封装为jQuery对象*/
                $('<input type="text" name="msg3" />').appendTo('div');
            })
        })
    </script>
</body>
```



### jQuery核心对象



