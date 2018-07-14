# CSS渐变实例

## 光斑动画

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

