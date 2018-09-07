package com.sinnake.spring.db.type;

import java.util.Properties;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
import org.springframework.stereotype.Component;

import com.sinnake.spring.db.inter.DbConfigInterface;
import com.sinnake.util.SinnakeAES256Util;

/*
 * MsSQL 접속 정보 클래스.
 */
@Configuration
@Component("dbConfig")
public class MysqlConfig implements DbConfigInterface {
	@Value("#{dbProp['db.mysql.username']}") String userName;
	@Value("#{dbProp['db.mysql.url']}") String url;
	@Value("#{dbProp['db.mysql.password']}") String password;
	@Value("#{serverProp['dbAes256.key']}") String dbKey;
	
	public DataSource connConfig() throws Exception {
		SinnakeAES256Util aes256 = new SinnakeAES256Util(dbKey);

		Properties connectionProperties = new Properties(); 
		connectionProperties.put("autoCommit", "false");
		
        SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
        dataSource.setDriverClass(com.mysql.jdbc.Driver.class);
        dataSource.setUsername(aes256.aesDecode(userName));
        dataSource.setUrl(aes256.aesDecode(url));
        dataSource.setPassword(aes256.aesDecode(password));
        dataSource.setConnectionProperties(connectionProperties);

        return dataSource;
	}
}
