package com.sinnake.service.home.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sinnake.service.home.HomeMapper;

@Service(value = "homeService")
public class HomeService  {

	@Autowired HomeMapper homeMapper;
	
	public ArrayList<HashMap<String, String>> getTotalCity(int id) {
		return homeMapper.getTotalCity(id);
	}
	
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void setTotalCity(String name, String countryCode, String district, int population) throws Exception {
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("name", "sungwkim1");
		param.put("countryCode", countryCode);
		param.put("district", district);
		param.put("population", population);		
		homeMapper.setTotalCity(param);
		
		setTotalCity();
		
	}
	
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void setTotalCity() throws Exception {
		HashMap<String, Object> param1 = new HashMap<String, Object>();
		param1.put("name", "sungwkim2");
		param1.put("countryCode", "test");		
		param1.put("population", "test");
		homeMapper.setTotalCity(param1);		
	}
	
	public void arrayList(ArrayList<Map<String, Object>> arrayParam) {
		for(Map<String, Object> value : arrayParam) {
			Iterator<String> ite = value.keySet().iterator();
			while(ite.hasNext()) {
				String key = ite.next();
				System.out.println(key + " ::::::::::::::::::::::::::::::::::: " + value.get(key));
			}
		}
	}
}
