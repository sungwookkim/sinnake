package com.sinnake.spring;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

import com.sinnake.spring.interceptor.SinnakeLocaleChangeInterceptor;

@EnableWebMvc 	// <mvc:annotation-driven />
@Configuration
@ComponentScan("com.sinnake")	// <context:component-scan base-package="com.cls.sinnake,com.spring.Exception,com.util" />
public class SpringWebConfig extends WebMvcConfigurerAdapter {
	@Value("#{serverProp['webConfig.msgSource.basenames']}") String webConfigMsgSoruceBasenames;
	@Value("#{serverProp['webConfig.ir_viewResolver.prefix']}") String viewResolverPrefix;
	@Value("#{serverProp['webConfig.ir_viewResolver.suffix']}") String viewResolverSuffix;
	@Value("#{globalProp['locale.propertie']}") String globalLocale;	
	@Value("#{globalProp['type.propertie']}") String serverType;
	@Value("#{globalProp['devPropFile.propertie']}") String devPropFilePath;

	/* <resources mapping="/resources/**" location="/resources/" /> */
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
		registry.addResourceHandler("/favicon.ico").addResourceLocations("/resources/favicon.icon");
	}
	
	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		converters.add(new StringHttpMessageConverter(Charset.forName("UTF-8")));
		converters.add(new MappingJackson2HttpMessageConverter());
	}
	
	/*
	<beans:bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<beans:property name="prefix" value="/WEB-INF/views/" />
		<beans:property name="suffix" value=".jsp" />
	</beans:bean>
	 */
	@Bean
	public InternalResourceViewResolver internalResourceViewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		
		viewResolver.setViewClass(JstlView.class);
		viewResolver.setPrefix(viewResolverPrefix);
		viewResolver.setSuffix(viewResolverSuffix);
		
		return viewResolver;
	}
	
	/*
	<beans:bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping">
	    <beans:property name="order" value="0"/>      
	</beans:bean>
	 */
	@Bean
	public RequestMappingHandlerMapping reqMapping() {
		RequestMappingHandlerMapping reqMapping = new RequestMappingHandlerMapping();
		reqMapping.setOrder(0);
		
		return reqMapping;
	}
	
	/*
	<bean id="localeResolver" class="org.springframework.web.servlet.i18n.SessionLocaleResolver">
		<property name="defaultLocale" value="ko" />
	</bean>
	*/		
    @Bean
    public SessionLocaleResolver localeResolver() {
    	SessionLocaleResolver sessionLocaleResolver = new SessionLocaleResolver();
    	sessionLocaleResolver.setDefaultLocale(new Locale(globalLocale));
    	
    	return sessionLocaleResolver;
    }
    
    /*
	    <beans:bean id="localeChangeInterceptor" class="org.springframework.web.servlet.i18n.LocaleChangeInterceptor">
	    	<beans:property name="paramName" value="lang" />
	    </beans:bean> 
     */
    @Bean
    public LocaleChangeInterceptor localeChangeInterceptor() {
    	LocaleChangeInterceptor localeChangeInterceptor = new SinnakeLocaleChangeInterceptor();
    	localeChangeInterceptor.setParamName("lang");
    	
    	return localeChangeInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
    	registry.addInterceptor(localeChangeInterceptor());

    	super.addInterceptors(registry);
    }
    /*
	<bean id="messageSource" class="org.springframework.context.support.ReloadableResourceBundleMessageSource">
	    <property name="basenames">
	        <list>
	            <value>File Path</value>
	        </list>
	    </property>
		<property name="useCodeAsDefaultMessage">
			<value>true</value>
		</property>	    
	    <property name="defaultEncoding" value="UTF-8"/>
	    <property name="cacheSeconds" value="0"/>
	</bean>
     */
    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();        
        messageSource.setBasenames(webConfigMsgSoruceBasenames, devPropFilePath.replace("${serverType}", serverType));
        messageSource.setUseCodeAsDefaultMessage(true);	
        messageSource.setDefaultEncoding("UTF-8");
        // # -1 : never reload, 0 always reload
        messageSource.setCacheSeconds(0);
        return messageSource;
    }

	/*
	<listener>
	    <listener-class>
	      org.springframework.security.web.session.HttpSessionEventPublisher
	    </listener-class>
	</listener> 
	 */
/*    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
    	return new HttpSessionEventPublisher();
    }*/
}
