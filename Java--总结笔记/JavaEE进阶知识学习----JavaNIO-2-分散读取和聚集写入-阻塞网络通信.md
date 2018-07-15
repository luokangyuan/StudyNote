###分散读取和聚集写入
分散读取：将通道中的数据分散到多个缓冲区中。
聚集写入：将多个缓冲区中的数据聚集到通道中。
分散读取实例

	@Test
	public void test4() throws IOException{
		RandomAccessFile rFile = new RandomAccessFile("1.txt", "rw");
		//获取通道
		FileChannel channel = rFile.getChannel();
		//分配指定大小的缓冲区
		ByteBuffer buffer1 = ByteBuffer.allocate(100);
		ByteBuffer buffer2 = ByteBuffer.allocate(1024);
		//分散读取
		ByteBuffer[] bufs = {buffer1,buffer2};
		channel.read(bufs);
		for (ByteBuffer byteBuffer : bufs) {
			byteBuffer.flip();
		}
		System.out.println(new String(bufs[0].array(),0,bufs[0].limit()));
		System.out.println("==================================");
		System.out.println(new String(bufs[1].array(),0,bufs[1].limit()));
聚集写入实例

	@Test
	public void test4() throws IOException{
		RandomAccessFile rFile = new RandomAccessFile("1.txt", "rw");
		//获取通道
		FileChannel channel = rFile.getChannel();
		//分配指定大小的缓冲区
		ByteBuffer buffer1 = ByteBuffer.allocate(100);
		ByteBuffer buffer2 = ByteBuffer.allocate(1024);
		//分散读取
		ByteBuffer[] bufs = {buffer1,buffer2};
		channel.read(bufs);
		for (ByteBuffer byteBuffer : bufs) {
			byteBuffer.flip();
		}
		System.out.println(new String(bufs[0].array(),0,bufs[0].limit()));
		System.out.println("==================================");
		System.out.println(new String(bufs[1].array(),0,bufs[1].limit()));
		//聚集写入
		RandomAccessFile rfile2 = new RandomAccessFile("2.txt", "rw");
		FileChannel channel2 = rfile2.getChannel();
		channel2.write(bufs);
	}
###NIO的字符集
查看支持的字符集

	@Test
	public void test5(){
		//支持的字符集
		Map<String, Charset> map = Charset.availableCharsets();
		//遍历map
		Set<Entry<String, Charset>> set = map.entrySet();
		for (Entry<String, Charset> entry : set) {
			System.out.println(entry.getKey()+"==="+entry.getValue());
		}
	}
通过一个字符集得到的编码器和解码器就不会出现乱码，如下

	@Test
	public void test6() throws IOException{
		Charset cs1 = Charset.forName("GBK");
		//获取编码器
		CharsetEncoder ce = cs1.newEncoder();
		//获取解码器
		CharsetDecoder cd = cs1.newDecoder();
		//创建buffer，并存入文字
		CharBuffer cBuff = CharBuffer.allocate(1024);
		cBuff.put("疾风知劲草");
		cBuff.flip();
		//编码，字符-字节
		ByteBuffer bBuf =  ce.encode(cBuff);
		//查看是否编码成功
		for(int i = 0; i < 10; i++){
			System.out.println(bBuf.get());
		}
		//解码，字节-字符
		bBuf.flip();
		CharBuffer cBuf2 = cd.decode(bBuf);
		System.out.println(cBuf2.toString());// 疾风知劲草
	}
如果使用GBK进行编码，使用UTF-8进行解码，就会出现乱码，如下所示。

	@Test
	public void test6() throws IOException{
		Charset cs1 = Charset.forName("GBK");
		//获取编码器
		CharsetEncoder ce = cs1.newEncoder();
		//获取解码器
		CharsetDecoder cd = cs1.newDecoder();
		//创建buffer，并存入文字
		CharBuffer cBuff = CharBuffer.allocate(1024);
		cBuff.put("疾风知劲草");
		cBuff.flip();
		//编码，字符-字节
		ByteBuffer bBuf =  ce.encode(cBuff);
		//查看是否编码成功
		for(int i = 0; i < 10; i++){
			System.out.println(bBuf.get());
		}
		//解码，字节-字符
		bBuf.flip();
		CharBuffer cBuf2 = cd.decode(bBuf);
		System.out.println(cBuf2.toString());// 疾风知劲草
		System.out.println("=========================");
		//如果按照UTF-8解码，就会出现乱码
		Charset cs2 = Charset.forName("UTF-8");
		bBuf.flip();
		CharBuffer cBuf3 = cs2.decode(bBuf);
		System.out.println(cBuf3.toString());
	}
#####以上都是使用通道解决本地的数据传输，NIO的核心是网络数据传输。
###NIO的非阻塞网络通信
选择器（Selector）：将每一个通道注册到选择器上，选择器就是监控每一个通道的IO状况（读，写，连接等情况）。只有当通道中的请求时间准备就绪时，才会将任务分配到服务端的一个线程或者多个线程上运行。
NIO非阻塞模式图解如下：
![](https://i.imgur.com/4fRFbv9.png)
使用NIO非阻塞式进行网络通信，我们先来看一个阻塞式的网络通信。
使用NIO完成网络通信的三个核心：
1. 通道（channel）：负责连接，实现类有SocketChannel、ServerSocketChanel、DatagramChannel。
2. 缓冲区：负责数据的读取。
3. 选择器：是是SelectableChannel的多路复用器，用于监控selectablechannel的IO状况。

网络通信如下：

	public class TestBlockingNIO {
		//客户端
		@Test
		public void client(){
			SocketChannel sChannel = null;
			FileChannel inChannel = null;
			try {
				sChannel = SocketChannel.open(new InetSocketAddress("127.0.0.1",9898));
				inChannel = FileChannel.open(Paths.get("1.jpg"), StandardOpenOption.READ);
				//分配指定大小的缓冲区
				ByteBuffer buf = ByteBuffer.allocate(1024);
				//读取本地文件，并发送到服务端
				while(inChannel.read(buf) != -1){
					buf.flip();
					sChannel.write(buf);
					buf.clear();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}finally{
				if(inChannel != null){
					try {
						inChannel.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
				if(sChannel != null){
				  try {
					sChannel.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
				}
			}
		}
		//服务端(异常处理应该使用try-catch)
		@Test
		public void server() throws IOException{
			//获取通道
			ServerSocketChannel ssChannel = ServerSocketChannel.open();
			FileChannel outChannel = FileChannel.open(Paths.get("44.jpg"), StandardOpenOption.WRITE,StandardOpenOption.CREATE);
			//绑定连接
			ssChannel.bind(new InetSocketAddress(9898));
			//获取客户端连接的通道
			SocketChannel sChannel = ssChannel.accept();
			//分配指定大小的缓冲区
			ByteBuffer buf = ByteBuffer.allocate(1024);
			//接收客户端的数据，并保存在本地
			while(sChannel.read(buf) != -1){
				buf.flip();
				outChannel.write(buf);
				buf.clear();
			}
			//关闭通道
			sChannel.close();
			outChannel.close();
			ssChannel.close();
		}
	}
说明：先启动服务端，在启动客户端，就会发现项目中多了一个文件。这就是使用socket进行网络通信的一个实例，如果我们想客户端运行成功后，服务端返回一个信息，表明已经成功了。看如下程序

	//客户端
	@Test
	public void client() throws IOException{
		SocketChannel sChannel = SocketChannel.open(new InetSocketAddress("127.0.0.1",9898));
		FileChannel inChannel = FileChannel.open(Paths.get("1.jpg"), StandardOpenOption.READ);
		ByteBuffer buf = ByteBuffer.allocate(1024);
		while (inChannel.read(buf) != -1) {
			buf.flip();
			sChannel.write(buf);
			buf.clear();
		}
		//接收服务端返回的信息
		int len = 0;
		while(sChannel.read(buf)!= -1){
			buf.flip();
			System.out.println(new String(buf.array(),0,len));
			buf.clear();
		}
		inChannel.close();
		sChannel.close();
	}
	//服务端(异常处理应该使用try-catch)
	@Test
	public void server() throws IOException{
		ServerSocketChannel ssChannel = ServerSocketChannel.open();
		FileChannel outChannel = FileChannel.open(Paths.get("66.jpg"), StandardOpenOption.WRITE,StandardOpenOption.CREATE);
		ssChannel.bind(new InetSocketAddress(9898));
		SocketChannel sChannel = ssChannel.accept();
		ByteBuffer buf = ByteBuffer.allocate(1024);
		while (sChannel.read(buf)!= -1) {
			buf.flip();
			outChannel.write(buf);
			buf.clear();
		}
		//发送反馈请求给客户端
		buf.put("服务端接收数据成功".getBytes());
		buf.flip();
		sChannel.write(buf);
		sChannel.close();
		outChannel.close();
		ssChannel.close();
		
	}
说明：以上程序运行后就会导致阻塞，服务端不知道客户端是否发送结束，解决办法有两种，一种是使用shutdownOutPut，另外一种就是换成非阻塞模式。
使用sChannel.shutdownOutput();方法。

	//客户端
	@Test
	public void client() throws IOException{
		SocketChannel sChannel = SocketChannel.open(new InetSocketAddress("127.0.0.1",9898));
		FileChannel inChannel = FileChannel.open(Paths.get("1.jpg"), StandardOpenOption.READ);
		ByteBuffer buf = ByteBuffer.allocate(1024);
		while (inChannel.read(buf) != -1) {
			buf.flip();
			sChannel.write(buf);
			buf.clear();
		}
		sChannel.shutdownOutput();
		//接收服务端返回的信息
		int len = 0;
		while((len = sChannel.read(buf))!= -1){
			buf.flip();
			System.out.println(new String(buf.array(),0,len));
			buf.clear();
		}
		inChannel.close();
		sChannel.close();
	}
	//服务端(异常处理应该使用try-catch)
	@Test
	public void server() throws IOException{
		ServerSocketChannel ssChannel = ServerSocketChannel.open();
		FileChannel outChannel = FileChannel.open(Paths.get("66.jpg"), StandardOpenOption.WRITE,StandardOpenOption.CREATE);
		ssChannel.bind(new InetSocketAddress(9898));
		SocketChannel sChannel = ssChannel.accept();
		ByteBuffer buf = ByteBuffer.allocate(1024);
		while (sChannel.read(buf)!= -1) {
			buf.flip();
			outChannel.write(buf);
			buf.clear();
		}
		//发送反馈请求给客户端
		buf.put("服务端接收数据成功".getBytes());
		buf.flip();
		sChannel.write(buf);
		sChannel.close();
		outChannel.close();
		ssChannel.close();
	}
###未完，待续
