### 命令模式定义
命令模式将请求封装成对象，以便使用不同的请求、队列或者日志来参数化其他对象，命令模式支持可撤销的操作。
命令模式可以对发送者和接受者完全解耦，发送者和接收者之间没有直接的联系，发送者只需要知道如何发送请求，不需要关心请求如何完成，这就是命令模式，命令模式将方法的调用给封装起来了。
### 命令模式结构
![](https://i.imgur.com/bWiwDez.png)
说明：上图中的Command:抽象命令类，ConcreteCommand：具体命令类，Invoker:调用者，Receiver:接受者，Client:客户类。命令的模式本质就在于将命令进行封装，将发出的命令测责任和执行命令的责任分开，发送者只需要知道如何发送指令即可，不需要知道命令如何实现的，甚至执行是否成功都不需要知道，命令模式将请求也变为一个对象，它和其他对象一样可以被存储和传递。
### 命令模式的实现
在这里，我们以电视机为例，电视剧是请求的接受者，遥控器是请求的发送者，遥控器上有一些按钮，不同的按钮对应不同的操作，在这里遥控器需要执行三个命令，打开电视，关闭电视，换台。
#### 类图结构如下
![](https://i.imgur.com/LEOL312.png)
#### 抽象命令接口

```java
/**
 * 命令接口，为所有的命令声明一个接口
 *@author lky
 *@date 2018年1月19日
 */
public interface Command {
	public void excute();
}
```
#### 电视机类

```java
/**
 * 电视机类
 *@author lky
 *@date 2018年1月19日
 */
public class Telvision {
	public void open(){
		System.out.println("打开电视机....");
	}
	
	public void close(){
		System.out.println("关闭电视机....");
	}
	
	public void changeChannel(){
		System.out.println("切换电视机频道....");
	}
}
```
#### 遥控器类

```java
/**
 * 遥控器类
 *@author lky
 *@date 2018年1月19日
 */
public class Controller {
	private Command openTvCommand;
	private Command closeTvCommand;
	private Command changeTvCommand;
	public Controller(Command openTvCommand, Command closeTvCommand,
			Command changeTvCommand) {
		super();
		this.openTvCommand = openTvCommand;
		this.closeTvCommand = closeTvCommand;
		this.changeTvCommand = changeTvCommand;
	}
	
	public void open(){
		openTvCommand.excute();
	}
	
	public void close(){
		closeTvCommand.excute();
	}
	
	public void change(){
		changeTvCommand.excute();
	}
}
```
#### 遥控器的打开按钮类

```java
/**
 * 遥控器的打开电视按钮
 *@author lky
 *@date 2018年1月19日
 */
public class OpenTvCommand implements Command{
	private Telvision tv;
	
	public OpenTvCommand() {
		tv = new Telvision();
	}

	@Override
	public void excute() {
		tv.open();
	}

}
```
#### 遥控器的换台按钮

```java
/**
 * 遥控机换台按钮
 *@author lky
 *@date 2018年1月19日
 */
public class ChangeTvCommand implements Command{
	private Telvision tv;
	public ChangeTvCommand() {
		tv = new Telvision();
	}
	@Override
	public void excute() {
		tv.changeChannel();
		
	}

}
```
#### 遥控器的关闭按钮

```java
public class CloseTvCommand implements Command{
	private Telvision tv;
	public CloseTvCommand() {
		tv = new Telvision();
	}

	@Override
	public void excute() {
		tv.close();
	}

}
```
#### 客户端

```java
public class Client {
	public static void main(String[] args) {
		Command openCommand,closeCommand,changeCommand;
		
		openCommand = new OpenTvCommand();
		closeCommand = new CloseTvCommand();
		changeCommand = new ChangeTvCommand();
		
		Controller controller = new Controller(openCommand, closeCommand, changeCommand);
		
		controller.open();
		controller.change();
		controller.close();
       }
}
```

#### 输出结果

```properties
打开电视机....
切换电视机频道....
关闭电视机....
```
### 为方便理解，将代码放在一起
![](https://i.imgur.com/Dsqxr8g.png)

#### 命令模式的优缺点
1. 降低了系统的耦合度
2. 新的命令可以很容易的添加进去
3. 使用命令模式可能会导致某些系统有过多的具体命令类

#### 命令模式的使用场景
1. 系统需要请求调用者和请求接受者解耦，使得调用者和接收者不会直接交互
2. 系统需要在不同的时间指定请求，将请求排队和执行请求
3. 系统需要支持命令的插销和恢复操作
4. 系统需要将一组操作组合在一起

### 总结
1. 命令模式的本质是将命令对象进行封装打包，将发出的命令的责任和执行命令的责任进行分割开。
2. 命令模式中发送者只需要知道如何发送命令，无需关心命令执行的具体过程。
3. 在发送者和接受者两者之间是通过命令对象进行沟通的，请求命令本身就当做一个对象在两者之间进行传递，他封装了接受者和一组动作。
4. 命令模式支持撤销操作。
5. 命令模式队列请求和日志请求。
