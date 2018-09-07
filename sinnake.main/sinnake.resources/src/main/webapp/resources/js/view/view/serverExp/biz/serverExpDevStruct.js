define(['renderInit!'
	, 'jquery'
	, 'lightbox2'
	, 'jstree'
	, 'magnific'
	, 'handlebars'
	, 'commUtil'
	, 'text!/resources/js/view/view/serverExp/biz/serverExpDevStruct.js'
	, 'text!/resources/js/controller/serverExp/devStructController.js' 
], function(renderInit, $, lightbox2, jstree, magnific, handlebars, commUtil, codeText, controllerCodeText) {
	var render = renderInit.extend({
		_val : {}
		, init : function($content) {
			this._super();

			this._val.biz = this.biz();
			this._val.changeCodeNm = 'serverExpDevStruct';
			this._val.$content = $content;
			/* 
			 * 본 화면에 타이틀 그리드를 랜더링 하기 위한 config 변수
			 * 지정하고 싶지 않을 땐 변수 선언은 안하면 된다.
			 */
			this._val.titleText = '개발구조';

			/* 테이블 템플릿 사용 시 아래 헬퍼를 필수로 등록. */
			commUtil.helperUtil.handlerBarsHelper['table'](handlebars);
		}
		, biz : function() {
			var that = this
				, _super = this._super();
			
			var biz = {
					
			};
			
			return $.extend(true, _super, biz);
		}
		, render : function() {
			var that = this
				, _super = this._super();

			that._val.biz.loadCss('/resources/css/lightbox2/lightbox.css');
			that._val.biz.loadCss('/resources/js/lib/jquery/jstree/themes/default/style.min.css');
			that._val.biz.loadCss('/resources/css/magnific-popup/magnific-popup.css');

			/* 템플릿 컴파일 모음 변수 캐시. */
			var labelComp = this._val.labelComp
				, divComp = this._val.divComp
				, imgComp = this._val.imgComp
				, pComp = this._val.pComp
				, aComp = this._val.aComp;
			
			/* 컴파일에 필요로한 설정파일 생성 메소드 캐시. */
			var setInfo = this._val.setInfo;
			
			/* 패널 랜더링 템플릿 캐시. */
			var panelView = this._val.panelView
				, panelTemplInfo = this._val.panelTemplInfo;

			/*그리드 랜더링 템플릿 캐시.*/
			var gridView = this._val.gridView
				, gridTemplInfo = this._val.gridTemplInfo;
			
			/* 테이블 랜더링 템플릿 캐시. */			
			var tableView = this._val.tableView
				, tableTemplInfo = this._val.tableTemplInfo;

			var render = {
				/* 키 이름 앞에 _가 붙으면 자동 실행이 안됨. */
				'_tagRender' : function() {
					var _tagRender = { 
						/* 전체 패키지 구조 패널 컨텐츠 랜더링 */
						'totalPackageContentRender' : function() {
							var table = new tableTemplInfo()
								, trs = [];
							
							var imgInfo = setInfo().setStyle('width: 20%;');
							
							var renderConfig = {
								'colSpan2' : [
									{'tag' : '메이븐 다이나믹 모듈로 구성 되어 있음.'}
									, {'tag' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/mavenStruct.jpg"').getData() ), 'style' : 'text-align:center;'}
								]
								, 'contents' : [
									{'col1' : 'sinnake.biz', 'col2' : '비지니스 로직 모듈'}
									, { 'col1' : 'sinnake.common', 'col2' : '공통 로직 처리 모듈'}
									, { 'col1' : 'sinnake.defController', 'col2' : 'spring 컨트롤러 및 jsp 모듈'}
									, { 'col1' : 'sinnake.prop', 'col2' : '프로퍼티 모듈'}
									, { 'col1' : 'sinnake.resources', 'col2' : '리소스 모듈'}
									, { 'col1' : 'sinnake.service', 'col2' : 'spring 서비스 모듈'}
									, { 'col1' : 'sinnake.util', 'col2' : '개발 util 모듈'}
									, { 'col1' : 'sinnake.web', 'col2' : 'spring 설정 모듈'}									
								]
							};

							for(var i = 0, len = renderConfig.colSpan2.length; i < len; i++) {
								var clsTr = table.clsTr()
									, clsTd = clsTr.clsTd
									, tagObj = renderConfig.colSpan2[i];

								trs.push(clsTr.setTds([
									clsTd()
										.setTdStyle('text-align:left;' + (tagObj.style != undefined ? tagObj.style : ''))
										.setTdAttr('colspan="2"')
										.setTdText(tagObj.tag)
								]) );
							}
							
							for(var i = 0, len = renderConfig.contents.length; i < len; i++) {
								var contents = renderConfig.contents[i];

								var clsTr = table.clsTr()
									, clsTd = clsTr.clsTd
									, tds = [];

								for(key in contents) {
									tds.push(clsTd()
										.setTdStyle('text-align:left;')
										.setTdText(contents[key]) );									
								}
								
								trs.push(clsTr.setTds(tds));
							}
							
							/* 태그 정보 config 사용 후 초기화. */
							totalPackageTableInfo = null;

							return tableView(table
									.setTableCls('width100Per')
									.setTrs(trs)
									.getData() );
						}
						/* 패키지 상세 설명 랜더링. */
						, 'detailPackageCententRender' : function() {
							var imgInfo = setInfo();
							
							var renderConfig = {
								/* sinnake.web 패키지 구조 시작 */
								'sinnakeWebPackage' : {
									'packageTitle' : 'sinnake.web 패키지'
									, 'packageStruct' : {
										'title' : '패키지 구조'									
										, 'notice' : 'web.xml 및 spring 설정에 해당 되는 영역.'
										, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/sinnaekWebPackage.jpg"').getData() )
										, 'cols' : [
											{'name' : 'aop', 'kind' : '패키지', 'desc' : 'AOP 관련 설정 패키지'}
											, {'name' : 'auth', 'kind' : '패키지', 'desc' : '코드 보안 관련 패키지'}
											, {'name' : 'db', 'kind' : '패키지', 'desc' : 'DB 설정 관련 패키지'}
											, {'name' : 'exception', 'kind' : '패키지', 'desc' : '에러 및 Spring security 예외 처리 관련 패키지'}
											, {'name' : 'filter', 'kind' : '패키지', 'desc' : 'filter 관련 패키지'}
											, {'name' : 'http', 'kind' : '패키지', 'desc' : 'HttpServlet 관련 패키지'}
											, {'name' : 'interceptor', 'kind' : '패키지', 'desc' : 'interceptor 관련 패키지'}
											, {'name' : 'prop', 'kind' : '패키지', 'desc' : '서버 설정 및 개발 관련 설정 프로퍼티 관련 패키지'}
											, {'name' : 'security', 'kind' : '패키지', 'desc' : 'Spring security 설정 관련 패키지'}
											, {'name' : 'SpringRootConfig', 'kind' : '자바파일', 'desc' : 'root-context.xml의 역할을 하는 파일'}
											, {'name' : 'SpringWebConfig', 'kind' : '자바파일', 'desc' : 'spring config 역할을 하는 파일'}
											, {'name' : 'WebInitializer', 'kind' : '자바파일', 'desc' : 'web-config.xml의 역할을 하는 파일'}
										]
									}
									, 'detailPackageStruct' : [
										{
											'id' : 'aop'
											, 'title' : 'aop'
											, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/aop.jpg"').getData() )
											, 'cols' : [
												{
													'contents' : [
														{'colName' : '이름', 'content' : 'AOPConfig.java'}
														, {'colName' : '설명', 'content' : 'AOP 설정을 위한 파일.'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/AOPConfig.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeAOP.java'}
														, {'colName' : '설명', 'content' : 'AOP을 이용하여 service 패키지 영역에 대해서 sql Injection 체크 serviceAop 메소드에서 역할을 함.'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/SinnakeAOP.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}												
											]
										}
										, {
											'id' : 'auth'
											, 'title' : 'auth'
											, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/auth/auth_package.jpg"').getData() )
											, 'cols' : [
												{
													'contents' : [
														{'colName' : '이름', 'content' : 'CSRFInterface.java'}
														, {'colName' : '설명', 'content' : 'CSRF를 위한 인터페이스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/auth/CSRFInterface.jpg"').getData() )}
														, {'colName' : '비고', 'content' : '현재 CSRF는 Spring Security로 대체 함.'}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'CSRFImpl.java'}
														, {'colName' : '설명', 'content' : 'CSRF 인터페이스 구현체'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/auth/CSRFImpl.jpg"').getData() )}
														, {'colName' : '비고', 'content' : '현재 CSRF는 Spring Security로 대체 함.'}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'XSSInterface.java'}
														, {'colName' : '설명', 'content' : 'XSS를 위한 인터페이스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/auth/XSSInterface.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'XSSImpl.java'}
														, {'colName' : '설명', 'content' : 'XSS 인터페이스 구현체'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/auth/XSSImpl.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}
											]
										}
										, {
											'id' : 'db'
											, 'title' : 'db'
											, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/db/db_package.jpg"').getData() )
											, 'cols' : [
												{
													'contents' : [
														{'colName' : '이름', 'content' : 'DbConfigInterface.java'}
														, {'colName' : '설명', 'content' : 'DB config 설정을 위한 인터페이스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/db/DbConfigInterface.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'MysqlConfig.java'}
														, {'colName' : '설명', 'content' : 'MSSQL 접속을 위한 DbConfigInterface 구현체'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/db/MysqlConfig.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'DBConfig.java'}
														, {'colName' : '설명', 'content' : 'Spring DB config 설정 파일.'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/db/DBConfig.jpg"').getData() )}
														, {'colName' : '비고', 'content' : 
															pComp(setInfo()
																.setStyle('text-align:center;')
																.setTag(imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/db/db_desc.jpg"').getData() ))
																.getData() )
															+ divComp(setInfo().setTag(
																	'- DB 변경 시.</br> MySqlConfg와 같이 DbConfigInterface 구현체 클래스를 생성 한다.' 
																	+ '여기서 주의 할 점은 @Component를 설정 할 때 @Component("dbConfig")와 같이 설정 하여야 하며 '
																	+ '다른 구현체에서 위 Component 어노테이션과 충돌이 되어선 안 된다.'
																	+ '구현체를 생성한 후 아래 이미지의 MysqlConfig.class 부분을 새로 생성한 구현체 클래스로 설정 하면 됨.(이미지의 메소드는 WebInitializer.java에 위치해 있음.)').getData() )
															+ pComp(setInfo()
																.setStyle('text-align:center;')
																.setTag(imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/db/db_desc2.jpg"').getData() ))
																.getData() )																	
														}
													]
												}												
											]
										}
										, {
											'id' : 'exception'
											, 'title' : 'exception'
											, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/exception/exception_package.jpg"').getData() )
											, 'cols' : [
												{
													'contents' : [
														{'colName' : '이름', 'content' : 'Exceptions.java'}
														, {'colName' : '설명', 'content' : 'exception 처리를 위한 클래스 @ControllerAdvice 어노테이션 설정 되어 있음. Spring security의 예외도 해당 클래스에서 처리 함.'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/exception/Exceptions.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}											
											]
										}
										, {
											'id' : 'filter'
											, 'title' : 'filter'
											, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/filter/filter_package.jpg"').getData() )
											, 'cols' : [
												{
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeRequestFilter.java'}
														, {'colName' : '설명', 'content' : 'XSS 필터링을 위한 클래스. XSS 치환을 위해서 XSSInterface 인터페이스를 구현한 구현체 이용.'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/filter/SinnakeRequestFilter.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}											
											]
										}
										, {
											'id' : 'http'
											, 'title' : 'http'
											, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/http/http_package.jpg"').getData() )
											, 'cols' : [
												{
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeHttpServletRequest.java'}
														, {'colName' : '설명', 'content' : 'HttpServletRequest의 커스텀 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/http/SinnakeHttpServletRequest.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}											
											]
										}
										, {
											'id' : 'interceptor'
											, 'title' : 'interceptor'
											, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/interceptor/interceptor_package.jpg"').getData() )
											, 'cols' : [
												{
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeLocaleChangeInterceptor.java'}
														, {'colName' : '설명', 'content' : '다국어 설정을 위한 인터셉터 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/interceptor/SinnakeLocaleChangeInterceptor.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}											
											]
										}
										, {
											'id' : 'prop'
											, 'title' : 'prop'
											, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/prop/prop_package.jpg"').getData() )
											, 'cols' : [
												{
													'contents' : [
														{'colName' : '이름', 'content' : 'MySqlInjectionEncode.java'}
														, {'colName' : '설명', 'content' : 'MySql Injection 처리 구현체.'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/prop/MySqlInjectionEncode.jpg"').getData() )}
														, {'colName' : '비고', 'content' : 'DbInjectionEncode 인터페이스의 구현체'}
													]
												}											
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'OracleInjectionEncode.java'}
														, {'colName' : '설명', 'content' : 'Oracle Injection 처리 구현체.'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/prop/OracleInjectionEncode.jpg"').getData() )}
														, {'colName' : '비고', 'content' : 'DbInjectionEncode 인터페이스의 구현체'}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'DbInjectionEncode.java'}
														, {'colName' : '설명', 'content' : 'Injection 처리를 위한 인터페이스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/prop/DbInjectionEncode.jpg"').getData() )}
														, {'colName' : '비고', 'content' : 'DbInjectionEncode 인터페이스와 구현체에 대한 설명은 "3.1. sinnake.web 패키지 구조” aop 설명 란에 SinnakeAOP 비고 참고'}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'DbPropConfig.java'}
														, {'colName' : '설명', 'content' : 'DB 프로퍼티 파일을 로드하는 클래스.'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/prop/DbPropConfig.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'ServerPropConfig.java'}
														, {'colName' : '설명', 'content' : 'server 설정 관련 프로퍼티 파일을 로드하는 클래스.'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/prop/ServerPropConfig.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'PropConfig.java'}
														, {'colName' : '설명', 'content' : '글로벌 설정 관련 프로퍼티 파일을 로드하는 클래스.'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/prop/PropConfig.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}												
											]
										}
										, {
											'id' : 'security'
											, 'title' : 'security'
											, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/security/security_package.jpg"').getData() )
											, 'cols' : [
												{
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeAuthenticationEntryPoint.java'}
														, {'colName' : '설명', 'content' : '비 로그인 시 페이지 접근 예외 처리 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/security/SinnakeAuthenticationEntryPoint.jpg"').getData() )}
														, {'colName' : '비고', 'content' : 'AuthenticationEntryPoint 인터페이스 구현체'}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeAuthenticationProvider.java'}
														, {'colName' : '설명', 'content' : '로그인 공통 처리 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/security/SinnakeAuthenticationProvider.jpg"').getData() )}
														, {'colName' : '비고', 'content' : 'DaoAuthenticationProvider클래스 오버라이딩'}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeSecurityCommonInterface.java'}
														, {'colName' : '설명', 'content' : 'Spring security에서 발생 된 예외를 처리 하기 위한 인터페이스'}
														, {'colName' : '클래스 다이어그램', 'content' : 
															aComp(setInfo()
																.setAttr('href="/resources/img/serverExp/devStruct/security/SinnakeSecurityCommonInterface.jpg" data-lightbox="SinnakeSecurityCommonInterface"')
																.setTag(imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/security/SinnakeSecurityCommonInterface.jpg" width="90%"').getData() ))
																.getData() )
														}
														, {'colName' : '비고', 'content' : ''}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeSecurityCommon.java'}
														, {'colName' : '설명', 'content' : 'SinnakeSecurityCommonInterface 구현체'}
														, {'colName' : '클래스 다이어그램', 'content' : 
															aComp(setInfo()
																.setAttr('href="/resources/img/serverExp/devStruct/security/SinnakeSecurityCommonInterface.jpg" data-lightbox="SinnakeSecurityCommon"')
																.setTag(imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/security/SinnakeSecurityCommonInterface.jpg" width="90%"').getData() ))
																.getData() )
														}
														, {'colName' : '비고', 'content' : ''}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeAccessDeniedHandler.java'}
														, {'colName' : '설명', 'content' : '로그인 후 페이지 접근 권한 예외 처리 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/security/SinnakeAccessDeniedHandler.jpg"').getData() )}
														, {'colName' : '비고', 'content' : 'AccessDeniedHandler 구현체'}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeAuthenticationFailureHandler.java'}
														, {'colName' : '설명', 'content' : '로그인 시도 실패 예외 처리 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/security/SinnakeAuthenticationFailureHandler.jpg"').getData() )}
														, {'colName' : '비고', 'content' : 'AuthenticationFailureHandler 구현체'}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeAuthenticationSuccessHandler.java'}
														, {'colName' : '설명', 'content' : '로그인 성공 시 처리 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/security/SinnakeAuthenticationSuccessHandler.jpg"').getData() )}
														, {'colName' : '비고', 'content' : 'AuthenticationSuccessHandler 구현체'}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeLogoutSuccessHandler.java'}
														, {'colName' : '설명', 'content' : '로그아웃 시 후처리 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/security/SinnakeLogoutSuccessHandler.jpg"').getData() )}														
														, {'colName' : '비고', 'content' : 'SimpleUrlLogoutSuccessHandler클래스 오버라이딩 및 LogoutSuccessHandler 구현체'}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeUserDetailDaoImpl.java'}
														, {'colName' : '설명', 'content' : '계정 비밀번호 틀린 횟수 체크, 계정 잠금 변경, 성공 시 틀린 횟수 초기화 로직 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/security/SinnakeUserDetailDaoImpl.jpg"').getData() )}														
														, {'colName' : '비고', 'content' : 'JdbcDaoSupport클래스 오버라이딩 및 SinnakeUserDetailDaoInterface 구현체'}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeUserDetailDaoInterface.java'}
														, {'colName' : '설명', 'content' : '계정 비밀번호 관련 인터페이스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/security/SinnakeUserDetailDaoInterface.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeUserDetailService.java'}
														, {'colName' : '설명', 'content' : '로그인 관련 사용자 정보 조회 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/security/SinnakeUserDetailService.jpg"').getData() )}														
														, {'colName' : '비고', 'content' : 'JdbcDaoImpl클래스 오버라이딩'}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakePasswordEncoder.java'}
														, {'colName' : '설명', 'content' : '로그인 시도 시 비밀번호 암호화 비교 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/security/SinnakePasswordEncoder.jpg"').getData() )}
														, {'colName' : '비고', 'content' : 'PasswordEncoder 구현체'}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeSecurity.java'}
														, {'colName' : '설명', 'content' : 'Spring security 설정 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' :
															aComp(setInfo()
																.setAttr('href="/resources/img/serverExp/devStruct/security/SinnakeSecurity.jpg" data-lightbox="SinnakeSecurity"')
																.setTag(imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/security/SinnakeSecurity.jpg" width="90%"').getData() ))
																.getData() )															
														}
														, {'colName' : '비고', 'content' : 'WebSecurityConfigurerAdapter클래스 오버라이딩'}
													]
												}												
											]
										}

										
									]
								}
								/* sinnake.web 패키지 구조 끝 */

								/* sinnake.util 패키지 구조 시작 */
								, 'sinnakeUtilPackage' : {
									'packageTitle' : 'sinnake.util 패키지'
									, 'packageStruct' : {
										'title' : '패키지 구조'									
										, 'notice' : '범용적으로 사용되는 util 패키지'
										, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/sinnakeUtilPackage.jpg"').getData() )
										, 'cols' : [
											{'name' : 'SinnakeAES256Util', 'kind' : '자바 파일', 'desc' : 'AES256 관련 클래스'}
											, {'name' : 'SinnakeHttpUtil', 'kind' : '자바 파일', 'desc' : '인코딩 및 디코딩 관련 클래스'}
											, {'name' : 'SinnakeLocaleUtil', 'kind' : '자바 파일', 'desc' : '로케일 관련 클래스'}
											, {'name' : 'SinnakeMsgSourceUtil', 'kind' : '자바 파일', 'desc' : 'Message source 관련 클래스'}
											, {'name' : 'SinnakeStringUtil', 'kind' : '자바 파일', 'desc' : 'String 관련 클래스'}
											, {'name' : 'SinnakeValidate', 'kind' : '자바 파일', 'desc' : 'Validate 관련 클래스'}
										]
									}
								}
								/* sinnake.util 패키지 구조 끝 */
								
								/* sinnake.service 패키지 구조 시작 */
								, 'sinnakeServicePackage' : {
									'packageTitle' : 'sinnake.service 패키지'
									, 'packageStruct' : {
										'title' : '패키지 구조'									
										, 'notice' : 'Spring에서 service 영역에 해당 되는 패키지'
										, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/sinnakeServicePackage.jpg"').getData() )
									}
								}								
								/* sinnake.service 패키지 구조 끝 */
								
								/* sinnake.resources 패키지 구조 시작 */
								, 'sinnakeResourcesPackage' : {
									'packageTitle' : 'sinnake.resources 패키지'
									, 'packageStruct' : {
										'title' : '패키지 구조'									
										, 'notice' : 'resources 영역에 해당 되는 패키지'
										, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/sinnakeResourcesPackage.jpg"').getData() )
									}
								}								
								/* sinnake.service 패키지 구조 끝 */								
								
								/* sinnake.prop 패키지 구조 시작 */
								, 'sinnakePropPackage' : {
									'packageTitle' : 'sinnake.prop 패키지'
									, 'packageStruct' : {
										'title' : '패키지 구조'									
										, 'notice' : 
											['프로퍼티 설정 파일에 해당 되는 패키지</br>'
											, 'dev : 비즈 서버에서 사용되는 프로퍼티 파일</br>'
											, 'local : 개발자 로컬 PC에서 사용 되는 프로퍼티 파일</br>'
											, 'stage : 스테이지 서버에서 사용되는 프로퍼티 파일</br>'
											, 'real : 리얼 서버에서 사용되는 프로퍼티 파일</br>'].join('')
										, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/sinnakePropPackage.jpg"').getData() )
										, 'cols' : [
											{'name' : 'tagMessage', 'kind' : 'XML 파일', 'desc' : '다국어 지원을 위한 메시지 파일'}
											, {'name' : 'db properties', 'kind' : 'XML 파일', 'desc' : 'db 접속 설정 관련 프로퍼티 파일'}
											, {'name' : 'dev properties', 'kind' : 'XML 파일', 'desc' : '개발 시 사용될 프로퍼티 파일'}
											, {'name' : 'server properties', 'kind' : 'XML 파일', 'desc' : '서버 설정 관련 프로퍼티 파일'}
											, {'name' : 'properties', 'kind' : 'XML 파일', 'desc' : '모든 프로퍼티를 호출 및 설정하는 최상위 프로퍼티 파일'}
											, {'colSpan' : 3, 'desc' :
												'서버 유형별 프로퍼티 파일 호출은 properties.xml에 설정.</br>'
												 + imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/propDesc.jpg"').getData() )
											}
										]										
									}
								}								
								/* sinnake.prop 패키지 구조 끝 */
								
								/* sinnake.defController 패키지 구조 시작 */
								, 'sinnakeDefControllerPackage' : {
									'packageTitle' : 'sinnake.resources 패키지'
									, 'packageStruct' : {
										'title' : '패키지 구조'									
										, 'notice' : 'Spring controller 영역에 해당 되는 패키지'
										, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/sinnakeDefControllerPackage.jpg"').getData() )
									}
								}								
								/* sinnake.defController 패키지 구조 끝 */
								
								/* sinnake.common 패키지 구조 시작 */
								, 'sinnakeCommonPackage' : {
									'packageTitle' : 'sinnake.common 패키지'
									, 'packageStruct' : {
										'title' : '패키지 구조'									
										, 'notice' : '범용적으로 사용되는 클래스 패키지'
										, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/sinnakeCommonPackage.jpg"').getData() )
										, 'cols' : [
											{'name' : 'login', 'kind' : '패키지', 'desc' : '로그인 된 계정 정보 조회 관련 패키지'}
											, {'name' : 'entity', 'kind' : '패키지', 'desc' : 'entity 패키지'}											
											, {'name' : 'sinnakeEnum', 'kind' : '패키지', 'desc' : '범용적으로 사용될 enum 관련 패키지'}
											, {'name' : 'common', 'kind' : '패키지', 'desc' : 'Spring security에서 사용될 범용 패키지'}
										]
											
									}
									, 'detailPackageStruct' : [
										{
											'id' : 'login'
											, 'title' : 'login'
											, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/login/login_package.jpg"').getData() )
											, 'cols' : [
												{
													'contents' : [
														{'colName' : '이름', 'content' : 'LoginInterface.java'}
														, {'colName' : '설명', 'content' : '로그인 된 계정 정보 조회 인터페이스'}
														, {'colName' : '클래스 다이어그램', 'content' :
															aComp(setInfo()
																.setAttr('href="/resources/img/serverExp/devStruct/login/LoginInterface.jpg" data-lightbox="LoginInterface"')
																.setTag(imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/login/LoginInterface.jpg" width="100%"').getData() ))
																.getData() )
														}
														, {'colName' : '비고', 'content' : ''}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'LoginImpl.java'}
														, {'colName' : '설명', 'content' : '로그인 된 계정 정보 조회 구현체'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/login/LoginImpl.jpg"').getData() )}
														, {'colName' : '비고', 'content' : 'LoginInterface 구현체'}
													]
												}												
											]
										}
										, {
											'id' : 'entity'
											, 'title' : 'entity'
											, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/entity/entity_package.jpg"').getData() )
											, 'cols' : [
												{
													'contents' : [
														{'colName' : '이름', 'content' : 'ExceptionInfo.java'}
														, {'colName' : '설명', 'content' : '에러 정보 entity 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/entity/ExceptionInfo.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeUser.java'}
														, {'colName' : '설명', 'content' : '계정 정보 entity 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/entity/SinnakeUser.jpg"').getData() )}
														, {'colName' : '비고', 'content' : 'UserDetails, CredentialsContainer 구현체'}
													]
												}
												, {
													'contents' : [
														{'colName' : '이름', 'content' : 'UserInfo.java'}
														, {'colName' : '설명', 'content' : '실제 개발 시 사용되는 계정 정보 entity 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/entity/UserInfo.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}												
											]
										}
										, {
											'id' : 'sinnakeEnum'
											, 'title' : 'sinnakeEnum'
											, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/sinnakeEnum/sinnakeEnum_package.jpg"').getData() )
											, 'cols' : [
												{
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeSecurityEnum.java'}
														, {'colName' : '설명', 'content' : 'Spring security 예외 정의 Enum 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/sinnakeEnum/SinnakeSecurityEnum.jpg"').getData() )}
														, {'colName' : '비고', 'content' : ''}
													]
												}
											]
										}
										, {
											'id' : 'common'
											, 'title' : 'common'
											, 'img' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/common/common_package.jpg"').getData() )
											, 'cols' : [
												{
													'contents' : [
														{'colName' : '이름', 'content' : 'SinnakeAuthenticationException.java'}
														, {'colName' : '설명', 'content' : 'Spring security에서 발생 되는 예외 관련 클래스'}
														, {'colName' : '클래스 다이어그램', 'content' : imgComp(imgInfo.setAttr('src="/resources/img/serverExp/devStruct/common/SinnakeAuthenticationException.jpg"').getData() )}
														, {'colName' : '비고', 'content' : 'AuthenticationException 오버라이딩'}
													]
												}
											]
										}										
									]
								}
								/* sinnake.common 패키지 구조 끝 */
							};
							
							var resultTag = []
								/* 각 패키지 내에 있는 패키지 구조 table 랜더링 메소드. */
								, packageStruct = function(packageStructTable, packageStruct) {
									var packageStructTrs = [];
									
									for(var key in packageStruct) {
										var clsTr = null
											, clsTd = null;
		
										var cssCls = ''
											, style = 'text-align:left;';

										if(key == 'title' || key == 'notice' || key == 'img') {
											cssCls = '';
											style = 'text-align:left;';
											
											clsTr = packageStructTable.clsTr();
											clsTd = clsTr.clsTd;

											switch(key) {
												case 'title' : 
													cssCls = 'glayHeader';
													style += 'font-size: 15px;';
													break;
												case 'img' : 
													style = 'text-align:center;';
													break;
												default : break;													
											}
											
											packageStructTrs.push(clsTr.setTds([
												clsTd()
													.setTdCls(cssCls)
													.setTdStyle(style)
													.setTdAttr('colspan="3"')
													.setTdText(packageStruct[key])
											]) );
										} else if(key == 'cols') {
											var psCols = packageStruct[key];

											psCols.unshift({
												'name' : '이름'
													, 'kind' : '종류'
													, 'desc' : '설명'
												});
			
											for(var i = 0, len = psCols.length; i < len; i++) {
												var cols = psCols[i]
													, tds = [];
												
												var colSpan = 0;
												
												clsTr = packageStructTable.clsTr()
												clsTd = clsTr.clsTd;
												
												cssCls = '';
												style = 'text-align:left;';

												switch(i) {
													case 0 : 
														cssCls = 'glayHeader';
														style = "font-size: 15px; text-align: center;";
														break;
													default : break;
												}

												if(cols.colSpan != undefined) { colSpan = cols.colSpan; }

												for(var colKey in cols) {
													var colTd = clsTd()
														.setTdCls(cssCls)
														.setTdStyle(style);
													
													if(colKey != 'colSpan') {
														if(colSpan > 0) { colTd.setTdAttr('colspan="' + colSpan + '"') }
														
														colTd.setTdText(cols[colKey]);

														tds.push(colTd);
													}
												}

												packageStructTrs.push(clsTr.setTds(tds));
											}										
										}
										
									}

									return packageStructTrs;
								}
								/* 각 패키지 내에 있는 상세 설명 table 랜더링. */
								, detailPackageStruct = function(detailPackageStructTable, detailPackageStruct) {
									var detailPackageStructTrs = []
										, clsTr = null
										, clsTd = null;
									
									if(detailPackageStruct == undefined) { return false; }

									for(var i = 0, len = detailPackageStruct.length; i < len ; i++) {
										var dps = detailPackageStruct[i]
											, dpsId = dps.id;
										
										for(var dpsKey in dps) {
											clsTr = detailPackageStructTable.clsTr();
											clsTd = clsTr.clsTd;

											cssCls = '';
											style = 'text-align:left;';
											
											if(dpsKey == 'title' || dpsKey == 'img') {
												switch(dpsKey) {
													case 'title' : 
														clsTr.setTrId('dpsId_' + dpsId + '_start');
														cssCls = 'glayHeader';
														style += "font-size: 15px; width:20%;";
														break;
													case 'img' : 
														style = 'text-align: center; width: 80%;';
														break;
													default : break;
													
												}
												
												detailPackageStructTrs.push(clsTr.setTds([
													clsTd()
														.setTdCls(cssCls)
														.setTdStyle(style)
														.setTdAttr('colspan="2"')
														.setTdText(dps[dpsKey])
												]) );											
											} else if(dpsKey == 'cols') {
												var dpsCols = dps[dpsKey];

												for(var colsIdx = 0, colsLen = dpsCols.length; colsIdx < colsLen; colsIdx++) {
													var colsContentObj = dpsCols[colsIdx].contents; 
												
													for(var contentIdx = 0, contentLen = colsContentObj.length; contentIdx < contentLen; contentIdx++) {
														var contentObj = colsContentObj[contentIdx];
														var tds = [];
																			
														clsTr = detailPackageStructTable.clsTr();
														clsTd = clsTr.clsTd;
														
														for(var contentKey in contentObj) {
															cssCls = '';
															style = 'text-align:left;';
															
															switch(contentKey) {
																case 'colName' : 
																	cssCls = 'glayHeader';
																	style += 'font-size: 15px; text-align:center;';
																	break;
																default : break;
															}

															tds.push(clsTd()
																.setTdCls(cssCls)
																.setTdStyle(style)
																.setTdText(contentObj[contentKey]) );
														}
 
														detailPackageStructTrs.push(clsTr.setTds(tds) );
													}
													
													if(colsLen - 1 != colsIdx) {
														detailPackageStructTrs[detailPackageStructTrs.length - 1]
															.setTrStyle('border-bottom: 9px double gainsboro;');
													}
												}

												detailPackageStructTrs[detailPackageStructTrs.length - 1]
													.setTrId('dpsId_' + dpsId + '_end');
											}
										}
									}
									
									return detailPackageStructTrs;
								};

							for(mainKey in renderConfig) {
								var labelTag = labelComp(setInfo()
									.setTag(renderConfig[mainKey].packageTitle)
									.getData() );
								
								var panels = new panelTemplInfo()
									.setTitTag(labelTag)
									.setTitStyle('background-color:#424242; color:white;');
																
								var packageStructTable = new tableTemplInfo()
									, detailPackageStructTable = new tableTemplInfo();

								panels.setConTag([
									tableView(packageStructTable
										.setTableId('packageCont_' + mainKey)
										.setTableCls('width100Per')
										.setTrs(packageStruct(packageStructTable, renderConfig[mainKey].packageStruct) )
										.getData() )
									, '</br>'
									, tableView(detailPackageStructTable
										.setTableCls('width100Per')
										.setTrs(detailPackageStruct(packageStructTable, renderConfig[mainKey].detailPackageStruct) )
										.getData() )
									].join('') );
								
								resultTag.push(panelView(panels.getData() ));								
							}

							renderConfig = null;
							return resultTag.join('');
						}
						/* 전체 패키지 구조 패널 랜더링 */
						, 'totalPackagePanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag('전체 패키지 구조')
									.getData() );
	
							return panelView(new panelTemplInfo()
								.setTitTag(labelTag)
								.setTitStyle('background-color:#424242; color:white;')
								.setConTag(_tagRender.totalPackageContentRender())
								.getData()
							);							
						}
						

					};

					return _tagRender;
				}
				/* 그리드 영역 랜더링. */
				, 'gridRender' : function() {
					var packageTreeGrid = new gridTemplInfo()
						, codeViewGrid = new gridTemplInfo()
						, totalPackageTableGrid = new gridTemplInfo()
						, detailPackageGrid = new gridTemplInfo();

					codeViewGrid
						.setCell([
							codeViewGrid.clsCell().setSize(6).setCellCls('codeView')
							, codeViewGrid.clsCell().setSize(6).setCellCls('controllerCodeView')
						]);
					
					packageTreeGrid
						.setCell([
							packageTreeGrid.clsCell().setSize(12).setCellCls('devStructPackageTree').setTag(divComp(setInfo().setId('packageTree').getData() ))
						]);
					
					totalPackageTableGrid
						.setCell([
							totalPackageTableGrid.clsCell().setSize(12).setCellCls('totalPackageTableGrid')
						]);
					
					detailPackageGrid
						.setCell([
							detailPackageGrid.clsCell().setSize(12).setCellCls('detailPackageGrid')
						]);
					
					/* $content 영역에 그리드 랜더링. */
					that._val.$content
						.append([
							gridView(codeViewGrid.getData() )
							, gridView(packageTreeGrid.getData() )
							, gridView(totalPackageTableGrid.getData() )
							, gridView(detailPackageGrid.getData() )
						].join(''));

					/* 코드보기 랜더링 */
					_super._render().codeView($('.codeView'), {
						'type' : 'js'
						, 'renderTag' : codeText
					});

					_super._render().codeView($('.controllerCodeView'), {
						'type' : 'js'
						, 'panelTitle' : that._val.commLang.commonLang.controllerCodeView
						, 'renderTag' : controllerCodeText
					});
				}
				/* 그리드 영역 컨텐츠 랜더링. */
				, 'contentRender' : function() {
					var _render = render._tagRender();
					
					$('.totalPackageTableGrid').append(_render.totalPackagePanel() );
					$('.detailPackageGrid').append(_render.detailPackageCententRender() );
				}
				/* 패키지 구조 트리 랜더링 */
				, 'packageTree' : function() {
					/* 태그 내에 있는 최상위 패키지 태그 검색 후 이를 토대로 tree 태그 구성. */
					var $rootNode = $('.detailPackageGrid .tit');
					
					var nodes = [];

					$.each($rootNode, function(key, tag) {
						var $tag = $(tag)
							, $contTable = $tag.next('.con').find('table')
							, $package = null;

						nodes.push({
							'id' : key
							, 'parent' : '#'
							, 'text' : $tag.find('label').text()
						});

						nodes.push({
							'id' : 'devStructPackage_' + key
							, 'parent' : key
							, 'text' : '패키지 구조'
							, 'renderId' : $($contTable[0]).attr('id')
						});
						
						$package = $contTable.find('tr[id*="_start"]');
						$.each($package, function(pkKey, pkTag) {
							var $pkTag = $(pkTag)
								, text =  $.trim($pkTag.text())
								, id =$.trim( $pkTag.attr('id'));

							nodes.push({
								'id' : 'devStructDetailPackage_' + text
								, 'parent' : key
								, 'text' : text
								, 'renderId' : id
							});								
						});
					});
					
					$('#packageTree')
						.on('changed.jstree', function(e, data) {
							var renderId = data.node.original.renderId;

							if(renderId) {
								if(renderId.indexOf('packageCont_') > -1) {
									$.magnificPopup.open({
										'items': {
											'src' : that._val.divComp(that._val.setInfo()
												.setCls('white-popup')
												.setTag($('#' + renderId).clone().removeAttr('id').wrapAll('<div/>').parent().html() )
												.getData() )
											, 'type': 'inline'
										}
										, 'closeBtnInside': true
									});
								} else if(renderId.indexOf('dpsId_') > -1) {
									var tableTagStr = ''
										, $renderId = $('#'+ renderId)
										, $lastRenderId = $('#dpsId_' + renderId.split('_')[1] + '_end')
										, $nowNode = $renderId
										, trTags = [];												

									trTags.push($nowNode.clone().wrapAll('<div/>').parent().html());
									for(var i = $renderId.index(), len = $lastRenderId.index(); i < len; i++) {
										$nowNode = $nowNode.next();
										trTags.push($nowNode.clone().wrapAll('<div/>').parent().html());
									}
									
									/* 기존 정보 table 태그에 있는 속성(class 등등)들을 추출하기 위한 부분.*/
									tableTagStr = $renderId.parents('table').clone().wrapAll('<div/>').parent().html();
									tableTagStr = tableTagStr.substring(0, tableTagStr.indexOf('>') + 1);
									
									$.magnificPopup.open({
										'items': {
											'src' : [tableTagStr
												, '<thead></thead>'
												, '<tbody>'
												, trTags.join('')
												, '</tbody>'
												, '</table>'														
											].join('')
											, 'type': 'inline'
										}
										, 'closeBtnInside': true
									});
								}
							}
						})
						.jstree({
							'core' : {
								'data' : nodes
							}
						});
				}				
			};
			
			return $.extend(true, _super, render);
		}
		, eventBind : function() {
			var that = this
				, _super = this._super();
			
			var eventBind = {
					
			};
			
			return $.extend(true, _super, eventBind);
		}
	});
	
	return render;
});