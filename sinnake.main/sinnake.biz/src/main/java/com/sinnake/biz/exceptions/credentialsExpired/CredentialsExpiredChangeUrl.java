package com.sinnake.biz.exceptions.credentialsExpired;

import com.sinnake.biz.exceptions.common.ExceptionChangeUrl;

public class CredentialsExpiredChangeUrl extends ExceptionChangeUrl {
	String changeUrl = "";
	
	/***************/
	/* Constructor */
	/***************/
	public CredentialsExpiredChangeUrl() { }
	
	public CredentialsExpiredChangeUrl(String changeUrl) {
		super(changeUrl);
	}
}
