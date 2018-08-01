# JavaScript高级学习笔记

## 基础总结

### 数据类型

*   基本(值)类型
    *   Number: 任意数值
    *   String: 任意文本
    *   Boolean: true/false
    *   undefined: undefined
    *   null: null

* 对象(引用)类型
  * Object: 一般对象类型
  * Array: 特别的对象类型(下标/内部数据有序)
  * Function: 特别的对象类型(可执行)
* 判断方法
  * typeof:
    * 可以区别: 数值, 字符串, 布尔值, undefined, function
    * 不能区别: null与对象, 一般对象与数组
  * instanceof
    * 专门用来判断对象数据的类型: Object, Array与Function
  * ===
    * 可以判断: undefined和null

>   注意事项：

`undefined与null的区别?`

undefined代表变量没有赋值，null: 代表变量赋值了, 只是值为null

`什么时候将变量赋值为null?`

初始化赋值: 将要作为引用变量使用, 但对象还没有确定，结束时: 将变量指向的对象成为垃圾对象

`严格区别变量类型与数据类型?`

js的变量本身是没有类型的, 变量的类型实际上是变量内存中数据的类型，变量类型包括`基本类型`( 保存基本类型数据的变量)`引用类型`(保存对象地址值的变量)，数据对象包括`基本类型`和`对象类型`