package com.sinnake.util;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

@Component("sinnakeLocaleUtil")
public class SinnakeLocaleUtil {
	@Value("#{globalProp['locale.propertie']}") String globalLocale;
	
	public Locale getLocale(HttpServletRequest request) {
		Locale locale = null;
		HttpSession session = request.getSession();

		locale = (Locale)session.getAttribute(SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME);
		if(locale == null) {
			locale = new Locale(globalLocale);
		}
		
		return locale;
	}
}
