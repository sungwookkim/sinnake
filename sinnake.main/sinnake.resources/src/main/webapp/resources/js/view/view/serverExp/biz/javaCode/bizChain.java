/***************/
/* 제어 메소드 */
/***************/	
public void excuteNext() throws Exception {
	if(this.hasNext()) {
		this.nextInit();
		this.next.excute();
	}
}

public void excuteNext(List<Map<String, Object>> listParam) throws Exception {
	if(this.hasNext()) {
		this.nextInit();
		this.next.excute(listParam);
	}
}

public void excuteNext(Map<String, Object> mapParam) throws Exception {
	if(this.hasNext()) {
		this.nextInit();
		this.next.excute(mapParam);
	}
}

/*********************/
/* 기본 구현 메소드  */
/*********************/
public abstract void excute() throws Exception;
public abstract void excute(List<Map<String, Object>> param)  throws Exception;  
public abstract void excute(Map<String, Object> param)  throws Exception;
public abstract boolean main() throws Exception;