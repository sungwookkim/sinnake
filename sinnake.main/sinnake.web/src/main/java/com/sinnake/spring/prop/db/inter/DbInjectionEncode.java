package com.sinnake.spring.prop.db.inter;

import java.util.Map;

public interface DbInjectionEncode {

	public String encode(String params);
	public String[] encode(String[] params);
	public void encode(Map<String, Object> params);
	public Object encode(Object params);
}
