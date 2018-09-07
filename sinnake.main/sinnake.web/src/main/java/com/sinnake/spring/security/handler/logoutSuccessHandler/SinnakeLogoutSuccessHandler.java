package com.sinnake.spring.security.handler.logoutSuccessHandler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

/*
 * 로그아웃 시 후처리 클래스.
 */
public class SinnakeLogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler implements LogoutSuccessHandler {

	@Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) 
    		throws IOException, ServletException {
   
		response.sendRedirect("/main");
        super.onLogoutSuccess(request, response, authentication);
    }
}
