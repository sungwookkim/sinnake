package com.sinnake.biz.exceptions.sinnakeAuthentication;

import com.sinnake.biz.exceptions.common.ExceptionChangeUrl;

public class SinnakeAuthentication extends ExceptionChangeUrl{
	String changeUrl = "";
	
	/***************/
	/* Constructor */
	/***************/
	public SinnakeAuthentication() { }
	
	public SinnakeAuthentication(String changeUrl) {
		super(changeUrl);
	}
}
