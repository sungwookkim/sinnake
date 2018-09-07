package com.sinnake.spring.interceptor;

import java.util.Locale;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

public class SinnakeLocaleChangeInterceptor extends LocaleChangeInterceptor {
	private String LANG = "ko";
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws ServletException {

		super.preHandle(request, response, handler);

		/*
		 * 현재 언어 Cookie 설정.
		 */
		Locale locale = (Locale)request.getSession().getAttribute(SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME);
		if(locale != null) {
			LANG = locale.getLanguage();
		}
		
		Cookie langCooke = new Cookie("pageLang", LANG);
		langCooke.setPath("/");
		
		response.addCookie(langCooke);
		
		return true;
	}
}
