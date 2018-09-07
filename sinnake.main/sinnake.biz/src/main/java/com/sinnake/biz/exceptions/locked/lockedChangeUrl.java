package com.sinnake.biz.exceptions.locked;

import com.sinnake.biz.exceptions.common.ExceptionChangeUrl;

public class lockedChangeUrl  extends ExceptionChangeUrl {
	String changeUrl = "";
	
	/***************/
	/* Constructor */
	/***************/
	public lockedChangeUrl() { }
	
	public lockedChangeUrl(String changeUrl) {
		super(changeUrl);

		this.changeUrl = changeUrl;
	}
	
}
