package com.sinnake.spring.exception;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.web.csrf.InvalidCsrfTokenException;
import org.springframework.security.web.csrf.MissingCsrfTokenException;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.sinnake.biz.BizChainInit;
import com.sinnake.biz.entity.ServletInfo;
import com.sinnake.biz.entity.ViewInfo;
import com.sinnake.biz.exceptions.accessDenied.accessDeniedChangeUrl;
import com.sinnake.biz.exceptions.accountExpired.AccountExpiredChangeUrl;
import com.sinnake.biz.exceptions.badCredentials.BadCredentialsChangeUrl;
import com.sinnake.biz.exceptions.credentialsExpired.CredentialsExpiredChangeUrl;
import com.sinnake.biz.exceptions.disabled.DisabledChangeUrl;
import com.sinnake.biz.exceptions.insufficientAuth.InsufficientAuthChangeUrl;
import com.sinnake.biz.exceptions.invalidCsrfToken.InvalidCsrfTokenChangeUrl;
import com.sinnake.biz.exceptions.locked.lockedChangeUrl;
import com.sinnake.biz.exceptions.missingCsrfToken.MissingCsrfTokenChangeUrl;
import com.sinnake.biz.exceptions.noHandlerFound.noHandlerFoundChangeUrl;
import com.sinnake.biz.exceptions.sinnakeAuthentication.SinnakeAuthentication;
import com.sinnake.service.exception.service.ExceptionService;
import com.sinnake.spring.security.common.SinnakeAuthenticationException;

/*
 * Exceptions 처리 Controller 클래스.
 */
@ControllerAdvice
public class Exceptions {
	@Autowired ExceptionService exceptionService;
	
	@ExceptionHandler({
		BadSqlGrammarException.class
		, Exception.class
		, ServletException.class})
	public void exception(HttpServletRequest req, HttpServletResponse resp, Exception e) throws Exception {
        ByteArrayOutputStream bout = new ByteArrayOutputStream();
        e.printStackTrace(new PrintStream(bout));
        bout.flush();
        
        exceptionService.setError(new String(bout.toByteArray()), req);
        
        new BizChainInit().setRestResult_redirect("-10000", "/error/exception", req, resp);
	}
	
	@ExceptionHandler(NoHandlerFoundException.class)
	public String noHandlerFoundException(NoHandlerFoundException e, HttpServletRequest req, HttpServletResponse resp,Model model) throws Exception {
		exceptionService.setError(e.getLocalizedMessage(), req);

		/************************/
		/* View 관련 정보 설정. */
		/************************/
		ViewInfo viewInfo = new ViewInfo();
		viewInfo.setModel(model);

		/*****************************/
		/* 서버 객체 관련 정보 설정. */
		/*****************************/
		ServletInfo servletInfo = new ServletInfo();
		servletInfo.setReq(req);
		servletInfo.setRes(resp);

		/*******************/
		/* 내부 정보 설정. */
		/*******************/
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();		
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);

		bizChainInit
			// 에러 페이지 이동 혹은 응답 값 반환.
			.setNext(new noHandlerFoundChangeUrl("-10001"));

		bizChainInit.excute();
		
		return viewInfo.getViewName();
	}
		
	@ExceptionHandler(AccessDeniedException.class)
	public void accessDeniedException(AccessDeniedException e, HttpServletRequest req, HttpServletResponse resp) throws Exception {			
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
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();		
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);

		bizChainInit
			// 권한 에러 시 이전 페이지 및 응답 값 반환.
			.setNext(new accessDeniedChangeUrl("-0002"));

		bizChainInit.excute();
	}
	
	@ExceptionHandler(BadCredentialsException.class)
	public void badCredentialsException(BadCredentialsException e, HttpServletRequest req, HttpServletResponse resp, Model model) throws Exception {
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
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();		
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);

		bizChainInit
			// 이전 페이지로 이동.
			.setNext(new BadCredentialsChangeUrl("-0001"));

		bizChainInit.excute();
	}
	
	@ExceptionHandler(LockedException.class)
	public void lockedException(LockedException e, HttpServletRequest req, HttpServletResponse resp) throws Exception {
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
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();		
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);

		bizChainInit
			// 이전 페이지로 이동.
			.setNext(new lockedChangeUrl("-0000"));

		bizChainInit.excute();
	}
	
	@ExceptionHandler(DisabledException.class)
	public void disabledException(DisabledException e, HttpServletRequest req, HttpServletResponse resp) throws Exception {
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
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();		
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);

		bizChainInit
			// 이전 페이지로 이동.
			.setNext(new DisabledChangeUrl("-0003"));

		bizChainInit.excute();
	}
	
	@ExceptionHandler(AccountExpiredException.class)
	public void accountExpiredException(AccountExpiredException e, HttpServletRequest req, HttpServletResponse resp) throws Exception {
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
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();		
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);

		bizChainInit
			// 이전 페이지로 이동.
			.setNext(new AccountExpiredChangeUrl("-0004"));

		bizChainInit.excute();
	}

	@ExceptionHandler(CredentialsExpiredException.class)
	public void credentialsExpiredException(CredentialsExpiredException e, HttpServletRequest req, HttpServletResponse resp) throws Exception {
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
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();		
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);

		bizChainInit
			// 이전 페이지로 이동.
			.setNext(new CredentialsExpiredChangeUrl("-0005"));

		bizChainInit.excute();
	}

	@ExceptionHandler(MissingCsrfTokenException.class)
	public void missingCsrfTokenException(CredentialsExpiredException e, HttpServletRequest req, HttpServletResponse resp) throws Exception {
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
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();		
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);

		bizChainInit
			// 이전 페이지로 이동.
			.setNext(new MissingCsrfTokenChangeUrl("-0006"));

		bizChainInit.excute();
	}

	@ExceptionHandler(InsufficientAuthenticationException.class)
	public void InsufficientAuthenticationException(InsufficientAuthenticationException e, HttpServletRequest req, HttpServletResponse resp) throws Exception {
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
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();		
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);

		bizChainInit
			// 이전 페이지로 이동.
			.setNext(new InsufficientAuthChangeUrl("-0007"));

		bizChainInit.excute();
	}

	@ExceptionHandler(InvalidCsrfTokenException.class)
	public void InvalidCsrfTokenException(InvalidCsrfTokenException e, HttpServletRequest req, HttpServletResponse resp) throws Exception {
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
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();		
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);

		bizChainInit
			// 이전 페이지로 이동.
			.setNext(new InvalidCsrfTokenChangeUrl("-0008"));

		bizChainInit.excute();
	}
	
	@ExceptionHandler(SinnakeAuthenticationException.class)
	public void sinnakeAuthenticationException(SinnakeAuthenticationException e, HttpServletRequest req, HttpServletResponse resp) throws Exception {
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
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();		
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);

		bizChainInit
			// 이전 페이지로 이동.
			.setNext(new SinnakeAuthentication("-9999"));

		bizChainInit.excute();
	}
}
