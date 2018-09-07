package com.sinnake.spring.security.userDetailDao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
import org.springframework.stereotype.Service;

import com.sinnake.spring.db.inter.DbConfigInterface;
import com.sinnake.entity.security.SinnakeUser;

/*
 * 로그인 관련 사용자 정보 클래스.
 */
@Service("sinnakeUserDetailService")
public class SinnakeUserDetailService extends JdbcDaoImpl {
	@Autowired DbConfigInterface dbConfig;
	
	@Value("#{serverProp['sqlUsersByUsernameQuery']}") String sqlUsersByUsernameQuery;
	@Value("#{serverProp['sqlAuthoritiesByUsernameQuery']}") String sqlAuthoritiesByUsernameQuery;
	
	@PostConstruct
	private void initialize() throws Exception {
		setDataSource(dbConfig.connConfig());
		this.setUsersByUsernameQuery(this.sqlUsersByUsernameQuery);
		this.setAuthoritiesByUsernameQuery(this.sqlAuthoritiesByUsernameQuery);
	}

	// 사용자 조회 쿼리 메소드 재정의.
	@Override
	public void setUsersByUsernameQuery(String usersByUsernameQueryString) {
		super.setUsersByUsernameQuery(this.sqlUsersByUsernameQuery);
	}
	
	// 사용자 룰 조회 쿼리 메소드 재정의.
	@Override
	public void setAuthoritiesByUsernameQuery(String queryString) {
		super.setAuthoritiesByUsernameQuery(this.sqlAuthoritiesByUsernameQuery);
	}
	
	// 사용자 정보 조회 메소드 재정의.
	@Override
	public List<UserDetails> loadUsersByUsername(String username) {
		return getJdbcTemplate().query(super.getUsersByUsernameQuery(), 
				new String[] { username }, new RowMapper<UserDetails>() {			
					@Override
					public UserDetails mapRow(ResultSet rs, int rowNum) throws SQLException {						
						String username = rs.getString("username");
						String password = rs.getString("password");
						boolean enabled = rs.getBoolean("enabled");
						boolean accountNonExpired = rs.getBoolean("accountNonExpired");
						boolean credentialsNonExpired = rs.getBoolean("credentialsNonExpired");
						boolean accountNonLocked = rs.getBoolean("accountNonLocked");
						int attempts = rs.getInt("attempts");
						Date lastmodified = rs.getTimestamp("lastmodified");
						
						return new SinnakeUser(username, password, enabled, accountNonExpired
								, credentialsNonExpired, accountNonLocked, attempts, lastmodified, AuthorityUtils.NO_AUTHORITIES);
					}
				});
	}
	
	// 로그인 성공 시 계정 정보 설정 메소드 재정의.
	@Override
	public UserDetails createUserDetails(String username, UserDetails userFromUserQuery, List<GrantedAuthority> combinedAuthorities) {
		SinnakeUser sinnakeUser = (SinnakeUser) userFromUserQuery;
		
		String returnUsername = sinnakeUser.getUsername();

		if (!super.isUsernameBasedPrimaryKey()) {
			returnUsername = username;
		}
		
		return new SinnakeUser(returnUsername, sinnakeUser.getPassword()
				, sinnakeUser.isEnabled(), sinnakeUser.isAccountNonExpired()
				, sinnakeUser.isCredentialsNonExpired(), sinnakeUser.isAccountNonLocked()
				, sinnakeUser.getAttempts(), sinnakeUser.getLastModified()
				, combinedAuthorities);
	}	
	
}
