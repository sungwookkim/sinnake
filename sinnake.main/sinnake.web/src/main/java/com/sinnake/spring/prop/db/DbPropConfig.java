package com.sinnake.spring.prop.db;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.sinnake.spring.prop.db.impl.MySqlInjectionEncode;
import com.sinnake.spring.prop.db.impl.OracleInjectionEncode;
import com.sinnake.spring.prop.db.inter.DbInjectionEncode;

/*
 * DB 프로퍼티 파일 설정 클래스.
 */
@Configuration
@Component("dbPropConfig")
public class DbPropConfig {	

	@Value("#{globalProp['dbPropFile.propertie']}") String propFile;
	@Value("#{globalProp['type.propertie']}") String serverType;
	@Value("#{globalProp['dbType.propertie']}") String serverDb;
		
	@Bean
	public PropertiesFactoryBean dbProp() {
		PropertiesFactoryBean bean = new PropertiesFactoryBean();
		bean.setLocation(new ClassPathResource(propFile.replace("${serverType}", serverType).replace("${serverDb}", serverDb)));
		
		return bean;
	}
	
	// DB별 Injection 처리 클래스 반환 메소드.
	@Bean
	public DbInjectionEncode dbInjectionEncode() {
		if("mysql".equals(serverDb)) {
			return new MySqlInjectionEncode();
		} else if("oracle".equals(serverDb)) {
			return new OracleInjectionEncode();
		}
		
		return null;
	}
}
