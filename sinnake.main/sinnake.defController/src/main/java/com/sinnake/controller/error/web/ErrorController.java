package com.sinnake.controller.error.web;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sinnake.service.exception.service.ExceptionService;
import com.sinnake.sinnakeEnum.SinnakeSecurityEnum;
import com.sinnake.util.SinnakeStringUtil;

@Controller
@RequestMapping(value = "/error")
public class ErrorController {
	@Autowired ExceptionService exceptionService;	
	
	@RequestMapping(value = "/exception", method = {RequestMethod.GET, RequestMethod.POST})
	public String exception(HttpServletRequest req, Model model) throws Exception {
		model.addAttribute("jsController", "controller/error/errorController");

		return "view";
	}

	@RequestMapping(value = "/loginRequired", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody public String loginRequired(HttpServletRequest req) throws Exception {
		String errJson = checkUrlException(req);

		return errJson;
	}
	
	@RequestMapping(value = "/AccessDeniedHandler", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody public String accessDefiend(HttpServletRequest req) throws Exception {
		String errJson = checkUrlException(req);

		return errJson;
	}
	
	@RequestMapping(value = "/AuthenticationFailureHandler", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody public String onAuthenticationFailure(HttpServletRequest req) throws Exception {
		String errJson = checkUrlException(req);

		return errJson;
	}
	
	private String checkUrlException(HttpServletRequest req) throws Exception {
		String type = SinnakeStringUtil.objectIsNullByString(req.getAttribute("urlType"));
		String errorCode = SinnakeStringUtil.objectIsNullByString(req.getAttribute("errorCode"));
		String errorMsg = SinnakeStringUtil.objectIsNullByString(req.getAttribute("errorMsg"));
		
		HashMap<String, Object> rtn = new HashMap<String, Object>();
		
		if("json".equals(type)) {
			exceptionService.setError(errorMsg + " JSON", req, req.getAttribute("uri").toString(), req.getAttribute("method").toString());
			rtn.put("resCode", errorCode);
		} else {
			exceptionService.setError(errorMsg, req, req.getAttribute("uri").toString(), req.getAttribute("method").toString());
			SinnakeSecurityEnum.SinnakeSecurity.Default.exception(errorMsg);
		}
		
		return new ObjectMapper().writeValueAsString(rtn);
	}
	
}
