package com.sinnake.spring.aop;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@EnableAspectJAutoProxy
public class AOPConfig {

    // declare the aspect itself as a bean
    @Bean
    public SinnakeAOP sinnakeAOP() {
        return new SinnakeAOP();
    }
}
