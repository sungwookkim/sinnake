define(['extends'
	, 'jquery'
	, 'jqCookie'
	, 'handlebars'
	, 'commUtil'
	, 'defaultTag'
	, 'renderInit!'
	, 'render!member/biz/login'
] , function(cls, $, jqCookie, handlebars, commUtil, defaultTag, renderInit, loginView) {
	var comp = {
		'setInfo' : defaultTag.setInfo	
		, 'div' : defaultTag.getCompile('div')
		, 'input' : defaultTag.getCompile('input')
		, 'button' : defaultTag.getCompile('button')
		, 'label' : defaultTag.getCompile('label')
		, 'form' : defaultTag.getCompile('form')
		, 'select' : defaultTag.getCompile('select')
		, 'option' : defaultTag.getCompile('option')
	};
	
	var repos = Class.extend({
		bizTempRepos : []
		, init : function() {
			
		}
		, setRepos : function(obj) {
			this.bizTempRepos.push(obj);
			
			return this;
		}
		, call : function(rtnObj, menuLangInfo) {
			var repos = this.bizTempRepos;
			
			for(var i = 0, len = repos.length; i < len; i++) {
				new repos[i](rtnObj, menuLangInfo).call();
			}
		}
	});

	var rtn = new repos()
		/*언어 설정 메뉴*/
		.setRepos(renderInit.extend({
			init : function(rtnObj, menuLangInfo) {
				this._super();

				this._val.menuLangInfo = menuLangInfo;
				
				this._val.biz = this.biz();
				rtnObj.langChangeRender = this._val.biz.langChangeRender();
			}
			, biz : function() {
				var that = this
					, _super = this._super();
				
				var menuLangInfo = this._val.menuLangInfo.menuLang.text;
				
				var setInfo = comp.setInfo
					, selectComp = comp.select
					, optionComp = comp.option;
				
				var child = {
					/*언어 설정 셀렉트 박스 랜더링*/
					'langChangeRender' : function() {
						var _content = {
							'selectRender' : function(option) {
								return [
									selectComp(setInfo()
										.setId('langChange')
										.setTag(option)
										.getData() )
								].join('');
							}
							, 'optionRender' : function() {
								var langKind = commUtil.srvUtil.getLang();

								return [
									optionComp(setInfo()
										.setAttr('value="ko" ' + (langKind == 'ko' ? 'selected' : ''))
										.setTag(menuLangInfo.langChange_ko_text)
										.getData() )
									, optionComp(setInfo()
										.setAttr('value="en" '+ (langKind == 'en' ? 'selected' : ''))
										.setTag(menuLangInfo.langChange_en_text)
										.getData() )										
								].join('');
							}
							, 'resultRender' : function() {
								return this.selectRender(this.optionRender());
							}
						};
						
						return _content.resultRender();
					}
				

				};
				
				return $.extend(true, _super, child);
			}
			, render : function() {
				var that = this
					, _super = this._super();
				
				var child = {

				};
				
				return $.extend(true, _super, child);				
			}
			, eventBind : function() {
				var that = this
					, _super = this._super();
			
				var child = {
					'langChange_event' : function() {
						$('body')
							.on('change', '#langChange', function() {
								var $this = $(this);
								location.href = $(location).attr('pathname') + '?lang=' + $this.val();
							});
					}


				};
				
				return $.extend(true, _super, child);				
			}
		}))
		/*통신 방식 설정 메뉴*/
		.setRepos(renderInit.extend({
			init : function(rtnObj, menuLangInfo) {
				this._super();
				
				this._val.menuLangInfo = menuLangInfo;
				
				this._val.biz = this.biz();

				rtnObj.commKindRender = this._val.biz.commKindRender();
			}
			, biz : function() {
				var that = this
					, _super = this._super();
				
				var menuLangInfo = this._val.menuLangInfo.menuLang.text;
				
				var setInfo = comp.setInfo
					, selectComp = comp.select
					, optionComp = comp.option;
				
				var child = {
					/*통신 방식 설정 셀렉트 박스 랜더링*/
					'commKindRender' : function() {
						var _content = {
							'selectRender' : function(option) {
								return [
									selectComp(setInfo()
										.setId('commKinds')
										.setTag(option)
										.getData() )
								].join('');
							}
							, 'optionRender' : function() {
								var langKind = $.cookie('commKind');

								if(langKind == undefined) {
									langKind = 'ajax';
								}

								return [
									optionComp(setInfo()
										.setAttr('value="ajax" ' + (langKind == 'ajax' ? 'selected' : ''))
										.setTag(menuLangInfo.commKinds_ajax_text)
										.getData() )
									, optionComp(setInfo()
										.setAttr('value="page" '+ (langKind == 'page' ? 'selected' : ''))
										.setTag(menuLangInfo.commKinds_page_text)
										.getData() )										
								].join('');
							}
							, 'resultRender' : function() {
								return this.selectRender(this.optionRender());
							}
						};
						
						return _content.resultRender();
					}
				

				};
				
				return $.extend(true, _super, child);
			}
			, render : function() {
				var that = this
					, _super = this._super();
				
				var child = {
						
				};
				
				return $.extend(true, _super, child);				
			}
			, eventBind : function() {
				var that = this
					, _super = this._super();

				var child = {
					'langChange_event' : function() {
						$('body')
							.on('change', '#commKinds', function() {
								var $this = $(this);

								$.cookie('commKind', $this.val(), {'path' : '/'});
							});
					}


				};
				
				return $.extend(true, _super, child);				
			}
		}))		
		/* 상단 로그인 메뉴 */
		.setRepos(renderInit.extend({
			init : function(rtnObj, menuLangInfo) {
				this._super();
				
				var that = this
					, login = new loginView();

				this._val.loginViewEvent = login.eventBind();
				this._val.loginViewBiz = login.biz();

				this._val.userInfo = {};
				this._val.changeCodeNm = 'headerLogin';
				this._val.menuLangInfo = menuLangInfo;
				this._val.biz = this.biz();
				
				commUtil.srvUtil.getUser(function(data) {
					that._val.userInfo = data;
					
					if(that._val.userInfo.resCode == '0') {
						rtnObj.headerMenu.header_regist_bool = false;
						rtnObj.headerMenu.header_login_text = menuLangInfo.menuLang.text.login_success_text;
					} else {
						rtnObj.headerMenu.header_regist_bool = true;
						rtnObj.headerMenu.header_login_text = menuLangInfo.menuLang.text.login_text;
						rtnObj.headerMenu.header_member_regist_text = menuLangInfo.menuLang.text.regist_text;
					}					
				});
			}
			, biz : function() {
				var that = this
					, _super = this._super();

				var menuLangInfo = this._val.menuLangInfo.menuLang.text;
				
				var setInfo = comp.setInfo
					, divComp = comp.div
					, labelComp = comp.label
					, inputComp = comp.input
					, buttonComp = comp.button
					, formComp = comp.form;

				var labelInlineStyle = 'display:inline-block; text-align:left; color:black;'
					, inputInlineStyle = 'width:150px; padding-top:5px; margin-top:5px;';
				
				var child = {
					'loginRender' : function() {
						var _content = {
							/* 아이디 영역 Render */
							'id_domain_render' : function() {
								return [
									labelComp(setInfo()
										.setTag(menuLangInfo.id_text)
										.setStyle(labelInlineStyle + 'width:70px;font-weight:bold;')
										.getData() )
									, inputComp(setInfo()
										.setId('username')
										.setNm('username')
										.setType('text')
										.setAttr('placeholder="' + menuLangInfo.id_text + '"')
										.setStyle(inputInlineStyle)
										.getData() )							
								].join('');								
							}
							/* 비밀번호 영역 Render */
							, 'pwd_domain_render' : function() {
								return [
									labelComp(setInfo()
										.setTag(menuLangInfo.pwd_text)
										.setStyle(labelInlineStyle + 'width:70px;font-weight:bold;')
										.getData() )
									, inputComp(setInfo()
										.setId('password')
										.setNm('password')
										.setAttr('placeholder="' + menuLangInfo.pwd_text + '"')
										.setStyle(inputInlineStyle)
										.setType('password')
										.getData() )
								].join('');	
							}
							/* 확인 버튼 Render */
							, 'button_domain_render' : function() {
								return [
									buttonComp(setInfo()									
										.setTag(menuLangInfo.confirm_text)
										.setStyle('padding-top:5px; margin-top:10px; margin-bottom:6px;')
										.setCls('mdl-button mdl-js-button mdl-button--raised')
										.getData() )
								].join('');								
							}
							/*hidden input render*/
							, 'hiddenInputRender' : function() {
								return [
									inputComp(setInfo()
										.setId('login_kind')
										.setNm('login_kind')
										.setType('hidden')
										.setAttr('value="login_header"')
										.getData() )
								].join('');									
							}
							, 'form_render' : function(id, renderStr) {
								return formComp(setInfo()
										.setId(id)
										.setNm(id)
										.setTag(renderStr)
										.getData() );
							}
							, 'div_render' : function(renderStr) {
								var id_div = setInfo().setStyle('text-align:center;');
								
								return divComp(id_div
										.setTag(renderStr)
										.getData() );
							}
							, 'result_render' : function() {
								var formRender = _content.form_render('header_login_form', [
									_content.div_render(_content.id_domain_render())
									, _content.div_render(_content.pwd_domain_render())
									, _content.div_render( _content.button_domain_render())
									, _content.hiddenInputRender()
									, commUtil.srvUtil.csrfTagMake()
									, that._val.biz.changeCodeNm()
								].join(''));
								
								return divComp(setInfo()
									.setTag(divComp(setInfo()
										.setTag(formRender)
										.setStyle('background:white; width:250px; margin-bottom:10px; margin-right:10px; float:right;')
										.getData() ))
									.getData() );
							}
						};
						
						return _content.result_render();
					}
					, 'loginSucessRender' : function() {
						var titleLabel = (labelInlineStyle + 'width:120px; font-weight:bold;').replace('text-align:left;', 'text-align:right;')
							, contentLabel = labelInlineStyle + 'margin-left:7px;';
							
						var _content = {
							/*로그인 아이디 render*/
							'id_render' : function() {
								return [
									labelComp(setInfo()
										.setStyle(titleLabel)
										.setTag(menuLangInfo.id_text)
										.getData() )
									, labelComp(setInfo()
										.setStyle(contentLabel)
										.setTag(that._val.userInfo.id)
										.getData() )										
								].join('');
							}
							/*최근 로그인한 시간 render*/
							, 'lastLoginTime_render' : function() {
								return [
									labelComp(setInfo()
										.setStyle(titleLabel)
										.setTag(menuLangInfo.lastLoginTime_text)
										.getData() )
									, labelComp(setInfo()
										.setStyle(contentLabel)
										.setTag(that._val.userInfo.lastLoginTime)
										.getData() )										
								].join('');
							}
							/*회원정보 관리 render*/
							, 'memberUpdate_render' : function() {
								return [
									labelComp(setInfo()
										.setStyle(titleLabel)
										.setTag(menuLangInfo.member_update_text)
										.getData() )
									, labelComp(setInfo()
										.setId('memberUpdate')
										.setStyle(contentLabel+'color:blue; cursor:pointer;')
										.setTag(menuLangInfo.move_text)
										.getData() )										
								].join('');
							}							
							/* 로그아웃 버튼 Render */
							, 'button_domain_render' : function() {
								return [
									buttonComp(setInfo()
										.setId('header_logout')
										.setTag(menuLangInfo.logout_text)
										.setStyle('padding-top:5px; margin-top:5px; margin-bottom:6px;')
										.setCls('mdl-button mdl-js-button mdl-button--raised')
										.getData() )
								].join('');
							}
							, 'form_render' : function(id, renderStr) {
								return formComp(setInfo()
										.setId(id)
										.setNm(id)
										.setTag(renderStr)
										.getData() );
							}							
							, 'div_render' : function(renderStr, style) {
								var divSetInfo = setInfo().setTag(renderStr);
								
								if(style != undefined) {
									divSetInfo = divSetInfo.setStyle(style);
								}
								
								return divComp(divSetInfo.getData() );
							} 
							, 'result_render' : function() {
								var formRender = _content.form_render('header_login_form', [
									_content.div_render(_content.id_render(), 'margin-right:12px;padding-top:5px;')
									, _content.div_render(_content.lastLoginTime_render(), 'margin-right:12px;')
									, _content.div_render(_content.memberUpdate_render(), 'margin-right:12px;')
									, _content.div_render(_content.button_domain_render(), 'text-align:center;padding-bottom:5px;')
								].join(''));

								return divComp(setInfo()
										.setTag(divComp(setInfo()
											.setTag(formRender)
											.setStyle('background:white; width:275px; margin-bottom:10px; margin-right:10px; float:right;')
											.getData() ))
										.getData() );
							}
						};
						
						return _content.result_render();
					}
				

				};

				child.resBiz = this._val.loginViewBiz.resBiz;
				child.resBiz['0'] = function() {
					if(!commUtil.isPage()) {
						window.location.reload(true);
					}
				}
				
				return $.extend(true, _super, child); 
			}
			, render : function() {
				var that = this
					, _super = this._super();
				
				var child = { };
				
				return $.extend(true, _super, child); 
			}			
			, eventBind : function() {
				var that = this
					, _super = this._super();
			
				var child = {
					'header_login_event' : function() {
						var $body = $('body')
							, loginTag = ''
							, eventFunc = function() {};
						
						if(that._val.userInfo.resCode == '0') {
							loginTag = that._val.biz.loginSucessRender();

							var param = {}
								, csrfConfig = commUtil.srvUtil.init().configVal.csrfConfig;
							
							param[csrfConfig.name] = csrfConfig.value;
							$body
								.on('click', '#header_logout', function() {
									window.location.href = '/member/logout';								
									return false;
								});

							$body
								.on('click', '#memberUpdate', function() {
									location.replace('/member/registUpdate');
									
									return false;
								});
							
						} else {
							loginTag = that._val.biz.loginRender();
						}

						$body
							.on('click', '#header_login', function() {
								var $header_login_form = $('#header_login_form');
								
								if($header_login_form.size() == 1) {
									$($header_login_form.parents('div')[0]).remove();	
								} else {
									$('.mdl-layout__header').append(loginTag);

									that._val.loginViewEvent.loginGridCell_form_event($('#header_login_form'), that._val.biz.resBiz);
								}
								
								return false;
							});
					}
				

				};
			
				return $.extend(true, _super, child);
			}
		}));
		
	return rtn;
});