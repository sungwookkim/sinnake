/**
 * 
 */
/**
 * @author sinnakeWEB
 *
 */
package com.sinnake.biz.exceptions.common;

import java.util.List;
import java.util.Map;

import com.sinnake.biz.BizChain;

public class ExceptionChangeUrl extends BizChain {
	private String changeCode = "";
	
	/***************/
	/* Constructor */
	/***************/
	public ExceptionChangeUrl() { }
	
	public ExceptionChangeUrl(String changeCode) { 
		this.changeCode = changeCode;
	}

	/**********/
	/* Excute */
	/**********/
	@Override
	public void excute() throws Exception {
		if(this.main()) {
			this.excuteNext();
		}
	}

	@Override
	public void excute(List<Map<String, Object>> param) throws Exception {

	}

	@Override
	public void excute(Map<String, Object> param) throws Exception {

	}

	/********/
	/* Main */
	/********/
	@Override
	public boolean main() throws Exception {

		// 이전 페이지로 이동.
		this.setExceptionChangeUrl(this.changeCode);
		
		return false;
	}
	
	/***********/
	/* Process */
	/***********/
	public boolean setExceptionChangeUrl(String changeCode) throws Exception {
		this.setRestResult_redirect(changeCode);
		
		return true;
	}
	
	/**************/
	/* DB Process */
	/**************/
	
	/************/
	/* Validate */
	/************/
}