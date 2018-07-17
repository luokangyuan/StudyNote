# CSS3学习笔记

## 前言

* css的全称是什么？——`casccading style sheets`
* 样式表的组成？——`选择器+声明块`
* 浏览器杜宇编译css的顺序？——`div ul li #test从右往左`

## 选择器

### 基本选择器

* 通配符选择器——`* {margin:0;}`
* 元素选择器——`body {background: #eee}`
* 类选择器——`.list {list-style: square}`
* ID选择器——`#list {width: 500ox}`
* 后代选择器——`.list li {margin-top: 10px}`

#### 子元素选择器

也可以叫后代直接选择器，此类选择器只能匹配到`直接后代`，不能匹配到深层次的后代元素

```css
#wrap > .inner {color: pink;}
```

`Html实例`

```html
<div id="wrap">
    <div>1
        <div>1-1</div>
    </div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
</div>
```

`CSS实例`

```css
#wrap > div{
    color: brown;
    border: 5px solid;
}
```

> 注意：选择的是#wrap下的所有直接后代div,但是color是可继承的，所以1-1颜色也会改变，border却不会。

#### 相邻兄弟选择器

它只会匹配`紧跟`着的兄弟元素

```css
#wrap > #first + .inner{color: #A52A2A;}
```

`Html实例`

```ht
<div id="wrap">
<div class="inner">1</div>
<div id="first">2</div>
<div class="inner">3</div>
<div class="inner">4</div>
<div class="inner">5</div>
</div>
```

> 注意：改变的只是3号div，如果3号之前存在一个`<div></div>`,那么将不会改变

#### 通用兄弟选择器

它会匹配所有的兄弟元素（不需要紧跟）

```css
#wrap #first ~div{border: 1px solid cornflowerblue;}
```

> 注意：HTML结构和相邻兄弟选择器一样，改变的是3,4,5号div

### 属性选择器

#### 存在和值属性选择器

`html结构`

```html
<div id="wrap">
    <div name="zhangsan">1</div>
    <div name="li luo">2</div>
    <div name="li">3</div>
</div>
```

`[attr]`：该选择器选择包含attr属性的所有元素，无论attr的值是什么

```css
div[name]{border: 1px solid blueviolet;} /*选中的是所有div*/
```

`[attr = val]`：该选择器`仅`选择attr属性被赋值val的`所有元素`

```css
div[name = "li"]{border: 1px solid coral;} /*选中的是2,3号div*/
```

`[attr ~= val]`：表示带有以attr命名的属性的元素，并且该属性是以一个空格作为分割的值列表，其中至少一个为val

```css
div[name ~= "luo"]{border: 1px solid coral;} /*选中的是2号div*/
```

#### 子串值属性选择器

`html结构`

```html
<div id="wrap">
    <div name="luo-zhangsan">1</div>
    <div name="li luo">2</div>
    <div name="luo-li">3</div>
    <div name="luoliluo">4</div>
</div>
```

`[attr |= val]`：选择的是attr属性的值是val（包括val）或者以val-开头的元素

```css
div[name |= "luo"]{border: 1px solid coral;} /*匹配的只有1,3号元素*/
```

`[attr ^= val]`：选择的是attr属性的值以val开头（包括val）的元素

```css
div[name ^= "luo"]{border: 1px solid coral;} /*匹配的只有1,4号元素*/
```

`[attr $= val]`：选择的是attr属性的值以val结尾（包括val）的元素

```css
div[name $= "luo"]{border: 1px solid coral;} /*匹配的只有2,4号元素*/
```

`[attr *= val]`：选择的是attr属性的值中包含字符串val的元素

```css
div[name *= "luo"]{border: 1px solid coral;} /*匹配的只有1,2,3,4号元素*/
```

### 伪类与伪元素选择器

#### 链接伪类

`:link`：表示作为超链接，并指向一个为访问的地址的所有锚

`:visited`：表示作为超链接，并指向一个已访问的地址的所有锚

```css
a{text-decoration: none;}
a:link{color: deeppink;}
#test :link{background: pink;}
```
`:target`：代表一个特殊元素，它的id是URL的片段标识符

`:target实例-选项卡,html结构如下`

```html
<body>
    <a href="#div1">div1</a>
    <a href="#div2">div2</a>
    <a href="#div3">div3</a>
    <div id="div1">
        div1
    </div>
    <div id="div2">
        div2
    </div>
    <div id="div3">
        div3
    </div>
</body>
```

`css结构如下`

```css
*{
    margin: 0;
    padding: 0;
}
a{
    text-decoration: none;
    color: deeppink;
}
div{
    width: 200px;
    height: 200px;
    background: pink;
    display: none;
    text-align: center;
    font: 50px/200px "微软雅黑";
}
:target{
    display: block;
}
```


> 注意：`:link`，`:visited`，`:target`是作用与链接元素的

#### 动态伪类

`:hover`：表示悬浮到元素上

`:active`：表示匹配被用户激活的元素（点击按住）

由于a标签的：link和：visited可以覆盖了所有的a标签的状态，所以当：link,:visited,:hover,:active同时出现在a标签身上时，：link和：visited不能放在最后

> 注意：:hover和:active基本可以作用于所有的元素

#### 表单相关伪类

`:enabled`：匹配可编辑的表单
`:disable`：匹配被禁用的表单
`:checked`：匹配被选中的表单
`:focus	`	：匹配获焦的表单

`实例如下`

```css
input:enabled{
    background: deeppink;
}
input:disabled{
    background: blue;
}
input:checked{
    width: 200px;
    height: 200px;
}
input:focus{
    background: darkcyan;
}
```

`html结构如下`

```html
<input type="text" />
<input type="text" disabled="disabled" />
<input type="checkbox" />
```

`小例子-自定义单选按钮`

```html
<label>
    <input type="radio" name="mj" />
    <span></span>
</label>
<label>
    <input type="radio" name="mj" />
    <span></span>
</label>
<label>
    <input type="radio" name="mj" />
    <span></span>
</label>
```

`css代码如下`

```css
*{
    margin: 0;
    padding: 0;
}
label{
    position: relative;
    float: left;
    width: 100px;
    height: 100px;
    border: 2px solid;
    overflow: hidden;
    border-radius: 50%;
}
label > span{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
}
input{
    position: absolute;
    left: -50px;
    top: -50px;
}
input:checked + span{
    background: pink;
}
```

#### 结构性伪类选择器

`:nth-child(index)系列`

* :first-child
* :last-child
* nth-last-child(index):表示从后面开始计数
* only-child(相当于:first-child:last-child或者:noth-child(1):nth-last-child(1))

`:nth-child(index)实例`

```css
/*找到#warp底下的所有li子元素,并且选中第一个子元素，并且这个子元素必须是li*/
#wrap li:nth-child(1){
    color: deeppink;
}
```

> 注意：1.index的值从1开始计数；2.index可以为变量n(只能是n)；3.index可以为even或者odd

`:nth-of-type系列`

* :first-of-type
* last-of-type
* nth-last-type(index):表示从后面开始计数
* only-of-type

```css
#wrap li:nth-of-type(1){
    color: deeppink;
}
```

> 注意：nth-child(index)和nth-of-type(index)的区别：前者找某某下的第一个适配元素，后者找某某下的出现第一次的适配元素。

`nth-child和nth-of-type的区别（坑）`

`html结构如下`

```html
<div id="warp">
    <div class="inner">div</div>
    <span class="inner">span</span>
    <p class="inner">p</p>
    <h1 class="inner">h1</h1>
    <h2 class="inner">h2</h2>
</div>
```

使用nth-child如下，这个没什么问题，选中的是#warp下的class为.inner的第一个元素div

```css
#warp .inner:nth-child(1){
    color: deeppink;
}
```

使用nth-of-type如下，选中的却是所有元素，这是因为`nth-of-type是以元素为中心`

```css
#warp .inner:nth-of-type(1){
    color: deeppink;
}
```

* not

```css
div > a:not(:last-of-type){
    border-right: 1px solid red;
}
```

* enpty(内容必须是空的，有空格都不行)

#### 伪元素选择器

伪元素包含这几种，`::after`，`::before`，`::firstLetter`，`::firstLine`，`::selection`

`::after实例如下`

```css
#warp::after{
    content: "";
    display: block;
    width: 200px;
    height: 200px;
    background: deeppink;
}
```

`::firstLetter实例如下`:将第一个字改变

```html
<div>我是谁？</div>
```

```css
div::first-letter{
    color: deeppink;
    font-size: 24px;
    font-weight: bold;
}
```

`::firstLine实例如下`：将第一行改变

```html
<div>
    我是谁？<br>
    我来自哪里？<br>
</div>
```

```css
div::first-line{
    color: deeppink;
    font-size: 24px;
    font-weight: bold;
}
```

`::selection实例如下`：改变鼠标选中时的状态

```html
<div>我是谁？我来自哪里？</div>
```

```css
div::selection{
    color: deeppink;
    background: white;
}
```

## 自定义字体

`实例如下`

```css
@font-face {
    font-family:;
    src: url();
}
```

## 新增UI方案

### 文本新增样式

#### `opacity`：改变透明度

```css
#warp{
    width: 300px;
    height: 300px;
    margin: 100px auto;
    background: pink;
    opacity: 0.1;
}
#inner{
    width: 100px;
    height: 100px;
    background: deeppink;
}
```

```html
<div id="warp">
    <div id="inner">
        inner
    </div>
</div>
```

#### `新增颜色模式rgba`

```css
#warp{
    width: 300px;
    height: 300px;
    margin: 100px auto;
    background: rgba(0,0,0,.8);
}
```

> 说明：rgba其实就是rgb颜色加一个透明度

#### `实例，背景透明，文字不透明`

```css
#warp{
    width: 300px;
    height: 300px;
    margin: 100px auto;
    background: rgba(0,0,0,0.8);
    color: #FFFFFF;
    font-size: 30px;
    line-height: 300px;
    text-align: center;
}
```

> 如果是文字透明，背景不透明，将color换成rgba,background使用#形式的颜色模式

#### `文字阴影`

text-shadow用来为文字添加阴影，而且可以添加多层，阴影之间用逗号隔开（多个阴影时，第一个在最上面）

```css
h1{
    text-align: center;
    font: 100px/200px "微软雅黑";
    text-shadow: gray 10px 10px 10px;
}
```

#### `实例-浮雕文字`

```css
h1{
    text-align: center;
    font: 100px/200px "微软雅黑";
    color: white;
    text-shadow: black 1px 1px 10px;
}
```

#### `实例-文字模糊效果`

```css
h1{
    text-align: center;
    font: 100px/200px "微软雅黑";
    color: black;
    transition: 1s;
}
h1:hover{
    color: rgba(0,0,0,0);
    text-shadow: black 0 0 100px;
}
```

#### `实例-模糊背景`

```css
#warp{
    height: 100px;
    background: rgba(0,0,0,.5);
    position: relative;
}
#warp #bg{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: url(img/2_1.jpg) no-repeat;
    background-size: 100% 100%;
    z-index: -1;
    filter: blur(10px);/*元素模糊*/
}
img{
    margin: 24px 0 0 24px;
}
```

```html
<div id="warp">
    <img src="img/2_1.jpg" width="64" height="64" />
    <div id="bg"></div>
</div>
```

#### `文字描边`

```css
h1{
    font: 100px/200px "微软雅黑";
    text-align: center;
    color: white;
    -webkit-text-stroke: pink 4px;
}
```

#### `文字排版`

实例，省略过长内容显示为...

```css
div{
    width: 200px;
    height: 100px;
    border: 1px solid;
    margin: 0 auto;
    white-space: nowrap;/*不换行*/
    overflow: hidden;/*省略溢出内容*/
    text-overflow: ellipsis;
}
```

> 注意：这个的使用的前提是：不能让元素的大小靠内容撑大，也就是不能使用`display: inline`;属性

### 盒模型新增样式

#### `盒模型阴影`

```css
box-shadow: inset 10px 10px 10px 0px black ;
```

> 说明：box-shadow较text-shadow多了两个参数，第一个是阴影方向，第五个是阴影大小

```css
#warp{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    width: 100px;
    height: 100px;
    background: pink;/*以上所有样式就是让盒子水平和垂直居中*/
    text-align: center;
    line-height: 100px;
    transition: 1s;
}
#warp:hover{
    box-shadow:  10px 10px  10px 0px black ;
}
```

#### `倒影-webkit-box-reflect`

```css
img{
    vertical-align: middle;
    -webkit-box-reflect: right;
}
```

`resize`:允许你控制一个元素的可调整性，需要overflow：auto配合使用

```css
#warp{
    display: inline-block;
    width: 200px;
    height: 200px;
    background: pink;
    resize: both;
    overflow: auto;
}
```

#### `box-sizing`

box-sizing 属性允许您以特定的方式定义匹配某个区域的特定元素， 

```css
#warp > div{
    margin: 10px;
    width:130px ;
    height: 130px;
    background: deeppink;
    float: left;
    border: 1px solid;
    box-sizing: border-box;
}
```

在上面的css代码中使用 `float: left`;如果要使用 `border: 1px solid`;就必须添加` box-sizing: border-box`;才不会改变布局

### 新增UI样式

#### `圆角`

```css
#warp{
    position: absolute;
    height: 70px;
    width: 200px;
    border: 1px solid;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;/*以上都是让元素水平和垂直居中的方法*/
    border-radius: 30px;
}
```

> border-radius: 30px;这种是简写方式，border-radius: 30px 20px 10px 40px; 是分别对应四角的写法

> 注意：`圆角最好使用px值，不要使用百分比`

#### `圆角实例-旋转的风车`

```css
*{
    margin: 0;
    padding: 0;
}
html,body{
    height: 100%;
    overflow: hidden;/*这两个是禁止滚动条*/
}
#warp{
    position: absolute;
    height: 300px;
    width: 300px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;/*以上都是让元素水平和垂直居中的方法*/
    transition: 2s;
}
#warp > div{
    margin: 10px;
    width:130px ;
    height: 130px;
    background: deeppink;
    float: left;
    border: 1px solid;
    box-sizing: border-box;
}
#warp > div:nth-child(1),#warp > div:nth-child(4){
    border-radius: 0 60%;
}
#warp > div:nth-child(2),#warp > div:nth-child(3){
    border-radius: 60% 0;
}
#warp:hover{
    transform: rotate(120deg);/*旋转函数*/
}
```

```html
<div id="warp">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
```

#### `边框图片`

```css
#warp{
    position: absolute;
    height: 200px;
    width: 200px;
    border: 1px solid;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;/*以上都是让元素水平和垂直居中的方法*/
    border: 50px solid;
    border-image-source: url(img/border-image.png);
    border-image-slice: 33.3333%;
    border-image-repeat: round;
    border-image-width: 20px;
}
```

```html
<div id="warp"></div>
```

#### `线性渐变`

`双颜色值的线性渐变`

```css
background-image:linear-gradient(red,blue);
```

`多颜色值的线性渐变`

```css
background-image:linear-gradient(red,blue,pink,black);
```

`改变渐变方向`

```css
background-image:linear-gradient(to top left,red,blue);
```

`使用角度`

```css
background-image:linear-gradient(0deg,red,blue);
```

`控制颜色节点的分布`

```css
background-image:linear-gradient(90deg,red 10%,orange 15%,yellow 20%,green 30%,blue 50%,indigo 70%,violet 80%);
```

`透明度的渐变`

```css
background-image:linear-gradient(90deg,rgba(255,0,0,0) 50%,rgba(255,0,0,0.5),rgba(255,0,0,1) 60%);
```

`重复渐变`

```css
background: repeating-linear-gradient(90deg,red 10%,blue 30%);
```

#### 渐变实例-发廊灯

```html
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			*{
				margin: 0;
				padding: 0;
			}
			html,body{
				height: 100%;
				overflow: hidden;
			}
			#warp{
				height: 300px;
				width: 40px;
				border: 1px solid;
				margin: 100px auto;
				overflow: hidden;
			}
			#warp > .inner{
				height: 600px;/*这是是颜色所在的高度。远比能看见的要高*/
				background: repeating-linear-gradient(135deg,black 0px,black 10px,white 10px,white 20px);
			}
			#warp:hover .inner{
				margin-top: -300px;
			}
			
		</style>
	</head>
	<body>
		<div id="warp">
			<div class="inner"></div>
		</div>
	</body>
	<script type="text/javascript">
		var inner  = document.querySelector("#warp > .inner");/*获取元素*/
		var flag = 0;/*循环结束后归零*/
		setInterval(function(){
			flag++;
			if(flag == 300){
				flag = 0;
			}
			inner.style.marginTop = -flag+"px";
			
		},1000/60)/*设置定时器循环*/
	</script>
</html>
```

#### 渐变实例-光斑动画

```html
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			*{
				margin: 0;
				padding: 0;
			}
			html,body{
				height: 100%;
				overflow: hidden;
				background: black;
				text-align: center;/*配合h1的display: inline-block;属性让h1这个元素居中*/
			}
			h1{
				display: inline-block;
				color: rgba(255,255,255,.3);
				font: bold 80px "微软雅黑";
				background: linear-gradient(120deg,rgba(255,255,255,0) 100px,rgba(255,255,255,1) 180px,rgba(255,255,255,0) 260px);
				background-repeat: no-repeat;
				-webkit-background-clip: text;
			}
		</style>
	</head>
	<body>
		<h1>码酱博客-专注与总结分享</h1>
	</body>
	<script type="text/javascript">
		var h1  = document.querySelector("h1");/*获取元素*/
		var flag = -160;/*循环结束后归零*/
		setInterval(function(){
			flag+=10;
			if(flag == 900){
				flag = -160;
			}
			h1.style.backgroundPosition = flag+"px";
			
		},30)/*设置定时器循环*/
	</script>
</html>
```

#### 径向渐变

`双颜色值的径向渐变`

```css
background-image:radial-gradient(red,blue);
```

`多颜色值的径向渐变`

```css
background-image: radial-gradient(red,blue,pink,black);
```

`不均匀分布`

```css
background-image:radial-gradient(red 50%,blue 70%);
```

`改变渐变形状`

```css
background-image:radial-gradient(ellipse,red,blue);
```

`渐变形状的尺寸大小`

```css
background-image:radial-gradient(farthest-corner  ellipse,red,blue);
```

`改变圆心`

```css
background-image:radial-gradient(closest-corner  circle at 10px 10px,red,blue);
```

`重复渐变`

```css
background-image:repeating-radial-gradient(closest-corner  circle,red 30%,blue 50%);
```

## 过渡transition

 CSS transition 提供了一种在更改CSS属性时控制动画速度的方法。 其可以让属性变化成为一个持续一段时间的过程，而不是立即生效的。比如，将一个元素的颜色从白色改为黑色，通常这个改变是立即生效的，使用 CSS transitions 后该元素的颜色将逐渐从白色变为黑色，按照一定的曲线速率变化。这个过程可以自定义

 transition是一个简写属性，用于 transition-property,transition-duration,transition-timing-function, 和transition-delay。 

> 注意：在transition属性中，各个值的书写顺序是很重要的：第一个可以解析为时间的值会被赋值给transition-duration，第二个可以解析为时间的值会被赋值给transition-delay


`transition`分为一下属性：`transition-property `，`transition-duration`，`transition-timing-function`，`transition-delay`

### transition-property

指定应用过渡属性的名称，默认值为 all，表示所有可被动画的属性都表现出过渡动,可以指定`多个 property `

> 注意：不是所有的属性都可以添加动画过渡的，过渡时间必须带单位s秒

那些属性可以添加动画过渡，[参看这个连接](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animated_properties)

默认值：

*  none： 没有过渡动画。
*  all ：所有可被动画的属性都表现出过渡动画。

### transition-duration

属性以秒或毫秒为单位指定过渡动画所需的时间。默认值为 `0s` (`一定要带单位`)，表示不出现过渡动画。

可以指定多个时长，每个时长会被应用到由 transition-property 指定的对应属性上。如果指定的时长个数小于属性个数，那么时长列表会重复。如果时长列表更长，那么该列表会被裁减。两种情况下，属性列表都保持不变。

默认值：

* 属性值： 以毫秒或秒为单位的数值` <time> 类型`。表示过渡属性从旧的值转变到新的值所需要的时间。


> 如果时长是 0s ，表示不会呈现过渡动画，属性会瞬间完成转变。不接受负值。一定要加单位(不能写0 一定要写0s  1s,0s,1s)！

### transition-timing-function

CSS属性受到 transition的影响，会产生不断变化的中间值，而 CSS transition-timing-function 属性用来描述这个中间值是怎样计算的。实质上，通过这个函数会建立一条加速度曲线，因此在整个transition变化过程中，变化速度可以不断改变

属性值：

* ease：（加速然后减速）默认值，ease函数等同于贝塞尔曲线(0.25, 0.1, 0.25, 1.0)
* linear：（匀速），linear 函数等同于贝塞尔曲线(0.0, 0.0, 1.0, 1.0)
* ease-in：(加速)，ease-in 函数等同于贝塞尔曲线(0.42, 0, 1.0, 1.0)
* ease-out：（减速），ease-out 函数等同于贝塞尔曲线(0, 0, 0.58, 1.0)
* ease-in-out：（加速然后减速），ease-in-out 函数等同于贝塞尔曲线(0.42, 0, 0.58, 1.0)
* cubic-bezier： 贝塞尔曲线
* step-start：等同于steps(1,start)
* step-end：等同于steps(1,end)
  * `steps(<integer>,[,[start|end]]?)`
  * 第一个参数：必须为正整数，指定函数的步数
  * 第二个参数：指定每一步的值发生变化的时间点（默认值end）

### transition-delay

规定了在过渡效果开始作用之前需要等待的时间。默认值：0s;

你可以指定多个延迟时间，每个延迟将会分别作用于你所指定的相符合的css属性。如果指定的时长个数小于属性个数，那么时长列表会重复。如果时长列表更长，那么该列表会被裁减。两种情况下，属性列表都保持不变

 值以秒（s）或毫秒（ms）为单位，表明动画过渡效果将在何时开始。`取值为正时会延迟一段时间来响应过渡效果；取值为负时会导致过渡立即开始`

### 当属性值的列表长度不一致时

```css
transition-property: background,width,height;
transition-duration: 3s,2s;
transition-delay:3s,2s;
transition-timing-function:linear;
```

`实际效果如下`

```css
transition-property: background,width,height;
transition-duration: 3s,2s,3s;
transition-delay:3s,2s,3s;
transition-timing-function:linear,ease,ease;
```

> 说明：
>
> 1.超出的情况下是会被全部截掉的
> 2.不够的时候，关于时间的会重复列表，transition-timing-function的时候使用的是默认值ease

## 2D变换（变形）transform

transform 属性允许你修改CSS视觉格式模型的坐标空间，transform 属性 , `只对 block 级元素生效`！

* 旋转（rotate）
* 平移（translate）
* 倾斜（skew）
* 缩放（scale）
* 基点的变换

