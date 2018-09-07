define(['renderInit!'
	, 'jquery'
	, 'handlebars'
	, 'commUtil'	
	, 'defaultTag'
	, 'templates!grid/grid'
	, 'templates!panel/panel'
	, 'lang!member/regist/registLang|member/login/loginLang'
], function(renderInit, $, handlebars, commUtil, defaultTag, gridTempl, panelTempl, langInfo) {
	var loginRender = renderInit.extend({
		_val :{ }
		, init : function($content) {
			this._super();
			var that = this;

			this._val.biz = this.biz();

			this._val.changeCodeNm = 'login';
			this._val.$content = $content;
			this._val.divComp = defaultTag.getCompile('div');
			this._val.imgComp = defaultTag.getCompile('img');
			this._val.labelComp = defaultTag.getCompile('label');
			this._val.inputComp = defaultTag.getCompile('input');
			this._val.buttonComp = defaultTag.getCompile('button');
			this._val.formComp = defaultTag.getCompile('form');

			this._val.panelView = panelTempl.view;
			this._val.panelTemplInfo = panelTempl.templInfo;
		}
		, biz : function() {
			var that = this
				, superBiz = this._super();

			var bizLogic = {
				'resBiz' : {
					'0' : function() {
						var loginLang = langInfo.loginLang;
						
						alert(loginLang.login_sucess_text);
						
						location.replace('/main');
					}
					, 'defualt' : function(resCode) {
						var loginLang = langInfo.loginLang;

						alert(loginLang.login_etc_fail_text + ' [' + resCode + ']');
					}
				}
			

			};

			return $.extend(true, superBiz, bizLogic);
		}
		, render : function() {
			var that = this
				, superRender = this._super()
				, setInfo = defaultTag.setInfo
				, divComp = that._val.divComp
				, imgComp = that._val.imgComp
				, labelComp = that._val.labelComp
				, inputComp = this._val.inputComp
				, buttonComp = this._val.buttonComp
				, formComp = this._val.formComp;

			var panelView = this._val.panelView
				, panelTemplInfo = this._val.panelTemplInfo;

			var commonLang = langInfo.commonLang;

			var render = {
				'grid_render' : function() {
					var grid = new gridTempl.templInfo();

					grid.setCell([
						grid.clsCell().setSize(12).setCellCls('loginGridCell')
					]);

					that._val.$content
						.append(gridTempl.view(grid.getData()));
				}			
				, 'loginGridCell_render' : function() {
					var labelInlineStyle = 'width:70px; display:inline-block; text-align:left;'
						, inputInlineStyle = 'width:150px; padding-top:5px; margin-top:5px;';

					var _content = {
						/* 아이디 영역 Render */
						'id_domain_render' : function() {
							return [
								labelComp(setInfo()
									.setTag(commonLang.id_text)
									.setStyle(labelInlineStyle)
									.getData() )
								, inputComp(setInfo()
									.setId('username')
									.setNm('username')
									.setType('text')
									.setAttr('placeholder="' + commonLang.id_text + '"')
									.setStyle(inputInlineStyle)
									.getData() )							
							].join('');
						}
						/* 비밀번호 영역 Render */
						, 'pwd_domain_render' : function() {
							return [
								labelComp(setInfo()
									.setTag(commonLang.pwd_text)
									.setStyle(labelInlineStyle)
									.getData() )
								, inputComp(setInfo()
									.setId('password')
									.setNm('password')
									.setAttr('placeholder="' + commonLang.pwd_text + '"')
									.setStyle(inputInlineStyle)
									.setType('password')
									.getData() )
							].join('');							
						}
						/* 확인 버튼 Render */
						, 'button_domain_render' : function() {
							return [
								buttonComp(setInfo()									
									.setTag(commonLang.confirm_text)
									.setStyle('padding-top:5px; margin-top:10px;')
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
									.setAttr('value="login_page"')
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
						, 'final_render' : function() {
							var formRender = _content.form_render('login', [
								_content.div_render(_content.id_domain_render())
								, _content.div_render(_content.pwd_domain_render())
								, _content.div_render( _content.button_domain_render())
								, _content.hiddenInputRender()
								, commUtil.srvUtil.csrfTagMake()
								, that._val.biz.changeCodeNm()
							].join(''));
							
							return divComp(setInfo().setTag(formRender).getData());
						}


					};

					$('.loginGridCell').append(panelView(new panelTemplInfo()
						.setPanelStyle('width:700px;')	
						.setTitTag(commonLang.login_text)
						.setTitStyle('background-color:#424242; color:white;')
						.setConTag(_content.final_render())
						.getData() ));
				}
			};
			
			return $.extend(true, superRender, render);
		}
		, eventBind : function() {
			var that = this
				, superEvent = this._super();

			var loginLang = langInfo.loginLang
				, registLang = langInfo.registLang;

			var event = {
				'loginGridCell_form_event' : function($formId, resBiz) {
					if($formId == undefined || $formId.size() == 0) {
						$formId = $('#login');
					}
					
					if(resBiz == undefined) {
						resBiz = that._val.biz.resBiz
					}
					
					var validate_rules = {
							'username' : {
								'required' : true
								, 'minlength' : 5
								, 'maxlength' : 16					
							}
							, 'password' : {
								'required' : true
								, 'minlength' : 8
								, 'maxlength' : 10					
							}
						}
						, validate_msg = {
							'username' : {
								'required' : registLang.required_text
								, 'minlength' : registLang.minlength_text
								, 'maxlength' : registLang.maxlength_text
							}
							, 'password' : {
								'required' : registLang.required_text
								, 'minlength' : registLang.minlength_text
								, 'maxlength' : registLang.maxlength_text
							}					
						};

					$formId.validate({
						'rules' : validate_rules
						, 'messages' : validate_msg
						, 'submitHandler' : function() {
							return that._val.biz.commKindsProc($formId, 'post', '/member/login', function(data) {								
								var resData = $.parseJSON(data)
									, resCode = resData.resCode;
							
								that._val.biz.resBizProc(resCode, resBiz);
							
								return false;
							});
						}
					});
				}

			
			};
			
			return $.extend(true, superEvent, event);
		}
	});
	
	return loginRender;
});