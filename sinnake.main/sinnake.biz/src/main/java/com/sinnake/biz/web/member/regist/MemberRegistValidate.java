/**
 * 
 */
/**
 * @author sinnakeWEB
 *
 */
package com.sinnake.biz.web.member.regist;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.sinnake.biz.BizChain;
import com.sinnake.service.member.service.MemberService;
import com.sinnake.util.SinnakeValidate;

public class MemberRegistValidate extends BizChain {
	public Map<String, Object> global_val = new HashMap<String, Object>();
	public MemberService memberService = null;

	/***************/
	/* Constructor */
	/***************/
	public MemberRegistValidate() { }
	
	public MemberRegistValidate(MemberService memberService) {
		this.memberService = memberService;
	}
	
	/**********/
	/* Excute */
	/**********/
	@Override
	public void excute() throws Exception {
		if(main()) {
			this.excuteNext(this.global_val);
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
		
		// 이용약관 안내 검증.
		if(!this.termsServiceProc(this.global_val, req)) {
			return false;
		}
		
		// 개인정보 수집 검증
		if(!this.termsPrivacyProc(this.global_val, req)) {
			return false;
		}
		
		// ID 검증.
		if(!this.idValidProc(this.global_val, req)) {
			return false;
		}

		// 비밀번호 검증.
		if(!this.pwdValidProc(this.global_val, req)) {
			return false;
		}

		// 비밀번호 확인 검증.
		if(!this.rePwdValidProc(this.global_val, req)) {
			return false;
		}
		
		// 우편번호 검증 프로세스.
		if(!this.postCodeValidProc(this.global_val, req)) {
			return false;			
		}
		
		// 주소 검증 프로세스.
		if(!this.addressValidProc(this.global_val, req)) {
			return false;			
		}
		
		// 상세주소 검증 프로세스.
		if(!this.detailAddressValidProc(this.global_val, req)) {
			return false;			
		}

		return true;
	}
	
	/***********/
	/* Process */
	/***********/
	// 이용약관 안내 검증 프로세스.
	public boolean termsServiceProc(Map<String, Object> global_val, HttpServletRequest req) throws IOException {
		String termsService = req.getParameter("termsService");
		boolean rtnValid = false;
		
		// 이용약관 안내 검증.
		if(this.isTermsServiceValid(termsService)) {			
			if("on".equals(termsService)) { termsService = "1"; }

			rtnValid = true;
			global_val.put("termsService", termsService);
		} else {
			this.setRestResult_redirect("-1");
		}
		
		return rtnValid;				
	}
	
	// 개인정보 수집 검증 프로세스.
	public boolean termsPrivacyProc(Map<String, Object> global_val, HttpServletRequest req) throws IOException {
		String termsPrivacy = req.getParameter("termsPrivacy");
		boolean rtnValid = false;
		
		// 개인정보 수집 검증.
		if(this.isTermsPrivacyValid(termsPrivacy)) {
			if("on".equals(termsPrivacy)) { termsPrivacy = "1"; }

			rtnValid = true;
			global_val.put("termsPrivacy", termsPrivacy);
		} else {
			this.setRestResult_redirect("-2");
		}
		
		return rtnValid;				
	}
	
	// ID 검증 프로세스.
	public boolean idValidProc(Map<String, Object> global_val, HttpServletRequest req) throws Exception {
		String memberId = req.getParameter("memberId");
		boolean rtnValid = false;
		
		// ID 검증.
		if(this.isIdValid(memberId)) {
			rtnValid = true;
			global_val.put("memberId", memberId);
		} else {
			this.setRestResult_redirect("-3");
		}
		
		return rtnValid;				
	}
	
	// 비밀번호 검증 프로세스.
	public boolean pwdValidProc(Map<String, Object> global_val, HttpServletRequest req) throws IOException {
		String memberPwd = req.getParameter("memberPwd");
		boolean rtnValid = false;
		
		// 비밀번호 검증.
		if(this.isPwdValid(memberPwd)) {
			rtnValid = true;
			global_val.put("memberPwd", memberPwd);
		} else {
			this.setRestResult_redirect("-4");
		}
		
		return rtnValid;				
	}
	
	// 비밀번호 확인 검증 프로세스.
	public boolean rePwdValidProc(Map<String, Object> global_val, HttpServletRequest req) throws IOException {
		String memberRePwd = req.getParameter("memberRePwd");
		boolean rtnValid = false;
		
		// 비밀번호 검증.
		if(this.isRePwdValid(global_val, memberRePwd)) {
			rtnValid = true;
			global_val.put("memberRePwd", memberRePwd);
		} else {
			this.setRestResult_redirect("-5");
		}
		
		return rtnValid;				
	}
	
	// 우편번호 검증 프로세스.
	public boolean postCodeValidProc(Map<String, Object> global_val, HttpServletRequest req) throws IOException {
		String postCode = req.getParameter("postCode");
		boolean rtnValid = false;
		
		// 우편번호 검증.
		if(this.isPostCodeValid(postCode)) {
			rtnValid = true;
			global_val.put("postCode", postCode);
		} else {
			this.setRestResult_redirect("-6");
		}
		
		return rtnValid;				
	}

	// 주소 검증 프로세스.
	public boolean addressValidProc(Map<String, Object> global_val, HttpServletRequest req) throws IOException {
		String address = req.getParameter("address");
		boolean rtnValid = false;
		
		// 주소 검증.
		if(this.isAddressValid(address)) {
			rtnValid = true;
			global_val.put("address", address);
		} else {
			this.setRestResult_redirect("-7");
		}
		
		return rtnValid;				
	}
	
	// 상세주소 검증 프로세스.
	public boolean detailAddressValidProc(Map<String, Object> global_val, HttpServletRequest req) throws IOException {
		String detailAddress = req.getParameter("detailAddress");
		boolean rtnValid = false;
		
		// 상세주소 검증.
		if(this.isDetailAddressValid(detailAddress)) {
			rtnValid = true;
			global_val.put("detailAddress", detailAddress);
		} else {
			this.setRestResult_redirect("-8");
		}
		
		return rtnValid;				
	}
	/**************/
	/* DB Process */
	/**************/

	/************/
	/* Validate */
	/************/
	// 이용약관 안내 검증.
	public boolean isTermsServiceValid(String termsService) {
		if(!new SinnakeValidate(termsService)
			.checkBoxRequired()
			.getValidRes()) {
			
			return false;
		}

		return true;
	}
	
	// 개인정보 수집 안내 검증.
	public boolean isTermsPrivacyValid(String termsPrivacy) {
		if(!new SinnakeValidate(termsPrivacy)
			.checkBoxRequired()
			.getValidRes()) {
			
			return false;
		}

		return true;
	}
	
	// ID 검증.
	public boolean isIdValid(String memberId) throws Exception {
		if(!new SinnakeValidate(memberId)
			.required()
			.blankValid()
			.minLen(5)
			.maxLen(16)
			.idValid()
			.getValidRes()) {

			return false;
		}
		
		HashMap<String, Object> idCheck = new MemberIdCheck().getMemberId_DB(memberService, memberId);
		if(!(idCheck.isEmpty() && idCheck.size() == 0)) {
			return false;
		}
		
		return true;
	}	

	
	// 비밀번호 검증.
	public boolean isPwdValid(String memberPwd) {
		if(!new SinnakeValidate(memberPwd)
			.required()
			.blankValid()
			.minLen(8)
			.maxLen(10)
			.pwdValid()
			.getValidRes()) {

			return false;
		}
		
		return true;
	}	
	
	// 비밀번호 확인 검증.
	public boolean isRePwdValid(Map<String, Object> global_val, String memberRePwd) {
		if(!new SinnakeValidate(memberRePwd)
			.required()
			.blankValid()
			.minLen(8)
			.maxLen(10)
			.pwdValid()
			.equalTo(global_val.get("memberPwd").toString())
			.getValidRes()) {

			return false;
		}
		
		return true;
	}
	
	// 우편번호 검증.
	public boolean isPostCodeValid(String postCode) {
		if(!new SinnakeValidate(postCode)
			.required()
			.number()
			.getValidRes()) {

			return false;
		}
		
		return true;
	}

	// 주소 검증.
	public boolean isAddressValid(String address) {
		if(!new SinnakeValidate(address)
			.required()
			.getValidRes()) {

			return false;
		}
		
		return true;
	}
	
	// 상세주소 검증.
	public boolean isDetailAddressValid(String detailAddress) {
		if(!new SinnakeValidate(detailAddress)
			.required()
			.getValidRes()) {

			return false;
		}

		return true;
	}
}