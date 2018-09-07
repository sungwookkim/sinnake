package com.sinnake.biz.web.member.regist;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sinnake.biz.BizChain;
import com.sinnake.service.member.service.MemberService;
import com.sinnake.util.SinnakeAES256Util;

public class MemberRegistInsert extends BizChain {
	public Map<String, Object> global_val = new HashMap<String, Object>();
	public MemberService memberService = null;
	public String pwKey = null;
	
	/***************/
	/* Constructor */
	/***************/
	public MemberRegistInsert() { }
	
	public MemberRegistInsert(MemberService memberService, String pwKey) {
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
 
		// 회원 기본 정보 설정.
		if(!this.setMember(this.global_val)) {
			return false;
		}
		
		// 회원 로그인 시도 횟수 설정.
		if(!this.setMemberAttempts(this.global_val)) {
			return false;
		}
		
		// 회원 권한 설정.
		if(!this.setMemberRoles(global_val, "ROLE_USER")) {
			return false;
		}
		
		// 회원 가입.
		if(!this.setMemberRegist(memberService, this.global_val, this.pwKey)) {
			return false;			
		}

		// 회원 가입 성공.
		this.setSucess();
		
		return true;
	}
	
	/***********/
	/* Process */
	/***********/
	// 회원 기본 정보 설정 프로세스.
	public boolean setMember(Map<String, Object> global_val) throws IOException {
		if(global_val == null) {
			this.setRestResult_redirect("-9");
			return false;
		}
		
		global_val.put("enabled", 1);
		global_val.put("accountNonExpired", 1);
		global_val.put("accountNonLocked", 1);
		global_val.put("credentialsNonExpired", 1);		
		
		return true;
	}
	
	// 회원 로그인 시도 횟수 설정 프로세스.
	public boolean setMemberAttempts(Map<String, Object> global_val) throws IOException {
		if(global_val == null) {
			this.setRestResult_redirect("-10");
			return false;
		}
		
		global_val.put("attempts", 0);
		
		return true;
	}
	
	// 회원 권한 설정 프로세스.
	public boolean setMemberRoles(Map<String, Object> global_val, String role) throws IOException {
		if(global_val == null) {
			this.setRestResult_redirect("-11");
			return false;
		}
		
		global_val.put("role", role);
		
		return true;
	}
	
	// 회원 가입 프로세스.
	public boolean setMemberRegist(MemberService memberService, Map<String, Object> global_val, String pwKey) throws Exception {
		boolean rtnBool = true;
		
		try {
			global_val.put("memberPwd", new SinnakeAES256Util(pwKey).aesEncode(global_val.get("memberPwd").toString()));			

			this.setMemberRegist_DB(memberService, global_val);
		} catch(Exception e) {
			this.setRestResult_redirect("-12");
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
	void setMemberRegist_DB(MemberService memberService, Map<String, Object> global_val) throws Exception {
		memberService.setMemberRegist(global_val);
	}
	
	/************/
	/* Validate */
	/************/
}
