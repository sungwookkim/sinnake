package com.sinnake.biz.web.serverInfo.user;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sinnake.biz.BizChain;
import com.sinnake.biz.entity.ViewInfo;
import com.sinnake.entity.UserInfo;

public class SetUserInfo extends BizChain {	
	public Map<String, Object> global_map = new HashMap<String, Object>();
	
	/***************/
	/* Constructor */
	/***************/
	public SetUserInfo() { }
	
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
		
		// 로그인 정보 설정.
		this.setUserInfo(userInfo, viewInfo, this.global_map);

		return true;
	}
	
	/***********/
	/* Process */
	/***********/
	// 로그인 정보 설정.
	public boolean setUserInfo(UserInfo userInfo, ViewInfo viewInfo, Map<String, Object>global_map) throws JsonProcessingException {
		global_map.put("id", userInfo.getUserName());
		global_map.put("lastLoginTime", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(userInfo.getLastModified()));
		
		viewInfo.setViewName(new ObjectMapper().writeValueAsString(global_map));

		return true;
	}
	
	/**************/
	/* DB Process */
	/**************/
	
	/************/
	/* Validate */
	/************/

}
