####属性配置说明
在SpringBoot项目中，属性配置在resource目录下的application.properties中配置，接着我们第一次创建的那个项目说明，如下，做了一些简单的配置后，
<br>
![](https://i.imgur.com/Ea6jseT.png)
<br>
再启动项目后使用http://localhost:8080/hello就不能访问项目了，使用http://localhost:8081/gire/hello访问才能正常访问项目，
在SpringBoot项目中默认使用application.properties文件来配置项目的一些信息，当然我们也可使用yml文件来配置，具体如下所示：
<br>
![](https://i.imgur.com/lgQLENn.png)
<br>
注意：yml语法是相同的就不同重复书写，同时port: 8082之间必须存在空格。当然yml和properties只能存放一个。
####yml文件配置的属性值如何在程序中得到，下面来看一个小例子。
#####第一步：配置文件中配置一些基本的属性和属性值，如下所示：
<br>
![](https://i.imgur.com/6xO8EDa.png)
<br>
#####第二步：在controller中获取配置文件中属性值的方法如下所示：
<br>
![](https://i.imgur.com/cosAJPp.png)
<br>
#####写到这里都会想到如果有很多属性值，那岂不是要写很多的代码，我们可以做如下的改变，
#####首先是配置文件中加上前缀：
<br>
![](https://i.imgur.com/O1VAi1f.png)
<br>
#####然后新建一个配置属性类，如下所示：
<br>
![](https://i.imgur.com/pYhjSHM.png)
<br>
#####注意的是前缀和配置文件中的前缀保持一致，只用方法如下所示：
<br>
![](https://i.imgur.com/KVGtqew.png)
<br>

####不同配置环境之间的切换使用问题
#####开发环境使用的配置文件和生产环境使用的配置文件，开发环境的配置文件如下所示：
<br>
![](https://i.imgur.com/q6bX0UH.png)
<br>
#####生产环境的配置文件如下所示：
<br>
![](https://i.imgur.com/nsjZ34x.png)
<br>
#####环境的切换配置文件如下所示：
<br>
![](https://i.imgur.com/ZKsWi46.png)
<br>
####小结
使用到的注解如下：
1. @Component组件标识，表示当前类可以被注入。
2. @ConfigurationProperties(prefix = "user")配置文件标识
3. @Value("${age}")获取配置文件中的属性值

