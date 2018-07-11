###LocalDateTime
LocalDateTime是一个不可变的日期时间对象，代表日期时间，通常被视为年 - 月 - 日 - 时 - 分 - 秒。
####方法摘要

	Temporal adjustInto(Temporal temporal) 调整指定的时间对象与此对象具有相同的日期和时间。  
	OffsetDateTime atOffset(ZoneOffset offset) 将此日期时间与偏移量相结合以创建 OffsetDateTime 。  
	ZonedDateTime atZone(ZoneId zone) 将此日期时间与时区相结合以创建 ZonedDateTime 。  
	int compareTo(ChronoLocalDateTime<?> other) 将此日期时间与其他日期时间进行比较。  
	boolean equals(Object obj) 检查这个日期时间是否等于另一个日期时间。  
	String format(DateTimeFormatter formatter) 使用指定的格式化程序格式化此日期时间。  
	static LocalDateTime from(TemporalAccessor temporal) 从时间对象获取一个 LocalDateTime的实例。  
	int get(TemporalField field) 从此日期时间获取指定字段的值为 int 。  
	int getDayOfMonth() 获取月份字段。  
	DayOfWeek getDayOfWeek() 获取星期几字段，这是一个枚举 DayOfWeek 。  
	int getDayOfYear() 获得日期字段。  
	int getHour() 获取时间字段。  
	long getLong(TemporalField field) 从此日期时间获取指定字段的值为 long 。  
	int getMinute() 获取小时字段。  
	Month getMonth() 使用 Month枚举获取月份字段。  
	int getMonthValue() 将月份字段从1到12。  
	int getNano() 获得纳秒第二场。  
	int getSecond() 获得第二分钟的字段。  
	int getYear() 获取年份字段。  
	int hashCode() 这个日期时间的哈希码。  
	boolean isAfter(ChronoLocalDateTime<?> other) 检查这个日期时间是否在指定的日期之后。  
	boolean isBefore(ChronoLocalDateTime<?> other) 检查此日期时间是否在指定的日期时间之前。  
	boolean isEqual(ChronoLocalDateTime<?> other) 检查此日期时间是否等于指定的日期时间。  
	boolean isSupported(TemporalField field) 检查指定的字段是否受支持。  
	boolean isSupported(TemporalUnit unit) 检查指定的单位是否受支持。  
	LocalDateTime minus(long amountToSubtract, TemporalUnit unit) 返回此日期时间的副本，并减去指定的金额。  
	LocalDateTime minus(TemporalAmount amountToSubtract) 返回此日期时间的副本，并减去指定的金额。  
	LocalDateTime minusDays(long days) 返回此 LocalDateTime的副本，其中指定的时间间隔以天为单位。  
	LocalDateTime minusHours(long hours) 以指定的时间段返回此 LocalDateTime的副本，以减少的小时数。  
	LocalDateTime minusMinutes(long minutes) 返回此 LocalDateTime的副本，以指定的时间间隔减去。  
	LocalDateTime minusMonths(long months) 返回此 LocalDateTime的副本，指定的时间以月为单位减去。  
	LocalDateTime minusNanos(long nanos) 返回这个 LocalDateTime的副本，以指定的时间减去纳秒。  
	LocalDateTime minusSeconds(long seconds) 返回此 LocalDateTime的副本，其中指定的时间间隔以秒为单位。  
	LocalDateTime minusWeeks(long weeks) 返回此 LocalDateTime的副本，其中指定的周期以周为单位减去。  
	LocalDateTime minusYears(long years) 返回此 LocalDateTime的副本，并以减去的年份为单位。  
	static LocalDateTime now() 从默认时区的系统时钟获取当前的日期时间。  
	static LocalDateTime now(Clock clock) 从指定的时钟获取当前的日期时间。  
	static LocalDateTime now(ZoneId zone) 从指定时区的系统时钟获取当前的日期时间。
	static LocalDateTime of(int year, int month, int dayOfMonth, int hour, int minute) 
	从年，月，日，小时和分钟获得LocalDateTime的实例，将第二和纳秒设置为零。
	static LocalDateTime of(int year, int month, int dayOfMonth, int hour, int minute, int second) 
	从年，月，日，小时，分钟和秒获得 LocalDateTime的实例，将纳秒设置为零。  
	static LocalDateTime of(int year, int month, int dayOfMonth, int hour, int minute, int second, int nanoOfSecond)
	 获取的实例 LocalDateTime从年，月，日，小时，分钟，秒和纳秒。  
	static LocalDateTime of(int year, Month month, int dayOfMonth, int hour, int minute) 
	从年，月，日，小时和分钟获得 LocalDateTime的实例，将第二和纳秒设置为零。  
	static LocalDateTime of(int year, Month month, int dayOfMonth, int hour, int minute, int second) 
	从年，月，日，小时，分钟和秒获得 LocalDateTime的实例，将纳秒设置为零。  
	static LocalDateTime of(int year, Month month, int dayOfMonth, int hour, int minute, int second, int nanoOfSecond)
	获取的实例 LocalDateTime从年，月，日，小时，分钟，秒和纳秒。  
	static LocalDateTime of(LocalDate date, LocalTime time) 
	从日期和时间获取 LocalDateTime一个实例。  
	static LocalDateTime ofEpochSecond(long epochSecond, int nanoOfSecond, ZoneOffset offset) 
	使用从1970-01-01T00：00：00Z的时代开始的秒数获得一个 LocalDateTime的实例。  
	static LocalDateTime ofInstant(Instant instant, ZoneId zone) 
	从 Instant和区域ID获取一个 LocalDateTime的实例。  
	static LocalDateTime parse(CharSequence text) 
	从一个文本字符串（如 2007-12-03T10:15:30获取一个 LocalDateTime的实例。  
	static LocalDateTime parse(CharSequence text, DateTimeFormatter formatter)
	 使用特定的格式化 LocalDateTime从文本字符串获取 LocalDateTime的实例。  
	LocalDateTime plus(long amountToAdd, TemporalUnit unit) 返回此日期时间的副本，并添加指定的金额。  
	LocalDateTime plus(TemporalAmount amountToAdd) 返回此日期时间的副本，并添加指定的金额。  
	LocalDateTime plusDays(long days) 返回此 LocalDateTime的副本，并以指定的时间段添加天数。  
	LocalDateTime plusHours(long hours) 以指定的时间（以小时为单位）返回此 LocalDateTime的副本。  
	LocalDateTime plusMinutes(long minutes) 以指定的时间（以分钟为单位）返回此 LocalDateTime的副本。  
	LocalDateTime plusMonths(long months) 返回这个 LocalDateTime的副本，其中指定的时间段以月为单位。  
	LocalDateTime plusNanos(long nanos) 返回这个 LocalDateTime的副本，其指定时间以纳秒为单位。  
	LocalDateTime plusSeconds(long seconds) 以指定的时间段返回此 LocalDateTime的副本，以秒为单位。  
	LocalDateTime plusWeeks(long weeks) 返回这个 LocalDateTime的副本，并以指定的周期添加周数。  
	LocalDateTime plusYears(long years) 返回这个 LocalDateTime的副本，其中指定的时间段以添加的年数表示。  
	<R> R query(TemporalQuery<R> query) 使用指定的查询查询此日期时间。  
	ValueRange range(TemporalField field) 获取指定字段的有效值的范围。  
	LocalDate toLocalDate() 获得这个日期时间的 LocalDate一部分。  
	LocalTime toLocalTime() 获得这个日期时间的 LocalTime一部分。  
	String toString() 将此日期时间输出为 String ，例如 2007-12-03T10:15:30 。  
	LocalDateTime truncatedTo(TemporalUnit unit) 返回此 LocalDateTime的副本， LocalDateTime时间。  
	long until(Temporal endExclusive, TemporalUnit unit) 根据指定的单位计算到另一个日期时间的时间量。  
	LocalDateTime with(TemporalAdjuster adjuster) 返回此日期时间的调整副本。  
	LocalDateTime with(TemporalField field, long newValue) 返回此日期时间的副本，并将指定的字段设置为新值。  
	LocalDateTime withDayOfMonth(int dayOfMonth) 返回此 LocalDateTime的副本。  
	LocalDateTime withDayOfYear(int dayOfYear) 返回这个 LocalDateTime的副本，并更改日期。  
	LocalDateTime withHour(int hour) 返回此日期值更改的 LocalDateTime的副本。  
	LocalDateTime withMinute(int minute) 返回这个 LocalDateTime的副本，小时值更改。  
	LocalDateTime withMonth(int month) 返回此年份更改的 LocalDateTime的副本。  
	LocalDateTime withNano(int nanoOfSecond) 返回这个 LocalDateTime的副本，纳秒变化值。  
	LocalDateTime withSecond(int second) 返回这个 LocalDateTime的副本，其中 LocalDateTime了第二分钟的值。  
	LocalDateTime withYear(int year) 返回这个 LocalDateTime的副本，年份被更改。  
