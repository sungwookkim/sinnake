package com.sinnake.spring.security.handler.accessDeniedHandler;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import com.sinnake.spring.security.common.SinnakeSecurityCommon;

/*
 * 로그인 후 페이지 접근 권한 예외 처리 클래스.
 */
@Component
public class SinnakeAccessDeniedHandler extends SinnakeSecurityCommon implements AccessDeniedHandler {

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException exception) throws IOException, ServletException {
		
		result(exception, request, response, getErrorCode(exception));
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/error/AccessDeniedHandler");
        dispatcher.forward(urlTypeCheckReq(request), response);
	}

}
