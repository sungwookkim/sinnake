package com.sinnake.spring.security.userDetailDao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.security.authentication.LockedException;
import org.springframework.stereotype.Repository;

import com.sinnake.entity.UserInfo;
import com.sinnake.spring.db.inter.DbConfigInterface;
import com.sinnake.spring.security.userDetailDao.inter.SinnakeUserDetailDaoInterface;

@Repository
public class SinnakeUserDetailDaoImpl extends JdbcDaoSupport implements SinnakeUserDetailDaoInterface {	
	@Autowired DbConfigInterface dbConfig;
	          
	@Value("#{serverProp['sqlUsersUpdateLocked']}") String sqlUsersUpdateLocked;
	@Value("#{serverProp['sqlUsersCount']}") String sqlUsersCount;
	@Value("#{serverProp['sqlUserAttemptsGet']}") String sqlUserAttemptsGet;
	@Value("#{serverProp['sqlUserAttemptsInsert']}") String sqlUserAttemptsInsert;
	@Value("#{serverProp['sqlUserAttemptsUpdateAttempts']}") String sqlUserAttemptsUpdateAttempts;
	@Value("#{serverProp['sqlUserAttemptsResetAttempts']}") String sqlUserAttemptsResetAttempts;
	@Value("#{serverProp['maxAttempts']}") String maxAttempts;

	@PostConstruct
	private void initialize() throws Exception {
		setDataSource(dbConfig.connConfig());
	}
	
	@Override
	public void updateFailAttempts(String userName) {
		UserInfo userInfo = this.getUserAttempts(userName);
		
		if(userInfo == null) {
			if(this.isUserExists(userName)) {
				getJdbcTemplate().update(sqlUserAttemptsInsert, new Object[]{userName, 1, new Date()});
			}
		} else {
			if(this.isUserExists(userName)) {
				getJdbcTemplate().update(sqlUserAttemptsUpdateAttempts, new Object[]{new Date(), userName});
			}
			
			if(userInfo.getAttempts() + 1 >= Integer.parseInt(maxAttempts)) {
				getJdbcTemplate().update(sqlUsersUpdateLocked, new Object[]{false, userName});

				throw new LockedException("현재 계정은 잠금 상태 입니다.");
			}
		}
	}

	@Override
	public void resetFailAttempts(String userName) {
		getJdbcTemplate().update(sqlUserAttemptsResetAttempts, new Object[] {new Date(), userName});
	}

	@Override
	public UserInfo getUserAttempts(String userName) {
		UserInfo userInfo = null;

		try {
			 userInfo = getJdbcTemplate().queryForObject(sqlUserAttemptsGet,
				new Object[] {userName}, new RowMapper<UserInfo>() {
					public UserInfo mapRow(ResultSet rs, int rowNum) throws SQLException{
						UserInfo userInfo = new UserInfo();
						
						userInfo.setId(rs.getInt("id"));
						userInfo.setUserName(rs.getString("username"));
						userInfo.setAttempts(rs.getInt("attempts"));
						userInfo.setLastModified(rs.getDate("lastModified"));
						
						return userInfo;
					}
				});
			 
			 return userInfo;
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}
	
	/*
	 * TODO : Private 영역 시작
	 */
	private boolean isUserExists(String userName) {
		boolean result = false;

		int count = getJdbcTemplate().queryForObject(sqlUsersCount, new Object[]{userName}, Integer.class);
		
		if(count > 0) { result = true; }

		return result;
	}
}
