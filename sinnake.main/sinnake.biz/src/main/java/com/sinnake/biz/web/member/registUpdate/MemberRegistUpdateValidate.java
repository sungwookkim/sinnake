/**
 * 
 */
/**
 * @author sinnakeWEB
 *
 */
package com.sinnake.biz.web.member.registUpdate;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.sinnake.biz.entity.DefaultInfo;
import com.sinnake.biz.web.member.regist.MemberIdCheck;
import com.sinnake.biz.web.member.regist.MemberRegistValidate;
import com.sinnake.entity.UserInfo;
import com.sinnake.service.member.service.MemberService;
import com.sinnake.util.SinnakeAES256Util;

public class MemberRegistUpdateValidate extends MemberRegistValidate {
	public Map<String, Object> global_val = new HashMap<String, Object>();
	public MemberService memberService = null;
	public String pwKey = "";
	
	/***************/
	/* Constructor */
	/***************/
	public MemberRegistUpdateValidate() { super(); }
	
	public MemberRegistUpdateValidate(MemberService memberService, String pwKey) {
		super(memberService);
		
		this.memberService = memberService;
		this.pwKey = pwKey;
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

		// 비밀번호 검증.
		if(!this.pwdValidProc(this.global_val, req)) {
			return false;
		}

		// 비밀번호 확인 검증.
		if(!this.rePwdValidProc(this.global_val, req)) {
			return false;
		}
		
		// 이전 비밀번호 검증 프로세스.
		if(!this.pwdPrevValidProc(this.getDefaultInfo(), this.pwKey, this.global_val)) {
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
	
	// 비밀번호 검증 프로세스.
	@Override
	public boolean pwdValidProc(Map<String, Object> global_val, HttpServletRequest req) throws IOException {
		String memberPwd = req.getParameter("memberPwd");
		boolean rtnValid = false;
		
		// 비밀번호 검증.
		if(this.isPwdValid(memberPwd)) {
			rtnValid = true;
			global_val.put("memberPwd", memberPwd);
		} else {
			this.setRestResult_redirect("-1");
		}
		
		return rtnValid;				
	}
	
	// 비밀번호 확인 검증 프로세스.
	@Override
	public boolean rePwdValidProc(Map<String, Object> global_val, HttpServletRequest req) throws IOException {
		String memberRePwd = req.getParameter("memberRePwd");
		boolean rtnValid = false;
		
		// 비밀번호 검증.
		if(this.isRePwdValid(global_val, memberRePwd)) {
			rtnValid = true;
			global_val.put("memberRePwd", memberRePwd);
		} else {
			this.setRestResult_redirect("-2");
		}
		
		return rtnValid;				
	}
	
	// 이전 비밀번호 검증 프로세스.
	public boolean pwdPrevValidProc(DefaultInfo defualtInfo, String pwKey, Map<String, Object> global_val) throws Exception {
		boolean rtnValid = true;
		UserInfo userInfo = defualtInfo.getUserInfo();
		
		if(userInfo == null) {
			this.setRestResult_redirect("-3");
			rtnValid = false;
		}
		
		/* Chain 클래스를 상속 받았지만 아래와 같이 객체를 생성해서도 사용 가능 */
		HashMap<String, Object> memberInfo = new MemberIdCheck().getMemberId_DB(memberService, userInfo.getUserName());
		if(memberInfo.get("password").equals(new SinnakeAES256Util(pwKey).aesEncode(global_val.get("memberPwd").toString()))) {
			this.setRestResult_redirect("-4");
			rtnValid = false;
		}

		return rtnValid;				
	}
	
	// 우편번호 검증 프로세스.
	@Override
	public boolean postCodeValidProc(Map<String, Object> global_val, HttpServletRequest req) throws IOException {
		String postCode = req.getParameter("postCode");
		boolean rtnValid = false;
		
		// 우편번호 검증.
		if(this.isPostCodeValid(postCode)) {
			rtnValid = true;
			global_val.put("postCode", postCode);
		} else {
			this.setRestResult_redirect("-5");
		}
		
		return rtnValid;				
	}

	// 주소 검증 프로세스.
	@Override
	public boolean addressValidProc(Map<String, Object> global_val, HttpServletRequest req) throws IOException {
		String address = req.getParameter("address");
		boolean rtnValid = false;
		
		// 주소 검증.
		if(this.isAddressValid(address)) {
			rtnValid = true;
			global_val.put("address", address);
		} else {
			this.setRestResult_redirect("-6");
		}
		
		return rtnValid;				
	}
	
	// 상세주소 검증 프로세스.
	@Override
	public boolean detailAddressValidProc(Map<String, Object> global_val, HttpServletRequest req) throws IOException {
		String detailAddress = req.getParameter("detailAddress");
		boolean rtnValid = false;
		
		// 상세주소 검증.
		if(this.isDetailAddressValid(detailAddress)) {
			rtnValid = true;
			global_val.put("detailAddress", detailAddress);
		} else {
			this.setRestResult_redirect("-7");
		}
		
		return rtnValid;				
	}
	/**************/
	/* DB Process */
	/**************/

	/************/
	/* Validate */
	/************/

}