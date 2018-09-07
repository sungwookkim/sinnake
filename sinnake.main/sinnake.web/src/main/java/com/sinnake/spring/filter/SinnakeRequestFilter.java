package com.sinnake.spring.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.owasp.esapi.ESAPI;
import org.owasp.esapi.errors.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;

import com.sinnake.common.login.LoginImpl;
import com.sinnake.common.login.inter.LoginInterface;
import com.sinnake.spring.auth.xss.XSSImpl;
import com.sinnake.spring.auth.xss.inter.XSSInterface;
import com.sinnake.spring.http.SinnakeHttpServletRequest;

/*
 * request 요청 Filter 클래스.
 */
@SuppressWarnings("unused")
public class SinnakeRequestFilter implements Filter {	
	private FilterConfig filterConfig;
	
	public void destroy() {
		filterConfig = null;
	}
		
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
			throws IOException, ServletException {
/*		
		XSSInterface xss = new XSSImpl();
		Map<String, String[]> params = req.getParameterMap();
		Map<String, String[]> newParams = new HashMap<String, String[]>();
		
		Iterator<String> paramsNames = params.keySet().iterator();
		while(paramsNames.hasNext()) {
			String key = paramsNames.next();
			String[] value = params.get(key);

			// XSS 방지를 위해서 인코딩.
			value = xss.run(key, value);
			
			newParams.put(key, value);
		}

		chain.doFilter(new SinnakeHttpServletRequest((HttpServletRequest)req, newParams), resp);
*/
		chain.doFilter(new SinnakeHttpServletRequest((HttpServletRequest)req, req.getParameterMap()), resp);
	}
	
	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
	}

}
