package com.sinnake.biz.exceptions.disabled;

import com.sinnake.biz.exceptions.common.ExceptionChangeUrl;

public class DisabledChangeUrl extends ExceptionChangeUrl {
	String changeUrl = "";
	
	/***************/
	/* Constructor */
	/***************/
	public DisabledChangeUrl() { }
	
	public DisabledChangeUrl(String changeUrl) {
		super(changeUrl);
	}
}