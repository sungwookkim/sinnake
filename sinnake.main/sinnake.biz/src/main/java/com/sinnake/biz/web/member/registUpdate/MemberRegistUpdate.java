package com.sinnake.biz.web.member.registUpdate;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sinnake.biz.BizChain;
import com.sinnake.biz.entity.DefaultInfo;
import com.sinnake.entity.UserInfo;
import com.sinnake.service.member.service.MemberService;
import com.sinnake.util.SinnakeAES256Util;

public class MemberRegistUpdate extends BizChain {
	public Map<String, Object> global_val = new HashMap<String, Object>();
	public MemberService memberService = null;
	public String pwKey = null;
	
	/***************/
	/* Constructor */
	/***************/
	public MemberRegistUpdate() { }
	
	public MemberRegistUpdate(MemberService memberService, String pwKey) {
		this.memberService = memberService;
		this.pwKey = pwKey;
	}
	
	/**********/
	/* Excute */
	/**********/
	@Override
	public void excute() throws Exception {

	}
	
	@Override
	public void excute(List<Map<String, Object>> param) throws Exception {

	}

	@Override
	public void excute(Map<String, Object> param) throws Exception {
		this.global_val = param;
		
		if(main()) {
			this.excuteNext();
		}
	}
	
	/********/
	/* Main */
	/********/
	@Override
	public boolean main() throws Exception {
		// 회원 ID 설정 프로세스.
		if(!this.setMemberId(this.getDefaultInfo(), global_val)) {
			return false;
		}
		
		// 회원 정보 수정.
		if(!this.setMemberRegistUpdate(memberService, this.global_val, this.pwKey)) {
			return false;			
		}

		// 회원 정보 수정 성공.
		this.setSucess();
		
		return true;
	}
	
	/***********/
	/* Process */
	/***********/
	// 회원 ID 설정 프로세스.
	public boolean setMemberId(DefaultInfo defaultInfo, Map<String, Object> global_val) throws Exception {
		UserInfo userInfo = defaultInfo.getUserInfo();
		
		if(userInfo == null) {
			this.setRestResult_redirect("-8");
			return false;
		}
		
		global_val.put("memberId", userInfo.getUserName());

		return true;
	}
	
	// 회원 정보 수정 프로세스.
	public boolean setMemberRegistUpdate(MemberService memberService, Map<String, Object> global_val, String pwKey) throws Exception {
		boolean rtnBool = true;
		
		try {
			global_val.put("memberPwd", new SinnakeAES256Util(pwKey).aesEncode(global_val.get("memberPwd").toString()));			

			this.setMemberRegistUpdate_DB(memberService, global_val);
		} catch(Exception e) {
			this.setRestResult_redirect("-9");
			rtnBool = false;

			throw e;
		}
		
		return rtnBool;
	}

	// 회원 가입 성공 프로세스.
	public boolean setSucess() throws IOException {
		this.setRestResult_redirect("0");

		return true;
	}
	
	/**************/
	/* DB Process */
	/**************/
	// 회원 가입 DB.
	void setMemberRegistUpdate_DB(MemberService memberService, Map<String, Object> global_val) throws Exception {
		memberService.setMemberRegistUpdate(global_val);
	}
	
	/************/
	/* Validate */
	/************/
}
