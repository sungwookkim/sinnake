package com.sinnake.biz.exceptions.accountExpired;

import com.sinnake.biz.exceptions.common.ExceptionChangeUrl;

public class AccountExpiredChangeUrl extends ExceptionChangeUrl {
	String changeUrl = "";
	
	/***************/
	/* Constructor */
	/***************/
	public AccountExpiredChangeUrl() { }
	
	public AccountExpiredChangeUrl(String changeUrl) {
		super(changeUrl);
	}
}
