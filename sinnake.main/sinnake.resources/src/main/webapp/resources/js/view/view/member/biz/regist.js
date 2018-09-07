define(['renderInit!'
	, 'jquery'
	, 'jqValidate'
	, 'handlebars'
	, 'commUtil'
	, 'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js'
	, 'lang!member/regist/registLang'
	, 'text!/resources/js/view/view/member/biz/regist.js'
	, 'text!/resources/js/controller/member/registController.js'
], function(renderInit, $,  jqValidate, handlebars, commUtil, daumPostObj, langInfo, codeText, controllerCodeText) {
	var render = renderInit.extend({
		_val : { }
		, init : function($content) {
			this._super();
			
			this._val.biz = this.biz();
			this._val.changeCodeNm = 'regist';
			this._val.$content = $content;

			$('.pageContent').css('background', '#ddd');
		}
		, biz : function() {
			var that = this
				, _super = this._super()
			
			var biz = {
				'resBiz' :{
					'0' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.sucess_text);
						location.replace('/main');
					}
					, '-1' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.svr_termsService_valid_text);

						$('#termsService').focus().trigger('keyup');
					}
					, '-2' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.svr_termsPrivacy_valid_text);

						$('#termsPrivacy').focus().trigger('keyup');
					}
					, '-3' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.svr_id_valid_text);

						$('#memberId').focus().trigger('keyup');
					}
					, '-4' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.svr_pwd_valid_text);

						$('#memberPwd').focus().trigger('keyup');
					}
					, '-5' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.svr_repwd_valid_text);

						$('#memberRePwd').focus().trigger('keyup');
					}
					, '-6' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.svr_postcode_valid_text);

						$('#postCode').focus().trigger('keyup');
					}
					, '-7' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.svr_address_valid_text);

						$('#address').focus().trigger('keyup');
					}
					, '-8' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.svr_detailAddress_valid_text);

						$('#detailAddress').focus().trigger('keyup');
					}
					, '-9' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.svr_db_member_valid_text);
					}
					, '-10' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.svr_db_memberAttempts_valid_text);
					}
					, '-11' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.svr_db_memberRoles_valid_text);
					}
					, '-12' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.svr_db_memberRegist_valid_text);
					}
					, 'default' : function() {
						var commonLang = langInfo.commonLang;
						
						alert(commonLang.errorMsg);
					}
				}
			

			};
			
			return $.extend(true, _super, biz);
		}
		, render : function() {
			var that = this
				, _super = this._super();
				
			var divComp = this._val.divComp
				, inputComp = this._val.inputComp
				, labelComp = this._val.labelComp
				, buttonComp = this._val.buttonComp
				, formComp = this._val.formComp;

			var setInfo = this._val.setInfo;

			var panelView = this._val.panelView
				, panelTemplInfo = this._val.panelTemplInfo				

			var gridView = this._val.gridView
				, gridTemplInfo = this._val.gridTemplInfo;

			var commonLang = langInfo.commonLang
				, registLang = langInfo.registLang;			
				
			var render = {
				'_getJoinRender' : function() {
					var defaultButton = setInfo().setCls('mdl-button mdl-js-button mdl-button--raised').setStyle('margin-right:10px;')
						, defaultLabel = setInfo().setStyle('font-weight:bold; margin-bottom:0px;')
						, labelInlineStyle = 'width:120px; display:inline-block;'
						, inputInlineStyle = 'width:150px; padding-top:5px; margin-top:5px;';

					var _joinRender = {
						/*이용약관 안내 Panel Tag Render*/				
						'termsServicePanelRender' : function() {
							var termsServiceChkkBox = setInfo().setId('termsService').setNm('termsService').setType('checkbox').setStyle('float:right;');								
							
							return panelView(new panelTemplInfo()
								.setTitTag(labelComp(defaultLabel.setTag(registLang.termsService_text).getData()) 
									+ inputComp(termsServiceChkkBox.getData()))
								.setConTag(registLang.termsService_content_text)
								.getData());
						}
						/*개인정보 수집 안내 Panel Tag Render*/
						, 'termsPrivacyPanelRender' : function() {
							var termsPrivacyChkBox = setInfo().setId('termsPrivacy').setNm('termsPrivacy').setType('checkbox').setStyle('float:right;');								

							return panelView(new panelTemplInfo()
								.setTitTag(labelComp(defaultLabel.setTag(registLang.termsPrivacy_text).getData()) 
									+ inputComp(termsPrivacyChkBox.getData()))
								.setConTag(registLang.termsPrivacy_content_text)
								.getData());
						}
						/*회원정보 입력 Panel Tag Render*/
						, 'memberRegPanelRender' : function() {
							return panelView(new panelTemplInfo()
								.setTitTag(labelComp(defaultLabel.setTag(registLang.memberInfo_input_text).getData()))									
								.setConTag([
									_joinRender.idRender() 
									, _joinRender.pwdRender() 
									, _joinRender.addressRender()
									, _joinRender.memberRegButtonRender()									
								].join(''))
								.getData());
						}
						/*비동의, 동의 Tag Render*/
						, 'agreeButtonRender' : function() {
							return divComp(setInfo()
								.setStyle('text-align:center;')
								.setTag([
									/*비동의 Button Tag Render*/
									buttonComp(defaultButton.setId('disagree').setTag(commonLang.noAgree_text).getData())
									/*동의 Button Tag Render*/
									, buttonComp(defaultButton.setId('agree').setTag(commonLang.agree_text).getData())
								].join(''))
								.getData());
						}
						/*아아디 입력 Tag Render*/
						, 'idRender' : function() {							
							return [
								/*아이디 Label Tag Render*/
								labelComp(defaultLabel.setStyle(labelInlineStyle).setTag(commonLang.id_text).getData())
								/*아이디 Input Tag Render*/
								, inputComp(setInfo()
									.setId('memberId')
									.setNm('memberId')
									.setType('text')
									.setAttr('placeholder="' + commonLang.id_text + '"')
									.setStyle(inputInlineStyle).getData())
								, '<br/>'
							].join('');
						}
						/*비밀번호 입력 Tag Render*/
						, 'pwdRender' : function() {							
							return [
								/*비밀번호 Label Tag Render*/
								labelComp(defaultLabel.setStyle(labelInlineStyle).setTag(commonLang.pwd_text).getData())
								/*비밀번호 Input Tag Render*/
								, inputComp(setInfo()
									.setId('memberPwd')
									.setNm('memberPwd')
									.setType('password')
									.setAttr('placeholder="' + commonLang.pwd_text + '"')
									.setStyle(inputInlineStyle)
									.getData())
								, '<br/>'
								/*비밀번호 재확인 Label Tag Render*/
								, labelComp(defaultLabel.setStyle(labelInlineStyle).setTag(commonLang.rePwd_text).getData())
								/*비밀번호 재확인 Input Tag Render*/
								, inputComp(setInfo()
									.setId('memberRePwd')
									.setNm('memberRePwd')
									.setType('password')
									.setAttr('placeholder="' + commonLang.rePwd_text + '"')							
									.setStyle(inputInlineStyle)
									.getData())
								, '<br/>'
							].join('');
						}
						/*주소 입력 Tag Render*/
						, 'addressRender' : function() {							
							return [
								/*주소 Label Tag Render*/
								labelComp(defaultLabel.setTag(commonLang.fullAddress_text).getData())
								/*우편번호 Input Tag Render*/
								, inputComp(setInfo()
									.setId('postCode')
									.setNm('postCode')
									.setType('text')
									.setAttr('placeholder="' + commonLang.postCode_text + '"')							
									.setStyle(inputInlineStyle)
									.getData())
								/*우편번호 찿기 Button Tag Render*/									
								, buttonComp(defaultButton.setId('getPostCode').setTag(registLang.postCodeSearch_text).getData())
								, '<br/>'
								/*주소 Input Tag Render*/
								, inputComp(setInfo()
									.setId('address')
									.setNm('address')
									.setType('text')
									.setAttr('placeholder="' + commonLang.fullAddress_text + '"')							
									.setStyle(inputInlineStyle + ' margin-left:120px; width:240px;')
									.getData())
								/*상세주소 Input Tag Render*/
								, inputComp(setInfo()
									.setId('detailAddress')
									.setNm('detailAddress')
									.setType('text')
									.setAttr('placeholder="' + commonLang.detailAddress_text + '"')							
									.setStyle(inputInlineStyle + ' width:240px;')
									.getData())
								, '</br>'
							].join('');
						}
						/*회원가입 버튼 Tag Render*/
						, 'memberRegButtonRender' : function() {
							return divComp(setInfo()
								.setStyle('text-align:center;')
								.setTag(buttonComp(defaultButton
									.setId('memberReg')
									.setStyle('margin-top:10px;')
									.setTag(commonLang.memberRegist_text)
									.getData()))
								.getData());
						}
					};

					return _joinRender;
				}
				, 'gridRender' : function() {
					var memberRegistGrid = new gridTemplInfo();						
					
					memberRegistGrid.setCell([
						memberRegistGrid.clsCell().setSize(12).setCellCls('memberRegist')
					]);

					that._val.$content
						.append([
							gridView(memberRegistGrid.getData() )
						].join('') );
				}
				/* 코드보기 그리드 랜더링 */
				, 'codeViewRender' : function(paramCodeText, paramControllerCodeText) {
					var codeViewGrid = new gridTemplInfo();

					codeViewGrid
						.setCell([
							codeViewGrid.clsCell().setSize(6).setCellCls('codeView')
							, codeViewGrid.clsCell().setSize(6).setCellCls('controllerCodeView')
						]);
					
					that._val.$content
						.prepend([
							gridView(codeViewGrid.getData() )
						].join('') );
					
					/* 코드보기 랜더링 */
					_super._render().codeView($('.codeView'), {
						'type' : 'js'
						, 'renderTag' : paramCodeText != undefined ? paramCodeText : codeText
					});
					
					_super._render().codeView($('.controllerCodeView'), {
						'type' : 'js'
						, 'renderTag' : paramControllerCodeText != undefined ? paramControllerCodeText : controllerCodeText
						, 'panelTitle' : langInfo.commonLang.controllerCodeView
					});
				}
				, 'memberRegistMainRender' : function() {
					var joinNotice = setInfo().setId('joinNotice')
						, form = setInfo()
							.setId('memberRegForm')
							.setNm('memberRegForm');
					
					$('.memberRegist').append(panelView(new panelTemplInfo()
							.setPanelStyle('width:700px;')
							.setTitCls('memberRegistTit')
							.setTitStyle('background-color:#424242; color:white;')
							.setTitTag(commonLang.memberRegist_text)
							.setConTag(formComp(form
									.setTag(divComp(joinNotice.getData() ))
									.getData() ))
							.getData() ));
				}
				, 'joinRender' : function() {
					var _joinRender = render._getJoinRender();
				
					$('#joinNotice').append([
						_joinRender.termsServicePanelRender()
						, _joinRender.termsPrivacyPanelRender()
						, _joinRender.agreeButtonRender()
						, _joinRender.memberRegPanelRender()
						, commUtil.srvUtil.csrfTagMake()
						, that._val.biz.changeCodeNm()
					].join(''));
				}

				
			};
			
			return $.extend(true, _super, render);
		}
		, eventBind : function() {
			var that = this
				, _super = this._super();
			
			var commonLang = langInfo.commonLang
				, registLang = langInfo.registLang;
			
			var event = {
				'_registFormValid' : function() {
					var validate_rules = {
						'termsService' : {
							'required' : true
						}
						, 'termsPrivacy' : {
							'required' : true
						}
						, 'memberId' : {
							'required' : true
							, 'minlength' : 5
							, 'maxlength' : 16
							, 'idFormatValid' : true
							, 'remote' : {
								'url' : '/member/memberIdCheck'
								, 'type' : 'get'
								, 'data' : {
									'memberId' : function() {
										return $('#memberId').val();
									}
								}
							}
						}
						, 'memberPwd' : {
							'required' : true
							, 'minlength' : 8
							, 'maxlength' : 10
							, 'pwdFormatValid' : true
						}
						, 'memberRePwd' : {
							'required' : true
							, 'minlength' : 8
							, 'maxlength' : 10
							, 'pwdFormatValid' : true
							, 'equalTo' : '#memberPwd'
						}							
						, 'postCode' : {
							'required' : true
							, 'number' : true
						}
						, 'address' : {
							'required' : true
						}
						, 'detailAddress' : {
							'required' : true
						}
					}
					, validate_msg = {
						'termsService' : {
							'required' : ''
						}
						, 'termsPrivacy' : {
							'required' : ''
						}
						, 'memberId' : {
							'required' : registLang.required_text
							, 'minlength' : registLang.minlength_text
							, 'maxlength' : registLang.maxlength_text
							, 'remote' : registLang.remote_text
							, 'idFormatValid' : registLang.idFormatValid_text
						}
						, 'memberPwd' : {
							'required' : registLang.required_text
							, 'minlength' : registLang.minlength_text
							, 'maxlength' : registLang.maxlength_text
							, 'pwdFormatValid' : registLang.pwdFormatValid_text
						}
						, 'memberRePwd' : {
							'required' : registLang.required_text
							, 'minlength' : registLang.minlength_text
							, 'maxlength' : registLang.maxlength_text
							, 'pwdFormatValid' : registLang.pwdFormatValid_text
							, 'equalTo' : registLang.equalTo_text
						}							
						, 'postCode' : {
							'required' : registLang.required_text
							, 'number' : registLang.number_text
						}
						, 'address' : {
							'required' : registLang.required_text
						}
						, 'detailAddress' : {
							'required' : registLang.required_text
						}	
					};
					
					return {
						'validate_rules' : validate_rules
						, 'validate_msg' : validate_msg
					};
				}				
				, 'allTermsCheckEvent' : function() {
					var $termsService = $('#termsService') 
						, $termsPrivacy = $('#termsPrivacy');
					
					$('#disagree').click(function() {
						$termsService.prop('checked', false);
						$termsPrivacy.prop('checked', false);
						
						return false;
					});
					
					$('#agree').click(function() {
						$termsService.prop('checked', true);
						$termsPrivacy.prop('checked', true);
						
						return false;						
					});
				}
				, 'getPostCodeEvent' : function() {
					$('#getPostCode').click(function() {
						commUtil.searchPostCode(function(data) {
			                $('#postCode').val(data.zonecode).trigger('keyup');
			                $('#address').val(data.fullAddr).trigger('keyup');
			                $('#detailAddress').focus().trigger('keyup');							
						});

						return false;
					});
				}
				, 'registFormInputEvent' : function() {
					$('#memberId, #memberPwd, #memberRePwd').keyup(function() {
						var $this =$(this);
						
						$this.val($this.val().replace(/\s/gi, ""));						
					});
				}
				, 'registFormEvent' : function() {
					var _valid = event._registFormValid();

					commUtil.validUtil.idFormatValid();
					commUtil.validUtil.pwdFormatValid();
					
					$('#memberRegForm').validate({
						'rules' : _valid.validate_rules
						, 'messages' : _valid.validate_msg
						, 'submitHandler' : function() {
							 return that._val.biz.commKindsProc($('#memberRegForm'), 'post', '/member/regist', function(data) {
									var resData = $.parseJSON(data)
										, resCode = resData.resCode;
								
									that._val.biz.resBizProc(resCode, that._val.biz.resBiz);
									
									return false;
							 });
						}
					});
				}


			};
			
			return $.extend(true, _super, event);
		}
		

	});
	
	return render;
})