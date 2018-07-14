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
