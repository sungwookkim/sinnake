package com.sinnake.controller.serverInfo.web;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sinnake.biz.BizChainInit;
import com.sinnake.biz.entity.DefaultInfo;
import com.sinnake.biz.entity.ServletInfo;
import com.sinnake.biz.entity.ViewInfo;
import com.sinnake.biz.web.serverInfo.user.SetUserDetailInfo;
import com.sinnake.biz.web.serverInfo.user.SetUserInfo;
import com.sinnake.biz.web.serverInfo.user.UserInfoValidate;
import com.sinnake.common.login.inter.LoginInterface;
import com.sinnake.service.member.service.MemberService;

@Controller
@RequestMapping(value="/srvInfo")
public class ServerInfoController {

	@Autowired LoginInterface loginImpl;	
	@Autowired MemberService memberService;

	/*
	 * 로그인 된 회원 정보 조회.
	 */
	@RequestMapping(value = "/getUser", method = RequestMethod.GET)
	@ResponseBody public String getUser(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp, Authentication auth) throws Exception {		
		/************************/
		/* View 관련 정보 설정. */
		/************************/
		ViewInfo viewInfo = new ViewInfo();

		/*****************************/
		/* 서버 객체 관련 정보 설정. */
		/*****************************/
		ServletInfo servletInfo = new ServletInfo();
		servletInfo.setReq(req);
		servletInfo.setRes(resp);

		/*******************/
		/* 내부 정보 설정. */
		/*******************/
		DefaultInfo defaultInfo = new DefaultInfo();
		defaultInfo.setUserInfo(loginImpl.getCurrentUser());
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);
		bizChainInit.setDefaultInfo(defaultInfo);

		bizChainInit
			// 로그인 회원 정보 검증.
			.setNext(new UserInfoValidate())
			// 로그인 회원 정보 설정.
			.setNext(new SetUserInfo());
		
		bizChainInit.excute();
		
		return viewInfo.getViewName();			
	}
	
	/*
	 * 로그인 된 회원 정보 조회.
	 */
	@RequestMapping(value = "/getUserDetail", method = RequestMethod.GET)
	@ResponseBody public String getUserDetail(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp, Authentication auth) throws Exception {		
		/************************/
		/* View 관련 정보 설정. */
		/************************/
		ViewInfo viewInfo = new ViewInfo();

		/*****************************/
		/* 서버 객체 관련 정보 설정. */
		/*****************************/
		ServletInfo servletInfo = new ServletInfo();
		servletInfo.setReq(req);
		servletInfo.setRes(resp);

		/*******************/
		/* 내부 정보 설정. */
		/*******************/
		DefaultInfo defaultInfo = new DefaultInfo();
		defaultInfo.setUserInfo(loginImpl.getCurrentUser());
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);
		bizChainInit.setDefaultInfo(defaultInfo);

		bizChainInit
			// 로그인 회원 정보 검증.
			.setNext(new UserInfoValidate())
			// 로그인 회원 상세 정보 설정.
			.setNext(new SetUserDetailInfo(memberService));
		
		bizChainInit.excute();
		
		return viewInfo.getViewName();			
	}
}
