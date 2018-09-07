define(['strUtil', 'srvUtil', 'objUtil', 'helperUtil', 'validUtil', 'jquery'], function(strUtil, srvUtil, objUtil, helperUtil, validUtil, $) {
	var commUtil = {
		'name' : 'commUtil'
		, 'init' : function() {
		}
		/*화면 랜더링이 끝나고 실행.*/
		, 'viewComp' : function(callback) {

			window.componentHandler.upgradeAllRegistered();
			$('.page_loding').remove();
			
			if(callback != undefined) {
				callback();	
			}
		}
		/*햄버거 버튼에 관한 텍스트 삭제 메소드.*/
		, 'delHamMenu' : function() {
			$('#hamMenu').remove();
		}
		/*
		 * 우편번호 검색
		 * 현재는 다음 API를 사용 하므로
		 * 'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js'
		 * 해당 메소드를 사용 하는 곳에서는 위 js파일을 필수로 import가 되어 있어야 한다.
		 */
		, 'searchPostCode' : function(callFunc) {
			daum.postcode.load(function() {
				new daum.Postcode({
					'oncomplete' : function(data) {
		                var fullAddr = ''
		                	, extraAddr = '';

		                if (data.userSelectedType === 'R') {
		                    fullAddr = (data.userLanguageType === 'K' ? data.roadAddress :  data.roadAddressEnglish);
		                } else {
		                    fullAddr = (data.userLanguageType === 'K' ? data.jibunAddress :  data.jibunAddressEnglish);
		                }

		                if(data.userSelectedType === 'R' && data.userLanguageType === 'K') {
		                    if(data.bname !== '') {
		                        extraAddr += data.bname;
		                    }
		                    
		                    if(data.buildingName !== '') {
		                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
		                    }
		                    
		                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
		                }
		                
		                data.fullAddr = fullAddr;
		                data.extraAddr = extraAddr;
		                
		                callFunc(data);
					}
				}).open();
			});			
		}
		/*통신 방식 값 반환.*/
		, 'getKind' : function() {
			return $.cookie('commKind');
		}
		/*통신 방식이 페이지인지 검증.*/
		, 'isPage' : function() {
			if(this.getKind() == 'page') {
				return true;
			}
			
			return false;
		}
		
		
	};

	for(var i = 0, len = arguments.length; i < len; i++) {
		var obj = arguments[i];
		if(obj.name != undefined) {
			commUtil[arguments[i].name] = arguments[i];	
		}
	}

	return commUtil; 
});