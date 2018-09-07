package com.sinnake.spring.aop;

import java.util.List;
import java.util.Map;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;

import com.sinnake.spring.prop.db.DbPropConfig;
import com.sinnake.spring.prop.db.inter.DbInjectionEncode;

@Aspect
@SuppressWarnings("unchecked")
public class SinnakeAOP {
	@Autowired DbPropConfig dbPropConfig;
	
	@Around("execution(* com.sinnake.controller..web..*Controller.*(..))")
	public Object controllerAop(ProceedingJoinPoint  joinPoint) throws Throwable {
		return joinPoint.proceed();
	}
	
	@Around("execution(* com.sinnake.service..service..*Service.*(..))")
	public Object serviceAop(ProceedingJoinPoint  joinPoint) throws Throwable {
		Object[] args = joinPoint.getArgs();
		DbInjectionEncode dbInjectionEncode = dbPropConfig.dbInjectionEncode();

		// Sql Injection 체크.
		if(dbInjectionEncode != null) {
			for(int i = 0, len = args.length; i < len; i++) {
				if(args[i] instanceof Map) {
					dbInjectionEncode.encode((Map<String, Object>)args[i]);
				} else if(args[i] instanceof String) {
					args[i] = dbInjectionEncode.encode((String)args[i]);
				} else if(args[i] instanceof List) {
					List<Object> values = (List<Object>) args[i];
					for(int j = 0, jLen = values.size(); i < jLen; i++) {						
						Object value = values.get(j);
						
						if(value instanceof Map) {
							dbInjectionEncode.encode((Map<String, Object>)value);
						}
					}
				} else {
					args[i] = dbInjectionEncode.encode(args[i]);
				}
			}			
		}

		return joinPoint.proceed(args);
	}	
}
