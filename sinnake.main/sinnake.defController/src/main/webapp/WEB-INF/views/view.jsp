<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>사이트</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<sec:csrfMetaTags/>

		<script defer src="/resources/js/lib/material/material.js"></script>
		<link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.blue-pink.min.css" /> 
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

		<style type="text/css">
			.page_loding {
				  position : absolute;
				  top : 50%;
				  left : 43%;
				  width : 400px;
				  height : 400px;
				  margin : -40px 0 0 -40px;
			}

			.mdl-progress {
				height : 30px;
			}
			
			.width100Per {
				width : 100%;
			}
			
			.textAlignLeft {
				text-align: left;
			}

			.textAlignCenter {
				text-align: center;
			}
			
			.textAlignRight {
				text-align: right;
			}

			.mdl-data-table td center {
				text-align: center;
			}

			.glayHeader {
				background-color:gainsboro;
				font-weight: bold;
			}
			
			.panel {margin:10px auto; border:1px solid #ddd; border-radius:3px; background:#fff}
			.panel .tit {padding:10px; font-size:14px; font-weight:bold; border-bottom:1px solid #ddd}
			.panel .con {padding:20px}
			
			.mdl-data-table {
				white-space:pre-wrap;
			}
			
			.table-layout_fixed {
				table-layout: fixed;
			} 
			
			a {
				text-decoration:none !important;
			}
			
			.displayNone {
				display: none;
			}

			.hljs {
				overflow-x: visible !important;
			}
		</style>

		<script type="text/javascript" src="/resources/js/config/requireConfig.js"></script>
		<script type="text/javascript" data-main="${jsController }" src="/resources/js/lib/require/require.js"></script>
	</head>
	<body>
		<div class="page_loding">
			<div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate">
			</div>
		</div>
	</body>
</html>
