<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Insert title here</title>
	</head>
	<body>
		<h1>로그인!</h1>
		${currentUser }
		<form action="/login" method="post" >
			<table>
				<tr>				
					<td> ID : <input type="text" name="username"> </td>
					<td> PWD : <input type="text" name="password"> </td>
					<td><input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" /></td>
				</tr>
			</table>
			<button>확인</button>		
		</form>
	</body>
</html>