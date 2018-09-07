package com.sinnake.entity.exception;

/*
 * 에러 정보 엔티티 클래스.
 */
public class ExceptionInfo {
	private String errorMsg;
	private String errorCode;

	public String getErrorMsg() {
		return errorMsg;
	}
	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}
	public String getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}
}
