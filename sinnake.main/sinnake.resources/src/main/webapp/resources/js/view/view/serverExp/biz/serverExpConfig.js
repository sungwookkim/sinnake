define(['renderInit!'
	, 'jquery'
	, 'handlebars'
	, 'commUtil'
	, 'lang!serverExp/configLang'
	, 'text!/resources/js/view/view/serverExp/biz/serverExpConfig.js'
	, 'text!/resources/js/controller/serverExp/configController.js'
], function(renderInit, $, handlebars, commUtil, langInfo, codeText, controllerCodeText) {
	var render = renderInit.extend({
		_val : {}
		, init : function($content) {
			this._super();
			
			var that = this;
			this._val.biz = this.biz();
			this._val.changeCodeNm = "serverExpConfig";
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
			var tabelVeiw = this._val.tableView
				, tableTemplInfo = this._val.tableTemplInfo;

			/*그리드 랜더링 템플릿 캐시.*/
			var gridView = this._val.gridView
				, gridTemplInfo = this._val.gridTemplInfo;
			
			var render = {
				/* 키 이름 앞에 _가 붙으면 자동 실행이 안됨. */
				'_tagRender' : function() {
					var _tagRender = {
						/* 해당 컨텐츠에 테이블 공통 랜더링 메소드. */
						'commonTableRender' : function(paramConfig) {
							/* 테이블 랜더링 정보 변수. */
							var table = new tableTemplInfo();								

							var config = {
								'thCls' : 'textAlignCenter'
								, 'thDivStyle' : 'font-weight: bold;'
								, 'thStyle' : 'background-color:gainsboro;'
								, 'tableId' : ''
								, 'tableCls' : 'width100Per'
								, 'trs' : []
							}

							config = $.extend(true, config, paramConfig);
							
							/* th 컨텐츠 태그에 기본 속성 설정 변수. */
							var clsTh = table.clsTh
								, thSetInfo = setInfo()
									.setCls(config.thCls)
									.setStyle(config.thDivStyle);
							
							/* 테이블 내 th 태그 랜더링 정보 설정. */
							table.setTableId(config.tableId)
								.setTableCls(config.tableCls)
								.setThs([
									clsTh()
										.setThStyle(config.thStyle)
										.setThText(divComp(thSetInfo.setTag(configLang.thAppText).getData() ))										
									, clsTh()
										.setThStyle(config.thStyle)
										.setThText(divComp(thSetInfo.setTag(configLang.thVerText).getData() ))
								]);

							/* 위 랜더링 정보들로 템플릿을 이용하여 태그 생성. */
							return tabelVeiw(table
									.setTrs(table.util().trRender(config.trs))
									.getData() );
						}
						/* server 패널 컨텐츠 랜더링 */
						, 'serverConfigContent' : function() {
							/* td 컨텐츠 태그에 기본 속성 설정 변수. */
							var tdSetInfo = setInfo()
								.setCls('textAlignLeft');
							
							return _tagRender.commonTableRender({
								'tableId' : 'serverConfigContent'
								, 'trs' : 
									/* tr 태그 정보 변수.*/
									[{ 
										'app' : divComp(tdSetInfo.setTag(configLang.trNginxText).getData())
										, 'ver' : divComp(tdSetInfo.setTag('1.10.2').getData()) 
									}
									, { 
										'app' : divComp(tdSetInfo.setTag(configLang.trTomcatText).getData())								
										, 'ver' : divComp(tdSetInfo.setTag('8.5.9').getData())
									}
									, { 
										'app' : divComp(tdSetInfo.setTag(configLang.trSpringText).getData())
										, 'ver' : divComp(tdSetInfo.setTag('4.3.5').getData()) 
									}					
									, { 
										'app' : divComp(tdSetInfo.setTag(configLang.trJavaText).getData()) 
										, 'ver' : divComp(tdSetInfo.setTag('1.8.10').getData()) 
									}]
							});
						}
						/* db 패널 컨텐츠 랜더링 */
						, 'dbConfigContent' : function() {
							/* td 컨텐츠 태그에 기본 속성 설정 변수. */
							var tdSetInfo = setInfo()
								.setCls('textAlignLeft');
							
							return _tagRender.commonTableRender({
								'tableId' : 'dbConfigContent'
								, 'trs' : 
									/* tr 태그 정보 변수.*/
									[{ 
										'app' : divComp(tdSetInfo.setTag(configLang.trMySQLText).getData())
										, 'ver' : divComp(tdSetInfo.setTag('5.7').getData()) 
									}]
							});
						}
						/* lib 패널 컨텐츠 랜더링 */
						, 'libConfigContent' : function() {
							/* td 컨텐츠 태그에 기본 속성 설정 변수. */
							var tdSetInfo = setInfo()
								.setCls('textAlignLeft');
							
							return _tagRender.commonTableRender({
								'tableId' : 'libConfigContent'
								, 'trs' : 
									/* tr 태그 정보 변수.*/
									[{ 
										'app' : divComp(tdSetInfo.setTag(configLang.trSpringSecText).getData())
										, 'ver' : divComp(tdSetInfo.setTag('4.2.3').getData()) 
									}
									, { 
										'app' : divComp(tdSetInfo.setTag(configLang.trESAPIText).getData())
										, 'ver' : divComp(tdSetInfo.setTag('2.1.0').getData()) 
									}]
							});
						}						
						/* server 패널 랜더링 */
						, 'serverConfigPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(configLang.panelServerText)
									.getData() );

							return panelView(new panelTemplInfo()
								.setTitTag(labelTag)
								.setTitStyle('background-color:#424242; color:white;')
								.setConTag(_tagRender.serverConfigContent())
								.getData()
							);
						}
						/* db 패널 랜더링 */
						, 'dbConfigPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(configLang.panelDBTest)
									.getData() );

							return panelView(new panelTemplInfo()
								.setTitTag(labelTag)
								.setTitStyle('background-color:#424242; color:white;')
								.setConTag(_tagRender.dbConfigContent())
								.getData()
							);							
						} 
						/* lib 패널 랜더링 */
						, 'libConfigPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(configLang.panelMajorLibText)
									.getData() );

							return panelView(new panelTemplInfo()
								.setTitTag(labelTag)
								.setTitStyle('background-color:#424242; color:white;')
								.setConTag(_tagRender.libConfigContent())
								.getData()
							);							
						} 						
					};
					
					return _tagRender;
				}
				/* 그리드 영역 랜더링. */
				, 'gridRender' : function() {
					var contentGrid = new gridTemplInfo()
						, codeViewGrid = new gridTemplInfo()
						, libGrid = new gridTemplInfo();
					
					codeViewGrid
						.setCell([
							codeViewGrid.clsCell().setSize(6).setCellCls('codeView')
							, codeViewGrid.clsCell().setSize(6).setCellCls('controllerCodeView')
						]);
					
					contentGrid
						.setCell([
							contentGrid.clsCell().setSize(6).setCellCls('serverConfig')
							, contentGrid.clsCell().setSize(6).setCellCls('dbConfig')
						]);

					libGrid
						.setCell([
							libGrid.clsCell().setSize(12).setCellCls('libConfig')
						]);
					
					that._val.$content
						.append([
							gridView(codeViewGrid.getData() )
							, gridView(contentGrid.getData() )
							, gridView(libGrid.getData() )
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
					
					$('.serverConfig').append(_render.serverConfigPanel());
					$('.dbConfig').append(_render.dbConfigPanel());
					$('.libConfig').append(_render.libConfigPanel());
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