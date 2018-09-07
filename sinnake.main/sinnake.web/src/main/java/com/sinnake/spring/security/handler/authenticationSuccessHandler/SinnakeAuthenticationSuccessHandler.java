package com.sinnake.spring.security.handler.authenticationSuccessHandler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.sinnake.biz.BizChainInit;
import com.sinnake.biz.entity.DefaultInfo;
import com.sinnake.biz.entity.ServletInfo;
import com.sinnake.biz.entity.ViewInfo;
import com.sinnake.biz.security.handler.successHandler.SuccessHandler;
import com.sinnake.common.login.inter.LoginInterface;

/*
 * 로그인 성공 시 처리 클래스.
 */
@Component
public class SinnakeAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	@Autowired LoginInterface loginImpl;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse resp,
			Authentication authentication) throws IOException, ServletException {

		/************************/
		/* View 관련 정보 설정. */
		/************************/
		ViewInfo viewInfo = new ViewInfo();

		/*****************************/
		/* 서버 객체 관련 정보 설정. */
		/*****************************/
		ServletInfo servletInfo = new ServletInfo();
		servletInfo.setReq(req);
		servletInfo.setRes(resp);

		/*******************/
		/* 내부 정보 설정. */
		/*******************/
		DefaultInfo defaultInfo = new DefaultInfo();
		defaultInfo.setUserInfo(loginImpl.getCurrentUser());
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();		
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);
		bizChainInit.setDefaultInfo(defaultInfo);

		try {
			
			bizChainInit
				// 로그인 성공 시 이동 관련 로직.
				.setNext(new SuccessHandler());

			bizChainInit.excute();

		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
}