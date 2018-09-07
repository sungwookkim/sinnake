package com.sinnake.spring.prop.db.impl;

import java.util.Map;

import org.owasp.esapi.codecs.Codec;
import org.owasp.esapi.codecs.MySQLCodec;
import org.owasp.esapi.codecs.MySQLCodec.Mode;

import com.sinnake.spring.prop.db.inter.DbInjectionEncode;
import com.sinnake.util.SinnakeHttpUtil;

/*
 * MSSQL Injection 처리 클래스.
 */
public class MySqlInjectionEncode implements DbInjectionEncode {
	Codec codec = new MySQLCodec(Mode.ANSI);

	public String encode(String params) {
		return SinnakeHttpUtil.encodeForSQL(codec, params);
	}
	
	public String[] encode(String[] params) {
		return SinnakeHttpUtil.encodeForSQL(codec, params);
	}
	
	public void encode(Map<String, Object> params) {
		SinnakeHttpUtil.encodeForSQL(codec, params);		
	}
	
	public Object encode(Object params) {
		return params;
	}

}
