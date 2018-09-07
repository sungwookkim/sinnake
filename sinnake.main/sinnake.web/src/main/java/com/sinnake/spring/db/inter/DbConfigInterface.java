package com.sinnake.spring.db.inter;

import javax.sql.DataSource;

public interface DbConfigInterface {
	public DataSource connConfig() throws Exception;
}
