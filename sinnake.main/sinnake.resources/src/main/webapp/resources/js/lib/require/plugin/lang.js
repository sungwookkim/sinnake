define([
	'commUtil']
, function(commUtil) {
	return {
		load : function(name, parentRequire, onload, config) {
			var langConfig = config.langConfig
				, config = langConfig.config
				, base = config.base
				, extension = config.extension;
			
			var langList = ['common/commonLang']
				, langResult = {}
				, check = 0
				, langListLen = langList.length				
				, paramLangList = name.split('|');			

			if(paramLangList != undefined && paramLangList != '' && paramLangList.length > 0) {
				for(var i = 0, len = paramLangList.length; i < len; i++) {
					langList[i+1] = paramLangList[i];
				}

				langListLen = langList.length;
			}
			
			for(var i = 0, len = langList.length; i < len; i++) {
				var path = langList[i]
					, url = base + '/' + path + extension
					, key = path.substring(path.lastIndexOf('/')+1);

				(function(langUrl, key) {
					parentRequire([langUrl], function(langVal) {
						langResult[key] = langVal[$.cookie('pageLang')];

						if(++check == langListLen) {
							onload(langResult);
						}
					});
				})(url, key);
			}
			
		}
	
	
	};

	
});