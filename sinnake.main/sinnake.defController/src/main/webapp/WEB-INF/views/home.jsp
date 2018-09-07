<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
	<title>Home</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<sec:csrfMetaTags/>
	<script type="text/javascript" src="/resources/js/config/requireConfig.js"></script>
	<script type="text/javascript" data-main="controller/homeController" src="/resources/js/lib/require/require.js"></script>
</head>
<body>
	<h1>
		Hello world!  
	</h1>
	
	<P>  The time on the server is ${serverTime}. </P>
	
	EL Message Tag(msg.test1) : <spring:message code="msg.test1"/>
	EL Message Tag(msg.test2) : <spring:message code="msg.test2" arguments="text,test"/><br/>
	
	Server Default Locale : ${defaultLocale}<br/>
	Server Message(devUserName): ${devUserName}<br/>
	Server Message(devPassword): ${devPassword}<br/>
	Server Message(sinnakeLocaleUtil): ${sinnakeLocaleUtil}<br/>
	Server Message(msgTest1): ${msgTest1}<br/>	
	currentUser : ${currentUser }<br/>

	<form action="/member/login" method="post" >
		<table>
			<tr>				
				<td> ID : <input type="text" name="username"> </td>
				<td> 
					PWD : <input type="text" name="password">
					<button id="login">확인</button>
				</td>
				<td><input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" /></td>
			</tr>
		</table>
	</form>
		
	<form action="/siteLogout" method="post">
		<input type="submit" value="logout">
		<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
	</form>
		
	<div id="test">home</div>
	<button id="testBtn">변경</button>
</body>
</html>
