package com.sinnake.biz;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.ui.Model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sinnake.biz.entity.DefaultInfo;
import com.sinnake.biz.entity.ServletInfo;
import com.sinnake.biz.entity.ViewInfo;
import com.sinnake.util.SinnakeValidate;

public abstract class BizChain {

	private BizChain next = null;
	private ViewInfo viewInfo = null;
	private ServletInfo servletInfo = null;
	private DefaultInfo defaultInfo = null;
	private HashMap<String, Object> restData = new HashMap<String, Object>();
	
	public boolean hasNext() {
		return this.next != null;
	}
	
	public void nextInit() {
		this.next.setViewInfo(this.viewInfo);
		this.next.setServletInfo(this.servletInfo);
		this.next.setDefaultInfo(this.defaultInfo);
		this.next.setRest(this.restData);
	}
	
	public BizChain setNext(BizChain next) {
		this.next = next;
		return next;
	}
	
	public BizChain getNext() {
		return this.next;
	}
	
	/**********/
	/* Setter */
	/**********/
	public void setServletInfo(ServletInfo servletInfo) {
		this.servletInfo = servletInfo;
	}
	
	public void setViewInfo(ViewInfo viewInfo) {
		this.viewInfo = viewInfo;
	}
	
	public void setDefaultInfo(DefaultInfo defaultInfo) {
		this.defaultInfo = defaultInfo;
	}

	private void setRest(HashMap<String, Object> restData) {
		this.restData = restData;
	}

	/**********/
	/* Getter */
	/**********/
	public ViewInfo getViewInfo() {
		return this.viewInfo;
	}

	public ServletInfo getServletInfo() {
		return this.servletInfo;
	}
	
	public DefaultInfo getDefaultInfo() {
		return this.defaultInfo;
	}
	
	/***************/
	/* 제어 메소드 */
	/***************/	
	public void excuteNext() throws Exception {
		if(this.hasNext()) {
			this.nextInit();
			this.next.excute();
		}
	}

	public void excuteNext(List<Map<String, Object>> listParam) throws Exception {
		if(this.hasNext()) {
			this.nextInit();
			this.next.excute(listParam);
		}
	}
	
	public void excuteNext(Map<String, Object> mapParam) throws Exception {
		if(this.hasNext()) {
			this.nextInit();
			this.next.excute(mapParam);
		}
	}

	/*********************/
	/* 기본 구현 메소드  */
	/*********************/
	public abstract void excute() throws Exception;
	public abstract void excute(List<Map<String, Object>> param)  throws Exception;  
	public abstract void excute(Map<String, Object> param)  throws Exception;
	public abstract boolean main() throws Exception;
	
	/*********************/
	/* 공통 유틸 메소드  */
	/*********************/
	// 플랫폼 별 url 변경.
	public String getPlatformTypeUrl(String url) {
		return this.getPlatformTypeUrl(url, this.servletInfo);
	}
	
	public String getPlatformTypeUrl(String url, ServletInfo servletInfo) {
		String rtnUrl = "";
		String platformType = servletInfo.getPlatformType();
		
		if(platformType == null || "W".equals(platformType)) {
			rtnUrl = url;
		} else if("M".equals(platformType)) {
			rtnUrl = "m/" + url;
		}

		return rtnUrl;
	}
	
	
	// TODO : Rest 관련 메소드.
	// 쿠키에 코드 값 생성 메소드.	
	private void changeCodeCookie(String changeCode, HttpServletRequest req, HttpServletResponse resp) {
		String resCodeNm = req.getParameter("changeCodeNm");
		
		if(!new SinnakeValidate(resCodeNm).required().getValidRes()) {
			resCodeNm = "changeCodeNm_changeCode";
		}
		
		Cookie msgCookie = new Cookie(resCodeNm, changeCode);
		msgCookie.setPath("/");
		
		resp.addCookie(msgCookie);
	}
	
	// 응답 코드 설정.
	public BizChain setRestResCode(String code) {
		this.restData.put("resCode", code);
		
		return this;
	}
	
	// 응답 값 설정.
	public BizChain setRestResParam(String key, Object value) {
		this.restData.put(key, value);
		
		return this;
	}
	
	// 성공 응답 코드 설정.
	public BizChain setRestResSucess() {
		this.setRestResCode("0");		

		return this;
	}

	// 응답 값을 JSON형태로 변환.
	public String getRestRes() throws JsonProcessingException {
		return new ObjectMapper().writeValueAsString(this.restData);
	}

	// 응답 값을 response를 이용하여 응답.
	public BizChain getRespRestRes() throws IOException {
		return this.getRespRestRes(this.getServletInfo().getRes());	
	}
	
	public BizChain getRespRestRes(HttpServletResponse resp) throws IOException {
		PrintWriter out  = resp.getWriter();
		out.write(this.getRestRes());
		out.flush();
		out.close();

		return this;
	}
	
	// 지정한 URL로 redircet.
	public BizChain setRespRedircet(String url) throws IOException {		
		return this.setRespRedircet(url, this.getServletInfo().getRes());
	}
	
	public BizChain setRespRedircet(String url, HttpServletResponse resp) throws IOException {
		if(!new SinnakeValidate(url).required().getValidRes()) {
			url = "/main";
		}
		
		resp.sendRedirect(url);
		
		return this;
	}
		
	// 응답 코드를 가지고 이전 페이지로 redircet(Ajax 체크).
	public void setRestResult_redirect(String resCode) throws IOException {
		this.setRestResult_redirect(resCode, this.getServletInfo().getReq(), this.getServletInfo().getRes());
	}
	
	public void setRestResult_redirect(String resCode, HttpServletRequest req, HttpServletResponse resp) throws IOException {
		if(this.isAjax(req)) {
			this.setRestResCode(resCode)
				.getRespRestRes(resp);
		} else {
			this.setChangeUrl_redirect(resCode, req, resp);
		}
	}
	
	// 응답 코드를 가지고 이전 페이지로 redirect로 이동(페이지 이동).
	public BizChain setChangeUrl_redirect(String changeCode) throws IOException {
		return this.setChangeUrl_redirect(changeCode, this.getServletInfo().getReq(), this.getServletInfo().getRes());
	}

	public BizChain setChangeUrl_redirect(String changeCode, HttpServletRequest req, HttpServletResponse resp) throws IOException {		
		this.changeCodeCookie(changeCode, req, resp);
		this.setRespRedircet(req.getHeader("Referer"), resp);
		
		return this;
	}
	
	// 응답 코드를 가지고 지정한 URL로 redircet(Ajax 체크).
	public void setRestResult_redirect(String resCode, String url) throws IOException {
		this.setRestResult_redirect(resCode, url, this.getServletInfo().getReq(), this.getServletInfo().getRes());
	}
	
	public void setRestResult_redirect(String resCode, String url, HttpServletRequest req, HttpServletResponse resp) throws IOException {
		if(this.isAjax(req)) {
			this.setRestResCode(resCode)
				.getRespRestRes(resp);
		} else {
			this.changeCodeCookie(resCode, req, resp);
			this.setRespRedircet(url, resp);
		}
	}

	// 지정한 URL로 forward.
	public BizChain setRespForward(String url) throws ServletException, IOException {
		return this.setRespForward(url, this.getServletInfo().getReq(), this.getServletInfo().getRes());
	}

	public BizChain setRespForward(String url, HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		RequestDispatcher dispatcher = req.getRequestDispatcher(url);
		dispatcher.forward(req, resp);
		
		return this;
	}
	
	// 응답 코드를 가지고 이전 페이지로 forward로 이동(Ajax 체크).
	public void setRestResult_forward(String resCode) throws IOException, ServletException {
		this.setRestResult_forward(resCode, this.getServletInfo().getReq(), this.getServletInfo().getRes());
	}
	
	public void setRestResult_forward(String resCode, HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
		if(this.isAjax(req)) {
			this.setRestResCode(resCode)
				.getRespRestRes(resp);
		} else {
			this.setChangeUrl_forward(resCode, req, resp);
		}
	}
	
	// 응답 코드를 가지고 이전 페이지로 forward로 이동(페이지 이동).
	public BizChain setChangeUrl_forward(String changeCode) throws IOException, ServletException {
		return this.setChangeUrl_forward(changeCode, this.getServletInfo().getReq(), this.getServletInfo().getRes());
	}
	
	public BizChain setChangeUrl_forward(String changeCode, HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
		this.changeCodeCookie(changeCode, req, resp);
		this.setRespForward(req.getHeader("Referer"), req, resp);
		
		return this;
	}
	
	// 응답 코드를 가지고 지정한 URL로 forward로 이동(Ajax 체크).
	public void setRestResult_forward(String resCode, String url) throws IOException, ServletException {
		this.setRestResult_forward(resCode, url, this.getServletInfo().getReq(), this.getServletInfo().getRes());
	}
	
	public void setRestResult_forward(String resCode, String url, HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
		if(this.isAjax(req)) {
			this.setRestResCode(resCode)
				.getRespRestRes(resp);
		} else {
			this.changeCodeCookie(resCode, req, resp);
			this.setRespForward(url, req, resp);			
		}
	}

	// 응답 코드를 가지고 지정한 model controller로 이동(Ajax 체크).
	/*
	 * 해당 메소드를 사용 한 경우에는 서버 컨트롤러 메소드에서 return을 "view"로 해줘야 함.
	 * ViewInfo클래스의 getViewName()메소드에서 별도로 set를 안했으면 기본 값으로 "view"를 리턴 함.
	 */
	public void setRestResult_model(String resCode, String url) throws IOException, ServletException {
		this.setRestResult_model(resCode, url, this.getServletInfo().getReq(), this.getServletInfo().getRes(), this.getViewInfo().getModel());
	}
	
	public void setRestResult_model(String resCode, String url, HttpServletRequest req, HttpServletResponse resp, Model model) throws IOException, ServletException {
		if(this.isAjax(req)) {
			this.setRestResCode(resCode)
				.getRespRestRes(resp);
		} else {
			model.addAttribute("jsController", url);
		}
	}
	
	// Ajax 통신 여부 판단 메소드.
	public boolean isAjax(HttpServletRequest req) {
		boolean isBoolean = false;
		
		String xReqWith = req.getHeader("X-Requested-With");
		
		if(xReqWith != null && "xmlhttprequest".equals(xReqWith.toLowerCase())) {
			isBoolean = true;			 
		}
		
		return isBoolean;
	}
	
	public boolean isAjax() {
		return this.isAjax(this.getServletInfo().getReq());
	}
}
