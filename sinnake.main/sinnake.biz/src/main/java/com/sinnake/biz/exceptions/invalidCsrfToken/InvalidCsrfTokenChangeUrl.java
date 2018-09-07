package com.sinnake.biz.exceptions.invalidCsrfToken;

import com.sinnake.biz.exceptions.common.ExceptionChangeUrl;

public class InvalidCsrfTokenChangeUrl extends ExceptionChangeUrl{
	String changeUrl = "";
	
	/***************/
	/* Constructor */
	/***************/
	public InvalidCsrfTokenChangeUrl() { }
	
	public InvalidCsrfTokenChangeUrl(String changeUrl) {
		super(changeUrl);
	}
}
