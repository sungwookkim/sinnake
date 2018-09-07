package com.sinnake.spring.prop;

import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

/*
 * 최상위 프로퍼티 파일 설정 클래스.
 */
@Configuration
public class PropConfig {
	private static String globalPropFile = "properties/properties.xml";
	
	@Bean
	public PropertiesFactoryBean globalProp() {
	    PropertiesFactoryBean bean = new PropertiesFactoryBean();	    
	    bean.setLocation(new ClassPathResource(globalPropFile));

	    return bean;
	}
}
