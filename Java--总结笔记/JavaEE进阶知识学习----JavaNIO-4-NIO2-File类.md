###NIO.2
在jdk7之后，Java对NIO进行了极大的扩展，增强了对文件处理和文件系统特性的支持，我们称之为NIO.2
主要有Path、Paths、Files。
java.nio.Path接口代表一个与平台无关的平台路径，描述目录结构中文件的位置。
1. Paths提供了get()方法用来获取Path对象，Path get(String first.....)用于将多个字符串串联成路径

Path常用的方法如下:
1. boolean	endsWith(Path other)判断是否以Path路径结束
2. boolean	endsWith(String other)判断是否以Path路径开始
3. Path	getFileName()返回与调用Path对象关联的文件名
4. Path	getName(int index)返回指定索引位置index的路径名称
5. int	getNameCount()返回Path根目录后面元素的数量
6. Path	getParent()返回Path对象包含整个路径，不包含Path对象指定的文件路径
7. Path	getRoot()返回调用Path对象的根路径
8. boolean	isAbsolute()判断是否为绝对路径
9. Path	resolve(Path other)将相对路径解析为绝对路径
10. Path	toAbsolutePath()作为绝对路径返回调用Path对象
11. String	toString()返回调用Path对象的字符串表示形式

####Files类
java.nio.file.Files用于操作文件或目录的工具类
Files关于文件的常用方法如下：

1. Path copy(InputStream in, Path target, CopyOption... options);文件的复制
2. createDirectory(Path dir, FileAttribute<?>... attrs)创建一个目录
3. createFile(Path path, FileAttribute<?>... attrs)创建一个文件
4. delete(Path path)删除一个文件
5. move(Path source, Path target, CopyOption... options)将src移动到dest位置
6. size(Path path)返回Path指定文件的大小

Files关于判断的常用方法如下：
1. exists(Path path, LinkOption... options)判断文件是否存在
2. isDirectory(Path path, LinkOption... options)判断是否是目录
3. isExecutable(Path path)判断是否是可执行文件
4. isHidden(Path path)判断是否是隐藏文件
5. isReadable(Path path)判断文件是否可读
6. isWritable(Path path)判断文件是否可写
7. notExists(Path path, LinkOption... options)判断文件是否不存在

Files关于操作内容的常用方法如下：

1. newByteChannel(Path path, Set<? extends OpenOption> options, FileAttribute<?>... attrs)获取与指定文件的连接
2. newDirectoryStream(Path dir, DirectoryStream.Filter<? super Path> filter)打开Path指定目录
3. newInputStream(Path path, OpenOption... options)获取inputStream对象
4. newOutputStream(Path path, OpenOption... options)获取outputStream对象

###暂告一段落，这是一场无情的战争！！！


