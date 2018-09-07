define(['jquery'
	, 'commUtil'
	, 'render!member/biz/regist'
	, 'lang!member/regist/registLang'
	, 'text!/resources/js/view/view/member/biz/registUpdate.js'
	, 'text!/resources/js/controller/member/registUpdateController.js'
	, 'text!/resources/js/view/view/member/biz/regist.js'
], function($, commUtil, registObj, langInfo, codeText, controllerCodeText, parentCodeText) {
	/* 해당 클래스는 회원가입 클래스를 상속 받아 재 구현 함.(regist.js) */
	var render = registObj.extend({
		_val : { }
		, init : function($content) {
			this._super();
			
			this._val.biz = this.biz();
			this._val.changeCodeNm = 'registUpdate';
			this._val.$content = $content;
			
			$('.pageContent').css('background', '#ddd');
		}
		, biz : function() {
			var that = this
				, _super = this._super()
				, _superResBiz = _super['resBiz'];

			var biz = {
				/* 응답 후 처리에 관련된 config 메소드들 설정. */
				'resBiz' : {
					'0' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.sucess_update_text);
						location.replace('/main');
					}
					, '-3' : function() {
						var commonLang = langInfo.commonLang;
						
						alert(commonLang.insufficient_auth_error_text);
					}
					, '-4' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.svr_pwd_prev_valid_text);						
					}
					, '-8' : function() {
						var commonLang = langInfo.commonLang;
						
						alert(commonLang.login_fail_text);
					}
					, '-9' : function() {
						var registLang = langInfo.registLang;
						
						alert(registLang.srv_db_member_update_error_text);
					}
				}


			};

			/* 부모 클래스에 있는 config 메소드들 중 필요한 것만 추출. */
			biz.resBiz['-1'] = _superResBiz['-4'];
			biz.resBiz['-2'] = _superResBiz['-5'];
			biz.resBiz['-5'] = _superResBiz['-6'];
			biz.resBiz['-6'] = _superResBiz['-7'];
			biz.resBiz['-7'] = _superResBiz['-8'];
		
			/* 부모 클래스에 있는 config 메소드 제거 */
			_super['resBiz'] = {};
			
			return $.extend(true, _super, biz);
		}
		, render : function() {
			var that = this
				, _super = this._super();

			var registLang = langInfo.registLang
				, commonLang = langInfo.commonLang;
			
			/*그리드 랜더링 템플릿 캐시.*/
			var gridView = this._val.gridView
				, gridTemplInfo = this._val.gridTemplInfo;
			
			/* 부모 클래스에 있는 codeViewRender 메소드 추출 후 삭제.*/
			var _superCodeViewRender = that._val.biz.getSuperMethod(_super, 'codeViewRender');

			var render = {
				/* 부모(regist.js)에 있는 joinRender를 오버라이딩 대상. */
				'joinRender' : function() {
					var parentCodeViewGrid = new gridTemplInfo()
						, _joinRender = _super._getJoinRender();
					
					$('#joinNotice').append([
						_joinRender.memberRegPanelRender()
						, commUtil.srvUtil.csrfTagMake()
						, that._val.biz.changeCodeNm()
					].join(''));
					
					_superCodeViewRender(codeText, controllerCodeText);
					
					parentCodeViewGrid
						.setCell([
							parentCodeViewGrid.clsCell().setSize(12).setCellCls('parentCodeView')
						]);
				
					that._val.$content
						.prepend([
							gridView(parentCodeViewGrid.getData())
						].join(''));
					
					/* 코드보기 랜더링 */
					_super._render().codeView($('.parentCodeView'), {
						'type' : 'js'
						, 'renderTag' : parentCodeText
						, 'panelTitle' : '[regist.js] ' +langInfo.commonLang.parentCodeView
					});
				}
				/*회원정보 수정 문구 변경.*/
				, 'textChangeRender' : function() {
					$('.memberRegistTit').html(registLang.member_regist_update_text);
					$('#memberReg').text(commonLang.confirm_text);
					$('#memberId').prop('disabled', true);
				}


			};
			
			return $.extend(true, _super, render);
		}
		, eventBind : function() {
			var that = this
				, _super = this._super();

			var registLang = langInfo.registLang
			
			var event = {
				/* 부모 클래스 이벤트 바인드 제거.*/
				'allTermsCheckEvent' : function() {}
				/* 부모 클래스의 registFormEvent 메소드 오버라이딩 대상. */
				, 'registFormEvent' : function() {
					/* 부모 클래스에 있는 valid 설정 메소드 호출. */
					var _valid = _super._registFormValid();

					commUtil.validUtil.pwdFormatValid();

					$('#memberRegForm').validate({
						'rules' : _valid.validate_rules
						, 'messages' : _valid.validate_msg
						, 'submitHandler' : function() {
							if(confirm(registLang.update_confirm_text)) {
								 return that._val.biz.commKindsProc($('#memberRegForm'), 'post', '/member/registUpdate', function(data) {
										var resData = $.parseJSON(data)
											, resCode = resData.resCode;
									
										that.biz().resBizProc(resCode, that._val.biz.resBiz);
										
										return false;
								 });								
							} else {
								return false;
							}

						}
					});
				}
				, 'detaultValEvent' : function() {
					var resBiz = {
						'-1' : function() {
							var commonLang = langInfo.commonLang;
							alert(commonLang.insufficient_auth_error_text);
							location.replace('/main');
						}
						, '-2' : function() {
							var commonLang = langInfo.commonLang;
							alert(commonLang.login_fail_text);
							location.replace('/main');
						}
					};
					
					commUtil.srvUtil.ajaxReq({
						'url' : '/srvInfo/getUserDetail'
						, 'type' : 'get'
					}, function(data) {
						var resData = $.parseJSON(data)
							, resCode = resData.resCode;
						
						if(resCode == '0') {
							$('#memberId').val(resData.id);
							$('#postCode').val(resData.postCode);
							$('#address').val(resData.address);
							$('#detailAddress').val(resData.detail_address);							
						} else {
							that._val.biz.resBizProc(resCode, resBiz);	
						}
					});
				}
				


			};
			
			return $.extend(true, _super, event);
		}
		

	});
	
	return render;
})