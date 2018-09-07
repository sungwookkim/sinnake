package com.sinnake.spring.prop.server;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

/*
 * 서버 프로퍼티 파일 설정 클래스.
 */
@Configuration
public class ServerPropConfig {

	@Value("#{globalProp['serverPropFile.propertie']}") String propFile;
	@Value("#{globalProp['type.propertie']}") String serverType;
	
	@Bean
	public PropertiesFactoryBean serverProp() {
		PropertiesFactoryBean bean = new PropertiesFactoryBean();
		bean.setLocation(new ClassPathResource(propFile.replace("${serverType}", serverType)));
		
		return bean;
	}
}
