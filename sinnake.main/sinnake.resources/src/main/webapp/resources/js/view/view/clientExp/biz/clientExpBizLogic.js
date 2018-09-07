define(['renderInit!'
	, 'jquery'
	, 'highlight'
	, 'jstree'
	, 'magnific'	
	, 'handlebars'
	, 'commUtil'
	, 'lang!clientExp/bizLogicLang'

	, 'text!/resources/js/view/view/clientExp/biz/clientExpBizLogic.js'
	, 'text!/resources/js/controller/clientExp/bizLogicController.js'
	, 'text!/resources/js/view/view/clientExp/biz/exp/view.html'
	, 'text!/resources/js/view/commBiz/renderInit.js'
], function(renderInit, $, highlight, jstree
		, magnific, handlebars, commUtil, langInfo
		, codeText, controllerCodeText, viewText
		, renderInitText) {

	var render = renderInit.extend({
		_val : {}
		, init : function($content) {
			this._super();
			
			this._val.biz = this.biz();
			this._val.changeCodeNm = 'clientExpBizLogic';
			this._val.$content = $content;
			
			/* 
			 * 본 화면에 타이틀 그리드를 랜더링 하기 위한 config 변수
			 * 지정하고 싶지 않을 땐 변수 선언은 안하면 된다.
			 */
			this._val.titleText = langInfo.bizLogicLang.titleText;
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

			var render = {
				'_tagRender' : function() {
					var _tagRender = {
						'_codeView' : function(code, cls) {
							return divComp(setInfo()
									.setStyle('width:70%; margin:auto;')
									.setTag(preComp(setInfo()
											.setCls('templatePluginCodeView ' + cls)
											.setTag(codeComp(setInfo()
													.setTag(code.replace(/</gi, '&lt;').replace(/>/gi, '&gt;'))
													.getData() ))
											.getData() ))
									.getData() );
						}
						/* 컨트롤러 구조 컨텐츠 랜더링.*/
						, 'controllerContent' : function() {
							var javaControllerArr = [];

							javaControllerArr.push('@RequestMapping(value = "/example", method = RequestMethod.GET) \n');
							javaControllerArr.push('public String example(HttpServletRequest req, Model model) throws Exception { \n');
							javaControllerArr.push('	model.addAttribute("jsController", "controller/example/example"); \n');
							javaControllerArr.push('\n');
							javaControllerArr.push('	// ViewInfo객체의 getViewName메소드는 기본 값으로 "view"문자을 반환함. \n');
							javaControllerArr.push('	return new ViewInfo().getViewName(); \n');
							javaControllerArr.push('\n');
							javaControllerArr.push('	/* \n');
							javaControllerArr.push('		혹은 아래와 같이 view 문자열을 리턴 하여도 됨. \n');
							javaControllerArr.push('		return "view"; \n');
							javaControllerArr.push('	*/ \n');
							javaControllerArr.push('\n ');
							javaControllerArr.push('} \n');
							
							return [
								panelView(new panelTemplInfo()
									.setTitCls('glayHeader treeTitle')
									.setTitTag('자바 컨트롤러 작성 방법')
									.setConTag([
										_tagRender._codeView(javaControllerArr.join(''), 'java')
										, '자바 컨트롤러에서 필수로 해야 될 사항은 model에 jsController키 값으로 자바스크립트 측 컨트롤러의 주소를 값으로 입력해야 한다.'
									].join(''))
									.getData() )
							].join('');
						}
						/* 리소스 구조 컨텐츠 랜더링. */
						, 'resourcesContent' : function() {
							var resourcesPanelGrid = new gridTemplInfo();

							var resourcesPanelTag = panelView(new panelTemplInfo()
									.setTitTag('resources')
									.setTitCls('glayHeader treeTitle')
									.setPanelId('resources_content_id')
									.setPanelAttr('data-parentTreeId="resourcesId" data-treeRender="true"')
									.setConTag(gridView(resourcesPanelGrid
											.setCell([
												resourcesPanelGrid.clsCell().setSize(6).setCellCls('resources_img_struct').setTag(
													divComp(setInfo()
														.setStyle('text-align:center;')
														.setTag(imgComp(setInfo()
																.setAttr('src=/resources/img/clientExp/bizLogic.PNG')
																.getData() ))
														.getData() ))
												, resourcesPanelGrid.clsCell().setSize(6).setCellCls('resources_struct').setTag(
													[
														divComp(setInfo()
															.setStyle('text-align:center;')
															.setTag(imgComp(setInfo()
																	.setAttr('src=/resources/img/clientExp/resources_struct.png')
																	.getData() ))
															.getData() )
														, '기본적으로 controller 코드 내에서 lang플러그인을 이용해서 lang폴더 내에 있는 코드와 render플러그인을 이용해서 biz폴더 내에 있는 코드들을 불러드려 활용한다.'
													].join('') )
											])
											.getData() ))
									.getData() )
								, controllerPanelTag = panelView(new panelTemplInfo()
									.setTitTag('controller')
									.setTitCls('glayHeader treeTitle')
									.setPanelId('controller_content_id')
									.setPanelAttr('data-parentTreeId="resourcesId" data-treeRender="true"')
									.setConTag([
										_tagRender._codeView([
											 "require(['jquery' \n"
											, "	, 'templates!main/main' \n"
											, "	, 'templates!footer/mainFooter' \n"
											, "	, 'render!home/biz/home'] \n"
											, "	, function($, commUtil, main, footer, renderObj) { \n"
											, "		// 왼쪽 최상단 햄버거 메뉴의 상세메뉴 설정. \n"
											, "		$('body').append(main.view(main.templInfo.getInfo('main'))); \n"
											, " \n"
											, "		/* \n"
											, "			화면 구성 및 제어 객체 호출 \n"
											, "			해당 객체에서 화면의 전체적인 랜더링과 그에 따른 제어 로직이 있음. \n"
											, "		*/ \n"
											, "		new renderObj($('.pageContent')).call(); \n"
											, "		 \n"
											, "		// footer 영역 랜더링. \n"
											, "		$('.pageFooter').append(footer.view(footer.templInfo)); \n"
											, " \n"
											, "		commUtil.viewComp(); \n"
											, "	} \n"
											, "); \n"
										].join(''), 'js')
										, 'controller폴더는 controller에 해당 하는 영역이다.</br>'
										, 'render플러그인을 이용해서 biz폴더 내에 있는 코드들을 불러드린다.'
									].join('') )
									.getData() )
								, langPanelTag = panelView(new panelTemplInfo()
									.setTitTag('lang')
									.setTitCls('glayHeader treeTitle')
									.setPanelId('lang_content_id')
									.setPanelAttr('data-parentTreeId="resourcesId" data-treeRender="true"')
									.setConTag([
										_tagRender._codeView([
											"define([], function() { \n"
											, "	return { \n"
											, "		'ko' : { \n"
											, "			'titleText' : '클라이언트 개발방법' \n"
											, "			, 'resourcesText' : '리소스 구조' \n"
											, "			, 'controllerText' : '컨트롤러 구조' \n"
											, "		} \n"
											, "		,'en' : { \n"
											, "			'titleText' : 'Client Develoment Method' \n"
											, "			, 'resourcesText' : 'Resources Struct' \n"
											, "			, 'controllerText' : 'Controller Struct' \n"
											, "		} \n"
											, "	} \n"
											, "}); \n"
										].join(''), 'js')
										, 'lang폴더는 다국어 관련 위한 영역이다.</br>'
										, '객체 리터럴를 반환 해야 하며 키 값은 표현 하고자 하는 국가 표시가 되어야 한다.'
									].join('') )
									.getData() )
								, bizPanelTag = panelView(new panelTemplInfo()
									.setTitTag('biz')
									.setTitCls('glayHeader treeTitle')
									.setPanelId('biz_content_id')
									.setPanelAttr('data-parentTreeId="resourcesId" data-treeRender="true"')
									.setConTag([
										_tagRender._codeView(renderInitText, 'js')
										, '모든 biz영역에 들어가는 코드들은 위 renderInit클래스를 상속 받아 구현 해야 한다.</br>'
										, _tagRender._codeView([
											"define(['renderInit!' \n"
											, "	, 'jquery' \n"
											, "	, 'handlebars' \n"
											, "	, 'commUtil' \n"
											, "	, 'lang!clientExp/bizLogicLang' \n"
											, "], function(renderInit, $, handlebars, commUtil, langInfo) { \n"
											, "	var render = renderInit.extend({ \n"
											, "		_val : {} \n"
											, "		, init : function($content) { \n"
											, "			this._super(); \n"
											, " \n"
											, "			this._val.biz = this.biz(); \n"
											, " \n"											
											, "			//해당 값은 유니크한 값이여야 한다. \n"
											, "			this._val.changeCodeNm = 'clientExpBizLogic'; \n"
											, "			this._val.$content = $content; \n"
											, "	 \n"
											, "			/*  \n"
											, "			 * 본 화면에 타이틀 그리드를 랜더링 하기 위한 config 변수 \n"
											, "			 * 지정하고 싶지 않을 땐 변수 선언은 안하면 된다. \n"
											, "			 */ \n"
											, "			this._val.titleText = langInfo.bizLogicLang.titleText; \n"
											, "		} \n"
											, "		, biz : function() { \n"
											, "			var that = this \n"
											, "				, _super = this._super(); \n"
											, "	 \n"
											, "			var biz = {}; \n"
											, "	 \n"
											, "			return $.extend(true, _super, biz); \n"
											, "		} \n"
											, "		, render : function() { \n"
											, "			var that = this \n"
											, "				, _super = this._super(); \n"
											, "  \n"
											, "			var render = {}; \n"
											, "  \n"			
											, "			return $.extend(true, _super, render); \n"
											, "		} \n"
											, "		, eventBind : function() { \n"
											, "			var that = this \n"
											, "				, _super = this._super(); \n"
											, "	 \n"
											, "			var eventBind = {}; \n"
											, "  \n"
											, "			return $.extend(true, _super, eventBind); \n"
											, "		} \n"
											, "	}); \n"
											, " \n"
											, "	return render; \n"
											, "}); \n"
										].join(''), 'js')
										, 'renderInit를 상속 받아 구현하는 클래스는 위와 같이 기본적인 코드형태를 갖춰야한다.</br>'
										, '각 메소드 영역 안에서 this._super()를 호출하게 되면 해당 메소드와 동일한 이름을 가진 부모 메소드가 호출 되게 된다.</br>'
										, 'biz 메소드 영역은 비지니스 로직과 관련된 코드들을 작성한다.</br>'
										, 'render 메소드 영역은 화면의 랜더링과 관련된 코드들을 작성한다.</br>'
										, 'eventBind 메소드 영역은 태그들을 이벤트 바인드 및 핸들링 관련된 코드들을 작성한다.</br>'
										, '각 영역의 리턴 값은 필히 객체 리터럴이여야 한다.</br></br>'
										, '이와 같이 구현하고 controller에서 호출하여 사용 할때는 </br>'
										, _tagRender._codeView("new renderObj($('.pageContent')).call();", 'js')
										, '객체를 생성하고 call메소드를 필히 호출 하여야 한다.</br>'
										, 'call메소드에서는 biz영역을 제외한 render, eventBind영역에서 리턴한 객체리터럴의 모든 메소드들을 자동으로 실행시켜준다.</br>'
										, '단, 메소드가 아닌 값, 키 이름 맨 처음에 _가 붙은 경우, 키 이름이 eventCall인 경우에는 자동 실행에 제외된다.' 
										
										
									].join('') )
									.getData() );  
							
							return [
									resourcesPanelTag	
									, controllerPanelTag
									, langPanelTag
									, bizPanelTag
								].join('');
						}
						/* controller 구조 panel 랜더링. */
						, 'controllerPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(bizLogicLang.controllerText)
									.getData() );
	
							return panelView(new panelTemplInfo()
								.setTitTag(labelTag)
								.setTitCls('treeTitle')
								.setPanelId('controllerId')
								.setPanelAttr('data-treeTop="true" data-treeRender="true"')
								.setTitStyle('background-color:#424242; color:white;')
								.setConTag([
									_tagRender.controllerContent()
								].join('') )
								.getData() );
						}
						/* 리소스 구조 panel 랜더링. */
						, 'resourcesPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(bizLogicLang.resourcesText)
									.getData() );
	
							return panelView(new panelTemplInfo()
								.setTitTag(labelTag)
								.setTitCls('treeTitle')
								.setPanelId('resourcesId')
								.setPanelAttr('data-treeTop="true"')
								.setTitStyle('background-color:#424242; color:white;')
								.setConTag([
									_tagRender.resourcesContent()
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
						, resourcesViewGrid = new gridTemplInfo()
						, controllerViewGrid = new gridTemplInfo();
					
					codeViewGrid
						.setCell([
							codeViewGrid.clsCell().setSize(6).setCellCls('codeView')
							, codeViewGrid.clsCell().setSize(6).setCellCls('controllerCodeView')
						]);

					treeViewGrid
						.setCell([
							treeViewGrid.clsCell().setSize(12).setCellCls('menuTreeView')							
						]);
					
					resourcesViewGrid
						.setCell([
							resourcesViewGrid.clsCell().setSize(12).setCellCls('resourcesView')
						]);

					controllerViewGrid
						.setCell([
							controllerViewGrid.clsCell().setSize(12).setCellCls('controllerView')
						]);

					that._val.$content
						.append([
							gridView(codeViewGrid.getData() )
							, gridView(treeViewGrid.getData() )
							, gridView(resourcesViewGrid.getData() )
							, gridView(controllerViewGrid.getData() )
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
					
					$('.resourcesView').append(_render.resourcesPanel() );
					$('.controllerView').append(_render.controllerPanel() )

					var $templatePluginCodeView = $('.templatePluginCodeView');
					for(var i = 0, len = $templatePluginCodeView.length; i < len; i++) {
						highlight.highlightBlock($templatePluginCodeView[i]);
					}
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
	
			var eventBind = {
					
			};
			
			return $.extend(true, _super, eventBind);			
		}
	});

	return render;
});