package com.sinnake.spring.http;

import java.util.Collections;
import java.util.Enumeration;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

/*
 * HttpServletRequest 커스텀 클래스.
 */
public class SinnakeHttpServletRequest extends HttpServletRequestWrapper  {
	Map<String, String[]> params;
	
	public SinnakeHttpServletRequest(HttpServletRequest request) {
		super(request); 
		this.params = request.getParameterMap();
	}

	public SinnakeHttpServletRequest(HttpServletRequest request, Map<String, String[]> params) {
		super(request); 
		this.params = params;
	}
	
	@Override
	public String getParameter(String name) {
	    String[] paramArray = getParameterValues(name);
	
	    if (paramArray != null && paramArray.length > 0) {
	        return paramArray[0];
	    } else {
	        return null;
	    }
	}

	@Override
	public Map<String, String[]> getParameterMap() {
		return Collections.unmodifiableMap(this.params);
	}

	@Override
	public Enumeration<String> getParameterNames() {
	    return Collections.enumeration(this.params.keySet());
	}

	@Override
	public String[] getParameterValues(String name) {
	    String[] result = null;
	    String[] temp = this.params.get(name);
	
	    if (temp != null) {
	        result = new String[temp.length];
	        System.arraycopy(temp, 0, result, 0, temp.length);
	    }
	
	    return result;
	}
}
