package com.sinnake.biz.security.handler.successHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import com.sinnake.biz.BizChain;
import com.sinnake.util.SinnakeValidate;

public class SuccessHandler extends BizChain {

	/***************/
	/* Constructor */
	/***************/
	public SuccessHandler() { }
	
	/**********/
	/* Excute */
	/**********/
	@Override
	public void excute() throws Exception {
		if(this.main()) {
			this.excuteNext();
		}
	}

	@Override
	public void excute(List<Map<String, Object>> param) throws Exception {

	}

	@Override
	public void excute(Map<String, Object> param) throws Exception {

	}

	/********/
	/* Main */
	/********/
	@Override
	public boolean main() throws Exception {
		
		HttpServletRequest req = this.getServletInfo().getReq();
		
		// 로그인 성공 시 이동 관련 프로세스.
		this.isAjaxCheck(req);

		return true;
	}
	
	/***********/
	/* Process */
	/***********/
	// 로그인 성공 시 이동 관련 프로세스.
	public boolean isAjaxCheck(HttpServletRequest req) throws IOException, ServletException {
		String login_kind = req.getParameter("login_kind");
		
		// 요청 상태가 ajax에 대한 여부에 따라 rest 혹은 페이지 이동.
		if(!this.isLoginKind(login_kind) || "login_page".equals(login_kind))  {
			this.setRestResult_redirect("0");
		} else if("login_header".equals(login_kind)) {
			this.setRestResult_redirect("0");
		}
		
		return true;
	}
	
	/**************/
	/* DB Process */
	/**************/
	
	/************/
	/* Validate */
	/************/
	public boolean isLoginKind(String login_kind) {
		if(new SinnakeValidate(login_kind).required().getValidRes()) {
			return true;
		}
		
		return false;
	}
	
}