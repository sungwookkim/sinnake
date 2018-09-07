package com.sinnake.spring.security.authenticationProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.sinnake.spring.security.userDetailDao.inter.SinnakeUserDetailDaoInterface;

/*
 * 로그인 공통 처리 클래스.
 */
public class SinnakeAuthenticationProvider extends DaoAuthenticationProvider {
	
	@Autowired SinnakeUserDetailDaoInterface sinnakeUserDetailDaoInterface;
	
	// 로그인 관련 사용자 정보 클래스.
	@Autowired
	@Qualifier("sinnakeUserDetailService")
	@Override	
	public void setUserDetailsService(UserDetailsService userDetailsService) {
		super.setUserDetailsService(userDetailsService);
	}

	// 로그인 시도 시 패스워드 비교 클래스.
	@Autowired
	@Qualifier("sinnakePasswordEncoder")
	@Override	
	public void setPasswordEncoder(Object passwordEncoder) {
		super.setPasswordEncoder(passwordEncoder);
	}
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		Authentication auth = null;
		
		try {
			auth = super.authenticate(authentication);
			sinnakeUserDetailDaoInterface.resetFailAttempts(authentication.getName());

			return auth;
		} catch(BadCredentialsException e) {
			sinnakeUserDetailDaoInterface.updateFailAttempts(authentication.getName());
			throw e;
		} catch(LockedException e) {
			throw new LockedException(e.getMessage());
		}
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return true;
	}

}
