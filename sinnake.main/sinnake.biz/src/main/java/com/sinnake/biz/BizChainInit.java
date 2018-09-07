package com.sinnake.biz;

import java.util.List;
import java.util.Map;

public class BizChainInit extends BizChain {

	@Override
	public void excute() throws Exception {
		// TODO Auto-generated method stub
		this.excuteNext();
	}

	@Override
	public void excute(List<Map<String, Object>> listParam) throws Exception {
		// TODO Auto-generated method stub
		this.excuteNext(listParam);
	}

	@Override
	public void excute(Map<String, Object> mapParam) throws Exception {
		// TODO Auto-generated method stub
		this.excuteNext(mapParam);
	}

	@Override
	public boolean main() throws Exception {
		// TODO Auto-generated method stub
		return false;
	}
}

