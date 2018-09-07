package com.sinnake.biz.exceptions.missingCsrfToken;

import com.sinnake.biz.exceptions.common.ExceptionChangeUrl;

public class MissingCsrfTokenChangeUrl extends ExceptionChangeUrl{
	String changeUrl = "";
	
	/***************/
	/* Constructor */
	/***************/
	public MissingCsrfTokenChangeUrl() { }
	
	public MissingCsrfTokenChangeUrl(String changeUrl) {
		super(changeUrl);
	}
}
