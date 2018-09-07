package com.sinnake.service.common.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sinnake.service.common.CommonMapper;

@Service(value = "commonService")
public class CommonService {
/*	
	@Autowired CommonMapper commonMapper;
	
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void setError(HashMap<String, Object> param) throws Exception {
		commonMapper.setError(param);
	}
	*/
}
