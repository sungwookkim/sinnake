package com.sinnake.biz.web.serverInfo.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sinnake.biz.BizChain;
import com.sinnake.entity.UserInfo;

public class UserInfoValidate extends BizChain {
	public Map<String, Object> global_map = new HashMap<String, Object>();
	
	/***************/
	/* Constructor */
	/***************/
	public UserInfoValidate() {	}
	
	/**********/
	/* Excute */
	/**********/
	@Override
	public void excute() throws Exception {
		if(main()) {
			this.excuteNext(this.global_map);
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
		UserInfo userInfo = this.getDefaultInfo().getUserInfo();
		
		// 로그인 존재 여부 프로세스.
		if(this.isUserInfo_proc(userInfo, this.global_map)) {
			this.getViewInfo().setViewName(new ObjectMapper().writeValueAsString(this.global_map));
			return false;
		}

		return true;
	}
	
	/***********/
	/* Process */
	/***********/
	// 로그인 존재 여부 프로세스.
	public boolean isUserInfo_proc(UserInfo userInfo, Map<String, Object>global_map) {
		if(!this.isUserInfo(userInfo)) {
			global_map.put("resCode", "-1");

			return true;
		}
		
		global_map.put("resCode", "0");

		return false;
	}
	
	/**************/
	/* DB Process */
	/**************/
	
	/************/
	/* Validate */
	/************/
	// 로그인 정보 값 확인.
	public boolean isUserInfo(UserInfo userInfo) {
		if(userInfo == null) {
			return false;
		}
		
		return true;
	}

}
