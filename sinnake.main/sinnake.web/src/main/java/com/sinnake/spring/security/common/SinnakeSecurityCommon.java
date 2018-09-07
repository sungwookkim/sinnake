package com.sinnake.spring.security.common;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sinnake.entity.exception.ExceptionInfo;
import com.sinnake.sinnakeEnum.SinnakeSecurityEnum;
import com.sinnake.spring.security.common.inter.SinnakeSecurityCommonInterface;

/*
 * 에러 발생 시 페이지 이동 관련 클래스.
 */
public class SinnakeSecurityCommon implements SinnakeSecurityCommonInterface {
	// 에러 발생 시 DB 저장에 필요한 정보 추출 메소드.
	public HttpServletRequest urlTypeCheckReq(HttpServletRequest request) {
		request.setAttribute("urlType", urlTypeCheckStr(request));
		request.setAttribute("uri", request.getRequestURI());
		request.setAttribute("method", request.getMethod());
		
		return request;
	}
	
	// 요청 건이 비동기인지 확인 하는 메소드.
	public String urlTypeCheckStr(HttpServletRequest request) {
		String strType = "";
		String xReqWith = request.getHeader("X-Requested-With");

		if(xReqWith != null && "xmlhttprequest".equals(xReqWith.toLowerCase())) {
			strType = "json";
		}
		
		return strType;
	}
	
	// 에러 발생 시 에러 코드 및 에러 메세지 정의 메소드.
	public void result(Exception exception, HttpServletRequest request
		, HttpServletResponse response, ExceptionInfo errInfo) throws ServletException {		
		
		String urlType = urlTypeCheckStr(request);
	
		if("json".equals(urlType)) {
			urlTypeCheckReq(request);
		}
		
		request.setAttribute("errorCode", errInfo.getErrorCode());
		request.setAttribute("errorMsg", errInfo.getErrorMsg());
	}

	// 에러 정보 정의 추출 메소드.
	@Override
	public ExceptionInfo getErrorCode(Exception e) {
		return SinnakeSecurityEnum.SinnakeSecurity.Default.getErrorCode(e.getClass().getSimpleName());
	}
}
