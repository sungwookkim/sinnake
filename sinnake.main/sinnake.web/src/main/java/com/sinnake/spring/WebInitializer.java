package com.sinnake.spring;

import java.util.EnumSet;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;
import javax.servlet.SessionTrackingMode;

import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import com.sinnake.spring.aop.AOPConfig;
import com.sinnake.common.login.LoginImpl;
import com.sinnake.spring.db.DBConfig;
import com.sinnake.spring.db.type.MysqlConfig;
import com.sinnake.spring.filter.SinnakeRequestFilter;
import com.sinnake.spring.prop.PropConfig;
import com.sinnake.spring.prop.db.DbPropConfig;
import com.sinnake.spring.prop.server.ServerPropConfig;
import com.sinnake.spring.security.SinnakePasswordEncoder;
import com.sinnake.spring.security.SinnakeSecurity;
import com.sinnake.spring.security.handler.accessDeniedHandler.SinnakeAccessDeniedHandler;
import com.sinnake.spring.security.handler.authenticationFailureHandler.SinnakeAuthenticationFailureHandler;
import com.sinnake.spring.security.handler.authenticationSuccessHandler.SinnakeAuthenticationSuccessHandler;
import com.sinnake.spring.security.handler.logoutSuccessHandler.SinnakeLogoutSuccessHandler;
import com.sinnake.spring.security.authenticationEntryPoint.SinnakeAuthenticationEntryPoint;
import com.sinnake.spring.security.authenticationProvider.SinnakeAuthenticationProvider;
import com.sinnake.spring.security.userDetailDao.SinnakeUserDetailService;
import com.sinnake.spring.security.userDetailDao.impl.SinnakeUserDetailDaoImpl;


public class WebInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
	
	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class[] {
			PropConfig.class							// 최상위 프로퍼티 파일 설정.
			, ServerPropConfig.class					// 서버 프로퍼티 파일 설정. 
			, DbPropConfig.class						// DB 프로퍼티 파일 설정.			
			, MysqlConfig.class							// MsSQL 접속 정보 클래스.
			, DBConfig.class							// DB 설정 클래스.
			, LoginImpl.class							// 로그인 관련 계정 정보 클래스.
			, SinnakePasswordEncoder.class				// 패스워드 인코딩 클래스.
			, SinnakeUserDetailDaoImpl.class			// 로그인 시 제한 조건 확인 클래스.
			, SinnakeUserDetailService.class			// 로그인 시 계정 정보 반환 클래스.
			, SinnakeAuthenticationEntryPoint.class		// 비 로그인 시 페이지 접근 예외 처리 클래스.
			, SinnakeAccessDeniedHandler.class			// 로그인 후 페이지 접근 권한 예외 처리 클래스.
			, SinnakeAuthenticationFailureHandler.class	// 로그인 시도 실패 예외 처리 클래스.
			, SinnakeAuthenticationSuccessHandler.class	// 로그인 성공 시 처리 클래스.
			, SinnakeAuthenticationProvider.class		// 로그인 시도 공통 처리 클래스.
			, SinnakeSecurity.class						// Spring Security 클래스.
			, SinnakeLogoutSuccessHandler.class			// 로그아웃 시 후처리 클래스.
			, SpringRootConfig.class					// Spring Root Config 클래스.
		};
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class[] {
			SpringWebConfig.class	// Spring Config 클래스.
			, AOPConfig.class		// AOP 클래스.
		};
	}

	@Override
	protected String[] getServletMappings() {
		return new String[] { "/" };
	}

	@Override
    public void onStartup(ServletContext servletContext) throws ServletException {
		/*
		<filter>	 
			<filter-name>Set Character Encoding</filter-name>
			<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
			<init-param>
				<param-name>encoding</param-name>
				<param-value>utf-8</param-value>
			</init-param>
		</filter>
	
		<filter-mapping>
			<filter-name>Set Character Encoding</filter-name>
			<url-pattern>/*</url-pattern>
		</filter-mapping>
		*/
		CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);
        FilterRegistration.Dynamic characterEncoding = servletContext.addFilter("characterEncodingFilter", characterEncodingFilter);
        characterEncoding.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");
        
		/*
		<filter>	 
			<filter-name>sinnakeReqFilter</filter-name>
			<filter-class>com.spring.filter.SinnakeRequestFilter</filter-class>
		</filter>
	
		<filter-mapping>
			<filter-name>sinnakeReqFilter</filter-name>
			<url-pattern>/*</url-pattern>
		</filter-mapping>
		*/        
        SinnakeRequestFilter sinnakeReqFilter = new SinnakeRequestFilter();
        FilterRegistration.Dynamic reqFilter = servletContext.addFilter("sinnakeReqFilter", sinnakeReqFilter);
        reqFilter.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");

        /*
        <filter> 
        	<filter-name>springSecurityFilterChain</filter-name> 
        	<filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class> 
    	</filter> 
    	
    	<filter-mapping> 
    		<filter-name>springSecurityFilterChain</filter-name> 
    		<url-pattern>/*</url-pattern> 
		</filter-mapping>
        */

        DelegatingFilterProxy proxy = new DelegatingFilterProxy();
        reqFilter = servletContext.addFilter("springSecurityFilterChain", proxy);
        reqFilter.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");
        
        /*
       	Servlet 3.0부터 적용되는 사항.
       	url에 jessionid 추가를 비활성화 하는 설정.
		<session-config>
     		<tracking-mode>COOKIE</tracking-mode>
		</session-config>
         */
        servletContext.setSessionTrackingModes(EnumSet.of(SessionTrackingMode.COOKIE));

        super.onStartup(servletContext);
	}
	
	/*
    <init-param>
        <param-name>throwExceptionIfNoHandlerFound</param-name>
        <param-value>true</param-value>
    </init-param>
	 */	
	@Override
	protected void customizeRegistration(ServletRegistration.Dynamic registration) {
        registration.setInitParameter("throwExceptionIfNoHandlerFound", "true");
    }

}
