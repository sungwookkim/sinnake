
package com.sinnake.biz.exceptions.noHandlerFound;

import com.sinnake.biz.exceptions.common.ExceptionChangeUrl;

public class noHandlerFoundChangeUrl extends ExceptionChangeUrl {
	String changeUrl = "";
	
	/***************/
	/* Constructor */
	/***************/
	public noHandlerFoundChangeUrl() { }
	
	public noHandlerFoundChangeUrl(String changeUrl) {
		super(changeUrl);
	}
	
	/***********/
	/* Process */
	/***********/
	@Override
	public boolean setExceptionChangeUrl(String changeCode) throws Exception {		
		this.setRestResult_model(changeCode, "controller/error/notFoundController");

		return true;
	}
}