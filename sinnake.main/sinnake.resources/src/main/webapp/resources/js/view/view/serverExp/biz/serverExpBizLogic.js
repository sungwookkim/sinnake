define(['renderInit!'
	, 'jquery'
	, 'highlight'
	, 'jstree'
	, 'magnific'
	, 'handlebars'
	, 'commUtil'
	, 'lang!serverExp/bizLogicLang'
	, 'text!/resources/js/view/view/serverExp/biz/serverExpBizLogic.js'
	, 'text!/resources/js/controller/serverExp/bizLogicController.js'
	, 'text!/resources/js/view/view/serverExp/biz/javaCode/memberRegUpdatePost.java'
	, 'text!/resources/js/view/view/serverExp/biz/javaCode/memberRegPost.java'
	, 'text!/resources/js/view/view/serverExp/biz/javaCode/bizChain.java'
	, 'text!/resources/js/view/view/serverExp/biz/javaCode/memberRegistValidate.java'
], function(renderInit, $, highlight, jstree
		, magnific, handlebars, commUtil, langInfo
		, codeText, controllerCodeText, memberRegUpdatePostText, memberRegPostText
		, bizChainText, memberRegistValidateText) {
	var render = renderInit.extend({
		_val : {}
		, init : function($content) {
			this._super();
			
			this._val.biz = this.biz();
			this._val.changeCodeNm = 'serverExpBizLogic';
			this._val.$content = $content;
			/* 
			 * 본 화면에 타이틀 그리드를 랜더링 하기 위한 config 변수
			 * 지정하고 싶지 않을 땐 변수 선언은 안하면 된다.
			 */
			this._val.titleText = langInfo.bizLogicLang.titleText;
			
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
			
			that._val.biz.loadCss('/resources/js/lib/jquery/jstree/themes/default/style.min.css');
			that._val.biz.loadCss('/resources/css/magnific-popup/magnific-popup.css');
			
			/* 언어 캐시 변수. */
			var bizLogicLang = langInfo.bizLogicLang; 
			
			/* 템플릿 컴파일 모음 변수 캐시. */
			var labelComp = this._val.labelComp
				, aComp = this._val.aComp
				, divComp = this._val.divComp
				, imgComp = this._val.imgComp
				, preComp = this._val.preComp
				, codeComp = this._val.codeComp;
			
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
				'_tagRender' : function() {
					var _tagRender = {
						/* 목적 panel 컨텐츠 랜더링. */					
						'purposePanelContent' : function() {
							return  divComp(setInfo()
								.setId('purpose')
								.setTag([
									labelComp(setInfo()
										.setTag('1.	한 클래스 혹은 한 메소드에서 처리 되는 비지니스 로직을 세부화.')
										.getData() ) + '<br/>'
									, labelComp(setInfo()
										.setTag('2.	비즈니스 로직을 크게 클래스로 나눈 후 처리 부분을 메소드로 한번 더 나누는 구조.')
										.getData() ) + '<br/>'
									, labelComp(setInfo()
										.setTag('3.	중복 되는 비지니스 로직을 클래스 상속과 메소드 오버라이딩을 통해 최소화.')
										.getData() ) + '<br/>'
									, labelComp(setInfo()
										.setTag('4.	코드의 구조 통일성과 강제성을 부여 하기 위한 목적.')
										.getData() ) + '<br/>'
									].join('') )
								.getData() );
						}
						/* 적용사항 panel 컨텐츠 랜더링. */					
						, 'applyPanelContent' : function() {
							return  divComp(setInfo()
								.setId('purpose')
								.setTag([
									labelComp(setInfo()
										.setTag('해당 구조를 적용하기 위해 디자인 패턴 중 하나인 책임연쇄패턴을 적용.')
										.getData() )									
									].join('') )
								.getData() );
						}
						/* 구조 panel 컨텐츠 랜더링. */
						, 'structPanleContent' : function() {
							var bizChain = divComp(setInfo()
									.setStyle('text-align:center;')
									.setTag(imgComp(setInfo().setAttr('src="/resources/img/serverExp/bizLogic/bizChain.png"').getData() ))
									.getData() )
								, bizChain2 = divComp(setInfo()
									.setStyle('text-align:center;')
									.setTag(imgComp(setInfo().setAttr('src="/resources/img/serverExp/bizLogic/bizChain2.png"').getData() ))
									.getData() )
								, bizChainExmp = divComp(setInfo()
									.setStyle('text-align:center;')
									.setTag(imgComp(setInfo().setAttr('src="/resources/img/serverExp/bizLogic/bizChainExmp.png"').getData() ))
									.getData() ) ;
								
							return divComp(setInfo()
								.setId('struct')
								.setTag([
									bizChain
									, '<br/>간략하게 책임연쇄패턴을 설명하자면 메인 체인 클래스를 생성하고 해당 클래스를 상속 받아 구현.'
									, bizChain2
									, '<br/><br/>각 자식 체인 클래스들은 부모 클래스인 메인 체인 클래스의 setNext 메소드을 통해 자식 체인 클래스들을 연결.'
									, divComp(setInfo()
										.setId('structJavaCode')
										.setStyle('width:65%; margin:auto;')
										.setTag(preComp(setInfo()
											.setTag(codeComp(setInfo()
													.setCls('lang-java')
													.setTag(memberRegUpdatePostText)
													.getData() ))
											.getData() ))
										.getData() )
									, '<br/>위와 같이 비지니스 로직 처리 영역을 한 클래스 혹은 한 메소드에서 처리 하는 구조를 상세하게 나눠서 로직 처리를 할 수 있음.'
									, bizChainExmp
									, '<br/>회원 정보 수정 시 데이터 검증에 필요한 로직은 회원 가입 시 데이터 검증 로직과 동일하다. 로직 처리 부분의 중복을 방지 하기 위해 MemberRegistUpdateValidate 클래스는 회원 가입 시 데이터 검증 처리 클래스인 MemberRegistValidate 클래스를 상속 받아 메소드 오버라이딩 혹은 필요한 메소드들을 활용하여 코드 중복과 구조 중복을 방지한다.'
								].join(''))
								.getData() );
						}
						/* 클래스 panel BizChain Class 컨텐츠 랜더링*/
						, 'classPanle_class_Content' : function() {
							var table = new tableTemplInfo();

							var descConfig = {
								'descImgTable' : {
									'table' : {
										'style' : 'width:50%; float:left;'
									}
									, 'trs' : [
										{
											'tds' : [
												{
													'style' : 'text-align:left;'
													, 'tag' : 'BizChain클래스는 체인 클래스들의 모든 부모 클래스가 되며 체인 클래스들을 연결하고 공통적으로 사용되는 메소드들을 관장하는 주요 클래스이다.</br>'											
														+ divComp(setInfo()
															.setStyle('text-align:center;')
															.setTag(imgComp(setInfo()
																	.setAttr('src="/resources/img/serverExp/bizLogic/bizChainClass.jpg"')
																	.getData() ))
															.getData() )
												}
											]
										}
									]									
								}
								, 'descTable' : {
									'table' : {
										'style' : 'width:50%; float:right;'
									}
									, 'ths' : [
										{
											'tag' : divComp(setInfo().setStyle('text-align:center;')
													.setTag('메소드 명')
													.getData() )
										}
										, {
											'tag' : divComp(setInfo().setStyle('text-align:center;')
													.setTag('설명')
													.getData() )
										}
									]
									, 'trs' : [
										{
											'tds' : [
												{'tag' : 'hasNext', 'style' : 'text-align:left;'}
												, {'tag' : '다음 체인 클래스의 존재 여부 확인 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'nextInit', 'style' : 'text-align:left;'}
												, {'tag' : '현재 클래스에 기본 정보들을 다음 체인 클래스에 설정 하는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'setNext', 'style' : 'text-align:left;'}
												, {'tag' : '다음 체인 클래스를 설정하는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'getNext', 'style' : 'text-align:left;'}
												, {'tag' : '다음 체인 클래스를 가져오는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'setServletInfo', 'style' : 'text-align:left;'}
												, {'tag' : '서버 객체 정보를 설정하는 메소드.<br/>'
													 + aComp(setInfo().setAttr('href="javascript:;"')
														 .setTag('ServletInfo Class 정보 보기')
														 .setCls('servletInfoClick')
														 .getData() )
													, 'style' : 'text-align:left;'
												}												
											]
										}
										, {
											'tds' : [
												{'tag' : 'setViewInfo', 'style' : 'text-align:left;'}
												, {'tag' : 'Spring View 관련 객체를 설정하는 메소드.<br/>'
													 + aComp(setInfo().setAttr('href="javascript:;"')
														 .setTag('ViewInfo Class 정보 보기')
														 .setCls('viewInfoClick')
														 .getData() )
													, 'style' : 'text-align:left;'
												}
											]
										}
										, {
											'tds' : [
												{'tag' : 'setDefaultInfo', 'style' : 'text-align:left;'}
												, {'tag' : '체인 클래스에서 사용 될 기본 정보들을 설정하는 메소드.<br/>'
													 + aComp(setInfo().setAttr('href="javascript:;"')
														 .setTag('DefaultInfo Class 정보 보기')
														 .setCls('defaultInfoClick')
														 .getData() )
													, 'style' : 'text-align:left;'
												}
											]
										}
										, {
											'tds' : [
												{'tag' : 'setRest', 'style' : 'text-align:left;'}
												, {'tag' : 'Rest에 사용될 정보 설정 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'getViewInfo', 'style' : 'text-align:left;'}
												, {'tag' : 'Spring View 관련 객체를 반환하는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'getServletInfo', 'style' : 'text-align:left;'}
												, {'tag' : '서버 객체 정보를 반환하는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'getDefaultInfo', 'style' : 'text-align:left;'}
												, {'tag' : '체인 클래스에서 사용 될 기본 정보들을 반환하는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'excuteNext', 'style' : 'text-align:left;'}
												, {'tag' : '다음 체인 클래스를 실행 시키는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'excute', 'style' : 'text-align:left;'}
												, {'tag' : '체인 클래스가 최초로 실행 되는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'main', 'style' : 'text-align:left;'}
												, {'tag' : '실제 비지니스 로직을 통합적으로 제어 하는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'getPlatformTypeUrl', 'style' : 'text-align:left;'}
												, {'tag' : '플랫폼 정보를 토대로 URL를 변환 하는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'changeCodeCookie', 'style' : 'text-align:left;'}
												, {'tag' : '쿠키에 화면 제어 상태코드 값을 생성 하는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'setRestResCode', 'style' : 'text-align:left;'}
												, {'tag' : '응답 코드을 설정하는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'setRestResParam', 'style' : 'text-align:left;'}
												, {'tag' : '화면에서 제어 할 응답 값을 설정하는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'setRestResSucess', 'style' : 'text-align:left;'}
												, {'tag' : '성공 응답 코드 값을 설정하는 메소드. (0으로 설정)', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'getRestRes', 'style' : 'text-align:left;'}
												, {'tag' : '응답 값을 JSON 형태로 변환 하는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'getRespRestRes', 'style' : 'text-align:left;'}
												, {'tag' : 'Response을 이용하여 응답 해주는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'setRespRedircet', 'style' : 'text-align:left;'}
												, {'tag' : '지정한 URL로 redircet 시켜주는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'setRestResult_redirect', 'style' : 'text-align:left;'}
												, {'tag' : '응답 코드를 가지고 이전 페이지로 redircet 시켜주는 메소드.'
													+ '<br/>응답 코드를 가지고 지정한 URL로 redircet 시켜주는 메소드.'
													+ '<br/>ajax를 체크하여 ajax면 Rest 아니면 페이지 이동.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'setChangeUrl_redirect', 'style' : 'text-align:left;'}
												, {'tag' : '응답 코드를 가지고 이전 페이지로 redircet 시켜주는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'setRespForward', 'style' : 'text-align:left;'}
												, {'tag' : '지정한 URL로 forward 시켜주는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'setRestResult_forward', 'style' : 'text-align:left;'}
												, {'tag' : '응답 코드를 가지고 이전 페이지로 forward 시켜주는 메소드.'
													+ '<br/>응답 코드를 가지고 지정한 URL로 forward 시켜주는 메소드.'
													+ '<br/>ajax를 체크하여 ajax면 Rest 아니면 페이지 이동.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'setChangeUrl_forward', 'style' : 'text-align:left;'}
												, {'tag' : '응답 코드를 가지고 이전 페이지로 forward 시켜주는 메소드.', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'setRestResult_model', 'style' : 'text-align:left;'}
												, {'tag' : '응답 코드를 가지고 지정한 model controller로 이동 시켜주는 메소드.'
													+ '<br/>ajax를 체크하여 ajax면 Rest 아니면 페이지 이동.'
													+ '(해당 메소드를 사용 한 경우에는 서버 컨트롤러 메소드에서 return을 "view"로 해줘야 함.'
													+ 'ViewInfo클래스의 getViewName()메소드에서 별도로 set를 안했으면 기본 값으로 "view"를 리턴 함.)', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'isAjax', 'style' : 'text-align:left;'}
												, {'tag' : 'ajax 통신 여부를 판단하는 메소드.', 'style' : 'text-align:left;'}
											]
										}										
									]									
								}
									
							};

							return panelView(new panelTemplInfo()
								.setTitTag('BizChain Class')
								.setTitCls('glayHeader treeTitle')
								.setPanelId('bizChainClassContent')
								.setPanelAttr('data-parentTreeId="classPanelId" data-treeRender="true"')
								.setConTag([
									divComp(setInfo()
										.setStyle('overflow:hidden;')
										.setTag([
											tableView(new tableTemplInfo().tableRender(descConfig.descImgTable).getData())
											, tableView(new tableTemplInfo().tableRender(descConfig.descTable).getData())
										].join('') )
										.getData() )
									].join('') )
								.getData() );
						}
						/* 클래스 panel Entity Class 컨텐츠 랜더링*/
						, 'classPanel_entity_content' : function() {
							
							var defaultImgTableConfig = function(style, imgSrc) {
								return {
									'table' : {
										'style' : style
									}
									, 'trs' : [
										{
											'tds' : [
												{
													'style' : 'text-align:left;'
													, 'tag' : divComp(setInfo()
														.setStyle('text-align:center;')
														.setTag(imgComp(setInfo()
																.setAttr('src="' + imgSrc + '"')
																.getData() ))
														.getData() )
												}
											]
										}
									]
								};								
							}
							, defaultDescTableConfig = function(style, trs) {
								return {
									'table' : {
										'style' : style
									}
									, 'ths' : [
										{
											'tag' : divComp(setInfo().setStyle('text-align:center;')
													.setTag('메소드 명')
													.getData() )
										}
										, {
											'tag' : divComp(setInfo().setStyle('text-align:center;')
													.setTag('설명')
													.getData() )
										}
									]
									, 'trs' : trs
								};
							}
							, panelRender = function(config, tableConfig) {
								return panelView(new panelTemplInfo()
									.setTitTag(config.title)
									.setTitCls('glayHeader treeTitle')
									.setPanelId(config.id)
									.setPanelAttr('data-parentTreeId="entityClassContent" data-treeRender="true"')
									.setConTag([
										divComp(setInfo()
											.setStyle('overflow:hidden;')
											.setTag([
												tableView(new tableTemplInfo().tableRender(tableConfig.imgTable).getData())
												, tableView(new tableTemplInfo().tableRender(tableConfig.descTable).getData())
											].join('') )
											.getData() )
										].join('') )
									.getData() );								
							};
							
							var servletInfoConfig = {}
								, viewInfoConfig = {}
								, defaultInfoConfig = {};
							
							servletInfoConfig.imgTable = defaultImgTableConfig('width:50%; float:left;', '/resources/img/serverExp/bizLogic/ServletInfo.png');
							servletInfoConfig.descTable = defaultDescTableConfig('width:50%; float:right;', [
								{
									'tds' : [
										{'tag' : 'setReq', 'style' : 'text-align:left;'}
										, {'tag' : 'HttpServletRequest 객체를 설정하는 메소드.', 'style' : 'text-align:left;'}
									]
								}
								, {
									'tds' : [
										{'tag' : 'setRes', 'style' : 'text-align:left;'}
										, {'tag' : 'HttpServletResponse 객체를 설정하는 메소드.', 'style' : 'text-align:left;'}
									]
								}
								, {
									'tds' : [
										{'tag' : 'setPlatformType', 'style' : 'text-align:left;'}
										, {'tag' : '플랫폼의 정보를 설정하는 메소드.', 'style' : 'text-align:left;'}
									]
								}
								, {
									'tds' : [
										{'tag' : 'getReq', 'style' : 'text-align:left;'}
										, {'tag' : 'HttpServletRequest 객체를 반환 하는 메소드.', 'style' : 'text-align:left;'}
									]
								}
								, {
									'tds' : [
										{'tag' : 'getRes', 'style' : 'text-align:left;'}
										, {'tag' : 'HttpServletResponse 객체를 반환 하는 메소드.', 'style' : 'text-align:left;'}
									]
								}
								, {
									'tds' : [
										{'tag' : 'getPlatformType', 'style' : 'text-align:left;'}
										, {'tag' : '플랫폼 정보를 반환 하는 메소드.', 'style' : 'text-align:left;'}
									]
								}
							]);

							viewInfoConfig.imgTable = defaultImgTableConfig('width:50%; float:left;', '/resources/img/serverExp/bizLogic/ViewInfo.png');
							viewInfoConfig.descTable = defaultDescTableConfig('width:50%; float:right;', [
								{
									'tds' : [
										{'tag' : 'setViewName', 'style' : 'text-align:left;'}
										, {'tag' : 'View Name을 설정하는 메소드.(기본 값은 view 문자열로 설정)', 'style' : 'text-align:left;'}
									]
								}
								, {
									'tds' : [
										{'tag' : 'setModel', 'style' : 'text-align:left;'}
										, {'tag' : 'Model 객체를 설정하는 메소드.', 'style' : 'text-align:left;'}
									]
								}
								, {
									'tds' : [
										{'tag' : 'setModelAndView', 'style' : 'text-align:left;'}
										, {'tag' : 'ModelAndView 객체를 설정하는 메소드.', 'style' : 'text-align:left;'}
									]
								}
								, {
									'tds' : [
										{'tag' : 'getViewName', 'style' : 'text-align:left;'}
										, {'tag' : 'View Name 정보를 반환하는 메소드.', 'style' : 'text-align:left;'}
									]
								}
								, {
									'tds' : [
										{'tag' : 'getModel', 'style' : 'text-align:left;'}
										, {'tag' : 'Model 객체를 반환하는 메소드.', 'style' : 'text-align:left;'}
									]
								}
								, {
									'tds' : [
										{'tag' : 'getModelAndView', 'style' : 'text-align:left;'}
										, {'tag' : 'ModelAndView 객체를 반환하는 메소드.', 'style' : 'text-align:left;'}
									]
								}
							]);
							
							defaultInfoConfig.imgTable = defaultImgTableConfig('width:50%; float:left;', '/resources/img/serverExp/bizLogic/DefaultInfo.png');
							defaultInfoConfig.descTable = defaultDescTableConfig('width:50%; float:right;', [
								{
									'tds' : [
										{'tag' : 'setUserInfo', 'style' : 'text-align:left;'}
										, {'tag' : 'UserInfo 객체를 설정하는 메소드.', 'style' : 'text-align:left;'}
									]
								}
								, {
									'tds' : [
										{'tag' : 'getUserInfo', 'style' : 'text-align:left;'}
										, {'tag' : 'UserInfo 객체를 반환하는 메소드.', 'style' : 'text-align:left;'}
									]
								}
							]);
							
							return panelView(new panelTemplInfo()
								.setTitTag('Entity Class')
								.setTitCls('glayHeader treeTitle')
								.setPanelId('entityClassContent')
								.setPanelAttr('data-parentTreeId="classPanelId"')
								.setConTag([
									divComp(setInfo()
										.setTag([
											panelRender({
												'title' : 'ServletInfo'
												, 'id' : 'servletInfoClassContent'
											}, servletInfoConfig)											
											, panelRender({
												'title' : 'ViewInfo'
												, 'id' : 'viewInfooClassContent'
											}, viewInfoConfig)											
											, panelRender({
												'title' : 'DefaultInfo'
												, 'id' : 'defaultInfoClassContent'
											}, defaultInfoConfig)
										].join('') )
										.getData() )
									].join('') )
								.getData() );
							
						}
						/* 체인 설명 panel 컨텐츠 랜더링*/
						, 'chainDescPanelContent' : function() {
							return divComp(setInfo()
								.setTag([
									preComp(setInfo()
										.setTag(codeComp(setInfo()
												.setId('memberRegPostCode')
												.setStyle('width:65%; margin:auto;')
												.setCls('lang-java')
												.setTag(memberRegPostText)
												.getData() ))
										.getData() )
									, '체인을 사용하는 기본적인 구조이며 ViewInfo, ServletInfo, DefaultInfo 클래스들을 이용해서 체인 클래스에서 범용적으로 사용될 정보들을 설정한 후, setNext메소드를 이용하여 체인 클래스들을 연결한다. 그 후 마지막으로 excute메소드를 호출 하여 체인 클래스에 연결된 객체들을 순차적으로 실행하게 된다.<br/>'
									, preComp(setInfo()
										.setTag(codeComp(setInfo()
												.setId('bizChainCode')
												.setStyle('width:65%; margin:auto;')
												.setCls('lang-java')
												.setTag(bizChainText)
												.getData() ))
										.getData() )
									, 'BizChain 클래스의 주요 메소드이며 BizChain 클래스를 상속 받아 구현하게 되면 기본적으로 “기본 구현 메소드”들을 구현 해야 하며 excute메소드는 체인 클래스의 최초 진입점 혹은 최초 호출 해야 할 메소드이며 main메소드는 현 체인 클래스에 비지니스 로직을 처리하는 역할을 담당하게 된다.<br/><br/>'
									, 'excuteNext메소드는 실질적으로 다음 체인 클래스를 실행 시켜주는 메소드이고 다음 체인 클래스가 존재하는지 검증 후, 존재 하게 되면 nextInit메소드를 호출하여 현재 체인 클래스가 가지고 있는 ViewInfo, ServletInfo, DefaultInfo, Rest 정보인 HashMap<String, Object>을 다음 체인 클래스에 설정하게 된다.<br/>'
									, preComp(setInfo()
										.setTag(codeComp(setInfo()
												.setId('memberRegistValidateCode')
												.setStyle('width:65%; margin:auto;')
												.setCls('lang-java')
												.setTag(memberRegistValidateText)
												.getData() ))
										.getData() )
									, '체인 클래스에서 최초 실행 되는 메소드는 excute메소드 이며 오버라이딩된 메소드의 로직 구현은 아래 코드와 같이 구현 해야 한다.<br/>'
									, preComp(setInfo()
										.setTag(codeComp(setInfo()
												.setId('mainCode')
												.setStyle('width:65%; margin:auto;')
												.setCls('lang-java')
												.setTag('if(main())<br/> {<br/> &nbsp; &nbsp; &nbsp; &nbsp; this.excuteNext(this.global_val);<br/> }' )
												.getData() ))
										.getData() )
									, '이전 체인 클래스의 가공된 데이터를 넘겨 받는 부분은 excute메소드이며 넘겨 받은 데이터를 다음 체인 클래스에 설정하기 위해서는 excuteNext 메소드를 이용하여 넘겨주면 된다. 각 체인클래스끼리 공유 될 수 있는 데이터 자료형은 List<Map<String, Object>>, Map<String, Object> 2가지 유형으로 되어있다.<br/><br/>'
									, 'main메소드에는 실질적인 비지니스 로직 처리 코드를 작성하게 되어있다. 규칙으로는 main메소드의 리턴은 boolean이므로 각 비지니스 로직을 메소드 별로 작성하며 로직의 조건이 부합되지 않는 경우 false를 리턴하여 다음 체인을 실행하지 않게 한다.'
								].join(''))
								.getData() );
						}
						/* 체인 클래스 작성 규칙 panel 컨텐츠 랜더링. */
						, 'chainRulePanelContent' : function() {
							var config = {
								'trs' : [
									{
										'tds' : [
											{
												'tag' : '1.  체인 클래스 생성 시 생성자는 빈 생성자를 필수로 작성 해야 한다. 체인 클래스를 객체로 생성해서 사용 시 체인 클래스에 특화된 매개변수를 선언해서 사용하지 않고 쓰기 위함이다.'
												, 'style' : 'text-align:left;'
											}
										]
									}
									, {
										'tds' : [
											{
												'tag' : '2. main메소드에 코드 구현은 메소드로 작성하며 작성된 메소드를 호출해서 사용하는 방식으로 해야 한다.<br/> 비지니스 로직을 메소드 단위로 나누지 않으면 상속 받아 구현하는 클래스에서 재사용이 불가능하므로 모든 비지니스 로직은 메소드 단위로 구현 한다.'
												, 'style' : 'text-align:left;'
											}
										]
									}
									, {
										'tds' : [
											{
												'tag' : '3. DB 작업을 하는 코드는 DB 코드, 해당 DB를 처리하는 비즈니스 로직 처리를 개별적으로 작성 해야한다.<br/> 특히 조회인 경우에는 한 메소드에 DB 조회 및 조회 후 가공 처리를 하게 되면 추후에 해당 메소드의 DB 조회 데이터만 필요한 경우에는 재사용이 불가능한 상황이 생기므로 조회 메소드, 비지니스 로직 처리 메소드를 나눠서 구현해야 한다.'
												, 'style' : 'text-align:left;'
											}
										]
									}
									, {
										'tds' : [
											{
												'tag' : '4. 메소드들을 작성 시에는 전역변수을 사용하더라도 매개변수를 받아서 처리 하는 형태로 되야 한다.<br/>전역변수에 대한 결함성을 낮추고 메소드의 재사용을 높이기 위함이다.'
												, 'style' : 'text-align:left;'
											}
										]
									}									
								]
							};
							
							return tableView(new tableTemplInfo().tableRender(config).getData());
						}
						/* 목적 panel 랜더링. */
						, 'purposePanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(bizLogicLang.purposePanelText)
									.getData() );

							return panelView(new panelTemplInfo()
								.setTitTag(labelTag)
								.setTitCls('treeTitle')
								.setPanelId('purposePanelId')
								.setPanelAttr('data-treeRender="true" data-treeTop="true"')
								.setTitStyle('background-color:#424242; color:white;')
								.setConTag(_tagRender.purposePanelContent() )
								.getData() )				
						}
						/* 적용사항 panel 랜더링. */
						, 'applyPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(bizLogicLang.applyPanelText)
									.getData() );
	
							return panelView(new panelTemplInfo()
								.setTitTag(labelTag)
								.setTitCls('treeTitle')
								.setPanelId('applyPanelId')
								.setPanelAttr('data-treeRender="true" data-treeTop="true"')
								.setTitStyle('background-color:#424242; color:white;')
								.setConTag(_tagRender.applyPanelContent() )
								.getData() );
						}
						/* 구조 panel 랜더링. */
						, 'structPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(bizLogicLang.structPanelText)
									.getData() );
	
							return panelView(new panelTemplInfo()
								.setTitTag(labelTag)
								.setTitCls('treeTitle')
								.setPanelId('structPanelId')
								.setPanelAttr('data-treeRender="true" data-treeTop="true"')
								.setTitStyle('background-color:#424242; color:white;')
								.setConTag(_tagRender.structPanleContent() )
								.getData() );
						}
						/* 클래스 panel 랜더링. */
						, 'classPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(bizLogicLang.classPanelText)
									.getData() );
	
							return panelView(new panelTemplInfo()
								.setTitTag(labelTag)
								.setTitCls('treeTitle')
								.setPanelId('classPanelId')
								.setPanelAttr('data-treeTop="true"')
								.setTitStyle('background-color:#424242; color:white;')
								.setConTag([
									_tagRender.classPanle_class_Content()
									, _tagRender.classPanel_entity_content()
								].join('') )
								.getData() );							
						}
						/* 체인 설명 panel 랜더링. */
						, 'chainDescPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(bizLogicLang.chainDescText)
									.getData() );
	
							return panelView(new panelTemplInfo()
								.setTitTag(labelTag)
								.setTitCls('treeTitle')
								.setPanelId('chainDescPanelId')
								.setPanelAttr('data-treeTop="true" data-treeRender="true"')
								.setTitStyle('background-color:#424242; color:white;')
								.setConTag([
									_tagRender.chainDescPanelContent()
								].join('') )
								.getData() );
						}
						/* 체인 클래스 작성 규칙 panel 랜더링. */
						, 'chainRulePanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(bizLogicLang.chainRuleText)
									.getData() );
	
							return panelView(new panelTemplInfo()
								.setTitTag(labelTag)
								.setTitCls('treeTitle')
								.setPanelId('chainRulePanelId')
								.setPanelAttr('data-treeTop="true" data-treeRender="true"')
								.setTitStyle('background-color:#424242; color:white;')
								.setConTag([
									_tagRender.chainRulePanelContent()
								].join('') )
								.getData() );							
						}
					};
					
					return _tagRender;
				}
				/* 그리드 영역 랜더링. */
				, 'gridRender' : function() {
					var codeViewGrid = new gridTemplInfo()
						, treeViewGrid = new gridTemplInfo()
						, purposeGrid = new gridTemplInfo()
					 	, applyGrid = new gridTemplInfo()
						, structGrid = new gridTemplInfo()
						, classGrid = new gridTemplInfo()
						, chainDescGrid = new gridTemplInfo()
						, chainRuleGrid = new gridTemplInfo();
					
					codeViewGrid
						.setCell([
							codeViewGrid.clsCell().setSize(6).setCellCls('codeView')
							, codeViewGrid.clsCell().setSize(6).setCellCls('controllerCodeView')
						]);

					treeViewGrid
						.setCell([
							treeViewGrid.clsCell().setSize(12).setCellCls('menuTreeView')							
						]);
					
					purposeGrid
						.setCell([
							purposeGrid.clsCell().setSize(12).setCellCls('purposeView')							
						]);
					
					applyGrid
						.setCell([
							purposeGrid.clsCell().setSize(12).setCellCls('applyView')							
						]);

					structGrid
						.setCell([
							structGrid.clsCell().setSize(12).setCellCls('structView')							
						]);

					classGrid
						.setCell([
							classGrid.clsCell().setSize(12).setCellCls('classView')							
						]);

					chainDescGrid
						.setCell([
							chainDescGrid.clsCell().setSize(12).setCellCls('chainDescView')							
						]);

					chainRuleGrid
						.setCell([
							chainRuleGrid.clsCell().setSize(12).setCellCls('chainRuleView')
						]);

					that._val.$content
						.append([
							gridView(codeViewGrid.getData() )
							, gridView(treeViewGrid.getData() )
							, gridView(purposeGrid.getData() )
							, gridView(applyGrid.getData() )
							, gridView(structGrid.getData() )
							, gridView(classGrid.getData() )
							, gridView(chainDescGrid.getData() )
							, gridView(chainRuleGrid.getData() )
						].join(''));

					/* 코드보기 랜더링 */
					_super._render().codeView($('.codeView'), {
						'type' : 'js'
						, 'renderTag' : codeText
					});
	
					_super._render().codeView($('.controllerCodeView'), {
						'type' : 'js'
						, 'panelTitle' : langInfo.commonLang.controllerCodeView
						, 'renderTag' : controllerCodeText
					});						
				}
				/* 그리드 내에 컨텐츠 랜더링. */
				, 'gridContentRender' : function() {
					var _render = render._tagRender();
					
					$('.purposeView').append(_render.purposePanel() );
					$('.applyView').append(_render.applyPanel() );
					$('.structView').append(_render.structPanel() );
					$('.classView').append(_render.classPanel() );
					$('.chainDescView').append(_render.chainDescPanel() );					
					$('.chainRuleView').append(_render.chainRulePanel() );

					highlight.highlightBlock($('#structJavaCode')[0]);
					highlight.highlightBlock($('#memberRegPostCode')[0]);
					highlight.highlightBlock($('#bizChainCode')[0]);
					highlight.highlightBlock($('#memberRegistValidateCode')[0]);
					highlight.highlightBlock($('#mainCode')[0]);
				}
				/* 트리 메뉴 랜더링. */
				, 'menuTreeRender' : function() {
					_super._render().menuTreeRender($('.menuTreeView'), function(e, data) {
						var renderId = data.node.original.renderId;
						
						if(renderId) {
							$.magnificPopup.open({
								'items': {
									'src' : divComp(setInfo()
										.setCls('white-popup')
										.setTag($('#' + renderId).clone().removeAttr('id').wrapAll('<div/>').parent().html() )
										.getData() )
									, 'type': 'inline'
								}
								, 'closeBtnInside': true
							});						
						}
						
					});
				}

			
			};
			
			return $.extend(true, _super, render);
		}
		, eventBind : function() {
			var that = this
				, _super = this._super();
			
			var event = {
				'BizChainClassEvent' : function() {
					$('body').on('click', '.servletInfoClick, .viewInfoClick, .defaultInfoClick', function() {
						var $this = $(this)
							, cls = $this.attr('class')
							, viewId = '';
					
						switch(cls) {
							case 'servletInfoClick' : viewId = 'servletInfoClassContent'; break; 
							case 'viewInfoClick' : viewId = 'viewInfooClassContent'; break;
							case 'defaultInfoClick' : viewId = 'defaultInfoClassContent'; break;
							default : viewId = ''; break;
						}
						
						$.magnificPopup.open({
							'items': {
								'src' : that._val.divComp(that._val.setInfo()
									.setCls('white-popup')
									.setTag($('#' + viewId).clone().removeAttr('id').wrapAll('<div/>').parent().html() )
									.getData() )
								, 'type': 'inline'
							}
							, 'closeBtnInside': true
						});
	
					});

				}
			};
			
			return $.extend(true, _super, event);
		}
	});
	
	return render;
});