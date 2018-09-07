package com.sinnake.common.login;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.sinnake.common.login.inter.LoginInterface;
import com.sinnake.entity.UserInfo;
import com.sinnake.entity.security.SinnakeUser;

/*
 * 계정 정보 조회 클래스.
 */
@Configuration
@Component("loginImpl")
public class LoginImpl implements LoginInterface {

	@Override
	public UserInfo getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if(authentication == null) { return null; }
		
		if(authentication.getPrincipal() instanceof String) {
			return null;
		}

		SinnakeUser sinnakeUser = (SinnakeUser)authentication.getPrincipal();
		Collection<GrantedAuthority> authorities = sinnakeUser.getAuthorities();

		ArrayList<String> roles = new ArrayList<String>();
		for(GrantedAuthority grantedAuthority : authorities) {
			roles.add(grantedAuthority.getAuthority());
		}

		UserInfo userInfo = new UserInfo();
		userInfo.setAttempts(sinnakeUser.getAttempts());
		userInfo.setLastModified(sinnakeUser.getLastModified());
		userInfo.setUserName(sinnakeUser.getUsername());
		userInfo.setPassword(sinnakeUser.getPassword());
		userInfo.setRoles(roles);
		userInfo.setAccountNonExpired(sinnakeUser.isAccountNonExpired());
		userInfo.setAccountNonLocked(sinnakeUser.isAccountNonLocked());
		userInfo.setCredentialsNonExpired(sinnakeUser.isCredentialsNonExpired());
		userInfo.setEnabled(sinnakeUser.isEnabled());
		
		return userInfo;
	}

}
