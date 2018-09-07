package com.sinnake.biz.web.serverInfo.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sinnake.biz.BizChain;
import com.sinnake.biz.entity.ViewInfo;
import com.sinnake.entity.UserInfo;
import com.sinnake.service.member.service.MemberService;

public class SetUserDetailInfo extends BizChain {

	public MemberService memberService;
	public Map<String, Object> global_map = new HashMap<String, Object>();
	
	/***************/
	/* Constructor */
	/***************/
	public SetUserDetailInfo() { }
	
	public SetUserDetailInfo(MemberService memberService) {
		this.memberService = memberService;
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
		this.global_map = param;
		
		if(main()) {
			this.excuteNext(this.global_map);
		}		
	}

	/********/
	/* Main */
	/********/
	@Override
	public boolean main() throws Exception {
		UserInfo userInfo = this.getDefaultInfo().getUserInfo();
		ViewInfo viewInfo = this.getViewInfo();
		
		// 로그인 상세 정보 설정.
		this.setUserDetailInfo(userInfo, viewInfo, this.memberService, this.global_map);

		return true;
	}
	
	/***********/
	/* Process */
	/***********/
	// 로그인 상세 정보 설정.
	public boolean setUserDetailInfo(UserInfo userInfo, ViewInfo viewInfo, MemberService memberService, Map<String, Object>global_map) throws Exception {
		String memberId = userInfo.getUserName();
		HashMap<String, Object> detailInfo = this.getUserDetailInfo_DB(memberService, memberId);
		
		if(detailInfo.isEmpty()) {
			global_map.put("resCode", "-2");
		} else {
			global_map.put("id", memberId);
			global_map.put("postCode", detailInfo.get("postCode"));			
			global_map.put("address", detailInfo.get("address"));
			global_map.put("detail_address", detailInfo.get("detail_address"));
		}

		viewInfo.setViewName(new ObjectMapper().writeValueAsString(global_map));

		return true;
	}
	
	/**************/
	/* DB Process */
	/**************/
	// 회원 상세 조회 DB 작업.
	public HashMap<String, Object> getUserDetailInfo_DB(MemberService memberService, String memberId) throws Exception {
		HashMap<String, Object> rtn = memberService.getMemberDetail(memberId);
		
		if(rtn == null || rtn.isEmpty()) {
			rtn = new HashMap<String, Object>();
		}
		
		return rtn;
	}
	
	/************/
	/* Validate */
	/************/

}
