/**
 * 
 */
/**
 * @author sinnakeWEB
 *
 */
package com.sinnake.spring.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.sinnake.spring.security.authenticationEntryPoint.SinnakeAuthenticationEntryPoint;
import com.sinnake.spring.security.handler.accessDeniedHandler.SinnakeAccessDeniedHandler;
import com.sinnake.spring.security.handler.authenticationFailureHandler.SinnakeAuthenticationFailureHandler;
import com.sinnake.spring.security.handler.authenticationSuccessHandler.SinnakeAuthenticationSuccessHandler;
import com.sinnake.spring.security.handler.logoutSuccessHandler.SinnakeLogoutSuccessHandler;

@SuppressWarnings("deprecation")
@Configuration
@EnableWebMvcSecurity
public class SinnakeSecurity extends WebSecurityConfigurerAdapter {

	// 로그인 공통 처리 클래스
	@Autowired
	@Qualifier("sinnakeAuthenticationProvider")
	AuthenticationProvider sinnakeAuthenticationProvider;	
	// 비 로그인 시 페이지 접근 예외 처리 클래스
	@Autowired SinnakeAuthenticationEntryPoint sinnakeAuthenticationEntryPoint;
	// 로그인 후 페이지 접근 권한 예외 처리 클래스.
	@Autowired SinnakeAccessDeniedHandler sinnakeAccessDeniedHandler;
	// 로그인 시도 실패 예외 처리 클래스.
	@Autowired SinnakeAuthenticationFailureHandler sinnakeAuthenticationFailureHandler;
	// 로그아웃 시 후처리 클래스.	
	@Autowired SinnakeLogoutSuccessHandler sinnakeLogoutSuccessHandler;
	// 로그인 성공 시 처리 클래스.
	@Autowired SinnakeAuthenticationSuccessHandler sinnakeAuthenticationSuccessHandler;
	
	@Value("#{serverProp['usernameParameter']}") String usernameParam;
	@Value("#{serverProp['passwordParameter']}") String passwordParam;

	@Autowired
	public void configGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(sinnakeAuthenticationProvider);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.exceptionHandling()
			.accessDeniedHandler(sinnakeAccessDeniedHandler)
			.authenticationEntryPoint(sinnakeAuthenticationEntryPoint);

		http.sessionManagement()
			.sessionFixation().migrateSession();

		http
			.authorizeRequests()
			//.antMatchers("/main").access("hasRole('ROLE_ADMIN')")
			.antMatchers("/json").access("hasRole('ROLE_ADMIN')")
			.antMatchers("/member/registUpdate").access("hasRole('ROLE_USER')")
			.anyRequest().permitAll()
			.and()
				.formLogin().loginPage("/member/login")
					.successHandler(sinnakeAuthenticationSuccessHandler)					
					.failureHandler(sinnakeAuthenticationFailureHandler)
				.usernameParameter(usernameParam).passwordParameter(passwordParam)
			.and()
				.logout()
				.deleteCookies("JSESSIONID")
				.clearAuthentication(true)
				.logoutRequestMatcher(new AntPathRequestMatcher("/member/logout")) // GET방식으로 로그아웃을 하기 위한 메소드.
				/*.logoutUrl("/member/logout") //해당 메소드를 사용해서 로그아웃을 하기 위해서는 POST형식으로 해야 한다.*/
				.logoutSuccessHandler(sinnakeLogoutSuccessHandler)			
			.and().csrf();				
	}
}