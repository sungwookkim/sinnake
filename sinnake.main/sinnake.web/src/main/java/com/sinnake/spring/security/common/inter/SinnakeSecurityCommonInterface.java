package com.sinnake.spring.security.common.inter;

import com.sinnake.entity.exception.ExceptionInfo;

public interface SinnakeSecurityCommonInterface {

	public ExceptionInfo getErrorCode(Exception e);
}
