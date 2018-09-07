package com.sinnake.spring.security.userDetailDao.inter;

import com.sinnake.entity.UserInfo;

public interface SinnakeUserDetailDaoInterface {
	void updateFailAttempts(String userName);
	void resetFailAttempts(String userName);
	UserInfo getUserAttempts(String userName);
}
