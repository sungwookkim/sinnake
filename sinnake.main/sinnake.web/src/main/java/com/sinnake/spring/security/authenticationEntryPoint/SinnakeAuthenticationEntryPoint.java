package com.sinnake.spring.security.authenticationEntryPoint;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.sinnake.spring.security.common.SinnakeSecurityCommon;

/*
 * 비 로그인 시 페이지 접근 예외 처리 클래스
 */
@Component
public class SinnakeAuthenticationEntryPoint extends SinnakeSecurityCommon implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {

		result(authException, request, response, getErrorCode(authException));
		
        RequestDispatcher dispatcher = request.getRequestDispatcher("/error/loginRequired");
        dispatcher.forward(urlTypeCheckReq(request), response);
	}
}
