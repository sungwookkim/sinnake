package com.sinnake.spring.auth.xss;

import org.owasp.esapi.ESAPI;

import com.sinnake.spring.auth.xss.inter.XSSInterface;
import com.sinnake.util.SinnakeHttpUtil;

/*
 * XSS 처리 클래스.
 */
public class XSSImpl implements XSSInterface{

	public String[] run(String key, String[] value) {
		if(ESAPI.securityConfiguration().getPasswordParameterName().equals(key)) {
			return value;
		}

		return SinnakeHttpUtil.encodeForHTML(value);
	}

}
