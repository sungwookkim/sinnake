package com.sinnake.biz.exceptions.accessDenied;

import com.sinnake.biz.exceptions.common.ExceptionChangeUrl;

public class accessDeniedChangeUrl extends ExceptionChangeUrl {
	String changeUrl = "";
	
	/***************/
	/* Constructor */
	/***************/
	public accessDeniedChangeUrl() { }
	
	public accessDeniedChangeUrl(String changeUrl) {
		super(changeUrl);
	}
}