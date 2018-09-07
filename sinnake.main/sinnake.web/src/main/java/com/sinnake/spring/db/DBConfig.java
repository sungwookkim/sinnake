package com.sinnake.spring.db;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.sinnake.spring.db.inter.DbConfigInterface;

import net.sf.log4jdbc.Log4jdbcProxyDataSource;

/*
 * DB 설정 클래스
 */
@Configuration
@EnableTransactionManagement 
@MapperScan("com.sinnake.service.**")
public class DBConfig {

	@Value("#{dbProp['db.sqlSessionFactoryBean.mapperLocations']}") String mapperLocations;
	@Autowired DbConfigInterface dbConfig;

	@Bean
    public DataSource dataSource() throws Exception {
    	DataSource dataSource = dbConfig.connConfig();

        return dataSource;
    }
    
    /*
	<bean id="dataSource" class="net.sf.log4jdbc.Log4jdbcProxyDataSource">
		<constructor-arg ref="dataSourceSpied" />
	</bean>
     */
    @Bean
    public DataSource log4jdbcDataSource(DataSource datasource) {    	
    	return new Log4jdbcProxyDataSource(datasource);
    }
	
    @Bean
    public PlatformTransactionManager txManager() throws Exception {
        return new DataSourceTransactionManager(log4jdbcDataSource(dataSource()));
    }
    
    @Bean
    public SqlSessionFactoryBean sqlSessionFactoryBean() throws Exception {		
    	SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();

        sessionFactory.setDataSource(log4jdbcDataSource(dataSource()));
        sessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources(mapperLocations));
        
        return sessionFactory;
    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
