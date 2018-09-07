package com.sinnake.spring.security.handler.authenticationFailureHandler;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import com.sinnake.spring.security.common.SinnakeSecurityCommon;

/*
 * 로그인 시도 실패 예외 처리 클래스.
 */
@Component
public class SinnakeAuthenticationFailureHandler extends SinnakeSecurityCommon implements AuthenticationFailureHandler{

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {

		result(exception, request, response, getErrorCode(exception));

		RequestDispatcher dispatcher = request.getRequestDispatcher("/error/AuthenticationFailureHandler");
        dispatcher.forward(urlTypeCheckReq(request), response);
	}
	
}
