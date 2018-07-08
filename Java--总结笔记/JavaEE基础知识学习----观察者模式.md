### 定义
出版社+订阅者=观察者模式，其中出版社改成为‘主题’，订阅者改称为‘观察者’。观察者模式定义了对象之间的一对多依赖关系，当一个对象改变状态时，他的所有依赖者都会收到通知并且自动更新。这里和订阅报纸是一样的道理，当出版社有了新报纸，那么所有订阅了该报纸的人都会收到新的报纸。
在这里，发生改变的对象（出版社）称为观察目标（主题），被通知的对象（订阅报纸的人）称为观察者，一个观察目标可以对应多个观察者，而这些观察者之间没有相互联系，所以可以根据需要增加和删除观察者，使得系统更易于扩展。
### 类图
![](https://i.imgur.com/005x3Mf.png)
### 实例
#### 需求
在气象观测站中，有三个布告板，分别显示目前状况，气象统计和天气预报。WeatherData类中具有setter和getter方法，可以取得三个测量值，当有新的数据时，WeatherData类中的measurementsChanged()方法就会被调用，我们要做的就是，一旦WeatherData类有新数据，我们就要更新布告板。
#### 类图设计
![](https://i.imgur.com/IgC42WE.png)
#### 代码实现
#### Subject 主题接口
```java
public interface Subject {
	//观察者注册
	public void registerObserver(Observer o);
	//移除观察者
	public void removeObserver(Observer o);
	//当主题状态该变时，这个方法就会被调用，以通知所有的观察者
	public void notifyObserver();
}
```
#### Observer 观察者接口
```java
public interface Observer {
	//当气象观测值改变时，主题就会将这些状态值当做方法的参数，传送给观察者
	//所有的的观察者都必须实现update方法，以实现观察者接口
	public void update(float temperature,float humidity,float pressure);
}
```
#### DisplayElement 布告板显示接口
```java
public interface DisplayElement {
	//当布告板需要显示的，就会调用此方法
	public void display();
}
```
#### WeatherData实现主题接口 WeatherData.java
```java
public class WeatherData implements Subject {
	private ArrayList<Observer> observers;
	private float temperature;
	private float humidity;
	private float pressure;
	//使用一个集合来记录观察值
	public WeatherData() {
		observers = new ArrayList<Observer>();
	}
	//注册成为观察者
	@Override
	public void registerObserver(Observer o) {
		observers.add(o);
		
	}

	@Override
	public void removeObserver(Observer o) {
		int i = observers.indexOf(o);
		if(i >=0){
			observers.remove(o);
		}
	}
	//这里就是将状态循环的通知给每一个观察者，因为每一个观察者都实现了update方法，
	@Override
	public void notifyObserver() {
		for(int i=0; i < observers.size();i++){
			Observer observer = observers.get(i);
			observer.update(temperature, humidity, pressure);
		}
	}
	//当气象站得到更新数据中，就通知观察者
	public void measurementsChanged(){
		notifyObserver();
	}
	public void setMeasurements(float temperature,float humidity, float pressure){
		this.temperature = temperature;
		this.humidity = humidity;
		this.pressure = pressure;
		measurementsChanged();
		
	}
}
```
#### CurrentConditionsDisplay 布告板
```java
/**
	* 显示目前状况的布告板：显示温度，湿度和气压
	*@author lky
	*@date 2018年1月16日
	*/
public class CurrentConditionsDisplay implements Observer,DisplayElement {
	
	private float temperature;// 温度
	private float humidity;// 湿度
	private float pressure; // 气压
	private Subject weatherData;
	public CurrentConditionsDisplay(Subject weatherData) {
		this.weatherData = weatherData;
		weatherData.registerObserver(this);
	}
	@Override
	public void display() {
		System.out.println("我是目前状况布告板，现在温度是："+temperature+
				"℃"+"湿度是："+humidity+"气压是："+pressure);
	}

	@Override
	public void update(float temperature, float humidity, float pressure) {
		this.temperature = temperature;
		this.humidity = humidity;
		this.pressure = pressure;
		display();
	}

}
```
#### 天气预报布告板
```java
/**
	* 天气预报布告板：显示当前的天气状况
	*@author lky
	*@date 2018年1月16日
	*/
public class ForecastDisplay implements Observer,DisplayElement{
	private float currentPressure = 29.92f;  //当前的气压
	private float lastPressure; // 最后的气压
	private WeatherData weatherData;

	public ForecastDisplay(WeatherData weatherData) {
		this.weatherData = weatherData;
		weatherData.registerObserver(this);
	}

	public void update(float temperature,float humidity,float pressure) {
		lastPressure = currentPressure;// 将当前的气压赋给最后的气压
		currentPressure = pressure;// 将更新的气压赋给当前气压
		display();
	}

	public void display() {
		
		if (currentPressure > lastPressure) {
			System.out.println("我是天气预报布告板，现在是：气压升高，天气转好！");
		} else if (currentPressure == lastPressure) {
			System.out.println("我是天气预报布告板，现在是：气压不变，天气维持！");
		} else if (currentPressure < lastPressure) {
			System.out.println("我是天气预报布告板，现在是：气压降低，天气变坏！");
		}
	}

}
```
#### 天气统计布告板
```java
/**
	* 天气统计布告板：显示最高温度，最低温度和平均温度
	*@author lky
	*@date 2018年1月16日
	*/
public class StatisticsDisplay implements Observer,DisplayElement{
	private float maxTemp = 0.0f;
	private float minTemp = 200;
	private float tempSum= 0.0f;
	private int numReadings;
	private WeatherData weatherData;

	public StatisticsDisplay(WeatherData weatherData) {
		this.weatherData = weatherData;
		weatherData.registerObserver(this);
	}

	public void update(float temperature, float humidity, float pressure) {
		tempSum += temperature;
		numReadings++;

		if (temperature > maxTemp) {
			maxTemp = temperature;
		}
	
		if (temperature < minTemp) {
			minTemp = temperature;
		}

		display();
	}

	public void display() {
		System.out.println("我是天气统计布告板，平均温度是： " + (tempSum / numReadings)
			+ "，最高温度是：" + maxTemp + "，最低温度是：" + minTemp);
	}

}
```
#### 酷热指数布告板
```java
/**
	* 酷热指数布告板，根据温度和湿度采用特定的公式镜像计算的。
	*@author lky
	*@date 2018年1月16日
	*/
public class HeatIndexDisplay implements Observer,DisplayElement {
	float heatIndex = 0.0f;
	private WeatherData weatherData;

	public HeatIndexDisplay(WeatherData weatherData) {
		this.weatherData = weatherData;
		weatherData.registerObserver(this);
	}

	public void update(float temperature,float humidity,float pressure) {
		heatIndex = computeHeatIndex(temperature, humidity);
		display();
	}
	//在布告板中自定义方法。
	private float computeHeatIndex(float t, float rh) {
		float index = (float)((16.923 + (0.185212 * t) + (5.37941 * rh) - (0.100254 * t * rh) 
			+ (0.00941695 * (t * t)) + (0.00728898 * (rh * rh)) 
			+ (0.000345372 * (t * t * rh)) - (0.000814971 * (t * rh * rh)) +
			(0.0000102102 * (t * t * rh * rh)) - (0.000038646 * (t * t * t)) + (0.0000291583 * 
			(rh * rh * rh)) + (0.00000142721 * (t * t * t * rh)) + 
			(0.000000197483 * (t * rh * rh * rh)) - (0.0000000218429 * (t * t * t * rh * rh)) +
			0.000000000843296 * (t * t * rh * rh * rh)) -
			(0.0000000000481975 * (t * t * t * rh * rh * rh)));
		return index;
	}

	public void display() {
		System.out.println("我是酷热指数布告板，现在的酷热指数为： " + heatIndex);
	}
}
```
#### 测试
```java
public class WeatherStation {
	public static void main(String[] args) {
		WeatherData weatherData = new WeatherData();
		CurrentConditionsDisplay conditionsDisplay = new CurrentConditionsDisplay(weatherData);
		StatisticsDisplay observer2 = new StatisticsDisplay(weatherData);
		ForecastDisplay forecastDisplay = new ForecastDisplay(weatherData);
		HeatIndexDisplay heatIndexDisplay = new HeatIndexDisplay(weatherData);
		weatherData.setMeasurements(80, 65, 30.4f);
		System.out.println("===================================");
		weatherData.setMeasurements(70, 55, 20.4f);
		System.out.println("===================================");
		weatherData.setMeasurements(90, 75, 40.4f);
		
	}
}
```
#### 结果
```properties
我是目前状况布告板，现在温度是：80.0℃湿度是：65.0气压是：30.4
我是天气统计布告板，平均温度是： 80.0，最高温度是：80.0，最低温度是：80.0
我是天气预报布告板，现在是：气压升高，天气转好！
我是酷热指数布告板，现在的酷热指数为： 82.95535
===================================
我是目前状况布告板，现在温度是：70.0℃湿度是：55.0气压是：20.4
我是天气统计布告板，平均温度是： 75.0，最高温度是：80.0，最低温度是：70.0
我是天气预报布告板，现在是：气压降低，天气变坏！
我是酷热指数布告板，现在的酷热指数为： 75.9113
===================================
我是目前状况布告板，现在温度是：90.0℃湿度是：75.0气压是：40.4
我是天气统计布告板，平均温度是： 80.0，最高温度是：90.0，最低温度是：70.0
我是天气预报布告板，现在是：气压升高，天气转好！
我是酷热指数布告板，现在的酷热指数为： 108.19608
```
### 执行流程分析
* 实例化一个主题对象（WeatherData）
*  实例化一个现实目前状况的布告板，并传入主题对象。
	* 在目前状况的布告板的构造函数中，将当前布告板注册为传入的主题的观察者
	*  同理，将天气统计布告板，天气预报布告板，酷热指数布告板都注册为WeatherData的观察者
* 调用主题对象的setMeasurements方法，模拟主题对象的值发生改变。
*  第一次传入不同的温度，湿度和气压。主题对象调用measurementsChanged()方法。
*  measurementsChanged()方法中调用notifyObserver()方法。
*  notifyObserver()方法中循环调用observer的update()方法，调用的是接口方法，具体执行的是每一个实例类型的update()方法，
*  每一个布告板实例的update()方法，是具体的数据准备，然后调用display()方法，显示布告板信息。

### 整体分析图

![](https://i.imgur.com/8dCkrWZ.jpg)
### 总结


* 观察者模式定义了对象之间的一对多关系，多个观察者监听同一个主题（被观察者），当主题的状态发生改变时，会通知所有的观察者。
* 观察者模式中具体主题是主题的子类，通常包含经常发生改变的数据，当他的状态发生改变时，会通知所有他的观察者对象，主题用一个共同的接口来更新观察者。
* 观察者实现的是同一个接口，也就是主题发生改变时通知的接口，不同的观察者具体的实现方法不一样。
* 观察者与被观察者之间用松耦合的方式结合。



	
