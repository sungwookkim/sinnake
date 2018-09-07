package com.sinnake.spring.security.common;

import org.springframework.security.core.AuthenticationException;

public class SinnakeAuthenticationException extends AuthenticationException {

	private static final long serialVersionUID = 1731815591194174682L;

	public SinnakeAuthenticationException(String msg) {
		super(msg);
	}
	
	public SinnakeAuthenticationException(String msg, Throwable t) {
		super(msg, t);
	}
}
