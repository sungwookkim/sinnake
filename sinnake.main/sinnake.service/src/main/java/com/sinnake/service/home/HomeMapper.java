package com.sinnake.service.home;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public interface HomeMapper {

	public ArrayList<HashMap<String, String>> getTotalCity(int id);
	public void setTotalCity(HashMap<String, Object> param);
	public void arrayList(ArrayList<Map<String, Object>> arrayParam);
}
