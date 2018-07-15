####使用非阻塞式实现(重点)

	//客户端
	@Test
	public void client() throws IOException{
		//获取通道
		SocketChannel sChannel = SocketChannel.open(new InetSocketAddress("127.0.0.1",9898));
		//切换到非阻塞模式
		sChannel.configureBlocking(false);
		//分配指定大小的缓冲区
		ByteBuffer buf = ByteBuffer.allocate(1024);
		//发送数据给服务端
		Scanner scan = new Scanner(System.in);
		while(scan.hasNext()){
			String string = scan.next();
			buf.put((new Date().toString()+"\n"+string).getBytes());
			buf.flip();
			sChannel.write(buf);
			buf.clear();
		}
		
		//关闭通道
		sChannel.close();
	}
	//服务端
	@Test
	public void server() throws IOException{
		//获取通道
		ServerSocketChannel ssChannel = ServerSocketChannel.open();
		//切换为非阻塞模式
		ssChannel.configureBlocking(false);
		//绑定连接
		ssChannel.bind(new InetSocketAddress(9898));
		//获取选择器
		Selector selector = Selector.open();
		//将通道注册到选择器上,并且指定监听接收事件
		ssChannel.register(selector, SelectionKey.OP_ACCEPT);
		//通过轮询式的方式获取选择器中准备就绪的事件
		while(selector.select() > 0){
			//获取当前选择器中所有注册的选择键（已就绪的监听事件）
			Iterator<SelectionKey> it = selector.selectedKeys().iterator();
			while (it.hasNext()) {
				//获取准备就绪的事件
				SelectionKey sk = it.next();
				//判断是什么事件就绪（接收事件|连接事件|读事件|写事件就绪）
				if(sk.isAcceptable()){
					//若接收事件就绪，获取客户端连接
					SocketChannel sChannel = ssChannel.accept();
					//切换到非阻塞模式
					sChannel.configureBlocking(false);
					//将通道注册到选择器上
					sChannel.register(selector, SelectionKey.OP_READ);
				}else if(sk.isReadable()){
					//获取当前选择器上读就绪状态的通道
					SocketChannel sChannel = (SocketChannel) sk.channel();
					//读取数据
					ByteBuffer buf = ByteBuffer.allocate(1024);
					
					int len = 0;
					while((len = sChannel.read(buf)) > 0){
						buf.flip();
						System.out.println(new String(buf.array(),0,len));
						buf.clear();
					}
				}
				//取消选择键（SelectionKey）
				it.remove();
			}
		}
	}
说明：
1. 创建Selector，通过调用Selector.open()方法
2. 向选择器中注册通道sChannel.register(selector, SelectionKey.OP_READ);
3. 当调用register将通道注册时，选择器对通道的监听事件，需要通过第二个参数指定，可以监听的事件如下

 - 读事件：SelectionKey.OP_READ
 - 写事件：SelectionKey.OP_WRITE
 - 连接事件:SelectionKey.OP_CONNECT
 - 接收事件：SelectionKey.OP_ACCEPT

如果注册时不止监听一个事件，则可以使用“位或”操作符连接。如下

	int interestSet = SelectionKey.OP_RED|SelectionKey.OP_WRITE
SelectionKey：表示的是SelectableChannel和Selector之间的注册关系，每次向选择器注册通道时就会选择一个事件，选择键包含两个表示为整数的操作集，操作集的每一位都表示该键的通道所支持的一类可选择操作。其中SelectionKey的实例方法如下;


1. int	interestOps() 获取此键的 interest 集合。
2. SelectionKey	interestOps(int ops) 将此键的 interest 集合设置为给定值。
3. boolean	isAcceptable()  测试此键的通道是否已准备好接受新的套接字连接。
4. boolean	isConnectable() 测试此键的通道是否已完成其套接字连接操作。
5. boolean	isReadable() 测试此键的通道是否已准备好进行读取。
6. boolean	isValid() 告知此键是否有效。
7. isWritable() 测试此键的通道是否已准备好进行写入。
8. int	readyOps()获取此键的 ready 操作集合。

####Selector的常用方法
1.   Set<SelectionKey>	keys() 返回SelectionKey集合，代表注册在该Selector上的channel
2.   Set<SelectionKey>	selectedKeys()被选择的SelectionKey集合，返回此Selector的已选择键集。
3.   int  select() 监控所有注册的Channel，当他们中间有需要处理的IO操作时，该方法返回，并将对应得SelectionKey加入被选择的SelectionKey集合中，该方法返回这些Channel的数量。
4.   int select(long timeout) 选择一组键，其相应的通道已为 I/O 操作准备就绪。
5.  Set<SelectionKey>	selectedKeys() 返回此选择器的已选择键集。
6.  int	selectNow()  选择一组键，其相应的通道已为 I/O 操作准备就绪。
7.  Selector wakeup() 使尚未返回的第一个选择操作立即返回。

SocketChannel是一个连接到TCP网络套接字的通道，操作步骤如下:

1. 打开SocketChannel
2. 读写数据
3. 关闭SocketChannel

ServerSocketChannel是一个可以监听新进来的TCP连接的通道。

###DatagramChannel
DatagramChannel是一个能收发UDP包的通道，操作步骤如下：

1. 打开DatagramChannel
2. 接收和发送数据

DatagramChannel实例如下
	
	public class TestNonBlockingNIO2 {
		@Test
		public void send() throws IOException{
			DatagramChannel dc = DatagramChannel.open();
			dc.configureBlocking(false);
			ByteBuffer buf = ByteBuffer.allocate(1024);
			Scanner scan = new Scanner(System.in);
			while(scan.hasNext()){
				String str = scan.next();
				buf.put((new Date().toString()+":\n"+str).getBytes());
				buf.flip();
				dc.send(buf, new InetSocketAddress("127.0.0.1",9898));
				buf.clear();
			}
			dc.close();
		}
		@Test
		public void receive() throws IOException{
			DatagramChannel dc = DatagramChannel.open();
			dc.configureBlocking(false);
			dc.bind(new InetSocketAddress(9898));
			Selector selector = Selector.open();
			dc.register(selector, SelectionKey.OP_READ);
			while(selector.select() > 0){
				Iterator<SelectionKey> it = selector.selectedKeys().iterator();
				while(it.hasNext()){
					SelectionKey sk = it.next();
					if(sk.isReadable()){
						ByteBuffer buf = ByteBuffer.allocate(1024);
						dc.receive(buf);
						buf.flip();
						System.out.println(new String(buf.array(),0,buf.limit()));
					}
				}
				it.remove();
			}
		}
	}
###管道（Pipe）
管道是两个线程之间的单向数据连接，Pipe有一个source通道和一个sink通道，数据会被写入sink通道，从source通道读取
图解如下所示
![](https://i.imgur.com/cJMcy6Y.png)
Pipe管道实例如下

	@Test
	public void testPipe() throws IOException{
		//获取管道
		Pipe pipe = Pipe.open();
		//将缓冲区中的数据写入管道
		ByteBuffer buf = ByteBuffer.allocate(1024);
		Pipe.SinkChannel sinkChannel = pipe.sink();
		buf.put("通过管道发送数据".getBytes());
		buf.flip();
		sinkChannel.write(buf);
		//在一个线程中共用一个pipe读取数据，可以开两个线程
		Pipe.SourceChannel sourceChannel = pipe.source();
		buf.flip();
		int len = sourceChannel.read(buf);
		System.out.println(new String(buf.array(),0,len));
		sourceChannel.close();
		sinkChannel.close();
	}


