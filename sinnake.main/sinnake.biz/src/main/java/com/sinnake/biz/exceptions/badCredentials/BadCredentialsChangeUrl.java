package com.sinnake.biz.exceptions.badCredentials;

import com.sinnake.biz.exceptions.common.ExceptionChangeUrl;

public class BadCredentialsChangeUrl extends ExceptionChangeUrl {
	String changeUrl = "";
	
	/***************/
	/* Constructor */
	/***************/
	public BadCredentialsChangeUrl() { }
	
	public BadCredentialsChangeUrl(String changeUrl) {
		super(changeUrl);
	}
}