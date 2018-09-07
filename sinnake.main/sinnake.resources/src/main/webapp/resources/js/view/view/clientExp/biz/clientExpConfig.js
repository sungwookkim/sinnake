define(['renderInit!'
	, 'jquery'
	, 'jstree'
	, 'magnific'	
	, 'handlebars'
	, 'commUtil'
	, 'lang!clientExp/configLang'
	, 'text!/resources/js/view/view/clientExp/biz/clientExpConfig.js'
	, 'text!/resources/js/controller/clientExp/configController.js'	
], function(renderInit, $, jstree, magnific
		, handlebars, commUtil, langInfo, codeText
		, controllerCodeText) {
	var render = renderInit.extend({
		_val : {}
		, init : function($content) {
			this._super();
			
			var that = this;
			this._val.biz = this.biz();
			this._val.changeCodeNm = "clientExpConfig";
			this._val.$content = $content;
			
			/* 
			 * 본 화면에 타이틀 그리드를 랜더링 하기 위한 config 변수
			 * 지정하고 싶지 않을 땐 변수 선언은 안하면 된다.
			 */
			this._val.titleText = langInfo.configLang.titleText
			
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
			var configLang = langInfo.configLang;
			
			/* 템플릿 컴파일 모음 변수 캐시. */
			var labelComp = this._val.labelComp
				, divComp = this._val.divComp;
			
			/* 컴파일에 필요로한 설정파일 생성 메소드 캐시. */
			var setInfo = this._val.setInfo;
			
			/* 패널 랜더링 템플릿 캐시. */
			var panelView = this._val.panelView
				, panelTemplInfo = this._val.panelTemplInfo;

			/* 테이블 랜더링 템플릿 캐시. */			
			var tableView = this._val.tableView
				, tableTemplInfo = this._val.tableTemplInfo;

			/*그리드 랜더링 템플릿 캐시.*/
			var gridView = this._val.gridView
				, gridTemplInfo = this._val.gridTemplInfo;
			
			var render = {
				/* 키 이름 앞에 _가 붙으면 자동 실행이 안됨. */
				'_tagRender' : function() {				
					var _tagRender = {
						/* lib 패널 컨텐츠 랜더링 */
						'libConfigContent' : function() {
							var contentInfo = {
								'table' : {
									'cls' : 'width100Per'
								}
								, 'ths' : [
									{
										'tag' : divComp(setInfo().setStyle('text-align:center;')
													.setTag('이름')
													.getData() )
									}
									, {
										'tag' : divComp(setInfo().setStyle('text-align:center;')
													.setTag('버전')
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
											{'tag' : 'extends', 'style' : 'text-align:left;'}
											, {'tag' : '', 'style' : 'text-align:left;'}
											, {'tag' : '자바스크립트 클래스 관련 라이브러리', 'style' : 'text-align:left;'}
										]
									}
									, {
										'tds' : [
											{'tag' : 'handlebars', 'style' : 'text-align:left;'}
											, {'tag' : '4.0.11', 'style' : 'text-align:left;'}
											, {'tag' : '자바스크립트 템플릿 라이브러리', 'style' : 'text-align:left;'}
										]
									}
									, {
										'tds' : [
											{'tag' : 'jquery', 'style' : 'text-align:left;'}
											, {'tag' : '1.12.1', 'style' : 'text-align:left;'}
											, {'tag' : 'jquery 라이브러리', 'style' : 'text-align:left;'}
										]
									}
									, {
										'tds' : [
											{'tag' : 'jquery.cookie', 'style' : 'text-align:left;'}
											, {'tag' : '1.4.1', 'style' : 'text-align:left;'}
											, {'tag' : 'jquery cookie 라이브러리', 'style' : 'text-align:left;'}
										]
									}
									, {
										'tds' : [
											{'tag' : 'jquery.validate', 'style' : 'text-align:left;'}
											, {'tag' : '1.17.0', 'style' : 'text-align:left;'}
											, {'tag' : 'jquery validate 라이브러리', 'style' : 'text-align:left;'}
										]
									}
									, {
										'tds' : [
											{'tag' : 'jstree', 'style' : 'text-align:left;'}
											, {'tag' : '3.3.5', 'style' : 'text-align:left;'}
											, {'tag' : 'jquery 트리 메뉴 라이브러리', 'style' : 'text-align:left;'}
										]
									}
									, {
										'tds' : [
											{'tag' : 'lightbox', 'style' : 'text-align:left;'}
											, {'tag' : '2.10.0', 'style' : 'text-align:left;'}
											, {'tag' : 'jquery lightbox 라이브러리', 'style' : 'text-align:left;'}
										]
									}
									, {
										'tds' : [
											{'tag' : 'magnific-popup', 'style' : 'text-align:left;'}
											, {'tag' : '1.1.0', 'style' : 'text-align:left;'}
											, {'tag' : 'jquery lightbox & dialog 라이브러리', 'style' : 'text-align:left;'}
										]
									}
									, {
										'tds' : [
											{'tag' : 'material-design-lite', 'style' : 'text-align:left;'}
											, {'tag' : '1.3.0', 'style' : 'text-align:left;'}
											, {'tag' : 'css 라이브러리', 'style' : 'text-align:left;'}
										]
									}
									, {
										'tds' : [
											{'tag' : 'highlight', 'style' : 'text-align:left;'}
											, {'tag' : '9.12.0', 'style' : 'text-align:left;'}
											, {'tag' : '소스 하이라이트 라이브러리', 'style' : 'text-align:left;'}
										]
									}									
									, {
										'tds' : [
											{'tag' : 'requireJS', 'style' : 'text-align:left;'}
											, {'tag' : '2.3.3', 'style' : 'text-align:left;'}
											, {'tag' : 'AMD 라이브러리', 'style' : 'text-align:left;'}
										]
									}
									, {
										'tds' : [
											{'tag' : 'domReady', 'style' : 'text-align:left;'}
											, {'tag' : '2.0.1', 'style' : 'text-align:left;'}
											, {'tag' : 'require domReady 플러그인', 'style' : 'text-align:left;'}
										]
									}
									, {
										'tds' : [
											{'tag' : 'hbs', 'style' : 'text-align:left;'}
											, {'tag' : '', 'style' : 'text-align:left;'}
											, {'tag' : 'require handlebars 관련 플러그인', 'style' : 'text-align:left;'}
										]
									}
									, {
										'tds' : [
											{'tag' : 'text', 'style' : 'text-align:left;'}
											, {'tag' : '2.0.15', 'style' : 'text-align:left;'}
											, {'tag' : 'require text 관련 플러그인', 'style' : 'text-align:left;'}
										]
									}

								]
							};
							
							return tableView(new tableTemplInfo().tableRender(contentInfo).getData());
						}
						/* require 자체 플러그인 컨텐츠 랜더링*/
						,'reqPluginContent' : function() {
							var contentInfo = {
									'table' : {
										'cls' : 'width100Per'
									}
									, 'ths' : [
										{
											'tag' : divComp(setInfo().setStyle('text-align:center;')
														.setTag('이름')
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
												{'tag' : 'lang', 'style' : 'text-align:left;'}
												, {'tag' : '다국어 관련 정보 플러그인', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'render', 'style' : 'text-align:left;'}
												, {'tag' : 'content 관련 플러그인', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'templates', 'style' : 'text-align:left;'}
												, {'tag' : '템플릿 관련 플러그인', 'style' : 'text-align:left;'}
											]
										}
									]
								};
							
							return tableView(new tableTemplInfo().tableRender(contentInfo).getData());
						}
						/* util 컨텐츠 랜더링*/
						, 'utilContent' : function() {
							var contentInfo = {
									'table' : {
										'cls' : 'width100Per'
									}
									, 'ths' : [
										{
											'tag' : divComp(setInfo().setStyle('text-align:center;')
														.setTag('이름')
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
												{'tag' : 'helper', 'style' : 'text-align:left;'}
												, {'tag' : 'handlebars 관련 helper 유틸', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'obj', 'style' : 'text-align:left;'}
												, {'tag' : '객체 관련 유틸', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'server', 'style' : 'text-align:left;'}
												, {'tag' : 'server 관련 유틸', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'str', 'style' : 'text-align:left;'}
												, {'tag' : '문자열 관련 유틸', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'validate', 'style' : 'text-align:left;'}
												, {'tag' : 'validate 관련 유틸', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'commUtil', 'style' : 'text-align:left;'}
												, {'tag' : '모든 유틸을 관제', 'style' : 'text-align:left;'}
											]
										}										
									]
								};
							
							return tableView(new tableTemplInfo().tableRender(contentInfo).getData());
						}
						/* 템플릿 컨텐츠 랜더링*/
						, 'templatesContent' : function() {
							var contentInfo = {
									'table' : {
										'cls' : 'width100Per'
									}
									, 'ths' : [
										{
											'tag' : divComp(setInfo().setStyle('text-align:center;')
														.setTag('이름')
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
												{'tag' : 'footer', 'style' : 'text-align:left;'}
												, {'tag' : 'footer 관련 템플릿', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'grid', 'style' : 'text-align:left;'}
												, {'tag' : 'grid 관련 템플릿', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'main', 'style' : 'text-align:left;'}
												, {'tag' : 'main 관련 템플릿', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'menu', 'style' : 'text-align:left;'}
												, {'tag' : 'menu 관련 템플릿', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'panel', 'style' : 'text-align:left;'}
												, {'tag' : 'panel 관련 템플릿', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{'tag' : 'table', 'style' : 'text-align:left;'}
												, {'tag' : 'table 관련 템플릿', 'style' : 'text-align:left;'}
											]
										}										
									]
								};
							
							return tableView(new tableTemplInfo().tableRender(contentInfo).getData());							
						}
						/* lib 패널 랜더링 */
						, 'libConfigPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(configLang.panelMajorLibText)
									.getData() );

							return panelView(new panelTemplInfo()
								.setPanelId('libPanelId')
								.setTitCls('treeTitle')
								.setTitTag(labelTag)
								.setTitStyle('background-color:#424242; color:white;')
								.setPanelAttr('data-treeRender="true" data-treeTop="true"')
								.setConTag(_tagRender.libConfigContent())
								.getData() );
						}
						/* require 자체 플러그인 패널 랜더링*/
						, 'reqPluginPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(configLang.reqPluginText)
									.getData() );

							return panelView(new panelTemplInfo()
								.setPanelId('reqPluginPanelId')
								.setTitCls('treeTitle')
								.setTitTag(labelTag)
								.setTitStyle('background-color:#424242; color:white;')
								.setPanelAttr('data-treeRender="true" data-treeTop="true"')
								.setConTag(_tagRender.reqPluginContent())
								.getData() );
						}
						/* util 패널 랜더링*/
						, 'utilPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(configLang.utilText)
									.getData() );

							return panelView(new panelTemplInfo()
								.setPanelId('utilId')
								.setTitCls('treeTitle')
								.setTitTag(labelTag)
								.setTitStyle('background-color:#424242; color:white;')
								.setPanelAttr('data-treeRender="true" data-treeTop="true"')
								.setConTag(_tagRender.utilContent())
								.getData() );
						}
						/* 템플릿 패널 랜더링*/
						, 'templatesPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(configLang.templatesText)
									.getData() );

							return panelView(new panelTemplInfo()
								.setPanelId('templatesId')
								.setTitCls('treeTitle')
								.setTitTag(labelTag)
								.setTitStyle('background-color:#424242; color:white;')
								.setPanelAttr('data-treeRender="true" data-treeTop="true"')
								.setConTag(_tagRender.templatesContent())
								.getData() );
						}
					};
					
					return _tagRender;
				}
				/* 그리드 영역 랜더링. */
				, 'gridRender' : function() {
					var codeViewGrid = new gridTemplInfo()
						, treeViewGrid = new gridTemplInfo()
						, libGrid = new gridTemplInfo()
						, reqPluginGrid = new gridTemplInfo()
						, utilGrid = new gridTemplInfo()
						, templatesGrid = new gridTemplInfo();
					
					
					codeViewGrid
						.setCell([
							codeViewGrid.clsCell().setSize(6).setCellCls('codeView')
							, codeViewGrid.clsCell().setSize(6).setCellCls('controllerCodeView')
						]);

					treeViewGrid
						.setCell([
							treeViewGrid.clsCell().setSize(12).setCellCls('menuTreeView')							
						]);
					
					libGrid
						.setCell([
							libGrid.clsCell().setSize(12).setCellCls('libConfig')
						]);
					
					reqPluginGrid
						.setCell([
							reqPluginGrid.clsCell().setSize(12).setCellCls('reqPlugin')
						]);					
					
					utilGrid
						.setCell([
							utilGrid.clsCell().setSize(12).setCellCls('util')
						]);

					templatesGrid
						.setCell([
							templatesGrid.clsCell().setSize(12).setCellCls('templates')
						]);

					that._val.$content
						.append([
							gridView(codeViewGrid.getData() )
							, gridView(treeViewGrid.getData() )
							, gridView(libGrid.getData() )
							, gridView(reqPluginGrid.getData() )
							, gridView(utilGrid.getData() )
							, gridView(templatesGrid.getData() )
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
				/* 그리드 영역 컨텐츠 랜더링. */
				, 'contentRender' : function() {
					var _render = render._tagRender();

					$('.libConfig').append(_render.libConfigPanel());
					$('.reqPlugin').append(_render.reqPluginPanel());
					$('.util').append(_render.utilPanel());
					$('.templates').append(_render.templatesPanel());
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
					
			};
			
			return $.extend(true, _super, event);
			
		}
	});
	
	return render;
});