package com.sinnake.biz.web.member.regist;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sinnake.biz.BizChain;
import com.sinnake.biz.entity.ServletInfo;
import com.sinnake.biz.entity.ViewInfo;
import com.sinnake.service.member.service.MemberService;

public class MemberIdCheck extends BizChain {
	public MemberService memberService = null;
	 
	/***************/
	/* Constructor */
	/***************/
	public MemberIdCheck() { }

	public MemberIdCheck(MemberService memberService) {
		this.memberService = memberService;
	}
	
	/**********/
	/* Excute */
	/**********/
	@Override
	public void excute() throws Exception {
		if(main()) {
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
		ViewInfo viewInfo = this.getViewInfo();
		ServletInfo servletInfo = this.getServletInfo();		
		
		this.getMemberCheck(viewInfo, memberService, servletInfo.getReq().getParameter("memberId"));
		
		return true;
	}

	/***********/
	/* Process */
	/***********/
	// ID 존재 여부 로직.
	boolean getMemberCheck(ViewInfo viewInfo, MemberService memberService, String memberId) throws Exception {
		boolean rtnBoolean = false;
		HashMap<String, Object> memberInfo = this.getMemberId_DB(memberService, memberId);

		if(memberInfo.size() == 0) {
			viewInfo.setViewName("true");
			rtnBoolean = true;
		}

		return rtnBoolean;
	}

	/**************/
	/* DB Process */
	/**************/
	// ID DB 조회.
	public HashMap<String, Object> getMemberId_DB(MemberService memberService, String memberId) throws Exception {
		HashMap<String, Object> memberInfo = memberService.getMember(memberId);

		if(memberInfo == null || memberInfo.isEmpty()) {
			memberInfo = new HashMap<String, Object>();
		}
		
		return memberInfo;
	}
	/************/
	/* Validate */
	/************/

}
