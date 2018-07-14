## 新增UI方案

### 文本新增样式

`opacity`：改变透明度

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

`新增颜色模式rgba`

```css
#warp{
    width: 300px;
    height: 300px;
    margin: 100px auto;
    background: rgba(0,0,0,.8);
}
```

> 说明：rgba其实就是rgb颜色加一个透明度

`实例，背景透明，文字不透明`

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

`文字阴影`

text-shadow用来为文字添加阴影，而且可以添加多层，阴影之间用逗号隔开（多个阴影时，第一个在最上面）

```css
h1{
    text-align: center;
    font: 100px/200px "微软雅黑";
    text-shadow: gray 10px 10px 10px;
}
```

`实例-浮雕文字`

```css
h1{
    text-align: center;
    font: 100px/200px "微软雅黑";
    color: white;
    text-shadow: black 1px 1px 10px;
}
```

`实例-文字模糊效果`

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

`实例-模糊背景`

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

`文字描边`

```css
h1{
    font: 100px/200px "微软雅黑";
    text-align: center;
    color: white;
    -webkit-text-stroke: pink 4px;
}
```

`文字排版`

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

`盒模型阴影`

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

`倒影-webkit-box-reflect`

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

`box-sizing`

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

`圆角`

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

`圆角实例-旋转的风车`

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

`边框图片`

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

`线性渐变`

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