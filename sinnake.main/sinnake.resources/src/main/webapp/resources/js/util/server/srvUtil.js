define([
	'jquery'
	, 'jqCookie'
	, 'lang!'
], function($, jqCookie, langInfo) {
	var configVal = {
		/*CSRF 설정 변수.*/
		'csrfConfig' : {
			'name' : $("meta[name='_csrf_parameter']").attr("content")
			, 'value' : $("meta[name='_csrf']").attr("content")
		}	
		/*Ajax 설정 변수.*/
		, 'ajaxReqConfig' : function() {
			return {
				'cache' : 'false'
				, 'type' : 'GET'
				, 'success' : function(data) { }
			};
		}
		/*Dim Layer 설정.*/
		, 'dimLayer' : {
			'dimStyle' : 'position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9999;'
			, 'dimId' : 'ajaxDim'
			, 'dimLayer' : 'body'
			, 'loadingImg' : '/resources/img/ajax-loader.gif'
			, 'dimRender' : function() {
				var dim = [];
				
				dim[0] = '<div id="' + this.dimId+ '" style="' + this.dimStyle+ '">';
				dim[1] = '	<div class="page_loding">';
				dim[2] = '		<div style="text-align:center">';
				dim[3] = '			<img style="width:50%" alt="" src="' + this.loadingImg + '">'
				dim[4] = '		</div>';
				dim[5] = '	</div>';
				dim[6] = '</div>';
				
				$(this.dimLayer).append(dim.join(''));
			}
			, 'dimRemove' : function() {
				$('#' + this.dimId).remove();
			}
		}
	
	
	};
	
	var srvUtil = {
		'name' : 'srvUtil'
		, 'init' : function() {
			return {
				'configVal' : configVal
			};
		}
		/*ajax 통신 Util.*/
		, 'ajaxReq' : function(opt, callBackFunc) {
			var defaultOpt = configVal.ajaxReqConfig();
			
			$.extend(true, defaultOpt, opt);

			defaultOpt.success = function(data) {
				configVal.dimLayer.dimRemove();
				callBackFunc(data);
			};
			
			if(defaultOpt.error != undefined) {
				var errorCallFunc = defaultOpt.error;

				defaultOpt.error = function() {
					configVal.dimLayer.dimRemove();
					errorCallFunc.apply(arguments);
				}
			} else {
				defaultOpt.error = function() {
					configVal.dimLayer.dimRemove();
					alert(langInfo.commonLang.exceptionErrorMsg);
				}				
			}

			if(defaultOpt.type.toLowerCase() == 'post') {
				defaultOpt.data[configVal.csrfConfig.name] = configVal.csrfConfig.value;
			}
			
			try {
				$.ajax(defaultOpt);
			} catch (e) {
				configVal.dimLayer.dimRemove();
				console.log(e);	
			}			
		}
		/*ajax submit Util.*/
		, 'ajaxSubmit' : function($form, opt, callBackFunc) {
			var that = this;

			opt.data = $form.serialize();

			setTimeout(function() {
				configVal.dimLayer.dimRender();	
			}, 1);
			
			setTimeout(function() {
				try {
					that.ajaxReq(opt, callBackFunc);
				} catch (e) {
					configVal.dimLayer.dimRemove();
					console.log(e);	
				}				
			}, 1);
		}
		/*현재 사용자 정보 반환 Util.*/
		, 'getUser' : function(callBack) {
			var that = this;
			
			this.ajaxReq({
				'url' : '/srvInfo/getUser'
				, 'async' : false
				, 'type' : 'get'
				, 'dataType' : 'json'
			}, function(data) {
				callBack(data);
			});
		}
		/*csrf 태그 생성 Util.*/
		, 'csrfTagMake' : function() {
			return '<input type="hidden" name="'+ configVal.csrfConfig.name +'" value="' + configVal.csrfConfig.value + '"/>';
		}
		/*언어 정보 조회 Util.*/
		, 'getLang' : function() {
			return $.cookie('pageLang');
		}
		/* 통신 방식에 따른 resp 처리.*/
		, 'commKindsProc' : function($form, type, url, callBack) {
			var that = this
				, commKindsVal = $('#commKinds').val();
			 
			var commKinds = function() {
				$form
					.attr('method', type)
					.attr('action', url);
				
				return true;
			}
			
			switch(commKindsVal) {
				case 'ajax' :
					commKinds = function() {
						that.ajaxSubmit($form, {
							'url' : url
							, 'type' : type
						}, function(data) {
							callBack(data);
						});
					};

					break;
				default : break;
			}
			
			return commKinds;
		}
		
		
	};
		
	return srvUtil;
});