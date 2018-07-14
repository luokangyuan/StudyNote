# CSS渐变

学习CSS3线性渐变写出的小实例，发廊灯

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

