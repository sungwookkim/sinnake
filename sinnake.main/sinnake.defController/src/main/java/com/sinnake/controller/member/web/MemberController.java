package com.sinnake.controller.member.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sinnake.biz.BizChainInit;
import com.sinnake.biz.entity.DefaultInfo;
import com.sinnake.biz.entity.ServletInfo;
import com.sinnake.biz.entity.ViewInfo;
import com.sinnake.biz.web.member.regist.MemberIdCheck;
import com.sinnake.biz.web.member.regist.MemberRegistInsert;
import com.sinnake.biz.web.member.regist.MemberRegistValidate;
import com.sinnake.biz.web.member.registUpdate.MemberRegistUpdate;
import com.sinnake.biz.web.member.registUpdate.MemberRegistUpdateValidate;
import com.sinnake.common.login.inter.LoginInterface;
import com.sinnake.service.member.service.MemberService;

@Controller
@RequestMapping(value="/member")
public class MemberController {

	@Value("#{serverProp['pwAes256.key']}") String pwKey;
	
	@Autowired LoginInterface loginImpl;
	@Autowired MemberService memberService;
	
	// 로그인.
	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String login(HttpServletRequest req, Model model) throws Exception {
		model.addAttribute("jsController", "controller/member/loginController");

		return "view";
	}

	// 회원 가입 시 ID 중복 체크.
	@RequestMapping(value="/memberIdCheck", method=RequestMethod.GET)
	@ResponseBody public String memberIdCheck(HttpServletRequest req) throws Exception {
		/************************/
		/* View 관련 정보 설정. */
		/************************/
		ViewInfo viewInfo = new ViewInfo();
		viewInfo.setViewName("false");

		/*****************************/
		/* 서버 객체 관련 정보 설정. */
		/*****************************/
		ServletInfo servletInfo = new ServletInfo();
		servletInfo.setReq(req);

		/*******************/
		/* 내부 정보 설정. */
		/*******************/
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);

		bizChainInit
			// ID 존재 여부 확인 로직.
			.setNext(new MemberIdCheck(memberService));
		
		bizChainInit.excute();
		
		return viewInfo.getViewName();		
	}
	
	// 회원 가입.
	@RequestMapping(value="/regist", method=RequestMethod.GET)
	public String memberRegGet(HttpServletRequest req, Model model) {
		model.addAttribute("jsController", "controller/member/registController");

		return "view";
	}
	
	// 회원 가입.
	@RequestMapping(value="/regist", method=RequestMethod.POST)
	public void memberRegPost(HttpServletRequest req, HttpServletResponse res, Model model) throws Exception {
		/************************/
		/* View 관련 정보 설정. */
		/************************/
		ViewInfo viewInfo = new ViewInfo();

		/*****************************/
		/* 서버 객체 관련 정보 설정. */
		/*****************************/
		ServletInfo servletInfo = new ServletInfo();
		servletInfo.setReq(req);
		servletInfo.setRes(res);
		
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
			// 회원 가입 데이터 검증 로직.
			.setNext(new MemberRegistValidate(memberService))
			// 회원 가입 로직.
			.setNext(new MemberRegistInsert(memberService, pwKey));
		
		bizChainInit.excute();
	}
	
	// 회원 정보 수정.
	@RequestMapping(value="/registUpdate", method=RequestMethod.GET)
	public String memberRegUpdateGet(HttpServletRequest req, HttpServletResponse res, Model model) throws Exception {
		model.addAttribute("jsController", "controller/member/registUpdateController");

		return "view";
	}
	
	// 회원 정보 수정.
	@RequestMapping(value="/registUpdate", method=RequestMethod.POST)
	public void memberRegUpdatePost(HttpServletRequest req, HttpServletResponse res, Model model) throws Exception {
		/************************/
		/* View 관련 정보 설정. */
		/************************/
		ViewInfo viewInfo = new ViewInfo();

		/*****************************/
		/* 서버 객체 관련 정보 설정. */
		/*****************************/
		ServletInfo servletInfo = new ServletInfo();
		servletInfo.setReq(req);
		servletInfo.setRes(res);
		
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
			// 회원 정보 수정 데이터 검증 로직.
			.setNext(new MemberRegistUpdateValidate(memberService, pwKey))
			// 회원 정보 수정 로직.
			.setNext(new MemberRegistUpdate(memberService, pwKey));
		
		bizChainInit.excute();
	}
}
