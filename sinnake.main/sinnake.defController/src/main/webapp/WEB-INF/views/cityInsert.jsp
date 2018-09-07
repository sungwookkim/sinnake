<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="/WEB-INF/tld/SinnakeHttpUtil.tld" prefix="SinnakeHttpUtil"%>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Insert title here</title>
	</head>
	<body>
		<form action="/cityInsert" method="post">
			<table>
				<tr>
					<td> Name : <input type="text" name="name"></td>
				</tr>
				<tr>
					<td> CountryCode : <input type="text" name="countryCode"></td>
				</tr>
				<tr>
					<td> District : <input type="text" name="district"></td>
				</tr>
				<tr>
					<td> Population : <input type="text" name="population"></td>
				</tr>
				<tr>
					<td><input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" /></td>
				</tr>
			</table>
			<button>확인</button>
		</form>	
		
		url : ${SinnakeHttpUtil:encodeForURL(original)}<br>
		original : ${original}<br>
		javascript : ${javascript}<br>
		html : ${html}<br>
		
<%-- 		encodeForHTML : ${SinnakeHttpUtil:encodeForHTML(original) }<br>
		encodeForJavaScript : ${SinnakeHttpUtil:encodeForJavaScript(original) }<br>
		canonicalize : ${SinnakeHttpUtil:canonicalize(SinnakeHttpUtil:encodeForURL(original)) }<br> --%>
	</body>
</html>