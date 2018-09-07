/**
 * 
 */
/**
 * @author sinnakeWEB
 *
 */
package com.sinnake.service.exception.service;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sinnake.common.login.LoginImpl;
import com.sinnake.entity.UserInfo;
import com.sinnake.service.exception.ExceptionMapper;
import com.sinnake.util.SinnakeHttpUtil;
import com.sinnake.util.SinnakeStringUtil;

@Service(value = "exceptionService")
public class ExceptionService {
	
	@Autowired ExceptionMapper exceptionMapper;
	@Autowired LoginImpl loginImpl;

	@Value("#{serverProp['usernameParameter']}") String usernameParam;
	@Value("#{serverProp['passwordParameter']}") String passwordParam;
	
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void setError(String msg, HttpServletRequest req) throws Exception {
		this.setError(msg, req, req.getRequestURI(), req.getMethod());
	}
	
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void setError(String msg, HttpServletRequest req, String uri, String method) throws Exception {
		if(!"/favicon.ico".equals(req.getRequestURI())) {
			UserInfo userInfo = loginImpl.getCurrentUser();			
			HashMap<String, Object> param = new HashMap<String, Object>();
			String userNm = "";

			if(userInfo == null) {
				userNm = SinnakeStringUtil.objectIsNullByString(req.getParameter(usernameParam));
			} else {
				userNm = userInfo.getUserName();
			}

			param.put("errorContent", msg);
			param.put("uri", uri);
			param.put("method", method);
			param.put("xRealIp", SinnakeHttpUtil.getRemoteAddr(req));
			param.put("MemberId", userNm);

			exceptionMapper.setError(param);			
		}
	}	
}
