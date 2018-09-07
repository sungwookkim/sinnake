define(['extends'
	, 'jquery'
	, 'highlight'
	, 'commUtil'
	, 'lang!'
	, 'defaultTag'
	, 'templates!grid/grid'
	, 'templates!panel/panel'
	, 'templates!table/table']
, function(cls, $, highlight, commUtil, langInfo, defaultTag, gridTempl, panelTempl, tableTempl) {	
	return {
		load : function(name, parentRequire, onload, config) {			
			var _getChangeCode = function(changeCodeNm) {
				var changeCode = $.cookie(changeCodeNm);

				if(changeCode != undefined) {
					$.cookie(changeCodeNm, null, {'path' : '/', 'expires' : -1});
					return changeCode;
				}
				
				return '';
			};
			
			var renderInit = Class.extend({
				_val : {}
				, _init : function() {
					var that = this;

					return {
						'changeCodeNm' : 'changeCodeNm'
						, 'initMsgCallback' : function() {
							that._val.biz.resBizProc(_getChangeCode(that._val.changeCodeNm + '_changeCode'));
						}
						, 'respOption' : {
							'-0000' : function() {
								var commonLang = langInfo.commonLang;
								
								alert(commonLang.locked_error_text  + ' [-0000]');
							}
							, '-0001' : function() {
								var commonLang = langInfo.commonLang;
								
								alert(commonLang.login_fail_text  + ' [-0001]');								
							}
							, '-0002' : function() {
								var commonLang = langInfo.commonLang;
								
								alert(commonLang.accessDenied_error_cont_text  + ' [-0002]');								
							}
							, '-0003' : function() {
								var commonLang = langInfo.commonLang;
								
								alert(commonLang.disabled_error_text  + ' [-0003]');								
							}					 	
							, '-0004' : function() {
								var commonLang = langInfo.commonLang;
								
								alert(commonLang.accountExpired_error_text  + ' [-0004]');								
							}
							, '-0005' : function() {
								var commonLang = langInfo.commonLang;
								
								alert(commonLang.credentialsExpired_error_text  + ' [-0005]');
							}
							, '-0006' : function() {
								var commonLang = langInfo.commonLang;
								
								alert(commonLang.missingCsrfToken_error_text  + ' [-0006]');
								
								window.location.reload(true);
							}					 	
							, '-0007' : function() {
								var commonLang = langInfo.commonLang;
								
								alert(commonLang.insufficient_auth_error_text  + ' [-0007]');								
							}
							, '-0008' : function() {
								var commonLang = langInfo.commonLang;
								
								alert(commonLang.invalidCsrfToken_error_text  + ' [-0008]');
								
								window.location.reload(true);
							}
							, '-9999' : function() {
								var commonLang = langInfo.commonLang;
								
								alert(commonLang.sinnakeAuthentication_error_text  + ' [-9999]');								
							}					 	
							, '-10000' : function() {
								var commonLang = langInfo.commonLang;
								
								alert(commonLang.errorMsg  + ' [-10000]');								
							} 
							, '-10001' : function() {
								var commonLang = langInfo.commonLang;
								
								alert(commonLang.notFoundErrorMsg  + ' [-10001]');								
							}
						}					
					};
				}
				, init : function() {
					var tagCompLists = [
						'label'
						, 'input'
						, 'button'
						, 'form'
						, 'div'
						, 'img'
						, 'p'
						, 'a'
						, 'pre'
						, 'code'];
					
					this._val = this._init();

					/* 컴파일에 필요로한 설정파일 생성 메소드 캐시. */
					this._val.setInfo = defaultTag.setInfo;
					
					/* 태그 컴파일.*/
					for(var i = 0, len = tagCompLists.length; i < len; i++) {
						var tagStr = tagCompLists[i];
						this._val[tagStr + 'Comp'] = defaultTag.getCompile(tagStr);
					}

					/* 패널 템플릿 정보. */
					this._val.panelView = panelTempl.view;
					this._val.panelTemplInfo = panelTempl.templInfo;
					
					/* 그리드 템플릿 정보. */
					this._val.gridView = gridTempl.view;
					this._val.gridTemplInfo = gridTempl.templInfo;
					
					 /*테이블 템플릿 정보.*/ 
					this._val.tableView = tableTempl.view;
					this._val.tableTemplInfo = tableTempl.templInfo;
					
					this._val.commLang = langInfo;
				}
				, biz : function() {
					var that = this
						, _val = this._val;
					
					var _super = {
						/*응답 처리 값 프로세스.*/
						'resBizProc' : function(resCode, resBiz) {
							var isDefault = true;
							
							if(resBiz == undefined) {
								resBiz = that._val.biz.resBiz;
							}
							
							var checkVal = $.extend(true, that._val.respOption, resBiz);

							if(resCode != undefined && resCode.length > 0) {
								$.each(checkVal, function(key, option) {
									if(resCode == key) {
										isDefault = false;
										option(resCode);
										return false;
									}
								});
								
								if(isDefault && that._val.respOption.defualt != undefined) {
									that._val.respOption.defualt(that._val.langInfo, resCode);
								}								
							}

						}
						/*응답 코드 키 값 설정 Util.*/
						, 'changeCodeNm' : function() {
							return '<input type="hidden" name="changeCodeNm" value="' + (_val.changeCodeNm + '_changeCode') + '"/>';
						}
						/* 통신 방식에 따른 resp 처리.*/
						, 'commKindsProc' : function($form, type, url, callBack) {
							return commUtil.srvUtil.commKindsProc($form, type, url, callBack)();
						}
						/* CSS 로드 메소드. */
						, 'loadCss' : function(url) {
						    var link = document.createElement("link");
						    link.type = "text/css";
						    link.rel = "stylesheet";
						    link.href = url;
						    document.getElementsByTagName("head")[0].appendChild(link);
						}
						/* 부모 클래스에 있는 메소드 추출 메소드.*/
						, 'getSuperMethod' : function(_paramSuper, methodNm, paramConfig) {
							var config = {
									'del' : true
								}
								, rtnMethod = _paramSuper[methodNm];
							
							config = $.extend(true, config, paramConfig);

							if(config.del) {
								delete _paramSuper[methodNm];	
							}

							return rtnMethod;
						}
						

					};

					return _super;
				}
				, render : function() {
					var that = this;
					
					/* 컴파일에 필요로한 설정파일 생성 메소드 캐시. */
					var setInfo = this._val.setInfo;
					
					/* 템플릿 컴파일 모음 변수 캐시. */
					var labelComp = this._val.labelComp
						, divComp = this._val.divComp;
					
					/* 패널 랜더링 템플릿 캐시. */
					var panelView = this._val.panelView
						, panelTemplInfo = this._val.panelTemplInfo;

					/*그리드 랜더링 템플릿 캐시.*/
					var gridView = this._val.gridView
						, gridTemplInfo = this._val.gridTemplInfo;
					
					var _super = {
						/* 타이틀 그리드 랜더링 메소드. */
						'titleRender' : function() {
							var titleGrid = new gridTemplInfo();
							
							if(that._val.titleText && that._val.titleText.length > 0 ) {
								titleGrid
									.setGridStyle('background-color:#50C2FF;color:white;')
									.setCell([
										titleGrid.clsCell().setSize(12).setCellCls('configTitle').setTag(labelComp(
											setInfo()
											.setTag(that._val.titleText)
											.setStyle('font-size: 20px;font-weight: bold;')
											.getData() ))							
									]);
								
								that._val.$content
									.append([
										gridView(titleGrid.getData() )
									].join(''));								
							}
						}
						, '_render' : function() {
							var _render = {
								/*코드 뷰 랜더링 메소드.*/
								'codeView' : function($renderSelector, paramConfig) {
									var config = {
											'type' : 'html'
											, 'panelId' : ''
											, 'panelTitle' : langInfo.commonLang.codeView
											, 'renderTag' : ''
											, 'height' : '500px'
											, 'thema' : 'dracula'
										}
										, defaultPanelId = 'codeview'
										, cls = ''
										, titCls = ''
										, conCls = ''
										, setInfo = that._val.setInfo;

									var $defaultPanel = $('div[id*="'+ defaultPanelId +'"]')
										, size = $defaultPanel.size();

									config.panelId = defaultPanelId + '_' + (size + 1);
									
									config = $.extend(true, config, paramConfig);
									config.renderTag = config.renderTag.replace(/</gi, '&lt;').replace(/>/gi, '&gt;');

									cls = 'lang-' + config.type;									
									conCls = 'displayNone';

									new renderInit().biz().loadCss('/resources/css/highlight/' + config.thema + '.css');

									/* 코드보기 panel 랜더링 */
									$renderSelector.append(panelView(new panelTemplInfo()
										.setPanelId(config.panelId)
										.setConCls(conCls + ' ' + cls)
										.setConStyle('height:' + config.height + '; overflow: auto;')
										.setTitTag(config.panelTitle)
										.getData() ));

									(function(config) {
										$('#' + config.panelId).find('.tit').click(function(e) {
											var $conCls = $(this).next('.con')
												, $cls = $conCls.find('pre');

											if($cls.length <= 0) {
												/* 코드보기 코드 랜더링 */
												$conCls.append(that._val.preComp(setInfo()
													.setCls(cls)
													.setTag(that._val.codeComp(setInfo()
														.setCls(cls)
														.setTag(config.renderTag)
														.getData() ))
													.getData() ));

												highlight.highlightBlock($conCls.find('.' + cls)[0]);

												$conCls.css({
													'height': config.height
													, 'overflow' : 'auto'
													, 'background' : $conCls.find('.' + cls).css('background-color')
													, 'display' : 'block'
												});
											} else {
												if($conCls.css('display') != 'none') {
													$conCls.hide();
												} else {
													$conCls.show();
												}
											}
										});										
									})(config);
								}
								/* 트리 메뉴 랜더링 메소드. */
								, 'menuTreeRender' : function($appendSelector, callBackFunc) {
									var $topNode = $('[data-treetop="true"]')
									, $childNode = $('[data-parentTreeId]');
								
									var nodes = [];
	
									$.each($topNode, function(key, tag) {
										var $tag = $(tag);
										var node = {};
										
										node.id = 'tree_' + $tag.attr('id');
										node.parent = '#';
										node.text = $($tag.find('.treeTitle')[0]).text();
										
										if($tag.attr('data-treerender') == 'true') {
											node.renderId = $tag.attr('id');
										}
	
										nodes.push(node);
										
									});
									
									$.each($childNode, function(key, tag) {
										var $tag = $(tag);
										var node = {};
										
										node.id = 'tree_' + $tag.attr('id');
										node.parent = 'tree_' + $tag.attr('data-parentTreeId');
										node.text = $($tag.find('.treeTitle')[0]).text();
										
										if($tag.attr('data-treerender') == 'true') {
											node.renderId = $tag.attr('id');
										}
	
										nodes.push(node);
									});
								
									$appendSelector
										.on('changed.jstree', function(e, data) {
											callBackFunc(e, data);
										})
										.jstree({
											'core' : { 'data' : nodes}
										});									
								}
								

							};
							
							return _render;
						}

					};
					
					return _super;
				}
				, eventBind : function() {
					var that = this;
					
					var _super = {};
					
					return _super;
				}
				, funcCall : function(event) {
					var that = this;

					$.each(event, function(key, value) {
						if(typeof(value) == 'function' && key != 'eventCall' && key.substring(0,1) != '_') {
							value.call(that);
						}
					});
				}
				, call : function() {
					var that = this;

					this.funcCall.call(this, this.render());
					this.funcCall.call(this, this.eventBind());
					
					setTimeout(function() {
						that._val.initMsgCallback();
					}, 1);
				}
				
			});
			
			onload(renderInit);
		}
	}
});