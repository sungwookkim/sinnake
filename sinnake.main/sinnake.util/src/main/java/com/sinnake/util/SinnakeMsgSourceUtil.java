package com.sinnake.util;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.context.NoSuchMessageException;
import org.springframework.stereotype.Component;

@Component("sinnakeMsgSourceUtil")
public class SinnakeMsgSourceUtil {
	@Autowired SinnakeLocaleUtil sinnakeLocaleUtil;
	@Autowired MessageSource messageSource;
	@Value("#{globalProp['locale.propertie']}") String globalLocale;

	public String getMsg(String code, Locale locale) {
		return messageSource.getMessage(code, null, locale);
	}
	
	public String getMsg(String code, HttpServletRequest request) {
		return messageSource.getMessage(code, null, sinnakeLocaleUtil.getLocale(request));
	}
	
	public String getMsg(String code, Object[] args, String defaultMessage, HttpServletRequest request) {
		return messageSource.getMessage(code, args, defaultMessage, sinnakeLocaleUtil.getLocale(request));
	}
	
	public String getMsg(String code, Object[] args, String defaultMessage, Locale locale) {
		return messageSource.getMessage(code, args, defaultMessage, locale);
	}
	
	public String getMag(String code, Object[] args, HttpServletRequest request) throws NoSuchMessageException {
		return messageSource.getMessage(code, args, sinnakeLocaleUtil.getLocale(request));
	}
	
	public String getMag(String code, Object[] args, Locale locale) throws NoSuchMessageException {
		return messageSource.getMessage(code, args, locale);
	}
	
	public String getMsg(MessageSourceResolvable resolvable, HttpServletRequest request) throws NoSuchMessageException {
		return messageSource.getMessage(resolvable, sinnakeLocaleUtil.getLocale(request));
	}
	
	public String getMsg(MessageSourceResolvable resolvable, Locale locale) throws NoSuchMessageException {
		return messageSource.getMessage(resolvable, locale);
	}
}
