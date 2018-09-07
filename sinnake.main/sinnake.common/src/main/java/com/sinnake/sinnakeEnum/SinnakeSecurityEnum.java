package com.sinnake.sinnakeEnum;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.web.csrf.InvalidCsrfTokenException;
import org.springframework.security.web.csrf.MissingCsrfTokenException;

import com.sinnake.entity.exception.ExceptionInfo;
import com.sinnake.spring.security.common.SinnakeAuthenticationException;

/*
 * 에러 정의 Enum 클래스. 
 */
public class SinnakeSecurityEnum {

	public enum SinnakeSecurity {
		LockedException(
			"-0000"
			, LockedException.class.getName()
			, LockedException.class.getSimpleName()			
			, "LockedException"
		)
		, BadCredentialsException(
			"-0001"
			, BadCredentialsException.class.getName()
			, BadCredentialsException.class.getSimpleName()			
			, "BadCredentialsException"			
		)
		, AccessDeniedException(
			"-0002"
			, AccessDeniedException.class.getName()
			, AccessDeniedException.class.getSimpleName()			
			, "AccessDeniedException"
		)
		, DisabledException(
			"-0003"
			, DisabledException.class.getName()
			, DisabledException.class.getSimpleName()			
			, "DisabledException"
		)
		, AccountExpiredException(
			"-0004"
			, AccountExpiredException.class.getName()
			, AccountExpiredException.class.getSimpleName()			
			, "AccountExpiredException"		
		)
		, CredentialsExpiredException(
			"-0005"
			, CredentialsExpiredException.class.getName()
			, CredentialsExpiredException.class.getSimpleName()			
			, "CredentialsExpiredException"		
		)
		, MissingCsrfTokenException(
			"-0006"
			, MissingCsrfTokenException.class.getName()
			, MissingCsrfTokenException.class.getSimpleName()			
			, "MissingCsrfTokenException"				
		)
		, InsufficientAuthenticationException(
			"-0007"
			, InsufficientAuthenticationException.class.getName()
			, InsufficientAuthenticationException.class.getSimpleName()			
			, "InsufficientAuthenticationException"				
		)
		, InvalidCsrfTokenException(
			"-0008"
			, InvalidCsrfTokenException.class.getName()
			, InvalidCsrfTokenException.class.getSimpleName()			
			, "InvalidCsrfTokenException"				
		)
		, Default(
			"-9999"
			, SinnakeAuthenticationException.class.getName()
			, SinnakeAuthenticationException.class.getSimpleName()
			, "SinnakeAuthenticationException"
		);
		
		private String code;
		private String fullClassName;
		private String className;
		private String errMsg;
		
		private SinnakeSecurity(String code, String fullClassName, String className, String errMsg) {
			this.code = code;
			this.fullClassName = fullClassName;
			this.className = className;
			this.errMsg = errMsg;
		}
		
		public String getCode() {
			return code;
		}
		
		public String getFullClassName() {
			return fullClassName;
		}
		
		public String getClassName() {
			return className;
		}
		
		public String getErrMsg() {
			return errMsg;
		}
		
		public ExceptionInfo getErrorCode(String clsNm) {
			ExceptionInfo exceptionInfo = new ExceptionInfo();
			SinnakeSecurity[] sinnakeSecurityEnum = SinnakeSecurityEnum.SinnakeSecurity.values();
			
			exceptionInfo.setErrorCode(SinnakeSecurityEnum.SinnakeSecurity.Default.code);
			exceptionInfo.setErrorMsg(SinnakeSecurityEnum.SinnakeSecurity.Default.errMsg);
			
			for(int i = 0, len = sinnakeSecurityEnum.length; i < len; i++) {
				if(clsNm.equals(sinnakeSecurityEnum[i].getClassName())) {
					exceptionInfo.setErrorCode(sinnakeSecurityEnum[i].getCode());
					exceptionInfo.setErrorMsg(sinnakeSecurityEnum[i].getErrMsg());
					break;
				}
			}
			
			return exceptionInfo;
		}
		
		public void exception(String errorMsg) throws Exception {
			Exception exception = SinnakeSecurityEnum.SinnakeSecurity.Default.newException();
			SinnakeSecurity[] sinnakeSecurityEnum = SinnakeSecurityEnum.SinnakeSecurity.values();			

			for(int i = 0, len = sinnakeSecurityEnum.length; i < len; i++) {
				if(errorMsg.equals(sinnakeSecurityEnum[i].getClassName())) {
					exception = sinnakeSecurityEnum[i].newException();
					break;
				}
			}
			
			throw exception;
		}
		
		@SuppressWarnings("rawtypes")
		public Exception newException() throws ClassNotFoundException, InstantiationException, IllegalAccessException, NoSuchMethodException, SecurityException, IllegalArgumentException, InvocationTargetException {
			Class<?> cls = Class.forName(getFullClassName());
			String errMsg = getErrMsg();
			
			if(!"".equals(errMsg)) {
				Class[] constructorParamType = {String.class};
				Constructor<?> constructor = cls.getConstructor(constructorParamType);
				
				return (Exception)constructor.newInstance(errMsg); 
			} else {
				return (Exception)cls.newInstance();
			}
		}
	}
}
