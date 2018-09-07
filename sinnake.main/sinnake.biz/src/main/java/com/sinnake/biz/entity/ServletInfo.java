/**
 * 
 */
/**
 * @author sinnakeWEB
 *
 */
package com.sinnake.biz.entity;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ServletInfo {
	HttpServletRequest req = null;	
	HttpServletResponse res = null;
	String platformType = null;
	
	/**********/
	/* Setter */
	/**********/
	public void setReq(HttpServletRequest req) {
		this.req = req;
	}
	
	public void setRes(HttpServletResponse res) {
		this.res = res;
	}

	public void setPlatformType(String platformType) {
		this.platformType = platformType;
	}
	
	/**********/
	/* Getter */
	/**********/
	public HttpServletRequest getReq() {
		return this.req;
	}
	
	public HttpServletResponse getRes() {
		return this.res;
	}
	
	public String getPlatformType() {
		return this.platformType;
	}
}