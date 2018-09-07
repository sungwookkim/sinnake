package com.sinnake.biz.exceptions.insufficientAuth;

import com.sinnake.biz.exceptions.common.ExceptionChangeUrl;

public class InsufficientAuthChangeUrl extends ExceptionChangeUrl {
	String changeUrl = "";
	
	/***************/
	/* Constructor */
	/***************/
	public InsufficientAuthChangeUrl() { }
	
	public InsufficientAuthChangeUrl(String changeUrl) {
		super(changeUrl);

		this.changeUrl = changeUrl;
	}
}